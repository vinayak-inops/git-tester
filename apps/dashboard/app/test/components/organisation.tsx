"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Hash,
  FileText,
  Globe,
  User,
  Info,
  CheckCircle2,
  AlertCircle,
  Save,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@repo/ui/components/ui/input"
import { Label } from "@repo/ui/components/ui/label"
import { Textarea } from "@repo/ui/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@repo/ui/components/ui/tooltip"
import { Badge } from "@repo/ui/components/ui/badge"
import { Progress } from "@repo/ui/components/ui/progress"

interface FormData {
  organizationName: string
  organizationCode: string
  addressLine1: string
  addressLine2: string
  city: string
  pincode: string
  state: string
  country: string
  email: string
  contactNumber: string
  registrationNumber: string
  tenantCode: string
  description: string
  status: string
}

interface FieldValidation {
  isValid: boolean
  message: string
}

export default function Component() {
  const [formData, setFormData] = useState<FormData>({
    organizationName: "",
    organizationCode: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    pincode: "",
    state: "",
    country: "",
    email: "",
    contactNumber: "",
    registrationNumber: "",
    tenantCode: "",
    description: "",
    status: "",
  })

  const [validation, setValidation] = useState<Record<string, FieldValidation>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isAutoSaving, setIsAutoSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [completionPercentage, setCompletionPercentage] = useState(0)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  // Real-time validation
  const validateField = useCallback((field: string, value: string): FieldValidation => {
    switch (field) {
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return {
          isValid: emailRegex.test(value) || value === "",
          message: value && !emailRegex.test(value) ? "Please enter a valid email address" : "",
        }
      case "contactNumber":
        const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
        return {
          isValid: phoneRegex.test(value) || value === "",
          message: value && !phoneRegex.test(value) ? "Please enter a valid phone number" : "",
        }
      case "pincode":
        const pincodeRegex = /^\d{5,6}$/
        return {
          isValid: pincodeRegex.test(value) || value === "",
          message: value && !pincodeRegex.test(value) ? "Please enter a valid pincode (5-6 digits)" : "",
        }
      case "organizationCode":
        return {
          isValid: value.length >= 3 || value === "",
          message: value && value.length < 3 ? "Organization code must be at least 3 characters" : "",
        }
      default:
        return { isValid: true, message: "" }
    }
  }, [])

  // Auto-save functionality
  const autoSave = useCallback(async () => {
    setIsAutoSaving(true)
    // Simulate auto-save
    await new Promise((resolve) => setTimeout(resolve, 500))
    setLastSaved(new Date())
    setIsAutoSaving(false)
  }, [])

  // Calculate completion percentage
  const calculateCompletion = useCallback(() => {
    const requiredFields = [
      "organizationName",
      "organizationCode",
      "addressLine1",
      "city",
      "pincode",
      "state",
      "country",
      "email",
      "contactNumber",
      "registrationNumber",
      "tenantCode",
      "status",
    ]
    const filledFields = requiredFields.filter((field) => formData[field as keyof FormData].trim() !== "")
    return Math.round((filledFields.length / requiredFields.length) * 100)
  }, [formData])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Real-time validation
    const fieldValidation = validateField(field, value)
    setValidation((prev) => ({ ...prev, [field]: fieldValidation }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Form submitted:", formData)
    setIsSubmitting(false)
    setShowSuccess(true)

    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000)
  }

  // Auto-format phone number
  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "")
    if (cleaned.length <= 10) {
      return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")
    }
    return value
  }

  // Auto-format pincode
  const formatPincode = (value: string) => {
    return value.replace(/\D/g, "").slice(0, 6)
  }

  useEffect(() => {
    setCompletionPercentage(calculateCompletion())
  }, [formData, calculateCompletion])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (Object.values(formData).some((value) => value.trim() !== "")) {
        autoSave()
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [formData, autoSave])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-4 md:p-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="mx-auto max-w-5xl relative z-10">
        {/* Enhanced Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-100 to-purple-100 p-3 mb-6 shadow-lg">
            <div className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 p-4 shadow-inner">
              <Building2 className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Organization Registration
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Join our platform by completing this comprehensive registration form. We'll guide you through each step.
          </p>

          {/* Progress and Status Bar */}
          <div className="mt-6 max-w-md mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">Completion Progress</span>
              <Badge variant={completionPercentage === 100 ? "default" : "secondary"} className="text-xs">
                {completionPercentage}%
              </Badge>
            </div>
            <Progress value={completionPercentage} className="h-2 bg-slate-200" />

            {/* Auto-save indicator */}
            <div className="flex items-center justify-center mt-3 text-xs text-slate-500">
              {isAutoSaving ? (
                <div className="flex items-center gap-1">
                  <Save className="h-3 w-3 animate-spin" />
                  Saving...
                </div>
              ) : lastSaved ? (
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-green-500" />
                  Last saved {lastSaved.toLocaleTimeString()}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-right">
            <CheckCircle2 className="h-5 w-5" />
            Organization registered successfully!
          </div>
        )}

        {/* Enhanced Form Card */}
        <Card className="overflow-hidden border-0 shadow-2xl bg-white/95 backdrop-blur-sm rounded-3xl">
          {/* Enhanced Progress Bar */}
          <div className="h-2 w-full bg-gradient-to-r from-slate-100 to-slate-200">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-r-full transition-all duration-700 ease-out"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>

          <CardContent className="p-0">
            <form onSubmit={handleSubmit} className="space-y-0">
              {/* Basic Information */}
              <div className="space-y-8 p-8 md:p-10 border-b border-slate-100 bg-gradient-to-r from-blue-50/30 to-purple-50/30">
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                      Basic Information
                      <Sparkles className="h-5 w-5 text-yellow-500" />
                    </h3>
                    <p className="text-slate-600 mt-1">Tell us about your organization</p>
                  </div>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                  <div className="space-y-3">
                    <Label
                      htmlFor="organizationName"
                      className="text-sm font-semibold text-slate-700 flex items-center gap-2"
                    >
                      Organization Name <span className="text-red-500">*</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-slate-400 cursor-help hover:text-blue-500 transition-colors" />
                          </TooltipTrigger>
                          <TooltipContent side="top" className="max-w-xs">
                            <p className="text-sm">
                              Enter the official registered name of your organization as it appears on legal documents
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Label>
                    <div className="relative group">
                      <Input
                        id="organizationName"
                        placeholder="e.g., Acme Corporation Ltd."
                        value={formData.organizationName}
                        onChange={(e) => handleInputChange("organizationName", e.target.value)}
                        onFocus={() => setFocusedField("organizationName")}
                        onBlur={() => setFocusedField(null)}
                        className={`h-14 rounded-2xl border-2 bg-white/80 backdrop-blur-sm text-base transition-all duration-300 ${
                          focusedField === "organizationName"
                            ? "border-blue-400 shadow-lg shadow-blue-100 scale-[1.02]"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                        required
                      />
                      {formData.organizationName && (
                        <CheckCircle2 className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="organizationCode"
                      className="text-sm font-semibold text-slate-700 flex items-center gap-2"
                    >
                      Organization Code <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative group">
                      <Hash className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                      <Input
                        id="organizationCode"
                        placeholder="e.g., ACME001"
                        value={formData.organizationCode}
                        onChange={(e) => handleInputChange("organizationCode", e.target.value.toUpperCase())}
                        onFocus={() => setFocusedField("organizationCode")}
                        onBlur={() => setFocusedField(null)}
                        className={`h-14 pl-12 rounded-2xl border-2 bg-white/80 backdrop-blur-sm text-base transition-all duration-300 ${
                          focusedField === "organizationCode"
                            ? "border-blue-400 shadow-lg shadow-blue-100 scale-[1.02]"
                            : "border-slate-200 hover:border-slate-300"
                        } ${validation.organizationCode?.isValid === false ? "border-red-400" : ""}`}
                        required
                      />
                      {validation.organizationCode?.message && (
                        <div className="absolute -bottom-6 left-0 flex items-center gap-1 text-red-500 text-xs">
                          <AlertCircle className="h-3 w-3" />
                          {validation.organizationCode.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="space-y-8 p-8 md:p-10 border-b border-slate-100 bg-gradient-to-r from-green-50/30 to-blue-50/30">
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">Address Information</h3>
                    <p className="text-slate-600 mt-1">Where is your organization located?</p>
                  </div>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                  <div className="space-y-3 md:col-span-2">
                    <Label
                      htmlFor="addressLine1"
                      className="text-sm font-semibold text-slate-700 flex items-center gap-2"
                    >
                      Street Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="addressLine1"
                      placeholder="e.g., 123 Business Street"
                      value={formData.addressLine1}
                      onChange={(e) => handleInputChange("addressLine1", e.target.value)}
                      onFocus={() => setFocusedField("addressLine1")}
                      onBlur={() => setFocusedField(null)}
                      className={`h-14 rounded-2xl border-2 bg-white/80 backdrop-blur-sm text-base transition-all duration-300 ${
                        focusedField === "addressLine1"
                          ? "border-green-400 shadow-lg shadow-green-100 scale-[1.02]"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                      required
                    />
                  </div>

                  <div className="space-y-3 md:col-span-2">
                    <Label htmlFor="addressLine2" className="text-sm font-semibold text-slate-700">
                      Apartment, Suite, Unit (Optional)
                    </Label>
                    <Input
                      id="addressLine2"
                      placeholder="e.g., Suite 100, Floor 2"
                      value={formData.addressLine2}
                      onChange={(e) => handleInputChange("addressLine2", e.target.value)}
                      onFocus={() => setFocusedField("addressLine2")}
                      onBlur={() => setFocusedField(null)}
                      className={`h-14 rounded-2xl border-2 bg-white/80 backdrop-blur-sm text-base transition-all duration-300 ${
                        focusedField === "addressLine2"
                          ? "border-green-400 shadow-lg shadow-green-100 scale-[1.02]"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="city" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      City <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="city"
                      placeholder="e.g., New York"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      onFocus={() => setFocusedField("city")}
                      onBlur={() => setFocusedField(null)}
                      className={`h-14 rounded-2xl border-2 bg-white/80 backdrop-blur-sm text-base transition-all duration-300 ${
                        focusedField === "city"
                          ? "border-green-400 shadow-lg shadow-green-100 scale-[1.02]"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="pincode" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      Pincode <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="pincode"
                        placeholder="e.g., 10001"
                        value={formData.pincode}
                        onChange={(e) => handleInputChange("pincode", formatPincode(e.target.value))}
                        onFocus={() => setFocusedField("pincode")}
                        onBlur={() => setFocusedField(null)}
                        className={`h-14 rounded-2xl border-2 bg-white/80 backdrop-blur-sm text-base transition-all duration-300 ${
                          focusedField === "pincode"
                            ? "border-green-400 shadow-lg shadow-green-100 scale-[1.02]"
                            : "border-slate-200 hover:border-slate-300"
                        } ${validation.pincode?.isValid === false ? "border-red-400" : ""}`}
                        required
                      />
                      {validation.pincode?.message && (
                        <div className="absolute -bottom-6 left-0 flex items-center gap-1 text-red-500 text-xs">
                          <AlertCircle className="h-3 w-3" />
                          {validation.pincode.message}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="state" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      State <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="state"
                      placeholder="e.g., New York"
                      value={formData.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      onFocus={() => setFocusedField("state")}
                      onBlur={() => setFocusedField(null)}
                      className={`h-14 rounded-2xl border-2 bg-white/80 backdrop-blur-sm text-base transition-all duration-300 ${
                        focusedField === "state"
                          ? "border-green-400 shadow-lg shadow-green-100 scale-[1.02]"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="country" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      Country <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative group">
                      <Globe className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 group-focus-within:text-green-500 transition-colors" />
                      <Input
                        id="country"
                        placeholder="e.g., United States"
                        value={formData.country}
                        onChange={(e) => handleInputChange("country", e.target.value)}
                        onFocus={() => setFocusedField("country")}
                        onBlur={() => setFocusedField(null)}
                        className={`h-14 pl-12 rounded-2xl border-2 bg-white/80 backdrop-blur-sm text-base transition-all duration-300 ${
                          focusedField === "country"
                            ? "border-green-400 shadow-lg shadow-green-100 scale-[1.02]"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-8 p-8 md:p-10 border-b border-slate-100 bg-gradient-to-r from-purple-50/30 to-pink-50/30">
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">Contact Information</h3>
                    <p className="text-slate-600 mt-1">How can we reach you?</p>
                  </div>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      Email Address <span className="text-red-500">*</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-slate-400 cursor-help hover:text-purple-500 transition-colors" />
                          </TooltipTrigger>
                          <TooltipContent side="top" className="max-w-xs">
                            <p className="text-sm">
                              This email will be used for all important communications and account notifications
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-500 transition-colors" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="e.g., contact@acme.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        className={`h-14 pl-12 rounded-2xl border-2 bg-white/80 backdrop-blur-sm text-base transition-all duration-300 ${
                          focusedField === "email"
                            ? "border-purple-400 shadow-lg shadow-purple-100 scale-[1.02]"
                            : "border-slate-200 hover:border-slate-300"
                        } ${validation.email?.isValid === false ? "border-red-400" : ""}`}
                        required
                      />
                      {validation.email?.message && (
                        <div className="absolute -bottom-6 left-0 flex items-center gap-1 text-red-500 text-xs">
                          <AlertCircle className="h-3 w-3" />
                          {validation.email.message}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="contactNumber"
                      className="text-sm font-semibold text-slate-700 flex items-center gap-2"
                    >
                      Contact Number <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-500 transition-colors" />
                      <Input
                        id="contactNumber"
                        type="tel"
                        placeholder="e.g., +1 (555) 123-4567"
                        value={formData.contactNumber}
                        onChange={(e) => handleInputChange("contactNumber", e.target.value)}
                        onFocus={() => setFocusedField("contactNumber")}
                        onBlur={() => setFocusedField(null)}
                        className={`h-14 pl-12 rounded-2xl border-2 bg-white/80 backdrop-blur-sm text-base transition-all duration-300 ${
                          focusedField === "contactNumber"
                            ? "border-purple-400 shadow-lg shadow-purple-100 scale-[1.02]"
                            : "border-slate-200 hover:border-slate-300"
                        } ${validation.contactNumber?.isValid === false ? "border-red-400" : ""}`}
                        required
                      />
                      {validation.contactNumber?.message && (
                        <div className="absolute -bottom-6 left-0 flex items-center gap-1 text-red-500 text-xs">
                          <AlertCircle className="h-3 w-3" />
                          {validation.contactNumber.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Registration Details */}
              <div className="space-y-8 p-8 md:p-10 border-b border-slate-100 bg-gradient-to-r from-orange-50/30 to-red-50/30">
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">Registration Details</h3>
                    <p className="text-slate-600 mt-1">Legal and system identification</p>
                  </div>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                  <div className="space-y-3">
                    <Label
                      htmlFor="registrationNumber"
                      className="text-sm font-semibold text-slate-700 flex items-center gap-2"
                    >
                      Registration Number <span className="text-red-500">*</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-slate-400 cursor-help hover:text-orange-500 transition-colors" />
                          </TooltipTrigger>
                          <TooltipContent side="top" className="max-w-xs">
                            <p className="text-sm">
                              Enter your official business registration number from government authorities
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Label>
                    <Input
                      id="registrationNumber"
                      placeholder="e.g., REG123456789"
                      value={formData.registrationNumber}
                      onChange={(e) => handleInputChange("registrationNumber", e.target.value.toUpperCase())}
                      onFocus={() => setFocusedField("registrationNumber")}
                      onBlur={() => setFocusedField(null)}
                      className={`h-14 rounded-2xl border-2 bg-white/80 backdrop-blur-sm text-base transition-all duration-300 ${
                        focusedField === "registrationNumber"
                          ? "border-orange-400 shadow-lg shadow-orange-100 scale-[1.02]"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="tenantCode"
                      className="text-sm font-semibold text-slate-700 flex items-center gap-2"
                    >
                      Tenant Code <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                      <Input
                        id="tenantCode"
                        placeholder="e.g., TNT001"
                        value={formData.tenantCode}
                        onChange={(e) => handleInputChange("tenantCode", e.target.value.toUpperCase())}
                        onFocus={() => setFocusedField("tenantCode")}
                        onBlur={() => setFocusedField(null)}
                        className={`h-14 pl-12 rounded-2xl border-2 bg-white/80 backdrop-blur-sm text-base transition-all duration-300 ${
                          focusedField === "tenantCode"
                            ? "border-orange-400 shadow-lg shadow-orange-100 scale-[1.02]"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="description" className="text-sm font-semibold text-slate-700">
                    Organization Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Tell us about your organization, its mission, and what you do..."
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    onFocus={() => setFocusedField("description")}
                    onBlur={() => setFocusedField(null)}
                    className={`min-h-[140px] resize-none rounded-2xl border-2 bg-white/80 backdrop-blur-sm text-base transition-all duration-300 ${
                      focusedField === "description"
                        ? "border-orange-400 shadow-lg shadow-orange-100 scale-[1.01]"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  />
                  <div className="text-xs text-slate-500 text-right">{formData.description.length}/500 characters</div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="status" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    Organization Status <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => handleInputChange("status", value)}
                    required
                  >
                    <SelectTrigger
                      className={`h-14 rounded-2xl border-2 bg-white/80 backdrop-blur-sm text-base transition-all duration-300 ${
                        focusedField === "status"
                          ? "border-orange-400 shadow-lg shadow-orange-100"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <SelectValue placeholder="Select your organization status" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-2 border-slate-200 bg-white/95 backdrop-blur-sm">
                      <SelectItem value="active" className="focus:bg-green-50 rounded-xl">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Active - Currently operating
                        </div>
                      </SelectItem>
                      <SelectItem value="inactive" className="focus:bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                          Inactive - Temporarily not operating
                        </div>
                      </SelectItem>
                      <SelectItem value="pending" className="focus:bg-yellow-50 rounded-xl">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          Pending - Awaiting approval
                        </div>
                      </SelectItem>
                      <SelectItem value="suspended" className="focus:bg-red-50 rounded-xl">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          Suspended - Temporarily restricted
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Enhanced Submit Section */}
              <div className="flex flex-col sm:flex-row justify-between items-center p-8 md:p-10 bg-gradient-to-r from-slate-50/80 to-blue-50/80">
                <div className="text-sm text-slate-600 mb-4 sm:mb-0">
                  <div className="flex items-center gap-2">
                    <span className="text-red-500">*</span>
                    <span>Required fields</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">All information is encrypted and secure</div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || completionPercentage < 100}
                  className={`
                    relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700
                    text-white px-10 py-4 h-auto font-semibold text-lg shadow-2xl 
                    hover:shadow-3xl hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 
                    transition-all duration-500 ease-out transform hover:scale-105
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                    min-w-[200px]
                  `}
                >
                  {isSubmitting && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-blue-700 to-purple-700">
                      <svg
                        className="animate-spin h-6 w-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </div>
                  )}
                  {isSubmitting ? (
                    "Registering Organization..."
                  ) : (
                    <>
                      <Sparkles className="mr-3 h-5 w-5" />
                      Register Organization
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
