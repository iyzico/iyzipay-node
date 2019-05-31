'use strict';

var BaseRequest = require('./BaseRequest'),
    util = require('util');

function CreateSubscriptionPricingPlanPathRequest(request) {

    BaseRequest.call(this, {
        productReferenceCode: request["productReferenceCode"]
    });
}

util.inherits(CreateSubscriptionPricingPlanPathRequest, BaseRequest);

module.exports = CreateSubscriptionPricingPlanPathRequest;
