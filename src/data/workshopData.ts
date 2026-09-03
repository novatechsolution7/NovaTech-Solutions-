import { ServiceItem, WorkshopInfo } from '../types';

export const WORKSHOP_DETAILS: WorkshopInfo = {
  name: 'NovaTech Solutions',
  company: 'NovaTech Solutions',
  address: 'H-11, Saligna Street, Arbor Park, Tzaneen, Limpopo - 0850',
  street: 'H-11, Saligna Street',
  suburb: 'Arbor Park',
  city: 'Tzaneen',
  province: 'Limpopo',
  postalCode: '0850',
  phone: '+27745037149',
  phoneDisplay: '+27 74 503 7149',
  whatsappNumber: '27745037149',
  manager: 'Umarfaruk',
  operatingHours: {
    weekdays: '08:00 - 17:30',
    saturday: '08:30 - 14:00',
    sunday: 'Closed / Emergency Callouts',
  },
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=H-11+Saligna+Street+Arbor+Park+Tzaneen+Limpopo+0850',
};

export const POS_KEYPOINTS = [
  {
    number: 1,
    title: 'Powerful Sales Reporting',
    description: 'Track performance with detailed reports'
  },
  {
    number: 2,
    title: 'Smart Stock Control',
    description: 'Easily manage stock and adjust inventory'
  },
  {
    number: 3,
    title: 'Debtor & Creditor Management',
    description: 'Stay on top of payments and accounts'
  },
  {
    number: 4,
    title: 'Role-Based User Access',
    description: 'Secure user control with permission settings'
  },
  {
    number: 5,
    title: 'Mobile Daily Summary App',
    description: 'Access daily business reports on your mobile'
  },
  {
    number: 6,
    title: 'Full Device Compatibility',
    description: 'Compatible with thermal & normal printers, scanners & more'
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'computer-repairing',
    title: 'Computer Repairing',
    iconName: 'tools',
    shortDesc: 'Expert diagnostics and repair for all PC brands. Software and hardware troubleshooting at its best.',
    fullDesc: 'Comprehensive repairs for laptops, desktop computers, and workstations. We troubleshoot motherboard defects, screen replacements, virus removals, overheating, OS reinstallations, and SSD speed upgrades for Dell, HP, Lenovo, Asus, Apple, and Acer.',
    benefits: [
      'Hardware & motherboard micro-soldering',
      'Laptop cracked screen & battery replacement',
      'SSD speed upgrades & RAM expansions',
      'Windows / Linux OS installation & tuning'
    ],
    actionLabel: 'Inquire Now',
    whatsappMessage: 'I need help with Computer Repairing',
    popularFor: 'Slow PC, Broken Screen, Windows Issues',
    priceBadge: 'Diagnostics R150 • Repairs from R250'
  },
  {
    id: 'pos-reselling',
    title: 'POS Reselling',
    iconName: 'cash-register',
    shortDesc: 'Advanced Point of Sale systems for your business. Reliable hardware and software to manage your sales seamlessly.',
    fullDesc: 'Complete POS hardware and software solutions tailored for retail shops, supermarkets, restaurants, and wholesale outlets in Tzaneen and Limpopo. Includes touch-screen terminals, thermal receipt printers, cash drawers, barcode scanners, and intelligent POS software.',
    benefits: [
      'Touch POS terminals & barcode readers',
      'Thermal receipt printers & till rolls',
      'Secure steel cash drawers & mounts',
      'Full setup, cable management & training'
    ],
    posKeypoints: POS_KEYPOINTS,
    actionLabel: 'Get POS Quote',
    whatsappMessage: 'Hi Umarfaruk, I am interested in your POS Reselling solution and features.',
    popularFor: 'Retail Stores, Spaza Shops, Cafes',
    priceBadge: 'Printers R1,650 • Touch POS R6,499'
  },
  {
    id: 'cctv-maintenance',
    title: 'CCTV Maintenance',
    iconName: 'video',
    shortDesc: 'Complete security solutions. We install and maintain high-definition CCTV systems for your safety.',
    fullDesc: 'Protect your home, farm, shop, or commercial warehouse with high-definition surveillance. We provide CCTV installation, DVR/NVR power supplies, camera alignment, infrared night vision maintenance, and phone app live streaming configuration.',
    benefits: [
      'HD / IP Camera installation & repositioning',
      'Mobile phone live view setup (watch anywhere)',
      'DVR/NVR hard drive upgrades & storage recovery',
      'Cable replacement & weatherproof sealing'
    ],
    actionLabel: 'Book Service',
    whatsappMessage: 'I need CCTV Maintenance',
    popularFor: 'Home Security, Farm & Warehouse Surveillance',
    priceBadge: '4-Cam Kit R3,499 • Maintenance from R450'
  },
  {
    id: 'hardware-reselling',
    title: 'Hardware Reselling',
    iconName: 'laptop',
    shortDesc: 'Quality Laptops and Computers at the best prices. Refurbished and New devices with warranty.',
    fullDesc: 'Find reliable, verified business-grade laptops (Dell Latitude, HP EliteBook, Lenovo ThinkPad) and custom desktop towers. Thoroughly inspected, clean operating systems, brand-new batteries where needed, with warranty for peace of mind.',
    benefits: [
      'Certified refurbished business laptops',
      'Budget desktop PCs for office & schoolwork',
      'Monitors, keyboards, mouse & laptop chargers',
      'Verified performance testing & warranty'
    ],
    actionLabel: 'View Stock',
    whatsappMessage: 'Interested in buying Laptop/Computer',
    popularFor: 'Students, Small Businesses, Remote Work',
    priceBadge: 'Laptops from R3,699 • PCs from R2,499'
  },
  {
    id: 'digital-services',
    title: 'Digital Services',
    iconName: 'globe',
    shortDesc: 'From software installations to digital configurations, we provide all kinds of technical digital assistance.',
    fullDesc: 'End-to-end digital assistance including Microsoft Office suite activation, driver updates, accounting software setup, data backup and cloud sync, secure Wi-Fi router setup, and remote IT support whenever you get stuck.',
    benefits: [
      'Software installation & license configuration',
      'Office, PDF & business software setup',
      'Wi-Fi router & office networking configuration',
      'Data backup, file recovery & cloud transfers'
    ],
    actionLabel: 'Contact Us',
    whatsappMessage: 'Inquiry for Digital Services',
    popularFor: 'Software Setup, Router Config, Data Recovery',
    priceBadge: 'From R200 per service'
  }
];

export function getWhatsAppUrl(customMessage?: string): string {
  const base = `https://wa.me/${WORKSHOP_DETAILS.whatsappNumber}`;
  if (!customMessage) return base;
  return `${base}?text=${encodeURIComponent(customMessage)}`;
}
