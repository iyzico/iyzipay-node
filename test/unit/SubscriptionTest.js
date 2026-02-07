'use strict';

var should = require('should'),
    Iyzipay = require('../../lib/Iyzipay');

describe('Subscription Customer', function () {
    var iyzipay = new Iyzipay({
        uri: 'https://sandbox-api.iyzipay.com',
        apiKey: 'apiKey',
        secretKey: 'secretKey'
    });

    describe('Creating Customer', function () {
        it('should initialize subscription customer create with correct api configuration', function (done) {
            var subscriptionCustomer = iyzipay.subscriptionCustomer;
            subscriptionCustomer._api.create.should.have.property('path', '/v2/subscription/customers');
            subscriptionCustomer._api.create.should.have.property('method', 'POST');
            subscriptionCustomer._api.create.should.have.property('requestModel', 'CreateSubscriptionCustomerRequest');
            done();
        });

        it('should create CreateSubscriptionCustomerRequest with correct properties', function (done) {
            var request = new (require('../../lib/requests/CreateSubscriptionCustomerRequest'))({
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                name: 'John',
                surname: 'Doe',
                identityNumber: '11111111111',
                email: 'johndoe@test.com',
                gsmNumber: '+905350000000',
                billingAddress: {
                    contactName: 'John Doe',
                    city: 'Istanbul',
                    country: 'Turkey',
                    address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                    zipCode: '34732'
                },
                shippingAddress: {
                    contactName: 'John Doe',
                    city: 'Istanbul',
                    country: 'Turkey',
                    address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                    zipCode: '34732'
                }
            });
            var json = request.toJson();
            json.should.have.property('locale', 'tr');
            json.should.have.property('conversationId', '123456789');
            json.should.have.property('name', 'John');
            json.should.have.property('surname', 'Doe');
            json.should.have.property('identityNumber', '11111111111');
            json.should.have.property('email', 'johndoe@test.com');
            json.should.have.property('gsmNumber', '+905350000000');
            json.billingAddress.should.have.property('contactName', 'John Doe');
            json.shippingAddress.should.have.property('contactName', 'John Doe');
            done();
        });
    });

    describe('Deleting Customer', function () {
        it('should initialize subscription customer delete with correct api configuration', function (done) {
            var subscriptionCustomer = iyzipay.subscriptionCustomer;
            subscriptionCustomer._api.delete.should.have.property('path', '/v2/subscription/customers/delete/{customerReferenceCode}');
            subscriptionCustomer._api.delete.should.have.property('method', 'POST');
            subscriptionCustomer._api.delete.should.have.property('pathVariables', 'SubscriptionCustomerPathRequest');
            done();
        });

        it('should create SubscriptionCustomerPathRequest with correct properties', function (done) {
            var request = new (require('../../lib/requests/SubscriptionCustomerPathRequest'))({
                customerReferenceCode: '123456789'
            });
            var json = request.toJson();
            json.should.have.property('customerReferenceCode', '123456789');
            done();
        });
    });

    describe('Updating Customer', function () {
        it('should initialize subscription customer update with correct api configuration', function (done) {
            var subscriptionCustomer = iyzipay.subscriptionCustomer;
            subscriptionCustomer._api.update.should.have.property('path', '/v2/subscription/customers/{customerReferenceCode}');
            subscriptionCustomer._api.update.should.have.property('method', 'POST');
            subscriptionCustomer._api.update.should.have.property('requestModel', 'UpdateSubscriptionCustomerRequest');
            subscriptionCustomer._api.update.should.have.property('pathVariables', 'SubscriptionCustomerPathRequest');
            done();
        });

        it('should create UpdateSubscriptionCustomerRequest with correct properties', function (done) {
            var request = new (require('../../lib/requests/UpdateSubscriptionCustomerRequest'))({
                name: 'John',
                surname: 'Doe',
                identityNumber: '11111111111',
                email: 'johndoe@test.com',
                gsmNumber: '+905350000000',
                billingAddress: {
                    contactName: 'John Doe',
                    city: 'Istanbul',
                    country: 'Turkey',
                    address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                    zipCode: '34732'
                },
                shippingAddress: {
                    contactName: 'John Doe',
                    city: 'Istanbul',
                    country: 'Turkey',
                    address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                    zipCode: '34732'
                }
            });
            var json = request.toJson();
            json.should.have.property('name', 'John');
            json.should.have.property('surname', 'Doe');
            json.should.have.property('identityNumber', '11111111111');
            json.should.have.property('email', 'johndoe@test.com');
            json.should.have.property('gsmNumber', '+905350000000');
            json.billingAddress.should.have.property('contactName', 'John Doe');
            json.shippingAddress.should.have.property('contactName', 'John Doe');
            done();
        });
    });

    describe('Retrieving Customer', function () {
        it('should initialize subscription customer retrieve with correct api configuration', function (done) {
            var subscriptionCustomer = iyzipay.subscriptionCustomer;
            subscriptionCustomer._api.retrieve.should.have.property('path', '/v2/subscription/customers/{customerReferenceCode}');
            subscriptionCustomer._api.retrieve.should.have.property('method', 'GET');
            subscriptionCustomer._api.retrieve.should.have.property('pathVariables', 'SubscriptionCustomerPathRequest');
            done();
        });
    });

    describe('Retrieving Customer List', function () {
        it('should initialize subscription customer retrieve list with correct api configuration', function (done) {
            var subscriptionCustomer = iyzipay.subscriptionCustomer;
            subscriptionCustomer._api.retrieveList.should.have.property('path', '/v2/subscription/customers');
            subscriptionCustomer._api.retrieveList.should.have.property('method', 'GET');
            subscriptionCustomer._api.retrieveList.should.have.property('queryString', 'RetrieveSubscriptionCustomerListRequest');
            done();
        });

        it('should create RetrieveSubscriptionCustomerListRequest with correct properties', function (done) {
            var request = new (require('../../lib/requests/RetrieveSubscriptionCustomerListRequest'))({
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                page: 1,
                count: 10
            });
            var json = request.toJson();
            json.should.have.property('locale', 'tr');
            json.should.have.property('conversationId', '123456789');
            json.should.have.property('page', 1);
            json.should.have.property('count', 10);
            done();
        });
    });
});