'use strict';

var BaseRequest = require('./BaseRequest'),
    util = require('util');

function CreateSubscriptionPaymentRetryRequest(request) {
    BaseRequest.call(this, {
        locale: request["locale"],
        conversationId: request["conversationId"],
        referenceCode: request["referenceCode"]
    });
}

util.inherits(CreateSubscriptionPaymentRetryRequest, BaseRequest);

module.exports = CreateSubscriptionPaymentRetryRequest;
