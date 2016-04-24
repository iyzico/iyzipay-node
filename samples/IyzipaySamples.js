var should = require('should'),
    assert = require('assert'),
    Iyzipay = require('../lib/Iyzipay'),
    TestUtils = require('../test/utils/TestUtils');

describe('Iyzipay API Test', function () {

    var iyzipay;

    before(function (done) {
        iyzipay = new Iyzipay();
        done();
    });

    describe('ApiTest', function () {

        it('should test api', function (done) {
            iyzipay.apiTest.retrieve({}, function (err, result) {
                console.log(err, result);
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
            })
        });

        it('should disapprove payment item', function (done) {
            iyzipay.disapproval.create({
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                paymentTransactionId: '1'
            }, function (err, result) {
                console.log(err, result);
                done();
            })
        })
    });

    describe('BinNumber', function () {

        it('should retrieve bin number', function (done) {
            iyzipay.binNumber.retrieve({
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456',
                binNumber: '454671'
            }, function (err, result) {
                console.log(err, result);
                done();
            });
        });
    });

    describe('Bkm', function () {

        it('should initialize bkm express', function (done) {
            var bkmInitRequest = {
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                price: '1.0',
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
                    registrationAddress: 'Address',
                    ip: '85.34.78.112',
                    city: 'Istanbul',
                    country: 'Turkey',
                    zipCode: '34732'
                },
                shippingAddress: {
                    contactName: 'Jane Doe',
                    city: 'Istanbul',
                    country: 'Turkey',
                    address: 'Address',
                    zipCode: '34742'
                },
                billingAddress: {
                    contactName: 'Jane Doe',
                    city: 'Istanbul',
                    country: 'Turkey',
                    address: 'Address',
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

            iyzipay.bkmInitialize.create(bkmInitRequest, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should retrieve bkm auth', function (done) {
            iyzipay.bkmAuth.retrieve({
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                token: 'token'
            }, function (err, result) {
                console.log(err, result);
                done();
            });
        })
    });

    describe('Cancel', function () {

        it('should cancel payment', function (done) {
            iyzipay.cancel.create({
                conversationId: '123456789',
                locale: Iyzipay.LOCALE.TR,
                paymentId: '1',
                ip: '127.0.0.1'
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

        it('should delete card', function (done) {
            iyzipay.card.delete({
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                cardUserKey: 'card user key',
                cardToken: 'card token'
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
        })
    });

    describe('Checkout Form', function () {

        it('should initialize checkout form', function (done) {
            var checkoutFormInitRequest = {
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                price: '1.0',
                paidPrice: '1.2',
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
                    registrationAddress: 'Address',
                    ip: '85.34.78.112',
                    city: 'Istanbul',
                    country: 'Turkey',
                    zipCode: '34732'
                },
                shippingAddress: {
                    contactName: 'Jane Doe',
                    city: 'Istanbul',
                    country: 'Turkey',
                    address: 'Address',
                    zipCode: '34742'
                },
                billingAddress: {
                    contactName: 'Jane Doe',
                    city: 'Istanbul',
                    country: 'Turkey',
                    address: 'Address',
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

            iyzipay.checkoutFormInitialize.create(checkoutFormInitRequest, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should retrieve checkout form auth', function (done) {
            iyzipay.checkoutFormAuth.retrieve({
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                token: 'token'
            }, function (err, result) {
                console.log(err, result);
                done();
            });
        })
    });

    describe('Connect Bkm', function () {

        it('should initialize connect bkm express', function (done) {
            iyzipay.connectBkmInitialize.create({
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                paymentTransactionId: '1',
                connectorName: 'connector name',
                price: '1.0',
                callbackUrl: 'https://www.merchant.com/callback',
                buyerEmail: 'email@email.com',
                buyerId: '100',
                buyerIp: '192.168.123.102',
                posOrderIp: '3',
                installmentDetails: TestUtils.prepareInstallmentDetails()
            }, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should retrieve connect bkm auth', function (done) {
            iyzipay.connectBkmAuth.retrieve({
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                token: 'token'
            }, function (err, result) {
                console.log(err, result);
                done();
            });
        });
    });

    describe('Connect Cancel', function () {

        it('should cancel payment', function (done) {
            iyzipay.connectCancel.create({
                conversationId: '123456789',
                locale: Iyzipay.LOCALE.TR,
                paymentId: '1',
                ip: '127.0.0.1'
            }, function (err, result) {
                console.log(err, result);
                done();
            });
        });
    });

    describe('Connect Payment Auth', function () {

        it('should pay with card', function (done) {
            iyzipay.connectPaymentAuth.create({
                conversationId: '123456789',
                locale: Iyzipay.LOCALE.TR,
                buyerEmail: 'email@email.com',
                buyerId: 'B2323',
                buyerIp: '127.0.0.1',
                connectorName: 'connector name',
                installment: '1',
                paidPrice: '1.0',
                price: '1.0',
                paymentCard: {
                    cardHolderName: 'John Doe',
                    cardNumber: '5528790000000008',
                    expireMonth: '12',
                    expireYear: '2030',
                    cvc: '123',
                    registerCard: '0'
                }
            }, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should pay with card token', function (done) {
            iyzipay.connectPaymentAuth.create({
                conversationId: '123456789',
                locale: Iyzipay.LOCALE.TR,
                buyerEmail: 'email@email.com',
                buyerId: 'B2323',
                buyerIp: '127.0.0.1',
                connectorName: 'connector name',
                installment: '1',
                paidPrice: '1.0',
                price: '1.0',
                paymentCard: {
                    cardToken: 'card token',
                    cardUserKey: 'card user key'
                }
            }, function (err, result) {
                console.log(err, result);
                done();
            });
        });
    });

    describe('Connect Payment Pre Auth', function () {

        it('should pay with card', function (done) {
            iyzipay.connectPaymentPreAuth.create({
                conversationId: '123456789',
                locale: Iyzipay.LOCALE.TR,
                buyerEmail: 'email@email.com',
                buyerId: 'B2323',
                buyerIp: '127.0.0.1',
                connectorName: 'connector name',
                installment: '1',
                paidPrice: '1.0',
                price: '1.0',
                paymentCard: {
                    cardHolderName: 'John Doe',
                    cardNumber: '5528790000000008',
                    expireMonth: '12',
                    expireYear: '2030',
                    cvc: '123',
                    registerCard: '0'
                }
            }, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should pay with card token', function (done) {
            iyzipay.connectPaymentPreAuth.create({
                conversationId: '123456789',
                locale: Iyzipay.LOCALE.TR,
                buyerEmail: 'email@email.com',
                buyerId: 'B2323',
                buyerIp: '127.0.0.1',
                connectorName: 'connector name',
                installment: '1',
                paidPrice: '1.0',
                price: '1.0',
                paymentCard: {
                    cardToken: 'card token',
                    cardUserKey: 'card user key'
                }
            }, function (err, result) {
                console.log(err, result);
                done();
            });
        });
    });

    describe('Connect Refund', function () {
        it('should refund payment', function (done) {
            iyzipay.connectRefund.create({
                conversationId: '123456789',
                locale: Iyzipay.LOCALE.TR,
                paymentTransactionId: '1',
                price: '1.0',
                ip: '127.0.0.1'
            }, function (err, result) {
                console.log(err, result);
                done();
            })
        });
    });

    describe('Connect ThreeDS', function () {

        it('should initialize threeds with card', function (done) {
            iyzipay.connectThreeDSInitialize.create({
                conversationId: '123456789',
                locale: Iyzipay.LOCALE.TR,
                buyerEmail: 'email@email.com',
                buyerId: 'B2323',
                buyerIp: '127.0.0.1',
                connectorName: 'connector name',
                installment: '1',
                paidPrice: '1.0',
                price: '1.0',
                callbackUrl: 'https://www.merchant.com/callback',
                paymentCard: {
                    cardHolderName: 'John Doe',
                    cardNumber: '5528790000000008',
                    expireMonth: '12',
                    expireYear: '2030',
                    cvc: '123',
                    registerCard: '0'
                }
            }, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should initialize threeds with card token', function (done) {
            iyzipay.connectThreeDSInitialize.create({
                conversationId: '123456789',
                locale: Iyzipay.LOCALE.TR,
                buyerEmail: 'email@email.com',
                buyerId: 'B2323',
                buyerIp: '127.0.0.1',
                connectorName: 'connector name',
                installment: '1',
                paidPrice: '1.0',
                price: '1.0',
                callbackUrl: 'https://www.merchant.com/callback',
                paymentCard: {
                    cardToken: 'card token',
                    cardUserKey: 'card user key'
                }
            }, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should auth threeds', function (done) {
            iyzipay.connectThreeDSAuth.create({
                conversationId: '123456789',
                locale: Iyzipay.LOCALE.TR,
                paymentId: '1'
            }, function (err, result) {
                console.log(err, result);
                done();
            });
        });
    });

    describe('Cross Booking', function () {

        it('should send money to sub merchant', function (done) {
            iyzipay.crossBookingToSubMerchant.create({
                conversationId: '123456789',
                locale: Iyzipay.LOCALE.TR,
                subMerchantKey: 'sub merchant key',
                price: '1.0',
                reason: 'reason text'
            }, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should receive money from sub merchant', function (done) {
            iyzipay.crossBookingFromSubMerchant.create({
                conversationId: '123456789',
                locale: Iyzipay.LOCALE.TR,
                subMerchantKey: 'sub merchant key',
                price: '1.0',
                reason: 'reason text'
            }, function (err, result) {
                console.log(err, result);
                done();
            });
        });
    });

    describe('Installment', function () {

        it('should retrieve installment info', function (done) {
            iyzipay.installmentInfo.retrieve({
                conversationId: '123456789',
                locale: Iyzipay.LOCALE.TR,
                binNumber: '454671',
                price: '1.0'
            }, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should retrieve installment info for all banks', function (done) {
            iyzipay.installmentInfo.retrieve({
                conversationId: '123456789',
                locale: Iyzipay.LOCALE.TR,
                price: '1.0'
            }, function (err, result) {
                console.log(err, result);
                done();
            });
        })
    });

    describe('Payment Auth', function () {

        it('should create payment with physical and virtual item for standard merchant', function (done) {
            var paymentAuth = {
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                price: '1.0',
                paidPrice: '1.1',
                installment: 1,
                paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
                basketId: 'B67832',
                paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
                paymentCard: {
                    cardHolderName: 'John Doe',
                    cardNumber: '5528790000000008',
                    expireYear: '2030',
                    expireMonth: '12',
                    cvc: '123',
                    registerCard: 0
                },
                buyer: {
                    id: 'BY789',
                    name: 'John',
                    surname: 'Doe',
                    identityNumber: '74300864791',
                    email: 'email@email.com',
                    gsmNumber: '+905350000000',
                    registrationDate: '2013-04-21 15:12:09',
                    lastLoginDate: '2015-10-05 12:43:35',
                    registrationAddress: 'Address',
                    city: 'Istanbul',
                    country: 'Turkey',
                    zipCode: '34732',
                    ip: '85.34.78.112'
                },
                shippingAddress: {
                    address: 'Address',
                    zipCode: '34742',
                    contactName: 'Jane Doe',
                    city: 'Istanbul',
                    country: 'Turkey'
                },
                billingAddress: {
                    address: 'Address',
                    zipCode: '34742',
                    contactName: 'Jane Doe',
                    city: 'Istanbul',
                    country: 'Turkey'
                },
                basketItems: [
                    {
                        id: 'BI101',
                        price: '0.3',
                        name: 'Binocular',
                        category1: 'Collectibles',
                        category2: 'Accessories',
                        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL
                    },
                    {
                        id: 'BI102',
                        price: '0.5',
                        name: 'Game code',
                        category1: 'Game',
                        category2: 'Online Game Items',
                        itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL
                    },
                    {
                        id: 'BI103',
                        price: '0.2',
                        name: 'Usb',
                        category1: 'Electronics',
                        category2: 'Usb / Cable',
                        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL
                    }
                ]
            };

            iyzipay.paymentAuth.create(paymentAuth, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should create payment with physical and virtual item for market place', function (done) {
            var paymentAuth = {
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                price: '1.0',
                paidPrice: '1.1',
                installment: '1',
                basketId: 'B67832',
                paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
                paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
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
                    registrationAddress: 'Address',
                    ip: '85.34.78.112',
                    city: 'Istanbul',
                    country: 'Turkey',
                    zipCode: '34732'
                },
                shippingAddress: {
                    contactName: 'Jane Doe',
                    city: 'Istanbul',
                    country: 'Turkey',
                    address: 'Address',
                    zipCode: '34742'
                },
                billingAddress: {
                    contactName: 'Jane Doe',
                    city: 'Istanbul',
                    country: 'Turkey',
                    address: 'Address',
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

            iyzipay.paymentAuth.create(paymentAuth, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should create payment with physical and virtual item for listing or subscription', function (done) {
            var paymentAuth = {
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                price: '1.0',
                paidPrice: '1.1',
                installment: '1',
                basketId: 'B67832',
                paymentGroup: Iyzipay.PAYMENT_GROUP.LISTING,
                paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
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
                    registrationAddress: 'Address',
                    ip: '85.34.78.112',
                    city: 'Istanbul',
                    country: 'Turkey',
                    zipCode: '34732'
                },
                shippingAddress: {
                    contactName: 'Jane Doe',
                    city: 'Istanbul',
                    country: 'Turkey',
                    address: 'Address',
                    zipCode: '34742'
                },
                billingAddress: {
                    contactName: 'Jane Doe',
                    city: 'Istanbul',
                    country: 'Turkey',
                    address: 'Address',
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

            iyzipay.paymentAuth.create(paymentAuth, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should retrieve payment', function (done) {
            iyzipay.paymentAuth.retrieve({
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                paymentId: '1',
                paymentConversationId: '123456789'
            }, function (err, result) {
                console.log(err, result);
                done();
            })
        });
    });

    describe('Payment Pre Auth', function () {

        it('should create payment with physical and virtual item for market place', function (done) {
            var paymentPreAuth = {
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                price: '1.0',
                paidPrice: '1.1',
                installment: '1',
                basketId: 'B67832',
                paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
                paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
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
                    registrationAddress: 'Address',
                    ip: '85.34.78.112',
                    city: 'Istanbul',
                    country: 'Turkey',
                    zipCode: '34732'
                },
                shippingAddress: {
                    contactName: 'Jane Doe',
                    city: 'Istanbul',
                    country: 'Turkey',
                    address: 'Address',
                    zipCode: '34742'
                },
                billingAddress: {
                    contactName: 'Jane Doe',
                    city: 'Istanbul',
                    country: 'Turkey',
                    address: 'Address',
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

            iyzipay.paymentPreAuth.create(paymentPreAuth, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should create payment with physical and virtual item for listing or subscription', function (done) {
            var paymentPreAuth = {
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                price: '1.0',
                paidPrice: '1.1',
                installment: '1',
                basketId: 'B67832',
                paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
                paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
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
                    registrationAddress: 'Address',
                    ip: '85.34.78.112',
                    city: 'Istanbul',
                    country: 'Turkey',
                    zipCode: '34732'
                },
                shippingAddress: {
                    contactName: 'Jane Doe',
                    city: 'Istanbul',
                    country: 'Turkey',
                    address: 'Address',
                    zipCode: '34742'
                },
                billingAddress: {
                    contactName: 'Jane Doe',
                    city: 'Istanbul',
                    country: 'Turkey',
                    address: 'Address',
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

            iyzipay.paymentPreAuth.create(paymentPreAuth, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should retrieve payment', function (done) {
            iyzipay.paymentPreAuth.retrieve({
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                paymentId: '1',
                paymentConversationId: '123456789'
            }, function (err, result) {
                console.log(err, result);
                done();
            })
        });
    });

    describe('Payment Post Auth', function () {

        it('should post auth', function (done) {
            iyzipay.paymentPostAuth.create({
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                paymentId: '1',
                paidPrice: '0.6',
                ip: '127.0.0.1'
            }, function (err, result) {
                console.log(err, result);
                done();
            })
        });
    });

    describe('Refund', function () {

        it('should refund', function (done) {
            iyzipay.refund.create({
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                paymentTransactionId: '1',
                price: '0.1',
                ip: '127.0.0.1'
            }, function (err, result) {
                console.log(err, result);
                done();
            })
        });

        it('should refund charged from merchant', function (done) {
            iyzipay.refundChargedFromMerchant.create({
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                paymentTransactionId: '1',
                price: '0.1',
                ip: '127.0.0.1'
            }, function (err, result) {
                console.log(err, result);
                done();
            })
        });
    });

    describe('Payout Completed Transaction List', function () {

        it('should retrieve payout completed transactions', function (done) {
            iyzipay.payoutCompletedTransactionList.retrieve({
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                date: '2016-01-22 19:13:00'
            }, function (err, result) {
                console.log(err, result);
                done();
            })
        });

        it('should retrieve bounced bank transactions', function (done) {
            iyzipay.bouncedBankTransferList.retrieve({
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                date: '2016-01-22 19:13:00'
            }, function (err, result) {
                console.log(err, result);
                done();
            })
        });
    });

    describe('Sub Merchant', function () {

        it('should create personal sub merchant', function (done) {
            iyzipay.subMerchant.create({
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                subMerchantExternalId: 'B49224',
                subMerchantType: Iyzipay.SUB_MERCHANT_TYPE.PERSONAL,
                address: 'Address',
                contactName: 'John',
                contactSurname: 'Doe',
                email: 'email@submerchantemail.com',
                gsmNumber: '+905350000000',
                name: 'John\'s market',
                iban: 'TR180006200119000006672315',
                identityNumber: '1234567890'
            }, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should create private sub merchant', function (done) {
            iyzipay.subMerchant.create({
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                subMerchantExternalId: 'B49224',
                subMerchantType: Iyzipay.SUB_MERCHANT_TYPE.PRIVATE_COMPANY,
                address: 'Address',
                contactName: 'John',
                contactSurname: 'Doe',
                email: 'email@submerchantemail.com',
                gsmNumber: '+905350000000',
                name: 'John\'s market',
                iban: 'TR180006200119000006672315',
                identityNumber: '1234567890'
            }, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should create limited company sub merchant', function (done) {
            iyzipay.subMerchant.create({
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                subMerchantExternalId: 'B49224',
                subMerchantType: Iyzipay.SUB_MERCHANT_TYPE.LIMITED_OR_JOINT_STOCK_COMPANY,
                address: 'Address',
                contactName: 'John',
                contactSurname: 'Doe',
                email: 'email@submerchantemail.com',
                gsmNumber: '+905350000000',
                name: 'John\'s market',
                iban: 'TR180006200119000006672315'
            }, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should update personal sub merchant', function (done) {
            iyzipay.subMerchant.update({
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                subMerchantExternalId: 'B49224',
                subMerchantType: Iyzipay.SUB_MERCHANT_TYPE.PERSONAL,
                address: 'Address',
                contactName: 'John',
                contactSurname: 'Doe',
                email: 'email@submerchantemail.com',
                gsmNumber: '+905350000000',
                name: 'John\'s market',
                iban: 'TR180006200119000006672315',
                identityNumber: '1234567890'
            }, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should update personal sub merchant', function (done) {
            iyzipay.subMerchant.update({
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                subMerchantExternalId: 'B49224',
                subMerchantType: Iyzipay.SUB_MERCHANT_TYPE.PRIVATE_COMPANY,
                address: 'Address',
                contactName: 'John',
                contactSurname: 'Doe',
                email: 'email@submerchantemail.com',
                gsmNumber: '+905350000000',
                name: 'John\'s market',
                iban: 'TR180006200119000006672315',
                identityNumber: '1234567890'
            }, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should update limited company sub merchant', function (done) {
            iyzipay.subMerchant.update({
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                subMerchantExternalId: 'B49224',
                subMerchantType: Iyzipay.SUB_MERCHANT_TYPE.LIMITED_OR_JOINT_STOCK_COMPANY,
                address: 'Address',
                contactName: 'John',
                contactSurname: 'Doe',
                email: 'email@submerchantemail.com',
                gsmNumber: '+905350000000',
                name: 'John\'s market',
                iban: 'TR180006200119000006672315'
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

    describe('ThreeDS', function () {

        it('should initialize threeds payment with physical and virtual item for market place', function (done) {
            var threeDSRequest = {
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                price: '1.0',
                paidPrice: '1.1',
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
                    registrationAddress: 'Address',
                    ip: '85.34.78.112',
                    city: 'Istanbul',
                    country: 'Turkey',
                    zipCode: '34732'
                },
                shippingAddress: {
                    contactName: 'Jane Doe',
                    city: 'Istanbul',
                    country: 'Turkey',
                    address: 'Address',
                    zipCode: '34742'
                },
                billingAddress: {
                    contactName: 'Jane Doe',
                    city: 'Istanbul',
                    country: 'Turkey',
                    address: 'Address',
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

            iyzipay.threeDSInitialize.create(threeDSRequest, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should initialize threeds payment with physical and virtual item for listing and subscription', function (done) {
            var threeDSRequest = {
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                price: '1.0',
                paidPrice: '1.1',
                installment: '1',
                basketId: 'B67832',
                paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
                paymentGroup: Iyzipay.PAYMENT_GROUP.LISTING,
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
                    registrationAddress: 'Address',
                    ip: '85.34.78.112',
                    city: 'Istanbul',
                    country: 'Turkey',
                    zipCode: '34732'
                },
                shippingAddress: {
                    contactName: 'Jane Doe',
                    city: 'Istanbul',
                    country: 'Turkey',
                    address: 'Address',
                    zipCode: '34742'
                },
                billingAddress: {
                    contactName: 'Jane Doe',
                    city: 'Istanbul',
                    country: 'Turkey',
                    address: 'Address',
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

            iyzipay.threeDSInitialize.create(threeDSRequest, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should auth threeds', function (done) {
            iyzipay.threeDSAuth.create({
                conversationId: '123456789',
                locale: Iyzipay.LOCALE.TR,
                paymentId: '1',
                conversationData: 'conversation data'
            }, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should retrieve payment', function (done) {
            iyzipay.threeDSAuth.retrieve({
                conversationId: '123456789',
                locale: Iyzipay.LOCALE.TR,
                paymentId: '1',
                paymentConversationId: '123456789'
            }, function (err, result) {
                console.log(err, result);
                done();
            });
        });
    });
});