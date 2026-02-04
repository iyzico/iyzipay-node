'use strict';

var BaseRequest = require('./BaseRequest'),
    util = require('util');

function PayWithIyzicoRetrieveRequest(request) {

    BaseRequest.call(this, {
        locale: request['locale'],
        conversationId: request['conversationId'],
        token: request['token']
    });
}

util.inherits(PayWithIyzicoRetrieveRequest, BaseRequest);

module.exports = PayWithIyzicoRetrieveRequest;
