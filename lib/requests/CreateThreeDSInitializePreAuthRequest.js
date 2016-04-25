'use strict';

var BaseRequest = require('./BaseRequest'),
    util = require('util'),
    Payment = require('./model/Payment');

function CreateThreeDSInitializePreAuthRequest(request) {

    var payment = Payment.body(request);
    payment['callbackUrl'] = request["callbackUrl"];
    BaseRequest.call(this, payment);
}

util.inherits(CreateThreeDSInitializePreAuthRequest, BaseRequest);

module.exports = CreateThreeDSInitializePreAuthRequest;