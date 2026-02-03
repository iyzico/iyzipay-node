'use strict';

var BaseRequest = require('./BaseRequest'),
    util = require('util'),
    IyziLinkProduct = require('./model/IyziLinkProduct');

function UpdateIyziLinkProductRequest(request) {
    BaseRequest.call(this, IyziLinkProduct.body(request));
}

util.inherits(UpdateIyziLinkProductRequest, BaseRequest);

module.exports = UpdateIyziLinkProductRequest;
