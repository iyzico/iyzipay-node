'use strict';

var BaseRequest = require('./BaseRequest'),
    util = require('util'),
    Pagination = require('./model/Pagination');

function RetrieveSubscriptionProductListRequest(request) {
    BaseRequest.call(this, Pagination.body(request));
}

util.inherits(RetrieveSubscriptionProductListRequest, BaseRequest);

module.exports = RetrieveSubscriptionProductListRequest;
