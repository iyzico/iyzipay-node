'use strict';

var BaseRequest = require('./BaseRequest'),
    util = require('util'),
    PaymentItem = require('./model/PaymentItem');

function UpdateSubMerchantPaymentItemRequest(request) {
    BaseRequest.call(this, PaymentItem.body(request));
}

util.inherits(UpdateSubMerchantPaymentItemRequest, BaseRequest);

module.exports = UpdateSubMerchantPaymentItemRequest;
