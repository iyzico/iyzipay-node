'use strict';

var BaseRequest = require('./BaseRequest'),
    util = require('util');

function RetrieveSubscriptionPricingPlanPathRequest(request) {

    BaseRequest.call(this, {
        pricingPlanReferenceCode: request["pricingPlanReferenceCode"]
    });
}

util.inherits(RetrieveSubscriptionPricingPlanPathRequest, BaseRequest);

module.exports = RetrieveSubscriptionPricingPlanPathRequest;
