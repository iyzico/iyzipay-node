'use strict';

var BaseRequest = require('./BaseRequest'),
    util = require('util');

function CreateThreedsV2PaymentRequest(request) {

    BaseRequest.call(this, {
        locale: request["locale"],
        conversationId: request["conversationId"],
        paymentId: request["paymentId"],
        paidPrice: request["paidPrice"],
        basketId: request["basketId"],
        currency: request["currency"],
    });
}

util.inherits(CreateThreedsV2PaymentRequest, BaseRequest);

module.exports = CreateThreedsV2PaymentRequest;