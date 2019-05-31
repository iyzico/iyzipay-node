'use strict';

var BaseRequest = require('./BaseRequest'),
    util = require('util');

function UpdateSubscriptionCardRequest(request) {
    BaseRequest.call(this, {
        locale: request["locale"],
        conversationId: request["conversationId"],
        customerReferenceCode: request["customerReferenceCode"],
        callbackUrl: request["callbackUrl"]
    });
}

util.inherits(UpdateSubscriptionCardRequest, BaseRequest);

module.exports = UpdateSubscriptionCardRequest;
