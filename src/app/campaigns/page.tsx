"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Plus, Edit, Trash2, Calendar, Users, Target, Save } from "lucide-react";

interface Campaign {
  id: number;
  name: string;
  type: string;
  status: "Active" | "Completed" | "Scheduled" | "Paused";
  startDate: string;
  endDate: string;
  reach: number;
  conversions: number;
  description?: string;
}

const initialCampaigns: Campaign[] = [
  {
    id: 1,
    name: "Spring Refresh Campaign",
    type: "Email Marketing",
    status: "Active",
    startDate: "2024-03-01",
    endDate: "2024-03-31",
    reach: 1250,
    conversions: 45,
    description: "Promote spring services and packages",
  },
  {
    id: 2,
    name: "Loyalty Program Launch",
    type: "Social Media",
    status: "Active",
    startDate: "2024-02-15",
    endDate: "2024-04-15",
    reach: 2100,
    conversions: 78,
    description: "Launch new customer loyalty program",
  },
  {
    id: 3,
    name: "New Service Promotion",
    type: "In-Store",
    status: "Completed",
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    reach: 500,
    conversions: 23,
    description: "Promote new facial treatment services",
  },
  {
    id: 4,
    name: "Holiday Special",
    type: "Multi-Channel",
    status: "Scheduled",
    startDate: "2024-12-01",
    endDate: "2024-12-31",
    reach: 0,
    conversions: 0,
    description: "Year-end holiday promotions and packages",
  },
];

const campaignTypes = ["Email Marketing", "Social Media", "In-Store", "Multi-Channel", "SMS", "Website"];

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newCampaign, setNewCampaign] = useState<Partial<Campaign>>({
    name: "",
    type: "",
    status: "Scheduled",
    startDate: "",
    endDate: "",
    reach: 0,
    conversions: 0,
    description: "",
  });

  const handleEdit = (campaign: Campaign) => {
    setEditingCampaign({ ...campaign });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (editingCampaign) {
      setCampaigns(campaigns.map(c => c.id === editingCampaign.id ? editingCampaign : c));
      setIsEditDialogOpen(false);
      setEditingCampaign(null);
    }
  };

  const handleDelete = (id: number) => {
    setCampaigns(campaigns.filter(c => c.id !== id));
  };

  const handleStatusChange = (id: number, status: Campaign["status"]) => {
    setCampaigns(campaigns.map(c => c.id === id ? { ...c, status } : c));
  };

  const handleAddCampaign = () => {
    if (newCampaign.name && newCampaign.type && newCampaign.startDate && newCampaign.endDate) {
      const campaign: Campaign = {
        id: Math.max(...campaigns.map(c => c.id)) + 1,
        name: newCampaign.name,
        type: newCampaign.type,
        status: newCampaign.status as Campaign["status"],
        startDate: newCampaign.startDate,
        endDate: newCampaign.endDate,
        reach: newCampaign.reach || 0,
        conversions: newCampaign.conversions || 0,
        description: newCampaign.description,
      };
      setCampaigns([...campaigns, campaign]);
      setNewCampaign({
        name: "",
        type: "",
        status: "Scheduled",
        startDate: "",
        endDate: "",
        reach: 0,
        conversions: 0,
        description: "",
      });
      setIsAddDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Campaigns</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Campaign
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Campaign</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                  className="col-span-3"
                  placeholder="Campaign name"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select
                  value={newCampaign.type}
                  onValueChange={(value) => setNewCampaign({ ...newCampaign, type: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {campaignTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="startDate" className="text-right">
                  Start Date
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={newCampaign.startDate}
                  onChange={(e) => setNewCampaign({ ...newCampaign, startDate: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="endDate" className="text-right">
                  End Date
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={newCampaign.endDate}
                  onChange={(e) => setNewCampaign({ ...newCampaign, endDate: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select
                  value={newCampaign.status}
                  onValueChange={(value: Campaign["status"]) => setNewCampaign({ ...newCampaign, status: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Scheduled">Scheduled</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Paused">Paused</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={newCampaign.description}
                  onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
                  className="col-span-3"
                  placeholder="Campaign description"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddCampaign}>Create Campaign</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {campaigns.map((campaign) => (
          <Card key={campaign.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{campaign.name}</CardTitle>
                <Select
                  value={campaign.status}
                  onValueChange={(value: Campaign["status"]) => handleStatusChange(campaign.id, value)}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Scheduled">Scheduled</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Paused">Paused</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-sm text-muted-foreground">{campaign.type}</p>
              {campaign.description && (
                <p className="text-sm text-muted-foreground mt-1">{campaign.description}</p>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  {campaign.startDate} - {campaign.endDate}
                </div>
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  Reach: {campaign.reach.toLocaleString()}
                </div>
                <div className="flex items-center text-sm">
                  <Target className="h-4 w-4 mr-2 text-muted-foreground" />
                  Conversions: {campaign.conversions}
                </div>
              </div>
              <div className="flex space-x-2 mt-4">
                <Dialog open={isEditDialogOpen && editingCampaign?.id === campaign.id} onOpenChange={(open) => {
                  if (!open) {
                    setIsEditDialogOpen(false);
                    setEditingCampaign(null);
                  }
                }}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(campaign)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Edit Campaign</DialogTitle>
                    </DialogHeader>
                    {editingCampaign && (
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-name" className="text-right">
                            Name
                          </Label>
                          <Input
                            id="edit-name"
                            value={editingCampaign.name}
                            onChange={(e) => setEditingCampaign({ ...editingCampaign, name: e.target.value })}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-type" className="text-right">
                            Type
                          </Label>
                          <Select
                            value={editingCampaign.type}
                            onValueChange={(value) => setEditingCampaign({ ...editingCampaign, type: value })}
                          >
                            <SelectTrigger className="col-span-3">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {campaignTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-startDate" className="text-right">
                            Start Date
                          </Label>
                          <Input
                            id="edit-startDate"
                            type="date"
                            value={editingCampaign.startDate}
                            onChange={(e) => setEditingCampaign({ ...editingCampaign, startDate: e.target.value })}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-endDate" className="text-right">
                            End Date
                          </Label>
                          <Input
                            id="edit-endDate"
                            type="date"
                            value={editingCampaign.endDate}
                            onChange={(e) => setEditingCampaign({ ...editingCampaign, endDate: e.target.value })}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-reach" className="text-right">
                            Reach
                          </Label>
                          <Input
                            id="edit-reach"
                            type="number"
                            value={editingCampaign.reach}
                            onChange={(e) => setEditingCampaign({ ...editingCampaign, reach: Number(e.target.value) })}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-conversions" className="text-right">
                            Conversions
                          </Label>
                          <Input
                            id="edit-conversions"
                            type="number"
                            value={editingCampaign.conversions}
                            onChange={(e) => setEditingCampaign({ ...editingCampaign, conversions: Number(e.target.value) })}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-description" className="text-right">
                            Description
                          </Label>
                          <Textarea
                            id="edit-description"
                            value={editingCampaign.description || ""}
                            onChange={(e) => setEditingCampaign({ ...editingCampaign, description: e.target.value })}
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
                        This action cannot be undone. This will permanently delete the campaign "{campaign.name}".
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(campaign.id)} className="bg-red-600 hover:bg-red-700">
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
    </div>
  );
}