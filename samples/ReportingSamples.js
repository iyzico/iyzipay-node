const Iyzipay = require('../lib/Iyzipay');
const options = require('./data/options');

describe('Reporting API Test', function () {
    let iyzipay;
    let secretKey;

    before(function (done) {
        iyzipay = new Iyzipay(options);
        secretKey = iyzipay._config.secretKey;
        done();
    });

    it('should retrieve reporting transactions', function (done) {
        iyzipay.reportingTransactions.retrieve({
            locale: Iyzipay.LOCALE.TR,
            conversationId: '123456789',
            transactionDate: '2025-01-01 00:00:00',
            page: 1
        }, function (err, result) {
            console.log(err, result);
            done();
        });
    });

    it('should retrieve reporting transaction details', function (done) {
        iyzipay.reportingTransactionDetails.retrieve({
            locale: Iyzipay.LOCALE.TR,
            conversationId: '123456789',
            paymentConversationId: '23324226'
        }, function (err, result) {
            console.log(err, result);
            done();
        });
    });
});
