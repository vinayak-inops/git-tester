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
import { MapPin, RotateCcw, ArrowRight, ArrowLeft, X } from "lucide-react"
import { useState } from "react"

// Zod Schema for validation
const deploymentDetailsSchema = z.object({
  employeeCategory: z.object({
    employeeCategoryCode: z.string().min(1, "Employee category code is required"),
    employeeCategoryTitle: z.string().min(2, "Employee category title must be at least 2 characters"),
  }),
  grade: z.object({
    gradeCode: z.string().min(1, "Grade code is required"),
    gradeTitle: z.string().min(2, "Grade title must be at least 2 characters"),
  }),
  designation: z.object({
    designationCode: z.string().min(1, "Designation code is required"),
    designationName: z.string().min(2, "Designation name must be at least 2 characters"),
  }),
  location: z.object({
    locationCode: z.string().min(1, "Location code is required"),
    locationName: z.string().min(2, "Location name must be at least 2 characters"),
  }),
  skillLevel: z.object({
    skillLevelCode: z.string().optional(),
    skillLevelTitle: z.string().optional(),
  }),
})

type DeploymentDetailsData = z.infer<typeof deploymentDetailsSchema>

interface DeploymentDetailsFormProps {
  formData: DeploymentDetailsData
  onFormDataChange: (data: Partial<DeploymentDetailsData>) => void
  onNextTab?: () => void
  onPreviousTab?: () => void
}

// Mock data for dropdowns - in real app, this would come from API
const employeeCategoryOptions = [
  { code: "EC001", title: "Category A" },
  { code: "EC002", title: "Category B" },
  { code: "EC003", title: "Category C" },
]

const gradeOptions = [
  { code: "GRD001", title: "Grade A" },
  { code: "GRD002", title: "Grade B" },
  { code: "GRD003", title: "Grade C" },
]

const designationOptions = [
  { code: "DES001", name: "Designation A" },
  { code: "DES002", name: "Designation B" },
  { code: "DES003", name: "Designation C" },
]

const locationOptions = [
  { code: "LOC001", name: "Location A" },
  { code: "LOC002", name: "Location B" },
  { code: "LOC003", name: "Location C" },
]

const skillLevelOptions = [
  { code: "SKL001", title: "Level A" },
  { code: "SKL002", title: "Level B" },
  { code: "SKL003", title: "Level C" },
]

export function DeploymentDetailsForm({ formData, onFormDataChange, onNextTab, onPreviousTab }: DeploymentDetailsFormProps) {
  const [showErrors, setShowErrors] = useState(false)

  const {
    register,
    formState: { errors, isValid },
    watch,
    setValue,
    trigger,
    reset,
  } = useForm<DeploymentDetailsData>({
    resolver: zodResolver(deploymentDetailsSchema),
    defaultValues: {
      employeeCategory: formData.employeeCategory || { employeeCategoryCode: "", employeeCategoryTitle: "" },
      grade: formData.grade || { gradeCode: "", gradeTitle: "" },
      designation: formData.designation || { designationCode: "", designationName: "" },
      location: formData.location || { locationCode: "", locationName: "" },
      skillLevel: formData.skillLevel || { skillLevelCode: "", skillLevelTitle: "" },
    },
    mode: "onChange",
  })

  const watchedValues = watch()

  const handleCodeChange = (section: keyof DeploymentDetailsData, code: string) => {
    let name = ""
    
    // Find corresponding name based on selected code
    switch (section) {
      case "employeeCategory":
        const category = employeeCategoryOptions.find(opt => opt.code === code)
        name = category?.title || ""
        break
      case "grade":
        const grade = gradeOptions.find(opt => opt.code === code)
        name = grade?.title || ""
        break
      case "designation":
        const designation = designationOptions.find(opt => opt.code === code)
        name = designation?.name || ""
        break
      case "location":
        const location = locationOptions.find(opt => opt.code === code)
        name = location?.name || ""
        break
      case "skillLevel":
        const skillLevel = skillLevelOptions.find(opt => opt.code === code)
        name = skillLevel?.title || ""
        break
    }

    // Update both code and name with proper type casting
    setValue(`${section}.${section}Code` as any, code)
    setValue(`${section}.${section}Title` as any, name)
    
    onFormDataChange({
      [section]: {
        ...formData[section],
        [`${section}Code`]: code,
        [`${section}Title`]: name,
      },
    })
  }

  const handleReset = () => {
    reset({
      employeeCategory: { employeeCategoryCode: "", employeeCategoryTitle: "" },
      grade: { gradeCode: "", gradeTitle: "" },
      designation: { designationCode: "", designationName: "" },
      location: { locationCode: "", locationName: "" },
      skillLevel: { skillLevelCode: "", skillLevelTitle: "" },
    })
    setShowErrors(false)
    
    onFormDataChange({
      employeeCategory: { employeeCategoryCode: "", employeeCategoryTitle: "" },
      grade: { gradeCode: "", gradeTitle: "" },
      designation: { designationCode: "", designationName: "" },
      location: { locationCode: "", locationName: "" },
      skillLevel: { skillLevelCode: "", skillLevelTitle: "" },
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
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">Deployment Details</CardTitle>
                <CardDescription className="text-blue-100 text-base">
                  Employee category, grade, designation, and location details
                </CardDescription>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Employee Classification */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              Employee Classification
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="group">
                <Label htmlFor="employeeCategoryCode" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Category Code <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={watchedValues.employeeCategory?.employeeCategoryCode} 
                  onValueChange={(value) => handleCodeChange("employeeCategory", value)}
                >
                  <SelectTrigger className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white ${
                    (showErrors && errors.employeeCategory?.employeeCategoryCode) 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                  }`}>
                    <SelectValue placeholder="Select Category Code" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-2 bg-white">
                    {employeeCategoryOptions.map((option) => (
                      <SelectItem key={option.code} value={option.code}>
                        {option.code} - {option.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {showErrors && errors.employeeCategory?.employeeCategoryCode && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.employeeCategory.employeeCategoryCode.message}
                  </p>
                )}
              </div>

              <div className="group">
                <Label htmlFor="employeeCategoryTitle" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Category Title <span className="text-red-500">*</span>
                </Label>
                <div className="h-10 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl text-blue-800 flex items-center font-medium shadow-sm">
                  {watchedValues.employeeCategory?.employeeCategoryTitle ? (
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {watchedValues.employeeCategory.employeeCategoryTitle}
                    </span>
                  ) : (
                    <span className="text-blue-600 italic">Will auto-fill from code</span>
                  )}
                </div>
                {showErrors && errors.employeeCategory?.employeeCategoryTitle && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.employeeCategory.employeeCategoryTitle.message}
                  </p>
                )}
              </div>

              <div className="group">
                <Label htmlFor="gradeCode" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Grade Code <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={watchedValues.grade?.gradeCode} 
                  onValueChange={(value) => handleCodeChange("grade", value)}
                >
                  <SelectTrigger className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white ${
                    (showErrors && errors.grade?.gradeCode) 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                  }`}>
                    <SelectValue placeholder="Select Grade Code" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-2 bg-white">
                    {gradeOptions.map((option) => (
                      <SelectItem key={option.code} value={option.code}>
                        {option.code} - {option.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {showErrors && errors.grade?.gradeCode && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.grade.gradeCode.message}
                  </p>
                )}
              </div>

              <div className="group">
                <Label htmlFor="gradeTitle" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Grade Title <span className="text-red-500">*</span>
                </Label>
                <div className="h-10 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl text-blue-800 flex items-center font-medium shadow-sm">
                  {watchedValues.grade?.gradeTitle ? (
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {watchedValues.grade.gradeTitle}
                    </span>
                  ) : (
                    <span className="text-blue-600 italic">Will auto-fill from code</span>
                  )}
                </div>
                {showErrors && errors.grade?.gradeTitle && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.grade.gradeTitle.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <Separator className="lg:col-span-3 my-2" />

          {/* Position and Location */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              Position and Location
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="group">
                <Label htmlFor="designationCode" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Designation Code <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={watchedValues.designation?.designationCode} 
                  onValueChange={(value) => handleCodeChange("designation", value)}
                >
                  <SelectTrigger className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white ${
                    (showErrors && errors.designation?.designationCode) 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                  }`}>
                    <SelectValue placeholder="Select Designation Code" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-2 bg-white">
                    {designationOptions.map((option) => (
                      <SelectItem key={option.code} value={option.code}>
                        {option.code} - {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {showErrors && errors.designation?.designationCode && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.designation.designationCode.message}
                  </p>
                )}
              </div>

              <div className="group">
                <Label htmlFor="designationName" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Designation Name <span className="text-red-500">*</span>
                </Label>
                <div className="h-10 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl text-blue-800 flex items-center font-medium shadow-sm">
                  {watchedValues.designation?.designationName ? (
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {watchedValues.designation.designationName}
                    </span>
                  ) : (
                    <span className="text-blue-600 italic">Will auto-fill from code</span>
                  )}
                </div>
                {showErrors && errors.designation?.designationName && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.designation.designationName.message}
                  </p>
                )}
              </div>

              <div className="group">
                <Label htmlFor="locationCode" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Location Code <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={watchedValues.location?.locationCode} 
                  onValueChange={(value) => handleCodeChange("location", value)}
                >
                  <SelectTrigger className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white ${
                    (showErrors && errors.location?.locationCode) 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                  }`}>
                    <SelectValue placeholder="Select Location Code" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-2 bg-white">
                    {locationOptions.map((option) => (
                      <SelectItem key={option.code} value={option.code}>
                        {option.code} - {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {showErrors && errors.location?.locationCode && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.location.locationCode.message}
                  </p>
                )}
              </div>

              <div className="group">
                <Label htmlFor="locationName" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Location Name <span className="text-red-500">*</span>
                </Label>
                <div className="h-10 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl text-blue-800 flex items-center font-medium shadow-sm">
                  {watchedValues.location?.locationName ? (
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {watchedValues.location.locationName}
                    </span>
                  ) : (
                    <span className="text-blue-600 italic">Will auto-fill from code</span>
                  )}
                </div>
                {showErrors && errors.location?.locationName && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.location.locationName.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <Separator className="lg:col-span-3 my-2" />

          {/* Skill Level */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              Skill Level
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="group">
                <Label htmlFor="skillLevelCode" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Skill Level Code
                </Label>
                <Select 
                  value={watchedValues.skillLevel?.skillLevelCode} 
                  onValueChange={(value) => handleCodeChange("skillLevel", value)}
                >
                  <SelectTrigger className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white ${
                    (showErrors && errors.skillLevel?.skillLevelCode) 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                  }`}>
                    <SelectValue placeholder="Select Skill Level Code" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-2 bg-white">
                    {skillLevelOptions.map((option) => (
                      <SelectItem key={option.code} value={option.code}>
                        {option.code} - {option.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {showErrors && errors.skillLevel?.skillLevelCode && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.skillLevel.skillLevelCode.message}
                  </p>
                )}
              </div>

              <div className="group">
                <Label htmlFor="skillLevelTitle" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Skill Level Title
                </Label>
                <div className="h-10 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl text-blue-800 flex items-center font-medium shadow-sm">
                  {watchedValues.skillLevel?.skillLevelTitle ? (
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {watchedValues.skillLevel.skillLevelTitle}
                    </span>
                  ) : (
                    <span className="text-blue-600 italic">Will auto-fill from code</span>
                  )}
                </div>
                {showErrors && errors.skillLevel?.skillLevelTitle && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.skillLevel.skillLevelTitle.message}
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