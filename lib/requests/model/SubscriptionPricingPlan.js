'use strict';

var Address = require('./Address');

function SubscriptionPricingPlan() {
}

SubscriptionPricingPlan.body = function (data) {
    return typeof data !== 'undefined' ? {
        locale: data['locale'],
        conversationId: data['conversationId'],
        name: data['name'],
        price: data['price'],
        currencyCode: data['currencyCode'],
        paymentInterval: data['paymentInterval'],
        paymentIntervalCount: data['paymentIntervalCount'],
        trialPeriodDays: data['trialPeriodDays'],
        planPaymentType: data['planPaymentType']
    } : undefined;
};

module.exports = SubscriptionPricingPlan;
