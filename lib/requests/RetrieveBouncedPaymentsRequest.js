'use strict';

var BaseRequest = require('./BaseRequest'),
    util = require('util');

function RetrieveBouncedPaymentsRequest(request) {
    BaseRequest.call(this, {
        locale: request['locale'],
        conversationId: request['conversationId'],
        date: request['date'],
    });
}

util.inherits(RetrieveBouncedPaymentsRequest, BaseRequest);

module.exports = RetrieveBouncedPaymentsRequest;
