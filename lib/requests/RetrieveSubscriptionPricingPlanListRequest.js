'use strict';

var BaseRequest = require('./BaseRequest'),
    util = require('util'),
    Pagination = require('./model/Pagination');

function RetrieveSubscriptionPricingPlanListRequest(request) {
    BaseRequest.call(this, Pagination.body(request));
}

util.inherits(RetrieveSubscriptionPricingPlanListRequest, BaseRequest);

module.exports = RetrieveSubscriptionPricingPlanListRequest;
