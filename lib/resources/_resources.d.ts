import {
	IyzipayAPMType,
	IyzipayBillingShipping,
	IyzipayBuyer,
	IyzipayCardAssociation,
	IyzipayCardFamily,
	IyzipayCardType,
	IyzipayCurrency,
	IyzipayCustomer,
	IyzipayItem,
	IyzipayLocale,
	IyzipayPaymentCard,
	IyzipayPaymentChannel,
	IyzipayPaymentGroup,
	IyzipayPlanPaymentType,
	IyzipayRefundReason,
	IyzipayRegisteredCard,
	IyzipayStatus,
	IyzipaySubMerchantType,
	IyzipaySubscriptionInitialStatus,
	IyzipaySubscriptionInterval,
	IyzipaySubscriptionStatus,
	IyzipaySubscriptionUpgradePeriod,
	IyzipayUCSCard,
} from '../iyzipay';

interface DefaultResult {
	status: IyzipayStatus;
	errorCode?: string;
	errorMessage?: string;
	errorGroup?: string;
	locale: IyzipayLocale;
	systemTime: number;
	conversationId?: string;
}

interface DefaultRequest {
	locale?: IyzipayLocale;
	conversationId?: string;
}

interface Token {
	token: string;
	tokenExpireTime: number;
}

interface RetrieveList {
	page: number;
	count: number;
}

interface ResourceResponse {
	path: string;
	method: 'GET' | 'POST' | 'PUT' | 'DELETE';
	requestModel?: string;
	pathVariables?: string;
}

export interface ApiTest {
	retrieve(
		{},
		callback: (err: any, result: DefaultResult) => void
	): ResourceResponse;
}

interface ApprovalResult extends DefaultResult {
	paymentTransactionId: string;
}

export interface Approval {
	create(
		request: DefaultRequest & {
			paymentTransactionId: string;
		},
		callback: (err: any, result: ApprovalResult) => void
	): ResourceResponse;
}

export interface Disapproval {
	create(
		request: DefaultRequest & {
			paymentTransactionId: string;
		},
		callback: (err: any, result: ApprovalResult) => void
	): ResourceResponse;
}

interface BinNumberResult extends DefaultResult {
	binNumber?: string;
	cardType?: string;
	cardAssociation?: string;
	cardFamily?: string;
	bankName?: string;
	bankCode?: number;
	commercial?: number;
}

export interface BinNumber {
	retrieve(
		request: DefaultRequest & {
			binNumber: string;
		},
		callback: (err: any, result: BinNumberResult) => void
	): ResourceResponse;
}

export interface BKMInitialize {
	create(
		request: DefaultRequest & {
			price: number;
			currency: 'TRY' | 'USD' | 'EUR' | 'GBP';
			installment: number;
			basketId?: string;
			paymentChannel?: IyzipayPaymentChannel;
			paymentGroup?: IyzipayPaymentGroup;
			buyer: IyzipayBuyer;
			billingAddress: IyzipayBillingShipping;
			shippingAddress: IyzipayBillingShipping;
			basketItems: IyzipayItem[];
		},
		callback: (
			err: any,
			result: DefaultResult & Token & {
				htmlContent: string;
				redirectUrl: string;
			}
		) => void
	): ResourceResponse;
}

export interface BKM {
	retrieve(
		request: DefaultRequest & Token,
		callback: (err: any, result: PaymentResult & Token & {
			paymentStatus: string;
		}) => void
	): ResourceResponse;
}

export interface Cancel {
	create(
		request: DefaultRequest & {
			ip: string;
			paymentId: string;
			reason?: IyzipayRefundReason;
			description?: string;
		},
		callback: (err: any, result: DefaultResult & {
			price: number;
			currency?: IyzipayCurrency;
			paymentId: number;
			authCode?: string;
			hostReference?: string;
		}) => void
	): ResourceResponse;
}

interface CardResult extends DefaultResult {
	binNumber: string;
	cardType?: IyzipayCardType;
	cardAssociation?: IyzipayCardAssociation;
	cardFamily?: IyzipayCardFamily;
	cardBankName?: string;
	cardBankCode?: number;
	email: string;
	cardUserKey: string;
	cardToken: string;
	cardAlias: string;
}

export interface Card {
	create(
		request: DefaultRequest & {
			card: {
				cardAlias: string;
				cardHolderName: string;
				cardNumber: string;
				expireMonth: string;
				expireYear: string;
			};
			email: string;
			externalId?: string;
		},
		callback: (err: any, result: CardResult) => void
	): ResourceResponse;
	delete(
		request: DefaultRequest & {
			cardToken: string;
			cardUserKey: string;
		},
		callback: (err: any, result: DefaultResult) => void
	): ResourceResponse;
}

interface CardListResult extends DefaultResult {
	cardUserKey: string;
	cardDetails?: {
		cardToken: string;
		cardAlias: string;
		binNumber: string;
		lastFourDigits: string;
		cardType: IyzipayCardType;
		cardAssociation: IyzipayCardAssociation;
		cardFamily: IyzipayCardFamily;
		cardBankCode: number;
		cardBankName: string;
	}[];
}

export interface CardList {
	retrieve(
		request: DefaultRequest & {
			cardUserKey: string;
		},
		callback: (err: any, result: CardListResult) => void
	): ResourceResponse;
}

export interface CheckoutFormInitialize {
	create(
		request: DefaultRequest & {
			price: number;
			paidPrice: number;
			currency: IyzipayCurrency;
			installment: number;
			basketId?: string;
			paymentChannel?: IyzipayPaymentChannel;
			paymentGroup?: IyzipayPaymentGroup;
			callbackUrl: string;
			buyer: IyzipayBuyer;
			shippingAddress: IyzipayBillingShipping;
			billingAddress: IyzipayBillingShipping;
			basketItems: IyzipayItem[];
		},
		callback: (
			err: any,
			result: DefaultResult & Token & {
				checkoutFormContent: string;
				paymentPageUrl: string;
			}
		) => void
	): ResourceResponse;
}

interface CheckoutFormResult extends PaymentResult {
	callbackUrl: string;
	paymentStatus: string;
	mdStatus: string;
	token: string;
}

export interface CheckoutForm {
	retrieve(
		request: DefaultRequest & Token,
		callback: (err: any, result: CheckoutFormResult) => void
	): ResourceResponse;
}

export interface UniversalCardStorageInitialize {
	retrieve(
		request: DefaultRequest & {
			gsmNumber: string;
			email: string;
		},
		callback: (err: any, result: any) => void
	): ResourceResponse;
}

interface InstallmentInfoResult extends DefaultResult {
	installmentDetails: {
		binNumber: string;
		price: number;
		cardType?: IyzipayCardType;
		cardAssociation?: IyzipayCardAssociation;
		cardFamilyName?: IyzipayCardFamily;
		force3ds: string;
		bankName?: string;
		bankCode?: number;
		installmentPrices: {
			installmentPrice: string;
			totalPrice: string;
			installmentNumber: string;
		};
	};
}

export interface InstallmentInfo {
	retrieve(
		request: DefaultRequest & {
			binNumber: string;
			price: number;
		},
		callback: (err: any, result: InstallmentInfoResult) => void
	): ResourceResponse;
}

interface PaymentRequest extends DefaultRequest {
	price: number;
	paidPrice: number;
	currency: IyzipayCurrency;
	installment: number;
	basketId?: string;
	paymentChannel?: IyzipayPaymentChannel;
	paymentGroup?: IyzipayPaymentGroup;
	paymentCard: IyzipayPaymentCard | IyzipayRegisteredCard;
	buyer: IyzipayBuyer;
	billingAddress: IyzipayBillingShipping;
	shippingAddress: IyzipayBillingShipping;
	basketItems: IyzipayItem[];
}

interface Payout {
	paidPrice: number;
	iyziCommissionRateAmount: number;
	iyziCommissionFee: number;
	blockageRateAmountMerchant: number;
	blockageRateAmountSubMerchant: number;
	subMerchantPayoutAmount: number;
	merchantPayoutAmount: number;
	iyziConversionRate: number;
	iyziConversionRateAmount: number;
}

interface PaymentResult extends DefaultResult {
	paymentId: string;
	price: number;
	paidPrice: number;
	currency: IyzipayCurrency;
	installment: number;
	basketId?: string;
	binNumber: string;
	lastFourDigits: string;
	cardAssociation?: IyzipayCardAssociation;
	cardFamily?: IyzipayCardFamily;
	cardType?: IyzipayCardType;
	fraudStatus: number;
	iyziCommissionFee: number;
	iyziCommissionRateAmount: number;
	merchantCommissionRate?: number;
	merchantCommissionRateAmount?: number;
	authCode: string;
	phase: string;
	hostReference: string;
	itemTransactions: Payout & {
		itemId: string;
		paymentTransactionId: string;
		transactionStatus: number;
		price: number;
		merchantCommissionRate: number;
		merchantCommissionRateAmount: number;
		blockageRate: number;
		blockageResolvedDate: string;
		subMerchantPrice: number;
		subMerchantPayoutRate: number;
		merchantPayoutAmount: number;
		convertedPayout: Payout & {
			currency: IyzipayCurrency;
		}
	}[];
}

export interface Payment {
	create(
		request: PaymentRequest,
		callback: (err: any, result: PaymentResult) => void
	): ResourceResponse;
	retrieve(
		request: DefaultRequest & {
			ip: string;
			paymentId: string;
			paymentConversationId?: string;
		},
		callback: (err: any, result: PaymentResult) => void
	): ResourceResponse;
}

export interface PaymentItem {
	update(
		request: DefaultRequest &
			IyzipayItem & {
				paymentTransactionId: string;
			},
		callback: (err: any, result: any) => void
	): ResourceResponse;
}

export interface Refund {
	create(
		request: DefaultRequest & {
			ip: string;
			price: number;
			paymentTransactionId: string;
		},
		callback: (
			err: any,
			result: DefaultResult & {
				price: number;
				currency: IyzipayCurrency;
				paymentId: number;
				paymentTransactionId: string;
				hostReference: string;
				reason?: IyzipayRefundReason;
				description?: string;
				authCode: string;
				retryable: boolean;
			}
		) => void
	): ResourceResponse;
}

export interface RefundToBalance {}

export interface PayoutCompletedTransactionList {
	retrieve(
		request: DefaultRequest & {
			date: Date;
		},
		callback: (err: any, result: any) => void
	): ResourceResponse;
}

interface SubMerchantResult extends DefaultResult {
	subMerchantKey: string;
}

export interface SubMerchant {
	create(
		request: DefaultRequest & {
			name?: string;
			gsmNumber?: string;
			taxOffice: string;
			legalCompanyTitle: string;
			email: string;
			address: string;
			iban?: string;
			subMerchantExternalId: string;
			identityNumber?: string;
			subMerchantType: IyzipaySubMerchantType;
		},
		callback: (err: any, SubMerchantResult) => void
	): ResourceResponse;
	update(
		request: DefaultRequest & {
			name?: string;
			gsmNumber?: string;
			taxOffice: string;
			legalCompanyTitle: string;
			email: string;
			iban: string;
			identityNumber?: string;
			subMerchantKey: string;
		},
		callback: (err: any, result: DefaultResult) => void
	): ResourceResponse;
	retrieve(
		request: DefaultRequest & {
			subMerchantExternalId: string;
		},
		callback: (err: any, result: any) => void
	): ResourceResponse;
}

export interface ThreedsInitialize {
	create(
		request: PaymentRequest & {
			callbackUrl: string;
		},
		callback: (
			err: any,
			result: DefaultResult & {
				htmlContent: string;
			}
		) => void
	): ResourceResponse;
}

export interface ThreedsPayment {
	create(
		request: DefaultRequest & {
			paymentId: string;
			conversationData?: string;
		},
		callback: (err: any, result: PaymentResult) => void
	): ResourceResponse;
}

interface SubscriptionRequest {
	status: IyzipayStatus;
	systemTime: number;
	referenceCode: string;
	createdDate: string;
	name: string;
}

export interface SubscriptionProduct {
	create(
		request: DefaultRequest & {
			name: string;
			description?: string;
		},
		callback: (
			err: any,
			result: SubscriptionRequest & {
				description?: string;
				pricingPlans: any[];
			}
		) => void
	): ResourceResponse;
	update(
		request: DefaultRequest & {
			productReferenceCode: string;
			name?: string;
			description?: string;
		},
		callback: (err: any, result: DefaultResult) => void
	): ResourceResponse;
	delete(
		request: DefaultRequest & {
			productReferenceCode: string;
		},
		callback: (err: any, result: DefaultResult) => void
	): ResourceResponse;
	retrieve(
		request: DefaultRequest & {
			productReferenceCode: string;
		},
		callback: (err: any, result: any) => void
	): ResourceResponse;
	retrieveList(
		request: DefaultRequest & RetrieveList,
		callback: (err: any, result: any) => void
	): ResourceResponse;
}

interface SubscriptionPlanRequest {
	productReferenceCode: string;
	name: string;
	price: number;
	currencyCode: IyzipayCurrency;
	paymentInterval: IyzipaySubscriptionInterval;
	paymentIntervalCount: number;
	trialPeriodDays?: number;
	planPaymentType: IyzipayPlanPaymentType;
	recurrenceCount?: number;
}

export interface SubscriptionPricingPlan {
	create(
		request: DefaultRequest & SubscriptionPlanRequest,
		callback: (
			err: any,
			result: SubscriptionRequest &
				SubscriptionPlanRequest & {
					data: {
						status: string;
					};
				}
		) => void
	): ResourceResponse;
	update(
		request: DefaultRequest & {
			pricingPlanReferenceCode: string;
			name?: string;
			trialPeriodDays?: number;
		},
		callback: (err: any, result: DefaultResult) => void
	): ResourceResponse;
	delete(
		request: DefaultRequest & {
			pricingPlanReferenceCode: string;
		},
		callback: (err: any, result: DefaultResult) => void
	): ResourceResponse;
	retrieve(
		request: DefaultRequest & {
			pricingPlanReferenceCode: string;
		},
		callback: (err: any, result: any) => void
	): ResourceResponse;
	retrieveList(
		request: DefaultRequest & RetrieveList & {
			pricingPlanReferenceCode: string;
		},
		callback: (err: any, result: any) => void
	): ResourceResponse;
}

export interface SubscriptionCustomer {
	create(
		request: DefaultRequest & {
			name: string;
			surname: string;
			identityNumber: string;
			email: string;
			gsmNumber?: string;
			billingAddress: IyzipayBillingShipping;
			shippingAddress: IyzipayBillingShipping;
		},
		callback: (err: any, result: DefaultResult) => void
	): ResourceResponse;
	update(
		request: DefaultRequest & {
			customerReferenceCode: string;
			name?: string;
			surname?: string;
			identityNumber?: string;
			email?: string;
			gsmNumber?: string;
			billingAddress?: IyzipayBillingShipping;
			shippingAddress?: IyzipayBillingShipping;
		},
		callback: (err: any, result: DefaultResult) => void
	): ResourceResponse;
	retrieve(
		request: DefaultRequest & {
			customerReferenceCode: string;
		},
		callback: (err: any, result: any) => void
	): ResourceResponse;
	retrieveList(
		request: DefaultRequest & RetrieveList,
		callback: (err: any, result: any) => void
	): ResourceResponse;
}

export interface SubscriptionCard {
	update(
		request: DefaultRequest & {
			customerReferenceCode: string;
			callbackUrl: string;
		},
		callback: (err: any, result: any) => void
	): ResourceResponse;
	updateWithSubscriptionReferenceCode(
		request: DefaultRequest & {
			subscriptionReferenceCode: string;
			callbackUrl: string;
		},
		callback: (err: any, result: any) => void
	): ResourceResponse;
}

export interface SubscriptionPayment {
	retry(
		request: DefaultRequest & {
			referenceCode: string;
		},
		callback: (err: any, result: any) => void
	): ResourceResponse;
}

export interface Subscription {
	initialize(
		request: DefaultRequest & {
			callbackUrl: string;
			pricingPlanReferenceCode: string;
			subscriptionInitialStatus: IyzipaySubscriptionInitialStatus;
			customer: IyzipayCustomer;
		},
		callback: (err: any, result: any) => void
	): ResourceResponse;
	cancel(
		request: DefaultRequest & {
			subscriptionReferenceCode: string;
		},
		callback: (err: any, result: any) => void
	): ResourceResponse;
	activate(
		request: DefaultRequest & {
			subscriptionReferenceCode: string;
		},
		callback: (err: any, result: any) => void
	): ResourceResponse;
	upgrade(
		request: DefaultRequest & {
			subscriptionReferenceCode: string;
			newPricingPlanReferenceCode: string;
			upgradePeriod: IyzipaySubscriptionUpgradePeriod;
			useTrial?: boolean;
		},
		callback: (err: any, result: any) => void
	): ResourceResponse;
	retrieve(
		request: DefaultRequest & {
			subscriptionReferenceCode: string;
		},
		callback: (err: any, result: any) => void
	): ResourceResponse;
	search(
		request: DefaultRequest & RetrieveList & {
			subscriptionReferenceCode: string;
			parentReferenceCode: string;
			customerReferenceCode: string;
			pricingPlanReferenceCode: string;
			subscriptionStatus: IyzipaySubscriptionStatus;
			startDate: string;
			endDate: string;
		},
		callback: (err: any, result: any) => void
	): ResourceResponse;
}

export interface SubscriptionCheckoutForm {
	initialize(
		request: DefaultRequest & {
			callbackUrl: string;
			pricingPlanReferenceCode: string;
			subscriptionInitialStatus: IyzipaySubscriptionInitialStatus;
			paymentCard:
				| IyzipayPaymentCard
				| IyzipayRegisteredCard
				| IyzipayUCSCard;
			customer: IyzipayCustomer;
		},
		callback: (
			err: any,
			result: DefaultResult & Token & {
				checkoutFormContent: string;
			}
		) => void
	): ResourceResponse;
	retrieve(
		request: DefaultRequest & Token,
		callback: (
			err: any,
			result: DefaultResult & {
				referenceCode: string;
				parentReferenceCode: string;
				pricingPlanReferenceCode: number;
				customerReferenceCode: string;
				subscriptionStatus: IyzipaySubscriptionStatus;
				trialDays?: number;
				trialStartDate?: number;
				trialEndDate?: number;
				createdDate?: number;
				startDate?: number;
			}
		) => void
	): ResourceResponse;
}

export interface SubscriptionExistingCustomer {
	initialize(
		request: DefaultRequest & {
			pricingPlanReferenceCode: string;
			customerReferenceCode: string;
		},
		callback: (err: any, result: any) => void
	): ResourceResponse;
}

export interface SettlementToBalance {
	create(
		request: DefaultRequest & {
			subMerchantKey: string;
			callbackUrl: string;
			price: number;
		},
		callback: (
			err: any,
			result: DefaultResult & Token & {
				url: string;
				isSettingsAllTime: boolean;
			}
		) => void
	): ResourceResponse;
}

export interface RefundToBalance {
	create(
		request: DefaultRequest & {
			paymentId: string | number;
			callbackUrl: string;
		},
		callback: (err: any, result: any) => void
	): ResourceResponse;
}

export interface PeccoInitialize {
	create(
		request: PaymentRequest & {
			callbackUrl: string;
		},
		callback: (err: any, result: PaymentResult & Token) => void
	): ResourceResponse
}

export interface PeccoPayment {
	create(
		request: DefaultRequest & Token,
		callback: (err: any, result: DefaultResult) => void,
	): ResourceResponse;
}

export interface APM {
	create(
		request: PaymentRequest & {
			countryCode: string;
			accountHolderName: string;
			merchantNotificationUrl: string;
			merchantCallbackUrl: string;
			merchantErrorUrl: string;
			apmType: IyzipayAPMType;
		},
		callback: (err: any, result: PaymentResult & {}) => void,
	): ResourceResponse;
	retrieve(): ResourceResponse;
}
