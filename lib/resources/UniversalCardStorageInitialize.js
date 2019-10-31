'use strict';

var IyzipayResource = require('../IyzipayResource');

function UniversalCardStorageInitialize() {
    this._config = arguments[0];
    this._api = {
        retrieve: {
            path: '/v2/ucs/init',
            method: 'POST',
            requestModel: 'CreateUniversalCardStorageInitializeRequest'
        }
    };
}

UniversalCardStorageInitialize.prototype = new IyzipayResource();

module.exports = UniversalCardStorageInitialize;
