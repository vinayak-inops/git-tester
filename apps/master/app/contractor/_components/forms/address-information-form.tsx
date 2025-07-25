"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Input } from "@repo/ui/components/ui/input"
import { Label } from "@repo/ui/components/ui/label"
import { Separator } from "@repo/ui/components/ui/separator"
import { MapPin } from "lucide-react"

interface AddressInformationFormProps {
  formData: {
    localAddressLine1: string
    localAddressLine2: string
    localCountry: string
    localState: string
    localCity: string
    localDistrict: string
    localPincode: string
    localContactNumber: string
    corporateAddressLine1: string
    corporateAddressLine2: string
    corporateCountry: string
    corporateState: string
    corporateCity: string
    corporateDistrict: string
    corporatePincode: string
    corporateContactNumber: string
  }
  onFormDataChange: (data: Partial<AddressInformationFormProps['formData']>) => void
}

export function AddressInformationForm({ formData, onFormDataChange }: AddressInformationFormProps) {
  const handleInputChange = (field: string, value: string) => {
    onFormDataChange({ [field]: value })
  }

  return (
    <Card className="rounded-2xl border-0 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-[#007AFF] to-[#0056CC] text-white rounded-t-2xl">
        <CardTitle className="flex items-center space-x-3 text-xl">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
            <MapPin className="w-6 h-6" />
          </div>
          <span>Address Information</span>
        </CardTitle>
        <CardDescription className="text-blue-100">Local and corporate address details</CardDescription>
      </CardHeader>
      <CardContent className="p-8 space-y-8">
        {/* Local Address */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Local Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="localAddressLine1" className="text-sm font-medium text-gray-700">
                Address Line 1 *
              </Label>
              <Input
                id="localAddressLine1"
                value={formData.localAddressLine1}
                onChange={(e) => handleInputChange("localAddressLine1", e.target.value)}
                className="h-12 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-xl"
                placeholder="Enter address line 1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="localAddressLine2" className="text-sm font-medium text-gray-700">
                Address Line 2
              </Label>
              <Input
                id="localAddressLine2"
                value={formData.localAddressLine2}
                onChange={(e) => handleInputChange("localAddressLine2", e.target.value)}
                className="h-12 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-xl"
                placeholder="Enter address line 2"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="localCountry" className="text-sm font-medium text-gray-700">
                Country *
              </Label>
              <Input
                id="localCountry"
                value={formData.localCountry}
                onChange={(e) => handleInputChange("localCountry", e.target.value)}
                className="h-12 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-xl"
                placeholder="Enter country"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="localState" className="text-sm font-medium text-gray-700">
                State *
              </Label>
              <Input
                id="localState"
                value={formData.localState}
                onChange={(e) => handleInputChange("localState", e.target.value)}
                className="h-12 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-xl"
                placeholder="Enter state"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="localCity" className="text-sm font-medium text-gray-700">
                City *
              </Label>
              <Input
                id="localCity"
                value={formData.localCity}
                onChange={(e) => handleInputChange("localCity", e.target.value)}
                className="h-12 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-xl"
                placeholder="Enter city"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="localDistrict" className="text-sm font-medium text-gray-700">
                District
              </Label>
              <Input
                id="localDistrict"
                value={formData.localDistrict}
                onChange={(e) => handleInputChange("localDistrict", e.target.value)}
                className="h-12 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-xl"
                placeholder="Enter district"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="localPincode" className="text-sm font-medium text-gray-700">
                Pincode *
              </Label>
              <Input
                id="localPincode"
                value={formData.localPincode}
                onChange={(e) => handleInputChange("localPincode", e.target.value)}
                className="h-12 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-xl"
                placeholder="Enter pincode"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="localContactNumber" className="text-sm font-medium text-gray-700">
                Contact Number
              </Label>
              <Input
                id="localContactNumber"
                value={formData.localContactNumber}
                onChange={(e) => handleInputChange("localContactNumber", e.target.value)}
                className="h-12 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-xl"
                placeholder="Enter contact number"
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Corporate Address */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
            Corporate Address
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="corporateAddressLine1" className="text-sm font-medium text-gray-700">
                Address Line 1 *
              </Label>
              <Input
                id="corporateAddressLine1"
                value={formData.corporateAddressLine1}
                onChange={(e) => handleInputChange("corporateAddressLine1", e.target.value)}
                className="h-12 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-xl"
                placeholder="Enter address line 1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="corporateAddressLine2" className="text-sm font-medium text-gray-700">
                Address Line 2
              </Label>
              <Input
                id="corporateAddressLine2"
                value={formData.corporateAddressLine2}
                onChange={(e) => handleInputChange("corporateAddressLine2", e.target.value)}
                className="h-12 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-xl"
                placeholder="Enter address line 2"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="corporateCountry" className="text-sm font-medium text-gray-700">
                Country *
              </Label>
              <Input
                id="corporateCountry"
                value={formData.corporateCountry}
                onChange={(e) => handleInputChange("corporateCountry", e.target.value)}
                className="h-12 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-xl"
                placeholder="Enter country"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="corporateState" className="text-sm font-medium text-gray-700">
                State *
              </Label>
              <Input
                id="corporateState"
                value={formData.corporateState}
                onChange={(e) => handleInputChange("corporateState", e.target.value)}
                className="h-12 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-xl"
                placeholder="Enter state"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="corporateCity" className="text-sm font-medium text-gray-700">
                City *
              </Label>
              <Input
                id="corporateCity"
                value={formData.corporateCity}
                onChange={(e) => handleInputChange("corporateCity", e.target.value)}
                className="h-12 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-xl"
                placeholder="Enter city"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="corporateDistrict" className="text-sm font-medium text-gray-700">
                District
              </Label>
              <Input
                id="corporateDistrict"
                value={formData.corporateDistrict}
                onChange={(e) => handleInputChange("corporateDistrict", e.target.value)}
                className="h-12 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-xl"
                placeholder="Enter district"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="corporatePincode" className="text-sm font-medium text-gray-700">
                Pincode *
              </Label>
              <Input
                id="corporatePincode"
                value={formData.corporatePincode}
                onChange={(e) => handleInputChange("corporatePincode", e.target.value)}
                className="h-12 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-xl"
                placeholder="Enter pincode"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="corporateContactNumber" className="text-sm font-medium text-gray-700">
                Contact Number
              </Label>
              <Input
                id="corporateContactNumber"
                value={formData.corporateContactNumber}
                onChange={(e) => handleInputChange("corporateContactNumber", e.target.value)}
                className="h-12 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-xl"
                placeholder="Enter contact number"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 