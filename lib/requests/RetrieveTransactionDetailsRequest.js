'use strict';

var BaseRequest = require('./BaseRequest'),
    util = require('util');

function RetrieveTransactionDetailsRequest(request) {

    BaseRequest.call(this, {
        locale: request['locale'],
        conversationId: request['conversationId'],
        paymentConversationId: request['paymentConversationId']
    });
}

util.inherits(RetrieveTransactionDetailsRequest, BaseRequest);

module.exports = RetrieveTransactionDetailsRequest;
