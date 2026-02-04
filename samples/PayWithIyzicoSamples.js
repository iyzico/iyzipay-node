const Iyzipay = require('../lib/Iyzipay');
const options = require('./data/options');
const verifySignature = require('../test/unit/verifySignature');

describe('PayWithIyzico API Test', function () {
    let iyzipay;
    let secretKey;

    before(function (done) {
        iyzipay = new Iyzipay(options);
        secretKey = iyzipay._config.secretKey;
        done();
    });

    it('should initialize pay with iyzipay', function (done) {
        const request = {
            locale: Iyzipay.LOCALE.TR,
            conversationId: 'conversationID',
            price: 10.0,
            basketId: 'basketID',
            paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
            callbackUrl: 'callbackUrl',
            currency: Iyzipay.CURRENCY.TRY,
            paidPrice: 10.0,
            paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
            enabledInstallments: [1, 2, 3, 6, 9, 12],
            buyer: {
                id: 'buyerID',
                name: 'buyerName',
                surname: 'buyerSurname',
                identityNumber: '11111111111',
                email: 'email@email.com',
                gsmNumber: '+905350000000',
                registrationAddress: 'Altunizade Mah. İnci Çıkmazı Sokak No: 3 İç Kapı No: 10 Üsküdar İstanbul',
                city: 'Istanbul',
                country: 'Turkey',
                ip: '85.34.78.112',
                zipCode: '34732',
                registrationDate: '2013-04-21 15:12:09',
                lastLoginDate: '2015-10-05 12:43:35'
            },
            shippingAddress: {
                address: 'Altunizade Mah. İnci Çıkmazı Sokak No: 3 İç Kapı No: 10 Üsküdar İstanbul',
                contactName: 'Contact Name',
                city: 'Istanbul',
                country: 'Turkey',
                zipCode: '34742'
            },
            billingAddress: {
                address: 'Burhaniye Mahallesi Atilla Sokak No:7 Üsküdar',
                contactName: 'Contact Name',
                city: 'Istanbul',
                country: 'Turkey',
                zipCode: '34700'
            },
            basketItems: [
                {
                    id: 'ItemID',
                    price: 10.0,
                    name: 'product Name',
                    category1: 'Category Name',
                    itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                    subMerchantKey: 'Iw9lDFmlfXPyLEu/m4f1oxV9c7U=',
                    subMerchantPrice: 10.0
                }
            ]
        };

        iyzipay.payWithIyzico.initialize(request, function (err, result) {
            console.log(err, result);
            if (result.status === 'success') {
                const { token, conversationId, signature } = result;
                verifySignature([conversationId, token], secretKey, signature);
            }
            done();
        });
    });
});
