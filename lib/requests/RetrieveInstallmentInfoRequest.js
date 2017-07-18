'use strict';

var BaseRequest = require('./BaseRequest'),
    util = require('util'),
    utils = require('../utils');

function RetrieveInstallmentInfoRequest(request) {

    BaseRequest.call(this, {
        locale: request['locale'],
        conversationId: request['conversationId'],
        binNumber: request['binNumber'],
        price: utils.formatPrice(request['price']),
        currency: request["currency"]
    });
}

util.inherits(RetrieveInstallmentInfoRequest, BaseRequest);

module.exports = RetrieveInstallmentInfoRequest;