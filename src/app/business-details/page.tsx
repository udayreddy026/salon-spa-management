"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Save, Check } from "lucide-react";

interface BusinessDetails {
  businessName: string;
  description: string;
  category: string;
  address: string;
  phone: string;
  email: string;
  mondayFriday: string;
  saturday: string;
  sunday: string;
  website: string;
  facebook: string;
  instagram: string;
}

const initialBusinessDetails: BusinessDetails = {
  businessName: "Elegant Salon & Spa",
  description: "A premium salon and spa offering top-notch beauty services in a relaxing environment.",
  category: "Beauty & Wellness",
  address: "123 Beauty Street, City, State 12345",
  phone: "(555) 123-4567",
  email: "info@elegantsalon.com",
  mondayFriday: "9:00 AM - 8:00 PM",
  saturday: "8:00 AM - 6:00 PM",
  sunday: "Closed",
  website: "https://www.elegantsalon.com",
  facebook: "https://facebook.com/elegantsalon",
  instagram: "https://instagram.com/elegantsalon",
};

export default function BusinessDetails() {
  const [businessDetails, setBusinessDetails] = useState<BusinessDetails>(initialBusinessDetails);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    // In a real app, this would save to a backend
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleInputChange = (field: keyof BusinessDetails, value: string) => {
    setBusinessDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Business Details</h1>
        {isSaved && (
          <div className="flex items-center text-green-600">
            <Check className="h-4 w-4 mr-2" />
            Changes saved successfully!
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                value={businessDetails.businessName}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={businessDetails.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={businessDetails.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div className="space-y-2 flex-1">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={businessDetails.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <div className="space-y-2 flex-1">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={businessDetails.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div className="space-y-2 flex-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={businessDetails.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Operating Hours</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div className="space-y-2 flex-1">
                <Label>Monday - Friday</Label>
                <Input
                  value={businessDetails.mondayFriday}
                  onChange={(e) => handleInputChange('mondayFriday', e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div className="space-y-2 flex-1">
                <Label>Saturday</Label>
                <Input
                  value={businessDetails.saturday}
                  onChange={(e) => handleInputChange('saturday', e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div className="space-y-2 flex-1">
                <Label>Sunday</Label>
                <Input
                  value={businessDetails.sunday}
                  onChange={(e) => handleInputChange('sunday', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Social Media & Website</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={businessDetails.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="facebook">Facebook</Label>
              <Input
                id="facebook"
                value={businessDetails.facebook}
                onChange={(e) => handleInputChange('facebook', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                value={businessDetails.instagram}
                onChange={(e) => handleInputChange('instagram', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-end">
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}