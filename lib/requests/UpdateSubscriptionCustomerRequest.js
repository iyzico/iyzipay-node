'use strict';

var BaseRequest = require('./BaseRequest'),
    util = require('util'),
    SubscriptionCustomer = require('./model/SubscriptionCustomer');

function UpdateSubscriptionCustomerRequest(request) {
    BaseRequest.call(this, SubscriptionCustomer.body(request));
}

util.inherits(UpdateSubscriptionCustomerRequest, BaseRequest);

module.exports = UpdateSubscriptionCustomerRequest;
