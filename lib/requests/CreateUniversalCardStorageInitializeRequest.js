'use strict';

var BaseRequest = require('./BaseRequest'),
    util = require('util');

function CreateUniversalCardStorageInitializeRequest(request) {
    BaseRequest.call(this, {
        locale: request['locale'],
        conversationId: request['conversationId'],
        email: request['email'],
        gsmNumber: request['gsmNumber']
    });
}

util.inherits(CreateUniversalCardStorageInitializeRequest, BaseRequest);

module.exports = CreateUniversalCardStorageInitializeRequest;
