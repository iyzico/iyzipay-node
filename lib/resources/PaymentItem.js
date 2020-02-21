'use strict';

var IyzipayResource = require('iyzipay/lib/IyzipayResource');

function PaymentItem() {
    this._config = arguments[0];
    this._api = {
        update: {
            path: '/payment/item',
            method: 'PUT',
            requestModel: 'UpdateSubMerchantPaymentItemRequest'
        }
    };
}

PaymentItem.prototype = new IyzipayResource();

module.exports = PaymentItem;