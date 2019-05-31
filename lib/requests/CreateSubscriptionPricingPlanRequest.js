'use strict';

var BaseRequest = require('./BaseRequest'),
    util = require('util'),
    SubscriptionPricingPlan = require('./model/SubscriptionPricingPlan');

function CreateSubscriptionPricingPlanRequest(request) {
    BaseRequest.call(this, SubscriptionPricingPlan.body(request));
}

util.inherits(CreateSubscriptionPricingPlanRequest, BaseRequest);

module.exports = CreateSubscriptionPricingPlanRequest;
