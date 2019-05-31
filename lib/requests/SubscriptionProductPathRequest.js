'use strict';

var BaseRequest = require('./BaseRequest'),
    util = require('util');

function SubscriptionProductPathRequest(request) {

    BaseRequest.call(this, {
        productReferenceCode: request["productReferenceCode"]
    });
}

util.inherits(SubscriptionProductPathRequest, BaseRequest);

module.exports = SubscriptionProductPathRequest;
