"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Plus, Calendar, Clock, User, Scissors, Edit, Trash2, Save } from "lucide-react";

interface Booking {
  id: number;
  customer: string;
  service: string;
  staff: string;
  date: string;
  time: string;
  duration: string;
  status: "Confirmed" | "Pending" | "Completed" | "Cancelled";
}

const initialBookings: Booking[] = [
  {
    id: 1,
    customer: "John Doe",
    service: "Hair Cut & Style",
    staff: "Sarah Johnson",
    date: "2024-03-25",
    time: "2:00 PM",
    duration: "45 min",
    status: "Confirmed",
  },
  {
    id: 2,
    customer: "Jane Smith",
    service: "Facial Treatment",
    staff: "Mike Wilson",
    date: "2024-03-26",
    time: "10:00 AM",
    duration: "60 min",
    status: "Pending",
  },
  {
    id: 3,
    customer: "Alice Johnson",
    service: "Manicure",
    staff: "Emma Davis",
    date: "2024-03-26",
    time: "3:00 PM",
    duration: "30 min",
    status: "Completed",
  },
  {
    id: 4,
    customer: "Bob Brown",
    service: "Hair Coloring",
    staff: "Sarah Johnson",
    date: "2024-03-27",
    time: "9:00 AM",
    duration: "120 min",
    status: "Confirmed",
  },
];

const services = ["Hair Cut & Style", "Hair Coloring", "Facial Treatment", "Manicure", "Massage"];
const staff = ["Sarah Johnson", "Mike Wilson", "Emma Davis"];

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newBooking, setNewBooking] = useState<Partial<Booking>>({
    customer: "",
    service: "",
    staff: "",
    date: "",
    time: "",
    duration: "",
    status: "Pending",
  });

  const handleEdit = (booking: Booking) => {
    setEditingBooking({ ...booking });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (editingBooking) {
      setBookings(bookings.map(b => b.id === editingBooking.id ? editingBooking : b));
      setIsEditDialogOpen(false);
      setEditingBooking(null);
    }
  };

  const handleDelete = (id: number) => {
    setBookings(bookings.filter(b => b.id !== id));
  };

  const handleStatusChange = (id: number, status: Booking["status"]) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status } : b));
  };

  const handleAddBooking = () => {
    if (newBooking.customer && newBooking.service && newBooking.staff && newBooking.date && newBooking.time && newBooking.duration) {
      const booking: Booking = {
        id: Math.max(...bookings.map(b => b.id)) + 1,
        customer: newBooking.customer,
        service: newBooking.service,
        staff: newBooking.staff,
        date: newBooking.date,
        time: newBooking.time,
        duration: newBooking.duration,
        status: newBooking.status as Booking["status"],
      };
      setBookings([...bookings, booking]);
      setNewBooking({
        customer: "",
        service: "",
        staff: "",
        date: "",
        time: "",
        duration: "",
        status: "Pending",
      });
      setIsAddDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Booking
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Booking</DialogTitle>
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
                  placeholder="Customer name"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="service" className="text-right">
                  Service
                </Label>
                <Select
                  value={newBooking.service}
                  onValueChange={(value) => setNewBooking({ ...newBooking, service: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select service" />
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
                <Select
                  value={newBooking.staff}
                  onValueChange={(value) => setNewBooking({ ...newBooking, staff: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select staff" />
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
                  onValueChange={(value: Booking["status"]) => setNewBooking({ ...newBooking, status: value })}
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
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg gap-3 md:gap-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 flex-shrink-0 min-w-0">
                  <div className="flex items-center space-x-2 min-w-0">
                    <Calendar className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <span className="font-medium truncate">{booking.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 min-w-0">
                    <Clock className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <span className="truncate">{booking.time} ({booking.duration})</span>
                  </div>
                  <div className="flex items-center space-x-2 min-w-0">
                    <User className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <span className="truncate">{booking.customer}</span>
                  </div>
                  <div className="flex items-center space-x-2 min-w-0">
                    <Scissors className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <span className="truncate">{booking.service}</span>
                  </div>
                  <div className="text-sm text-muted-foreground min-w-0 truncate">with {booking.staff}</div>
                </div>
                <div className="flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-4 w-full md:w-auto">
                  <Select
                    value={booking.status}
                    onValueChange={(value: Booking["status"]) => handleStatusChange(booking.id, value)}
                  >
                    <SelectTrigger className="w-32">
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
                              <Label htmlFor="edit-customer" className="text-right">
                                Customer
                              </Label>
                              <Input
                                id="edit-customer"
                                value={editingBooking.customer}
                                onChange={(e) => setEditingBooking({ ...editingBooking, customer: e.target.value })}
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-service" className="text-right">
                                Service
                              </Label>
                              <Select
                                value={editingBooking.service}
                                onValueChange={(value) => setEditingBooking({ ...editingBooking, service: value })}
                              >
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
                              <Label htmlFor="edit-staff" className="text-right">
                                Staff
                              </Label>
                              <Select
                                value={editingBooking.staff}
                                onValueChange={(value) => setEditingBooking({ ...editingBooking, staff: value })}
                              >
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
                              <Label htmlFor="edit-date" className="text-right">
                                Date
                              </Label>
                              <Input
                                id="edit-date"
                                type="date"
                                value={editingBooking.date}
                                onChange={(e) => setEditingBooking({ ...editingBooking, date: e.target.value })}
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-time" className="text-right">
                                Time
                              </Label>
                              <Input
                                id="edit-time"
                                type="time"
                                value={editingBooking.time}
                                onChange={(e) => setEditingBooking({ ...editingBooking, time: e.target.value })}
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-duration" className="text-right">
                                Duration
                              </Label>
                              <Input
                                id="edit-duration"
                                value={editingBooking.duration}
                                onChange={(e) => setEditingBooking({ ...editingBooking, duration: e.target.value })}
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-status" className="text-right">
                                Status
                              </Label>
                              <Select
                                value={editingBooking.status}
                                onValueChange={(value: Booking["status"]) => setEditingBooking({ ...editingBooking, status: value })}
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
                        )}
                        <DialogFooter>
                          <Button onClick={handleSaveEdit}>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the booking for {booking.customer}.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(booking.id)} className="bg-red-600 hover:bg-red-700">
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
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