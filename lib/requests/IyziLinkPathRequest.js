'use strict';

var BaseRequest = require('./BaseRequest'),
    util = require('util');

function IyziLinkPathRequest(request) {

    BaseRequest.call(this, {
        linkToken: request["linkToken"]
    });
}

util.inherits(IyziLinkPathRequest, BaseRequest);

module.exports = IyziLinkPathRequest;