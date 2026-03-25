# Salon & Spa Management System

A comprehensive web application for managing salon and spa operations, built with Next.js and React.

## Features

- **Overview Dashboard**: Key metrics, recent bookings, and top services
- **Business Details**: Manage business information, contact details, and operating hours
- **Products**: Inventory management for salon products
- **Services**: Manage available services with pricing and duration
- **Discounts & Coupons**: Create and manage promotional offers
- **Bookings**: View and manage customer appointments
- **Staff Management**: Manage staff members and their information
- **Campaigns**: Marketing campaigns and promotions

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **UI Components**: Custom component library

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── business-details/
│   ├── products/
│   ├── services/
│   ├── discounts/
│   ├── bookings/
│   ├── staff/
│   ├── campaigns/
│   ├── layout.tsx         # Root layout with sidebar
│   └── page.tsx           # Overview dashboard
├── components/
│   ├── ui/                # Reusable UI components
│   └── Sidebar.tsx        # Navigation sidebar
└── globals.css            # Global styles and CSS variables
```

## Navigation

Use the sidebar to navigate between different modules:
- Overview: Main dashboard with statistics
- Business Details: Edit business information
- Products: Manage product inventory
- Services: Configure services offered
- Discounts: Create promotional codes
- Bookings: View appointment schedule
- Staff: Manage team members
- Campaigns: Run marketing campaigns

## Development

- Built with modern React patterns and TypeScript
- Responsive design with Tailwind CSS
- Clean component architecture
- Easy to extend with additional features

## Deployment

The app can be deployed to Vercel, Netlify, or any platform supporting Next.js applications.
