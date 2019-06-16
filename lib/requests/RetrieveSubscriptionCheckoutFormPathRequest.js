'use strict';

var BaseRequest = require('./BaseRequest'),
    util = require('util');

function RetrieveSubscriptionCheckoutFormPathRequest(request) {

    BaseRequest.call(this, {
        checkoutFormToken: request["checkoutFormToken"]
    });
}

util.inherits(RetrieveSubscriptionCheckoutFormPathRequest, BaseRequest);

module.exports = RetrieveSubscriptionCheckoutFormPathRequest;
