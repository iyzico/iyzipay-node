'use strict';

var IyzipayResource = require('../IyzipayResource');

function SubscriptionCustomer() {
    this._config = arguments[0];
    this._api = {
        create: {
            path: '/v2/subscription/customers',
            method: 'POST',
            requestModel: 'CreateSubscriptionCustomerRequest'
        },
        update: {
            path: '/v2/subscription/customers/{customerReferenceCode}',
            method: 'POST',
            requestModel: 'UpdateSubscriptionCustomerRequest',
            pathVariables: 'SubscriptionCustomerPathRequest'
        },
        retrieve: {
            path: '/v2/subscription/customers/{customerReferenceCode}',
            method: 'GET',
            pathVariables: 'SubscriptionCustomerPathRequest'
        },
        retrieveList: {
            path: '/v2/subscription/customers',
            method: 'GET',
            queryString: 'RetrieveSubscriptionCustomerListRequest'
        }
    };
}

SubscriptionCustomer.prototype = new IyzipayResource();

module.exports = SubscriptionCustomer;
