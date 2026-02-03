'use strict';

var BaseRequest = require('./BaseRequest'),
    util = require('util');

function IyziLinkFastLinkQueryStringRequest(request) {
    BaseRequest.call(this, {
        locale: request['locale'],
    });
}

util.inherits(IyziLinkFastLinkQueryStringRequest, BaseRequest);

module.exports = IyziLinkFastLinkQueryStringRequest;