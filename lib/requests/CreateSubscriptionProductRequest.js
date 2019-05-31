'use strict';

var BaseRequest = require('./BaseRequest'),
    util = require('util'),
    SubscriptionProduct = require('./model/SubscriptionProduct');

function CreateSubscriptionProductRequest(request) {
    BaseRequest.call(this, SubscriptionProduct.body(request));
}

util.inherits(CreateSubscriptionProductRequest, BaseRequest);

module.exports = CreateSubscriptionProductRequest;
