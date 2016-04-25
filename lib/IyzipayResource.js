'use strict';

var request = require('request'),
    crypto = require('crypto'),
    utils = require('./utils');

function IyzipayResource() {
}

IyzipayResource.RANDOM_STRING_SIZE = 8;
IyzipayResource.RANDOM_HEADER_NAME = 'x-iyzi-rnd';
IyzipayResource.AUTHORIZATION = 'Authorization';
IyzipayResource.IYZI_WS_HEADER_NAME = 'IYZWS';
IyzipayResource.SEPARATOR = ':';

IyzipayResource.prototype._getHttpHeaders = function (method) {
    var headers = {};
    var randomString = utils.generateRandomString(IyzipayResource.RANDOM_STRING_SIZE);
    headers[IyzipayResource.RANDOM_HEADER_NAME] = randomString;
    headers[IyzipayResource.AUTHORIZATION] = utils.generateAuthorizationHeader(
        IyzipayResource.IYZI_WS_HEADER_NAME,
        this._config.apiKey,
        IyzipayResource.SEPARATOR,
        this._config.secretKey,
        this._getPkiString(method),
        randomString
    );
    return headers;
};

IyzipayResource.prototype._getUrl = function (method) {
    return this._config.uri + this._api[method].path;
};

IyzipayResource.prototype._getMethod = function (method) {
    return this._api[method].method;
};

IyzipayResource.prototype._getBody = function (method) {
    if (typeof this._api[method].requestModel === 'undefined') {
        return {};
    } else {
        var RequestModel = require('./requests/' + this._api[method].requestModel + '.js');
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
    var options = {
        method: this._getMethod(method),
        url: this._getUrl(method),
        headers: this._getHttpHeaders(method),
        json: this._getBody(method)
    };
    console.log(options);
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