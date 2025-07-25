"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Input } from "@repo/ui/components/ui/input"
import { Label } from "@repo/ui/components/ui/label"
import { Switch } from "@repo/ui/components/ui/switch"
import { Separator } from "@repo/ui/components/ui/separator"
import { User } from "lucide-react"

interface BasicInformationFormProps {
  formData: {
    contractorName: string
    contractorCode: string
    isActive: boolean
    isDeleted: boolean
    ownerName: string
    ownerContactNo: string
    ownerEmailId: string
    contactPersonName: string
    contactPersonContactNo: string
    contactPersonEmailId: string
    serviceSince: string
    typeOfCompany: string
    workTypeCode: string
    workTypeTitle: string
    areaOfWorkCode: string
    areaOfWorkTitle: string
    restricted: boolean
    contractorImage: string
    individualContractor: boolean
    birthDate: string
    fatherName: string
    workLocation: string
    organizationCode: string
  }
  onFormDataChange: (data: Partial<BasicInformationFormProps['formData']>) => void
}

export function BasicInformationForm({ formData, onFormDataChange }: BasicInformationFormProps) {
  const handleInputChange = (field: string, value: any) => {
    onFormDataChange({ [field]: value })
  }

  return (
    <Card className="rounded-2xl border-0 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-2xl">
        <CardTitle className="flex items-center space-x-3 text-xl">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
            <User className="w-6 h-6" />
          </div>
          <span>Basic Information</span>
        </CardTitle>
        <CardDescription className="text-blue-100">
          Basic contractor details and identification information
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8 space-y-8">
        {/* Contractor Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
            Contractor Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="contractorName" className="text-sm font-medium text-gray-700">
                Contractor Name *
              </Label>
              <Input
                id="contractorName"
                value={formData.contractorName}
                onChange={(e) => handleInputChange("contractorName", e.target.value)}
                className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                placeholder="Enter contractor name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contractorCode" className="text-sm font-medium text-gray-700">
                Contractor Code *
              </Label>
              <Input
                id="contractorCode"
                value={formData.contractorCode}
                onChange={(e) => handleInputChange("contractorCode", e.target.value)}
                className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                placeholder="Enter contractor code"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="organizationCode" className="text-sm font-medium text-gray-700">
                Organization Code
              </Label>
              <Input
                id="organizationCode"
                value={formData.organizationCode}
                onChange={(e) => handleInputChange("organizationCode", e.target.value)}
                className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                placeholder="Enter organization code"
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Owner Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
            Owner Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="ownerName" className="text-sm font-medium text-gray-700">
                Owner Name *
              </Label>
              <Input
                id="ownerName"
                value={formData.ownerName}
                onChange={(e) => handleInputChange("ownerName", e.target.value)}
                className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                placeholder="Enter owner name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ownerContactNo" className="text-sm font-medium text-gray-700">
                Owner Contact Number *
              </Label>
              <Input
                id="ownerContactNo"
                value={formData.ownerContactNo}
                onChange={(e) => handleInputChange("ownerContactNo", e.target.value)}
                className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                placeholder="Enter owner contact number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ownerEmailId" className="text-sm font-medium text-gray-700">
                Owner Email ID *
              </Label>
              <Input
                id="ownerEmailId"
                type="email"
                value={formData.ownerEmailId}
                onChange={(e) => handleInputChange("ownerEmailId", e.target.value)}
                className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                placeholder="Enter owner email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fatherName" className="text-sm font-medium text-gray-700">
                Father Name
              </Label>
              <Input
                id="fatherName"
                value={formData.fatherName}
                onChange={(e) => handleInputChange("fatherName", e.target.value)}
                className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                placeholder="Enter father name"
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Contact Person Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
            Contact Person Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="contactPersonName" className="text-sm font-medium text-gray-700">
                Contact Person Name *
              </Label>
              <Input
                id="contactPersonName"
                value={formData.contactPersonName}
                onChange={(e) => handleInputChange("contactPersonName", e.target.value)}
                className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                placeholder="Enter contact person name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPersonContactNo" className="text-sm font-medium text-gray-700">
                Contact Person Number *
              </Label>
              <Input
                id="contactPersonContactNo"
                value={formData.contactPersonContactNo}
                onChange={(e) => handleInputChange("contactPersonContactNo", e.target.value)}
                className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                placeholder="Enter contact person number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPersonEmailId" className="text-sm font-medium text-gray-700">
                Contact Person Email ID
              </Label>
              <Input
                id="contactPersonEmailId"
                type="email"
                value={formData.contactPersonEmailId}
                onChange={(e) => handleInputChange("contactPersonEmailId", e.target.value)}
                className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                placeholder="Enter contact person email"
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Additional Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
            Additional Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="serviceSince" className="text-sm font-medium text-gray-700">
                Service Since *
              </Label>
              <Input
                id="serviceSince"
                type="date"
                value={formData.serviceSince}
                onChange={(e) => handleInputChange("serviceSince", e.target.value)}
                className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthDate" className="text-sm font-medium text-gray-700">
                Birth Date
              </Label>
              <Input
                id="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={(e) => handleInputChange("birthDate", e.target.value)}
                className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="workLocation" className="text-sm font-medium text-gray-700">
                Work Location
              </Label>
              <Input
                id="workLocation"
                value={formData.workLocation}
                onChange={(e) => handleInputChange("workLocation", e.target.value)}
                className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                placeholder="Enter work location"
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Status Flags */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Status Flags</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                id: "isActive",
                label: "Is Active",
                description: "Contractor is currently active",
                key: "isActive",
              },
              {
                id: "individualContractor",
                label: "Individual Contractor",
                description: "This is an individual contractor",
                key: "individualContractor",
              },
              {
                id: "restricted",
                label: "Restricted",
                description: "Contractor has restrictions",
                key: "restricted",
              },
              {
                id: "isDeleted",
                label: "Is Deleted",
                description: "Contractor is marked as deleted",
                key: "isDeleted",
              },
            ].map((flag) => (
              <div
                key={flag.id}
                className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl border border-blue-200"
              >
                <div className="space-y-1">
                  <Label htmlFor={flag.id} className="text-sm font-semibold text-gray-900">
                    {flag.label}
                  </Label>
                  <p className="text-xs text-blue-700">{flag.description}</p>
                </div>
                <Switch
                  id={flag.id}
                  checked={formData[flag.key as keyof typeof formData] as boolean}
                  onCheckedChange={(checked) => handleInputChange(flag.key, checked)}
                />
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Contractor Image */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
            Contractor Image
          </h3>
          <div className="space-y-2">
            <Label htmlFor="contractorImage" className="text-sm font-medium text-gray-700">
              Contractor Image
            </Label>
            <Input
              id="contractorImage"
              value={formData.contractorImage}
              onChange={(e) => handleInputChange("contractorImage", e.target.value)}
              className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl max-w-md"
              placeholder="Enter image file name"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 