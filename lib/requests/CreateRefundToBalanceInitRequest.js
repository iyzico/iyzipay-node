'use strict';

var BaseRequest = require('./BaseRequest'),
    util = require('util');

function CreateRefundToBalanceInitRequest(request) {
    BaseRequest.call(this, {
        locale: request['locale'],
        conversationId: request['conversationId'],
        paymentId: request['paymentId'],
        callbackUrl: request['callbackUrl'],
    });
}

util.inherits(CreateRefundToBalanceInitRequest, BaseRequest);

module.exports = CreateRefundToBalanceInitRequest;
