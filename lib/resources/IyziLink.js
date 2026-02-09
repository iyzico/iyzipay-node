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
        },
        update: {
            path: '/v2/iyzilink/products/{linkToken}',
            method: 'PUT',
            requestModel: 'UpdateIyziLinkProductRequest',
            pathVariables: 'IyziLinkPathRequest'
        },
        updateProductStatus: {
            path: '/v2/iyzilink/products/{linkToken}/status/{status}',
            method: 'PATCH',
            pathVariables: 'IyziLinkStatusPathRequest'
        },
        delete: {
            path: '/v2/iyzilink/products/{linkToken}',
            method: 'DELETE',
            pathVariables: 'IyziLinkPathRequest'
        },
        retrieve: {
            path: '/v2/iyzilink/products/{linkToken}',
            method: 'GET',
            pathVariables: 'IyziLinkPathRequest'
        },
        retrieveList: {
            path: '/v2/iyzilink/products',
            method: 'GET',
            queryString: 'RetrieveIyziLinkProductListRequest'
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

IyziLink.prototype.updateProductStatus = function (params, cb) {
    this._config.body = params;
    this._request('updateProductStatus', function (err, res, body) {
        cb(err, body);
    });
};

module.exports = IyziLink;
