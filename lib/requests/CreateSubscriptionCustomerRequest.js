'use strict';

var BaseRequest = require('./BaseRequest'),
    util = require('util'),
    iyzicoUtils = require('../utils'),
    SubscriptionCustomer = require('./model/SubscriptionCustomer');

function CreateSubscriptionCustomerRequest(request) {
    BaseRequest.call(this, iyzicoUtils.mergeObjects({
        locale: request['locale'],
        conversationId: request['conversationId']
    }, SubscriptionCustomer.body(request)));
}

util.inherits(CreateSubscriptionCustomerRequest, BaseRequest);

module.exports = CreateSubscriptionCustomerRequest;
