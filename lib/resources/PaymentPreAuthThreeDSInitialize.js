'use strict';

var IyzipayResource = require('../IyzipayResource');

function PaymentPreAuthThreeDSInitialize() {
    this._config = arguments[0];
    this._api = {
        create: {
            path: '/payment/iyzipos/initialize3ds/preauth/ecom',
            method: 'POST',
            requestModel: 'CreateThreeDSInitializePreAuthRequest'
        }
    };
}

PaymentPreAuthThreeDSInitialize.prototype = new IyzipayResource();

module.exports = PaymentPreAuthThreeDSInitialize;
