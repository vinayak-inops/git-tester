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
import { Building2, RotateCcw, ArrowRight, ArrowLeft, X, Calendar, Briefcase, Bus, Banknote, Users, FileText } from "lucide-react"
import { useState } from "react"

// Zod Schema for validation
const employmentDetailsSchema = z.object({
  dateOfJoining: z.string().min(1, "Date of joining is required"),
  contractFrom: z.string().optional(),
  contractTo: z.string().optional(),
  contractPeriod: z.number().min(0, "Contract period must be positive"),
  rejoin: z.object({
    isRejoining: z.boolean(),
    oldEmployeeCode: z.string().optional(),
  }),
  workSkill: z.object({
    workSkillCode: z.string().min(1, "Work skill code is required"),
    workSkillTitle: z.string().min(2, "Work skill title must be at least 2 characters"),
  }),
  paymentMode: z.string().min(1, "Payment mode is required"),
  deployment: z.object({
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
      skilledLevelTitle: z.string().min(1, "Skill level title is required"),
      skilledLevelDescription: z.string().optional(),
    }),
    contractor: z.object({
      contractorName: z.string().min(2, "Contractor name must be at least 2 characters"),
    }),
    effectiveFrom: z.string().min(1, "Deployment effective date is required"),
    remark: z.string().min(1, "Deployment remark is required"),
  }),
  busDetail: z.object({
    busNumber: z.string().optional(),
    busRegistrationNumber: z.string().optional(),
    route: z.string().optional(),
  }),
  natureOfWork: z.object({
    natureOfWorkCode: z.string().min(1, "Nature of work code is required"),
    natureOfWorkTitle: z.string().min(2, "Nature of work title must be at least 2 characters"),
  }),
  bankDetails: z.object({
    bankName: z.string().min(1, "Bank name is required"),
    ifscCode: z.string().min(1, "IFSC code is required"),
    branchName: z.string().min(1, "Branch name is required"),
    accountNumber: z.string().min(1, "Account number is required"),
  }),
  manager: z.string().optional(),
  superviser: z.string().optional(),
  backgroundVerificationRemark: z.string().optional(),
})

type EmploymentDetailsData = z.infer<typeof employmentDetailsSchema>

interface EmploymentDetailsFormProps {
  formData: EmploymentDetailsData
  onFormDataChange: (data: Partial<EmploymentDetailsData>) => void
  onNextTab?: () => void
  onPreviousTab?: () => void
}

// Mock data for dropdowns
const paymentModeOptions = [
  { value: "Bank Transfer", label: "Bank Transfer" },
  { value: "Cash", label: "Cash" },
  { value: "Cheque", label: "Cheque" },
]

const subsidiaryOptions = [
  { code: "sub1", name: "Subsidiary-1" },
  { code: "sub2", name: "Subsidiary-2" },
  { code: "sub3", name: "Subsidiary-3" },
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

const employeeCategoryOptions = [
  { code: "WKM", name: "WKM" },
  { code: "SKM", name: "SKM" },
  { code: "MGR", name: "Manager" },
]

const gradeOptions = [
  { code: "GRD001", name: "Grade A" },
  { code: "GRD002", name: "Grade B" },
  { code: "GRD003", name: "Grade C" },
]

const designationOptions = [
  { code: "D001", name: "Manager" },
  { code: "D002", name: "Supervisor" },
  { code: "D003", name: "Worker" },
]

const locationOptions = [
  { code: "LOC001", name: "Location A" },
  { code: "LOC002", name: "Location B" },
  { code: "LOC003", name: "Location C" },
]

const skillLevelOptions = [
  { title: "Low-Skilled", description: "Entry-level skills" },
  { title: "Medium-Skilled", description: "Intermediate skills" },
  { title: "High-Skilled", description: "Advanced skills" },
]

const contractorOptions = [
  { code: "CON001", name: "Contractor A" },
  { code: "CON002", name: "Contractor B" },
  { code: "CON003", name: "Contractor C" },
]

const workSkillOptions = [
  { code: "WSK001", title: "Electrician" },
  { code: "WSK002", title: "Plumber" },
  { code: "WSK003", title: "Carpenter" },
]

const natureOfWorkOptions = [
  { code: "NOW001", title: "Technical" },
  { code: "NOW002", title: "Administrative" },
  { code: "NOW003", title: "Manual" },
]

function isPlainObject(val: unknown): val is Record<string, any> {
  return typeof val === 'object' && val !== null && !Array.isArray(val);
}

export function EmploymentDetailsForm({ formData, onFormDataChange, onNextTab, onPreviousTab }: EmploymentDetailsFormProps) {
  const [showErrors, setShowErrors] = useState(false)

  const {
    register,
    formState: { errors, isValid },
    watch,
    setValue,
    trigger,
    reset,
  } = useForm<EmploymentDetailsData>({
    resolver: zodResolver(employmentDetailsSchema),
    defaultValues: {
      dateOfJoining: formData.dateOfJoining || "",
      contractFrom: formData.contractFrom || "",
      contractTo: formData.contractTo || "",
      contractPeriod: formData.contractPeriod || 0,
      rejoin: formData.rejoin || { isRejoining: false, oldEmployeeCode: "" },
      workSkill: formData.workSkill || { workSkillCode: "", workSkillTitle: "" },
      paymentMode: formData.paymentMode || "",
      deployment: formData.deployment || {
        subsidiary: { subsidiaryCode: "", subsidiaryName: "" },
        division: { divisionCode: "", divisionName: "" },
        department: { departmentCode: "", departmentName: "" },
        subDepartment: { subDepartmentCode: "", subDepartmentName: "" },
        section: { sectionCode: "", sectionName: "" },
        employeeCategory: { employeeCategoryCode: "", employeeCategoryTitle: "" },
        grade: { gradeCode: "", gradeTitle: "" },
        designation: { designationCode: "", designationName: "" },
        location: { locationCode: "", locationName: "" },
        skillLevel: { skilledLevelTitle: "", skilledLevelDescription: "" },
        contractor: { contractorName: "" },
        effectiveFrom: "2024-01-01",
        remark: "Deployment Remark",
      },
      busDetail: formData.busDetail || { busNumber: "", busRegistrationNumber: "", route: "" },
      natureOfWork: formData.natureOfWork || { natureOfWorkCode: "", natureOfWorkTitle: "" },
      bankDetails: formData.bankDetails || { bankName: "", ifscCode: "", branchName: "", accountNumber: "" },
      manager: formData.manager || "",
      superviser: formData.superviser || "",
      backgroundVerificationRemark: formData.backgroundVerificationRemark || "",
    },
    mode: "onChange",
  })

  const watchedValues = watch()

  const handleCodeChange = (section: string, subsection: string, code: string) => {
    let name = ""
    
    // Find corresponding name based on selected code
    const options = getOptionsForSection(section)
    const option = options.find(opt => opt.code === code)
    name = option ? ("name" in option ? option.name : option.title) : ""

    // Update both code and name
    setValue(`${section}.${subsection}Code` as any, code)
    setValue(`${section}.${subsection}Name` as any, name)
    
    onFormDataChange({
      [section]: {
        ...(isPlainObject(formData[section as keyof EmploymentDetailsData])
          ? (formData[section as keyof EmploymentDetailsData] as Record<string, any>)
          : {}),
        [subsection]: {
          ...(isPlainObject((formData[section as keyof EmploymentDetailsData] as Record<string, any>)?.[subsection])
            ? (formData[section as keyof EmploymentDetailsData] as Record<string, any>)[subsection]
            : {}),
          [`${subsection}Code`]: code,
          [`${subsection}Name`]: name,
        },
      },
    })
  }

  const getOptionsForSection = (section: string) => {
    switch (section) {
      case "subsidiary": return subsidiaryOptions
      case "division": return divisionOptions
      case "department": return departmentOptions
      case "subDepartment": return subDepartmentOptions
      case "section": return sectionOptions
      case "employeeCategory": return employeeCategoryOptions
      case "grade": return gradeOptions
      case "designation": return designationOptions
      case "location": return locationOptions
      case "workSkill": return workSkillOptions
      case "natureOfWork": return natureOfWorkOptions
      default: return []
    }
  }

  const handleReset = () => {
    reset()
    setShowErrors(false)
    onFormDataChange({})
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
                <CardTitle className="text-2xl font-bold">Employment Details</CardTitle>
                <CardDescription className="text-blue-100 text-base">
                  Employment information, deployment details, and organizational structure
                </CardDescription>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <div className="space-y-8">
          {/* Basic Employment Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              Basic Employment Information
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="group">
                <Label htmlFor="dateOfJoining" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Date of Joining <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="dateOfJoining"
                  type="date"
                  {...register("dateOfJoining")}
                  className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white ${
                    (showErrors && errors.dateOfJoining) 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                  }`}
                />
                {showErrors && errors.dateOfJoining && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.dateOfJoining.message}
                  </p>
                )}
              </div>

              <div className="group">
                <Label htmlFor="contractFrom" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Contract From
                </Label>
                <Input
                  id="contractFrom"
                  type="date"
                  {...register("contractFrom")}
                  className="h-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white"
                />
              </div>

              <div className="group">
                <Label htmlFor="contractTo" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Contract To
                </Label>
                <Input
                  id="contractTo"
                  type="date"
                  {...register("contractTo")}
                  className="h-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white"
                />
              </div>

              <div className="group">
                <Label htmlFor="contractPeriod" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Contract Period (Months)
                </Label>
                <Input
                  id="contractPeriod"
                  type="number"
                  {...register("contractPeriod", { valueAsNumber: true })}
                  className="h-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Rejoin Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <RotateCcw className="h-5 w-5 text-blue-600" />
              Rejoin Information
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="group">
                <Label htmlFor="isRejoining" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Is Rejoining
                </Label>
                <Select
                  value={watchedValues.rejoin?.isRejoining?.toString()}
                  onValueChange={(value) => {
                    setValue("rejoin.isRejoining", value === "true")
                    onFormDataChange({
                      rejoin: {
                        ...formData.rejoin,
                        isRejoining: value === "true"
                      }
                    })
                  }}
                >
                  <SelectTrigger className="h-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white">
                    <SelectValue placeholder="Select rejoining status" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-2 bg-white">
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="group">
                <Label htmlFor="oldEmployeeCode" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Old Employee Code
                </Label>
                <Input
                  id="oldEmployeeCode"
                  {...register("rejoin.oldEmployeeCode")}
                  className="h-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white"
                  placeholder="Enter old employee code"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Work Skill & Payment */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-600" />
              Work Skill & Payment
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="group">
                <Label htmlFor="workSkillCode" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Work Skill Code <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={watchedValues.workSkill?.workSkillCode} 
                  onValueChange={(value) => handleCodeChange("workSkill", "workSkill", value)}
                >
                  <SelectTrigger className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white ${
                    (showErrors && errors.workSkill?.workSkillCode) 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                  }`}>
                    <SelectValue placeholder="Select Work Skill Code" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-2 bg-white">
                    {workSkillOptions.map((option) => (
                      <SelectItem key={option.code} value={option.code}>
                        {option.code} - {option.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {showErrors && errors.workSkill?.workSkillCode && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.workSkill.workSkillCode.message}
                  </p>
                )}
              </div>

              <div className="group">
                <Label htmlFor="workSkillTitle" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Work Skill Title <span className="text-red-500">*</span>
                </Label>
                <div className="h-10 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl text-blue-800 flex items-center font-medium shadow-sm">
                  {watchedValues.workSkill?.workSkillTitle ? (
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {watchedValues.workSkill.workSkillTitle}
                    </span>
                  ) : (
                    <span className="text-blue-600 italic">Will auto-fill from code</span>
                  )}
                </div>
                {showErrors && errors.workSkill?.workSkillTitle && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.workSkill.workSkillTitle.message}
                  </p>
                )}
              </div>

              <div className="group">
                <Label htmlFor="paymentMode" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Payment Mode <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={watchedValues.paymentMode}
                  onValueChange={(value) => setValue("paymentMode", value)}
                >
                  <SelectTrigger className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white ${
                    (showErrors && errors.paymentMode) 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                  }`}>
                    <SelectValue placeholder="Select payment mode" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-2 bg-white">
                    {paymentModeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {showErrors && errors.paymentMode && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.paymentMode.message}
                  </p>
                )}
              </div>

              <div className="group">
                <Label htmlFor="backgroundVerificationRemark" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Background Verification Remark
                </Label>
                <Input
                  id="backgroundVerificationRemark"
                  {...register("backgroundVerificationRemark")}
                  className="h-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white"
                  placeholder="Enter verification remark"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Nature of Work */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-600" />
              Nature of Work
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="group">
                <Label htmlFor="natureOfWorkCode" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Nature of Work Code <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={watchedValues.natureOfWork?.natureOfWorkCode} 
                  onValueChange={(value) => handleCodeChange("natureOfWork", "natureOfWork", value)}
                >
                  <SelectTrigger className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white ${
                    (showErrors && errors.natureOfWork?.natureOfWorkCode) 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                  }`}>
                    <SelectValue placeholder="Select Nature of Work Code" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-2 bg-white">
                    {natureOfWorkOptions.map((option) => (
                      <SelectItem key={option.code} value={option.code}>
                        {option.code} - {option.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {showErrors && errors.natureOfWork?.natureOfWorkCode && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.natureOfWork.natureOfWorkCode.message}
                  </p>
                )}
              </div>

              <div className="group">
                <Label htmlFor="natureOfWorkTitle" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Nature of Work Title <span className="text-red-500">*</span>
                </Label>
                <div className="h-10 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl text-blue-800 flex items-center font-medium shadow-sm">
                  {watchedValues.natureOfWork?.natureOfWorkTitle ? (
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {watchedValues.natureOfWork.natureOfWorkTitle}
                    </span>
                  ) : (
                    <span className="text-blue-600 italic">Will auto-fill from code</span>
                  )}
                </div>
                {showErrors && errors.natureOfWork?.natureOfWorkTitle && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.natureOfWork.natureOfWorkTitle.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Organizational Structure */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-600" />
              Organizational Structure
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Subsidiary */}
              <div className="group">
                <Label htmlFor="subsidiaryCode" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Subsidiary Code <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={watchedValues.deployment?.subsidiary?.subsidiaryCode} 
                  onValueChange={(value) => handleCodeChange("deployment", "subsidiary", value)}
                >
                  <SelectTrigger className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white ${
                    (showErrors && errors.deployment?.subsidiary?.subsidiaryCode) 
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
                {showErrors && errors.deployment?.subsidiary?.subsidiaryCode && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.deployment.subsidiary.subsidiaryCode.message}
                  </p>
                )}
              </div>

              <div className="group">
                <Label htmlFor="subsidiaryName" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Subsidiary Name <span className="text-red-500">*</span>
                </Label>
                <div className="h-10 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl text-blue-800 flex items-center font-medium shadow-sm">
                  {watchedValues.deployment?.subsidiary?.subsidiaryName ? (
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {watchedValues.deployment.subsidiary.subsidiaryName}
                    </span>
                  ) : (
                    <span className="text-blue-600 italic">Will auto-fill from code</span>
                  )}
                </div>
                {showErrors && errors.deployment?.subsidiary?.subsidiaryName && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.deployment.subsidiary.subsidiaryName.message}
                  </p>
                )}
              </div>

              {/* Division */}
              <div className="group">
                <Label htmlFor="divisionCode" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Division Code <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={watchedValues.deployment?.division?.divisionCode} 
                  onValueChange={(value) => handleCodeChange("deployment", "division", value)}
                >
                  <SelectTrigger className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white ${
                    (showErrors && errors.deployment?.division?.divisionCode) 
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
                {showErrors && errors.deployment?.division?.divisionCode && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.deployment.division.divisionCode.message}
                  </p>
                )}
              </div>

              <div className="group">
                <Label htmlFor="divisionName" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Division Name <span className="text-red-500">*</span>
                </Label>
                <div className="h-10 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl text-blue-800 flex items-center font-medium shadow-sm">
                  {watchedValues.deployment?.division?.divisionName ? (
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {watchedValues.deployment.division.divisionName}
                    </span>
                  ) : (
                    <span className="text-blue-600 italic">Will auto-fill from code</span>
                  )}
                </div>
                {showErrors && errors.deployment?.division?.divisionName && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.deployment.division.divisionName.message}
                  </p>
                )}
              </div>

              {/* Department */}
              <div className="group">
                <Label htmlFor="departmentCode" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Department Code <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={watchedValues.deployment?.department?.departmentCode} 
                  onValueChange={(value) => handleCodeChange("deployment", "department", value)}
                >
                  <SelectTrigger className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white ${
                    (showErrors && errors.deployment?.department?.departmentCode) 
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
                {showErrors && errors.deployment?.department?.departmentCode && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.deployment.department.departmentCode.message}
                  </p>
                )}
              </div>

              <div className="group">
                <Label htmlFor="departmentName" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Department Name <span className="text-red-500">*</span>
                </Label>
                <div className="h-10 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl text-blue-800 flex items-center font-medium shadow-sm">
                  {watchedValues.deployment?.department?.departmentName ? (
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {watchedValues.deployment.department.departmentName}
                    </span>
                  ) : (
                    <span className="text-blue-600 italic">Will auto-fill from code</span>
                  )}
                </div>
                {showErrors && errors.deployment?.department?.departmentName && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.deployment.department.departmentName.message}
                  </p>
                )}
              </div>

              {/* Sub Department */}
              <div className="group">
                <Label htmlFor="subDepartmentCode" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Sub Department Code
                </Label>
                <Select 
                  value={watchedValues.deployment?.subDepartment?.subDepartmentCode} 
                  onValueChange={(value) => handleCodeChange("deployment", "subDepartment", value)}
                >
                  <SelectTrigger className="h-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white">
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
              </div>

              <div className="group">
                <Label htmlFor="subDepartmentName" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Sub Department Name
                </Label>
                <div className="h-10 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl text-blue-800 flex items-center font-medium shadow-sm">
                  {watchedValues.deployment?.subDepartment?.subDepartmentName ? (
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {watchedValues.deployment.subDepartment.subDepartmentName}
                    </span>
                  ) : (
                    <span className="text-blue-600 italic">Will auto-fill from code</span>
                  )}
                </div>
              </div>

              {/* Section */}
              <div className="group">
                <Label htmlFor="sectionCode" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Section Code
                </Label>
                <Select 
                  value={watchedValues.deployment?.section?.sectionCode} 
                  onValueChange={(value) => handleCodeChange("deployment", "section", value)}
                >
                  <SelectTrigger className="h-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white">
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
              </div>

              <div className="group">
                <Label htmlFor="sectionName" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Section Name
                </Label>
                <div className="h-10 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl text-blue-800 flex items-center font-medium shadow-sm">
                  {watchedValues.deployment?.section?.sectionName ? (
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {watchedValues.deployment.section.sectionName}
                    </span>
                  ) : (
                    <span className="text-blue-600 italic">Will auto-fill from code</span>
                  )}
                </div>
              </div>

              {/* Employee Category */}
              <div className="group">
                <Label htmlFor="employeeCategoryCode" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Employee Category Code <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={watchedValues.deployment?.employeeCategory?.employeeCategoryCode} 
                  onValueChange={(value) => handleCodeChange("deployment", "employeeCategory", value)}
                >
                  <SelectTrigger className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white ${
                    (showErrors && errors.deployment?.employeeCategory?.employeeCategoryCode) 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                  }`}>
                    <SelectValue placeholder="Select Employee Category Code" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-2 bg-white">
                    {employeeCategoryOptions.map((option) => (
                      <SelectItem key={option.code} value={option.code}>
                        {option.code} - {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {showErrors && errors.deployment?.employeeCategory?.employeeCategoryCode && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.deployment.employeeCategory.employeeCategoryCode.message}
                  </p>
                )}
              </div>

              <div className="group">
                <Label htmlFor="employeeCategoryTitle" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Employee Category Title <span className="text-red-500">*</span>
                </Label>
                <div className="h-10 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl text-blue-800 flex items-center font-medium shadow-sm">
                  {watchedValues.deployment?.employeeCategory?.employeeCategoryTitle ? (
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {watchedValues.deployment.employeeCategory.employeeCategoryTitle}
                    </span>
                  ) : (
                    <span className="text-blue-600 italic">Will auto-fill from code</span>
                  )}
                </div>
                {showErrors && errors.deployment?.employeeCategory?.employeeCategoryTitle && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.deployment.employeeCategory.employeeCategoryTitle.message}
                  </p>
                )}
              </div>

              {/* Grade */}
              <div className="group">
                <Label htmlFor="gradeCode" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Grade Code <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={watchedValues.deployment?.grade?.gradeCode} 
                  onValueChange={(value) => handleCodeChange("deployment", "grade", value)}
                >
                  <SelectTrigger className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white ${
                    (showErrors && errors.deployment?.grade?.gradeCode) 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                  }`}>
                    <SelectValue placeholder="Select Grade Code" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-2 bg-white">
                    {gradeOptions.map((option) => (
                      <SelectItem key={option.code} value={option.code}>
                        {option.code} - {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {showErrors && errors.deployment?.grade?.gradeCode && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.deployment.grade.gradeCode.message}
                  </p>
                )}
              </div>

              <div className="group">
                <Label htmlFor="gradeTitle" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Grade Title <span className="text-red-500">*</span>
                </Label>
                <div className="h-10 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl text-blue-800 flex items-center font-medium shadow-sm">
                  {watchedValues.deployment?.grade?.gradeTitle ? (
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {watchedValues.deployment.grade.gradeTitle}
                    </span>
                  ) : (
                    <span className="text-blue-600 italic">Will auto-fill from code</span>
                  )}
                </div>
                {showErrors && errors.deployment?.grade?.gradeTitle && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.deployment.grade.gradeTitle.message}
                  </p>
                )}
              </div>

              {/* Designation */}
              <div className="group">
                <Label htmlFor="designationCode" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Designation Code <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={watchedValues.deployment?.designation?.designationCode} 
                  onValueChange={(value) => handleCodeChange("deployment", "designation", value)}
                >
                  <SelectTrigger className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white ${
                    (showErrors && errors.deployment?.designation?.designationCode) 
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
                {showErrors && errors.deployment?.designation?.designationCode && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.deployment.designation.designationCode.message}
                  </p>
                )}
              </div>

              <div className="group">
                <Label htmlFor="designationName" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Designation Name <span className="text-red-500">*</span>
                </Label>
                <div className="h-10 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl text-blue-800 flex items-center font-medium shadow-sm">
                  {watchedValues.deployment?.designation?.designationName ? (
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {watchedValues.deployment.designation.designationName}
                    </span>
                  ) : (
                    <span className="text-blue-600 italic">Will auto-fill from code</span>
                  )}
                </div>
                {showErrors && errors.deployment?.designation?.designationName && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.deployment.designation.designationName.message}
                  </p>
                )}
              </div>

              {/* Location */}
              <div className="group">
                <Label htmlFor="locationCode" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Location Code <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={watchedValues.deployment?.location?.locationCode} 
                  onValueChange={(value) => handleCodeChange("deployment", "location", value)}
                >
                  <SelectTrigger className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white ${
                    (showErrors && errors.deployment?.location?.locationCode) 
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
                {showErrors && errors.deployment?.location?.locationCode && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.deployment.location.locationCode.message}
                  </p>
                )}
              </div>

              <div className="group">
                <Label htmlFor="locationName" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Location Name <span className="text-red-500">*</span>
                </Label>
                <div className="h-10 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl text-blue-800 flex items-center font-medium shadow-sm">
                  {watchedValues.deployment?.location?.locationName ? (
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {watchedValues.deployment.location.locationName}
                    </span>
                  ) : (
                    <span className="text-blue-600 italic">Will auto-fill from code</span>
                  )}
                </div>
                {showErrors && errors.deployment?.location?.locationName && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.deployment.location.locationName.message}
                  </p>
                )}
              </div>

              {/* Skill Level */}
              <div className="group">
                <Label htmlFor="skilledLevelTitle" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Skill Level Title <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={watchedValues.deployment?.skillLevel?.skilledLevelTitle} 
                  onValueChange={(value) => {
                    const option = skillLevelOptions.find(opt => opt.title === value)
                    setValue("deployment.skillLevel.skilledLevelTitle", value)
                    setValue("deployment.skillLevel.skilledLevelDescription", option?.description || "")
                    onFormDataChange({
                      deployment: {
                        ...formData.deployment,
                        skillLevel: {
                          skilledLevelTitle: value,
                          skilledLevelDescription: option?.description || ""
                        }
                      }
                    })
                  }}
                >
                  <SelectTrigger className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white ${
                    (showErrors && errors.deployment?.skillLevel?.skilledLevelTitle) 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                  }`}>
                    <SelectValue placeholder="Select Skill Level" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-2 bg-white">
                    {skillLevelOptions.map((option) => (
                      <SelectItem key={option.title} value={option.title}>
                        {option.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {showErrors && errors.deployment?.skillLevel?.skilledLevelTitle && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.deployment.skillLevel.skilledLevelTitle.message}
                  </p>
                )}
              </div>

              <div className="group">
                <Label htmlFor="skilledLevelDescription" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Skill Level Description
                </Label>
                <div className="h-10 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl text-blue-800 flex items-center font-medium shadow-sm">
                  {watchedValues.deployment?.skillLevel?.skilledLevelDescription ? (
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {watchedValues.deployment.skillLevel.skilledLevelDescription}
                    </span>
                  ) : (
                    <span className="text-blue-600 italic">Will auto-fill from selection</span>
                  )}
                </div>
              </div>

              {/* Contractor */}
              <div className="group">
                <Label htmlFor="contractorName" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Contractor Name <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={watchedValues.deployment?.contractor?.contractorName} 
                  onValueChange={(value) => {
                    setValue("deployment.contractor.contractorName", value)
                    onFormDataChange({
                      deployment: {
                        ...formData.deployment,
                        contractor: {
                          contractorName: value
                        }
                      }
                    })
                  }}
                >
                  <SelectTrigger className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white ${
                    (showErrors && errors.deployment?.contractor?.contractorName) 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                  }`}>
                    <SelectValue placeholder="Select Contractor" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-2 bg-white">
                    {contractorOptions.map((option) => (
                      <SelectItem key={option.code} value={option.name}>
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {showErrors && errors.deployment?.contractor?.contractorName && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.deployment.contractor.contractorName.message}
                  </p>
                )}
              </div>

            </div>
          </div>

          <Separator />

          {/* Deployment Details */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              Deployment Details
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Effective From */}
              <div className="group">
                <Label htmlFor="effectiveFrom" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Deployment Effective From <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="effectiveFrom"
                  type="date"
                  {...register("deployment.effectiveFrom")}
                  className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white ${
                    (showErrors && errors.deployment?.effectiveFrom) 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                  }`}
                  placeholder="Select effective date"
                />
                {showErrors && errors.deployment?.effectiveFrom && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.deployment.effectiveFrom.message}
                  </p>
                )}
              </div>

              {/* Remark */}
              <div className="group">
                <Label htmlFor="remark" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Deployment Remark <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="remark"
                  {...register("deployment.remark")}
                  className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white ${
                    (showErrors && errors.deployment?.remark) 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                  }`}
                  placeholder="Enter deployment remark"
                />
                {showErrors && errors.deployment?.remark && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.deployment.remark.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Bank Details */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Banknote className="h-5 w-5 text-blue-600" />
              Bank Details
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="group">
                <Label htmlFor="bankName" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Bank Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="bankName"
                  {...register("bankDetails.bankName")}
                  className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white ${
                    (showErrors && errors.bankDetails?.bankName) 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                  }`}
                  placeholder="Enter bank name"
                />
                {showErrors && errors.bankDetails?.bankName && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.bankDetails.bankName.message}
                  </p>
                )}
              </div>

              <div className="group">
                <Label htmlFor="branchName" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Branch Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="branchName"
                  {...register("bankDetails.branchName")}
                  className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white ${
                    (showErrors && errors.bankDetails?.branchName) 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                  }`}
                  placeholder="Enter branch name"
                />
                {showErrors && errors.bankDetails?.branchName && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.bankDetails.branchName.message}
                  </p>
                )}
              </div>

              <div className="group">
                <Label htmlFor="accountNumber" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Account Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="accountNumber"
                  {...register("bankDetails.accountNumber")}
                  className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white ${
                    (showErrors && errors.bankDetails?.accountNumber) 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                  }`}
                  placeholder="Enter account number"
                />
                {showErrors && errors.bankDetails?.accountNumber && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.bankDetails.accountNumber.message}
                  </p>
                )}
              </div>

              <div className="group">
                <Label htmlFor="ifscCode" className="text-sm font-semibold text-gray-700 mb-2 block">
                  IFSC Code <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="ifscCode"
                  {...register("bankDetails.ifscCode")}
                  className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white ${
                    (showErrors && errors.bankDetails?.ifscCode) 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                  }`}
                  placeholder="Enter IFSC code"
                />
                {showErrors && errors.bankDetails?.ifscCode && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.bankDetails.ifscCode.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Bus Details */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Bus className="h-5 w-5 text-blue-600" />
              Bus Details
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="group">
                <Label htmlFor="busNumber" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Bus Number
                </Label>
                <Input
                  id="busNumber"
                  {...register("busDetail.busNumber")}
                  className="h-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white"
                  placeholder="Enter bus number"
                />
              </div>

              <div className="group">
                <Label htmlFor="busRegistrationNumber" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Bus Registration Number
                </Label>
                <Input
                  id="busRegistrationNumber"
                  {...register("busDetail.busRegistrationNumber")}
                  className="h-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white"
                  placeholder="Enter registration number"
                />
              </div>

              <div className="group">
                <Label htmlFor="route" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Route
                </Label>
                <Input
                  id="route"
                  {...register("busDetail.route")}
                  className="h-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white"
                  placeholder="Enter route"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Management Hierarchy */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Management Hierarchy
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="group">
                <Label htmlFor="manager" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Manager
                </Label>
                <Input
                  id="manager"
                  {...register("manager")}
                  className="h-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white"
                  placeholder="Enter manager ID"
                />
              </div>

              <div className="group">
                <Label htmlFor="superviser" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Supervisor
                </Label>
                <Input
                  id="superviser"
                  {...register("superviser")}
                  className="h-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white"
                  placeholder="Enter supervisor ID"
                />
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