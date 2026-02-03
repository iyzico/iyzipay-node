'use strict';

var BaseRequest = require('./BaseRequest'),
    util = require('util'),
    IyziLinkFastLink = require('./model/IyziLinkFastLink');

function CreateIyziLinkFastLinkRequest(request) {
    BaseRequest.call(this, IyziLinkFastLink.body(request)
    );
}

util.inherits(CreateIyziLinkFastLinkRequest, BaseRequest);

module.exports = CreateIyziLinkFastLinkRequest;
