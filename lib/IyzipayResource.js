'use strict';

const request = require('postman-request');
const utils = require('./utils');

function IyzipayResource() {
}

IyzipayResource.RANDOM_STRING_SIZE = 8;
IyzipayResource.RANDOM_HEADER_NAME = 'x-iyzi-rnd';
IyzipayResource.CLIENT_VERSION = 'x-iyzi-client-version';
IyzipayResource.AUTHORIZATION = 'Authorization';
IyzipayResource.AUTHORIZATION_FALLBACK_HEADER = 'Authorization_Fallback';
IyzipayResource.IYZI_WS_HEADER_NAME = 'IYZWS';
IyzipayResource.IYZI_WS_HEADER_NAME_V2 = 'IYZWSv2';
IyzipayResource.SEPARATOR = ':';

IyzipayResource.prototype._getHttpHeaders = function (method) {
    const headers = {};
    const randomString = utils.generateRandomString(IyzipayResource.RANDOM_STRING_SIZE);
    headers[IyzipayResource.RANDOM_HEADER_NAME] = randomString;
    headers[IyzipayResource.CLIENT_VERSION] = "iyzipay-node-2.0.64";

    const generateHttpHeadersV1 = () => {
        return utils.generateAuthorizationHeader(
            IyzipayResource.IYZI_WS_HEADER_NAME,
            this._config.apiKey,
            IyzipayResource.SEPARATOR,
            this._config.secretKey,
            this._getPkiString(method),
            randomString
        );
    };

    const generateHttpHeadersV2 = () => {
        return utils.generateAuthorizationHeaderV2(
            IyzipayResource.IYZI_WS_HEADER_NAME_V2,
            this._config.apiKey,
            IyzipayResource.SEPARATOR,
            this._config.secretKey,
            this._api[method].generatedPath,
            this._getBody(method),
            randomString
        );
    };

    headers[IyzipayResource.AUTHORIZATION] = generateHttpHeadersV2();
    headers[IyzipayResource.AUTHORIZATION_FALLBACK_HEADER] = generateHttpHeadersV1();
    return headers;
};

IyzipayResource.prototype._preparePath = function (method) {
    var pathVariables = this._getPathVariables(method),
        currentPath = this._api[method].path;
    for (var key in pathVariables) {
        if (pathVariables.hasOwnProperty(key)) {
            currentPath = currentPath.replace('{' + key + '}', pathVariables[key]);
        }
    }
    this._api[method].generatedPath = currentPath;
};

IyzipayResource.prototype._getUrl = function (method) {
    return this._config.uri + this._api[method].generatedPath;
};

IyzipayResource.prototype._getMethod = function (method) {
    return this._api[method].method;
};

IyzipayResource.prototype._getPathVariables = function (method) {
    if (typeof this._api[method].pathVariables === 'undefined') {
        return {};
    } else {
        var RequestModel = require('./requests/' + this._api[method].pathVariables + '.js');
        return new RequestModel(this._config.body).toJson();
    }
};

IyzipayResource.prototype._getBody = function (method) {
    if (typeof this._api[method].requestModel === 'undefined') {
        return {};
    } else {
        var RequestModel = require('./requests/' + this._api[method].requestModel + '.js');
        return new RequestModel(this._config.body).toJson();
    }
};

IyzipayResource.prototype._getQueryString = function (method) {
    if (typeof this._api[method].queryString === 'undefined') {
        return {};
    } else {
        var RequestModel = require('./requests/' + this._api[method].queryString + '.js');
        return new RequestModel(this._config.body).toJson();
    }
};

IyzipayResource.prototype._getPkiString = function (method) {
    if (typeof this._api[method].requestModel === 'undefined') {
        return [];
    } else {
        var RequestModel = require('./requests/' + this._api[method].requestModel + '.js');
        return new RequestModel(this._config.body).toPkiString();
    }
};

IyzipayResource.prototype._request = function (method, cb) {
    this._preparePath(method);
    var options = {
        method: this._getMethod(method),
        url: this._getUrl(method),
        headers: this._getHttpHeaders(method),
        qs: this._getQueryString(method),
        json: this._getBody(method)
    };
    request(options, function (error, response, body) {
        cb(error, response, body);
    });
};

IyzipayResource.prototype.create = function (params, cb) {
    this._config.body = params;
    this._request(utils.apiMethod.CREATE, function (err, res, body) {
        cb(err, body);
    });
};

IyzipayResource.prototype.retrieve = function (params, cb) {
    this._config.body = params;
    this._request(utils.apiMethod.RETRIEVE, function (err, res, body) {
        cb(err, body);
    });
};

IyzipayResource.prototype.retrieveList = function (params, cb) {
    this._config.body = params;
    this._request(utils.apiMethod.RETRIEVE_LIST, function (err, res, body) {
        cb(err, body);
    });
};

IyzipayResource.prototype.update = function (params, cb) {
    this._config.body = params;
    this._request(utils.apiMethod.UPDATE, function (err, res, body) {
        cb(err, body);
    });
};

IyzipayResource.prototype.delete = function (params, cb) {
    this._config.body = params;
    this._request(utils.apiMethod.DELETE, function (err, res, body) {
        cb(err, body);
    });
};

module.exports = IyzipayResource;
