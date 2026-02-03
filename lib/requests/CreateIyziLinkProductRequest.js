'use strict';

var BaseRequest = require('./BaseRequest'),
    util = require('util'),
    IyziLinkProduct = require('./model/IyziLinkProduct');

function CreateIyziLinkProductRequest(request) {
    BaseRequest.call(this, IyziLinkProduct.body(request)
    );
}

util.inherits(CreateIyziLinkProductRequest, BaseRequest);

module.exports = CreateIyziLinkProductRequest;