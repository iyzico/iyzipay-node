'use strict';

var BaseRequest = require('./BaseRequest'),
    util = require('util');

function RetrieveTransactionsRequest(request) {

    BaseRequest.call(this, {
        locale: request['locale'],
        conversationId: request['conversationId'],
        transactionDate: request['transactionDate'],
        page: request['page']
    });
}

util.inherits(RetrieveTransactionsRequest, BaseRequest);

module.exports = RetrieveTransactionsRequest;