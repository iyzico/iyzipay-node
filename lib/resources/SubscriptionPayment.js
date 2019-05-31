'use strict';

var IyzipayResource = require('../IyzipayResource');

var SubscriptionApiMethod = {
    RETRY: 'retry'
};

function SubscriptionPayment() {
    this._config = arguments[0];
    this._api = {
        retry: {
            path: '/v2/subscription/operation/retry',
            method: 'POST',
            requestModel: 'CreateSubscriptionPaymentRetryRequest'
        }
    };
}

SubscriptionPayment.prototype = new IyzipayResource();

SubscriptionPayment.prototype.retry = function (params, cb) {
    this._config.body = params;
    this._request(SubscriptionApiMethod.RETRY, function (err, res, body) {
        cb(err, body);
    });
};

module.exports = SubscriptionPayment;
