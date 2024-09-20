'use strict';

var IyzipayResource = require('../IyzipayResource');

function ThreedsInitialize() {
    this._config = arguments[0];
    this._api = {
        create: {
            path: '/payment/3dsecure/initialize',
            method: 'POST',
            requestModel: 'CreatePaymentRequest'
        }
    };
}

ThreedsInitialize.prototype = new IyzipayResource();

module.exports = ThreedsInitialize;
