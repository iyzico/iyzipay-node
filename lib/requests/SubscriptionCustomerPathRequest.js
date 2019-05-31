'use strict';

var BaseRequest = require('./BaseRequest'),
    util = require('util');

function SubscriptionCustomerPathRequest(request) {

    BaseRequest.call(this, {
        customerReferenceCode: request["customerReferenceCode"]
    });
}

util.inherits(SubscriptionCustomerPathRequest, BaseRequest);

module.exports = SubscriptionCustomerPathRequest;
