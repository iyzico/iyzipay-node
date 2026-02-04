'use strict';

var BaseRequest = require('./BaseRequest'),
    util = require('util');

function RetrieveScrollTransactionsRequest(request) {

    BaseRequest.call(this, {
        conversationId: request['conversationId'],
        transactionDate: request['transactionDate'],
        documentScrollVoSortingOrder: request['documentScrollVoSortingOrder'],
        lastId: request['lastId']
    });
}

util.inherits(RetrieveScrollTransactionsRequest, BaseRequest);

module.exports = RetrieveScrollTransactionsRequest;
