'use strict';

var BaseRequest = require('./BaseRequest'),
    util = require('util'),
    Buyer = require('./model/Buyer'),
    Address = require('./model/Address'),
    BasketItem = require('./model/BasketItem'),
    utils = require('../utils');

function PayWithIyzicoInitializeRequest(request) {

    BaseRequest.call(this, {
        locale: request['locale'],
        conversationId: request['conversationId'],
        price: utils.formatPrice(request['price']),
        basketId: request['basketId'],
        paymentGroup: request['paymentGroup'],
        callbackUrl: request['callbackUrl'],
        currency: request['currency'],
        paidPrice: utils.formatPrice(request['paidPrice']),
        paymentChannel: request['paymentChannel'],
        enabledInstallments: request['enabledInstallments'],
        buyer: Buyer.body(request["buyer"]),
        shippingAddress: Address.body(request["shippingAddress"]),
        billingAddress: Address.body(request["billingAddress"]),
        basketItems: request["basketItems"].map(function (basketItem) {
            return BasketItem.body(basketItem);
        })
    });
}

util.inherits(PayWithIyzicoInitializeRequest, BaseRequest);

module.exports = PayWithIyzicoInitializeRequest;
