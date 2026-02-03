'use strict';

var IyzipayResource = require('../IyzipayResource');

function IyziLink() {
    this._config = arguments[0];
    this._api = {
        create: {
            path: '/v2/iyzilink/products',
            method: 'POST',
            requestModel: 'CreateIyziLinkProductRequest'
        },
        fastlink: {
            path: '/v2/iyzilink/fast-link/products',
            method: 'POST',
            requestModel: 'CreateIyziLinkFastLinkRequest',
            queryString: 'IyziLinkFastLinkQueryStringRequest'
        }
    }
};

IyziLink.prototype = new IyzipayResource();

IyziLink.prototype.fastlink = function (params, cb) {
    this._config.body = params;
    this._request('fastlink', function (err, res, body) {
        cb(err, body);
    });
};

module.exports = IyziLink;
