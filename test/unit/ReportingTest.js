'use strict';

var should = require('should'),
    Iyzipay = require('../../lib/Iyzipay'),
    RetrieveTransactionsRequest = require('../../lib/requests/RetrieveTransactionsRequest');

describe('Reporting Transactions', function () {
    var iyzipay = new Iyzipay({
        uri: 'https://sandbox-api.iyzipay.com',
        apiKey: 'apiKey',
        secretKey: 'secretKey'
    });

    describe('Retrieving Transactions', function () {
        it('should initialize reporting transactions with correct api configuration', function (done) {
            var reportingTransactions = iyzipay.reportingTransactions;
            reportingTransactions._api.retrieve.should.have.property('path', '/v2/reporting/payment/transactions');
            reportingTransactions._api.retrieve.should.have.property('method', 'GET');
            reportingTransactions._api.retrieve.should.have.property('queryString', 'RetrieveTransactionsRequest');
            done();
        });

        it('should create RetrieveTransactionsRequest with correct properties', function (done) {
            var request = new RetrieveTransactionsRequest({
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                transactionDate: '2023-01-01 00:00:00',
                page: 1
            });
            var json = request.toJson();
            json.should.have.property('locale', 'tr');
            json.should.have.property('conversationId', '123456789');
            json.should.have.property('transactionDate', '2023-01-01 00:00:00');
            json.should.have.property('page', 1);
            done();
        });
    });
});
