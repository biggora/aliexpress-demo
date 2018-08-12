/**
 * Created by Alex on 8/12/2018.
 */
var aliexpress = require('aliexpress');
var express = require('express');
var router = express.Router();

/* params router level */
router.param('page', function (req, res, next, page) {
    if (/^\d+$/.test(page)) {
        next();
    } else {
        next('route');
    }
});

/* GET flash deals page. */
var flashDeals = function(req, res, next) {
    var params = req.params;
    var query = {offset:0};
    var config = new aliexpress.Spider('').getConfig();
    query.limit = config.limit;
    if(params.page && params.page > 1) {
        query.offset = (params.page - 1) * query.limit;
    }
    console.log('flashDeals', query)
    aliexpress.FlashDeals.get({
        limit: query.limit,
        offset: query.offset
    }).then(function (d) {
        res.render('flash-deals', { title: 'Flash Deals', data: d });
    }).catch(function (err) {
        next(err);
    });
};

router.get('/', flashDeals);
router.get('/:page', flashDeals);

module.exports = router;