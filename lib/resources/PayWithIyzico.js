'use strict';

const IyzipayResource = require('../IyzipayResource');

function PayWithIyzico(config) {
    this._config = arguments[0];
    this._api = {
        initialize: {
            path: '/payment/pay-with-iyzico/initialize',
            method: 'POST',
            requestModel: 'PayWithIyzicoInitializeRequest'
        },
        retrieve: {
            path: '/payment/iyzipos/checkoutform/auth/ecom/detail',
            method: 'POST',
            requestModel: 'PayWithIyzicoRetrieveRequest'
        }
    }
}

PayWithIyzico.prototype = new IyzipayResource();

PayWithIyzico.prototype.initialize = function (params, cb) {
    this._config.body = params;
    this._request('initialize', function (err, res, body) {
        cb(err, body);
    });
};

module.exports = PayWithIyzico;