// Single source of truth for site-wide content. Content mirrors app.cardify.co.

export const SITE = {
  name: 'Cardify',
  tagline: 'Dollar cards, gift cards, US ACH accounts and more — in one app.',
  email: 'support@cardify.co',
  phone: '+234 (0) 1229-2722',
  hours: 'Weekdays, 9am – 5pm',
  // TODO: swap these for the exact blog / YouTube / help-centre URLs when you have them.
  // Until then they point at the live app so no link is ever broken or guessed.
  external: {
    app: 'https://app.cardify.co',
    blog: 'https://app.cardify.co',
    youtube: 'https://app.cardify.co',
    knowledgebase: 'https://app.cardify.co',
    links: 'https://app.cardify.co',
    legal: 'https://app.cardify.co',
  },
} as const

export type NavLink = { label: string; to: string; external?: boolean }
export type NavGroup = { label: string; items: (NavLink & { description?: string })[] }

export const PRIMARY_NAV: NavLink[] = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export const PRODUCT_MENU: NavGroup = {
  label: 'Products',
  items: [
    { label: 'Dollar Cards', to: '/#products', description: 'Virtual USD cards funded with NGN & USDT.' },
    { label: 'Gift Cards', to: '/#products', description: 'Buy and sell unused gift cards.' },
    { label: 'US ACH Account', to: '/#products', description: 'Get paid in USD with a US account.' },
    { label: 'Cardify Store', to: '/#products', description: 'Bills, gadgets and digital business cards.' },
    { label: 'Naira Cards', to: '/#products', description: 'Spend naira with a Cardify card.' },
  ],
}

export const HERO_HEADLINES = [
  'Create & fund dollar cards with NGN & USDT',
  'Buy & sell unused gift cards',
  'Get paid with USDT & US ACH accounts',
  'Pay bills, buy tech gadgets with NGN & USDT',
  'Get digital business cards on Cardify Store',
] as const

export const STATS = [
  { value: '100k+', label: 'Verified users' },
  { value: '5+', label: 'Assets supported' },
  { value: '1m+', label: 'Transactions' },
] as const

export type Product = {
  id: string
  title: string
  description: string
  cta: string
  icon: 'card' | 'gift' | 'bank' | 'store' | 'naira'
  badge?: string
}

export const PRODUCTS: Product[] = [
  {
    id: 'dollar-cards',
    title: 'Virtual Dollar Cards',
    description:
      'Create a virtual dollar card in minutes and fund it with NGN or USDT. Pay for subscriptions, ads and online checkouts anywhere in the world.',
    cta: 'Explore Cardify Dollar Cards',
    icon: 'card',
    badge: 'Popular',
  },
  {
    id: 'gift-cards',
    title: 'Buy & Sell Gift Cards',
    description:
      'Turn unused gift cards into cash at competitive rates, or buy codes for the platforms you love — fast and secure.',
    cta: 'Explore Cardify Gift Cards',
    icon: 'gift',
  },
  {
    id: 'us-ach',
    title: 'US ACH Account',
    description:
      'Receive USD from clients and platforms with a US ACH account, then withdraw or convert to naira when you are ready.',
    cta: 'Explore Cardify US ACH Account',
    icon: 'bank',
  },
  {
    id: 'store',
    title: 'Cardify Store',
    description:
      'Pay bills, top up airtime, buy vouchers and tech gadgets with NGN or USDT — all from one storefront.',
    cta: 'Explore Cardify Bills',
    icon: 'store',
  },
  {
    id: 'naira-cards',
    title: 'Naira Cards',
    description:
      'A naira card that works online and in-store, so you can spend, track and manage your money your way.',
    cta: 'Explore Cardify Naira Cards',
    icon: 'naira',
  },
]

export const RESOURCES = [
  { title: 'Cardify Blog', text: 'News, guides and product updates.', href: SITE.external.blog },
  { title: 'YouTube Channel', text: 'Tutorials, events and user stories.', href: SITE.external.youtube },
  { title: 'Knowledgebase', text: 'Step-by-step help for every feature.', href: SITE.external.knowledgebase },
  { title: 'Our Links', text: 'Every Cardify channel in one place.', href: SITE.external.links },
] as const

export const PRESS = ['TechPoint Africa', 'The Guardian', 'TechCrunch', 'BusinessDay', 'Nigeria Tribune', 'TechCabal'] as const

export const FOOTER_GROUPS = [
  {
    title: 'Products',
    links: [
      { label: 'Virtual Dollar Cards', to: '/#products' },
      { label: 'Gift Cards', to: '/#products' },
      { label: 'US ACH Account', to: '/#products' },
      { label: 'Cardify Store', to: '/#products' },
      { label: 'Naira Cards', to: '/#products' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Contact us', to: '/contact' },
      { label: 'Careers', to: '/contact' },
      { label: 'Blog', to: SITE.external.blog, external: true },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', to: SITE.external.legal, external: true },
      { label: 'Terms', to: SITE.external.legal, external: true },
      { label: 'AML & KYC Policy', to: SITE.external.legal, external: true },
      { label: 'Risk Warning', to: SITE.external.legal, external: true },
    ],
  },
] as const

export const DISCLAIMER =
  'Cardify is not a bank and does not hold depositors’ funds. It is a fintech company working with licensed partners. Cardify Africa is a trading name of CARDIFY TECHNOLOGY LIMITED (UK), registered as CARDIFY COMPANY LTD (Nigeria) and Cardify Africa Technology Inc (USA).'
