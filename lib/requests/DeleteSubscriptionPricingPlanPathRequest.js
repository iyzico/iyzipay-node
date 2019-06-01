'use strict';

var BaseRequest = require('./BaseRequest'),
    util = require('util');

function DeleteSubscriptionPricingPlanPathRequest(request) {

    BaseRequest.call(this, {
        pricingPlanReferenceCode: request["pricingPlanReferenceCode"]
    });
}

util.inherits(DeleteSubscriptionPricingPlanPathRequest, BaseRequest);

module.exports = DeleteSubscriptionPricingPlanPathRequest;
