'use strict';

var BaseRequest = require('./BaseRequest'),
    util = require('util'),
    SubscriptionCustomer = require('./model/SubscriptionCustomer');

function CreateSubscriptionCheckoutFormInitRequest(request) {

    BaseRequest.call(this, {
        locale: request['locale'],
        conversationId: request['conversationId'],
        callbackUrl: request['callbackUrl'],
        customer: SubscriptionCustomer.body(request["customer"]),
        pricingPlanReferenceCode: request['pricingPlanReferenceCode'],
        subscriptionInitialStatus: request['subscriptionInitialStatus']
    });
}

util.inherits(CreateSubscriptionCheckoutFormInitRequest, BaseRequest);

module.exports = CreateSubscriptionCheckoutFormInitRequest;
