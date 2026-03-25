"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  Building,
  Package,
  Scissors,
  Ticket,
  Calendar,
  Users,
  Megaphone,
} from 'lucide-react';

const menuItems = [
  { name: 'Overview', href: '/', icon: BarChart3 },
  { name: 'Business Details', href: '/business-details', icon: Building },
  { name: 'Products', href: '/products', icon: Package },
  { name: 'Services', href: '/services', icon: Scissors },
  { name: 'Discounts/Coupons', href: '/discounts', icon: Ticket },
  { name: 'Bookings', href: '/bookings', icon: Calendar },
  { name: 'Staff Management', href: '/staff', icon: Users },
  { name: 'Campaigns', href: '/campaigns', icon: Megaphone },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-xl">
      <div className="flex h-16 items-center justify-center border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
        <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Salon & Spa
        </h1>
      </div>
      <nav className="flex-1 space-y-2 p-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30 shadow-lg'
                  : 'text-slate-300 hover:bg-slate-700/50 hover:text-white hover:shadow-md'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}