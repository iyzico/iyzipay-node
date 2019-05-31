'use strict';

var BaseRequest = require('./BaseRequest'),
    util = require('util'),
    SubscriptionProduct = require('./model/SubscriptionProduct');

function UpdateSubscriptionProductRequest(request) {
    BaseRequest.call(this, SubscriptionProduct.body(request));
}

util.inherits(UpdateSubscriptionProductRequest, BaseRequest);

module.exports = UpdateSubscriptionProductRequest;
