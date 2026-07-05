"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  BarChart3,
  Building,
  Package,
  Scissors,
  Ticket,
  Calendar,
  Users,
  Megaphone,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
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
  { name: 'WhatsApp', href: '/whatsapp', icon: MessageCircle },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`flex h-full flex-col bg-slate-900 text-white shadow-xl transition-[width] duration-300 ease-in-out ${collapsed ? 'w-20' : 'w-64'}`}>
      <div className="flex h-16 items-center justify-center border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm">
        {!collapsed && (
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Salon & Spa
          </h1>
        )}
      </div>
      <nav className="flex-1 space-y-2 p-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'} rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30 shadow-lg'
                  : 'text-slate-300 hover:bg-slate-700/50 hover:text-white hover:shadow-md'
              }`}
              title={collapsed ? item.name : ''}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-slate-800 p-3">
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-2 text-sm text-slate-200 hover:bg-slate-800 transition-all"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          {!collapsed && <span>{collapsed ? 'Expand' : 'Collapse'}</span>}
        </button>
      </div>
    </div>
  );
}