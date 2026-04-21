"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, Calendar, DollarSign, TrendingUp } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 42000 },
  { month: 'Feb', revenue: 38000 },
  { month: 'Mar', revenue: 51000 },
  { month: 'Apr', revenue: 46000 },
  { month: 'May', revenue: 55000 },
  { month: 'Jun', revenue: 49000 },
];

const serviceBookingsData = [
  { service: 'Hair Cut', bookings: 156 },
  { service: 'Hair Color', bookings: 134 },
  { service: 'Facial', bookings: 98 },
  { service: 'Manicure', bookings: 87 },
  { service: 'Massage', bookings: 65 },
];

const serviceDistributionData = [
  { name: 'Hair Services', value: 290, color: '#7c3aed' },
  { name: 'Skincare', value: 98, color: '#06b6d4' },
  { name: 'Nail Services', value: 87, color: '#10b981' },
  { name: 'Wellness', value: 65, color: '#f59e0b' },
];

export default function Overview() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Overview</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's your business performance.</p>
        </div>
        <div className="flex items-center space-x-2 text-sm bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 px-4 py-2 rounded-full border border-green-200 dark:border-green-800">
          <TrendingUp className="h-4 w-4 text-green-600" />
          <span className="text-green-700 dark:text-green-300 font-medium">Updated 5 minutes ago</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-10 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Bookings</CardTitle>
            <div className="p-2 bg-blue-200 dark:bg-blue-800 rounded-lg group-hover:scale-110 transition-transform">
              <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-300" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">1,234</div>
            <div className="flex items-center mt-2">
              <div className="text-xs font-semibold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900 px-2 py-1 rounded">↑ +20.1%</div>
              <p className="text-xs text-muted-foreground ml-2">from last month</p>
            </div>
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Active Staff</CardTitle>
            <div className="p-2 bg-purple-200 dark:bg-purple-800 rounded-lg group-hover:scale-110 transition-transform">
              <Users className="h-5 w-5 text-purple-600 dark:text-purple-300" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">45</div>
            <div className="flex items-center mt-2">
              <div className="text-xs font-semibold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900 px-2 py-1 rounded">↑ +2 new</div>
              <p className="text-xs text-muted-foreground ml-2">this month</p>
            </div>
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-10 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Revenue</CardTitle>
            <div className="p-2 bg-green-200 dark:bg-green-800 rounded-lg group-hover:scale-110 transition-transform">
              <DollarSign className="h-5 w-5 text-green-600 dark:text-green-300" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">$45,231</div>
            <div className="flex items-center mt-2">
              <div className="text-xs font-semibold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900 px-2 py-1 rounded">↑ +15%</div>
              <p className="text-xs text-muted-foreground ml-2">from last month</p>
            </div>
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border-0 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 opacity-0 group-hover:opacity-10 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Services Offered</CardTitle>
            <div className="p-2 bg-orange-200 dark:bg-orange-800 rounded-lg group-hover:scale-110 transition-transform">
              <BarChart3 className="h-5 w-5 text-orange-600 dark:text-orange-300" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">28</div>
            <div className="flex items-center mt-2">
              <div className="text-xs font-semibold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900 px-2 py-1 rounded">↑ +3 new</div>
              <p className="text-xs text-muted-foreground ml-2">services</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Revenue Trend</CardTitle>
                <p className="text-xs text-muted-foreground mt-1">6-month performance</p>
              </div>
              <div className="flex items-center space-x-1 text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded-full font-semibold">
                <TrendingUp className="h-3 w-3" />
                <span>+8.2%</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart
                data={revenueData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.6}/>
                    <stop offset="50%" stopColor="#a855f7" stopOpacity={0.3}/>
                    <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(148, 163, 184, 0.2)"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  className="text-xs font-medium"
                  stroke="rgba(100, 116, 139, 0.5)"
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  className="text-xs font-medium"
                  stroke="rgba(100, 116, 139, 0.5)"
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(30, 41, 59, 0.95)',
                    border: '1px solid rgba(148, 163, 184, 0.3)',
                    borderRadius: '12px',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)'
                  }}
                  labelStyle={{ color: '#e2e8f0' }}
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                  cursor={{
                    stroke: 'rgba(168, 85, 247, 0.3)',
                    strokeWidth: 2
                  }}
                />
                <Area
                  type="natural"
                  dataKey="revenue"
                  stroke="#7c3aed"
                  strokeWidth={3}
                  fill="url(#colorRevenue)"
                  dot={{
                    fill: '#7c3aed',
                    r: 4,
                    strokeWidth: 2,
                    stroke: '#fff'
                  }}
                  activeDot={{
                    r: 7,
                    fill: '#a855f7',
                    stroke: '#fff',
                    strokeWidth: 2
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Service Distribution */}
        <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
          <CardHeader>
            <CardTitle className="text-lg font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Service Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={serviceDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {serviceDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {serviceDistributionData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bookings by Service Chart */}
      <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">Bookings by Service</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">Current month performance</p>
            </div>
            <div className="flex items-center space-x-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full font-semibold">
              <BarChart3 className="h-3 w-3" />
              <span>5 Services</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart
              data={serviceBookingsData}
              margin={{ top: 20, right: 30, left: 0, bottom: 60 }}
            >
              <defs>
                <linearGradient id="colorBar1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#0891b2" stopOpacity={0.8}/>
                </linearGradient>
                <linearGradient id="colorBar2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#1e40af" stopOpacity={0.8}/>
                </linearGradient>
                <linearGradient id="colorBar3" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a78bfa" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.8}/>
                </linearGradient>
                <linearGradient id="colorBar4" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f97316" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#ea580c" stopOpacity={0.8}/>
                </linearGradient>
                <linearGradient id="colorBar5" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#059669" stopOpacity={0.8}/>
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(148, 163, 184, 0.2)"
                vertical={false}
              />
              <XAxis
                dataKey="service"
                axisLine={false}
                tickLine={false}
                className="text-xs font-medium"
                angle={-45}
                textAnchor="end"
                height={80}
                stroke="rgba(100, 116, 139, 0.5)"
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                className="text-xs font-medium"
                stroke="rgba(100, 116, 139, 0.5)"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(30, 41, 59, 0.95)',
                  border: '1px solid rgba(148, 163, 184, 0.3)',
                  borderRadius: '12px',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)'
                }}
                labelStyle={{ color: '#e2e8f0' }}
                formatter={(value) => [
                  `${value} bookings`,
                  'Total'
                ]}
                cursor={{
                  fill: 'rgba(59, 130, 246, 0.1)',
                  radius: 8
                }}
              />
              <Bar
                dataKey="bookings"
                radius={[8, 8, 0, 0]}
                animationDuration={800}
              >
                {serviceBookingsData.map((entry, index) => {
                  const gradients = ['#06b6d4', '#3b82f6', '#a78bfa', '#f97316', '#10b981'];
                  return (
                    <Cell
                      key={`cell-${index}`}
                      fill={gradients[index]}
                      fillOpacity={0.9}
                    />
                  );
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
          <CardHeader>
            <CardTitle className="text-lg font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-950 dark:to-rose-950 rounded-lg border border-pink-200 dark:border-pink-800 hover:shadow-md transition-shadow">
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-100">Hair Cut & Style</p>
                  <p className="text-sm text-muted-foreground">John Doe - Today 2:00 PM</p>
                </div>
                <span className="text-sm font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">$50</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950 rounded-lg border border-purple-200 dark:border-purple-800 hover:shadow-md transition-shadow">
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-100">Facial Treatment</p>
                  <p className="text-sm text-muted-foreground">Jane Smith - Tomorrow 10:00 AM</p>
                </div>
                <span className="text-sm font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">$80</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 rounded-lg border border-amber-200 dark:border-amber-800 hover:shadow-md transition-shadow">
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-100">Manicure</p>
                  <p className="text-sm text-muted-foreground">Alice Johnson - Tomorrow 3:00 PM</p>
                </div>
                <span className="text-sm font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">$35</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
          <CardHeader>
            <CardTitle className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Top Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {serviceBookingsData.slice(0, 4).map((service, index) => (
                <div key={service.service} className="flex items-center justify-between p-3 bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-900 dark:to-slate-800 rounded-lg hover:shadow-md transition-all group">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold group-hover:scale-110 transition-transform shadow-lg">
                      {index + 1}
                    </div>
                    <span className="font-semibold text-gray-800 dark:text-gray-100">{service.service}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{service.bookings}</div>
                    <div className="text-xs text-muted-foreground">bookings</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
