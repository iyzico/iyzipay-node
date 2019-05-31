'use strict';

var BaseRequest = require('./BaseRequest'),
    util = require('util');

function CreateSubscriptionInitExistingCustomerRequest(request) {

    BaseRequest.call(this, {
        locale: request['locale'],
        conversationId: request['conversationId'],
        pricingPlanReferenceCode: request['pricingPlanReferenceCode'],
        customerReferenceCode: request['customerReferenceCode']
    });
}

util.inherits(CreateSubscriptionInitExistingCustomerRequest, BaseRequest);

module.exports = CreateSubscriptionInitExistingCustomerRequest;
