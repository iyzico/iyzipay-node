import {
	ApiTest,
	APM,
	Approval,
	BinNumber,
	BKM,
	BKMInitialize,
	Cancel,
	Card,
	CardList,
	CheckoutForm,
	CheckoutFormInitialize,
	Disapproval,
	InstallmentInfo,
	Payment,
	PaymentItem,
	PayoutCompletedTransactionList,
	PeccoInitialize,
	PeccoPayment,
	Refund,
	RefundToBalance,
	SettlementToBalance,
	SubMerchant,
	Subscription,
	SubscriptionCard,
	SubscriptionCheckoutForm,
	SubscriptionCustomer,
	SubscriptionExistingCustomer,
	SubscriptionPayment,
	SubscriptionPricingPlan,
	SubscriptionProduct,
	ThreedsInitialize,
	ThreedsPayment,
	UniversalCardStorageInitialize,
} from './resources/_resources';

export type IyzipayStatus = 'success' | 'failure';
export type IyzipayLocale = 'tr' | 'en';
export type IyzipayCurrency =
	| 'TRY'
	| 'EUR'
	| 'USD'
	| 'IRR'
	| 'GBP'
	| 'NOK'
	| 'RUB'
	| 'CHF';
export type IyzipayRefundReason =
	| 'double_payment'
	| 'buyer_request'
	| 'fraud'
	| 'other';
export type IyzipayPaymentChannel =
	| 'WEB'
	| 'MOBILE'
	| 'MOBILE_WEB'
	| 'MOBILE_IOS'
	| 'MOBILE_ANDROID'
	| 'MOBILE_WINDOWS'
	| 'MOBILE_TABLET'
	| 'MOBILE_PHONE';
export type IyzipayPaymentGroup = 'PRODUCT' | 'LISTING' | 'SUBSCRIPTION';
export type IyzipayCardType = 'CREDIT_CARD' | 'DEBIT_CARD' | 'PREPAID_CARD';
export type IyzipayCardAssociation =
	| 'TROY'
	| 'VISA'
	| 'MASTER_CARD'
	| 'AMERICAN_EXPRESS';
export type IyzipayCardFamily =
	| 'Bonus'
	| 'Axess'
	| 'World'
	| 'Maximum'
	| 'Paraf'
	| 'CardFinans'
	| 'Advantage';
export type IyzipaySubMerchantType =
	| 'PRIVATE_COMPANY'
	| 'LIMITED_OR_JOINT_STOCK_COMPANY'
	| 'PERSONAL';
export type IyzipaySubscriptionInterval =
	| 'DAILY'
	| 'WEEKLY'
	| 'MONTHLY'
	| 'YEARLY';
export type IyzipayPlanPaymentType = 'RECURRING';
export type IyzipaySubscriptionUpgradePeriod = 'NOW';
export type IyzipaySubscriptionStatus =
	| 'EXPIRED'
	| 'UNPAID'
	| 'CANCELED'
	| 'ACTIVE'
	| 'PENDING'
	| 'UPGRADED';
export type IyzipaySubscriptionInitialStatus = 'ACTIVE' | 'PENDING';
export type IyzipayBasketItemType = 'VIRTUAL' | 'PHYSICAL';
export type IyzipayAPMType = 'SOFORT' | 'IDEAL' | 'QIWI' | 'GIROPAY';

export interface IyzipayBuyer {
	id: string;
	name: string;
	surname: string;
	identityNumber: string;
	city: string;
	country: string;
	email: string;
	gsmNumber?: string;
	ip: string;
	registrationAddress: string;
	zipCode?: string;
	registrationDate?: Date;
	lastLoginDate?: Date;
}

export interface IyzipayBillingShipping {
	contactName: string;
	city: string;
	country: string;
	address: string;
	zipCode?: string;
}

export interface IyzipayItem {
	id: string;
	itemType: IyzipayBasketItemType;
	name: string;
	category1: string;
	category2?: string;
	price: number;
	subMerchantKey?: string;
	subMerchantPrice?: number;
}

export interface IyzipayCustomer {
	name: string;
	surname: string;
	identityNumber: string;
	email: string;
	gsmNumber?: string;
	billingAddress: IyzipayBillingShipping;
	shippingAddress: IyzipayBillingShipping;
}

export interface IyzipayPaymentCard {
	cardNumber: string;
	expireYear: string;
	expireMonth: string;
	cvc: string;
	cardHolderName: string;
	registerCard?: number;
	cardAlias?: string;
	registerConsumerCard?: boolean;
}

export interface IyzipayRegisteredCard {
	cardUserKey: string;
	cardToken: string;
}

export interface IyzipayUCSCard {
	ucsToken: string;
	cardToken: string;
	consumerToken: string;
	registerConsumerCard: boolean | false;
}

export interface IyzipayConfig {
	uri: string;
	apiKey: string;
	secretKey: string;
}

declare module 'iyzipay' {
	class Iyzipay {
		constructor(config: IyzipayConfig);

		private _config: IyzipayConfig;

		public static readonly LOCALE: {
			[key: string]: IyzipayLocale;
		} = {
			TR: 'tr',
			EN: 'en',
		};

		public static readonly PAYMENT_GROUP: {
			[key: string]: IyzipayPaymentGroup;
		} = {
			PRODUCT: 'PRODUCT',
			LISTING: 'LISTING',
			SUBSCRIPTION: 'SUBSCRIPTION',
		};

		public static readonly BASKET_ITEM_TYPE: {
			[key: string]: IyzipayBasketItemType;
		} = {
			PHYSICAL: 'PHYSICAL',
			VIRTUAL: 'VIRTUAL',
		};

		public static readonly PAYMENT_CHANNEL: {
			[key: string]: IyzipayPaymentChannel;
		} = {
			MOBILE: 'MOBILE',
			WEB: 'WEB',
			MOBILE_WEB: 'MOBILE_WEB',
			MOBILE_IOS: 'MOBILE_IOS',
			MOBILE_ANDROID: 'MOBILE_ANDROID',
			MOBILE_WINDOWS: 'MOBILE_WINDOWS',
			MOBILE_TABLET: 'MOBILE_TABLET',
			MOBILE_PHONE: 'MOBILE_PHONE',
		};

		public static readonly SUB_MERCHANT_TYPE: {
			[key: string]: IyzipaySubMerchantType;
		} = {
			PERSONAL: 'PERSONAL',
			PRIVATE_COMPANY: 'PRIVATE_COMPANY',
			LIMITED_OR_JOINT_STOCK_COMPANY: 'LIMITED_OR_JOINT_STOCK_COMPANY',
		};

		public static readonly CURRENCY: {
			[key: string]: IyzipayCurrency;
		} = {
			TRY: 'TRY',
			EUR: 'EUR',
			USD: 'USD',
			IRR: 'IRR',
			GBP: 'GBP',
			NOK: 'NOK',
			RUB: 'RUB',
			CHF: 'CHF',
		};

		public static readonly APM_TYPE: {
			[key: string]: IyzipayAPMType;
		} = {
			SOFORT: 'SOFORT',
			IDEAL: 'IDEAL',
			QIWI: 'QIWI',
			GIROPAY: 'GIROPAY',
		};

		public static readonly REFUND_REASON: {
			[key: string]: IyzipayRefundReason;
		} = {
			DOUBLE_PAYMENT: 'double_payment',
			BUYER_REQUEST: 'buyer_request',
			FRAUD: 'fraud',
			OTHER: 'other',
		};

		public static readonly PLAN_PAYMENT_TYPE: {
			[key: string]: IyzipayPlanPaymentType;
		} = {
			RECURRING: 'RECURRING',
		};

		public static readonly SUBSCRIPTION_PRICING_PLAN_INTERVAL: {
			[key: string]: IyzipaySubscriptionInterval;
		} = {
			DAILY: 'DAILY',
			WEEKLY: 'WEEKLY',
			MONTHLY: 'MONTHLY',
			YEARLY: 'YEARLY',
		};

		public static readonly SUBSCRIPTION_UPGRADE_PERIOD: {
			[key: string]: IyzipaySubscriptionUpgradePeriod;
		} = {
			NOW: 'NOW',
		};

		public static readonly SUBSCRIPTION_STATUS: {
			[key: string]: IyzipaySubscriptionStatus;
		} = {
			EXPIRED: 'EXPIRED',
			UNPAID: 'UNPAID',
			CANCELED: 'CANCELED',
			ACTIVE: 'ACTIVE',
			PENDING: 'PENDING',
			UPGRADED: 'UPGRADED',
		};

		public static readonly SUBSCRIPTION_INITIAL_STATUS: {
			[key: string]: IyzipaySubscriptionInitialStatus;
		} = {
			ACTIVE: 'ACTIVE',
			PENDING: 'PENDING',
		};

		apiTest: ApiTest;
		approval: Approval;
		disapproval: Disapproval;
		binNumber: BinNumber;
		bkmInitialize: BKMInitialize;
		bkm: BKM;
		cancel: Cancel;
		card: Card;
		cardList: CardList;
		checkoutFormInitialize: CheckoutFormInitialize;
		checkoutForm: CheckoutForm;
		universalCardStorageInitialize: UniversalCardStorageInitialize;
		installmentInfo: InstallmentInfo;
		payment: Payment;
		paymentItem: PaymentItem;
		peccoInitialize: PeccoInitialize;
		peccoPayment: PeccoPayment;
		refund: Refund;
		refundToBalance: RefundToBalance;
		payoutCompletedTransactionList: PayoutCompletedTransactionList;
		bouncedBankTransferList: PayoutCompletedTransactionList;
		settlementToBalance: SettlementToBalance;
		subMerchant: SubMerchant;
		subscription: Subscription;
		subscriptionExistingCustomer: SubscriptionExistingCustomer;
		subscriptionCard: SubscriptionCard;
		subscriptionCheckoutForm: SubscriptionCheckoutForm;
		subscriptionCustomer: SubscriptionCustomer;
		subscriptionPayment: SubscriptionPayment;
		subscriptionProduct: SubscriptionProduct;
		subscriptionPricingPlan: SubscriptionPricingPlan;
		threedsInitialize: ThreedsInitialize;
		threedsPayment: ThreedsPayment;
		apm: APM;
	}

	export = Iyzipay;
}
