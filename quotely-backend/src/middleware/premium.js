const checkPremium = (req, res, next) => {
    if (req.user.role !== 'premium' && req.user.role !== 'pro') {
        return res.status(403).json({
            message: 'Premium feature. Please upgrade your subscription.',
            upgradeUrl: '/pricing'
        });
    }
    next();
};

module.exports = { checkPremium };