'use strict';

var IyzipayResource = require('../IyzipayResource');

function Iyzilink() {
    this._config = arguments[0];
    this._api = {
        create: {
            path: '/v2/iyzilink/products',
            method: 'POST',
            requestModel: 'IyzilinkSaveProductRequest'
        }
    };
}

Iyzilink.prototype = new IyzipayResource();

module.exports = Iyzilink;