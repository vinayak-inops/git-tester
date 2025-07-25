"use client"

import type React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Input } from "@repo/ui/components/ui/input"
import { Label } from "@repo/ui/components/ui/label"
import { Separator } from "@repo/ui/components/ui/separator"
import { Button } from "@repo/ui/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/ui/select"
import { Users, ArrowLeft, RotateCcw, Save } from "lucide-react"

// Zod schema for validation
const managementHierarchySchema = z.object({
  manager: z.string().min(1, "Manager is required"),
  managerName: z.string().min(1, "Manager name is required"),
})

type ManagementHierarchyFormData = z.infer<typeof managementHierarchySchema>

interface ManagementHierarchyFormProps {
  formData: ManagementHierarchyFormData
  onFormDataChange: (data: Partial<ManagementHierarchyFormData>) => void
  onNextTab?: () => void
  onPreviousTab?: () => void
}

// Mock data for dropdowns
const managerOptions = [
  { code: "EMP001", name: "John Smith" },
  { code: "EMP002", name: "Sarah Johnson" },
  { code: "EMP003", name: "Michael Brown" },
  { code: "EMP004", name: "Emily Davis" },
  { code: "EMP005", name: "David Wilson" },
]

export function ManagementHierarchyForm({ 
  formData, 
  onFormDataChange, 
  onNextTab, 
  onPreviousTab 
}: ManagementHierarchyFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<ManagementHierarchyFormData>({
    resolver: zodResolver(managementHierarchySchema),
    defaultValues: formData,
    mode: "onChange",
  })

  const watchedManager = watch("manager")

  // Auto-fill manager name when manager code is selected
  const handleManagerChange = (value: string) => {
    setValue("manager", value)
    const selectedManager = managerOptions.find(option => option.code === value)
    if (selectedManager) {
      setValue("managerName", selectedManager.name)
      onFormDataChange({ manager: value, managerName: selectedManager.name })
    } else {
      setValue("managerName", "")
      onFormDataChange({ manager: value, managerName: "" })
    }
  }

  const handleReset = () => {
    reset()
    onFormDataChange({ manager: "", managerName: "" })
  }

  const handleSaveAndContinue = handleSubmit((data) => {
    onFormDataChange(data)
    if (onNextTab) {
      onNextTab()
    }
  })

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
                <Users className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">Management Hierarchy</CardTitle>
                <CardDescription className="text-blue-100 text-base">
                  Define reporting structure and management relationships
                </CardDescription>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-8 space-y-8">
        {/* Manager Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
            Reporting Manager
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="manager" className="text-sm font-medium text-gray-700">
                Manager Employee Code *
              </Label>
              <Select
                value={watchedManager}
                onValueChange={handleManagerChange}
              >
                <SelectTrigger className="h-10 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-xl bg-white">
                  <SelectValue placeholder="Select manager code" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {managerOptions.map((option) => (
                    <SelectItem key={option.code} value={option.code}>
                      {option.code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.manager && (
                <p className="text-sm text-red-600">{errors.manager.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Manager Name</Label>
              <div className="h-10 px-3 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl flex items-center justify-between">
                <span className="text-gray-700 font-medium">
                  {watchedManager ? 
                    managerOptions.find(option => option.code === watchedManager)?.name || "Loading..." 
                    : "Select manager code to auto-fill"
                  }
                </span>
                {watchedManager && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Organizational Chart Preview */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
            Organizational Chart Preview
          </h3>
          <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-200 text-center">
                <div className="text-sm font-medium text-gray-600">Manager</div>
                <div className="text-lg font-semibold text-blue-600">
                  {watchedManager || "Not Selected"}
                </div>
                <div className="text-sm text-gray-500">
                  {watchedManager ? 
                    managerOptions.find(option => option.code === watchedManager)?.name 
                    : "Manager name"
                  }
                </div>
              </div>
              <div className="w-px h-8 bg-blue-300"></div>
              <div className="bg-blue-500 text-white p-4 rounded-lg shadow-sm text-center">
                <div className="text-sm font-medium text-blue-100">Current Employee</div>
                <div className="text-lg font-semibold">New Employee</div>
                <div className="text-sm text-blue-100">To be assigned</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
          <Button
            type="button"
            variant="outline"
            onClick={onPreviousTab}
            className="px-6 py-3 h-12 rounded-xl border-2 border-gray-300 hover:bg-gray-50 bg-transparent text-gray-700 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isValid ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
              <span className="text-sm font-medium text-gray-700">
                {isValid ? 'Form is valid and ready to continue' : 'Please complete all required fields'}
              </span>
            </div>
            
            <div className="flex space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                className="px-6 py-3 h-12 rounded-xl border-2 border-gray-300 hover:bg-gray-50 bg-transparent text-gray-700 hover:text-gray-900 transition-colors"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset Form
              </Button>
              
              <Button
                type="button"
                onClick={handleSaveAndContinue}
                className="px-6 py-3 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg text-white font-medium transition-all duration-300"
              >
                <Save className="h-4 w-4 mr-2" />
                Save & Continue
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 