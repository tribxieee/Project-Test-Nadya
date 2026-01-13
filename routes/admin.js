const express = require('express');
const router = express.Router();
const db = require('../db');

// list produk
router.get('/', (req, res) => {
  db.query(`
    SELECT p.*, s.quantity 
    FROM products p
    JOIN stocks s ON p.id = s.product_id
  `, (err, products) => {
    res.render('products', { products });
  });
});

// form pembelian
router.get('/buy/:id', (req, res) => {
  res.render('purchase-form', { productId: req.params.id });
});

// submit pembelian
router.post('/buy', (req, res) => {
  const { product_id, quantity } = req.body;

  db.query(
    'SELECT quantity, price FROM stocks JOIN products ON products.id = stocks.product_id WHERE product_id=?',
    [product_id],
    (err, result) => {
      if (result[0].quantity < quantity) return res.send('Stock not enough');

      const total = quantity * result[0].price;

      db.query(
        'INSERT INTO purchases (product_id, quantity, total_price, status) VALUES (?, ?, ?, "ACTIVE")',
        [product_id, quantity, total],
        () => {
          db.query(
            'UPDATE stocks SET quantity = quantity - ? WHERE product_id=?',
            [quantity, product_id],
            () => res.redirect('/')
          );
        }
      );
    }
  );
});

// cancel pembelian
router.post('/cancel/:id', (req, res) => {
  const id = req.params.id;

  db.query(
    'SELECT * FROM purchases WHERE id=?',
    [id],
    (err, [purchase]) => {
      if (purchase.status === 'CANCELLED') return res.redirect('/purchases');

      db.query(
        'UPDATE purchases SET status="CANCELLED" WHERE id=?',
        [id],
        () => {
          db.query(
            'UPDATE stocks SET quantity = quantity + ? WHERE product_id=?',
            [purchase.quantity, purchase.product_id],
            () => res.redirect('/purchases')
          );
        }
      );
    }
  );
});

// list pembelian
router.get('/purchases', (req, res) => {
  db.query(
    'SELECT * FROM purchases',
    (err, purchases) => res.render('purchases', { purchases })
  );
});

module.exports = router;
