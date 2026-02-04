const Iyzipay = require('../lib/Iyzipay');
const options = require('./data/options');
const verifySignature = require('../test/unit/verifySignature');

describe("Iyzipay refund V2 API Test", function () {
    let iyzipay;
    let secretKey;

    before(function (done) {
        iyzipay = new Iyzipay(options);
        secretKey = iyzipay._config.secretKey;
        done();
    });

    describe("refund V2", function () {
        it("refund V2 init api test", function (done) {
            var request = {
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                paymentId: '2921546163',
                price: 3.12,
                currency: Iyzipay.CURRENCY.TRY,
                ip: '85.34.78.112'
            };
            iyzipay.refundV2.create(request, function (err, result) {
                console.log(err, result);
                if (result.status === 'success') {
                    const { paymentId, conversationId, signature } = result;
                    verifySignature([paymentId, conversationId], secretKey, signature);
                }
                done();
            });
        });
    });
});
