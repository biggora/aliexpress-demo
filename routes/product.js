/**
 * Created by Alex on 8/12/2018.
 */
var express = require('express');
var router = express.Router();

/* GET product detail page. */
router.get('/:productId', function(req, res, next) {
    res.render('product', { title: 'Express' });
});

module.exports = router;