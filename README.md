# iyzipay-node

[![NPM version](https://img.shields.io/npm/v/iyzipay.svg)](https://www.npmjs.com/package/iyzipay)

You can sign up for an iyzico account at [https://iyzico.com](https://iyzico.com)

# Requirements

Node.js v0.10.0 or later

# Installation

`npm install iyzipay`

# Usage

### Initialization

```js
var Iyzipay = require('iyzipay');

var iyzipay = new Iyzipay({
    apiKey: 'your api key',
    secretKey: 'your secret key',
    uri: 'https://sandbox-api.iyzipay.com'
});
```

As you can see, credentials information provided while creating new instance of Iyzipay class.
If you do not provide iyzipay credentials, default values will be fetched from environment variables
by following names.

```js
   IYZIPAY_URI
   IYZIPAY_API_KEY
   IYZIPAY_SECRET_KEY
```

In other words, you can initialize Iyzipay object like following:

```js
var iyzipay = new Iyzipay();
```

### Sample Usage

```js
var Iyzipay = require('iyzipay');

var iyzipay = new Iyzipay({
    apiKey: 'your api key',
    secretKey: 'your secret key',
    uri: 'https://sandbox-api.iyzipay.com'
});

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
    done();
});
```

You can see further examples in `test/samples` folder, and run them by `npm run-script samples`

### Mock test cards

Test cards that can be used to simulate a *successful* payment:

Card Number      | Bank                       | Card Type
-----------      | ----                       | ---------
5890040000000016 | Akbank                     | Master Card (Debit)  
5526080000000006 | Akbank                     | Master Card (Credit)  
4766620000000001 | Denizbank                  | Visa (Debit)  
4603450000000000 | Denizbank                  | Visa (Credit)
4729150000000005 | Denizbank Bonus            | Visa (Credit)  
4987490000000002 | Finansbank                 | Visa (Debit)  
5311570000000005 | Finansbank                 | Master Card (Credit)  
9792020000000001 | Finansbank                 | Troy (Debit)  
9792030000000000 | Finansbank                 | Troy (Credit)  
5170410000000004 | Garanti Bankası            | Master Card (Debit)  
5400360000000003 | Garanti Bankası            | Master Card (Credit)  
374427000000003  | Garanti Bankası            | American Express  
4475050000000003 | Halkbank                   | Visa (Debit)  
5528790000000008 | Halkbank                   | Master Card (Credit)  
4059030000000009 | HSBC Bank                  | Visa (Debit)  
5504720000000003 | HSBC Bank                  | Master Card (Credit)  
5892830000000000 | Türkiye İş Bankası         | Master Card (Debit)  
4543590000000006 | Türkiye İş Bankası         | Visa (Credit)  
4910050000000006 | Vakıfbank                  | Visa (Debit)  
4157920000000002 | Vakıfbank                  | Visa (Credit)  
5168880000000002 | Yapı ve Kredi Bankası      | Master Card (Debit)  
5451030000000000 | Yapı ve Kredi Bankası      | Master Card (Credit)  

*Cross border* test cards:

Card Number      | Country
-----------      | -------
4054180000000007 | Non-Turkish (Debit)
5400010000000004 | Non-Turkish (Credit)    

Test cards to get specific *error* codes:

Card Number       | Description
-----------       | -----------
5406670000000009  | Success but cannot be cancelled, refund or post auth
4111111111111129  | Not sufficient funds
4129111111111111  | Do not honour
4128111111111112  | Invalid transaction
4127111111111113  | Lost card
4126111111111114  | Stolen card
4125111111111115  | Expired card
4124111111111116  | Invalid cvc2
4123111111111117  | Not permitted to card holder
4122111111111118  | Not permitted to terminal
4121111111111119  | Fraud suspect
4120111111111110  | Pickup card
4130111111111118  | General error
4131111111111117  | Success but mdStatus is 0
4141111111111115  | Success but mdStatus is 4
4151111111111112  | 3dsecure initialize failed

### Mock APM Accounts

Mock APM Accounts that can be used to simulate a payment with alternative payment method:

Account Holder Name     | Description
-------------------     | -----------
success                 | Succeeded payment after succeeded initialize
fail-after-init         | Failed payment after succeeded initialize
error                   | Failed initialize

# Testing

You need to have [mocha](https://mochajs.org/) installed on your machine in order to run tests.

`npm test`

# Author

Originally by [Huseyin Babal](https://github.com/huseyinbabal) (huseyinbabal88@gmail.com). Now officially maintained by iyzico.
