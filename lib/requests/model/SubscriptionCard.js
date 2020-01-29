'use strict';

function SubscriptionCard() {
}

SubscriptionCard.body = function (data) {

    return typeof data !== 'undefined' ? {
        cardHolderName: data['cardHolderName'],
        cardNumber: data['cardNumber'],
        expireYear: data['expireYear'],
        expireMonth: data['expireMonth'],
        cvc: data['cvc'],
        cardUserKey: data['cardUserKey'],
        cardToken: data['cardToken'],
        ucsToken: data['ucsToken'],
        consumerToken: data['consumerToken'],
        registerConsumerCard: data['registerConsumerCard'],
    } : undefined
};

module.exports = SubscriptionCard;
