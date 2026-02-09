'use strict';

function IyziLinkFastLink() {
}

IyziLinkFastLink.body = function (data) {
    return typeof data !== 'undefined' ? {
        locale: data['locale'],
        conversationId: data['conversationId'],
        description: data['description'],
        price: data['price'],
        currencyCode: data['currencyCode'],
    } : undefined;
}

module.exports = IyziLinkFastLink;
