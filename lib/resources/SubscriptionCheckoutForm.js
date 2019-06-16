'use strict';

var IyzipayResource = require('../IyzipayResource');

var SubscriptionApiMethod = {
    INITIALIZE: 'initialize'
};

function SubscriptionCheckoutForm() {
    this._config = arguments[0];
    this._api = {
        initialize: {
            path: '/v2/subscription/checkoutform/initialize',
            method: 'POST',
            requestModel: 'CreateSubscriptionCheckoutFormInitRequest'
        },
        retrieve: {
            path: '/v2/subscription/checkoutform/{checkoutFormToken}',
            method: 'GET',
            pathVariables: 'RetrieveSubscriptionCheckoutFormPathRequest'
        },
    };
}

SubscriptionCheckoutForm.prototype = new IyzipayResource();

SubscriptionCheckoutForm.prototype.initialize = function (params, cb) {
    this._config.body = params;
    this._request(SubscriptionApiMethod.INITIALIZE, function (err, res, body) {
        cb(err, body);
    });
};

module.exports = SubscriptionCheckoutForm;
