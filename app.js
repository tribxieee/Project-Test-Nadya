const express = require('express');
const app = express();
const adminRoutes = require('./routes/admin');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', adminRoutes);

app.listen(3000, () => console.log('Server running'));
