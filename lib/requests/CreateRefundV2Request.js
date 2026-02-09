'use strict';

var BaseRequest = require('./BaseRequest'),
    util = require('util'),
    utils = require('../utils');

function CreateRefundV2Request(request) {

    BaseRequest.call(this, {
        locale: request['locale'],
        conversationId: request['conversationId'],
        price: utils.formatPrice(request['price']),
        paymentId: request['paymentId'],
        currency: request["currency"],
        ip: request['ip']
    });
}

util.inherits(CreateRefundV2Request, BaseRequest);

module.exports = CreateRefundV2Request;