'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
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
    href: '/furniture',
    sub: [
      {
        heading: 'Living Room Furniture',
        href: '/furniture/living-room',
        items: [
          { label: 'Sofas', href: '/furniture/sofas' },
          { label: 'Corner Sofas', href: '/furniture/corner-sofas' },
          {
            label: 'TV Stands & Entertainment Units',
            href: '/furniture/tv-stands',
          },
          { label: 'Coffee Tables', href: '/furniture/coffee-tables' },
          { label: 'End & Side Tables', href: '/furniture/side-tables' },
          { label: 'Armchairs & Accent Chairs', href: '/furniture/armchairs' },
          { label: 'Sofa Beds', href: '/furniture/sofa-beds' },
          {
            label: 'Living Room Furniture Sale',
            href: '/furniture/living-room-sale',
            isSale: true,
          },
        ],
      },
      {
        heading: 'Office Furniture',
        href: '/furniture/office',
        items: [
          { label: 'Desks', href: '/furniture/desks' },
          { label: 'Bookcases', href: '/furniture/bookcases' },
          { label: 'Office Chairs', href: '/furniture/office-chairs' },
          { label: 'Office Stools', href: '/furniture/office-stools' },
          { label: 'Office Sets', href: '/furniture/office-sets' },
          {
            label: 'Office Furniture Sale',
            href: '/furniture/office-sale',
            isSale: true,
          },
        ],
      },
      {
        heading: 'Bedroom Furniture',
        href: '/furniture/bedroom',
        items: [
          { label: 'Beds', href: '/furniture/beds' },
          { label: 'Chest of Drawers', href: '/furniture/chest-of-drawers' },
          { label: 'Bedside Tables', href: '/furniture/bedside-tables' },
          { label: 'Wardrobes', href: '/furniture/wardrobes' },
          { label: 'Dressing Tables', href: '/furniture/dressing-tables' },
          { label: 'Mattresses', href: '/furniture/mattresses' },
          { label: 'Daybeds', href: '/furniture/daybeds' },
          {
            label: 'Bedroom Furniture Sale',
            href: '/furniture/bedroom-sale',
            isSale: true,
          },
        ],
      },
      {
        heading: 'Hallway Furniture & Storage',
        href: '/furniture/hallway',
        items: [
          { label: 'Console Tables', href: '/furniture/console-tables' },
          { label: 'Cabinets & Chests', href: '/furniture/cabinets' },
          { label: 'Coat Racks', href: '/furniture/coat-racks' },
          { label: 'Hall Trees', href: '/furniture/hall-trees' },
          { label: 'Wall Hooks', href: '/furniture/wall-hooks' },
          { label: 'Umbrella Stands', href: '/furniture/umbrella-stands' },
          {
            label: 'Hallway Furniture & Storage Sale',
            href: '/furniture/hallway-sale',
            isSale: true,
          },
        ],
      },
      {
        heading: 'Kitchen & Dining Furniture',
        href: '/furniture/kitchen-dining',
        items: [
          {
            label: 'Kitchen & Dining Chairs',
            href: '/furniture/dining-chairs',
          },
          {
            label: 'Kitchen & Dining Tables',
            href: '/furniture/dining-tables',
          },
          {
            label: 'Kitchen & Dining Room Sets',
            href: '/furniture/dining-sets',
          },
          { label: 'Sideboards & Buffets', href: '/furniture/sideboards' },
          {
            label: 'Kitchen Island Trolleys',
            href: '/furniture/kitchen-islands',
          },
          { label: 'Display Cabinets', href: '/furniture/display-cabinets' },
          {
            label: 'Bar Stools & Counter Stools',
            href: '/furniture/bar-stools',
          },
          {
            label: 'Kitchen & Dining Furniture Sale',
            href: '/furniture/kitchen-dining-sale',
            isSale: true,
          },
        ],
      },
      {
        heading: 'Game Room Furniture',
        href: '/furniture/game-room',
        items: [
          { label: 'Gaming Chairs', href: '/furniture/gaming-chairs' },
          { label: 'Gaming Desks', href: '/furniture/gaming-desks' },
          { label: 'Tabletop & Board Games', href: '/furniture/board-games' },
          {
            label: 'Game Room Furniture Sale',
            href: '/furniture/game-room-sale',
            isSale: true,
          },
        ],
      },
      {
        heading: 'New & Featured',
        href: '/furniture/new',
        isHighlight: true,
        items: [
          {
            label: 'New-In Accent Chairs',
            href: '/furniture/new/accent-chairs',
          },
          { label: 'New-In Chests of Drawers', href: '/furniture/new/chests' },
          {
            label: 'New-In Dining Chairs',
            href: '/furniture/new/dining-chairs',
          },
        ],
      },
      {
        heading: 'Trending Now',
        href: '/furniture/trending',
        isHighlight: true,
        items: [
          {
            label: 'Corner Sofas In Your Style',
            href: '/furniture/trending/corner-sofas',
          },
          { label: 'Beds: Best Picks', href: '/furniture/trending/beds' },
          { label: 'Top Rated Desks', href: '/furniture/trending/desks' },
        ],
      },
    ],
  },
  {
    label: 'Outdoor',
    href: '/outdoor',
    sub: [
      {
        heading: 'Outdoor Furniture',
        href: '/outdoor/furniture',
        items: [
          { label: 'Outdoor Seating', href: '/outdoor/seating' },
          { label: 'Patio Dining Sets', href: '/outdoor/dining-sets' },
          { label: 'Outdoor Tables', href: '/outdoor/tables' },
          { label: 'Garden Chairs', href: '/outdoor/chairs' },
          { label: 'Hammocks', href: '/outdoor/hammocks' },
          {
            label: 'Outdoor Furniture Sale',
            href: '/outdoor/furniture-sale',
            isSale: true,
          },
        ],
      },
      {
        heading: 'Outdoor Decor',
        href: '/outdoor/decor',
        items: [
          { label: 'Outdoor Lighting', href: '/outdoor/lighting' },
          { label: 'Planters & Pots', href: '/outdoor/planters' },
          { label: 'Garden Statues', href: '/outdoor/statues' },
          { label: 'Outdoor Rugs', href: '/outdoor/rugs' },
          {
            label: 'Outdoor Decor Sale',
            href: '/outdoor/decor-sale',
            isSale: true,
          },
        ],
      },
      {
        heading: 'Outdoor Structures',
        href: '/outdoor/structures',
        items: [
          { label: 'Gazebos', href: '/outdoor/gazebos' },
          { label: 'Pergolas', href: '/outdoor/pergolas' },
          { label: 'Outdoor Shades & Canopies', href: '/outdoor/shades' },
          { label: 'Greenhouses', href: '/outdoor/greenhouses' },
        ],
      },
      {
        heading: 'Grills & Outdoor Cooking',
        href: '/outdoor/grills',
        items: [
          { label: 'Gas Grills', href: '/outdoor/gas-grills' },
          { label: 'Charcoal Grills', href: '/outdoor/charcoal-grills' },
          { label: 'Fire Pits', href: '/outdoor/fire-pits' },
          { label: 'Pizza Ovens', href: '/outdoor/pizza-ovens' },
        ],
      },
      {
        heading: 'Trending Now',
        href: '/outdoor/trending',
        isHighlight: true,
        items: [
          {
            label: 'Best Selling Patio Sets',
            href: '/outdoor/trending/patio-sets',
          },
          { label: 'Top Rated Fire Pits', href: '/outdoor/trending/fire-pits' },
        ],
      },
    ],
  },
  {
    label: 'Lighting',
    href: '/lighting',
    sub: [
      {
        heading: 'Ceiling Lighting',
        href: '/lighting/ceiling',
        items: [
          { label: 'Chandeliers', href: '/lighting/chandeliers' },
          { label: 'Pendant Lights', href: '/lighting/pendant-lights' },
          { label: 'Flush Mount Lights', href: '/lighting/flush-mount' },
          { label: 'Track Lighting', href: '/lighting/track-lighting' },
          {
            label: 'Ceiling Lighting Sale',
            href: '/lighting/ceiling-sale',
            isSale: true,
          },
        ],
      },
      {
        heading: 'Floor & Table Lamps',
        href: '/lighting/lamps',
        items: [
          { label: 'Floor Lamps', href: '/lighting/floor-lamps' },
          { label: 'Table Lamps', href: '/lighting/table-lamps' },
          { label: 'Desk Lamps', href: '/lighting/desk-lamps' },
          { label: 'Lamps Sale', href: '/lighting/lamps-sale', isSale: true },
        ],
      },
      {
        heading: 'Wall Lighting',
        href: '/lighting/wall',
        items: [
          { label: 'Wall Sconces', href: '/lighting/sconces' },
          { label: 'Vanity Lights', href: '/lighting/vanity-lights' },
          { label: 'Picture Lights', href: '/lighting/picture-lights' },
        ],
      },
      {
        heading: 'Outdoor Lighting',
        href: '/lighting/outdoor',
        items: [
          { label: 'Outdoor Wall Lights', href: '/lighting/outdoor-wall' },
          { label: 'Landscape Lighting', href: '/lighting/landscape' },
          { label: 'Post Lights', href: '/lighting/post-lights' },
          { label: 'String Lights', href: '/lighting/string-lights' },
        ],
      },
      {
        heading: 'Trending Now',
        href: '/lighting/trending',
        isHighlight: true,
        items: [
          {
            label: 'Best Selling Chandeliers',
            href: '/lighting/trending/chandeliers',
          },
          {
            label: 'Modern Pendant Lights',
            href: '/lighting/trending/pendants',
          },
        ],
      },
    ],
  },
  {
    label: 'Decor',
    href: '/decor',
    sub: [
      {
        heading: 'Wall Decor',
        href: '/decor/wall',
        items: [
          { label: 'Wall Art', href: '/decor/wall-art' },
          { label: 'Mirrors', href: '/decor/mirrors' },
          { label: 'Clocks', href: '/decor/clocks' },
          { label: 'Wall Shelves', href: '/decor/wall-shelves' },
          { label: 'Wall Decor Sale', href: '/decor/wall-sale', isSale: true },
        ],
      },
      {
        heading: 'Home Accents',
        href: '/decor/accents',
        items: [
          { label: 'Vases', href: '/decor/vases' },
          { label: 'Candles & Holders', href: '/decor/candles' },
          { label: 'Decorative Bowls & Trays', href: '/decor/bowls-trays' },
          { label: 'Sculptures & Figurines', href: '/decor/sculptures' },
          { label: 'Bookends', href: '/decor/bookends' },
        ],
      },
      {
        heading: 'Window Treatments',
        href: '/decor/window',
        items: [
          { label: 'Curtains & Drapes', href: '/decor/curtains' },
          { label: 'Blinds & Shades', href: '/decor/blinds' },
          { label: 'Curtain Rods', href: '/decor/curtain-rods' },
          { label: 'Valances', href: '/decor/valances' },
        ],
      },
      {
        heading: 'Pillows & Throws',
        href: '/decor/pillows-throws',
        items: [
          { label: 'Throw Pillows', href: '/decor/throw-pillows' },
          { label: 'Throw Blankets', href: '/decor/throw-blankets' },
          { label: 'Pillow Covers', href: '/decor/pillow-covers' },
        ],
      },
      {
        heading: 'Trending Now',
        href: '/decor/trending',
        isHighlight: true,
        items: [
          { label: 'Minimalist Decor', href: '/decor/trending/minimalist' },
          { label: 'Boho Style', href: '/decor/trending/boho' },
        ],
      },
    ],
  },
  {
    label: 'Textiles & Bedding',
    href: '/textiles-bedding',
    sub: [
      {
        heading: 'Bedding',
        href: '/textiles-bedding/bedding',
        items: [
          { label: 'Duvet Covers', href: '/textiles-bedding/duvet-covers' },
          { label: 'Comforters & Sets', href: '/textiles-bedding/comforters' },
          { label: 'Bed Sheets', href: '/textiles-bedding/sheets' },
          { label: 'Quilts & Coverlets', href: '/textiles-bedding/quilts' },
          { label: 'Pillows', href: '/textiles-bedding/pillows' },
          {
            label: 'Bedding Sale',
            href: '/textiles-bedding/bedding-sale',
            isSale: true,
          },
        ],
      },
      {
        heading: 'Bath Textiles',
        href: '/textiles-bedding/bath',
        items: [
          { label: 'Bath Towels', href: '/textiles-bedding/bath-towels' },
          { label: 'Bath Mats', href: '/textiles-bedding/bath-mats' },
          {
            label: 'Shower Curtains',
            href: '/textiles-bedding/shower-curtains',
          },
          { label: 'Bathrobes', href: '/textiles-bedding/bathrobes' },
        ],
      },
      {
        heading: 'Curtains & Drapes',
        href: '/textiles-bedding/curtains',
        items: [
          {
            label: 'Blackout Curtains',
            href: '/textiles-bedding/blackout-curtains',
          },
          { label: 'Sheer Curtains', href: '/textiles-bedding/sheer-curtains' },
          { label: 'Curtain Panels', href: '/textiles-bedding/curtain-panels' },
        ],
      },
      {
        heading: 'Trending Now',
        href: '/textiles-bedding/trending',
        isHighlight: true,
        items: [
          {
            label: 'Linen Bedding Sets',
            href: '/textiles-bedding/trending/linen',
          },
          {
            label: 'Organic Cotton Sheets',
            href: '/textiles-bedding/trending/organic',
          },
        ],
      },
    ],
  },
  {
    label: 'Rugs',
    href: '/rugs',
    sub: [
      {
        heading: 'Rugs by Type',
        href: '/rugs/by-type',
        items: [
          { label: 'Area Rugs', href: '/rugs/area-rugs' },
          { label: 'Runner Rugs', href: '/rugs/runner-rugs' },
          { label: 'Round Rugs', href: '/rugs/round-rugs' },
          { label: 'Outdoor Rugs', href: '/rugs/outdoor-rugs' },
          { label: 'Rug Pads', href: '/rugs/rug-pads' },
          { label: 'Rugs Sale', href: '/rugs/sale', isSale: true },
        ],
      },
      {
        heading: 'Rugs by Room',
        href: '/rugs/by-room',
        items: [
          { label: 'Living Room Rugs', href: '/rugs/living-room' },
          { label: 'Bedroom Rugs', href: '/rugs/bedroom' },
          { label: 'Kitchen Rugs', href: '/rugs/kitchen' },
          { label: 'Bathroom Rugs', href: '/rugs/bathroom' },
          { label: 'Entryway Rugs', href: '/rugs/entryway' },
        ],
      },
      {
        heading: 'Rugs by Style',
        href: '/rugs/by-style',
        items: [
          { label: 'Modern Rugs', href: '/rugs/modern' },
          { label: 'Traditional Rugs', href: '/rugs/traditional' },
          { label: 'Bohemian Rugs', href: '/rugs/bohemian' },
          { label: 'Farmhouse Rugs', href: '/rugs/farmhouse' },
        ],
      },
      {
        heading: 'Trending Now',
        href: '/rugs/trending',
        isHighlight: true,
        items: [
          { label: 'Washable Rugs', href: '/rugs/trending/washable' },
          { label: 'Natural Fiber Rugs', href: '/rugs/trending/natural-fiber' },
        ],
      },
    ],
  },
  {
    label: 'Kitchen',
    href: '/kitchen',
    sub: [
      {
        heading: 'Kitchen Furniture',
        href: '/kitchen/furniture',
        items: [
          { label: 'Kitchen Islands & Carts', href: '/kitchen/islands' },
          { label: 'Kitchen & Dining Tables', href: '/kitchen/tables' },
          { label: 'Bar Stools', href: '/kitchen/bar-stools' },
          { label: 'Kitchen Cabinets', href: '/kitchen/cabinets' },
          {
            label: 'Kitchen Furniture Sale',
            href: '/kitchen/furniture-sale',
            isSale: true,
          },
        ],
      },
      {
        heading: 'Kitchen Storage',
        href: '/kitchen/storage',
        items: [
          { label: 'Pantry Organisers', href: '/kitchen/pantry' },
          { label: 'Spice Racks', href: '/kitchen/spice-racks' },
          { label: 'Kitchen Shelving', href: '/kitchen/shelving' },
          { label: 'Pot Racks', href: '/kitchen/pot-racks' },
        ],
      },
      {
        heading: 'Cookware & Bakeware',
        href: '/kitchen/cookware',
        items: [
          { label: 'Pots & Pans', href: '/kitchen/pots-pans' },
          { label: 'Baking Sheets & Moulds', href: '/kitchen/baking' },
          { label: 'Cookware Sets', href: '/kitchen/cookware-sets' },
        ],
      },
      {
        heading: 'Dining & Entertaining',
        href: '/kitchen/dining',
        items: [
          { label: 'Dinnerware Sets', href: '/kitchen/dinnerware' },
          { label: 'Glassware', href: '/kitchen/glassware' },
          { label: 'Cutlery Sets', href: '/kitchen/cutlery' },
          { label: 'Serveware', href: '/kitchen/serveware' },
        ],
      },
      {
        heading: 'Trending Now',
        href: '/kitchen/trending',
        isHighlight: true,
        items: [
          {
            label: 'Top Rated Kitchen Islands',
            href: '/kitchen/trending/islands',
          },
          {
            label: 'Best Selling Cookware',
            href: '/kitchen/trending/cookware',
          },
        ],
      },
    ],
  },
  {
    label: 'Storage',
    href: '/storage',
    sub: [
      {
        heading: 'Storage Furniture',
        href: '/storage/furniture',
        items: [
          { label: 'Bookcases & Shelving', href: '/storage/bookcases' },
          { label: 'Cabinets & Chests', href: '/storage/cabinets' },
          { label: 'Sideboards & Buffets', href: '/storage/sideboards' },
          { label: 'Media Storage', href: '/storage/media' },
          {
            label: 'Storage Furniture Sale',
            href: '/storage/furniture-sale',
            isSale: true,
          },
        ],
      },
      {
        heading: 'Closet Storage',
        href: '/storage/closet',
        items: [
          { label: 'Closet Systems', href: '/storage/closet-systems' },
          {
            label: 'Wardrobe Organisers',
            href: '/storage/wardrobe-organisers',
          },
          { label: 'Shoe Storage', href: '/storage/shoe-storage' },
          { label: 'Hangers', href: '/storage/hangers' },
        ],
      },
      {
        heading: 'Bins & Baskets',
        href: '/storage/bins-baskets',
        items: [
          { label: 'Storage Boxes', href: '/storage/boxes' },
          { label: 'Woven Baskets', href: '/storage/baskets' },
          { label: 'Trunk & Storage Ottomans', href: '/storage/ottomans' },
        ],
      },
      {
        heading: 'Garage & Utility',
        href: '/storage/garage',
        items: [
          { label: 'Garage Shelving', href: '/storage/garage-shelving' },
          { label: 'Tool Storage', href: '/storage/tool-storage' },
          { label: 'Wall Organisation', href: '/storage/wall-organisation' },
        ],
      },
    ],
  },
  {
    label: 'Baby & Kids',
    href: '/baby-kids',
    sub: [
      {
        heading: 'Kids Furniture',
        href: '/baby-kids/furniture',
        items: [
          { label: 'Kids Beds', href: '/baby-kids/beds' },
          { label: 'Bunk Beds', href: '/baby-kids/bunk-beds' },
          { label: 'Kids Desks & Chairs', href: '/baby-kids/desks' },
          { label: 'Kids Dressers', href: '/baby-kids/dressers' },
          {
            label: 'Kids Furniture Sale',
            href: '/baby-kids/furniture-sale',
            isSale: true,
          },
        ],
      },
      {
        heading: 'Nursery',
        href: '/baby-kids/nursery',
        items: [
          { label: 'Cribs', href: '/baby-kids/cribs' },
          { label: 'Changing Tables', href: '/baby-kids/changing-tables' },
          { label: 'Gliders & Rocking Chairs', href: '/baby-kids/gliders' },
          { label: 'Nursery Decor', href: '/baby-kids/nursery-decor' },
        ],
      },
      {
        heading: 'Kids Bedding',
        href: '/baby-kids/bedding',
        items: [
          { label: 'Kids Duvet Covers', href: '/baby-kids/duvet-covers' },
          { label: 'Kids Comforters', href: '/baby-kids/comforters' },
          { label: 'Kids Sheets', href: '/baby-kids/sheets' },
        ],
      },
      {
        heading: 'Playroom',
        href: '/baby-kids/playroom',
        items: [
          { label: 'Toy Storage', href: '/baby-kids/toy-storage' },
          { label: 'Play Tents', href: '/baby-kids/play-tents' },
          { label: 'Kids Rugs', href: '/baby-kids/rugs' },
          { label: 'Kids Wall Decor', href: '/baby-kids/wall-decor' },
        ],
      },
    ],
  },
  {
    label: 'Home Improvement',
    href: '/home-improvement',
    sub: [
      {
        heading: 'Flooring',
        href: '/home-improvement/flooring',
        items: [
          { label: 'Vinyl Flooring', href: '/home-improvement/vinyl-flooring' },
          {
            label: 'Laminate Flooring',
            href: '/home-improvement/laminate-flooring',
          },
          {
            label: 'Hardwood Flooring',
            href: '/home-improvement/hardwood-flooring',
          },
          { label: 'Floor Tiles', href: '/home-improvement/floor-tiles' },
        ],
      },
      {
        heading: 'Doors & Windows',
        href: '/home-improvement/doors-windows',
        items: [
          { label: 'Interior Doors', href: '/home-improvement/interior-doors' },
          { label: 'Front Doors', href: '/home-improvement/front-doors' },
          { label: 'Door Hardware', href: '/home-improvement/door-hardware' },
          {
            label: 'Window Treatments',
            href: '/home-improvement/window-treatments',
          },
        ],
      },
      {
        heading: 'Bathroom',
        href: '/home-improvement/bathroom',
        items: [
          { label: 'Vanities', href: '/home-improvement/vanities' },
          { label: 'Toilets', href: '/home-improvement/toilets' },
          {
            label: 'Bathroom Faucets',
            href: '/home-improvement/bathroom-faucets',
          },
          { label: 'Shower Doors', href: '/home-improvement/shower-doors' },
        ],
      },
      {
        heading: 'Kitchen Renovation',
        href: '/home-improvement/kitchen',
        items: [
          {
            label: 'Kitchen Faucets',
            href: '/home-improvement/kitchen-faucets',
          },
          { label: 'Kitchen Sinks', href: '/home-improvement/kitchen-sinks' },
          { label: 'Backsplash Tiles', href: '/home-improvement/backsplash' },
          { label: 'Countertops', href: '/home-improvement/countertops' },
        ],
      },
    ],
  },
  {
    label: 'Pet',
    href: '/pet',
    sub: [
      {
        heading: 'Pet Furniture',
        href: '/pet/furniture',
        items: [
          { label: 'Pet Beds', href: '/pet/beds' },
          { label: 'Cat Trees', href: '/pet/cat-trees' },
          { label: 'Pet Crates & Kennels', href: '/pet/crates' },
          { label: 'Pet Gates', href: '/pet/gates' },
          { label: 'Pet Furniture Sale', href: '/pet/sale', isSale: true },
        ],
      },
      {
        heading: 'Pet Feeding',
        href: '/pet/feeding',
        items: [
          { label: 'Pet Bowls & Feeders', href: '/pet/bowls' },
          { label: 'Pet Feeding Stations', href: '/pet/feeding-stations' },
          { label: 'Water Fountains', href: '/pet/water-fountains' },
        ],
      },
      {
        heading: 'Pet Accessories',
        href: '/pet/accessories',
        items: [
          { label: 'Pet Toys', href: '/pet/toys' },
          { label: 'Pet Grooming', href: '/pet/grooming' },
          { label: 'Pet Travel', href: '/pet/travel' },
        ],
      },
    ],
  },
  {
    label: 'Holiday',
    href: '/holiday',
    sub: [
      {
        heading: 'Christmas',
        href: '/holiday/christmas',
        items: [
          { label: 'Christmas Trees', href: '/holiday/christmas-trees' },
          {
            label: 'Christmas Decorations',
            href: '/holiday/christmas-decorations',
          },
          { label: 'Christmas Lights', href: '/holiday/christmas-lights' },
          {
            label: 'Christmas Stockings',
            href: '/holiday/christmas-stockings',
          },
          {
            label: 'Christmas Sale',
            href: '/holiday/christmas-sale',
            isSale: true,
          },
        ],
      },
      {
        heading: 'Halloween',
        href: '/holiday/halloween',
        items: [
          {
            label: 'Halloween Decorations',
            href: '/holiday/halloween-decorations',
          },
          { label: 'Halloween Lighting', href: '/holiday/halloween-lighting' },
          { label: 'Halloween Outdoor', href: '/holiday/halloween-outdoor' },
        ],
      },
      {
        heading: 'Spring & Easter',
        href: '/holiday/spring-easter',
        items: [
          { label: 'Easter Decor', href: '/holiday/easter-decor' },
          { label: 'Spring Wreaths', href: '/holiday/spring-wreaths' },
          { label: 'Spring Flowers', href: '/holiday/spring-flowers' },
        ],
      },
      {
        heading: 'Seasonal Decor',
        href: '/holiday/seasonal',
        items: [
          { label: 'Wreaths & Garlands', href: '/holiday/wreaths' },
          { label: 'Seasonal Candles', href: '/holiday/candles' },
          {
            label: 'Seasonal Throws & Pillows',
            href: '/holiday/throws-pillows',
          },
        ],
      },
    ],
  },
  {
    label: 'Shop by Room',
    href: '/shop-by-room',
    sub: [
      {
        heading: 'Living Room',
        href: '/shop-by-room/living-room',
        items: [
          {
            label: 'Living Room Furniture',
            href: '/shop-by-room/living-room/furniture',
          },
          {
            label: 'Living Room Decor',
            href: '/shop-by-room/living-room/decor',
          },
          {
            label: 'Living Room Lighting',
            href: '/shop-by-room/living-room/lighting',
          },
          { label: 'Living Room Rugs', href: '/shop-by-room/living-room/rugs' },
        ],
      },
      {
        heading: 'Bedroom',
        href: '/shop-by-room/bedroom',
        items: [
          {
            label: 'Bedroom Furniture',
            href: '/shop-by-room/bedroom/furniture',
          },
          { label: 'Bedroom Bedding', href: '/shop-by-room/bedroom/bedding' },
          { label: 'Bedroom Lighting', href: '/shop-by-room/bedroom/lighting' },
          { label: 'Bedroom Decor', href: '/shop-by-room/bedroom/decor' },
        ],
      },
      {
        heading: 'Kitchen & Dining',
        href: '/shop-by-room/kitchen-dining',
        items: [
          {
            label: 'Kitchen Furniture',
            href: '/shop-by-room/kitchen/furniture',
          },
          { label: 'Kitchen Storage', href: '/shop-by-room/kitchen/storage' },
          {
            label: 'Dining Room Furniture',
            href: '/shop-by-room/dining/furniture',
          },
          { label: 'Kitchen Decor', href: '/shop-by-room/kitchen/decor' },
        ],
      },
      {
        heading: 'Bathroom',
        href: '/shop-by-room/bathroom',
        items: [
          {
            label: 'Bathroom Furniture',
            href: '/shop-by-room/bathroom/furniture',
          },
          { label: 'Bath Textiles', href: '/shop-by-room/bathroom/textiles' },
          { label: 'Bathroom Decor', href: '/shop-by-room/bathroom/decor' },
          {
            label: 'Bathroom Lighting',
            href: '/shop-by-room/bathroom/lighting',
          },
        ],
      },
      {
        heading: 'Home Office',
        href: '/shop-by-room/office',
        items: [
          { label: 'Office Desks', href: '/shop-by-room/office/desks' },
          { label: 'Office Chairs', href: '/shop-by-room/office/chairs' },
          { label: 'Office Storage', href: '/shop-by-room/office/storage' },
          { label: 'Office Decor', href: '/shop-by-room/office/decor' },
        ],
      },
    ],
  },
]

export function Header() {
  const [navState, setNavState] = useState<'top' | 'scrolling' | 'hidden'>(
    'top'
  )
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
          <img
            src="images/logo3.png"
            alt="Plaiss Logo"
            className="h-10 w-auto object-contain"
            style={{ maxHeight: '2.5rem' }}
          />
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
