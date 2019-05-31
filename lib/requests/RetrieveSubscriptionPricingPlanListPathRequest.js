'use strict';

var BaseRequest = require('./BaseRequest'),
    util = require('util');

function RetrieveSubscriptionPricingPlanListPathRequest(request) {

    BaseRequest.call(this, {
        productReferenceCode: request["productReferenceCode"]
    });
}

util.inherits(RetrieveSubscriptionPricingPlanListPathRequest, BaseRequest);

module.exports = RetrieveSubscriptionPricingPlanListPathRequest;
