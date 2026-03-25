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
import { Plus, Edit, Trash2, Percent, Calendar, Save } from "lucide-react";

interface Discount {
  id: number;
  name: string;
  type: "Percentage" | "Fixed";
  value: number;
  code: string;
  validUntil: string;
  status: "Active" | "Expired" | "Inactive";
}

const initialDiscounts: Discount[] = [
  {
    id: 1,
    name: "New Customer Discount",
    type: "Percentage",
    value: 20,
    code: "NEW20",
    validUntil: "2024-12-31",
    status: "Active",
  },
  {
    id: 2,
    name: "Loyalty Discount",
    type: "Fixed",
    value: 10,
    code: "LOYAL10",
    validUntil: "2024-12-31",
    status: "Active",
  },
  {
    id: 3,
    name: "Holiday Special",
    type: "Percentage",
    value: 15,
    code: "HOLIDAY15",
    validUntil: "2024-12-25",
    status: "Active",
  },
  {
    id: 4,
    name: "Expired Discount",
    type: "Percentage",
    value: 10,
    code: "EXPIRED10",
    validUntil: "2023-12-31",
    status: "Expired",
  },
];

export default function Discounts() {
  const [discounts, setDiscounts] = useState<Discount[]>(initialDiscounts);
  const [editingDiscount, setEditingDiscount] = useState<Discount | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newDiscount, setNewDiscount] = useState<Partial<Discount>>({
    name: "",
    type: "Percentage",
    value: 0,
    code: "",
    validUntil: "",
    status: "Active",
  });

  const handleEdit = (discount: Discount) => {
    setEditingDiscount({ ...discount });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (editingDiscount) {
      setDiscounts(discounts.map(d => d.id === editingDiscount.id ? editingDiscount : d));
      setIsEditDialogOpen(false);
      setEditingDiscount(null);
    }
  };

  const handleDelete = (id: number) => {
    setDiscounts(discounts.filter(d => d.id !== id));
  };

  const handleStatusChange = (id: number, status: Discount["status"]) => {
    setDiscounts(discounts.map(d => d.id === id ? { ...d, status } : d));
  };

  const handleAddDiscount = () => {
    if (newDiscount.name && newDiscount.code && newDiscount.validUntil && newDiscount.value !== undefined) {
      const discount: Discount = {
        id: Math.max(...discounts.map(d => d.id)) + 1,
        name: newDiscount.name,
        type: newDiscount.type as "Percentage" | "Fixed",
        value: newDiscount.value,
        code: newDiscount.code,
        validUntil: newDiscount.validUntil,
        status: newDiscount.status as Discount["status"],
      };
      setDiscounts([...discounts, discount]);
      setNewDiscount({
        name: "",
        type: "Percentage",
        value: 0,
        code: "",
        validUntil: "",
        status: "Active",
      });
      setIsAddDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Discounts & Coupons</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Discount
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Discount</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newDiscount.name}
                  onChange={(e) => setNewDiscount({ ...newDiscount, name: e.target.value })}
                  className="col-span-3"
                  placeholder="Discount name"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select
                  value={newDiscount.type}
                  onValueChange={(value: "Percentage" | "Fixed") => setNewDiscount({ ...newDiscount, type: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Percentage">Percentage</SelectItem>
                    <SelectItem value="Fixed">Fixed Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="value" className="text-right">
                  Value
                </Label>
                <Input
                  id="value"
                  type="number"
                  value={newDiscount.value}
                  onChange={(e) => setNewDiscount({ ...newDiscount, value: Number(e.target.value) })}
                  className="col-span-3"
                  placeholder={newDiscount.type === "Percentage" ? "20" : "10"}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="code" className="text-right">
                  Code
                </Label>
                <Input
                  id="code"
                  value={newDiscount.code}
                  onChange={(e) => setNewDiscount({ ...newDiscount, code: e.target.value.toUpperCase() })}
                  className="col-span-3"
                  placeholder="DISCOUNT20"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="validUntil" className="text-right">
                  Valid Until
                </Label>
                <Input
                  id="validUntil"
                  type="date"
                  value={newDiscount.validUntil}
                  onChange={(e) => setNewDiscount({ ...newDiscount, validUntil: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select
                  value={newDiscount.status}
                  onValueChange={(value: Discount["status"]) => setNewDiscount({ ...newDiscount, status: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddDiscount}>Add Discount</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Active Discounts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {discounts.map((discount) => (
              <Card key={discount.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{discount.name}</CardTitle>
                    <Select
                      value={discount.status}
                      onValueChange={(value: Discount["status"]) => handleStatusChange(discount.id, value)}
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                        <SelectItem value="Expired">Expired</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="text-sm text-muted-foreground">Code: {discount.code}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Percent className="h-4 w-4 mr-2 text-muted-foreground" />
                      {discount.type === "Percentage" ? `${discount.value}%` : `$${discount.value}`}
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      Valid until {discount.validUntil}
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <Dialog open={isEditDialogOpen && editingDiscount?.id === discount.id} onOpenChange={(open) => {
                      if (!open) {
                        setIsEditDialogOpen(false);
                        setEditingDiscount(null);
                      }
                    }}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(discount)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Edit Discount</DialogTitle>
                        </DialogHeader>
                        {editingDiscount && (
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-name" className="text-right">
                                Name
                              </Label>
                              <Input
                                id="edit-name"
                                value={editingDiscount.name}
                                onChange={(e) => setEditingDiscount({ ...editingDiscount, name: e.target.value })}
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-type" className="text-right">
                                Type
                              </Label>
                              <Select
                                value={editingDiscount.type}
                                onValueChange={(value: "Percentage" | "Fixed") => setEditingDiscount({ ...editingDiscount, type: value })}
                              >
                                <SelectTrigger className="col-span-3">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Percentage">Percentage</SelectItem>
                                  <SelectItem value="Fixed">Fixed Amount</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-value" className="text-right">
                                Value
                              </Label>
                              <Input
                                id="edit-value"
                                type="number"
                                value={editingDiscount.value}
                                onChange={(e) => setEditingDiscount({ ...editingDiscount, value: Number(e.target.value) })}
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-code" className="text-right">
                                Code
                              </Label>
                              <Input
                                id="edit-code"
                                value={editingDiscount.code}
                                onChange={(e) => setEditingDiscount({ ...editingDiscount, code: e.target.value.toUpperCase() })}
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-validUntil" className="text-right">
                                Valid Until
                              </Label>
                              <Input
                                id="edit-validUntil"
                                type="date"
                                value={editingDiscount.validUntil}
                                onChange={(e) => setEditingDiscount({ ...editingDiscount, validUntil: e.target.value })}
                                className="col-span-3"
                              />
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
                            This action cannot be undone. This will permanently delete the discount "{discount.name}".
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(discount.id)} className="bg-red-600 hover:bg-red-700">
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}