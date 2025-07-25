"use client"

import type React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Input } from "@repo/ui/components/ui/input"
import { Label } from "@repo/ui/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/ui/select"
import { Separator } from "@repo/ui/components/ui/separator"
import { Button } from "@repo/ui/components/ui/button"
import { Building2, RotateCcw, ArrowRight, ArrowLeft, X } from "lucide-react"
import { useState } from "react"

// Zod Schema for validation
const organizationalStructureSchema = z.object({
  subsidiary: z.object({
    subsidiaryCode: z.string().min(1, "Subsidiary code is required"),
    subsidiaryName: z.string().min(2, "Subsidiary name must be at least 2 characters"),
  }),
  division: z.object({
    divisionCode: z.string().min(1, "Division code is required"),
    divisionName: z.string().min(2, "Division name must be at least 2 characters"),
  }),
  department: z.object({
    departmentCode: z.string().min(1, "Department code is required"),
    departmentName: z.string().min(2, "Department name must be at least 2 characters"),
  }),
  subDepartment: z.object({
    subDepartmentCode: z.string().optional(),
    subDepartmentName: z.string().optional(),
  }),
  section: z.object({
    sectionCode: z.string().optional(),
    sectionName: z.string().optional(),
  }),
})

type OrganizationalStructureData = z.infer<typeof organizationalStructureSchema>

interface OrganizationalStructureFormProps {
  formData: OrganizationalStructureData
  onFormDataChange: (data: Partial<OrganizationalStructureData>) => void
  onNextTab?: () => void
  onPreviousTab?: () => void
}

// Mock data for dropdowns - in real app, this would come from API
const subsidiaryOptions = [
  { code: "SUB001", name: "Subsidiary A" },
  { code: "SUB002", name: "Subsidiary B" },
  { code: "SUB003", name: "Subsidiary C" },
]

const divisionOptions = [
  { code: "DIV001", name: "Division A" },
  { code: "DIV002", name: "Division B" },
  { code: "DIV003", name: "Division C" },
]

const departmentOptions = [
  { code: "DEPT001", name: "Department A" },
  { code: "DEPT002", name: "Department B" },
  { code: "DEPT003", name: "Department C" },
]

const subDepartmentOptions = [
  { code: "SUBDEPT001", name: "Sub Department A" },
  { code: "SUBDEPT002", name: "Sub Department B" },
  { code: "SUBDEPT003", name: "Sub Department C" },
]

const sectionOptions = [
  { code: "SEC001", name: "Section A" },
  { code: "SEC002", name: "Section B" },
  { code: "SEC003", name: "Section C" },
]

export function OrganizationalStructureForm({ formData, onFormDataChange, onNextTab, onPreviousTab }: OrganizationalStructureFormProps) {
  const [showErrors, setShowErrors] = useState(false)

  const {
    register,
    formState: { errors, isValid },
    watch,
    setValue,
    trigger,
    reset,
  } = useForm<OrganizationalStructureData>({
    resolver: zodResolver(organizationalStructureSchema),
    defaultValues: {
      subsidiary: formData.subsidiary || { subsidiaryCode: "", subsidiaryName: "" },
      division: formData.division || { divisionCode: "", divisionName: "" },
      department: formData.department || { departmentCode: "", departmentName: "" },
      subDepartment: formData.subDepartment || { subDepartmentCode: "", subDepartmentName: "" },
      section: formData.section || { sectionCode: "", sectionName: "" },
    },
    mode: "onChange",
  })

  const watchedValues = watch()

  const handleCodeChange = (section: keyof OrganizationalStructureData, code: string) => {
    let name = ""
    
    // Find corresponding name based on selected code
    switch (section) {
      case "subsidiary":
        const subsidiary = subsidiaryOptions.find(opt => opt.code === code)
        name = subsidiary?.name || ""
        break
      case "division":
        const division = divisionOptions.find(opt => opt.code === code)
        name = division?.name || ""
        break
      case "department":
        const department = departmentOptions.find(opt => opt.code === code)
        name = department?.name || ""
        break
      case "subDepartment":
        const subDept = subDepartmentOptions.find(opt => opt.code === code)
        name = subDept?.name || ""
        break
      case "section":
        const section = sectionOptions.find(opt => opt.code === code)
        name = section?.name || ""
        break
    }

    // Update both code and name with proper type casting
    setValue(`${section}.${section}Code` as any, code)
    setValue(`${section}.${section}Name` as any, name)
    
    onFormDataChange({
      [section]: {
        ...formData[section],
        [`${section}Code`]: code,
        [`${section}Name`]: name,
      },
    })
  }

  const handleReset = () => {
    reset({
      subsidiary: { subsidiaryCode: "", subsidiaryName: "" },
      division: { divisionCode: "", divisionName: "" },
      department: { departmentCode: "", departmentName: "" },
      subDepartment: { subDepartmentCode: "", subDepartmentName: "" },
      section: { sectionCode: "", sectionName: "" },
    })
    setShowErrors(false)
    
    onFormDataChange({
      subsidiary: { subsidiaryCode: "", subsidiaryName: "" },
      division: { divisionCode: "", divisionName: "" },
      department: { departmentCode: "", departmentName: "" },
      subDepartment: { subDepartmentCode: "", subDepartmentName: "" },
      section: { sectionCode: "", sectionName: "" },
    })
  }

  const handleSaveAndContinue = async () => {
    setShowErrors(true)
    const isValid = await trigger()
    
    if (isValid) {
      if (onNextTab) {
        onNextTab()
      }
    } else {
      console.log("Form validation failed")
    }
  }

  return (
    <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/70 backdrop-blur-xl shadow-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-indigo-700/90"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">Organizational Structure</CardTitle>
                <CardDescription className="text-blue-100 text-base">
                  Define the organizational hierarchy and structure
                </CardDescription>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Primary Structure */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-600" />
              Primary Structure
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="group">
                <Label htmlFor="subsidiaryCode" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Subsidiary Code <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={watchedValues.subsidiary?.subsidiaryCode} 
                  onValueChange={(value) => handleCodeChange("subsidiary", value)}
                >
                  <SelectTrigger className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white ${
                    (showErrors && errors.subsidiary?.subsidiaryCode) 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                  }`}>
                    <SelectValue placeholder="Select Subsidiary Code" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-2 bg-white">
                    {subsidiaryOptions.map((option) => (
                      <SelectItem key={option.code} value={option.code}>
                        {option.code} - {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {showErrors && errors.subsidiary?.subsidiaryCode && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.subsidiary.subsidiaryCode.message}
                  </p>
                )}
              </div>

              <div className="group">
                <Label htmlFor="subsidiaryName" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Subsidiary Name <span className="text-red-500">*</span>
                </Label>
                <div className="h-10 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl text-blue-800 flex items-center font-medium shadow-sm">
                  {watchedValues.subsidiary?.subsidiaryName ? (
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {watchedValues.subsidiary.subsidiaryName}
                    </span>
                  ) : (
                    <span className="text-blue-600 italic">Will auto-fill from code</span>
                  )}
                </div>
                {showErrors && errors.subsidiary?.subsidiaryName && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.subsidiary.subsidiaryName.message}
                  </p>
                )}
              </div>

              <div className="group">
                <Label htmlFor="divisionCode" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Division Code <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={watchedValues.division?.divisionCode} 
                  onValueChange={(value) => handleCodeChange("division", value)}
                >
                  <SelectTrigger className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white ${
                    (showErrors && errors.division?.divisionCode) 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                  }`}>
                    <SelectValue placeholder="Select Division Code" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-2 bg-white">
                    {divisionOptions.map((option) => (
                      <SelectItem key={option.code} value={option.code}>
                        {option.code} - {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {showErrors && errors.division?.divisionCode && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.division.divisionCode.message}
                  </p>
                )}
              </div>

              <div className="group">
                <Label htmlFor="divisionName" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Division Name <span className="text-red-500">*</span>
                </Label>
                <div className="h-10 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl text-blue-800 flex items-center font-medium shadow-sm">
                  {watchedValues.division?.divisionName ? (
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {watchedValues.division.divisionName}
                    </span>
                  ) : (
                    <span className="text-blue-600 italic">Will auto-fill from code</span>
                  )}
                </div>
                {showErrors && errors.division?.divisionName && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.division.divisionName.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <Separator className="lg:col-span-3 my-2" />

          {/* Department Structure */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-600" />
              Department Structure
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="group">
                <Label htmlFor="departmentCode" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Department Code <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={watchedValues.department?.departmentCode} 
                  onValueChange={(value) => handleCodeChange("department", value)}
                >
                  <SelectTrigger className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white ${
                    (showErrors && errors.department?.departmentCode) 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                  }`}>
                    <SelectValue placeholder="Select Department Code" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-2 bg-white">
                    {departmentOptions.map((option) => (
                      <SelectItem key={option.code} value={option.code}>
                        {option.code} - {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {showErrors && errors.department?.departmentCode && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.department.departmentCode.message}
                  </p>
                )}
              </div>

              <div className="group">
                <Label htmlFor="departmentName" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Department Name <span className="text-red-500">*</span>
                </Label>
                <div className="h-10 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl text-blue-800 flex items-center font-medium shadow-sm">
                  {watchedValues.department?.departmentName ? (
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {watchedValues.department.departmentName}
                    </span>
                  ) : (
                    <span className="text-blue-600 italic">Will auto-fill from code</span>
                  )}
                </div>
                {showErrors && errors.department?.departmentName && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.department.departmentName.message}
                  </p>
                )}
              </div>

              <div className="group">
                <Label htmlFor="subDepartmentCode" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Sub Department Code
                </Label>
                <Select 
                  value={watchedValues.subDepartment?.subDepartmentCode} 
                  onValueChange={(value) => handleCodeChange("subDepartment", value)}
                >
                  <SelectTrigger className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white ${
                    (showErrors && errors.subDepartment?.subDepartmentCode) 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                  }`}>
                    <SelectValue placeholder="Select Sub Department Code" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-2 bg-white">
                    {subDepartmentOptions.map((option) => (
                      <SelectItem key={option.code} value={option.code}>
                        {option.code} - {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {showErrors && errors.subDepartment?.subDepartmentCode && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.subDepartment.subDepartmentCode.message}
                  </p>
                )}
              </div>

              <div className="group">
                <Label htmlFor="subDepartmentName" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Sub Department Name
                </Label>
                <div className="h-10 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl text-blue-800 flex items-center font-medium shadow-sm">
                  {watchedValues.subDepartment?.subDepartmentName ? (
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {watchedValues.subDepartment.subDepartmentName}
                    </span>
                  ) : (
                    <span className="text-blue-600 italic">Will auto-fill from code</span>
                  )}
                </div>
                {showErrors && errors.subDepartment?.subDepartmentName && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.subDepartment.subDepartmentName.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <Separator className="lg:col-span-3 my-2" />

          {/* Section Details */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-600" />
              Section Details
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="group">
                <Label htmlFor="sectionCode" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Section Code
                </Label>
                <Select 
                  value={watchedValues.section?.sectionCode} 
                  onValueChange={(value) => handleCodeChange("section", value)}
                >
                  <SelectTrigger className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white ${
                    (showErrors && errors.section?.sectionCode) 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                  }`}>
                    <SelectValue placeholder="Select Section Code" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-2 bg-white">
                    {sectionOptions.map((option) => (
                      <SelectItem key={option.code} value={option.code}>
                        {option.code} - {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {showErrors && errors.section?.sectionCode && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.section.sectionCode.message}
                  </p>
                )}
              </div>

              <div className="group">
                <Label htmlFor="sectionName" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Section Name
                </Label>
                <div className="h-10 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl text-blue-800 flex items-center font-medium shadow-sm">
                  {watchedValues.section?.sectionName ? (
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {watchedValues.section.sectionName}
                    </span>
                  ) : (
                    <span className="text-blue-600 italic">Will auto-fill from code</span>
                  )}
                </div>
                {showErrors && errors.section?.sectionName && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.section.sectionName.message}
                  </p>
                )}
              </div>

              <div className="group">
                <Label className="text-sm font-semibold text-gray-700 mb-2 block"></Label>
                <div className="h-10"></div>
              </div>

              <div className="group">
                <Label className="text-sm font-semibold text-gray-700 mb-2 block"></Label>
                <div className="h-10"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center gap-3">
            {onPreviousTab && (
              <Button
                type="button"
                variant="outline"
                onClick={onPreviousTab}
                className="px-6 py-3 h-12 rounded-xl border-2 border-gray-300 hover:bg-gray-50 bg-transparent text-gray-700 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            )}
            
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="px-6 py-3 h-12 rounded-xl border-2 border-gray-300 hover:bg-gray-50 bg-transparent text-gray-700 hover:text-gray-900 transition-colors"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset Form
            </Button>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isValid ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
              <span className="text-sm font-medium text-gray-700">
                {isValid ? 'Form is valid and ready to continue' : 'Please complete all required fields'}
              </span>
            </div>
            
            <Button
              type="button"
              onClick={handleSaveAndContinue}
              className="px-6 py-3 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg text-white font-medium transition-all duration-300"
            >
              <ArrowRight className="h-4 w-4 mr-2" />
              Save & Continue
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 