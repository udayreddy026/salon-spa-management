"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Plus, Edit, Trash2, Mail, Phone, Save } from "lucide-react";

interface StaffMember {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  status: "Active" | "Inactive";
  avatar: string;
}

const initialStaff: StaffMember[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Senior Stylist",
    email: "sarah@salon.com",
    phone: "(555) 123-4567",
    status: "Active",
    avatar: "SJ",
  },
  {
    id: 2,
    name: "Mike Wilson",
    role: "Esthetician",
    email: "mike@salon.com",
    phone: "(555) 234-5678",
    status: "Active",
    avatar: "MW",
  },
  {
    id: 3,
    name: "Emma Davis",
    role: "Nail Technician",
    email: "emma@salon.com",
    phone: "(555) 345-6789",
    status: "Active",
    avatar: "ED",
  },
  {
    id: 4,
    name: "John Smith",
    role: "Apprentice",
    email: "john@salon.com",
    phone: "(555) 456-7890",
    status: "Inactive",
    avatar: "JS",
  },
];

const roles = ["Senior Stylist", "Stylist", "Esthetician", "Nail Technician", "Apprentice"];

export default function Staff() {
  const [staff, setStaff] = useState<StaffMember[]>(initialStaff);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newStaffMember, setNewStaffMember] = useState<Partial<StaffMember>>({
    name: "",
    role: "",
    email: "",
    phone: "",
    status: "Active",
  });

  const handleEdit = (member: StaffMember) => {
    setEditingStaff({ ...member });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (editingStaff) {
      const updatedAvatar = editingStaff.name.split(' ').map(n => n[0]).join('').toUpperCase();
      setEditingStaff({ ...editingStaff, avatar: updatedAvatar });
      setStaff(staff.map(s => s.id === editingStaff.id ? editingStaff : s));
      setIsEditDialogOpen(false);
      setEditingStaff(null);
    }
  };

  const handleDelete = (id: number) => {
    setStaff(staff.filter(s => s.id !== id));
  };

  const handleStatusToggle = (id: number) => {
    setStaff(staff.map(s =>
      s.id === id
        ? { ...s, status: s.status === "Active" ? "Inactive" : "Active" }
        : s
    ));
  };

  const handleAddStaff = () => {
    if (newStaffMember.name && newStaffMember.role && newStaffMember.email && newStaffMember.phone) {
      const avatar = newStaffMember.name.split(' ').map(n => n[0]).join('').toUpperCase();
      const member: StaffMember = {
        id: Math.max(...staff.map(s => s.id)) + 1,
        name: newStaffMember.name,
        role: newStaffMember.role,
        email: newStaffMember.email,
        phone: newStaffMember.phone,
        status: newStaffMember.status as "Active" | "Inactive",
        avatar,
      };
      setStaff([...staff, member]);
      setNewStaffMember({
        name: "",
        role: "",
        email: "",
        phone: "",
        status: "Active",
      });
      setIsAddDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Staff Management</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Staff
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Staff Member</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newStaffMember.name}
                  onChange={(e) => setNewStaffMember({ ...newStaffMember, name: e.target.value })}
                  className="col-span-3"
                  placeholder="Full name"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Select
                  value={newStaffMember.role}
                  onValueChange={(value) => setNewStaffMember({ ...newStaffMember, role: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={newStaffMember.email}
                  onChange={(e) => setNewStaffMember({ ...newStaffMember, email: e.target.value })}
                  className="col-span-3"
                  placeholder="email@salon.com"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={newStaffMember.phone}
                  onChange={(e) => setNewStaffMember({ ...newStaffMember, phone: e.target.value })}
                  className="col-span-3"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select
                  value={newStaffMember.status}
                  onValueChange={(value: "Active" | "Inactive") => setNewStaffMember({ ...newStaffMember, status: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddStaff}>Add Staff Member</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staff.map((member) => (
          <Card key={member.id}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarFallback>{member.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  {member.email}
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  {member.phone}
                </div>
                <div className="flex justify-between items-center mt-4">
                  <Badge variant={member.status === "Active" ? "default" : "secondary"}>
                    {member.status}
                  </Badge>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusToggle(member.id)}
                      className={member.status === "Active" ? "text-orange-600 hover:text-orange-700" : "text-green-600 hover:text-green-700"}
                    >
                      {member.status === "Active" ? "Deactivate" : "Activate"}
                    </Button>
                    <Dialog open={isEditDialogOpen && editingStaff?.id === member.id} onOpenChange={(open) => {
                      if (!open) {
                        setIsEditDialogOpen(false);
                        setEditingStaff(null);
                      }
                    }}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => handleEdit(member)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Edit Staff Member</DialogTitle>
                        </DialogHeader>
                        {editingStaff && (
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-name" className="text-right">
                                Name
                              </Label>
                              <Input
                                id="edit-name"
                                value={editingStaff.name}
                                onChange={(e) => setEditingStaff({ ...editingStaff, name: e.target.value })}
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-role" className="text-right">
                                Role
                              </Label>
                              <Select
                                value={editingStaff.role}
                                onValueChange={(value) => setEditingStaff({ ...editingStaff, role: value })}
                              >
                                <SelectTrigger className="col-span-3">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {roles.map((role) => (
                                    <SelectItem key={role} value={role}>
                                      {role}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-email" className="text-right">
                                Email
                              </Label>
                              <Input
                                id="edit-email"
                                type="email"
                                value={editingStaff.email}
                                onChange={(e) => setEditingStaff({ ...editingStaff, email: e.target.value })}
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-phone" className="text-right">
                                Phone
                              </Label>
                              <Input
                                id="edit-phone"
                                value={editingStaff.phone}
                                onChange={(e) => setEditingStaff({ ...editingStaff, phone: e.target.value })}
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-status" className="text-right">
                                Status
                              </Label>
                              <Select
                                value={editingStaff.status}
                                onValueChange={(value: "Active" | "Inactive") => setEditingStaff({ ...editingStaff, status: value })}
                              >
                                <SelectTrigger className="col-span-3">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Active">Active</SelectItem>
                                  <SelectItem value="Inactive">Inactive</SelectItem>
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
                            This action cannot be undone. This will permanently delete the staff member "{member.name}".
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(member.id)} className="bg-red-600 hover:bg-red-700">
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}