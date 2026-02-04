'use strict';

var IyzipayResource = require('../IyzipayResource');

function RefundV2() {
    this._config = arguments[0];
    this._api = {
        create: {
            path: '/v2/payment/refund',
            method: 'POST',
            requestModel: 'CreateRefundV2Request'
        }
    };
}

RefundV2.prototype = new IyzipayResource();

module.exports = RefundV2;