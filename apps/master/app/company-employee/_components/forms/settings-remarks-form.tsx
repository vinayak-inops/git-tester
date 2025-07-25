"use client"

import type React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Input } from "@repo/ui/components/ui/input"
import { Label } from "@repo/ui/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/ui/select"
import { Separator } from "@repo/ui/components/ui/separator"
import { Textarea } from "@repo/ui/components/ui/textarea"
import { Button } from "@repo/ui/components/ui/button"
import { Settings, ArrowLeft, RotateCcw, CheckCircle } from "lucide-react"

// Zod schema for validation
const settingsRemarksSchema = z.object({
  deployment: z.object({
    effectiveFrom: z.string().min(1, "Effective date is required"),
    remark: z.string().optional(),
  }),
  status: z.enum(["active", "pending", "inactive"], {
    required_error: "Please select a status",
  }),
})

type SettingsRemarksFormData = z.infer<typeof settingsRemarksSchema>

interface SettingsRemarksFormProps {
  formData: SettingsRemarksFormData
  onFormDataChange: (data: Partial<SettingsRemarksFormData>) => void
  onPreviousTab?: () => void
  onSubmit?: (data: SettingsRemarksFormData) => void
}

export function SettingsRemarksForm({ 
  formData, 
  onFormDataChange, 
  onPreviousTab,
  onSubmit 
}: SettingsRemarksFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<SettingsRemarksFormData>({
    resolver: zodResolver(settingsRemarksSchema),
    defaultValues: formData,
    mode: "onChange",
  })

  const watchedValues = watch()

  const handleReset = () => {
    reset()
    onFormDataChange({ 
      deployment: { effectiveFrom: "", remark: "" },
      status: undefined
    })
  }

  const handleFormSubmit = handleSubmit((data) => {
    onFormDataChange(data)
    if (onSubmit) {
      onSubmit(data)
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
                <Settings className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">Settings & Remarks</CardTitle>
                <CardDescription className="text-blue-100 text-base">
                  Deployment effective date and additional remarks
                </CardDescription>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-8 space-y-8">
        {/* Deployment Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
            Deployment Settings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Effective From *</Label>
              <Input
                {...register("deployment.effectiveFrom")}
                type="date"
                className="h-10 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-xl"
              />
              {errors.deployment?.effectiveFrom && (
                <p className="text-sm text-red-600">{errors.deployment.effectiveFrom.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Status *</Label>
              <Select
                value={watchedValues.status}
                onValueChange={(value) => {
                  setValue("status", value as "active" | "pending" | "inactive")
                  onFormDataChange({ status: value as "active" | "pending" | "inactive" })
                }}
              >
                <SelectTrigger className="h-10 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-xl bg-white">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              {errors.status && (
                <p className="text-sm text-red-600">{errors.status.message}</p>
              )}
            </div>
          </div>
        </div>

        <Separator />

        {/* Remarks */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
            Deployment Remarks
          </h3>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Remarks</Label>
            <Textarea
              {...register("deployment.remark")}
              className="border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-xl"
              placeholder="Enter deployment remarks"
              rows={4}
            />
            {errors.deployment?.remark && (
              <p className="text-sm text-red-600">{errors.deployment.remark.message}</p>
            )}
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
                {isValid ? 'Form is valid and ready to submit' : 'Please complete all required fields'}
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
                onClick={handleFormSubmit}
                className="px-6 py-3 h-12 rounded-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg text-white font-medium transition-all duration-300"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Submit Deployment
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 