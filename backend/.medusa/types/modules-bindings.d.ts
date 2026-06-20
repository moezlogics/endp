import type Meilisearch from '@rokmohar/medusa-plugin-meilisearch/.medusa/server/src/modules/meilisearch'
import type { IStockLocationService } from '@medusajs/framework/types'
import type { IInventoryService } from '@medusajs/framework/types'
import type { IProductModuleService } from '@medusajs/framework/types'
import type { IPricingModuleService } from '@medusajs/framework/types'
import type { IPromotionModuleService } from '@medusajs/framework/types'
import type { ICustomerModuleService } from '@medusajs/framework/types'
import type { ISalesChannelModuleService } from '@medusajs/framework/types'
import type { ICartModuleService } from '@medusajs/framework/types'
import type { IRegionModuleService } from '@medusajs/framework/types'
import type { IApiKeyModuleService } from '@medusajs/framework/types'
import type { IStoreModuleService } from '@medusajs/framework/types'
import type { ITaxModuleService } from '@medusajs/framework/types'
import type { ICurrencyModuleService } from '@medusajs/framework/types'
import type { IPaymentModuleService } from '@medusajs/framework/types'
import type { IOrderModuleService } from '@medusajs/framework/types'
import type { ISettingsModuleService } from '@medusajs/framework/types'
import type { IAuthModuleService } from '@medusajs/framework/types'
import type { IUserModuleService } from '@medusajs/framework/types'
import type { IFulfillmentModuleService } from '@medusajs/framework/types'
import type { INotificationModuleService } from '@medusajs/framework/types'
import type { ICacheService } from '@medusajs/framework/types'
import type { IEventBusModuleService } from '@medusajs/framework/types'
import type { IWorkflowEngineService } from '@medusajs/framework/types'
import type { ILockingModule } from '@medusajs/framework/types'
import type { IFileModuleService } from '@medusajs/framework/types'
import type Blog from '../../src/modules/blog'
import type SiteSettings from '../../src/modules/site-settings'
import type Banners from '../../src/modules/banners'
import type SearchLog from '../../src/modules/search-log'
import type ContactLeads from '../../src/modules/contact-leads'
import type AdvancedReviews from '../../src/modules/advanced_reviews'
import type Brand from '../../src/modules/brand'
import type PushNotifications from '../../src/modules/push-notifications'
import type OtpAuth from '../../src/modules/otp-auth'
import type Loyalty from '../../src/modules/loyalty'
import type BundledProduct from '../../src/modules/bundled-product'
import type AgenticCommerce from '../../src/modules/agentic-commerce'
import type SpecTemplate from '../../src/modules/spec-template'

declare module '@medusajs/framework/types' {
  interface ModuleImplementations {
    'meilisearch': InstanceType<(typeof Meilisearch)['service']>,
    'stock_location': IStockLocationService,
    'inventory': IInventoryService,
    'product': IProductModuleService,
    'pricing': IPricingModuleService,
    'promotion': IPromotionModuleService,
    'customer': ICustomerModuleService,
    'sales_channel': ISalesChannelModuleService,
    'cart': ICartModuleService,
    'region': IRegionModuleService,
    'api_key': IApiKeyModuleService,
    'store': IStoreModuleService,
    'tax': ITaxModuleService,
    'currency': ICurrencyModuleService,
    'payment': IPaymentModuleService,
    'order': IOrderModuleService,
    'settings': ISettingsModuleService,
    'auth': IAuthModuleService,
    'user': IUserModuleService,
    'fulfillment': IFulfillmentModuleService,
    'notification': INotificationModuleService,
    'cache': ICacheService,
    'event_bus': IEventBusModuleService,
    'workflows': IWorkflowEngineService,
    'locking': ILockingModule,
    'file': IFileModuleService,
    'blog': InstanceType<(typeof Blog)['service']>,
    'site_settings': InstanceType<(typeof SiteSettings)['service']>,
    'banners': InstanceType<(typeof Banners)['service']>,
    'search_log': InstanceType<(typeof SearchLog)['service']>,
    'contact_leads': InstanceType<(typeof ContactLeads)['service']>,
    'advanced_reviews': InstanceType<(typeof AdvancedReviews)['service']>,
    'brand': InstanceType<(typeof Brand)['service']>,
    'push_notifications': InstanceType<(typeof PushNotifications)['service']>,
    'otp_auth': InstanceType<(typeof OtpAuth)['service']>,
    'loyalty': InstanceType<(typeof Loyalty)['service']>,
    'bundledProduct': InstanceType<(typeof BundledProduct)['service']>,
    'agenticCommerce': InstanceType<(typeof AgenticCommerce)['service']>,
    'specTemplate': InstanceType<(typeof SpecTemplate)['service']>
  }
}