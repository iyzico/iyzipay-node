'use strict';

var IyzipayResource = require('../IyzipayResource');

function SubscriptionPricingPlan() {
    this._config = arguments[0];
    this._api = {
        create: {
            path: '/v2/subscription/products/{productReferenceCode}/pricing-plans',
            method: 'POST',
            pathVariables: 'CreateSubscriptionPricingPlanPathRequest',
            requestModel: 'CreateSubscriptionPricingPlanRequest'
        },
        update: {
            path: '/v2/subscription/pricing-plans/{pricingPlanReferenceCode}',
            method: 'POST',
            pathVariables: 'UpdateSubscriptionPricingPlanPathRequest',
            requestModel: 'UpdateSubscriptionPricingPlanRequest'
        },
        retrieveList: {
            path: '/v2/subscription/products/{productReferenceCode}/pricing-plans',
            method: 'GET',
            pathVariables: 'RetrieveSubscriptionPricingPlanListPathRequest',
            queryString: 'RetrieveSubscriptionPricingPlanListRequest'
        },
        retrieve: {
            path: '/v2/subscription/pricing-plans/{pricingPlanReferenceCode}',
            method: 'GET',
            pathVariables: 'RetrieveSubscriptionPricingPlanPathRequest'
        }
    };
}

SubscriptionPricingPlan.prototype = new IyzipayResource();

module.exports = SubscriptionPricingPlan;
