var aliexpress = require('aliexpress');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    // aliexpress

    aliexpress.FlashDeals.get({
        keyword: 'selfie stick',
        CatId: 0,
        maxPrice: 7,
        SortType: 'total_tranpro_desc',
        shipCountry: 'US',
        isFavorite: 'y',
        isViewCP: 'y',
        origin: 'y',
        site: 'glo'
    }).then(function (d) {
        // let out = d.products;
        res.render('index', { title: 'Express', data: d });
    });
});

module.exports = router;
