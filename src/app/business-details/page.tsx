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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Business Details</h1>
          <p className="text-muted-foreground mt-1">Manage your salon's information and settings.</p>
        </div>
        {isSaved && (
          <div className="flex items-center text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950 px-4 py-2 rounded-full border border-green-200 dark:border-green-800">
            <Check className="h-4 w-4 mr-2" />
            <span className="font-medium">Changes saved successfully!</span>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="businessName" className="font-semibold">Business Name</Label>
              <Input
                id="businessName"
                value={businessDetails.businessName}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
                className="border-gray-300 dark:border-gray-600"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="font-semibold">Description</Label>
              <Textarea
                id="description"
                value={businessDetails.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="border-gray-300 dark:border-gray-600 min-h-24"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category" className="font-semibold">Category</Label>
              <Input
                id="category"
                value={businessDetails.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="border-gray-300 dark:border-gray-600"
              />
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-lg font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-2">
              <MapPin className="h-5 w-5 text-pink-600 dark:text-pink-400 flex-shrink-0 mt-2" />
              <div className="space-y-2 flex-1">
                <Label htmlFor="address" className="font-semibold">Address</Label>
                <Input
                  id="address"
                  value={businessDetails.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="border-gray-300 dark:border-gray-600"
                />
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <Phone className="h-5 w-5 text-pink-600 dark:text-pink-400 flex-shrink-0 mt-2" />
              <div className="space-y-2 flex-1">
                <Label htmlFor="phone" className="font-semibold">Phone</Label>
                <Input
                  id="phone"
                  value={businessDetails.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="border-gray-300 dark:border-gray-600"
                />
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <Mail className="h-5 w-5 text-pink-600 dark:text-pink-400 flex-shrink-0 mt-2" />
              <div className="space-y-2 flex-1">
                <Label htmlFor="email" className="font-semibold">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={businessDetails.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="border-gray-300 dark:border-gray-600"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-lg font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Operating Hours</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
              <div className="space-y-2 flex-1">
                <Label className="font-semibold">Monday - Friday</Label>
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