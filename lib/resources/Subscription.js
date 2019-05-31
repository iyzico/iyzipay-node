'use strict';

var IyzipayResource = require('../IyzipayResource');

var SubscriptionApiMethod = {
    INITIALIZE: 'initialize',
    CANCEL: 'cancel',
    RETRY: 'retry',
    ACTIVATE: 'activate',
    UPGRADE: 'upgrade',
    SEARCH: 'search'
};

function Subscription() {
    this._config = arguments[0];
    this._api = {
        initialize: {
            path: '/v2/subscription/initialize',
            method: 'POST',
            requestModel: 'CreateSubscriptionInitRequest'
        },
        cancel: {
            path: '/v2/subscription/subscriptions/{subscriptionReferenceCode}/cancel',
            method: 'POST',
            pathVariables: 'SubscriptionPathRequest'
        },
        activate: {
            path: '/v2/subscription/subscriptions/{subscriptionReferenceCode}/activate',
            method: 'POST',
            pathVariables: 'SubscriptionPathRequest'
        },
        upgrade: {
            path: '/v2/subscription/subscriptions/{subscriptionReferenceCode}/upgrade',
            method: 'POST',
            pathVariables: 'SubscriptionPathRequest',
            requestModel: 'UpgradeSubscriptionRequest'
        },
        retrieve: {
            path: '/v2/subscription/subscriptions/{subscriptionReferenceCode}',
            method: 'GET',
            pathVariables: 'SubscriptionPathRequest'
        },
        search: {
            path: '/v2/subscription/subscriptions',
            method: 'GET',
            queryString: 'SearchSubscriptionRequest'
        }
    };
}

Subscription.prototype = new IyzipayResource();

Subscription.prototype.initialize = function (params, cb) {
    this._config.body = params;
    this._request(SubscriptionApiMethod.INITIALIZE, function (err, res, body) {
        cb(err, body);
    });
};

Subscription.prototype.cancel = function (params, cb) {
    this._config.body = params;
    this._request(SubscriptionApiMethod.CANCEL, function (err, res, body) {
        cb(err, body);
    });
};

Subscription.prototype.activate = function (params, cb) {
    this._config.body = params;
    this._request(SubscriptionApiMethod.ACTIVATE, function (err, res, body) {
        cb(err, body);
    });
};

Subscription.prototype.upgrade = function (params, cb) {
    this._config.body = params;
    this._request(SubscriptionApiMethod.UPGRADE, function (err, res, body) {
        cb(err, body);
    });
};

Subscription.prototype.search = function (params, cb) {
    this._config.body = params;
    this._request(SubscriptionApiMethod.SEARCH, function (err, res, body) {
        cb(err, body);
    });
};

module.exports = Subscription;
