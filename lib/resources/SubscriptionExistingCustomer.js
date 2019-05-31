'use strict';

var IyzipayResource = require('../IyzipayResource');

var SubscriptionApiMethod = {
    INITIALIZE: 'initialize'
};

function SubscriptionExistingCustomer() {
    this._config = arguments[0];
    this._api = {
        initialize: {
            path: '/v2/subscription/initialize/with-customer',
            method: 'POST',
            requestModel: 'CreateSubscriptionInitExistingCustomerRequest'
        }
    };
}

SubscriptionExistingCustomer.prototype = new IyzipayResource();

SubscriptionExistingCustomer.prototype.initialize = function (params, cb) {
    this._config.body = params;
    this._request(SubscriptionApiMethod.INITIALIZE, function (err, res, body) {
        cb(err, body);
    });
};

module.exports = SubscriptionExistingCustomer;
