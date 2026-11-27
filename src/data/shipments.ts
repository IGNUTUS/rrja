import { images, type ImageAsset } from './images'

/**
 * Shipment portfolio.
 *
 * IMPORTANT: no RRJA shipment projects have been verified yet. Every entry below is an
 * ILLUSTRATIVE photo of a cargo type (Wikimedia Commons), not an RRJA project or client.
 * Titles describe the cargo type only. They are not case studies.
 *
 * To add a real project, supply an RRJA photo and set `illustrative: false`.
 * Fill in `origin`/`destination` only with RRJA's (and its customer's) approval.
 */
export const shipmentCategories = [
  'All Shipments',
  'Heavy Equipment',
  'Industrial Cargo',
  'Container Shipments',
  'Breakbulk',
  'Other Cargo',
] as const
export type ShipmentCategory = Exclude<(typeof shipmentCategories)[number], 'All Shipments'>

export type Shipment = {
  id: string
  title: string
  category: ShipmentCategory
  cargoType: string
  description: string
  image: ImageAsset
  illustrative: boolean
  origin?: string
  destination?: string
  /** layout hint for the editorial grid */
  span?: 'tall' | 'wide'
}

export const shipments: Shipment[] = [
  {
    id: 'heavy-machinery-lowloader',
    title: 'Tracked Machinery on Low-Loader',
    category: 'Heavy Equipment',
    cargoType: 'Construction machinery',
    description: 'Heavy tracked equipment secured on a multi-axle trailer, the kind of cargo that needs careful documentation and handling.',
    image: images.heavyEquipment,
    illustrative: true,
    span: 'wide',
  },
  {
    id: 'container-vessel-quay',
    title: 'Container Vessel at the Quay',
    category: 'Container Shipments',
    cargoType: 'Full container load',
    description: 'A loaded container vessel being worked by quay cranes.',
    image: images.containerShip,
    illustrative: true,
  },
  {
    id: 'steel-coils-wharf',
    title: 'Steel Coils on the Wharf',
    category: 'Breakbulk',
    cargoType: 'Steel coils',
    description: 'Breakbulk steel coils staged for loading, handled piece by piece rather than in containers.',
    image: images.steelCoils,
    illustrative: true,
    span: 'tall',
  },
  {
    id: 'container-yard',
    title: 'Container Yard',
    category: 'Container Shipments',
    cargoType: 'Containerised cargo',
    description: 'Stacked containers in a terminal yard awaiting onward movement.',
    image: images.containerStacks2,
    illustrative: true,
  },
  {
    id: 'mixed-breakbulk',
    title: 'Mixed Breakbulk Cargo',
    category: 'Breakbulk',
    cargoType: 'Coils and stone blocks',
    description: 'Mixed non-containerised cargo on a port quay beside a vessel.',
    image: images.breakbulkCoils,
    illustrative: true,
  },
  {
    id: 'container-lift-truck',
    title: 'Container Haulage',
    category: 'Other Cargo',
    cargoType: 'Inland container transport',
    description: 'A container moved by truck, the final leg for many shipments after release.',
    image: images.containerLiftTruck,
    illustrative: true,
  },
  {
    id: 'industrial-terminal',
    title: 'Industrial Port Operations',
    category: 'Industrial Cargo',
    cargoType: 'Industrial and project cargo',
    description: 'Gantry cranes and terminal equipment along a working quay.',
    image: images.bremerhavenCranes,
    illustrative: true,
    span: 'wide',
  },
  {
    id: 'container-ship-cranes',
    title: 'Ship-to-Shore Operations',
    category: 'Container Shipments',
    cargoType: 'Containerised cargo',
    description: 'A container ship being worked by gantry cranes.',
    image: images.containerShip2,
    illustrative: true,
  },
  {
    id: 'industrial-crane',
    title: 'Heavy-Lift Infrastructure',
    category: 'Industrial Cargo',
    cargoType: 'Port infrastructure',
    description: 'A container crane rising above the quay.',
    image: images.gantryCrane,
    illustrative: true,
    span: 'tall',
  },
  {
    id: 'port-aerial',
    title: 'Container Port from Above',
    category: 'Other Cargo',
    cargoType: 'Port overview',
    description: 'An aerial view of a container port: ships, cranes and container yards.',
    image: images.miamiAerial,
    illustrative: true,
    span: 'wide',
  },
]
