'use strict';

var BaseRequest = require('./BaseRequest'),
    util = require('util');

function CreatePaymentPostAuthRequest(request) {

    BaseRequest.call(this, {
        locale: request['locale'],
        conversationId: request['conversationId'],
        paymentId: request['paymentId'],
        ip: request['ip'],
        paidPrice: request['paidPrice']
    });
}

util.inherits(CreatePaymentPostAuthRequest, BaseRequest);

module.exports = CreatePaymentPostAuthRequest;