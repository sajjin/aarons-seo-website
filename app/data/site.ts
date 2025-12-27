import type { Project } from './projects';

export interface MenuItem {
  label: string;
  href: string;
  submenu?: Array<{ label: string; href: string }>;
}

export interface Brand {
  name: string;
  image: string;
  href: string;
}

export const NAVIGATION_ITEMS: MenuItem[] = [
  {
    label: 'Accessories',
    href: 'https://boostbarnmotorsports.com/collections/accessories-1',
    submenu: [
      { label: 'Interior', href: 'https://boostbarnmotorsports.com/collections/interior-accessories' },
      { label: 'Exterior', href: 'https://boostbarnmotorsports.com/collections/exterior-accessories' },
      { label: 'Engine Covers', href: 'https://boostbarnmotorsports.com/collections/engine-covers' },
      { label: 'Shift Knobs', href: 'https://boostbarnmotorsports.com/collections/shift-knobs' },
      { label: 'Steering Wheels', href: 'https://boostbarnmotorsports.com/collections/steering-wheels' },
      { label: 'Horn Accessories', href: 'https://boostbarnmotorsports.com/collections/horn-accessories' },
      { label: 'Carbon Accessories', href: 'https://boostbarnmotorsports.com/collections/carbon-accessories' },
    ],
  },
  { label: 'Brake Parts', href: 'https://boostbarnmotorsports.com/collections/brakes-rotors-pads',
    submenu: [
      { label: 'Big Brake Kits', href: 'https://boostbarnmotorsports.com/collections/big-brake-kits' },
      { label: 'Brake Line Kits', href: 'https://boostbarnmotorsports.com/collections/brake-line-kits' },
      { label: 'Brake Master Cylinder', href: 'https://boostbarnmotorsports.com/collections/brake-master-cylinder' },
      { label: 'Brake Pads - Performance', href: 'https://boostbarnmotorsports.com/collections/brake-pads-performance' },
      { label: 'Brake Fluid', href: 'https://boostbarnmotorsports.com/collections/brake-fluid' },
      { label: 'Brake Calipers - Performance', href: 'https://boostbarnmotorsports.com/collections/brake-calipers-perf' },
      { label: 'Brake Kits - Performance Slot', href: 'https://boostbarnmotorsports.com/collections/brake-kits-performance-slot' },
      { label: 'Brake Pads - OEM Replacement', href: 'https://boostbarnmotorsports.com/collections/brake-pads-oe' },
    ],
   },
  { label: 'Drivetrain', href: 'https://boostbarnmotorsports.com/collections/drivetrain',
    submenu: [
      { label: 'Clutch Kits - Multi', href: 'https://boostbarnmotorsports.com/collections/clutch-kits-multi' },
      { label: 'Clutch Kits - Single', href: 'https://boostbarnmotorsports.com/collections/clutch-kits-single' },
      { label: 'Diff Braces', href: 'https://boostbarnmotorsports.com/collections/diff-braces' },
      { label: 'Clutch Lines', href: 'https://boostbarnmotorsports.com/collections/clutch-lines' },
      { label: 'Driveshafts', href: 'https://boostbarnmotorsports.com/collections/driveshafts' },
      { label: 'Flywheels', href: 'https://boostbarnmotorsports.com/collections/flywheels' },
      { label: 'Transmissions', href: 'https://boostbarnmotorsports.com/collections/transmissions' },
      { label: 'Transmission Mounts', href: 'https://boostbarnmotorsports.com/collections/transmission-mounts' },
      { label: 'Wheel Bearings', href: 'https://boostbarnmotorsports.com/collections/wheel-bearings' },
    ],
   },
  { label: 'Engine Parts', href: 'https://boostbarnmotorsports.com/collections/engine-components',
    submenu: [
      { label: 'Engines', href: 'https://boostbarnmotorsports.com/collections/engines' },
      { label: 'Oil Separators', href: 'https://boostbarnmotorsports.com/collections/oil-separators' },
      { label: 'Piston Sets - Forged - 4cy', href: 'https://boostbarnmotorsports.com/collections/piston-sets-forged-4cyl' },
      { label: 'Head Gaskets', href: 'https://boostbarnmotorsports.com/collections/head-gaskets' },
      { label: 'Engine Mounts', href: 'https://boostbarnmotorsports.com/collections/engine-mounts' },
      { label: 'Engine Covers', href: 'https://boostbarnmotorsports.com/collections/engine-covers' },
      { label: 'Head Stud & Bolt Kits', href: 'https://boostbarnmotorsports.com/collections/head-stud-bolt-kits' },
      { label: 'Cooling', href: 'https://boostbarnmotorsports.com/collections/cooling' },
    ],
   },
  { label: 'Exhaust Systems', href: 'https://boostbarnmotorsports.com/collections/exhaust-mufflers-tips',
    submenu: [
      { label: 'Downpipes', href: 'https://boostbarnmotorsports.com/collections/downpipes' },
      { label: 'Catback', href: 'https://boostbarnmotorsports.com/collections/catback' },
      { label: 'Axle Back', href: 'https://boostbarnmotorsports.com/collections/axle-back' },
      { label: 'Headers & Manifolds', href: 'https://boostbarnmotorsports.com/collections/headers-manifolds' },
      { label: 'Turbo Back',href: 'https://boostbarnmotorsports.com/collections/turbo-back' },
      { label: 'Muffler Delete Pipes', href: 'https://boostbarnmotorsports.com/collections/muffler-delete-pipes' },
      { label: 'Exhaust Hangers', href: 'https://boostbarnmotorsports.com/collections/exhaust-hangers' },
      { label: 'Exhaust Hardware', href: 'https://boostbarnmotorsports.com/collections/exhaust-hardware' },
      { label: 'Exhaust Gaskets', href: 'https://boostbarnmotorsports.com/collections/exhaust-gaskets' },
      { label: 'Exhaust Adapters', href: 'https://boostbarnmotorsports.com/collections/exhaust-adapters' },
    ],
   },
  { label: 'Forced Induction', href: 'https://boostbarnmotorsports.com/collections/forced-induction',
    submenu: [
      { label: 'Blow Off Valves', href: 'https://boostbarnmotorsports.com/collections/blow-off-valves' },
      { label: 'Boost Controllers', href: 'https://boostbarnmotorsports.com/collections/boost-controllers' },
      { label: 'Intercooler Kits', href: 'https://boostbarnmotorsports.com/collections/intercooler-kits' },
      { label: 'Turbo Inlets', href: 'https://boostbarnmotorsports.com/collections/turbo-inlets' },
      { label: 'Wastegates',href: 'https://boostbarnmotorsports.com/collections/wastegates' },
      { label: 'Water Meth Kits', href: 'https://boostbarnmotorsports.com/collections/water-meth-kits' },
      { label: 'Nitrous Systems', href: 'https://boostbarnmotorsports.com/collections/nitrous-systems' },
      { label: 'Superchargers', href: 'https://boostbarnmotorsports.com/collections/superchargers' },
      { label: 'Turbochargers', href: 'https://boostbarnmotorsports.com/collections/turbochargers' },
    ],
   },
  { label: 'Fuel Delivery', href: 'https://boostbarnmotorsports.com/collections/fuel-delivery',
    submenu: [
      { label: 'Fuel Injector Sets - 4Cyl', href: 'https://boostbarnmotorsports.com/collections/fuel-injector-sets-4cyl' },
      { label: 'Fuel Pressure Regulators', href: 'https://boostbarnmotorsports.com/collections/fuel-pressure-regulators' },
      { label: 'Fuel Pumps', href: 'https://boostbarnmotorsports.com/collections/fuel-pumps' },
      { label: 'Fuel Rails', href: 'https://boostbarnmotorsports.com/collections/fuel-rails' },
      { label: 'Surge Tanks', href: 'https://boostbarnmotorsports.com/collections/surge-tanks' },
      { label: 'Fuel Systems', href: 'https://boostbarnmotorsports.com/collections/fuel-systems' },
      { label: 'Fuel Pump - External Mounts', href: 'https://boostbarnmotorsports.com/collections/fuel-pump-external-mounts' },
    ],
   },
  { label: 'Suspension', href: 'https://boostbarnmotorsports.com/collections/suspension',
    submenu: [
      { label: 'Air Suspension Kits', href: 'https://boostbarnmotorsports.com/collections/air-suspension-kits' },
      { label: 'Coilovers', href: 'https://boostbarnmotorsports.com/collections/coilovers' },
      { label: 'Chassis Bracing', href: 'https://boostbarnmotorsports.com/collections/chassis-bracing' },
      { label: 'Bushing Kits', href: 'https://boostbarnmotorsports.com/collections/bushing-kits' },
      { label: 'Lowering Springs', href: 'https://boostbarnmotorsports.com/collections/lowering-springs' },
      { label: 'Sway Bars', href: 'https://boostbarnmotorsports.com/collections/sway-bars' },
      { label: 'Control Arms', href: 'https://boostbarnmotorsports.com/collections/control-arms' },
      { label: 'Strut Bars', href: 'https://boostbarnmotorsports.com/collections/strut-bars' },
    ],
   },
  { label: 'Wheel and Tires', href: 'https://boostbarnmotorsports.com/collections/wheel-and-tire-accessories',
    submenu: [
      { label: 'Wheel and Tire Accessories', href: 'https://boostbarnmotorsports.com/collections/wheel-and-tire-accessories' },
      { label: 'Wheels', href: 'https://boostbarnmotorsports.com/collections/wheels' },
      { label: 'All Tires', href: 'https://boostbarnmotorsports.com/collections/tires' },
      { label: 'Winter Tires', href: 'https://boostbarnmotorsports.com/collections/tires-winter' },
      { label: 'All-Season Performance Tires', href: 'https://boostbarnmotorsports.com/collections/tires-perf-all-season' },
      { label: 'Off Road Tires', href: 'https://boostbarnmotorsports.com/collections/tires-off-road' },
      { label: 'Summer Tires', href: 'https://boostbarnmotorsports.com/collections/tires-high-perf-summer' },
    ],
   },
  { label: 'All Products', href: 'https://boost-barn.myshopify.com/collections/all' },
];

export const BRANDS: Brand[] = [
  { name: 'COBB', image: '/assets/img/COBB_170x.avif', href: 'https://boostbarnmotorsports.com/collections/vendors?q=Cobb' },
  {
    name: 'Injector Dynamics',
    image: '/assets/img/Injector_Dynamics_170x.avif',
    href: 'https://boostbarnmotorsports.com/collections/vendors?q=Injector%20Dynamics',
  },
  { name: 'ENKEI', image: '/assets/img/Enkei_170x.avif', href: 'https://boostbarnmotorsports.com/collections/vendors?q=Enkei' },
  {
    name: 'Killer B Motorsport',
    image: '/assets/img/Killer_B_Motorsport_170x.avif',
    href: 'https://boost-barn.myshopify.com/collections/vendors?q=Killer%20B%20Motorsport',
  },
  { name: 'TOYO TIRES', image: '/assets/img/TOYO_170x.avif', href: 'https://boostbarnmotorsports.com/collections/vendors?q=Toyo' },
  { name: 'Haltech', image: '/assets/img/Haltech_170x.avif', href: 'https://boostbarnmotorsports.com/collections/vendors?q=Haltech' },
  { name: 'AEM', image: '/assets/img/AEM_Induction_170x.avif', href: 'https://boostbarnmotorsports.com/collections/vendors?q=AEM' },
  {
    name: 'Grimmspeed',
    image: '/assets/img/GrimmSpeed_170x.avif',
    href: 'https://boostbarnmotorsports.com/collections/vendors?q=GrimmSpeed',
  },
  { name: 'IAG', image: '/assets/img/IAG_Logo_170x.avif', href: 'https://boost-barn.myshopify.com/collections/vendors?q=IAG%20Performance' },
  {
    name: 'Turbosmart',
    image: '/assets/img/Turbosmart_Logo_170x.avif',
    href: 'https://boost-barn.myshopify.com/collections/vendors?q=Turbosmart',
  },
  { name: 'Stoptech', image: '/assets/img/Stoptech_Image_170x.avif', href: 'https://boost-barn.myshopify.com/collections/vendors?q=Stoptech' },
  {
    name: 'Torque solutions',
    image: '/assets/img/Torque_Solution_Logo_170x.avif',
    href: 'https://boost-barn.myshopify.com/collections/vendors?q=Torque%20Solution',
  },
  { name: 'Sparco', image: '/assets/img/Sparco_Logo_16edd7f0-e088-4667-9a22-9e2a281b0abb_170x.avif', href: 'https://boost-barn.myshopify.com/collections/vendors?q=SPARCO' },
  {
    name: 'Rallyarmor',
    image: '/assets/img/Rally_Armour_Logo_170x.avif',
    href: 'https://boost-barn.myshopify.com/collections/vendors?q=Rally%20Armor',
  },
  { name: 'Invidia', image: '/assets/img/Invidia_Logo_170x.avif', href: 'https://boost-barn.myshopify.com/collections/vendors?q=Invidia' },
  {
    name: 'Fortune Auto',
    image: '/assets/img/Capture_bbc89547-597c-4304-9e21-270677934229_170x.avif',
    href: 'https://boost-barn.myshopify.com/collections/vendors?q=Invidia',
  },
];

export const SUSPENSION_PRODUCTS = [
  {
    name: 'Hoodie',
    image: '/assets/img/suspension-placeholder.jpg',
    price: '$2,499.00',
    href: '#',
  },
  {
    name: 'Science World Hoodie',
    image: '/assets/img/suspension-placeholder.jpg',
    price: '$1,299.00',
    href: '#',
  },
  {
    name: 'Japanese Tee Shirt',
    image: '/assets/img/suspension-placeholder.jpg',
    price: '$199.00',
    href: '#',
  },
  {
    name: 'Flat Brim Hat',
    image: '/assets/img/suspension-placeholder.jpg',
    price: '$299.00',
    href: '#',
  },
];

export const SUSPENSION_ITEMS = [
  { title: 'Hoodies', href: '#' },
  { title: 'Zip Up', href: '#' },
  { title: 'Tee Shirts', href: '#' },
  { title: 'Shorts', href: '#' },
  { title: 'Hats', href: '#' },
  { title: 'Toques', href: '#' },
];

export type { Project };