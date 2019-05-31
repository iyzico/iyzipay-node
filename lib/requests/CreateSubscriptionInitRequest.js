'use strict';

var BaseRequest = require('./BaseRequest'),
    util = require('util'),
    SubscriptionCard = require('./model/SubscriptionCard'),
    SubscriptionCustomer = require('./model/SubscriptionCustomer');

function CreateSubscriptionInitRequest(request) {

    BaseRequest.call(this, {
        locale: request['locale'],
        conversationId: request['conversationId'],
        paymentCard: SubscriptionCard.body(request['paymentCard']),
        customer: SubscriptionCustomer.body(request['customer']),
        pricingPlanReferenceCode: request['pricingPlanReferenceCode'],
        subscriptionInitialStatus: request['subscriptionInitialStatus']
    });
}

util.inherits(CreateSubscriptionInitRequest, BaseRequest);

module.exports = CreateSubscriptionInitRequest;
