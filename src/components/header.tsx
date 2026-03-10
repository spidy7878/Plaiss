'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { GlassyModal } from './GlassyModal'

type SubItem = { label: string; href: string; isSale?: boolean }
type SubCategory = {
  heading: string
  href: string
  items: SubItem[]
  isHighlight?: boolean
}
type NavItem = { label: string; href: string; sub: SubCategory[] }

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Furniture',
    href: '/furniture/nordic-shelf',
    sub: [
      {
        heading: 'Living Room Furniture',
        href: '/sofas/solsti',
        items: [
          { label: 'Sofas', href: '/sofas/solsti' },
          { label: 'Corner Sofas', href: '/sofas/puffer' },
          {
            label: 'TV Stands & Entertainment Units',
            href: '/furniture/nordic-shelf',
          },
          { label: 'Coffee Tables', href: '/tables/slate' },
          { label: 'End & Side Tables', href: '/tables/pine' },
          { label: 'Armchairs & Accent Chairs', href: '/lounge-chairs/arch' },
          { label: 'Sofa Beds', href: '/sofas/melo' },
          {
            label: 'Living Room Furniture Sale',
            href: '/sofas/haven',
            isSale: true,
          },
        ],
      },
      {
        heading: 'Office Furniture',
        href: '/chairs/lofty',
        items: [
          { label: 'Desks', href: '/furniture/nordic-shelf' },
          { label: 'Bookcases', href: '/storage/stack-bookcase' },
          { label: 'Office Chairs', href: '/chairs/lofty' },
          { label: 'Office Stools', href: '/chairs/float' },
          { label: 'Office Sets', href: '/chairs/lofty' },
          {
            label: 'Office Furniture Sale',
            href: '/chairs/float',
            isSale: true,
          },
        ],
      },
      {
        heading: 'Bedroom Furniture',
        href: '/baby-kids/dreamy-kids-bed',
        items: [
          { label: 'Beds', href: '/baby-kids/dreamy-kids-bed' },
          { label: 'Chest of Drawers', href: '/furniture/nordic-shelf' },
          { label: 'Bedside Tables', href: '/tables/slate' },
          { label: 'Wardrobes', href: '/storage/stack-bookcase' },
          { label: 'Dressing Tables', href: '/tables/pine' },
          { label: 'Mattresses', href: '/textiles-bedding/cloud-duvet-set' },
          { label: 'Daybeds', href: '/sofas/azure' },
          {
            label: 'Bedroom Furniture Sale',
            href: '/sofas/haven',
            isSale: true,
          },
        ],
      },
      {
        heading: 'Hallway Furniture & Storage',
        href: '/storage/stack-bookcase',
        items: [
          { label: 'Console Tables', href: '/tables/slate' },
          { label: 'Cabinets & Chests', href: '/storage/stack-bookcase' },
          { label: 'Coat Racks', href: '/furniture/nordic-shelf' },
          { label: 'Hall Trees', href: '/furniture/nordic-shelf' },
          { label: 'Wall Hooks', href: '/decor/aura-mirror' },
          { label: 'Umbrella Stands', href: '/decor/aura-mirror' },
          {
            label: 'Hallway Furniture & Storage Sale',
            href: '/storage/stack-bookcase',
            isSale: true,
          },
        ],
      },
      {
        heading: 'Kitchen & Dining Furniture',
        href: '/kitchen/prep-kitchen-island',
        items: [
          {
            label: 'Kitchen & Dining Chairs',
            href: '/chairs/lofty',
          },
          {
            label: 'Kitchen & Dining Tables',
            href: '/tables/slate',
          },
          {
            label: 'Kitchen & Dining Room Sets',
            href: '/kitchen/prep-kitchen-island',
          },
          { label: 'Sideboards & Buffets', href: '/storage/stack-bookcase' },
          {
            label: 'Kitchen Island Trolleys',
            href: '/kitchen/prep-kitchen-island',
          },
          { label: 'Display Cabinets', href: '/storage/stack-bookcase' },
          {
            label: 'Bar Stools & Counter Stools',
            href: '/chairs/float',
          },
          {
            label: 'Kitchen & Dining Furniture Sale',
            href: '/kitchen/prep-kitchen-island',
            isSale: true,
          },
        ],
      },
      {
        heading: 'Game Room Furniture',
        href: '/chairs/lofty',
        items: [
          { label: 'Gaming Chairs', href: '/chairs/lofty' },
          { label: 'Gaming Desks', href: '/furniture/nordic-shelf' },
          {
            label: 'Tabletop & Board Games',
            href: '/holiday/festive-tree-set',
          },
          {
            label: 'Game Room Furniture Sale',
            href: '/chairs/float',
            isSale: true,
          },
        ],
      },
      {
        heading: 'New & Featured',
        href: '/lounge-chairs/arch',
        isHighlight: true,
        items: [
          {
            label: 'New-In Accent Chairs',
            href: '/lounge-chairs/arch',
          },
          {
            label: 'New-In Chests of Drawers',
            href: '/furniture/nordic-shelf',
          },
          {
            label: 'New-In Dining Chairs',
            href: '/chairs/lofty',
          },
        ],
      },
      {
        heading: 'Trending Now',
        href: '/sofas/drift',
        isHighlight: true,
        items: [
          {
            label: 'Corner Sofas In Your Style',
            href: '/sofas/drift',
          },
          { label: 'Beds: Best Picks', href: '/baby-kids/dreamy-kids-bed' },
          { label: 'Top Rated Desks', href: '/furniture/nordic-shelf' },
        ],
      },
    ],
  },
  {
    label: 'Outdoor',
    href: '/outdoor/eden-lounger',
    sub: [
      {
        heading: 'Outdoor Furniture',
        href: '/outdoor/eden-lounger',
        items: [
          { label: 'Outdoor Seating', href: '/outdoor/eden-lounger' },
          { label: 'Patio Dining Sets', href: '/outdoor/eden-lounger' },
          { label: 'Outdoor Tables', href: '/tables/slate' },
          { label: 'Garden Chairs', href: '/outdoor/eden-lounger' },
          { label: 'Hammocks', href: '/outdoor/eden-lounger' },
          {
            label: 'Outdoor Furniture Sale',
            href: '/outdoor/eden-lounger',
            isSale: true,
          },
        ],
      },
      {
        heading: 'Outdoor Decor',
        href: '/decor/aura-mirror',
        items: [
          { label: 'Outdoor Lighting', href: '/lighting/lumina-pendant' },
          { label: 'Planters & Pots', href: '/decor/aura-mirror' },
          { label: 'Garden Statues', href: '/decor/aura-mirror' },
          { label: 'Outdoor Rugs', href: '/rugs/terra-rug' },
          {
            label: 'Outdoor Decor Sale',
            href: '/decor/aura-mirror',
            isSale: true,
          },
        ],
      },
      {
        heading: 'Outdoor Structures',
        href: '/outdoor/eden-lounger',
        items: [
          { label: 'Gazebos', href: '/outdoor/eden-lounger' },
          { label: 'Pergolas', href: '/outdoor/eden-lounger' },
          { label: 'Outdoor Shades & Canopies', href: '/outdoor/eden-lounger' },
          { label: 'Greenhouses', href: '/outdoor/eden-lounger' },
        ],
      },
      {
        heading: 'Grills & Outdoor Cooking',
        href: '/outdoor/eden-lounger',
        items: [
          { label: 'Gas Grills', href: '/outdoor/eden-lounger' },
          { label: 'Charcoal Grills', href: '/outdoor/eden-lounger' },
          { label: 'Fire Pits', href: '/outdoor/eden-lounger' },
          { label: 'Pizza Ovens', href: '/outdoor/eden-lounger' },
        ],
      },
      {
        heading: 'Trending Now',
        href: '/outdoor/eden-lounger',
        isHighlight: true,
        items: [
          {
            label: 'Best Selling Patio Sets',
            href: '/outdoor/eden-lounger',
          },
          { label: 'Top Rated Fire Pits', href: '/outdoor/eden-lounger' },
        ],
      },
    ],
  },
  {
    label: 'Plants',
    href: '/plants/terra-fern',
    sub: [
      {
        heading: 'Indoor Plants',
        href: '/plants/terra-fern',
        items: [
          { label: 'Low Light Plants', href: '/plants/terra-fern' },
          { label: 'Small Desk Plants', href: '/plants/lumi-cactus' },
          { label: 'Large Statement Plants', href: '/plants/monstera-luxe' },
          { label: 'Succulents & Cacti', href: '/plants/lumi-cactus' },
          { label: 'Hanging Plants', href: '/plants/string-pearl' },
        ],
      },
      {
        heading: 'Pet Safe Plants',
        href: '/plants/zz-shield',
        items: [
          { label: 'Non-Toxic Houseplants', href: '/plants/zz-shield' },
          { label: 'Cat-Friendly Plants', href: '/plants/zz-shield' },
          { label: 'Dog-Friendly Plants', href: '/plants/zz-shield' },
        ],
      },
      {
        heading: 'Planters & Pots',
        href: '/plants/clay-planter',
        items: [
          { label: 'Ceramic Planters', href: '/plants/clay-planter' },
          { label: 'Hanging Planters', href: '/plants/string-pearl' },
          { label: 'Self-Watering Pots', href: '/plants/clay-planter' },
          { label: 'Plant Stands', href: '/plants/monstera-luxe' },
        ],
      },
      {
        heading: 'Plant Care',
        href: '/plants/terra-fern',
        items: [
          { label: 'Soil & Fertiliser', href: '/plants/terra-fern' },
          { label: 'Watering Accessories', href: '/plants/terra-fern' },
          { label: 'Grow Lights', href: '/plants/lumi-cactus' },
        ],
      },
    ],
  },
  {
    label: 'Lighting',
    href: '/lighting/lumina-pendant',
    sub: [
      {
        heading: 'Ceiling Lighting',
        href: '/lighting/lumina-pendant',
        items: [
          { label: 'Chandeliers', href: '/lighting/lumina-pendant' },
          { label: 'Pendant Lights', href: '/lighting/lumina-pendant' },
          { label: 'Flush Mount Lights', href: '/lighting/lumina-pendant' },
          { label: 'Track Lighting', href: '/lighting/lumina-pendant' },
          {
            label: 'Ceiling Lighting Sale',
            href: '/lighting/lumina-pendant',
            isSale: true,
          },
        ],
      },
      {
        heading: 'Floor & Table Lamps',
        href: '/lighting/lumina-pendant',
        items: [
          { label: 'Floor Lamps', href: '/lighting/lumina-pendant' },
          { label: 'Table Lamps', href: '/lighting/lumina-pendant' },
          { label: 'Desk Lamps', href: '/lighting/lumina-pendant' },
          {
            label: 'Lamps Sale',
            href: '/lighting/lumina-pendant',
            isSale: true,
          },
        ],
      },
      {
        heading: 'Wall Lighting',
        href: '/lighting/lumina-pendant',
        items: [
          { label: 'Wall Sconces', href: '/lighting/lumina-pendant' },
          { label: 'Vanity Lights', href: '/lighting/lumina-pendant' },
          { label: 'Picture Lights', href: '/lighting/lumina-pendant' },
        ],
      },
      {
        heading: 'Outdoor Lighting',
        href: '/lighting/lumina-pendant',
        items: [
          { label: 'Outdoor Wall Lights', href: '/lighting/lumina-pendant' },
          { label: 'Landscape Lighting', href: '/lighting/lumina-pendant' },
          { label: 'Post Lights', href: '/lighting/lumina-pendant' },
          { label: 'String Lights', href: '/lighting/lumina-pendant' },
        ],
      },
      {
        heading: 'Trending Now',
        href: '/lighting/lumina-pendant',
        isHighlight: true,
        items: [
          {
            label: 'Best Selling Chandeliers',
            href: '/lighting/lumina-pendant',
          },
          {
            label: 'Modern Pendant Lights',
            href: '/lighting/lumina-pendant',
          },
        ],
      },
    ],
  },
  {
    label: 'Decor',
    href: '/decor/aura-mirror',
    sub: [
      {
        heading: 'Wall Decor',
        href: '/decor/aura-mirror',
        items: [
          { label: 'Wall Art', href: '/decor/aura-mirror' },
          { label: 'Mirrors', href: '/decor/aura-mirror' },
          { label: 'Clocks', href: '/decor/aura-mirror' },
          { label: 'Wall Shelves', href: '/furniture/nordic-shelf' },
          {
            label: 'Wall Decor Sale',
            href: '/decor/aura-mirror',
            isSale: true,
          },
        ],
      },
      {
        heading: 'Home Accents',
        href: '/decor/aura-mirror',
        items: [
          { label: 'Vases', href: '/decor/aura-mirror' },
          { label: 'Candles & Holders', href: '/decor/aura-mirror' },
          { label: 'Decorative Bowls & Trays', href: '/decor/aura-mirror' },
          { label: 'Sculptures & Figurines', href: '/decor/aura-mirror' },
          { label: 'Bookends', href: '/decor/aura-mirror' },
        ],
      },
      {
        heading: 'Window Treatments',
        href: '/textiles-bedding/cloud-duvet-set',
        items: [
          {
            label: 'Curtains & Drapes',
            href: '/textiles-bedding/cloud-duvet-set',
          },
          {
            label: 'Blinds & Shades',
            href: '/textiles-bedding/cloud-duvet-set',
          },
          { label: 'Curtain Rods', href: '/textiles-bedding/cloud-duvet-set' },
          { label: 'Valances', href: '/textiles-bedding/cloud-duvet-set' },
        ],
      },
      {
        heading: 'Pillows & Throws',
        href: '/textiles-bedding/cloud-duvet-set',
        items: [
          { label: 'Throw Pillows', href: '/textiles-bedding/cloud-duvet-set' },
          {
            label: 'Throw Blankets',
            href: '/textiles-bedding/cloud-duvet-set',
          },
          { label: 'Pillow Covers', href: '/textiles-bedding/cloud-duvet-set' },
        ],
      },
      {
        heading: 'Trending Now',
        href: '/decor/aura-mirror',
        isHighlight: true,
        items: [
          { label: 'Minimalist Decor', href: '/decor/aura-mirror' },
          { label: 'Boho Style', href: '/decor/aura-mirror' },
        ],
      },
    ],
  },
  {
    label: 'Textiles & Bedding',
    href: '/textiles-bedding/cloud-duvet-set',
    sub: [
      {
        heading: 'Bedding',
        href: '/textiles-bedding/cloud-duvet-set',
        items: [
          { label: 'Duvet Covers', href: '/textiles-bedding/cloud-duvet-set' },
          {
            label: 'Comforters & Sets',
            href: '/textiles-bedding/cloud-duvet-set',
          },
          { label: 'Bed Sheets', href: '/textiles-bedding/cloud-duvet-set' },
          {
            label: 'Quilts & Coverlets',
            href: '/textiles-bedding/cloud-duvet-set',
          },
          { label: 'Pillows', href: '/textiles-bedding/cloud-duvet-set' },
          {
            label: 'Bedding Sale',
            href: '/textiles-bedding/cloud-duvet-set',
            isSale: true,
          },
        ],
      },
      {
        heading: 'Bath Textiles',
        href: '/textiles-bedding/cloud-duvet-set',
        items: [
          { label: 'Bath Towels', href: '/textiles-bedding/cloud-duvet-set' },
          { label: 'Bath Mats', href: '/textiles-bedding/cloud-duvet-set' },
          {
            label: 'Shower Curtains',
            href: '/textiles-bedding/cloud-duvet-set',
          },
          { label: 'Bathrobes', href: '/textiles-bedding/cloud-duvet-set' },
        ],
      },
      {
        heading: 'Curtains & Drapes',
        href: '/textiles-bedding/cloud-duvet-set',
        items: [
          {
            label: 'Blackout Curtains',
            href: '/textiles-bedding/cloud-duvet-set',
          },
          {
            label: 'Sheer Curtains',
            href: '/textiles-bedding/cloud-duvet-set',
          },
          {
            label: 'Curtain Panels',
            href: '/textiles-bedding/cloud-duvet-set',
          },
        ],
      },
      {
        heading: 'Trending Now',
        href: '/textiles-bedding/cloud-duvet-set',
        isHighlight: true,
        items: [
          {
            label: 'Linen Bedding Sets',
            href: '/textiles-bedding/cloud-duvet-set',
          },
          {
            label: 'Organic Cotton Sheets',
            href: '/textiles-bedding/cloud-duvet-set',
          },
        ],
      },
    ],
  },
  {
    label: 'Rugs',
    href: '/rugs/terra-rug',
    sub: [
      {
        heading: 'Rugs by Type',
        href: '/rugs/terra-rug',
        items: [
          { label: 'Area Rugs', href: '/rugs/terra-rug' },
          { label: 'Runner Rugs', href: '/rugs/terra-rug' },
          { label: 'Round Rugs', href: '/rugs/terra-rug' },
          { label: 'Outdoor Rugs', href: '/rugs/terra-rug' },
          { label: 'Rug Pads', href: '/rugs/terra-rug' },
          { label: 'Rugs Sale', href: '/rugs/terra-rug', isSale: true },
        ],
      },
      {
        heading: 'Rugs by Room',
        href: '/rugs/terra-rug',
        items: [
          { label: 'Living Room Rugs', href: '/rugs/terra-rug' },
          { label: 'Bedroom Rugs', href: '/rugs/terra-rug' },
          { label: 'Kitchen Rugs', href: '/rugs/terra-rug' },
          { label: 'Bathroom Rugs', href: '/rugs/terra-rug' },
          { label: 'Entryway Rugs', href: '/rugs/terra-rug' },
        ],
      },
      {
        heading: 'Rugs by Style',
        href: '/rugs/terra-rug',
        items: [
          { label: 'Modern Rugs', href: '/rugs/terra-rug' },
          { label: 'Traditional Rugs', href: '/rugs/terra-rug' },
          { label: 'Bohemian Rugs', href: '/rugs/terra-rug' },
          { label: 'Farmhouse Rugs', href: '/rugs/terra-rug' },
        ],
      },
      {
        heading: 'Trending Now',
        href: '/rugs/terra-rug',
        isHighlight: true,
        items: [
          { label: 'Washable Rugs', href: '/rugs/terra-rug' },
          { label: 'Natural Fiber Rugs', href: '/rugs/terra-rug' },
        ],
      },
    ],
  },
  {
    label: 'Kitchen',
    href: '/kitchen/prep-kitchen-island',
    sub: [
      {
        heading: 'Kitchen Furniture',
        href: '/kitchen/prep-kitchen-island',
        items: [
          {
            label: 'Kitchen Islands & Carts',
            href: '/kitchen/prep-kitchen-island',
          },
          { label: 'Kitchen & Dining Tables', href: '/tables/slate' },
          { label: 'Bar Stools', href: '/chairs/float' },
          { label: 'Kitchen Cabinets', href: '/storage/stack-bookcase' },
          {
            label: 'Kitchen Furniture Sale',
            href: '/kitchen/prep-kitchen-island',
            isSale: true,
          },
        ],
      },
      {
        heading: 'Kitchen Storage',
        href: '/kitchen/prep-kitchen-island',
        items: [
          { label: 'Pantry Organisers', href: '/storage/stack-bookcase' },
          { label: 'Spice Racks', href: '/kitchen/prep-kitchen-island' },
          { label: 'Kitchen Shelving', href: '/furniture/nordic-shelf' },
          { label: 'Pot Racks', href: '/kitchen/prep-kitchen-island' },
        ],
      },
      {
        heading: 'Cookware & Bakeware',
        href: '/kitchen/prep-kitchen-island',
        items: [
          { label: 'Pots & Pans', href: '/kitchen/prep-kitchen-island' },
          {
            label: 'Baking Sheets & Moulds',
            href: '/kitchen/prep-kitchen-island',
          },
          { label: 'Cookware Sets', href: '/kitchen/prep-kitchen-island' },
        ],
      },
      {
        heading: 'Dining & Entertaining',
        href: '/kitchen/prep-kitchen-island',
        items: [
          { label: 'Dinnerware Sets', href: '/kitchen/prep-kitchen-island' },
          { label: 'Glassware', href: '/kitchen/prep-kitchen-island' },
          { label: 'Cutlery Sets', href: '/kitchen/prep-kitchen-island' },
          { label: 'Serveware', href: '/kitchen/prep-kitchen-island' },
        ],
      },
      {
        heading: 'Trending Now',
        href: '/kitchen/prep-kitchen-island',
        isHighlight: true,
        items: [
          {
            label: 'Top Rated Kitchen Islands',
            href: '/kitchen/prep-kitchen-island',
          },
          {
            label: 'Best Selling Cookware',
            href: '/kitchen/prep-kitchen-island',
          },
        ],
      },
    ],
  },
  {
    label: 'Baby & Kids',
    href: '/baby-kids/dreamy-kids-bed',
    sub: [
      {
        heading: 'Kids Furniture',
        href: '/baby-kids/dreamy-kids-bed',
        items: [
          { label: 'Kids Beds', href: '/baby-kids/dreamy-kids-bed' },
          { label: 'Bunk Beds', href: '/baby-kids/dreamy-kids-bed' },
          { label: 'Kids Desks & Chairs', href: '/chairs/lofty' },
          { label: 'Kids Dressers', href: '/furniture/nordic-shelf' },
          {
            label: 'Kids Furniture Sale',
            href: '/baby-kids/dreamy-kids-bed',
            isSale: true,
          },
        ],
      },
      {
        heading: 'Nursery',
        href: '/baby-kids/dreamy-kids-bed',
        items: [
          { label: 'Cribs', href: '/baby-kids/dreamy-kids-bed' },
          { label: 'Changing Tables', href: '/tables/pine' },
          { label: 'Gliders & Rocking Chairs', href: '/lounge-chairs/nest' },
          { label: 'Nursery Decor', href: '/decor/aura-mirror' },
        ],
      },
      {
        heading: 'Kids Bedding',
        href: '/textiles-bedding/cloud-duvet-set',
        items: [
          {
            label: 'Kids Duvet Covers',
            href: '/textiles-bedding/cloud-duvet-set',
          },
          {
            label: 'Kids Comforters',
            href: '/textiles-bedding/cloud-duvet-set',
          },
          { label: 'Kids Sheets', href: '/textiles-bedding/cloud-duvet-set' },
        ],
      },
      {
        heading: 'Playroom',
        href: '/baby-kids/dreamy-kids-bed',
        items: [
          { label: 'Toy Storage', href: '/storage/stack-bookcase' },
          { label: 'Play Tents', href: '/baby-kids/dreamy-kids-bed' },
          { label: 'Kids Rugs', href: '/rugs/terra-rug' },
          { label: 'Kids Wall Decor', href: '/decor/aura-mirror' },
        ],
      },
    ],
  },
  {
    label: 'Home Improvement',
    href: '/home-improvement/plank-floor-tile',
    sub: [
      {
        heading: 'Flooring',
        href: '/home-improvement/plank-floor-tile',
        items: [
          {
            label: 'Vinyl Flooring',
            href: '/home-improvement/plank-floor-tile',
          },
          {
            label: 'Laminate Flooring',
            href: '/home-improvement/plank-floor-tile',
          },
          {
            label: 'Hardwood Flooring',
            href: '/home-improvement/plank-floor-tile',
          },
          { label: 'Floor Tiles', href: '/home-improvement/plank-floor-tile' },
        ],
      },
      {
        heading: 'Doors & Windows',
        href: '/home-improvement/plank-floor-tile',
        items: [
          {
            label: 'Interior Doors',
            href: '/home-improvement/plank-floor-tile',
          },
          { label: 'Front Doors', href: '/home-improvement/plank-floor-tile' },
          {
            label: 'Door Hardware',
            href: '/home-improvement/plank-floor-tile',
          },
          {
            label: 'Window Treatments',
            href: '/textiles-bedding/cloud-duvet-set',
          },
        ],
      },
      {
        heading: 'Bathroom',
        href: '/home-improvement/plank-floor-tile',
        items: [
          { label: 'Vanities', href: '/home-improvement/plank-floor-tile' },
          { label: 'Toilets', href: '/home-improvement/plank-floor-tile' },
          {
            label: 'Bathroom Faucets',
            href: '/home-improvement/plank-floor-tile',
          },
          { label: 'Shower Doors', href: '/home-improvement/plank-floor-tile' },
        ],
      },
      {
        heading: 'Kitchen Renovation',
        href: '/kitchen/prep-kitchen-island',
        items: [
          {
            label: 'Kitchen Faucets',
            href: '/kitchen/prep-kitchen-island',
          },
          { label: 'Kitchen Sinks', href: '/kitchen/prep-kitchen-island' },
          {
            label: 'Backsplash Tiles',
            href: '/home-improvement/plank-floor-tile',
          },
          { label: 'Countertops', href: '/home-improvement/plank-floor-tile' },
        ],
      },
    ],
  },
  {
    label: 'Shop by Room',
    href: '/shop-by-room/living-room-bundle',
    sub: [
      {
        heading: 'Living Room',
        href: '/shop-by-room/living-room-bundle',
        items: [
          {
            label: 'Living Room Furniture',
            href: '/sofas/solsti',
          },
          {
            label: 'Living Room Decor',
            href: '/decor/aura-mirror',
          },
          {
            label: 'Living Room Lighting',
            href: '/lighting/lumina-pendant',
          },
          { label: 'Living Room Rugs', href: '/rugs/terra-rug' },
        ],
      },
      {
        heading: 'Bedroom',
        href: '/baby-kids/dreamy-kids-bed',
        items: [
          {
            label: 'Bedroom Furniture',
            href: '/baby-kids/dreamy-kids-bed',
          },
          {
            label: 'Bedroom Bedding',
            href: '/textiles-bedding/cloud-duvet-set',
          },
          { label: 'Bedroom Lighting', href: '/lighting/lumina-pendant' },
          { label: 'Bedroom Decor', href: '/decor/aura-mirror' },
        ],
      },
      {
        heading: 'Kitchen & Dining',
        href: '/kitchen/prep-kitchen-island',
        items: [
          {
            label: 'Kitchen Furniture',
            href: '/kitchen/prep-kitchen-island',
          },
          { label: 'Kitchen Storage', href: '/storage/stack-bookcase' },
          {
            label: 'Dining Room Furniture',
            href: '/tables/slate',
          },
          { label: 'Kitchen Decor', href: '/decor/aura-mirror' },
        ],
      },
      {
        heading: 'Bathroom',
        href: '/home-improvement/plank-floor-tile',
        items: [
          {
            label: 'Bathroom Furniture',
            href: '/home-improvement/plank-floor-tile',
          },
          { label: 'Bath Textiles', href: '/textiles-bedding/cloud-duvet-set' },
          { label: 'Bathroom Decor', href: '/decor/aura-mirror' },
          {
            label: 'Bathroom Lighting',
            href: '/lighting/lumina-pendant',
          },
        ],
      },
      {
        heading: 'Home Office',
        href: '/chairs/lofty',
        items: [
          { label: 'Office Desks', href: '/furniture/nordic-shelf' },
          { label: 'Office Chairs', href: '/chairs/lofty' },
          { label: 'Office Storage', href: '/storage/stack-bookcase' },
          { label: 'Office Decor', href: '/decor/aura-mirror' },
        ],
      },
    ],
  },
]

export function Header() {
  const [navState, setNavState] = useState<'top' | 'scrolling' | 'hidden'>(
    'top'
  )
  const pathname = usePathname()
  const [hovered, setHovered] = useState<string | null>(null)
  const headerRef = useRef<HTMLElement>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [headerBottom, setHeaderBottom] = useState<number>(80)
  const [modalOpen, setModalOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)
  // Dropdown close timer
  const closeDropdownTimer = useRef<NodeJS.Timeout | null>(null)

  // Drag-to-scroll handlers
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true
    startX.current = e.pageX - (navRef.current?.offsetLeft ?? 0)
    scrollLeft.current = navRef.current?.scrollLeft ?? 0
    if (navRef.current) navRef.current.style.cursor = 'grabbing'
  }, [])

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || !navRef.current) return
    e.preventDefault()
    const x = e.pageX - navRef.current.offsetLeft
    const walk = (x - startX.current) * 1.5
    navRef.current.scrollLeft = scrollLeft.current - walk
  }, [])

  const onMouseUpOrLeave = useCallback(() => {
    isDragging.current = false
    if (navRef.current) navRef.current.style.cursor = 'grab'
  }, [])

  // Convert vertical wheel scroll to horizontal scroll on the nav
  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const handleWheel = (e: WheelEvent) => {
      if (nav.scrollWidth <= nav.clientWidth) return
      e.preventDefault()
      nav.scrollLeft += e.deltaY || e.deltaX
    }
    nav.addEventListener('wheel', handleWheel, { passive: false })
    return () => nav.removeEventListener('wheel', handleWheel)
  }, [])

  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const heroHeight = window.innerHeight
      const currentScrollY = window.scrollY

      if (currentScrollY <= 0) {
        setNavState('top')
      } else if (currentScrollY < heroHeight * 0.9) {
        setNavState('scrolling')
      } else {
        // If scrolling up, show the header. If scrolling down, hide it.
        if (currentScrollY < lastScrollY) {
          setNavState('scrolling')
        } else {
          setNavState('hidden')
        }
      }

      lastScrollY = currentScrollY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Update header bottom position when a dropdown is shown
  useEffect(() => {
    if (!hovered) return
    const update = () => {
      setHeaderBottom(headerRef.current?.getBoundingClientRect().bottom ?? 80)
    }
    update()
    window.addEventListener('resize', update)
    window.addEventListener('scroll', update, { passive: true })
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('scroll', update)
    }
  }, [hovered])

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 transition-all duration-500 ease-in-out
          ${
            navState === 'hidden'
              ? 'opacity-0 -translate-y-3 pointer-events-none'
              : 'opacity-100 translate-y-0'
          }
          ${
            navState === 'scrolling'
              ? 'backdrop-blur-md bg-white/10 shadow-[0_4px_30px_rgba(255,255,255,0.08)]'
              : 'bg-transparent'
          }
        `}
      >
        {/* Logo */}
        <div className="relative flex items-center shrink-0">
          {pathname === '/' ? (
            <img
              src="/images/logo3.png"
              alt="Plaiss Logo"
              className="h-10 w-auto object-contain"
              style={{ maxHeight: '2.5rem' }}
            />
          ) : (
            <Link href="/">
              <img
                src="/images/logo3.png"
                alt="Plaiss Logo"
                className="h-10 w-auto object-contain cursor-pointer hover:scale-105 transition-transform"
                style={{ maxHeight: '2.5rem' }}
              />
            </Link>
          )}
        </div>

        {/* Desktop Navigation */}
        <nav className="relative flex-1 min-w-0 hidden lg:flex mx-8 xl:mx-12">
          <div
            ref={navRef}
            className="flex-1 overflow-x-auto scrollbar-hide cursor-grab select-none"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              maskImage:
                'linear-gradient(to right, transparent, black 24px, black calc(100% - 24px), transparent)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent, black 24px, black calc(100% - 24px), transparent)',
            }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUpOrLeave}
            onMouseLeave={onMouseUpOrLeave}
          >
            <div className="flex items-center gap-5 xl:gap-7 text-sm font-normal text-black/90 whitespace-nowrap px-6">
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="relative flex flex-col items-center shrink-0"
                  onMouseEnter={() => {
                    if (closeDropdownTimer.current) {
                      clearTimeout(closeDropdownTimer.current)
                    }
                    setHovered(item.label)
                  }}
                  onMouseLeave={() => {
                    // Delay closing to allow mouse to enter dropdown
                    closeDropdownTimer.current = setTimeout(() => {
                      setHovered(null)
                    }, 120)
                  }}
                >
                  <Link
                    href={item.href}
                    className={`relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full hover:text-black transition-colors px-2 py-1 whitespace-nowrap ${
                      hovered === item.label ? 'text-blue-600' : ''
                    }`}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </nav>

        {/* Mega Menu Dropdown Portal */}
        {hovered &&
          (() => {
            const activeItem = NAV_ITEMS.find((i) => i.label === hovered)
            if (!activeItem || activeItem.sub.length === 0) return null
            return createPortal(
              <div
                className="fixed left-0 right-0 z-9999 bg-white border-t border-gray-100 shadow-lg max-h-[calc(100vh-80px)] overflow-y-auto"
                style={{ top: headerBottom }}
                onMouseEnter={() => {
                  if (closeDropdownTimer.current) {
                    clearTimeout(closeDropdownTimer.current)
                  }
                }}
                onMouseLeave={() => {
                  closeDropdownTimer.current = setTimeout(() => {
                    setHovered(null)
                  }, 120)
                }}
              >
                <div className="max-w-350 mx-auto px-8 py-8">
                  <div
                    className="grid gap-x-8 gap-y-6"
                    style={{
                      gridTemplateColumns:
                        'repeat(auto-fill, minmax(200px, 1fr))',
                    }}
                  >
                    {activeItem.sub.map((category) => (
                      <div key={category.heading}>
                        <Link
                          href={category.href}
                          onClick={() => setHovered(null)}
                          className={`text-sm font-semibold mb-3 flex items-center gap-1 transition-colors ${
                            category.isHighlight
                              ? 'text-black-700 hover:text-black-800'
                              : 'text-black-700 hover:text-black-800'
                          }`}
                        >
                          {category.heading}
                          <span className="text-xs">›</span>
                        </Link>
                        {category.items.length > 0 && (
                          <div className="flex flex-col gap-1">
                            {category.items.map((subItem) => (
                              <Link
                                key={subItem.label}
                                href={subItem.href}
                                onClick={() => setHovered(null)}
                                className={`text-sm py-0.5 transition-colors ${
                                  subItem.isSale
                                    ? 'text-black-700 hover:text-black-800'
                                    : 'text-black-700 hover:text-black-800'
                                }`}
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>,
              document.body
            )
          })()}

        {/* Right side: Shop + Hamburger */}
        <div className="relative flex items-center gap-4 shrink-0">
          <button
            className="bg-black text-white px-6 md:px-8 py-2.5 rounded-full text-sm font-semibold tracking-wide hover:bg-lime-300 hover:text-black hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg"
            onClick={() => setModalOpen(true)}
          >
            Register
          </button>

          {/* Hamburger – mobile only */}
          <button
            className="lg:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-6 bg-black transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}
            />
            <span
              className={`block h-0.5 w-6 bg-black transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block h-0.5 w-6 bg-black transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}
            />
          </button>
          {/* Glassy Modal */}
          <GlassyModal open={modalOpen} onClose={() => setModalOpen(false)} />
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-white flex flex-col pt-20 px-6 sm:px-8 pb-8 lg:hidden overflow-y-auto transition-all duration-300 ease-in-out ${
          mobileOpen
            ? 'opacity-100 translate-x-0 pointer-events-auto'
            : 'opacity-0 translate-x-full pointer-events-none'
        }`}
      >
        {/* Close button */}
        <button
          className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          <span className="block h-0.5 w-6 bg-black rotate-45 absolute" />
          <span className="block h-0.5 w-6 bg-black -rotate-45 absolute" />
        </button>

        <nav className="flex flex-col gap-1 mt-4">
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className="flex flex-col">
              <Link
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-normal text-black/90 hover:text-black px-3 py-3 border-b border-black/5 transition-colors"
              >
                {item.label}
              </Link>
              {item.sub.length > 0 && (
                <div className="flex flex-col pl-6 bg-black/2">
                  {item.sub.map((cat) => (
                    <Link
                      key={cat.heading}
                      href={cat.href}
                      onClick={() => setMobileOpen(false)}
                      className={`text-sm font-normal px-3 py-2.5 border-b border-black/5 transition-colors ${
                        cat.isHighlight
                          ? 'text-black-700 hover:text-black-800'
                          : 'text-black/60 hover:text-black'
                      }`}
                    >
                      {cat.heading}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Shop button */}
        <div className="mt-8 px-3">
          <button className="w-full bg-black text-white py-3 rounded-full text-sm font-semibold tracking-wide hover:bg-lime-300 hover:text-black transition-all duration-200">
            Shop
          </button>
        </div>
      </div>
    </>
  )
}
