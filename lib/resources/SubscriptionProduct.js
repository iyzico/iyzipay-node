'use strict';

var IyzipayResource = require('../IyzipayResource');

function SubscriptionProduct() {
    this._config = arguments[0];
    this._api = {
        create: {
            path: '/v2/subscription/products',
            method: 'POST',
            requestModel: 'CreateSubscriptionProductRequest'
        },
        update: {
            path: '/v2/subscription/products/{productReferenceCode}',
            method: 'POST',
            requestModel: 'UpdateSubscriptionProductRequest',
            pathVariables: 'SubscriptionProductPathRequest'
        },
        delete: {
            path: '/v2/subscription/products/{productReferenceCode}',
            method: 'DELETE',
            pathVariables: 'SubscriptionProductPathRequest'
        },
        retrieve: {
            path: '/v2/subscription/products/{productReferenceCode}',
            method: 'GET',
            pathVariables: 'SubscriptionProductPathRequest'
        },
        retrieveList: {
            path: '/v2/subscription/products',
            method: 'GET',
            queryString: 'RetrieveSubscriptionProductListRequest'
        }
    };
}

SubscriptionProduct.prototype = new IyzipayResource();

module.exports = SubscriptionProduct;
