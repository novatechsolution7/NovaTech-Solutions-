import { StockItem } from '../types';

export interface RepairServicePrice {
  id: string;
  service: string;
  category: 'laptop' | 'desktop';
  priceZAR: number;
  priceNote: string;
  turnaround: string;
  description: string;
}

export const COMPUTER_REPAIR_PRICING: RepairServicePrice[] = [
  {
    id: 'diagnostics',
    service: 'Hardware & Software Fault Diagnostics',
    category: 'laptop',
    priceZAR: 150,
    priceNote: 'Free if repair proceeds',
    turnaround: 'Same-Day (2-4 hours)',
    description: 'Complete bench check, motherboard testing, hard drive health, and RAM diagnostics.'
  },
  {
    id: 'windows-install',
    service: 'Windows 10/11 Pro Clean Installation & Driver Setup',
    category: 'laptop',
    priceZAR: 350,
    priceNote: 'Standard Fix',
    turnaround: 'Same-Day',
    description: 'Clean OS install, motherboard chipset drivers, essential software, and antivirus setup.'
  },
  {
    id: 'ssd-upgrade-service',
    service: 'High-Speed SSD Upgrade + Data Migration',
    category: 'laptop',
    priceZAR: 750,
    priceNote: 'Includes 256GB SSD + Labor',
    turnaround: 'Same-Day',
    description: 'Replace slow spinning hard drive with ultra-fast solid state disk. Makes PC 5x faster.'
  },
  {
    id: 'laptop-screen',
    service: 'Laptop Screen Replacement (14" / 15.6" LED)',
    category: 'laptop',
    priceZAR: 950,
    priceNote: 'From R 950 (Brand & Model dependent)',
    turnaround: '24 Hours',
    description: 'Replacement of cracked, flickering, or black screens with Grade A brand-new panels.'
  },
  {
    id: 'laptop-battery',
    service: 'Laptop Battery Replacement (Original Spec)',
    category: 'laptop',
    priceZAR: 550,
    priceNote: 'From R 550',
    turnaround: 'Same-Day',
    description: 'Certified replacement batteries for Dell, HP, Lenovo, Acer, Asus, Apple MacBook.'
  },
  {
    id: 'motherboard-repair',
    service: 'Motherboard Micro-Soldering & Power Jack Repair',
    category: 'laptop',
    priceZAR: 650,
    priceNote: 'Starting from R 650',
    turnaround: '24-48 Hours',
    description: 'Fix no-power issues, charging port defects, blown capacitors, and liquid damage recovery.'
  },
  {
    id: 'pc-servicing',
    service: 'Deep Dust Cleaning & Thermal Paste Service',
    category: 'desktop',
    priceZAR: 250,
    priceNote: 'Fixed Price',
    turnaround: 'Same-Day (1-2 hours)',
    description: 'Prevents overheating, silent fan performance, new high-performance Arctic thermal paste.'
  }
];

export const STOCK_ITEMS: StockItem[] = [
  // Laptops (Certified Business Grade & New)
  {
    id: 'hp-probook-450-g5',
    name: 'HP ProBook 450 G5 15.6" Office & Student Laptop',
    category: 'laptop',
    condition: 'Certified Refurbished',
    priceZAR: 3699,
    originalPriceZAR: 4899,
    specs: [
      'Intel Core i5 (8th Gen Quad-Core)',
      '8 GB DDR4 RAM (Expandable to 32GB)',
      '256 GB High-Speed Solid State Drive',
      '15.6" Anti-Glare Display with Full Number Pad',
      'Original HP Fast Charger + Good Health Battery'
    ],
    warranty: '6 Months Workshop Warranty',
    inStock: true,
    highlight: 'Best Budget Seller for Accounting & Students'
  },
  {
    id: 'dell-latitude-7490',
    name: 'Dell Latitude 7490 Ultrabook (Slim & Light)',
    category: 'laptop',
    condition: 'Certified Refurbished',
    priceZAR: 4299,
    originalPriceZAR: 5499,
    specs: [
      'Intel Core i5 (8th Gen Quad-Core vPro)',
      '8 GB DDR4 RAM (Upgradable)',
      '256 GB High-Speed NVMe SSD',
      '14.0" Full HD (1920x1080) Anti-Glare IPS',
      'Magnesium Alloy Frame & Original Dell Type-C/Barrel Charger'
    ],
    warranty: '6 Months Workshop Warranty',
    inStock: true,
    highlight: 'Slim, Durable & Fast Performance'
  },
  {
    id: 'hp-elitebook-840-g5',
    name: 'HP EliteBook 840 G5 Aluminum Power Edition',
    category: 'laptop',
    condition: 'Certified Refurbished',
    priceZAR: 4899,
    originalPriceZAR: 6299,
    specs: [
      'Intel Core i5 (8th Gen Quad-Core 8-Thread)',
      '16 GB High-Speed DDR4 RAM',
      '512 GB Ultra NVMe Solid State Drive',
      'Full Aluminum CNC Unibody Chassis + Backlit Keyboard',
      'Bang & Olufsen Crystal Studio Speakers'
    ],
    warranty: '6 Months Workshop Warranty',
    inStock: true,
    highlight: '16GB RAM + 512GB SSD Multitasking Power'
  },
  {
    id: 'dell-latitude-5400',
    name: 'Dell Latitude 5400 Business Workhorse',
    category: 'laptop',
    condition: 'Certified Refurbished',
    priceZAR: 4999,
    originalPriceZAR: 6499,
    specs: [
      'Intel Core i5 (8th Gen Quad-Core)',
      '16 GB DDR4 RAM',
      '512 GB NVMe M.2 Solid State Drive',
      '14" Full HD Screen + Type-C Power Delivery',
      'Backlit Ergonomic Keyboard & Long-Life Battery'
    ],
    warranty: '6 Months Workshop Warranty',
    inStock: true,
    highlight: 'Modern Type-C + 16GB Memory'
  },
  {
    id: 'lenovo-thinkpad-t480',
    name: 'Lenovo ThinkPad T480 Core i7 Heavy-Duty Edition',
    category: 'laptop',
    condition: 'Certified Refurbished',
    priceZAR: 5799,
    originalPriceZAR: 7499,
    specs: [
      'Intel Core i7 (8th Gen 8-Thread High Turbo)',
      '16 GB DDR4 RAM (Upgradable to 64GB)',
      '512 GB High-Speed NVMe SSD',
      'Dual Battery System (Bridge Battery Technology)',
      'Military Grade MIL-STD 810G Durability & Spill-Proof Keyboard'
    ],
    warranty: '6 Months Workshop Warranty',
    inStock: true,
    highlight: 'Core i7 + Dual Battery Long Runtime'
  },
  {
    id: 'asus-vivobook-15',
    name: 'ASUS Vivobook 15 Slim (Brand New In Sealed Box)',
    category: 'laptop',
    condition: 'Brand New',
    priceZAR: 6799,
    originalPriceZAR: 7999,
    specs: [
      'Intel Core i3 (12th Gen 6-Core / Efficient Architecture)',
      '8 GB High-Speed DDR4 RAM + 512 GB NVMe SSD',
      '15.6" NanoEdge Full HD Display',
      'Full Ergonomic Keyboard with Numpad',
      'Brand New Sealed Box with 1 Year Full Warranty'
    ],
    warranty: '1 Year Manufacturer Warranty',
    inStock: true,
    highlight: 'Brand New Sealed in Box'
  },

  // Desktop Computers (Reliable Towers & Complete Bundles)
  {
    id: 'hp-prodesk-sff',
    name: 'HP ProDesk 400 G4 Core i5 Small Form Factor PC',
    category: 'desktop',
    condition: 'Certified Refurbished',
    priceZAR: 2499,
    originalPriceZAR: 3200,
    specs: [
      'Intel Core i5 Quad-Core Processor',
      '8 GB RAM (Expandable to 32GB)',
      '256 GB High-Speed SSD',
      'Windows 11 Pro 64-bit Genuine Activated',
      'Ultra Quiet, Compact Low-Power Consumption Design'
    ],
    warranty: '6 Months Workshop Warranty',
    inStock: true,
    highlight: 'Super Affordable Office Workhorse'
  },
  {
    id: 'dell-optiplex-sff',
    name: 'Dell OptiPlex 7050 Small Form Factor PC Tower',
    category: 'desktop',
    condition: 'Certified Refurbished',
    priceZAR: 2799,
    originalPriceZAR: 3600,
    specs: [
      'Intel Core i5 Quad-Core Processor',
      '8 GB DDR4 RAM + 256 GB High-Speed SSD',
      'Windows 11 Pro Licensed & Configured',
      'Multiple DisplayPort, HDMI & High-Speed USB 3.0',
      'Pre-installed with Office Tools & Anti-Virus'
    ],
    warranty: '6 Months Workshop Warranty',
    inStock: true,
    highlight: 'Reliable Daily Business Tower'
  },
  {
    id: 'complete-office-pc-bundle',
    name: 'Complete Desktop PC Bundle (Plug-and-Play Setup)',
    category: 'desktop',
    condition: 'Certified Refurbished',
    priceZAR: 3899,
    originalPriceZAR: 4999,
    specs: [
      'Dell / HP Core i5 Quad-Core Desktop Tower',
      '22-inch Widescreen Full HD LED Monitor included',
      'New USB Keyboard, Optical Mouse & All Power/VGA/Display Cables',
      '256 GB SSD (boots Windows in 10 seconds)',
      '100% Ready to Use for Shop, School, or Reception'
    ],
    warranty: '6 Months Workshop Warranty',
    inStock: true,
    highlight: 'Full Complete Setup with 22" Monitor'
  },
  {
    id: 'high-perf-i7-pc',
    name: 'Core i7 High-Performance Desktop Tower',
    category: 'desktop',
    condition: 'Certified Refurbished',
    priceZAR: 5299,
    originalPriceZAR: 6999,
    specs: [
      'Intel Core i7 (8-Thread High Clock Processor)',
      '16 GB High-Speed DDR4 RAM',
      '512 GB NVMe SSD + 1 TB Secondary Storage HDD',
      'Supports Dual Full HD Monitors simultaneously',
      'Ideal for heavy multitasking, CAD, accounting & CCTV NVR'
    ],
    warranty: '6 Months Workshop Warranty',
    inStock: true,
    highlight: 'Core i7 + 16GB RAM + Dual Drives'
  },

  // POS Hardware
  {
    id: 'pos-touch-terminal-15',
    name: '15.6" Capacitive Touch POS Terminal',
    category: 'pos',
    condition: 'Brand New',
    priceZAR: 6499,
    specs: [
      '15.6" Waterproof Bezel-Free Touchscreen',
      'Intel High-Speed POS Motherboard',
      '4 GB RAM / 64 GB Solid State Disk',
      'Heavy Aluminum Alloy Desktop Stand',
      'Rich I/O: 6x USB, COM, LAN, VGA, Audio'
    ],
    warranty: '1 Year Full Warranty',
    inStock: true,
    highlight: 'Heavy-Duty Commercial Grade'
  },
  {
    id: 'pos-thermal-printer-80mm',
    name: '80mm Auto-Cut Thermal Slip Printer',
    category: 'pos',
    condition: 'Brand New',
    priceZAR: 1650,
    specs: [
      'Ultra Fast 260mm/s Printing Speed',
      'Automatic Heavy-Duty Paper Cutter',
      'Triple Interface: USB + LAN + Cash Drawer RJ11',
      'Standard 80mm Till Rolls Supported',
      'Easy Drop-in Paper Loading'
    ],
    warranty: '1 Year Warranty',
    inStock: true,
    highlight: 'LAN & USB Compatible'
  },
  {
    id: 'pos-cash-drawer-metal',
    name: 'Heavy-Duty Steel POS Cash Drawer',
    category: 'pos',
    condition: 'Brand New',
    priceZAR: 950,
    specs: [
      'Reinforced Steel Construction',
      '5 Banknote Compartments & 8 Coin Cups',
      'RJ11 Auto-Kick Cable (Connects to Printer)',
      '3-Position Key Lock (Manual / Auto / Locked)',
      'Front Cheque / Voucher Insertion Slot'
    ],
    warranty: '1 Year Warranty',
    inStock: true,
    highlight: 'Tamper-Proof Steel'
  },
  {
    id: 'pos-barcode-scanner-2d',
    name: 'Hands-Free 1D / 2D Omnidirectional Scanner',
    category: 'pos',
    condition: 'Brand New',
    priceZAR: 1250,
    specs: [
      'Omnidirectional 360-Degree Scan Window',
      'Reads Paper Barcodes & Phone Screen QR Codes',
      'Fast Supermarket Scanning Speed',
      'Plug-and-Play USB (No Drivers Needed)',
      'Buzzer & LED Confirmation'
    ],
    warranty: '1 Year Warranty',
    inStock: true,
    highlight: 'Ideal for Supermarkets & Spaza'
  },

  // CCTV Surveillance Kits
  {
    id: 'cctv-4cam-hd-kit',
    name: 'Hikvision 4-Camera HD Surveillance Kit',
    category: 'cctv',
    condition: 'Brand New',
    priceZAR: 3499,
    specs: [
      '4-Channel HD DVR with H.265+ Compression',
      '4x 2MP Weatherproof IR Night Vision Bullet Cameras',
      '1 TB Western Digital Surveillance Hard Drive',
      '100m Coaxial Cable, Connectors & Power Supply',
      'Free Mobile Phone Live Viewing Setup (Hik-Connect)'
    ],
    warranty: '1 Year Hardware Warranty',
    inStock: true,
    highlight: 'Complete DIY / Install Ready'
  },
  {
    id: 'cctv-8cam-commercial-kit',
    name: '8-Channel Commercial Night Vision CCTV Kit',
    category: 'cctv',
    condition: 'Brand New',
    priceZAR: 6200,
    specs: [
      '8-Channel Smart DVR (Remote Phone Streaming)',
      '8x Metal Weatherproof Night Vision Cameras',
      '2 TB High-End Surveillance Hard Drive',
      'Centralized 12V 10A Power Supply Box',
      'On-site installation available in Tzaneen area'
    ],
    warranty: '1 Year Hardware Warranty',
    inStock: true,
    highlight: 'Covers Farms, Warehouses & Shops'
  },

  // Upgrades & Accessories
  {
    id: 'ssd-512gb-upgrade',
    name: '512 GB NVMe / SATA SSD Speed Upgrade Kit',
    category: 'accessory',
    condition: 'Brand New',
    priceZAR: 850,
    specs: [
      'Ultra Fast 550MB/s - 2400MB/s Read Speed',
      'Includes Installation & Windows Setup at Workshop',
      'Breathes 5x Speed into Slow Laptops',
      'Low Power Consumption & Shockproof'
    ],
    warranty: '3 Years Warranty',
    inStock: true,
    highlight: '5x Faster Boot Speed'
  },
  {
    id: 'laptop-ram-8gb-ddr4',
    name: '8 GB DDR4 3200MHz Laptop RAM Module',
    category: 'accessory',
    condition: 'Brand New',
    priceZAR: 450,
    specs: [
      'High-Speed 3200MHz / 2666MHz DDR4',
      'Compatible with Dell, HP, Lenovo, Acer, Asus',
      'Free Fitting & Memory Test at Workshop'
    ],
    warranty: 'Lifetime Warranty',
    inStock: true,
    highlight: 'Instant Multitasking Boost'
  },
  {
    id: 'original-laptop-charger',
    name: 'Original Replacement Laptop Power Adapter',
    category: 'accessory',
    condition: 'Brand New',
    priceZAR: 380,
    specs: [
      'HP (Blue Pin / Big Pin), Dell (Small / Big Pin)',
      'Lenovo (Type-C 65W & Yellow Square Tip)',
      'Surge Protected with 3-Pin SA Wall Cable'
    ],
    warranty: '6 Months Warranty',
    inStock: true,
    highlight: 'Safe Surge-Protected'
  }
];
