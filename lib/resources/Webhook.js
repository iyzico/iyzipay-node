'use strict';

var IyzipayResource = require('../IyzipayResource');

function Webhook() {
    this._config = arguments[0];
    this._api = {
        update: {
            path: '/payment/notification/update',
            method: 'POST',
            requestModel: 'UpdateWebhookRequest'
        }
    };
}

Webhook.prototype = new IyzipayResource();

module.exports = Webhook;
