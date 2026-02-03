'use strict';

var BaseRequest = require('./BaseRequest'),
    util = require('util');

function IyziLinkStatusPathRequest(request) {

    BaseRequest.call(this, {
        status: request["status"]
    });
}

util.inherits(IyziLinkStatusPathRequest, BaseRequest);

module.exports = IyziLinkStatusPathRequest;