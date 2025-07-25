"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Input } from "@repo/ui/components/ui/input"
import { Label } from "@repo/ui/components/ui/label"
import { Button } from "@repo/ui/components/ui/button"
import { Separator } from "@repo/ui/components/ui/separator"
import { Shield, Plus, Trash2 } from "lucide-react"

interface License {
  licenseNo: string
  licenseFromDate: string
  licenseToDate: string
  workmen: number
  issuedOn: string
  natureOfWork: string
}

interface ImportantNumber {
  documentTypeCode: string
  documentTypeTitle: string
  identificatinNumber: string
}

interface LicensesPermitsFormProps {
  licenses: License[]
  importantNumbers: ImportantNumber[]
  onLicensesChange: (licenses: License[]) => void
  onImportantNumbersChange: (numbers: ImportantNumber[]) => void
}

export function LicensesPermitsForm({ 
  licenses, 
  importantNumbers, 
  onLicensesChange, 
  onImportantNumbersChange 
}: LicensesPermitsFormProps) {
  const addLicense = () => {
    onLicensesChange([
      ...licenses,
      {
        licenseNo: "",
        licenseFromDate: "",
        licenseToDate: "",
        workmen: 0,
        issuedOn: "",
        natureOfWork: "",
      },
    ])
  }

  const removeLicense = (index: number) => {
    onLicensesChange(licenses.filter((_, i) => i !== index))
  }

  const updateLicense = (index: number, field: string, value: any) => {
    const updatedLicenses = [...licenses]
    updatedLicenses[index] = { ...updatedLicenses[index], [field]: value }
    onLicensesChange(updatedLicenses)
  }

  const addImportantNumber = () => {
    onImportantNumbersChange([
      ...importantNumbers,
      { documentTypeCode: "", documentTypeTitle: "", identificatinNumber: "" },
    ])
  }

  const removeImportantNumber = (index: number) => {
    onImportantNumbersChange(importantNumbers.filter((_, i) => i !== index))
  }

  const updateImportantNumber = (index: number, field: string, value: string) => {
    const updated = [...importantNumbers]
    updated[index] = { ...updated[index], [field]: value }
    onImportantNumbersChange(updated)
  }

  return (
    <Card className="rounded-2xl border-0 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-[#B3D9FF] to-[#87CEEB] text-white rounded-t-2xl">
        <CardTitle className="flex items-center space-x-3 text-xl">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>
          <span>Licenses & Permits</span>
        </CardTitle>
        <CardDescription className="text-blue-100">License information and permit details</CardDescription>
      </CardHeader>
      <CardContent className="p-8 space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Licenses</h3>
            <Button onClick={addLicense} className="bg-[#6BB6FF] hover:bg-[#4A90E2]">
              <Plus className="w-4 h-4 mr-2" />
              Add License
            </Button>
          </div>

          {licenses.map((license, index) => (
            <div key={index} className="p-6 border border-gray-200 rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-md font-medium text-gray-800">License {index + 1}</h4>
                <Button
                  onClick={() => removeLicense(index)}
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-300 hover:bg-red-50 bg-transparent"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">License Number</Label>
                  <Input
                    value={license.licenseNo}
                    onChange={(e) => updateLicense(index, "licenseNo", e.target.value)}
                    className="h-10 border-2 border-gray-200 focus:border-[#6BB6FF] focus:ring-[#6BB6FF]/20 rounded-lg"
                    placeholder="Enter license number"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">License From Date</Label>
                  <Input
                    type="date"
                    value={license.licenseFromDate}
                    onChange={(e) => updateLicense(index, "licenseFromDate", e.target.value)}
                    className="h-10 border-2 border-gray-200 focus:border-[#6BB6FF] focus:ring-[#6BB6FF]/20 rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">License To Date</Label>
                  <Input
                    type="date"
                    value={license.licenseToDate}
                    onChange={(e) => updateLicense(index, "licenseToDate", e.target.value)}
                    className="h-10 border-2 border-gray-200 focus:border-[#6BB6FF] focus:ring-[#6BB6FF]/20 rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Number of Workmen</Label>
                  <Input
                    type="number"
                    value={license.workmen}
                    onChange={(e) => updateLicense(index, "workmen", Number.parseInt(e.target.value))}
                    className="h-10 border-2 border-gray-200 focus:border-[#6BB6FF] focus:ring-[#6BB6FF]/20 rounded-lg"
                    placeholder="Enter number of workmen"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Issued On</Label>
                  <Input
                    type="date"
                    value={license.issuedOn}
                    onChange={(e) => updateLicense(index, "issuedOn", e.target.value)}
                    className="h-10 border-2 border-gray-200 focus:border-[#6BB6FF] focus:ring-[#6BB6FF]/20 rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Nature of Work</Label>
                  <Input
                    value={license.natureOfWork}
                    onChange={(e) => updateLicense(index, "natureOfWork", e.target.value)}
                    className="h-10 border-2 border-gray-200 focus:border-[#6BB6FF] focus:ring-[#6BB6FF]/20 rounded-lg"
                    placeholder="Enter nature of work"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        {/* Important Numbers */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Important Numbers</h3>
            <Button onClick={addImportantNumber} className="bg-[#6BB6FF] hover:bg-[#4A90E2]">
              <Plus className="w-4 h-4 mr-2" />
              Add Number
            </Button>
          </div>

          {importantNumbers.map((number, index) => (
            <div key={index} className="p-6 border border-gray-200 rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-md font-medium text-gray-800">Document {index + 1}</h4>
                <Button
                  onClick={() => removeImportantNumber(index)}
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-300 hover:bg-red-50 bg-transparent"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Document Type Code</Label>
                  <Input
                    value={number.documentTypeCode}
                    onChange={(e) => updateImportantNumber(index, "documentTypeCode", e.target.value)}
                    className="h-10 border-2 border-gray-200 focus:border-[#6BB6FF] focus:ring-[#6BB6FF]/20 rounded-lg"
                    placeholder="Enter document type code"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Document Type Title</Label>
                  <Input
                    value={number.documentTypeTitle}
                    onChange={(e) => updateImportantNumber(index, "documentTypeTitle", e.target.value)}
                    className="h-10 border-2 border-gray-200 focus:border-[#6BB6FF] focus:ring-[#6BB6FF]/20 rounded-lg"
                    placeholder="Enter document type title"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Identification Number</Label>
                  <Input
                    value={number.identificatinNumber}
                    onChange={(e) => updateImportantNumber(index, "identificatinNumber", e.target.value)}
                    className="h-10 border-2 border-gray-200 focus:border-[#6BB6FF] focus:ring-[#6BB6FF]/20 rounded-lg"
                    placeholder="Enter identification number"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 