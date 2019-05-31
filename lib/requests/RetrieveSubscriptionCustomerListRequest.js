'use strict';

var BaseRequest = require('./BaseRequest'),
    util = require('util'),
    Pagination = require('./model/Pagination');

function RetrieveSubscriptionCustomerListRequest(request) {
    BaseRequest.call(this, Pagination.body(request));
}

util.inherits(RetrieveSubscriptionCustomerListRequest, BaseRequest);

module.exports = RetrieveSubscriptionCustomerListRequest;
