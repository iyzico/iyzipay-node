'use strict';

var BaseRequest = require('./BaseRequest'),
    util = require('util'),
    utils = require('../utils');
function IyzilinkSaveProductRequest(request) {

    BaseRequest.call(this, {
        locale: request['locale'],
        conversationId: request['conversationId'],
        description: request['description'],
        name: request['name'],
        imageUrl: request["imageUrl"],
        price: utils.formatPrice(request['price']),
        currencyCode: request['currency'],
        addressIgnorable: request["addressIgnorable"],
        soldLimit: request["soldLimit"],
        installmentRequest: request["installmentRequest"],
        encodedImageFile: request['base64EncodedImage'] 
    });
}

util.inherits(IyzilinkSaveProductRequest, BaseRequest);

module.exports = IyzilinkSaveProductRequest;
