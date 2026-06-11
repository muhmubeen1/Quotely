const { stripe, PLANS } = require('../config/stripe');
const { pool } = require('../config/database');

// GET /api/subscription - Get current subscription
const getSubscription = async (req, res, next) => {
    try {
        const result = await pool.query(
            `SELECT s.*, u.role
       FROM subscriptions s
       JOIN users u ON s.user_id = u.id
       WHERE s.user_id = $1
       ORDER BY s.created_at DESC
       LIMIT 1`,
            [req.user.id]
        );

        res.json({ subscription: result.rows[0] || null });
    } catch (error) {
        next(error);
    }
};

// POST /api/subscription/upgrade - Create Stripe checkout
const createCheckout = async (req, res, next) => {
    try {
        const { plan } = req.body;

        if (!PLANS[plan] || plan === 'free') {
            return res.status(400).json({ message: 'Invalid plan selected' });
        }

        const session = await stripe.checkout.sessions.create({
            customer_email: req.user.email,
            line_items: [
                {
                    price: PLANS[plan].priceId,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${process.env.FRONTEND_URL}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/subscription/cancel`,
            metadata: {
                userId: req.user.id.toString(),
                plan: plan
            }
        });

        res.json({ sessionId: session.id, url: session.url });
    } catch (error) {
        next(error);
    }
};

// POST /api/subscription/webhook - Stripe webhook
const handleWebhook = async (req, res, next) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
        case 'checkout.session.completed': {
            const session = event.data.object;
            const userId = parseInt(session.metadata.userId);
            const plan = session.metadata.plan;

            await pool.query('BEGIN');

            await pool.query(
                'UPDATE users SET role = $1 WHERE id = $2',
                [plan, userId]
            );

            await pool.query(
                `INSERT INTO subscriptions (user_id, plan, status, stripe_subscription_id)
         VALUES ($1, $2, 'active', $3)
         ON CONFLICT (user_id) 
         DO UPDATE SET plan = $2, status = 'active', stripe_subscription_id = $3, updated_at = CURRENT_TIMESTAMP`,
                [userId, plan, session.subscription]
            );

            await pool.query('COMMIT');
            break;
        }

        case 'customer.subscription.deleted': {
            const subscription = event.data.object;

            await pool.query(
                `UPDATE users SET role = 'free' 
         WHERE id IN (SELECT user_id FROM subscriptions WHERE stripe_subscription_id = $1)`,
                [subscription.id]
            );

            await pool.query(
                `UPDATE subscriptions SET status = 'canceled', plan = 'free'
         WHERE stripe_subscription_id = $1`,
                [subscription.id]
            );
            break;
        }
    }

    res.json({ received: true });
};

module.exports = {
    getSubscription,
    createCheckout,
    handleWebhook
};