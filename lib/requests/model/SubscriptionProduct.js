'use strict';

function SubscriptionProduct() {
}

SubscriptionProduct.body = function (data) {
    return typeof data !== 'undefined' ? {
        locale: data['locale'],
        conversationId: data['conversationId'],
        name: data["name"],
        description: data["description"]
    } : undefined;
};

module.exports = SubscriptionProduct;
