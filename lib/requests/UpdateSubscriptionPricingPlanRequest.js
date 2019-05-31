'use strict';

var BaseRequest = require('./BaseRequest'),
    util = require('util');

function UpdateSubscriptionPricingPlanRequest(request) {
    BaseRequest.call(this, {
        locale: request['locale'],
        conversationId: request['conversationId'],
        name: request["name"],
        trialPeriodDays: request["trialPeriodDays"]
    });
}

util.inherits(UpdateSubscriptionPricingPlanRequest, BaseRequest);

module.exports = UpdateSubscriptionPricingPlanRequest;
