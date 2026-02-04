const should = require('should');
const Iyzipay = require('../../lib/Iyzipay');

describe('Pay With Iyzico', function () {

    it('should initialize pay with iyzico', function (done) {
        const iyzipay = new Iyzipay({
            uri: 'http://uri',
            apiKey: 'apiKey',
            secretKey: 'secretKey'
        });

        const request = {
            locale: "tr",
            conversationId: "conversationID",
            price: 10.0,
            basketId: "basketID",
            paymentGroup: "PRODUCT",
            callbackUrl: "callbackUrl",
            currency: "TRY",
            paidPrice: 10.0,
            paymentChannel: "WEB",
            enabledInstallments: [1, 2, 3, 6, 9, 12],
            buyer: {
                id: "buyerID",
                name: "buyerName",
                surname: "buyerSurname",
                identityNumber: "11111111111",
                email: "email@email.com",
                gsmNumber: "+905350000000",
                registrationAddress: "Altunizade Mah. İnci Çıkmazı Sokak No: 3 İç Kapı No: 10 Üsküdar İstanbul",
                city: "Istanbul",
                country: "Turkey",
                ip: "85.34.78.112",
                zipCode: "34732",
                registrationDate: "2013-04-21 15:12:09",
                lastLoginDate: "2015-10-05 12:43:35"
            },
            shippingAddress: {
                address: "Altunizade Mah. İnci Çıkmazı Sokak No: 3 İç Kapı No: 10 Üsküdar İstanbul",
                contactName: "Contact Name",
                city: "Istanbul",
                country: "Turkey",
                zipCode: "34742"
            },
            billingAddress: {
                address: "Burhaniye Mahallesi Atilla Sokak No:7 Üsküdar",
                contactName: "Contact Name",
                city: "Istanbul",
                country: "Turkey",
                zipCode: "34700"
            },
            basketItems: [
                {
                    id: "ItemID",
                    price: 10.0,
                    name: "product Name",
                    category1: "Category Name",
                    itemType: "PHYSICAL"
                }
            ]
        };

        const mockResponse = {
            status: "success",
            locale: "en",
            systemTime: 1755252275214,
            conversationId: "conversationID",
            token: "54481021-e605-407e-93d7-776ef481c4d7",
            tokenExpireTime: 1800,
            payWithIyzicoPageUrl: "https://sandbox-ode.iyzico.com/?token=54481021-e605-407e-93d7-776ef481c4d7&lang=tr",
            signature: "a35338903267271c38465924d7d1903b2e10870bebaef1a00923be864e475818"
        };

        iyzipay.payWithIyzico._request = function (method, cb) {
            should.equal(method, 'initialize');
            cb(null, null, mockResponse);
        };

        iyzipay.payWithIyzico.initialize(request, function (err, result) {
            should.not.exist(err);
            should.exist(result);
            should.exist(result.token);
            result.token.should.equal('54481021-e605-407e-93d7-776ef481c4d7');
            done();
        });
    });
});
