/**
 * Created by Alex on 8/12/2018.
 */
var aliexpress = require('aliexpress');
var express = require('express');
var router = express.Router();

/* GET flash deals page. */
var searchHandler = function (req, res, next) {
    var query = req.query || {};
    var config = new aliexpress.Spider('').getConfig();

    aliexpress.Search({
        keyword: query.q,
        CatId: query.catId || 0,
        minPrice: query.minPrice || 0,
        maxPrice: query.maxPrice || 1000,
        SortType: query.sort || 'total_tranpro_desc'
    }).then(function (d) {
        d.query = query;
        console.log('Search', d.products[0])
        d.prev = true;
        d.next = true;
        // if (d.products.length < query.limit) {
        //     d.next = false;
        // }
        // if (params.page === 1) {
        //     d.prev = false;
        // }
        res.render('search', { title: 'Search', data: d });
    }).catch(function (err) {
        next(err);
    });
};

router.get('/', searchHandler);

module.exports = router;
