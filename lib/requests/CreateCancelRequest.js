'use strict';

var BaseRequest = require('./BaseRequest'),
    util = require('util');

function CreateCancelRequest(request) {

    BaseRequest.call(this, {
        locale: request['locale'],
        conversationId: request['conversationId'],
        paymentId: request['paymentId'],
        ip: request['ip'],
        reason: request['reason'],
        description: request["description"]
    });
}

util.inherits(CreateCancelRequest, BaseRequest);

module.exports = CreateCancelRequest;