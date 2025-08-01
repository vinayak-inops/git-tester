"use client"

import type React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Input } from "@repo/ui/components/ui/input"
import { Label } from "@repo/ui/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/ui/select"
import { Button } from "@repo/ui/components/ui/button"
import { Badge } from "@repo/ui/components/ui/badge"
import { Switch } from "@repo/ui/components/ui/switch"
import { Separator } from "@repo/ui/components/ui/separator"
import { GraduationCap, Plus, Trash2, Upload, FileCheck, X, Briefcase } from "lucide-react"
import { useState } from "react"

// Zod Schema for validation
const educationExperienceSchema = z.object({
  highestEducation: z.object({
    educationTitle: z.string().min(1, "Education title is required"),
    courseTitle: z.string().min(1, "Course title is required"),
    stream: z.string().optional(),
    college: z.string().min(1, "College/University is required"),
    yearOfPassing: z.string().min(1, "Year of passing is required"),
    monthOfPassing: z.number().min(1, "Month of passing is required"),
    percentage: z.string().optional(),
    isVerified: z.boolean(),
  }),
  experience: z.object({
    companyName: z.string().min(1, "Company name is required"),
    fromDate: z.string().min(1, "From date is required"),
    toDate: z.string().min(1, "To date is required"),
    designation: z.string().min(1, "Designation is required"),
    filePath: z.string().optional(),
  }),
})

type EducationExperienceData = z.infer<typeof educationExperienceSchema>

interface EducationExperienceFormProps {
  formData: EducationExperienceData
  onFormDataChange: (data: Partial<EducationExperienceData>) => void
  onNextTab?: () => void
  onPreviousTab?: () => void
}

const monthOptions = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
]

export function EducationExperienceForm({ formData, onFormDataChange, onNextTab, onPreviousTab }: EducationExperienceFormProps) {
  const [showErrors, setShowErrors] = useState(false)

  const {
    register,
    formState: { errors, isValid },
    watch,
    setValue,
    trigger,
    reset,
  } = useForm<EducationExperienceData>({
    resolver: zodResolver(educationExperienceSchema),
    defaultValues: {
      highestEducation: formData.highestEducation || {
        educationTitle: "B.Tech",
        courseTitle: "Electrical Engineering",
        stream: "Engineering",
        college: "XYZ University",
        yearOfPassing: "2012",
        monthOfPassing: 6,
        percentage: "75%",
        isVerified: true,
      },
      experience: formData.experience || {
        companyName: "ABC Corp",
        fromDate: "2013-01-01",
        toDate: "2022-12-31",
        designation: "Engineer",
        filePath: "/documents/experience.pdf",
      },
    },
    mode: "onChange",
  })

  const watchedValues = watch()

  const handleReset = () => {
    reset()
    setShowErrors(false)
    onFormDataChange({})
  }

  const handleSaveAndContinue = async () => {
    setShowErrors(true)
    const valid = await trigger()
    if (valid && onNextTab) onNextTab()
  }

  return (
    <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/70 backdrop-blur-xl shadow-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-indigo-700/90"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">Education & Experience</CardTitle>
              <CardDescription className="text-blue-100 text-base">
                Educational qualifications and work experience details
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <div className="space-y-8">
          {/* Highest Education */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-blue-600" />
              Highest Education
            </h3>
            <div className="p-6 border border-gray-200 rounded-xl bg-gray-50/50">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="group">
                  <Label className="text-sm font-medium text-gray-700">Education Title <span className="text-red-500">*</span></Label>
                  <Input {...register("highestEducation.educationTitle")} className={`h-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg ${(showErrors && errors.highestEducation?.educationTitle) ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`} placeholder="e.g., B.Tech, MBA, etc." />
                  {showErrors && errors.highestEducation?.educationTitle && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><X className="h-3 w-3" />{errors.highestEducation.educationTitle.message}</p>
                  )}
                </div>
                <div className="group">
                  <Label className="text-sm font-medium text-gray-700">Course Title <span className="text-red-500">*</span></Label>
                  <Input {...register("highestEducation.courseTitle")} className={`h-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg ${(showErrors && errors.highestEducation?.courseTitle) ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`} placeholder="Enter course title" />
                  {showErrors && errors.highestEducation?.courseTitle && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><X className="h-3 w-3" />{errors.highestEducation.courseTitle.message}</p>
                  )}
                </div>
                <div className="group">
                  <Label className="text-sm font-medium text-gray-700">Stream</Label>
                  <Input {...register("highestEducation.stream")} className="h-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg" placeholder="Enter stream" />
                </div>
                <div className="group">
                  <Label className="text-sm font-medium text-gray-700">College/University <span className="text-red-500">*</span></Label>
                  <Input {...register("highestEducation.college")} className={`h-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg ${(showErrors && errors.highestEducation?.college) ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`} placeholder="Enter college/university name" />
                  {showErrors && errors.highestEducation?.college && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><X className="h-3 w-3" />{errors.highestEducation.college.message}</p>
                  )}
                </div>
                <div className="group">
                  <Label className="text-sm font-medium text-gray-700">Year of Passing <span className="text-red-500">*</span></Label>
                  <Input {...register("highestEducation.yearOfPassing")} className={`h-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg ${(showErrors && errors.highestEducation?.yearOfPassing) ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`} placeholder="Enter year" />
                  {showErrors && errors.highestEducation?.yearOfPassing && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><X className="h-3 w-3" />{errors.highestEducation.yearOfPassing.message}</p>
                  )}
                </div>
                <div className="group">
                  <Label className="text-sm font-medium text-gray-700">Month of Passing <span className="text-red-500">*</span></Label>
                  <Select value={watchedValues.highestEducation?.monthOfPassing?.toString()} onValueChange={value => { setValue("highestEducation.monthOfPassing", Number.parseInt(value)); onFormDataChange({ highestEducation: { ...watchedValues.highestEducation, monthOfPassing: Number.parseInt(value) } }) }}>
                    <SelectTrigger className={`h-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg ${(showErrors && errors.highestEducation?.monthOfPassing) ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}>
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      {monthOptions.map(month => (
                        <SelectItem key={month.value} value={month.value.toString()}>{month.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {showErrors && errors.highestEducation?.monthOfPassing && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><X className="h-3 w-3" />{errors.highestEducation.monthOfPassing.message}</p>
                  )}
                </div>
                <div className="group">
                  <Label className="text-sm font-medium text-gray-700">Percentage/CGPA</Label>
                  <Input {...register("highestEducation.percentage")} className="h-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg" placeholder="Enter percentage or CGPA" />
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                  <Switch checked={watchedValues.highestEducation?.isVerified} onCheckedChange={checked => { setValue("highestEducation.isVerified", checked); onFormDataChange({ highestEducation: { ...watchedValues.highestEducation, isVerified: checked } }) }} className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-200" />
                  <Label className="text-sm text-gray-700 font-medium cursor-pointer">
                    {watchedValues.highestEducation?.isVerified ? (
                      <span className="text-blue-600">Education Verified</span>
                    ) : (
                      <span className="text-gray-500">Mark as Verified</span>
                    )}
                  </Label>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Work Experience */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-600" />
              Work Experience
            </h3>
            <div className="p-6 border border-gray-200 rounded-xl bg-gray-50/50">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="group">
                  <Label className="text-sm font-medium text-gray-700">Company Name <span className="text-red-500">*</span></Label>
                  <Input {...register("experience.companyName")} className={`h-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg ${(showErrors && errors.experience?.companyName) ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`} placeholder="Enter company name" />
                  {showErrors && errors.experience?.companyName && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><X className="h-3 w-3" />{errors.experience.companyName.message}</p>
                  )}
                </div>
                <div className="group">
                  <Label className="text-sm font-medium text-gray-700">Designation <span className="text-red-500">*</span></Label>
                  <Input {...register("experience.designation")} className={`h-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg ${(showErrors && errors.experience?.designation) ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`} placeholder="Enter designation" />
                  {showErrors && errors.experience?.designation && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><X className="h-3 w-3" />{errors.experience.designation.message}</p>
                  )}
                </div>
                <div className="group">
                  <Label className="text-sm font-medium text-gray-700">From Date <span className="text-red-500">*</span></Label>
                  <Input type="date" {...register("experience.fromDate")} className={`h-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg ${(showErrors && errors.experience?.fromDate) ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`} />
                  {showErrors && errors.experience?.fromDate && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><X className="h-3 w-3" />{errors.experience.fromDate.message}</p>
                  )}
                </div>
                <div className="group">
                  <Label className="text-sm font-medium text-gray-700">To Date <span className="text-red-500">*</span></Label>
                  <Input type="date" {...register("experience.toDate")} className={`h-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg ${(showErrors && errors.experience?.toDate) ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`} />
                  {showErrors && errors.experience?.toDate && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><X className="h-3 w-3" />{errors.experience.toDate.message}</p>
                  )}
                </div>
              </div>
              {/* Experience Document Upload */}
              <div className="mt-4">
                <Label className="text-sm font-medium text-gray-700">Experience Document</Label>
                <div className="relative mt-2">
                  <Input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e => { const file = e.target.files?.[0]; if (file) { setValue("experience.filePath", file.name); onFormDataChange({ experience: { ...watchedValues.experience, filePath: file.name } }) } }} className="hidden" id="experienceFilePath" />
                  {watchedValues.experience?.filePath ? (
                    <div className="flex items-center gap-3 p-2 bg-green-50 border border-green-200 rounded-lg">
                      <FileCheck className="h-4 w-4 text-green-600" />
                      <span className="text-xs text-green-800">{watchedValues.experience.filePath}</span>
                      <Button type="button" variant="outline" size="sm" onClick={() => { setValue("experience.filePath", ""); onFormDataChange({ experience: { ...watchedValues.experience, filePath: "" } }) }} className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300">Remove</Button>
                    </div>
                  ) : (
                    <Button type="button" onClick={() => document.getElementById('experienceFilePath')?.click()} className="w-full flex items-center justify-center gap-2 p-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors bg-gray-50/50">
                      <Upload className="h-4 w-4 text-gray-500" />
                      <span className="text-xs font-medium text-gray-700">Upload Experience Document</span>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center gap-3">
            {onPreviousTab && (
              <Button type="button" variant="outline" onClick={onPreviousTab} className="px-6 py-3 h-12 rounded-xl border-2 border-gray-300 hover:bg-gray-50 bg-transparent text-gray-700 hover:text-gray-900 transition-colors"><span>Back</span></Button>
            )}
            <Button type="button" variant="outline" onClick={handleReset} className="px-6 py-3 h-12 rounded-xl border-2 border-gray-300 hover:bg-gray-50 bg-transparent text-gray-700 hover:text-gray-900 transition-colors">Reset Form</Button>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isValid ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
              <span className="text-sm font-medium text-gray-700">{isValid ? 'Form is valid and ready to continue' : 'Please complete all required fields'}</span>
            </div>
            <Button type="button" onClick={handleSaveAndContinue} className="px-6 py-3 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg text-white font-medium transition-all duration-300"><span>Save & Continue</span></Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 