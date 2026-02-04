'use strict';

var should = require('should'),
    Iyzipay = require('../../lib/Iyzipay'),
    RetrieveTransactionsRequest = require('../../lib/requests/RetrieveTransactionsRequest');

describe('Reporting', function () {
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

    describe('Retrieving Transaction Details', function () {
        it('should initialize reporting transaction details with correct api configuration', function (done) {
            var reportingTransactionDetails = iyzipay.reportingTransactionDetails;
            reportingTransactionDetails._api.retrieve.should.have.property('path', '/v2/reporting/payment/details');
            reportingTransactionDetails._api.retrieve.should.have.property('method', 'GET');
            reportingTransactionDetails._api.retrieve.should.have.property('queryString', 'RetrieveTransactionDetailsRequest');
            done();
        });

        it('should create RetrieveTransactionDetailsRequest with correct properties', function (done) {
            var request = new (require('../../lib/requests/RetrieveTransactionDetailsRequest'))({
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                paymentConversationId: '12345'
            });
            var json = request.toJson();
            json.should.have.property('locale', 'tr');
            json.should.have.property('conversationId', '123456789');
            json.should.have.property('paymentConversationId', '12345');
            done();
        });
    });

    describe('Retrieving Scroll Transactions', function () {
        it('should initialize reporting scroll transactions with correct api configuration', function (done) {
            var reportingScrollTransactions = iyzipay.reportingScrollTransactions;
            reportingScrollTransactions._api.retrieve.should.have.property('path', '/v2/reporting/payment/scroll-transactions');
            reportingScrollTransactions._api.retrieve.should.have.property('method', 'GET');
            reportingScrollTransactions._api.retrieve.should.have.property('queryString', 'RetrieveScrollTransactionsRequest');
            done();
        });

        it('should create RetrieveScrollTransactionsRequest with correct properties', function (done) {
            var request = new (require('../../lib/requests/RetrieveScrollTransactionsRequest'))({
                conversationId: '123456789',
                transactionDate: '2025-01-01 00:00:00',
                documentScrollVoSortingOrder: 'ASC',
                lastId: '12345'
            });
            var json = request.toJson();
            json.should.have.property('conversationId', '123456789');
            json.should.have.property('transactionDate', '2025-01-01 00:00:00');
            json.should.have.property('documentScrollVoSortingOrder', 'ASC');
            json.should.have.property('lastId', '12345');
            done();
        });
    });

    describe('Retrieving Payout Completed', function () {
        it('should initialize reporting payout completed with correct api configuration', function (done) {
            var reportingPayoutCompleted = iyzipay.reportingPayoutCompleted;
            reportingPayoutCompleted._api.retrieve.should.have.property('path', '/reporting/settlement/payoutcompleted');
            reportingPayoutCompleted._api.retrieve.should.have.property('method', 'POST');
            reportingPayoutCompleted._api.retrieve.should.have.property('requestModel', 'RetrievePayoutCompletedRequest');
            done();
        });

        it('should create RetrievePayoutCompletedRequest with correct properties', function (done) {
            var request = new (require('../../lib/requests/RetrievePayoutCompletedRequest'))({
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                date: '2025-01-01 00:00:00'
            });
            var json = request.toJson();
            json.should.have.property('locale', 'tr');
            json.should.have.property('conversationId', '123456789');
            json.should.have.property('date', '2025-01-01 00:00:00');
            done();
        });
    });
});
