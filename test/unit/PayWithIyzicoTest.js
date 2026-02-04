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

    it('should retrieve pay with iyzico result', function (done) {
        const iyzipay = new Iyzipay({
            uri: 'http://uri',
            apiKey: 'apiKey',
            secretKey: 'secretKey'
        });

        const request = {
            locale: "en",
            conversationId: "8152109759",
            token: "da7431f4-89fc-4f65-8533-d83a4fede7d9"
        };

        const mockResponse = {
            "status": "success",
            "locale": "en",
            "systemTime": 1755252706797,
            "conversationId": "8152109759",
            "price": 10,
            "paidPrice": 10,
            "installment": 1,
            "paymentId": "25152948",
            "fraudStatus": 1,
            "merchantCommissionRate": 0,
            "merchantCommissionRateAmount": 0,
            "iyziCommissionRateAmount": 0.349,
            "iyziCommissionFee": 0.25,
            "cardType": "CREDIT_CARD",
            "cardAssociation": "MASTER_CARD",
            "cardFamily": "Axess",
            "binNumber": "552608",
            "lastFourDigits": "0006",
            "basketId": "basketID",
            "currency": "TRY",
            "itemTransactions": [
                {
                    "itemId": "ItemID",
                    "paymentTransactionId": "27142369",
                    "transactionStatus": 2,
                    "price": 10,
                    "paidPrice": 10,
                    "merchantCommissionRate": 0,
                    "merchantCommissionRateAmount": 0,
                    "iyziCommissionRateAmount": 0.349,
                    "iyziCommissionFee": 0.25,
                    "blockageRate": 0,
                    "blockageRateAmountMerchant": 0,
                    "blockageRateAmountSubMerchant": 0,
                    "blockageResolvedDate": "2025-08-23 00:00:00",
                    "subMerchantPrice": 0,
                    "subMerchantPayoutRate": 0,
                    "subMerchantPayoutAmount": 0,
                    "merchantPayoutAmount": 9.401,
                    "convertedPayout": {
                        "paidPrice": 10,
                        "iyziCommissionRateAmount": 0.349,
                        "iyziCommissionFee": 0.25,
                        "blockageRateAmountMerchant": 0,
                        "blockageRateAmountSubMerchant": 0,
                        "subMerchantPayoutAmount": 0,
                        "merchantPayoutAmount": 9.401,
                        "iyziConversionRate": 0,
                        "iyziConversionRateAmount": 0,
                        "currency": "TRY"
                    }
                }
            ],
            "authCode": "277568",
            "phase": "AUTH",
            "hostReference": "mock00007iyzihostrfn",
            "signature": "57b1be1f094d17da286c748e2b2779e078e550bafe9734d4fd8c092aeee022be",
            "token": "0b7b67d2-fdf0-4c9a-905f-2b0003b1b8c7",
            "callbackUrl": "callbackUrl",
            "paymentStatus": "SUCCESS",
            "memberEmail": "test@gmail.com",
            "memberGsmNumber": "+905555555555"
        };

        iyzipay.payWithIyzico._request = function (method, cb) {
            should.equal(method, 'retrieve');
            cb(null, null, mockResponse);
        };

        iyzipay.payWithIyzico.retrieve(request, function (err, result) {
            should.not.exist(err);
            should.exist(result);
            should.exist(result.paymentId);
            result.paymentId.should.equal('25152948');
            done();
        });
    });
});
