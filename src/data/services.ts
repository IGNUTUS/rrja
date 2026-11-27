import type { LucideIcon } from 'lucide-react'
import { Anchor, Boxes, FileCheck2, FileInput, FileOutput, Layers, Truck } from 'lucide-react'
import { images, type ImageAsset } from './images'

/**
 * Services.
 * status 'verified' -> confirmed from a public RRJA source (only "Customs Brokerage", from the business name).
 * status 'pending'  -> a proposed service from the project brief. RRJA must confirm it before launch.
 *                      Remove any service RRJA does not offer.
 *
 * All descriptions are DRAFT marketing copy for client review. They make no claims about
 * licences, accreditations, volumes or turnaround times.
 */
export type Service = {
  slug: string
  title: string
  short: string
  description: string
  benefits: string[]
  icon: LucideIcon
  image: ImageAsset
  status: 'verified' | 'pending'
  /** Value pre-selected in the contact form "Shipment Type" field */
  inquiryType: ShipmentType
}

export const shipmentTypes = ['Import', 'Export', 'Customs Brokerage', 'Heavy Equipment', 'LCL Cargo', 'Other'] as const
export type ShipmentType = (typeof shipmentTypes)[number]

export const services: Service[] = [
  {
    slug: 'customs-brokerage',
    title: 'Customs Brokerage',
    short: 'Hands-on handling of the customs requirements behind your import and export shipments.',
    description:
      'Customs brokerage is at the heart of what we do. We work with you to prepare and organise the documents your shipment needs, keep track of each requirement, and coordinate the customs process so that your cargo can move on with as little friction as possible.',
    benefits: [
      'One point of contact for your customs requirements',
      'Careful review of shipment documents',
      'Clear, regular updates on your shipment status',
      'Guidance on what your cargo type requires',
    ],
    icon: FileCheck2,
    image: images.portCebu,
    status: 'verified',
    inquiryType: 'Customs Brokerage',
  },
  {
    slug: 'import-processing',
    title: 'Import Documentation & Processing',
    short: 'Support in preparing and organising the paperwork your incoming cargo needs.',
    description:
      'Importing involves invoices, packing lists, shipping documents and other requirements that need to line up. We help you gather, check and organise this documentation and coordinate the processing of your import shipment.',
    benefits: [
      'Document checklist tailored to your shipment',
      'Early flagging of missing or inconsistent details',
      'Coordination through to cargo release',
    ],
    icon: FileInput,
    image: images.containerShip,
    status: 'pending',
    inquiryType: 'Import',
  },
  {
    slug: 'export-processing',
    title: 'Export Documentation & Processing',
    short: 'Getting your outbound shipment documents organised and ready.',
    description:
      'For businesses shipping goods out, we assist with preparing and organising export documentation and coordinating the processing steps, so that your cargo is ready to move when it needs to.',
    benefits: [
      'Organised, complete export paperwork',
      'Coordination with your shipping arrangements',
      'Practical guidance for first-time exporters',
    ],
    icon: FileOutput,
    image: images.containerStacks,
    status: 'pending',
    inquiryType: 'Export',
  },
  {
    slug: 'clearance-coordination',
    title: 'Customs Clearance Coordination',
    short: 'Keeping the clearance process for your cargo moving and transparent.',
    description:
      'We follow your shipment through the customs clearance process and coordinate with the parties involved. You know where things stand and what is needed next.',
    benefits: [
      'Proactive follow-through at each stage',
      'Single channel for questions and updates',
      'Fewer surprises at the port',
    ],
    icon: Anchor,
    image: images.davaoCranes,
    status: 'pending',
    inquiryType: 'Customs Brokerage',
  },
  {
    slug: 'lcl-coordination',
    title: 'LCL Cargo Coordination',
    short: 'Coordination for less-than-container-load shipments and consolidated cargo.',
    description:
      'Not every shipment fills a container. For less-than-container-load (LCL) cargo, we help coordinate the documentation and customs requirements that apply when your goods travel alongside other consignments.',
    benefits: [
      'Suited to smaller or mixed shipments',
      'Documentation organised per consignment',
      'Clear communication from arrival to release',
    ],
    icon: Boxes,
    image: images.containerStacks2,
    status: 'pending',
    inquiryType: 'LCL Cargo',
  },
  {
    slug: 'breakbulk',
    title: 'Breakbulk Shipment Coordination',
    short: 'Support for non-containerised cargo such as steel, coils and project materials.',
    description:
      'Breakbulk cargo is loaded and handled piece by piece rather than in containers. We assist with coordinating the customs and documentation requirements of these shipments, which often need extra attention to detail.',
    benefits: [
      'Attention to piece counts and cargo descriptions',
      'Coordination for oversized or irregular cargo',
      'Documentation aligned with handling requirements',
    ],
    icon: Layers,
    image: images.breakbulkCoils,
    status: 'pending',
    inquiryType: 'Other',
  },
  {
    slug: 'heavy-equipment',
    title: 'Heavy Equipment Shipment Coordination',
    short: 'Coordination for machinery, vehicles and other heavy equipment shipments.',
    description:
      'Heavy equipment shipments such as construction machinery and industrial units come with their own documentation and handling considerations. We help coordinate these requirements so your equipment can be released and put to work.',
    benefits: [
      'Guidance on equipment documentation requirements',
      'Coordination with transport arrangements',
      'Close follow-through on high-value cargo',
    ],
    icon: Truck,
    image: images.heavyEquipment,
    status: 'pending',
    inquiryType: 'Heavy Equipment',
  },
]
