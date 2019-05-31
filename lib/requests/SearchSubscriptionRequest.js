'use strict';

var BaseRequest = require('./BaseRequest'),
    util = require('util');

function SearchSubscriptionRequest(request) {
    BaseRequest.call(this, {
        locale: request['locale'],
        conversationId: request['conversationId'],
        page: request["page"],
        count: request["count"],
        subscriptionReferenceCode: request['subscriptionReferenceCode'],
        parentReferenceCode: request['parentReferenceCode'],
        customerReferenceCode: request['customerReferenceCode'],
        pricingPlanReferenceCode: request['pricingPlanReferenceCode'],
        subscriptionStatus: request['subscriptionStatus'],
        startDate: request['startDate'],
        endDate: request['endDate']
    });
}

util.inherits(SearchSubscriptionRequest, BaseRequest);

module.exports = SearchSubscriptionRequest;
