'use strict';

var BaseRequest = require('./BaseRequest'),
    util = require('util'),
    utils = require('../utils');

function CreateRefundRequest(request) {

    BaseRequest.call(this, {
        locale: request['locale'],
        conversationId: request['conversationId'],
        paymentTransactionId: request['paymentTransactionId'],
        price: utils.formatPrice(request['price']),
        ip: request['ip'],
        currency: request["currency"],
        reason: request['reason'],
        description: request["description"]
    });
}

util.inherits(CreateRefundRequest, BaseRequest);

module.exports = CreateRefundRequest;