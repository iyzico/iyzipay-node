'use strict';

var IyzipayResource = require('../IyzipayResource');

function IyziLink() {
    this._config = arguments[0];
    this._api = {
        create: {
            path: '/v2/iyzilink/products',
            method: 'POST',
            requestModel: 'CreateIyziLinkProductRequest'
        }
    }
}

IyziLink.prototype = new IyzipayResource();

module.exports = IyziLink;
