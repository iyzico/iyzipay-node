'use strict';

var BaseRequest = require('./BaseRequest'),
    util = require('util');

function UpgradeSubscriptionRequest(request) {
    BaseRequest.call(this, {
        locale: request["locale"],
        conversationId: request["conversationId"],
        newPricingPlanReferenceCode: request["newPricingPlanReferenceCode"],
        upgradePeriod: request["upgradePeriod"],
        useTrial: request["useTrial"]
    });
}

util.inherits(UpgradeSubscriptionRequest, BaseRequest);

module.exports = UpgradeSubscriptionRequest;
