'use strict';

function PaymentCard() {
}

PaymentCard.body = function (data) {

    return typeof data !== 'undefined' ? {
        cardHolderName: data["cardHolderName"],
        cardNumber: data["cardNumber"],
        expireYear: data["expireYear"],
        expireMonth: data["expireMonth"],
        cvc: data["cvc"],
        registerCard: data["registerCard"],
        cardAlias: data["cardAlias"],
        cardUserKey: data["cardUserKey"],
        cardToken: data["cardToken"],
        consumerToken: data["consumerToken"],
        registerConsumerCard: data["registerConsumerCard"],
        ucsToken: data["ucsToken"]
    } : undefined
};

module.exports = PaymentCard;