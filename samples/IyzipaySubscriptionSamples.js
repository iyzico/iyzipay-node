var should = require('should'),
    Iyzipay = require('../lib/Iyzipay'),
    options = require('./data/options');

describe('Iyzipay Subscription API Test', function () {

    var iyzipay;

    before(function (done) {
        iyzipay = new Iyzipay(options);
        done();
    });

    describe('Subscription Product', function () {

        it('should create subscription product', function (done) {
            var createRequest = {
                locale: Iyzipay.LOCALE.EN,
                conversationId: '123456789',
                name: 'test3 name',
                description: 'test description'
            };

            iyzipay.subscriptionProduct.create(createRequest, function (err, result) {
                console.log(err, result);
                should.not.exist(err);
                should.exist(result);
                done();
            });
        });

        it('should update subscription product', function (done) {
            var updateRequest = {
                locale: Iyzipay.LOCALE.EN,
                conversationId: '123456789',
                productReferenceCode: 'c62ab678-27aa-4f69-bd95-a313c424e65b',
                name: 'test name deneme',
                description: 'test descriptionnnn'
            };

            iyzipay.subscriptionProduct.update(updateRequest, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should delete subscription product', function (done) {
            var deleteRequest = {
                productReferenceCode: 'c62ab678-27aa-4f69-bd95-a313c424e65b'
            };

            iyzipay.subscriptionProduct.delete(deleteRequest, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should retrieve subscription product', function (done) {
            var retrieveRequest = {
                productReferenceCode: '4ab2cadf-8ec5-4bc7-b21e-11abbc4df707'
            };

            iyzipay.subscriptionProduct.retrieve(retrieveRequest, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should retrieve subscription products list', function (done) {
            var retrieveRequest = {
                locale: Iyzipay.LOCALE.EN,
                conversationId: '123456789',
                page: 1,
                count: 10
            };

            iyzipay.subscriptionProduct.retrieveList(retrieveRequest, function (err, result) {
                console.log(err, result);
                done();
            });
        });
    });

    describe('Subscription Pricing Plan', function () {
        it('should create subscription pricing plan', function (done) {
            var createRequest = {
                locale: Iyzipay.LOCALE.EN,
                conversationId: '123456789',
                productReferenceCode: '4ab2cadf-8ec5-4bc7-b21e-11abbc4df707',
                name: 'name',
                price: 10.99,
                currencyCode: Iyzipay.CURRENCY.TRY,
                paymentInterval: Iyzipay.SUBSCRIPTION_PRICING_PLAN_INTERVAL.MONTHLY,
                paymentIntervalCount: 1,
                trialPeriodDays: 30,
                planPaymentType: Iyzipay.PLAN_PAYMENT_TYPE.RECURRING
            };

            iyzipay.subscriptionPricingPlan.create(createRequest, function (err, result) {
                console.log(err, result);
                should.not.exist(err);
                should.exist(result);
                done();
            });
        });

        it('should update subscription pricing plan', function (done) {
            var updateRequest = {
                locale: Iyzipay.LOCALE.EN,
                conversationId: '123456789',
                pricingPlanReferenceCode: '138e6963-a6a6-4823-8fab-202dae5b3fed',
                name: 'test name',
                trialPeriodDays: 31
            };

            iyzipay.subscriptionPricingPlan.update(updateRequest, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should delete subscription pricing plan', function (done) {
            var deleteRequest = {
                pricingPlanReferenceCode: '138e6963-a6a6-4823-8fab-202dae5b3fed'
            };

            iyzipay.subscriptionPricingPlan.delete(deleteRequest, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should retrieve subscription pricing plan', function (done) {
            var retrieveRequest = {
                pricingPlanReferenceCode: '138e6963-a6a6-4823-8fab-202dae5b3fed',
            };

            iyzipay.subscriptionPricingPlan.retrieve(retrieveRequest, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should retrieve subscription pricing plan list', function (done) {
            var retrieveRequest = {
                locale: Iyzipay.LOCALE.EN,
                conversationId: '123456789',
                productReferenceCode: '4ab2cadf-8ec5-4bc7-b21e-11abbc4df707',
                page: 1,
                count: 10
            };

            iyzipay.subscriptionPricingPlan.retrieveList(retrieveRequest, function (err, result) {
                console.log(err, result);
                done();
            });
        });
    });

    describe('Subscription Customer', function () {

        it('should create customer', function (done) {
            var createRequest = {
                locale: Iyzipay.LOCALE.EN,
                conversationId: '123456789',
                name: 'name',
                surname: 'surname',
                identityNumber: '11111111111',
                email: 'test12@test.com',
                gsmNumber: '+9005555555555',
                billingAddress: {
                    contactName: 'Jane Doe',
                    city: 'Istanbul',
                    country: 'Turkey',
                    address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                    zipCode: '34742'
                },
                shippingAddress: {
                    contactName: 'Jane Doe',
                    city: 'Istanbul',
                    country: 'Turkey',
                    address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                    zipCode: '34742'
                }
            };

            iyzipay.subscriptionCustomer.create(createRequest, function (err, result) {
                console.log(err, result);
                should.not.exist(err);
                should.exist(result);
                done();
            });
        });

        it('should update customer', function (done) {
            var updateRequest = {
                locale: Iyzipay.LOCALE.EN,
                conversationId: '123456789',
                customerReferenceCode: '174a6da0-a192-45ae-b84e-791c2ef4bb86',
                name: 'namee',
                surname: 'surnamee',
                identityNumber: '11111111111',
                email: 'test@test.com',
                gsmNumber: '+9005555555555',
                billingAddress: {
                    contactName: 'Jane Doe',
                    city: 'Istanbul',
                    country: 'Turkey',
                    address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                    zipCode: '34742'
                },
                shippingAddress: {
                    contactName: 'Jane Doe',
                    city: 'Istanbul',
                    country: 'Turkey',
                    address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                    zipCode: '34742'
                }
            };

            iyzipay.subscriptionCustomer.update(updateRequest, function (err, result) {
                console.log(err, result);
                should.not.exist(err);
                should.exist(result);
                done();
            });
        });

        it('should retrieve customer', function (done) {
            var retrieveRequest = {
                customerReferenceCode: '3bb6d0b5-b53c-4732-a641-6fa3f8d39c21'
            };

            iyzipay.subscriptionCustomer.retrieve(retrieveRequest, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should retrieve customer list', function (done) {
            var retrieveRequest = {
                locale: Iyzipay.LOCALE.EN,
                conversationId: '123456789',
                page: 1,
                count: 10
            };

            iyzipay.subscriptionCustomer.retrieveList(retrieveRequest, function (err, result) {
                console.log(err, result);
                done();
            });
        });
    });

    describe('Subscription Customer Card', function () {
        it('should update customer card', function (done) {
            var updateCardRequest = {
                locale: Iyzipay.LOCALE.EN,
                conversationId: '123456789',
                customerReferenceCode: '3bb6d0b5-b53c-4732-a641-6fa3f8d39c21',
                callbackUrl: 'callbackUrl'
            };

            iyzipay.subscriptionCard.update(updateCardRequest, function (err, result) {
                console.log(err, result);
                done();
            });
        });
    });

    describe('Subscription', function () {

        it('should retry subscription', function (done) {
            var retryRequest = {
                locale: Iyzipay.LOCALE.EN,
                conversationId: '123456789',
                referenceCode: 'ba562488-4956-4817-acc5-d67b6c7de0a0'
            };

            iyzipay.subscriptionPayment.retry(retryRequest, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should cancel subscription', function (done) {
            var cancelRequest = {
                subscriptionReferenceCode: '1d13523f-24a5-4151-bb78-2cfddcd52e25'
            };

            iyzipay.subscription.cancel(cancelRequest, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should activate subscription', function (done) {
            var activateRequest = {
                subscriptionReferenceCode: '1d13523f-24a5-4151-bb78-2cfddcd52e25'
            };

            iyzipay.subscription.activate(activateRequest, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should upgrade subscription', function (done) {
            var upgradeRequest = {
                locale: Iyzipay.LOCALE.EN,
                conversationId: '123456789',
                subscriptionReferenceCode: 'dca3e175-14c8-4b98-97de-283d692eaab2',
                newPricingPlanReferenceCode: '0377e55e-4739-489b-a6a9-130d869b6b9c',
                upgradePeriod: Iyzipay.SUBSCRIPTION_UPGRADE_PERIOD.NEXT_PERIOD,
                useTrial: true
            };

            iyzipay.subscription.upgrade(upgradeRequest, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should retrieve subscription', function (done) {
            var retrieveRequest = {
                subscriptionReferenceCode: 'ba562488-4956-4817-acc5-d67b6c7de0a0'
            };

            iyzipay.subscription.retrieve(retrieveRequest, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should search subscription', function (done) {
            var searchRequest = {
                locale: Iyzipay.LOCALE.EN,
                conversationId: '123456789',
                page: 1,
                count: 10,
                subscriptionReferenceCode: 'dca3e175-14c8-4b98-97de-283d692eaab2',
                parentReferenceCode: 'dca3e175-14c8-4b98-97de-283d692eaab2',
                customerReferenceCode: 'dca3e175-14c8-4b98-97de-283d692eaab2',
                pricingPlanReferenceCode: 'dca3e175-14c8-4b98-97de-283d692eaab2',
                subscriptionStatus: Iyzipay.SUBSCRIPTION_STATUS.ACTIVE,
                startDate: '2018-10-05 12:43:35',
                endDate: '2019-10-05 12:43:35'
            };

            iyzipay.subscription.search(searchRequest, function (err, result) {
                console.log(err, result);
                done();
            });
        });
    });

    describe('Subscription Initialize', function () {

        it('should subscription initialize with checkout form ', function (done) {
            var request = {
                locale: Iyzipay.LOCALE.EN,
                conversationId: '123456789',
                callbackUrl: 'callbackUrl',
                pricingPlanReferenceCode: '138e6963-a6a6-4823-8fab-202dae5b3fed',
                subscriptionInitialStatus: Iyzipay.SUBSCRIPTION_INITIAL_STATUS.ACTIVE,
                customer: {
                    name: 'name',
                    surname: 'surname',
                    identityNumber: '11111111111',
                    email: 'test123@test.com',
                    gsmNumber: '+9005555555555',
                    billingAddress: {
                        contactName: 'Jane Doe',
                        city: 'Istanbul',
                        country: 'Turkey',
                        address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                        zipCode: '34742'
                    },
                    shippingAddress: {
                        contactName: 'Jane Doe',
                        city: 'Istanbul',
                        country: 'Turkey',
                        address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                        zipCode: '34742'
                    }
                }
            };

            iyzipay.subscriptionCheckoutForm.initialize(request, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should retrieve  subscription result with checkout form token', function (done) {
            var request = {
                checkoutFormToken: 'c866e6b4-0f2d-4e9c-8adb-abc4f4bfa2ad'
            };

            iyzipay.subscriptionCheckoutForm.retrieve(request, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should subscription initialize', function (done) {
            var request = {
                locale: Iyzipay.LOCALE.EN,
                conversationId: '123456789',
                callbackUrl: 'callbackUrl',
                pricingPlanReferenceCode: '2af0eee5-22c3-40c8-91b8-7c64ccb9ab12',
                subscriptionInitialStatus: Iyzipay.SUBSCRIPTION_INITIAL_STATUS.PENDING,
                paymentCard: {
                    cardHolderName: 'John Doe',
                    cardNumber: '1111111111111111',
                    expireYear: '24',
                    expireMonth: '12',
                    cvc: '999'
                },
                customer: {
                    name: 'name',
                    surname: 'surname',
                    identityNumber: '11111111111',
                    email: 'test123@test.com',
                    gsmNumber: '+9005555555555',
                    billingAddress: {
                        contactName: 'Jane Doe',
                        city: 'Istanbul',
                        country: 'Turkey',
                        address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                        zipCode: '34742'
                    },
                    shippingAddress: {
                        contactName: 'Jane Doe',
                        city: 'Istanbul',
                        country: 'Turkey',
                        address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                        zipCode: '34742'
                    }
                }
            };

            iyzipay.subscription.initialize(request, function (err, result) {
                console.log(err, result);
                done();
            });
        });

        it('should subscription initialize with existing customer', function (done) {
            var request = {
                locale: Iyzipay.LOCALE.EN,
                conversationId: '123456789',
                pricingPlanReferenceCode: 'ba562488-4956-4817-acc5-d67b6c7de0a0',
                customerReferenceCode: 'ba562488-4956-4817-acc5-d67b6c7de0a0'
            };

            iyzipay.subscriptionExistingCustomer.initialize(request, function (err, result) {
                console.log(err, result);
                done();
            });
        });
    });
});
