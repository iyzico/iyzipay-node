'use strict';

function PaymentCard() {
}

//Object key order is important
PaymentCard.body = function (data) {

    return typeof data !== 'undefined' ? {
        cardHolderName: data["cardHolderName"],
        cardNumber: data["cardNumber"],
        expireYear: data["expireYear"],
        expireMonth: data["expireMonth"],
        cvc: data["cvc"],
        registerCard: data["registerCard"],
        cardAlias: data["cardAlias"],
        cardToken: data["cardToken"],
        cardUserKey: data["cardUserKey"],
        consumerToken: data["consumerToken"],
        registerConsumerCard: data["registerConsumerCard"],
        ucsToken: data["ucsToken"]
    } : undefined
};

module.exports = PaymentCard;