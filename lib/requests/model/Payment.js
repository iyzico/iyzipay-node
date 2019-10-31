'use strict';

var PaymentCard = require('./PaymentCard'),
    Buyer = require('./Buyer'),
    Address = require('./Address'),
    BasketItem = require('./BasketItem'),
    utils = require('../../utils');

function Payment() {
}

Payment.body = function (data) {

    return typeof data !== 'undefined' ? {
        locale: data['locale'],
        conversationId: data['conversationId'],
        price: utils.formatPrice(data['price']),
        paidPrice: utils.formatPrice(data['paidPrice']),
        installment: data['installment'],
        paymentChannel: data['paymentChannel'],
        basketId: data['basketId'],
        paymentGroup: data['paymentGroup'],
        paymentCard: PaymentCard.body(data['paymentCard']),
        buyer: Buyer.body(data['buyer']),
        shippingAddress: Address.body(data['shippingAddress']),
        billingAddress: Address.body(data['billingAddress']),
        basketItems: data['basketItems'].map(function (basketItem) {
            return BasketItem.body(basketItem);
        }),
        paymentSource: data['paymentSource'],
        currency: data["currency"],
        gsmNumber: data['gsmNumber'],
        posOrderId: data['posOrderId'],
        connectorName: data['connectorName'],
        callbackUrl: data['callbackUrl']
    } : undefined
};

module.exports = Payment;