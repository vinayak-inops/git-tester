"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Input } from "@repo/ui/components/ui/input"
import { Label } from "@repo/ui/components/ui/label"
import { Separator } from "@repo/ui/components/ui/separator"
import { Settings } from "lucide-react"

interface AuditStatusFormProps {
  formData: {
    createdBy: string
    createdOn: string
    updatedBy: string
    updatedOn: string
  }
  onFormDataChange: (data: Partial<AuditStatusFormProps['formData']>) => void
}

export function AuditStatusForm({ formData, onFormDataChange }: AuditStatusFormProps) {
  const handleInputChange = (field: string, value: string) => {
    onFormDataChange({ [field]: value })
  }

  return (
    <Card className="rounded-2xl border-0 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-[#B3D9FF] to-[#87CEEB] text-white rounded-t-2xl">
        <CardTitle className="flex items-center space-x-3 text-xl">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
            <Settings className="w-6 h-6" />
          </div>
          <span>Audit & Status</span>
        </CardTitle>
        <CardDescription className="text-blue-100">Audit trail and system status information</CardDescription>
      </CardHeader>
      <CardContent className="p-8 space-y-8">
        {/* Audit Trail */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Audit Trail</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="createdBy" className="text-sm font-medium text-gray-700">
                Created By
              </Label>
              <Input
                id="createdBy"
                value={formData.createdBy}
                onChange={(e) => handleInputChange("createdBy", e.target.value)}
                className="h-12 border-2 border-gray-200 focus:border-[#6BB6FF] focus:ring-[#6BB6FF]/20 rounded-xl"
                placeholder="Enter creator ID"
                readOnly
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="createdOn" className="text-sm font-medium text-gray-700">
                Created On
              </Label>
              <Input
                id="createdOn"
                type="date"
                value={formData.createdOn}
                onChange={(e) => handleInputChange("createdOn", e.target.value)}
                className="h-12 border-2 border-gray-200 focus:border-[#6BB6FF] focus:ring-[#6BB6FF]/20 rounded-xl"
                readOnly
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="updatedBy" className="text-sm font-medium text-gray-700">
                Updated By
              </Label>
              <Input
                id="updatedBy"
                value={formData.updatedBy}
                onChange={(e) => handleInputChange("updatedBy", e.target.value)}
                className="h-12 border-2 border-gray-200 focus:border-[#6BB6FF] focus:ring-[#6BB6FF]/20 rounded-xl"
                placeholder="Enter updater ID"
                readOnly
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="updatedOn" className="text-sm font-medium text-gray-700">
                Updated On
              </Label>
              <Input
                id="updatedOn"
                type="date"
                value={formData.updatedOn}
                onChange={(e) => handleInputChange("updatedOn", e.target.value)}
                className="h-12 border-2 border-gray-200 focus:border-[#6BB6FF] focus:ring-[#6BB6FF]/20 rounded-xl"
                readOnly
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 