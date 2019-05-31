'use strict';

var BaseRequest = require('./BaseRequest'),
    util = require('util');

function UpdateSubscriptionPricingPlanPathRequest(request) {

    BaseRequest.call(this, {
        pricingPlanReferenceCode: request["pricingPlanReferenceCode"]
    });
}

util.inherits(UpdateSubscriptionPricingPlanPathRequest, BaseRequest);

module.exports = UpdateSubscriptionPricingPlanPathRequest;
