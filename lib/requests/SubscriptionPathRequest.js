'use strict';

var BaseRequest = require('./BaseRequest'),
    util = require('util');

function SubscriptionPathRequest(request) {

    BaseRequest.call(this, {
        subscriptionReferenceCode: request["subscriptionReferenceCode"]
    });
}

util.inherits(SubscriptionPathRequest, BaseRequest);

module.exports = SubscriptionPathRequest;
