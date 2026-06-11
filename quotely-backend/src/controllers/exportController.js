const PDFDocument = require('pdfkit');
const { pool } = require('../config/database');

// GET /api/export/pdf - Export quotes to PDF
const exportToPDF = async (req, res, next) => {
    try {
        const { book_id, tag } = req.query;

        let whereClause = 'WHERE q.user_id = $1';
        const params = [req.user.id];

        if (book_id) {
            params.push(book_id);
            whereClause += ` AND q.book_id = $${params.length}`;
        }

        if (tag) {
            params.push(tag);
            whereClause += ` AND $${params.length} = ANY(q.tags)`;
        }

        const result = await pool.query(
            `SELECT q.*, b.title as book_title, b.author as book_author
       FROM quotes q
       JOIN books b ON q.book_id = b.id
       ${whereClause}
       ORDER BY b.title, q.page_number NULLS LAST`,
            params
        );

        const doc = new PDFDocument();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=quotely-export.pdf');

        doc.pipe(res);

        // Header
        doc.fontSize(20).text('Quotely Export', 100, 50);
        doc.fontSize(12).text(`Generated on ${new Date().toLocaleDateString()}`, 100, 80);
        doc.moveDown(2);

        // Quotes
        let currentBook = '';
        result.rows.forEach((quote) => {
            if (quote.book_title !== currentBook) {
                currentBook = quote.book_title;
                doc.fontSize(14).text(`${quote.book_title} - ${quote.book_author}`, { underline: true });
                doc.moveDown();
            }

            doc.fontSize(11).text(`"${quote.content}"`);
            if (quote.page_number) {
                doc.fontSize(10).text(`Page ${quote.page_number}`, { align: 'right' });
            }
            if (quote.tags && quote.tags.length > 0) {
                doc.fontSize(9).fillColor('gray').text(`Tags: ${quote.tags.join(', ')}`);
                doc.fillColor('black');
            }
            doc.moveDown(1.5);
        });

        doc.end();
    } catch (error) {
        next(error);
    }
};

// GET /api/export/txt - Export quotes to TXT
const exportToTXT = async (req, res, next) => {
    try {
        const { book_id, tag } = req.query;

        let whereClause = 'WHERE q.user_id = $1';
        const params = [req.user.id];

        if (book_id) {
            params.push(book_id);
            whereClause += ` AND q.book_id = $${params.length}`;
        }

        if (tag) {
            params.push(tag);
            whereClause += ` AND $${params.length} = ANY(q.tags)`;
        }

        const result = await pool.query(
            `SELECT q.*, b.title as book_title, b.author as book_author
       FROM quotes q
       JOIN books b ON q.book_id = b.id
       ${whereClause}
       ORDER BY b.title, q.page_number NULLS LAST`,
            params
        );

        let content = 'QUOTELY EXPORT\n';
        content += `Generated on ${new Date().toLocaleDateString()}\n\n`;
        content += '='.repeat(50) + '\n\n';

        let currentBook = '';
        result.rows.forEach((quote) => {
            if (quote.book_title !== currentBook) {
                currentBook = quote.book_title;
                content += `\n${quote.book_title.toUpperCase()} - ${quote.book_author}\n`;
                content += '-'.repeat(40) + '\n\n';
            }

            content += `"${quote.content}"\n`;
            if (quote.page_number) {
                content += `  — Page ${quote.page_number}\n`;
            }
            if (quote.tags && quote.tags.length > 0) {
                content += `  [${quote.tags.join(', ')}]\n`;
            }
            content += '\n';
        });

        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Content-Disposition', 'attachment; filename=quotely-export.txt');
        res.send(content);
    } catch (error) {
        next(error);
    }
};

module.exports = { exportToPDF, exportToTXT };