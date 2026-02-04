var should = require('should'),
    Iyzipay = require('../../lib/Iyzipay');

describe('RefundV2 Resource', function () {

    it('should create refund v2', function (done) {
        var iyzipay = new Iyzipay({
            uri: 'http://uri',
            apiKey: 'apiKey',
            secretKey: 'secretKey'
        });

        var request = {
            locale: "tr",
            conversationId: "123456789",
            paymentId: "25180208",
            price: "15.0",
            currency: "TRY",
            ip: "85.34.78.112"
        };

        var mockResponse = {
            "status": "success",
            "locale": "en",
            "systemTime": 1755704177107,
            "conversationId": "123456789",
            "paymentId": "25180208",
            "price": 15,
            "currency": "TRY",
            "authCode": "581421",
            "hostReference": "mock00007iyzihostrfn",
            "refundHostReference": "mock00007iyzihostrfn",
            "retryable": false,
            "signature": "429ba48e9eef33c89cc942e626c8f4aa4a4784fdc82df64f252caa5ad6233db9"
        };

        iyzipay.refundV2._request = function (method, cb) {
            method.should.equal("create");
            cb(null, null, mockResponse);
        };

        iyzipay.refundV2.create(request, function (err, result) {
            console.log('err:', err);
            console.log('result:', result);
            should.not.exist(err);
            should.exist(result);
            result.status.should.equal("success");
            result.price.should.equal(15);
            result.currency.should.equal("TRY");
            done();
        });
    });
});
