export interface IyzipayOptions {
    uri?: string | null;
    apiKey?: string | null;
    secretKey?: string | null;
}

export type IyzipayCallback<T = any> = (err: any, result: T) => void;

export interface IyzipayResource<TRequest = any, TResponse = any> {
    create?(params: TRequest, cb: IyzipayCallback<TResponse>): void;
    retrieve?(params: TRequest, cb: IyzipayCallback<TResponse>): void;
    retrieveList?(params: TRequest, cb: IyzipayCallback<TResponse>): void;
    update?(params: TRequest, cb: IyzipayCallback<TResponse>): void;
    delete?(params: TRequest, cb: IyzipayCallback<TResponse>): void;
    [key: string]: any;
}

declare class Iyzipay {
    constructor(config?: IyzipayOptions);

    apiTest: IyzipayResource;
    apm: IyzipayResource;
    approval: IyzipayResource;
    basicBkm: IyzipayResource;
    basicBkmInitialize: IyzipayResource;
    basicPayment: IyzipayResource;
    basicPaymentPostAuth: IyzipayResource;
    basicPaymentPreAuth: IyzipayResource;
    basicThreedsInitialize: IyzipayResource;
    basicThreedsInitializePreAuth: IyzipayResource;
    basicThreedsPayment: IyzipayResource;
    binNumber: IyzipayResource;
    bkm: IyzipayResource;
    bkmInitialize: IyzipayResource;
    bouncedBankTransferList: IyzipayResource;
    cancel: IyzipayResource;
    card: IyzipayResource;
    cardList: IyzipayResource;
    checkoutForm: IyzipayResource;
    checkoutFormInitialize: IyzipayResource;
    checkoutFormInitializePreAuth: IyzipayResource;
    crossBookingFromSubMerchant: IyzipayResource;
    crossBookingToSubMerchant: IyzipayResource;
    disapproval: IyzipayResource;
    installmentHtml: IyzipayResource;
    installmentInfo: IyzipayResource;
    iyziLink: IyzipayResource;
    payment: IyzipayResource;
    paymentItem: IyzipayResource;
    paymentPostAuth: IyzipayResource;
    paymentPreAuth: IyzipayResource;
    payoutCompletedTransactionList: IyzipayResource;
    payWithIyzico: IyzipayResource;
    peccoInitialize: IyzipayResource;
    peccoPayment: IyzipayResource;
    refund: IyzipayResource;
    refundChargedFromMerchant: IyzipayResource;
    refundToBalance: IyzipayResource;
    refundV2: IyzipayResource;
    reportingBouncedPayments: IyzipayResource;
    reportingPayoutCompleted: IyzipayResource;
    reportingScrollTransactions: IyzipayResource;
    reportingTransactionDetails: IyzipayResource;
    reportingTransactions: IyzipayResource;
    settlementToBalance: IyzipayResource;
    subMerchant: IyzipayResource;
    subscription: IyzipayResource;
    subscriptionCard: IyzipayResource;
    subscriptionCheckoutForm: IyzipayResource;
    subscriptionCustomer: IyzipayResource;
    subscriptionExistingCustomer: IyzipayResource;
    subscriptionPayment: IyzipayResource;
    subscriptionPricingPlan: IyzipayResource;
    subscriptionProduct: IyzipayResource;
    threedsInitialize: IyzipayResource;
    threedsInitializePreAuth: IyzipayResource;
    threedsPayment: IyzipayResource;
    threedsV2Payment: IyzipayResource;
    universalCardStorageInitialize: IyzipayResource;
    webhook: IyzipayResource;

    static LOCALE: {
        TR: string;
        EN: string;
    };

    static PAYMENT_GROUP: {
        PRODUCT: string;
        LISTING: string;
        SUBSCRIPTION: string;
    };

    static BASKET_ITEM_TYPE: {
        PHYSICAL: string;
        VIRTUAL: string;
    };

    static PAYMENT_CHANNEL: {
        MOBILE: string;
        WEB: string;
        MOBILE_WEB: string;
        MOBILE_IOS: string;
        MOBILE_ANDROID: string;
        MOBILE_WINDOWS: string;
        MOBILE_TABLET: string;
        MOBILE_PHONE: string;
    };

    static SUB_MERCHANT_TYPE: {
        PERSONAL: string;
        PRIVATE_COMPANY: string;
        LIMITED_OR_JOINT_STOCK_COMPANY: string;
    };

    static CURRENCY: {
        TRY: string;
        EUR: string;
        USD: string;
        IRR: string;
        GBP: string;
        NOK: string;
        RUB: string;
        CHF: string;
    };

    static APM_TYPE: {
        SOFORT: string;
        IDEAL: string;
        QIWI: string;
        GIROPAY: string;
    };

    static REFUND_REASON: {
        DOUBLE_PAYMENT: string;
        BUYER_REQUEST: string;
        FRAUD: string;
        OTHER: string;
    };

    static PLAN_PAYMENT_TYPE: {
        RECURRING: string;
    };

    static SUBSCRIPTION_PRICING_PLAN_INTERVAL: {
        DAILY: string;
        WEEKLY: string;
        MONTHLY: string;
        YEARLY: string;
    };

    static SUBSCRIPTION_UPGRADE_PERIOD: {
        NOW: string;
        NEXT_PERIOD: string;
    };

    static SUBSCRIPTION_STATUS: {
        EXPIRED: string;
        UNPAID: string;
        CANCELED: string;
        ACTIVE: string;
        PENDING: string;
        UPGRADED: string;
    };

    static SUBSCRIPTION_INITIAL_STATUS: {
        ACTIVE: string;
        PENDING: string;
    };
}

export = Iyzipay;
