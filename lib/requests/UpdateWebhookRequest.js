'use strict';

var BaseRequest = require('./BaseRequest'),
    util = require('util');

function UpdateWebhookRequest(request) {

    BaseRequest.call(this, {
        locale: request['locale'],
        conversationId: request['conversationId'],
        webhookUrl: request['webhookUrl']
    });
}

util.inherits(UpdateWebhookRequest, BaseRequest);

module.exports = UpdateWebhookRequest;
