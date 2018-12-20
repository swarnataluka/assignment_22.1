var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.set("view options", { layout: false });
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }))

var Product = require('./models/product');

app.get('/', function (req, res) {
    Product.getProducts(function (err, data) {
        if (err) {
            throw err;
        }
        // res.send(data);
        res.render("index", { products: data });
    })
})

app.get('/products/:id', function (req, res) {
    var id = req.params.id;
    Product.getProductById(id, function (err, data) {
        if (err) {
            throw err;
        }
        // res.json(data);
        res.render("show", { product: data });
    })
});

app.get('/create', function (req, res) {
    res.render("create");
});

app.get('/edit/:id', function (req, res) {
    var id = req.params.id;
    Product.getProductById(id, function (err, data) {
        if (err) {
            throw err;
        }
        // res.json(data);
        res.render("edit", { product: data });
    })
});

app.post('/products', function (req, res) {
    var product = req.body;
    Product.addProduct (product, function (err, products) {
        if (err) {
            throw err;
        }
        // res.json(products);
        res.redirect('/')
    })
});

app.post('/update/:_id', function (req, res) {
    var id = req.params._id;
    var product = req.body;
    Product.updateProduct(id, product, function (err, data) {
        if (err) {
            throw err;
        }
        //res.json(product);
        res.render("update", {product: data});
    })
});

app.post('/products/:_id', function (req, res) {
    Product.deleteProduct (req.params._id, function (err, product) {
        if (err) {
            throw err;
        }
        //res.json(product);
        res.redirect('/');
    })
});

app.listen(3000, function () {
    console.log('Server running at port 3000: http://localhost:3000');
})