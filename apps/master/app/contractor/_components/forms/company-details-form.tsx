"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Input } from "@repo/ui/components/ui/input"
import { Label } from "@repo/ui/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/ui/select"
import { Separator } from "@repo/ui/components/ui/separator"
import { Building2 } from "lucide-react"

interface CompanyDetailsFormProps {
  formData: {
    typeOfCompany: string
    workTypeCode: string
    workTypeTitle: string
    areaOfWorkCode: string
    areaOfWorkTitle: string
  }
  onFormDataChange: (data: Partial<CompanyDetailsFormProps['formData']>) => void
}

export function CompanyDetailsForm({ formData, onFormDataChange }: CompanyDetailsFormProps) {
  const handleInputChange = (field: string, value: any) => {
    onFormDataChange({ [field]: value })
  }

  return (
    <Card className="rounded-2xl border-0 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-[#007AFF] to-[#0056CC] text-white rounded-t-2xl">
        <CardTitle className="flex items-center space-x-3 text-xl">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
            <Building2 className="w-6 h-6" />
          </div>
          <span>Company Details</span>
        </CardTitle>
        <CardDescription className="text-blue-100">
          Company type, work classification, and business details
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8 space-y-8">
        {/* Company Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
            Company Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="typeOfCompany" className="text-sm font-medium text-gray-700">
                Type of Company *
              </Label>
              <Select
                value={formData.typeOfCompany}
                onValueChange={(value) => handleInputChange("typeOfCompany", value)}
              >
                <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-xl">
                  <SelectValue placeholder="Select company type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Proprietorship">Proprietorship</SelectItem>
                  <SelectItem value="Partnership">Partnership</SelectItem>
                  <SelectItem value="Private Limited">Private Limited</SelectItem>
                  <SelectItem value="Public Limited">Public Limited</SelectItem>
                  <SelectItem value="LLP">LLP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Separator />

        {/* Work Type */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Work Type</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="workTypeCode" className="text-sm font-medium text-gray-700">
                Work Type Code *
              </Label>
              <Input
                id="workTypeCode"
                value={formData.workTypeCode}
                onChange={(e) => handleInputChange("workTypeCode", e.target.value)}
                className="h-12 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-xl"
                placeholder="Enter work type code"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="workTypeTitle" className="text-sm font-medium text-gray-700">
                Work Type Title *
              </Label>
              <Input
                id="workTypeTitle"
                value={formData.workTypeTitle}
                onChange={(e) => handleInputChange("workTypeTitle", e.target.value)}
                className="h-12 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-xl"
                placeholder="Enter work type title"
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Area of Work */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Area of Work</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="areaOfWorkCode" className="text-sm font-medium text-gray-700">
                Area of Work Code *
              </Label>
              <Input
                id="areaOfWorkCode"
                value={formData.areaOfWorkCode}
                onChange={(e) => handleInputChange("areaOfWorkCode", e.target.value)}
                className="h-12 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-xl"
                placeholder="Enter area of work code"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="areaOfWorkTitle" className="text-sm font-medium text-gray-700">
                Area of Work Title *
              </Label>
              <Input
                id="areaOfWorkTitle"
                value={formData.areaOfWorkTitle}
                onChange={(e) => handleInputChange("areaOfWorkTitle", e.target.value)}
                className="h-12 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-xl"
                placeholder="Enter area of work title"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 