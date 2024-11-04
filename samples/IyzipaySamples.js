const should = require('should');
const assert = require('assert');
const Iyzipay = require('../lib/Iyzipay');
const utils = require('../lib/utils');
const options = require('./data/options');

const verifySignature = (params, secretKey, signature) => {
    const calculatedSignature = utils.calculateHmacSHA256Signature(params, secretKey);
    const verified = signature === calculatedSignature;
    console.log('Signature verified:', verified);
};

describe('Iyzipay API Test', function () {

    let iyzipay;
    let secretKey;

    before(function (done) {
        iyzipay = new Iyzipay(options);
        secretKey = iyzipay._config.secretKey;
        done();
    });

    describe('ApiTest', function () {

        it('should test api', function (done) {
            iyzipay.apiTest.retrieve({}, function (err, result) {
                should.not.exist(err);
                should.exist(result);
                result.should.have.property('status', 'success');
                result.should.have.property('locale', 'tr');
                result.should.have.property('systemTime').and.is.a.Number();
                done();
            });
        });
    });

    describe('Approval', function () {

        it('should approve payment item', function (done) {
            iyzipay.approval.create({
                locale: Iyzipay.LOCALE.TR,
                conversationId: "123456789",
                paymentTransactionId: "1"
            }, function (err, result) {
                console.log(err, result);
                done();
            });
        });
    });

    describe('Disapproval', function () {

        it('should disapprove payment item', function (done) {
            iyzipay.disapproval.create({
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                paymentTransactionId: '1'
            }, function (err, result) {
                console.log(err, result);
                done();
            });
        })
    });

    describe('BinNumber', function () {

        it('should retrieve bin', function (done) {
            iyzipay.binNumber.retrieve({
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                binNumber: '554960'
            }, function (err, result) {
                console.log(err, result);
                done();
            });
        });
    });

    describe('Bkm', function () {

        it('should initialize bkm', function (done) {
            var request = {
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                price: '1',
                basketId: 'B67832',
                paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
                callbackUrl: 'https://www.merchant.com/callback',
                enabledInstallments: [2, 3, 6, 9],
                buyer: {
                    id: 'BY789',
                    name: 'John',
                    surname: 'Doe',
                    gsmNumber: '+905350000000',
                    email: 'email@email.com',
                    identityNumber: '74300864791',
                    lastLoginDate: '2015-10-05 12:43:35',
                    registrationDate: '2013-04-21 15:12:09',
                    registrationAddress: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                    ip: '85.34.78.112',
                    city: 'Istanbul',
                    country: 'Turkey',
                    zipCode: '34732'
                },
                shippingAddress: {
                    contactName: 'Jane Doe',
                    city: 'Istanbul',
                    country: 'Turkey',
                    address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                    zipCode: '34742'
                },
                billingAddress: {
                    contactName: 'Jane Doe',
                    city: 'Istanbul',
                    country: 'Turkey',
                    address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                    zipCode: '34742'
                },
                basketItems: [
                    {
                        id: 'BI101',
                        name: 'Binocular',
                        category1: 'Collectibles',
                        category2: 'Accessories',
                        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                        price: '0.3'
                    },
                    {
                        id: 'BI102',
                        name: 'Game code',
                        category1: 'Game',
                        category2: 'Online Game Items',
                        itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
                        price: '0.5'
                    },
                    {
                        id: 'BI103',
                        name: 'Usb',
                        category1: 'Electronics',
                        category2: 'Usb / Cable',
                        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                        price: '0.2'
                    }
                ]
            };

            iyzipay.bkmInitialize.create(request, function (err, result) {
                console.log(err, result);

                if (result.status === 'success') {
                    const { token, conversationId, signature } = result;
                    verifySignature([token, conversationId], secretKey, signature);
                }
                done();
            });
        });

        it('should retrieve bkm result', function (done) {
            iyzipay.bkm.retrieve({
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                token: 'token'
            }, function (err, result) {
                console.log(err, result);

                if (result.status === 'success') {
                    const { paymentId, paymentStatus, basketId, conversationId, currency, paidPrice, price, token, signature } = result;
                    verifySignature([paymentId, paymentStatus, basketId, conversationId, currency, paidPrice, price, token], secretKey, signature);
                }
                done();
            });
        });
    });

    describe('Cancel', function () {

        it('should cancel payment', function (done) {
            iyzipay.cancel.create({
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                paymentId: '1',
                ip: '85.34.78.112'
            }, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should cancel payment with reason and description', function (done) {
            iyzipay.cancel.create({
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                paymentId: '1',
                ip: '85.34.78.112',
                reason: Iyzipay.REFUND_REASON.OTHER,
                description: 'customer requested for default sample'
            }, function (err, result) {
                console.log(err, result);
                done();
            });
        });
    });

    describe('Card', function () {

        it('should create user and add card', function (done) {
            iyzipay.card.create({
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                email: 'email@email.com',
                externalId: 'external id',
                card: {
                    cardAlias: 'card alias',
                    cardHolderName: 'John Doe',
                    cardNumber: '5528790000000008',
                    expireMonth: '12',
                    expireYear: '2030'
                }
            }, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should create card', function (done) {
            iyzipay.card.create({
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                cardUserKey: 'card user key',
                card: {
                    cardAlias: 'card alias',
                    cardHolderName: 'John Doe',
                    cardNumber: '5528790000000008',
                    expireMonth: '12',
                    expireYear: '2030'
                }
            }, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should delete card', function (done) {
            iyzipay.card.delete({
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                cardToken: 'card token',
                cardUserKey: 'card user key'
            }, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should retrieve cards', function (done) {
            iyzipay.cardList.retrieve({
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                cardUserKey: 'card user key'
            }, function (err, result) {
                console.log(err, result);
                done();
            });
        });
    });

    describe('Checkout Form', function () {

        it('should initialize checkout form', function (done) {
            var request = {
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                price: '1',
                paidPrice: '1.2',
                currency: Iyzipay.CURRENCY.TRY,
                basketId: 'B67832',
                paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
                callbackUrl: 'https://www.merchant.com/callback',
                enabledInstallments: [2, 3, 6, 9],
                buyer: {
                    id: 'BY789',
                    name: 'John',
                    surname: 'Doe',
                    gsmNumber: '+905350000000',
                    email: 'email@email.com',
                    identityNumber: '74300864791',
                    lastLoginDate: '2015-10-05 12:43:35',
                    registrationDate: '2013-04-21 15:12:09',
                    registrationAddress: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                    ip: '85.34.78.112',
                    city: 'Istanbul',
                    country: 'Turkey',
                    zipCode: '34732'
                },
                shippingAddress: {
                    contactName: 'Jane Doe',
                    city: 'Istanbul',
                    country: 'Turkey',
                    address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                    zipCode: '34742'
                },
                billingAddress: {
                    contactName: 'Jane Doe',
                    city: 'Istanbul',
                    country: 'Turkey',
                    address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                    zipCode: '34742'
                },
                basketItems: [
                    {
                        id: 'BI101',
                        name: 'Binocular',
                        category1: 'Collectibles',
                        category2: 'Accessories',
                        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                        price: '0.3'
                    },
                    {
                        id: 'BI102',
                        name: 'Game code',
                        category1: 'Game',
                        category2: 'Online Game Items',
                        itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
                        price: '0.5'
                    },
                    {
                        id: 'BI103',
                        name: 'Usb',
                        category1: 'Electronics',
                        category2: 'Usb / Cable',
                        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                        price: '0.2'
                    }
                ]
            };

            iyzipay.checkoutFormInitialize.create(request, function (err, result) {
                console.log(err, result);

                if (result.status === 'success') {
                    const { token, conversationId, signature } = result;
                    verifySignature([conversationId, token], secretKey, signature);
                }
                done();
            });
        });

        it('should retrieve checkout form result', function (done) {
            iyzipay.checkoutForm.retrieve({
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                token: 'token'
            }, function (err, result) {
                console.log(err, result);

                if (result.status === 'success') {
                    const { paymentStatus, paymentId, currency, basketId, conversationId, paidPrice, price, token, signature } = result;
                    verifySignature([paymentStatus, paymentId, currency, basketId, conversationId, paidPrice, price, token], secretKey, signature);
                }
                done();
            });
        });

        it('should initialize checkout form initialize preauth', function (done) {
            var request = {
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                price: '1',
                paidPrice: '1.2',
                currency: Iyzipay.CURRENCY.TRY,
                basketId: 'B67832',
                paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
                callbackUrl: 'https://www.merchant.com/callback',
                enabledInstallments: [2, 3, 6, 9],
                buyer: {
                    id: 'BY789',
                    name: 'John',
                    surname: 'Doe',
                    gsmNumber: '+905350000000',
                    email: 'email@email.com',
                    identityNumber: '74300864791',
                    lastLoginDate: '2015-10-05 12:43:35',
                    registrationDate: '2013-04-21 15:12:09',
                    registrationAddress: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                    ip: '85.34.78.112',
                    city: 'Istanbul',
                    country: 'Turkey',
                    zipCode: '34732'
                },
                shippingAddress: {
                    contactName: 'Jane Doe',
                    city: 'Istanbul',
                    country: 'Turkey',
                    address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                    zipCode: '34742'
                },
                billingAddress: {
                    contactName: 'Jane Doe',
                    city: 'Istanbul',
                    country: 'Turkey',
                    address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                    zipCode: '34742'
                },
                basketItems: [
                    {
                        id: 'BI101',
                        name: 'Binocular',
                        category1: 'Collectibles',
                        category2: 'Accessories',
                        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                        price: '0.3'
                    },
                    {
                        id: 'BI102',
                        name: 'Game code',
                        category1: 'Game',
                        category2: 'Online Game Items',
                        itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
                        price: '0.5'
                    },
                    {
                        id: 'BI103',
                        name: 'Usb',
                        category1: 'Electronics',
                        category2: 'Usb / Cable',
                        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                        price: '0.2'
                    }
                ]
            };

            iyzipay.checkoutFormInitializePreAuth.create(request, function (err, result) {
                console.log(err, result);

                if (result.status === 'success') {
                    const { conversationId, token, signature } = result;
                    verifySignature([conversationId, token], secretKey, signature);
                }
                done();
            });
        });
    });

    describe('Universal Card Storage', function () {

        it('should initialize universal card storage', function (done) {
            var request = {
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                gsmNumber: '+905350000000',
                email: 'email@email.com',
            };

            iyzipay.universalCardStorageInitialize.retrieve(request, function (err, result) {
                console.log(err, result);
                done();
            });
        });
    });

    describe('Installment', function () {

        it('should retrieve installments', function (done) {
            iyzipay.installmentInfo.retrieve({
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                binNumber: '554960',
                price: '100'
            }, function (err, result) {
                console.log(err, result);
                done();
            });
        });
    });

    describe('Payment', function () {

        it('should create payment', function (done) {
            var request = {
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                price: '1',
                paidPrice: '1.2',
                currency: Iyzipay.CURRENCY.TRY,
                installment: '1',
                basketId: 'B67832',
                paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
                paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
                paymentCard: {
                    cardHolderName: 'John Doe',
                    cardNumber: '5528790000000008',
                    expireMonth: '12',
                    expireYear: '2030',
                    cvc: '123',
                    registerCard: '0'
                },
                buyer: {
                    id: 'BY789',
                    name: 'John',
                    surname: 'Doe',
                    gsmNumber: '+905350000000',
                    email: 'email@email.com',
                    identityNumber: '74300864791',
                    lastLoginDate: '2015-10-05 12:43:35',
                    registrationDate: '2013-04-21 15:12:09',
                    registrationAddress: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                    ip: '85.34.78.112',
                    city: 'Istanbul',
                    country: 'Turkey',
                    zipCode: '34732'
                },
                shippingAddress: {
                    contactName: 'Jane Doe',
                    city: 'Istanbul',
                    country: 'Turkey',
                    address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                    zipCode: '34742'
                },
                billingAddress: {
                    contactName: 'Jane Doe',
                    city: 'Istanbul',
                    country: 'Turkey',
                    address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                    zipCode: '34742'
                },
                basketItems: [
                    {
                        id: 'BI101',
                        name: 'Binocular',
                        category1: 'Collectibles',
                        category2: 'Accessories',
                        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                        price: '0.3'
                    },
                    {
                        id: 'BI102',
                        name: 'Game code',
                        category1: 'Game',
                        category2: 'Online Game Items',
                        itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
                        price: '0.5'
                    },
                    {
                        id: 'BI103',
                        name: 'Usb',
                        category1: 'Electronics',
                        category2: 'Usb / Cable',
                        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                        price: '0.2'
                    }
                ]
            };

            iyzipay.payment.create(request, function (err, result) {
                console.log(err, result);

                if (result.status === 'success') {
                    const { paymentId, currency, basketId, conversationId, paidPrice, price, signature } = result;
                    verifySignature([paymentId, currency, basketId, conversationId, paidPrice, price], secretKey, signature);
                }
                done();
            });
        });

        it('should create Non3D Preauth', function (done) {
            var request = {
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                price: '1',
                paidPrice: '1.2',
                currency: Iyzipay.CURRENCY.TRY,
                installment: '1',
                basketId: 'B67832',
                paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
                paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
                paymentCard: {
                    cardHolderName: 'John Doe',
                    cardNumber: '5528790000000008',
                    expireMonth: '12',
                    expireYear: '2030',
                    cvc: '123',
                    registerCard: '0'
                },
                buyer: {
                    id: 'BY789',
                    name: 'John',
                    surname: 'Doe',
                    gsmNumber: '+905350000000',
                    email: 'email@email.com',
                    identityNumber: '74300864791',
                    lastLoginDate: '2015-10-05 12:43:35',
                    registrationDate: '2013-04-21 15:12:09',
                    registrationAddress: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                    ip: '85.34.78.112',
                    city: 'Istanbul',
                    country: 'Turkey',
                    zipCode: '34732'
                },
                shippingAddress: {
                    contactName: 'Jane Doe',
                    city: 'Istanbul',
                    country: 'Turkey',
                    address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                    zipCode: '34742'
                },
                billingAddress: {
                    contactName: 'Jane Doe',
                    city: 'Istanbul',
                    country: 'Turkey',
                    address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                    zipCode: '34742'
                },
                basketItems: [
                    {
                        id: 'BI101',
                        name: 'Binocular',
                        category1: 'Collectibles',
                        category2: 'Accessories',
                        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                        price: '0.3'
                    },
                    {
                        id: 'BI102',
                        name: 'Game code',
                        category1: 'Game',
                        category2: 'Online Game Items',
                        itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
                        price: '0.5'
                    },
                    {
                        id: 'BI103',
                        name: 'Usb',
                        category1: 'Electronics',
                        category2: 'Usb / Cable',
                        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                        price: '0.2'
                    }
                ]
            };

            iyzipay.paymentPreAuth.create(request, function (err, result) {
                console.log(err, result);

                if (result.status === 'success') {
                    const { paymentId, currency, basketId, conversationId, paidPrice, price, signature } = result;
                    verifySignature([paymentId, currency, basketId, conversationId, paidPrice, price], secretKey, signature);
                }
                done();
            });
        });

        it('should create marketplace payment', function (done) {
            var request = {
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                price: '1',
                paidPrice: '1.2',
                currency: Iyzipay.CURRENCY.TRY,
                installment: '1',
                basketId: 'B67832',
                paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
                paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
                paymentCard: {
                    cardHolderName: 'John Doe',
                    cardNumber: '5528790000000008',
                    expireMonth: '12',
                    expireYear: '2030',
                    cvc: '123',
                    registerCard: '0'
                },
                buyer: {
                    id: 'BY789',
                    name: 'John',
                    surname: 'Doe',
                    gsmNumber: '+905350000000',
                    email: 'email@email.com',
                    identityNumber: '74300864791',
                    lastLoginDate: '2015-10-05 12:43:35',
                    registrationDate: '2013-04-21 15:12:09',
                    registrationAddress: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                    ip: '85.34.78.112',
                    city: 'Istanbul',
                    country: 'Turkey',
                    zipCode: '34732'
                },
                shippingAddress: {
                    contactName: 'Jane Doe',
                    city: 'Istanbul',
                    country: 'Turkey',
                    address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                    zipCode: '34742'
                },
                billingAddress: {
                    contactName: 'Jane Doe',
                    city: 'Istanbul',
                    country: 'Turkey',
                    address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                    zipCode: '34742'
                },
                basketItems: [
                    {
                        id: 'BI101',
                        name: 'Binocular',
                        category1: 'Collectibles',
                        category2: 'Accessories',
                        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                        price: '0.3',
                        subMerchantKey: 'sub merchant key',
                        subMerchantPrice: '0.27'
                    },
                    {
                        id: 'BI102',
                        name: 'Game code',
                        category1: 'Game',
                        category2: 'Online Game Items',
                        itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
                        price: '0.5',
                        subMerchantKey: 'sub merchant key',
                        subMerchantPrice: '0.42'
                    },
                    {
                        id: 'BI103',
                        name: 'Usb',
                        category1: 'Electronics',
                        category2: 'Usb / Cable',
                        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                        price: '0.2',
                        subMerchantKey: 'sub merchant key',
                        subMerchantPrice: '0.18'
                    }
                ]
            };

            iyzipay.payment.create(request, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should create payment with registered card', function (done) {
            var request = {
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                price: '1',
                paidPrice: '1.2',
                currency: Iyzipay.CURRENCY.TRY,
                installment: '1',
                basketId: 'B67832',
                paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
                paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
                paymentCard: {
                    cardUserKey: 'card user key',
                    cardToken: 'card token'
                },
                buyer: {
                    id: 'BY789',
                    name: 'John',
                    surname: 'Doe',
                    gsmNumber: '+905350000000',
                    email: 'email@email.com',
                    identityNumber: '74300864791',
                    lastLoginDate: '2015-10-05 12:43:35',
                    registrationDate: '2013-04-21 15:12:09',
                    registrationAddress: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                    ip: '85.34.78.112',
                    city: 'Istanbul',
                    country: 'Turkey',
                    zipCode: '34732'
                },
                shippingAddress: {
                    contactName: 'Jane Doe',
                    city: 'Istanbul',
                    country: 'Turkey',
                    address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                    zipCode: '34742'
                },
                billingAddress: {
                    contactName: 'Jane Doe',
                    city: 'Istanbul',
                    country: 'Turkey',
                    address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                    zipCode: '34742'
                },
                basketItems: [
                    {
                        id: 'BI101',
                        name: 'Binocular',
                        category1: 'Collectibles',
                        category2: 'Accessories',
                        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                        price: '0.3'
                    },
                    {
                        id: 'BI102',
                        name: 'Game code',
                        category1: 'Game',
                        category2: 'Online Game Items',
                        itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
                        price: '0.5'
                    },
                    {
                        id: 'BI103',
                        name: 'Usb',
                        category1: 'Electronics',
                        category2: 'Usb / Cable',
                        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                        price: '0.2'
                    }
                ]
            };

            iyzipay.payment.create(request, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should create payment and save card as ucs', function (done) {
            var request = {
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                gsmNumber: '+905350000000',
                price: '1',
                paidPrice: '1.2',
                currency: Iyzipay.CURRENCY.TRY,
                installment: '1',
                basketId: 'B67832',
                paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
                paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
                paymentCard: {
                    cardHolderName: 'John Doe',
                    cardNumber: '5528790000000008',
                    expireMonth: '12',
                    expireYear: '2030',
                    cvc: '123',
                    registerCard: '0',
                    registerConsumerCard: true
                },
                buyer: {
                    id: 'BY789',
                    name: 'John',
                    surname: 'Doe',
                    gsmNumber: '+905350000000',
                    email: 'email@email.com',
                    identityNumber: '74300864791',
                    lastLoginDate: '2015-10-05 12:43:35',
                    registrationDate: '2013-04-21 15:12:09',
                    registrationAddress: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                    ip: '85.34.78.112',
                    city: 'Istanbul',
                    country: 'Turkey',
                    zipCode: '34732'
                },
                shippingAddress: {
                    contactName: 'Jane Doe',
                    city: 'Istanbul',
                    country: 'Turkey',
                    address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                    zipCode: '34742'
                },
                billingAddress: {
                    contactName: 'Jane Doe',
                    city: 'Istanbul',
                    country: 'Turkey',
                    address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                    zipCode: '34742'
                },
                basketItems: [
                    {
                        id: 'BI101',
                        name: 'Binocular',
                        category1: 'Collectibles',
                        category2: 'Accessories',
                        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                        price: '0.3'
                    },
                    {
                        id: 'BI102',
                        name: 'Game code',
                        category1: 'Game',
                        category2: 'Online Game Items',
                        itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
                        price: '0.5'
                    },
                    {
                        id: 'BI103',
                        name: 'Usb',
                        category1: 'Electronics',
                        category2: 'Usb / Cable',
                        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                        price: '0.2'
                    }
                ]
            };

            iyzipay.payment.create(request, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should create payment with ucs registered card', function (done) {
            var request = {
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                gsmNumber: '+905350000000',
                price: '1',
                paidPrice: '1.2',
                currency: Iyzipay.CURRENCY.TRY,
                installment: '1',
                basketId: 'B67832',
                paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
                paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
                paymentCard: {
                    cardToken: 'card token',
                    ucsToken: 'ucs token',
                    consumerToken: 'consumer token',
                    registerCard: '0',
                    registerConsumerCard: false
                },
                buyer: {
                    id: 'BY789',
                    name: 'John',
                    surname: 'Doe',
                    gsmNumber: '+905350000000',
                    email: 'email@email.com',
                    identityNumber: '74300864791',
                    lastLoginDate: '2015-10-05 12:43:35',
                    registrationDate: '2013-04-21 15:12:09',
                    registrationAddress: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                    ip: '85.34.78.112',
                    city: 'Istanbul',
                    country: 'Turkey',
                    zipCode: '34732'
                },
                shippingAddress: {
                    contactName: 'Jane Doe',
                    city: 'Istanbul',
                    country: 'Turkey',
                    address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                    zipCode: '34742'
                },
                billingAddress: {
                    contactName: 'Jane Doe',
                    city: 'Istanbul',
                    country: 'Turkey',
                    address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                    zipCode: '34742'
                },
                basketItems: [
                    {
                        id: 'BI101',
                        name: 'Binocular',
                        category1: 'Collectibles',
                        category2: 'Accessories',
                        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                        price: '0.3'
                    },
                    {
                        id: 'BI102',
                        name: 'Game code',
                        category1: 'Game',
                        category2: 'Online Game Items',
                        itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
                        price: '0.5'
                    },
                    {
                        id: 'BI103',
                        name: 'Usb',
                        category1: 'Electronics',
                        category2: 'Usb / Cable',
                        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                        price: '0.2'
                    }
                ]
            };

            iyzipay.payment.create(request, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should retrieve payment result', function (done) {
            iyzipay.payment.retrieve({
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                paymentId: '1',
                paymentConversationId: '123456789'
            }, function (err, result) {
                console.log(err, result);

                if (result.status === 'success') {
                    const { paymentId, currency, basketId, conversationId, paidPrice, price, signature } = result;
                    verifySignature([paymentId, currency, basketId, conversationId, paidPrice, price], secretKey, signature);
                }
                done();
            });
        });

        it('should create post auth', function (done) {
            var request = {
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                paymentId: '1',
                paidPrice: '1.2',
                ip: '85.34.78.112',
                currency: Iyzipay.CURRENCY.TRY
            };

            iyzipay.paymentPostAuth.create(request, function (err, result) {
                console.log(err, result);

                if (result.status === 'success') {
                    const { paymentId, currency, basketId, conversationId, paidPrice, price, signature } = result;
                    verifySignature([paymentId, currency, basketId, conversationId, paidPrice, price], secretKey, signature);
                }
                done();
            });
        });
    });

    describe('Payment Item', function () {
        it('should update subMerchantPrice on a single payment transaction', function (done) {
            iyzipay.paymentItem.update(
                {
                    paymentTransactionId: '12345678',
                    subMerchantKey: 'sub merchant key',
                    subMerchantPrice: '18.22'
                },
                function (err, result) {
                    console.log(err, result);
                    done();
                }
            );
        });
    });

    describe('Pecco', function () {

        it('should initialize pecco', function (done) {
            var request = {
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                price: '100000',
                paidPrice: '120000',
                currency: Iyzipay.CURRENCY.IRR,
                basketId: 'B67832',
                paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
                callbackUrl: 'https://www.merchant.com/callback',
                buyer: {
                    id: 'BY789',
                    name: 'John',
                    surname: 'Doe',
                    gsmNumber: '+905350000000',
                    email: 'email@email.com',
                    identityNumber: '74300864791',
                    lastLoginDate: '2015-10-05 12:43:35',
                    registrationDate: '2013-04-21 15:12:09',
                    registrationAddress: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                    ip: '85.34.78.112',
                    city: 'Istanbul',
                    country: 'Turkey',
                    zipCode: '34732'
                },
                shippingAddress: {
                    contactName: 'Jane Doe',
                    city: 'Istanbul',
                    country: 'Turkey',
                    address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                    zipCode: '34742'
                },
                billingAddress: {
                    contactName: 'Jane Doe',
                    city: 'Istanbul',
                    country: 'Turkey',
                    address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                    zipCode: '34742'
                },
                basketItems: [
                    {
                        id: 'BI101',
                        name: 'Binocular',
                        category1: 'Collectibles',
                        category2: 'Accessories',
                        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                        price: '30000'
                    },
                    {
                        id: 'BI102',
                        name: 'Game code',
                        category1: 'Game',
                        category2: 'Online Game Items',
                        itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
                        price: '50000'
                    },
                    {
                        id: 'BI103',
                        name: 'Usb',
                        category1: 'Electronics',
                        category2: 'Usb / Cable',
                        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                        price: '20000'
                    }
                ]
            };

            iyzipay.peccoInitialize.create(request, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should create pecco payment', function (done) {
            iyzipay.peccoPayment.create({
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                token: 'token'
            }, function (err, result) {
                console.log(err, result);
                done();
            });
        });
    });

    describe('Refund', function () {

        it('should refund', function (done) {
            iyzipay.refund.create({
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                paymentTransactionId: '1',
                price: '0.5',
                currency: Iyzipay.CURRENCY.TRY,
                ip: '85.34.78.112'
            }, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should refund with reason and description', function (done) {
            iyzipay.refund.create({
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                paymentTransactionId: '1',
                price: '0.5',
                currency: Iyzipay.CURRENCY.TRY,
                ip: '85.34.78.112',
                reason: Iyzipay.REFUND_REASON.OTHER,
                description: 'customer requested for default sample'
            }, function (err, result) {
                console.log(err, result);
                done();
            });
        });
    });

    describe('Retrieve Transactions Sample', function () {

        it('should retrieve payout completed transactions', function (done) {
            iyzipay.payoutCompletedTransactionList.retrieve({
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                date: '2016-01-22 19:13:00'
            }, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should retrieve bounced bank transfers', function (done) {
            iyzipay.bouncedBankTransferList.retrieve({
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                date: '2016-01-22 19:13:00'
            }, function (err, result) {
                console.log(err, result);
                done();
            });
        });
    });

    describe('Sub Merchant', function () {

        it('should create personal sub merchant', function (done) {
            iyzipay.subMerchant.create({
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                subMerchantExternalId: 'B49224',
                subMerchantType: Iyzipay.SUB_MERCHANT_TYPE.PERSONAL,
                address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                contactName: 'John',
                contactSurname: 'Doe',
                email: 'email@submerchantemail.com',
                gsmNumber: '+905350000000',
                name: 'John\'s market',
                iban: 'TR180006200119000006672315',
                identityNumber: '31300864726',
                currency: Iyzipay.CURRENCY.TRY
            }, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should create private sub merchant', function (done) {
            iyzipay.subMerchant.create({
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                subMerchantExternalId: 'S49222',
                subMerchantType: Iyzipay.SUB_MERCHANT_TYPE.PRIVATE_COMPANY,
                address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                taxOffice: 'Tax office',
                legalCompanyTitle: 'John Doe inc',
                email: 'email@submerchantemail.com',
                gsmNumber: '+905350000000',
                name: 'John\'s market',
                iban: 'TR180006200119000006672315',
                identityNumber: '31300864726',
                currency: Iyzipay.CURRENCY.TRY
            }, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should create limited company sub merchant', function (done) {
            iyzipay.subMerchant.create({
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                subMerchantExternalId: 'AS49224',
                subMerchantType: Iyzipay.SUB_MERCHANT_TYPE.LIMITED_OR_JOINT_STOCK_COMPANY,
                address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                taxOffice: 'Tax office',
                taxNumber: '9261877',
                legalCompanyTitle: 'XYZ inc',
                email: 'email@submerchantemail.com',
                gsmNumber: '+905350000000',
                name: 'John\'s market',
                iban: 'TR180006200119000006672315',
                currency: Iyzipay.CURRENCY.TRY
            }, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should update personal sub merchant', function (done) {
            iyzipay.subMerchant.update({
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                subMerchantKey: 'sub merchant key',
                iban: 'TR630006200027700006678204',
                address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                contactName: 'Jane',
                contactSurname: 'Doe',
                email: 'email@submerchantemail.com',
                gsmNumber: '+905350000000',
                name: 'Jane\'s market',
                identityNumber: '31300864726',
                currency: Iyzipay.CURRENCY.TRY
            }, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should update private sub merchant', function (done) {
            iyzipay.subMerchant.update({
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                subMerchantKey: 'sub merchant key',
                address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                taxOffice: 'Tax office',
                legalCompanyTitle: 'Jane Doe inc',
                email: 'email@submerchantemail.com',
                gsmNumber: '+905350000000',
                name: 'Jane\'s market',
                iban: 'TR180006200119000006672315',
                identityNumber: '31300864726',
                currency: Iyzipay.CURRENCY.TRY
            }, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should update limited company sub merchant', function (done) {
            iyzipay.subMerchant.update({
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                subMerchantKey: 'sub merchant key',
                address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                taxOffice: 'Tax office',
                taxNumber: '9261877',
                legalCompanyTitle: 'ABC inc',
                email: 'email@submerchantemail.com',
                gsmNumber: '+905350000000',
                name: 'Jane\'s market',
                iban: 'TR180006200119000006672315',
                currency: Iyzipay.CURRENCY.TRY
            }, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should retrieve sub merchant', function (done) {
            iyzipay.subMerchant.retrieve({
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                subMerchantExternalId: 'AS49224'
            }, function (err, result) {
                console.log(err, result);
                done();
            });
        });
    });

    describe('Threeds', function () {

        it('should initialize threeds', function (done) {
            var request = {
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                price: '1',
                paidPrice: '1.2',
                currency: Iyzipay.CURRENCY.TRY,
                installment: '1',
                basketId: 'B67832',
                paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
                paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
                callbackUrl: 'https://www.merchant.com/callback',
                paymentCard: {
                    cardHolderName: 'John Doe',
                    cardNumber: '5528790000000008',
                    expireMonth: '12',
                    expireYear: '2030',
                    cvc: '123',
                    registerCard: '0'
                },
                buyer: {
                    id: 'BY789',
                    name: 'John',
                    surname: 'Doe',
                    gsmNumber: '+905350000000',
                    email: 'email@email.com',
                    identityNumber: '74300864791',
                    lastLoginDate: '2015-10-05 12:43:35',
                    registrationDate: '2013-04-21 15:12:09',
                    registrationAddress: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                    ip: '85.34.78.112',
                    city: 'Istanbul',
                    country: 'Turkey',
                    zipCode: '34732'
                },
                shippingAddress: {
                    contactName: 'Jane Doe',
                    city: 'Istanbul',
                    country: 'Turkey',
                    address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                    zipCode: '34742'
                },
                billingAddress: {
                    contactName: 'Jane Doe',
                    city: 'Istanbul',
                    country: 'Turkey',
                    address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                    zipCode: '34742'
                },
                basketItems: [
                    {
                        id: 'BI101',
                        name: 'Binocular',
                        category1: 'Collectibles',
                        category2: 'Accessories',
                        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                        price: '0.3'
                    },
                    {
                        id: 'BI102',
                        name: 'Game code',
                        category1: 'Game',
                        category2: 'Online Game Items',
                        itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
                        price: '0.5'
                    },
                    {
                        id: 'BI103',
                        name: 'Usb',
                        category1: 'Electronics',
                        category2: 'Usb / Cable',
                        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                        price: '0.2'
                    }
                ]
            };

            iyzipay.threedsInitialize.create(request, function (err, result) {
                console.log(err, result);

                if (result.status === 'success') {
                    const { paymentId, conversationId, signature } = result;
                    verifySignature([paymentId, conversationId], secretKey, signature);
                }
                done();
            });
        });

        it('should create threeds payment', function (done) {
            iyzipay.threedsPayment.create({
                conversationId: '123456789',
                locale: Iyzipay.LOCALE.TR,
                paymentId: '1',
                conversationData: 'conversation data'
            }, function (err, result) {
                console.log(err, result);

                if (result.status === 'success') {
                    const { paymentId, currency, basketId, conversationId, paidPrice, price, signature } = result;
                    verifySignature([paymentId, currency, basketId, conversationId, paidPrice, price], secretKey, signature);
                }
                done();
            });
        });

        it('should initialize threeds preauth', function (done) {
            var request = {
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                price: '1',
                paidPrice: '1.2',
                currency: Iyzipay.CURRENCY.TRY,
                installment: '1',
                basketId: 'B67832',
                paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
                paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
                callbackUrl: 'https://www.merchant.com/callback',
                paymentCard: {
                    cardHolderName: 'John Doe',
                    cardNumber: '5528790000000008',
                    expireMonth: '12',
                    expireYear: '2030',
                    cvc: '123',
                    registerCard: '0'
                },
                buyer: {
                    id: 'BY789',
                    name: 'John',
                    surname: 'Doe',
                    gsmNumber: '+905350000000',
                    email: 'email@email.com',
                    identityNumber: '74300864791',
                    lastLoginDate: '2015-10-05 12:43:35',
                    registrationDate: '2013-04-21 15:12:09',
                    registrationAddress: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                    ip: '85.34.78.112',
                    city: 'Istanbul',
                    country: 'Turkey',
                    zipCode: '34732'
                },
                shippingAddress: {
                    contactName: 'Jane Doe',
                    city: 'Istanbul',
                    country: 'Turkey',
                    address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                    zipCode: '34742'
                },
                billingAddress: {
                    contactName: 'Jane Doe',
                    city: 'Istanbul',
                    country: 'Turkey',
                    address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                    zipCode: '34742'
                },
                basketItems: [
                    {
                        id: 'BI101',
                        name: 'Binocular',
                        category1: 'Collectibles',
                        category2: 'Accessories',
                        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                        price: '0.3'
                    },
                    {
                        id: 'BI102',
                        name: 'Game code',
                        category1: 'Game',
                        category2: 'Online Game Items',
                        itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
                        price: '0.5'
                    },
                    {
                        id: 'BI103',
                        name: 'Usb',
                        category1: 'Electronics',
                        category2: 'Usb / Cable',
                        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                        price: '0.2'
                    }
                ]
            };

            iyzipay.threedsInitializePreAuth.create(request, function (err, result) {
                console.log(err, result);

                if (result.status === 'success') {
                    const { paymentId, conversationId, signature } = result;
                    verifySignature([paymentId, conversationId], secretKey, signature);
                }
                done();
            });
        });
    });

    describe('Apm', function () {

        it('should initialize apm payment', function (done) {
            var request = {
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                price: '1',
                paidPrice: '1.2',
                currency: Iyzipay.CURRENCY.EUR,
                countryCode: 'DE',
                paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
                paymentGroup: Iyzipay.PAYMENT_GROUP.LISTING,
                accountHolderName: 'Jane Doe',
                merchantNotificationUrl: 'https://www.merchant.com/notification',
                merchantCallbackUrl: 'https://www.merchant.com/callback',
                merchantErrorUrl: 'https://www.merchant.com/error',
                apmType: Iyzipay.APM_TYPE.SOFORT,
                buyer: {
                    id: 'BY789',
                    name: 'John',
                    surname: 'Doe',
                    gsmNumber: '+905350000000',
                    email: 'email@email.com',
                    identityNumber: '74300864791',
                    lastLoginDate: '2015-10-05 12:43:35',
                    registrationDate: '2013-04-21 15:12:09',
                    registrationAddress: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                    ip: '85.34.78.112',
                    city: 'Istanbul',
                    country: 'Turkey',
                    zipCode: '34732'
                },
                shippingAddress: {
                    contactName: 'Jane Doe',
                    city: 'Istanbul',
                    country: 'Turkey',
                    address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                    zipCode: '34742'
                },
                billingAddress: {
                    contactName: 'Jane Doe',
                    city: 'Istanbul',
                    country: 'Turkey',
                    address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                    zipCode: '34742'
                },
                basketItems: [
                    {
                        id: 'BI101',
                        name: 'Binocular',
                        category1: 'Collectibles',
                        category2: 'Accessories',
                        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                        price: '0.3'
                    },
                    {
                        id: 'BI102',
                        name: 'Game code',
                        category1: 'Game',
                        category2: 'Online Game Items',
                        itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
                        price: '0.5'
                    },
                    {
                        id: 'BI103',
                        name: 'Usb',
                        category1: 'Electronics',
                        category2: 'Usb / Cable',
                        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                        price: '0.2'
                    }
                ]
            };

            iyzipay.apm.create(request, function (err, result) {
                console.log(err, result);

                if (result.status === 'success') {
                    const { paymentId, redirectUrl, signature } = result;
                    verifySignature([paymentId, redirectUrl], secretKey, signature);
                }
                done();
            });
        });

        it('retrieve apm payment result', function (done) {
            var request = {
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                paymentId: '1'
            };

            iyzipay.apm.retrieve(request, function (err, result) {
                console.log(err, result);

                if (result.status === 'success') {
                    const { currency, basketId, conversationId, paidPrice, price, paymentId, redirectUrl, signature } = result;
                    verifySignature([currency, basketId, conversationId, paidPrice, price, paymentId, redirectUrl], secretKey, signature);
                }
                done();
            });
        });
    });
});
