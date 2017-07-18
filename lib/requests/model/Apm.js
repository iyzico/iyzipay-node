'use strict';

var Buyer = require('./Buyer'),
    Address = require('./Address'),
    BasketItem = require('./BasketItem'),
    utils = require('../../utils');

function Apm() {
}

Apm.body = function (data) {

    return typeof data !== 'undefined' ? {
        locale: data['locale'],
        conversationId: data['conversationId'],
        price: utils.formatPrice(data['price']),
        paidPrice: utils.formatPrice(data['paidPrice']),
        paymentChannel: data['paymentChannel'],
        paymentGroup: data['paymentGroup'],
        paymentSource: data['paymentSource'],
        currency: data['currency'],
        merchantOrderId: data['merchantOrderId'],
        countryCode: data['countryCode'],
        accountHolderName: data['accountHolderName'],
        merchantCallbackUrl: data['merchantCallbackUrl'],
        merchantErrorUrl: data['merchantErrorUrl'],
        merchantNotificationUrl: data['merchantNotificationUrl'],
        apmType: data['apmType'],
        basketId: data['basketId'],
        buyer: Buyer.body(data['buyer']),
        shippingAddress: Address.body(data['shippingAddress']),
        billingAddress: Address.body(data['billingAddress']),
        basketItems: data['basketItems'].map(function (basketItem) {
            return BasketItem.body(basketItem);
        })
    } : undefined
};

module.exports = Apm;