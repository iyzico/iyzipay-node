'use strict';

var Address = require('./Address');

function SubscriptionCustomer() {
}

SubscriptionCustomer.body = function (data) {
    return typeof data !== 'undefined' ? {
        name: data['name'],
        surname: data['surname'],
        identityNumber: data['identityNumber'],
        email: data['email'],
        gsmNumber: data['gsmNumber'],
        billingAddress: Address.body(data['billingAddress']),
        shippingAddress: Address.body(data['shippingAddress'])
    } : undefined;
};

module.exports = SubscriptionCustomer;
