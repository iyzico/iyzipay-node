'use strict';

var BaseRequest = require('./BaseRequest'),
    util = require('util');

function RetrievePayoutCompletedRequest(request) {
    BaseRequest.call(this, {
        locale: request['locale'],
        conversationId: request['conversationId'],
        date: request['date'],
    });
}

util.inherits(RetrievePayoutCompletedRequest, BaseRequest);

module.exports = RetrievePayoutCompletedRequest;
