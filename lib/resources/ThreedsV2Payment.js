'use strict';

var IyzipayResource = require('../IyzipayResource');

function ThreedsV2Payment() {
    this._config = arguments[0];
    this._api = {
        create: {
            path: '/payment/v2/3dsecure/auth',
            method: 'POST',
            requestModel: 'CreateThreedsV2PaymentRequest'
        }
    };
}

ThreedsV2Payment.prototype = new IyzipayResource();

module.exports = ThreedsV2Payment;
