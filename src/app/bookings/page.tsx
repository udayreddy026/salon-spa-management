"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Calendar, Clock, User, Scissors, Edit, Trash2, Save } from 'lucide-react';

type Booking = {
  id: string;
  date: string;
  time: string;
  customer: string;
  service: string;
  staff: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  duration: string;
};

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: '1',
      date: '2024-01-15',
      time: '10:00',
      customer: 'Alice Johnson',
      service: 'Hair Cut',
      staff: 'Sarah',
      status: 'Confirmed',
      duration: '45 min',
    },
    {
      id: '2',
      date: '2024-01-15',
      time: '11:30',
      customer: 'Bob Smith',
      service: 'Facial',
      staff: 'Emma',
      status: 'Pending',
      duration: '60 min',
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [newBooking, setNewBooking] = useState<Booking>({
    id: '',
    date: '',
    time: '',
    customer: '',
    service: '',
    staff: '',
    status: 'Pending',
    duration: '',
  });

  const services = ['Hair Cut', 'Hair Color', 'Facial', 'Manicure', 'Pedicure', 'Massage', 'Waxing'];
  const staff = ['Sarah', 'Emma', 'John', 'Lisa', 'Mike'];

  const handleAddBooking = () => {
    if (newBooking.customer && newBooking.service && newBooking.date && newBooking.time) {
      const booking: Booking = {
        ...newBooking,
        id: Date.now().toString(),
      };
      setBookings([...bookings, booking]);
      setNewBooking({ id: '', date: '', time: '', customer: '', service: '', staff: '', status: 'Pending', duration: '' });
      setIsAddDialogOpen(false);
    }
  };

  const handleEdit = (booking: Booking) => {
    setEditingBooking(booking);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (editingBooking) {
      setBookings(bookings.map((b) => (b.id === editingBooking.id ? editingBooking : b)));
      setIsEditDialogOpen(false);
      setEditingBooking(null);
    }
  };

  const handleDelete = (id: string) => {
    setBookings(bookings.filter((b) => b.id !== id));
  };

  const handleStatusChange = (id: string, status: Booking['status']) => {
    setBookings(bookings.map((b) => (b.id === id ? { ...b, status } : b)));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Bookings</h1>
          <p className="text-muted-foreground mt-1">Manage customer bookings and appointments.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
              + New Booking
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Booking</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="customer" className="text-right">
                  Customer
                </Label>
                <Input
                  id="customer"
                  value={newBooking.customer}
                  onChange={(e) => setNewBooking({ ...newBooking, customer: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="service" className="text-right">
                  Service
                </Label>
                <Select value={newBooking.service} onValueChange={(value) => setNewBooking({ ...newBooking, service: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="staff" className="text-right">
                  Staff
                </Label>
                <Select value={newBooking.staff} onValueChange={(value) => setNewBooking({ ...newBooking, staff: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {staff.map((member) => (
                      <SelectItem key={member} value={member}>
                        {member}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={newBooking.date}
                  onChange={(e) => setNewBooking({ ...newBooking, date: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-right">
                  Time
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={newBooking.time}
                  onChange={(e) => setNewBooking({ ...newBooking, time: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="duration" className="text-right">
                  Duration
                </Label>
                <Input
                  id="duration"
                  value={newBooking.duration}
                  onChange={(e) => setNewBooking({ ...newBooking, duration: e.target.value })}
                  className="col-span-3"
                  placeholder="e.g., 60 min"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select
                  value={newBooking.status}
                  onValueChange={(value: Booking['status']) => setNewBooking({ ...newBooking, status: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Confirmed">Confirmed</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddBooking}>Add Booking</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">All Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-full divide-y">
              <div className="grid grid-cols-12 gap-4 items-center py-2 px-3 text-xs font-semibold text-muted-foreground">
                <div className="col-span-2">Date</div>
                <div className="col-span-2">Time</div>
                <div className="col-span-3">Customer</div>
                <div className="col-span-2">Service</div>
                <div className="col-span-1">Staff</div>
                <div className="col-span-1">Status</div>
                <div className="col-span-1 text-right">Actions</div>
              </div>
              {bookings.map((booking) => (
                <div key={booking.id} className="grid grid-cols-12 gap-4 items-center py-3 px-3 hover:bg-slate-50 dark:hover:bg-slate-900 rounded">
                  <div className="col-span-2 text-sm font-medium text-gray-800 dark:text-gray-100">{booking.date}</div>
                  <div className="col-span-2 text-sm text-gray-700 dark:text-gray-300">{booking.time}</div>
                  <div className="col-span-3 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                      {booking.customer
                        .split(' ')
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join('')}
                    </div>
                    <div className="truncate">
                      <div className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">{booking.customer}</div>
                      <div className="text-xs text-muted-foreground truncate">{booking.duration}</div>
                    </div>
                  </div>
                  <div className="col-span-2 text-sm text-gray-700 dark:text-gray-300 truncate">{booking.service}</div>
                  <div className="col-span-1 text-sm text-gray-700 dark:text-gray-300">{booking.staff}</div>
                  <div className="col-span-1">
                    {booking.status === 'Confirmed' && <Badge className="bg-green-100 text-green-800">Confirmed</Badge>}
                    {booking.status === 'Pending' && <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>}
                    {booking.status === 'Completed' && <Badge className="bg-sky-100 text-sky-800">Completed</Badge>}
                    {booking.status === 'Cancelled' && <Badge className="bg-rose-100 text-rose-800">Cancelled</Badge>}
                  </div>
                  <div className="col-span-1 text-right">
                    <div className="inline-flex items-center space-x-2">
                      <Dialog open={isEditDialogOpen && editingBooking?.id === booking.id} onOpenChange={(open) => {
                        if (!open) {
                          setIsEditDialogOpen(false);
                          setEditingBooking(null);
                        }
                      }}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => handleEdit(booking)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Edit Booking</DialogTitle>
                          </DialogHeader>
                          {editingBooking && (
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-customer" className="text-right">Customer</Label>
                                <Input id="edit-customer" value={editingBooking.customer} onChange={(e) => setEditingBooking({ ...editingBooking, customer: e.target.value })} className="col-span-3" />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-service" className="text-right">Service</Label>
                                <Select value={editingBooking.service} onValueChange={(value) => setEditingBooking({ ...editingBooking, service: value })}>
                                  <SelectTrigger className="col-span-3"><SelectValue /></SelectTrigger>
                                  <SelectContent>{services.map((service) => (<SelectItem key={service} value={service}>{service}</SelectItem>))}</SelectContent>
                                </Select>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-date" className="text-right">Date</Label>
                                <Input id="edit-date" type="date" value={editingBooking.date} onChange={(e) => setEditingBooking({ ...editingBooking, date: e.target.value })} className="col-span-3" />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-time" className="text-right">Time</Label>
                                <Input id="edit-time" type="time" value={editingBooking.time} onChange={(e) => setEditingBooking({ ...editingBooking, time: e.target.value })} className="col-span-3" />
                              </div>
                            </div>
                          )}
                          <DialogFooter>
                            <Button onClick={handleSaveEdit}><Save className="h-4 w-4 mr-2" />Save Changes</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(booking.id)}>
                            <Trash2 className="h-4 w-4 text-rose-600" />
                          </Button>
                        </AlertDialogTrigger>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Upcoming Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 border border-blue-200 dark:border-blue-800 rounded-lg hover:shadow-md transition-all gap-3 md:gap-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 flex-shrink-0 min-w-0">
                  <div className="flex items-center space-x-2 min-w-0">
                    <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                    <span className="font-medium truncate text-gray-800 dark:text-gray-100">{booking.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 min-w-0">
                    <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                    <span className="truncate text-gray-700 dark:text-gray-300">{booking.time} ({booking.duration})</span>
                  </div>
                  <div className="flex items-center space-x-2 min-w-0">
                    <User className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                    <span className="truncate text-gray-700 dark:text-gray-300">{booking.customer}</span>
                  </div>
                  <div className="flex items-center space-x-2 min-w-0">
                    <Scissors className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                    <span className="truncate text-gray-700 dark:text-gray-300">{booking.service}</span>
                  </div>
                  <div className="text-sm text-muted-foreground min-w-0 truncate">with {booking.staff}</div>
                </div>
                <div className="flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-4 w-full md:w-auto">
                  <Select value={booking.status} onValueChange={(value: Booking['status']) => handleStatusChange(booking.id, value)}>
                    <SelectTrigger className="w-32 bg-white dark:bg-slate-800">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Confirmed">Confirmed</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex space-x-2">
                    <Dialog open={isEditDialogOpen && editingBooking?.id === booking.id} onOpenChange={(open) => {
                      if (!open) {
                        setIsEditDialogOpen(false);
                        setEditingBooking(null);
                      }
                    }}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="hover:bg-blue-100 dark:hover:bg-blue-900" onClick={() => handleEdit(booking)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>Edit Booking</DialogTitle>
                        </DialogHeader>
                        {editingBooking && (
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-customer" className="text-right">Customer</Label>
                              <Input id="edit-customer" value={editingBooking.customer} onChange={(e) => setEditingBooking({ ...editingBooking, customer: e.target.value })} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-service" className="text-right">Service</Label>
                              <Select value={editingBooking.service} onValueChange={(value) => setEditingBooking({ ...editingBooking, service: value })}>
                                <SelectTrigger className="col-span-3"><SelectValue /></SelectTrigger>
                                <SelectContent>{services.map((service) => (<SelectItem key={service} value={service}>{service}</SelectItem>))}</SelectContent>
                              </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-staff" className="text-right">Staff</Label>
                              <Select value={editingBooking.staff} onValueChange={(value) => setEditingBooking({ ...editingBooking, staff: value })}>
                                <SelectTrigger className="col-span-3"><SelectValue /></SelectTrigger>
                                <SelectContent>{staff.map((member) => (<SelectItem key={member} value={member}>{member}</SelectItem>))}</SelectContent>
                              </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-date" className="text-right">Date</Label>
                              <Input id="edit-date" type="date" value={editingBooking.date} onChange={(e) => setEditingBooking({ ...editingBooking, date: e.target.value })} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-time" className="text-right">Time</Label>
                              <Input id="edit-time" type="time" value={editingBooking.time} onChange={(e) => setEditingBooking({ ...editingBooking, time: e.target.value })} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-duration" className="text-right">Duration</Label>
                              <Input id="edit-duration" value={editingBooking.duration} onChange={(e) => setEditingBooking({ ...editingBooking, duration: e.target.value })} className="col-span-3" placeholder="e.g., 60 min" />
                            </div>
                          </div>
                        )}
                        <DialogFooter>
                          <Button onClick={handleSaveEdit}><Save className="h-4 w-4 mr-2" />Save Changes</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(booking.id)}>
                          <Trash2 className="h-4 w-4 text-rose-600" />
                        </Button>
                      </AlertDialogTrigger>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
