"use client"

import { useState } from "react"
import { CalendarIcon, User, Building2, Shield, FileText, MapPin, CheckCircle, Clock, Star, ArrowLeft, ArrowRight, Upload, File, Eye, Download, CreditCard, Landmark, Hash, DollarSign, Users, Heart, BadgeIcon as IdCard, Plus, Trash2, Baby, GraduationCap, BookOpen, Award, School, Trophy, Package, Briefcase, Monitor, UserPlus, Percent, AlertTriangle, Stethoscope, UserCheck, Activity } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@repo/ui/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Input } from "@repo/ui/components/ui/input"
import { Label } from "@repo/ui/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/ui/select"
import { Badge } from "@repo/ui/components/ui/badge"
import { Progress } from "@repo/ui/components/ui/progress"
import { Textarea } from "@repo/ui/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui/components/ui/popover"
import { Calendar } from "@repo/ui/components/ui/calendar"
import { Switch } from "@repo/ui/components/ui/switch"
import { cn } from "@repo/ui/lib/utils"

export default function ContractorEmployeeForm() {
  const [activeTab, setActiveTab] = useState("basic")

  const [completionProgress, setCompletionProgress] = useState(35)

  // Medical & Verification state variables
  const [checkupDate, setCheckupDate] = useState<Date>()
  const [nextCheckupDate, setNextCheckupDate] = useState<Date>()
  const [verificationDate, setVerificationDate] = useState<Date>()
  const [nextVerificationDate, setNextVerificationDate] = useState<Date>()

  // Disciplinary & Accidents state variables
  const [offenceDate, setOffenceDate] = useState<Date>()
  const [fineRealisedDate, setFineRealisedDate] = useState<Date>()
  const [issueReportedDate, setIssueReportedDate] = useState<Date>()
  const [actionTakenDate, setActionTakenDate] = useState<Date>()
  const [accidentDate, setAccidentDate] = useState<Date>()
  const [reportDate, setReportDate] = useState<Date>()
  const [returnDate, setReturnDate] = useState<Date>()
  const [causeShown, setCauseShown] = useState(false)

  // Status & Audit state variables
  const [resignationDate, setResignationDate] = useState<Date>()
  const [relievingDate, setRelievingDate] = useState<Date>()
  const [notToRehire, setNotToRehire] = useState(false)
  const [onNoticePeriod, setOnNoticePeriod] = useState(false)

  const tabs = [
    { id: "basic", label: "Basic Info", icon: User, completed: true },
    { id: "address", label: "Address", icon: MapPin, completed: false },
    { id: "documents", label: "Documents", icon: FileText, completed: false },
    { id: "bank", label: "Bank Details", icon: Building2, completed: false },
    { id: "family", label: "Family", icon: User, completed: false },
    { id: "education", label: "Education", icon: FileText, completed: false },
    { id: "experience", label: "Experience", icon: Building2, completed: false },
    { id: "training", label: "Training", icon: FileText, completed: false },
    { id: "assets", label: "Assets", icon: Shield, completed: false },
    { id: "penalties", label: "Penalties", icon: FileText, completed: false },
    { id: "assets-work", label: "Assets & Work", icon: Shield, completed: false },
    { id: "nominees", label: "Nominees", icon: Users, completed: false },
    { id: "medical-verification", label: "Medical Verification", icon: Stethoscope, completed: false },
    { id: "disciplinary-accidents", label: "Disciplinary & Accidents", icon: AlertTriangle, completed: false },
    { id: "status-audit", label: "Status & Audit", icon: Shield, completed: false },
  ]

  const getCurrentStepNumber = () => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab)
    return currentIndex + 1
  }

  const goToNextTab = () => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab)
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id)
    }
  }

  const goToPreviousTab = () => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab)
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].id)
    }
  }

  const renderCurrentForm = () => {
    switch (activeTab) {
      case "basic":
        return renderBasicInfoForm()
      case "address":
        return renderAddressForm()
      case "documents":
        return renderDocumentsForm()
      case "bank":
        return renderBankDetailsForm()
      case "family":
        return renderFamilyForm()
      case "education":
        return renderEducationForm()
      case "experience":
        return renderExperienceForm()
      case "training":
        return renderTrainingForm()
      case "assets":
        return renderAssetsForm()
      case "penalties":
        return renderPenaltiesForm()
      case "assets-work":
        return renderAssetsWorkForm()
      case "nominees":
        return renderNomineesForm()
      case "medical-verification":
        return renderMedicalVerificationForm()
      case "disciplinary-accidents":
        return renderDisciplinaryAccidentsForm()
      case "status-audit":
        return renderStatusAuditForm()
      default:
        return renderBasicInfoForm()
    }
  }

  const renderBasicInfoForm = () => (
    <Card className="group relative overflow-hidden shadow-2xl border-0 bg-white/80 backdrop-blur-xl hover:shadow-3xl transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <CardHeader className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90 backdrop-blur-sm"></div>
        <div className="relative">
          <CardTitle className="flex items-center gap-4 text-xl">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <User className="h-6 w-6" />
            </div>
            <div>
              <div>Basic Information</div>
              <div className="text-sm font-normal text-blue-100 mt-1">
                Step {getCurrentStepNumber()} of {tabs.length}
              </div>
            </div>
          </CardTitle>
          <CardDescription className="text-blue-100 mt-3 text-base">
            Personal and employment details
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="relative p-8 space-y-12">
        {/* Personal Information Section */}
        <div className="space-y-8">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
              <p className="text-sm text-gray-600">Employee's personal details</p>
            </div>
            <Badge className="ml-auto bg-blue-100 text-blue-800 border-blue-200">Required</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Label htmlFor="firstName" className="text-sm font-semibold text-gray-700">
                First Name *
              </Label>
              <Input
                id="firstName"
                defaultValue="John"
                placeholder="Enter first name"
                className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-10 text-sm hover:bg-gray-50 transition-colors"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="lastName" className="text-sm font-semibold text-gray-700">
                Last Name *
              </Label>
              <Input
                id="lastName"
                defaultValue="Doe"
                placeholder="Enter last name"
                className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-10 text-sm hover:bg-gray-50 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Label htmlFor="dateOfBirth" className="text-sm font-semibold text-gray-700">
                Date of Birth *
              </Label>
              <div className="relative">
                <Input
                  id="dateOfBirth"
                  type="date"
                  className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <Label htmlFor="gender" className="text-sm font-semibold text-gray-700">
                Gender *
              </Label>
              <Select defaultValue="male">
                <SelectTrigger className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-10 text-sm hover:bg-gray-50 transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-xl">
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                defaultValue="john.doe@example.com"
                placeholder="Enter email address"
                className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-10 text-sm hover:bg-gray-50 transition-colors"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                defaultValue="+91 98765 43210"
                placeholder="Enter phone number"
                className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-10 text-sm hover:bg-gray-50 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Label htmlFor="emergencyContact" className="text-sm font-semibold text-gray-700">
                Emergency Contact *
              </Label>
              <Input
                id="emergencyContact"
                type="tel"
                defaultValue="+91 98765 43211"
                placeholder="Emergency contact number"
                className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-10 text-sm hover:bg-gray-50 transition-colors"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="bloodGroup" className="text-sm font-semibold text-gray-700">
                Blood Group
              </Label>
              <Select defaultValue="o-positive">
                <SelectTrigger className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-10 text-sm hover:bg-gray-50 transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-xl">
                  <SelectItem value="a-positive">A+</SelectItem>
                  <SelectItem value="a-negative">A-</SelectItem>
                  <SelectItem value="b-positive">B+</SelectItem>
                  <SelectItem value="b-negative">B-</SelectItem>
                  <SelectItem value="ab-positive">AB+</SelectItem>
                  <SelectItem value="ab-negative">AB-</SelectItem>
                  <SelectItem value="o-positive">O+</SelectItem>
                  <SelectItem value="o-negative">O-</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Employment Information Section */}
        <div className="space-y-8">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
            <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Employment Information</h3>
              <p className="text-sm text-gray-600">Work and contract details</p>
            </div>
            <Badge className="ml-auto bg-green-100 text-green-800 border-green-200">Required</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Label htmlFor="employeeId" className="text-sm font-semibold text-gray-700">
                Employee ID *
              </Label>
              <Input
                id="employeeId"
                defaultValue="EMP001"
                placeholder="Enter employee ID"
                className="bg-white border-gray-300 focus:border-green-500 focus:ring-green-500 h-10 text-sm hover:bg-gray-50 transition-colors font-mono"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="designation" className="text-sm font-semibold text-gray-700">
                Designation *
              </Label>
              <Input
                id="designation"
                defaultValue="Software Engineer"
                placeholder="Enter designation"
                className="bg-white border-gray-300 focus:border-green-500 focus:ring-green-500 h-10 text-sm hover:bg-gray-50 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Label htmlFor="department" className="text-sm font-semibold text-gray-700">
                Department *
              </Label>
              <Select defaultValue="it">
                <SelectTrigger className="bg-white border-gray-300 focus:border-green-500 focus:ring-green-500 h-10 text-sm hover:bg-gray-50 transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-xl">
                  <SelectItem value="it">Information Technology</SelectItem>
                  <SelectItem value="hr">Human Resources</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <Label htmlFor="joiningDate" className="text-sm font-semibold text-gray-700">
                Joining Date *
              </Label>
              <div className="relative">
                <Input
                  id="joiningDate"
                  type="date"
                  className="bg-white border-gray-300 focus:border-green-500 focus:ring-green-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Label htmlFor="contractType" className="text-sm font-semibold text-gray-700">
                Contract Type *
              </Label>
              <Select defaultValue="full-time">
                <SelectTrigger className="bg-white border-gray-300 focus:border-green-500 focus:ring-green-500 h-10 text-sm hover:bg-gray-50 transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-xl">
                  <SelectItem value="full-time">Full Time</SelectItem>
                  <SelectItem value="part-time">Part Time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                  <SelectItem value="freelance">Freelance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <Label htmlFor="contractEndDate" className="text-sm font-semibold text-gray-700">
                Contract End Date
              </Label>
              <div className="relative">
                <Input
                  id="contractEndDate"
                  type="date"
                  className="bg-white border-gray-300 focus:border-green-500 focus:ring-green-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              <p className="text-xs text-gray-500">Required for contract employees</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Label htmlFor="salary" className="text-sm font-semibold text-gray-700">
                Basic Salary *
              </Label>
              <Input
                id="salary"
                type="number"
                defaultValue="50000"
                placeholder="Enter basic salary"
                className="bg-white border-gray-300 focus:border-green-500 focus:ring-green-500 h-10 text-sm hover:bg-gray-50 transition-colors"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="currency" className="text-sm font-semibold text-gray-700">
                Currency *
              </Label>
              <Select defaultValue="inr">
                <SelectTrigger className="bg-white border-gray-300 focus:border-green-500 focus:ring-green-500 h-10 text-sm hover:bg-gray-50 transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-xl">
                  <SelectItem value="inr">₹ INR</SelectItem>
                  <SelectItem value="usd">$ USD</SelectItem>
                  <SelectItem value="eur">€ EUR</SelectItem>
                  <SelectItem value="gbp">£ GBP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="space-y-8">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Additional Information</h3>
              <p className="text-sm text-gray-600">Additional details and notes</p>
            </div>
            <Badge variant="outline" className="ml-auto border-purple-200 text-purple-700">
              Optional
            </Badge>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="notes" className="text-sm font-semibold text-gray-700">
                Notes
              </Label>
              <Textarea
                id="notes"
                placeholder="Any additional notes or comments..."
                className="bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500 min-h-[100px] text-sm hover:bg-gray-50 transition-colors"
              />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
                <Label htmlFor="linkedin" className="text-sm font-semibold text-gray-700">
                  LinkedIn Profile
              </Label>
              <Input
                  id="linkedin"
                  type="url"
                  placeholder="https://linkedin.com/in/username"
                  className="bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500 h-10 text-sm hover:bg-gray-50 transition-colors"
              />
            </div>
            <div className="space-y-3">
                <Label htmlFor="website" className="text-sm font-semibold text-gray-700">
                  Personal Website
              </Label>
              <Input
                  id="website"
                  type="url"
                  placeholder="https://example.com"
                  className="bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500 h-10 text-sm hover:bg-gray-50 transition-colors"
              />
            </div>
            </div>
          </div>
        </div>

        {/* Status Information */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">Basic Information Status</h4>
              <p className="text-sm text-gray-600 mt-1">
                All required fields are completed. Basic information is ready for review.
              </p>
            </div>
            <Badge className="bg-green-100 text-green-800 border-green-200">Complete</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderAddressForm = () => (
    <Card className="group relative overflow-hidden shadow-2xl border-0 bg-white/80 backdrop-blur-xl hover:shadow-3xl transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <CardHeader className="relative bg-gradient-to-r from-cyan-600 via-cyan-700 to-blue-700 text-white">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/90 to-blue-700/90 backdrop-blur-sm"></div>
            <div className="relative">
              <CardTitle className="flex items-center gap-4 text-xl">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <div>Address Information</div>
                  <div className="text-sm font-normal text-cyan-100 mt-1">
                    Step {getCurrentStepNumber()} of {tabs.length}
                  </div>
                </div>
              </CardTitle>
              <CardDescription className="text-cyan-100 mt-3 text-base">
                Permanent and temporary address details
              </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="relative p-8 space-y-12">
        {/* Permanent Address Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
            <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Permanent Address</h3>
              <p className="text-sm text-gray-600">Your primary residential address</p>
            </div>
            <Badge className="ml-auto bg-green-100 text-green-800 border-green-200">Primary</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Label htmlFor="permAddressLine1" className="text-sm font-semibold text-gray-700">
                Address Line 1 *
              </Label>
              <Input
                id="permAddressLine1"
                defaultValue="123 Street"
                placeholder="Enter street address"
                className="bg-white border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 h-10 text-sm hover:bg-gray-50 transition-colors"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="permAddressLine2" className="text-sm font-semibold text-gray-700">
                Address Line 2
              </Label>
              <Input
                id="permAddressLine2"
                defaultValue="Near Park"
                placeholder="Apartment, suite, etc."
                className="bg-white border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 h-10 text-sm hover:bg-gray-50 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <Label htmlFor="permCountry" className="text-sm font-semibold text-gray-700">
                Country *
              </Label>
              <Select defaultValue="india">
                <SelectTrigger className="bg-white border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 h-10 text-sm hover:bg-gray-50 transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-xl">
                  <SelectItem value="india">🇮🇳 India</SelectItem>
                  <SelectItem value="usa">🇺🇸 United States</SelectItem>
                  <SelectItem value="uk">🇬🇧 United Kingdom</SelectItem>
                  <SelectItem value="canada">🇨🇦 Canada</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <Label htmlFor="permState" className="text-sm font-semibold text-gray-700">
                State *
              </Label>
              <Input
                id="permState"
                defaultValue="Tamil Nadu"
                placeholder="Enter state"
                className="bg-white border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 h-10 text-sm hover:bg-gray-50 transition-colors"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="permCity" className="text-sm font-semibold text-gray-700">
                City *
              </Label>
              <Input
                id="permCity"
                defaultValue="Chennai"
                placeholder="Enter city"
                className="bg-white border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 h-10 text-sm hover:bg-gray-50 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Label htmlFor="permPinCode" className="text-sm font-semibold text-gray-700">
                PIN Code *
              </Label>
              <Input
                id="permPinCode"
                defaultValue="600001"
                placeholder="Enter PIN code"
                className="bg-white border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 h-10 text-sm hover:bg-gray-50 transition-colors font-mono"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="permTaluka" className="text-sm font-semibold text-gray-700">
                Taluka
              </Label>
              <Input
                id="permTaluka"
                defaultValue="Central"
                placeholder="Enter taluka"
                className="bg-white border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 h-10 text-sm hover:bg-gray-50 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Address Copy Option */}
        <div className="flex items-center justify-center py-4">
          <div className="flex items-center gap-3 bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-3 rounded-full border border-gray-200">
            <input
              type="checkbox"
              id="sameAsPermament"
              className="w-4 h-4 text-cyan-600 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500"
            />
            <Label htmlFor="sameAsPermament" className="text-sm font-medium text-gray-700 cursor-pointer">
              Temporary address is same as permanent address
            </Label>
          </div>
        </div>

        {/* Temporary Address Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Temporary Address</h3>
              <p className="text-sm text-gray-600">Current or temporary residential address</p>
            </div>
            <Badge variant="outline" className="ml-auto border-orange-200 text-orange-700">
              Temporary
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Label htmlFor="tempAddressLine1" className="text-sm font-semibold text-gray-700">
                Address Line 1 *
              </Label>
              <Input
                id="tempAddressLine1"
                defaultValue="456 Street"
                placeholder="Enter street address"
                className="bg-white border-gray-300 focus:border-orange-500 focus:ring-orange-500 h-10 text-sm hover:bg-gray-50 transition-colors"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="tempAddressLine2" className="text-sm font-semibold text-gray-700">
                Address Line 2
              </Label>
              <Input
                id="tempAddressLine2"
                defaultValue="Near Mall"
                placeholder="Apartment, suite, etc."
                className="bg-white border-gray-300 focus:border-orange-500 focus:ring-orange-500 h-10 text-sm hover:bg-gray-50 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <Label htmlFor="tempCountry" className="text-sm font-semibold text-gray-700">
                Country *
              </Label>
              <Select defaultValue="india">
                <SelectTrigger className="bg-white border-gray-300 focus:border-orange-500 focus:ring-orange-500 h-10 text-sm hover:bg-gray-50 transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-xl">
                  <SelectItem value="india">🇮🇳 India</SelectItem>
                  <SelectItem value="usa">🇺🇸 United States</SelectItem>
                  <SelectItem value="uk">🇬🇧 United Kingdom</SelectItem>
                  <SelectItem value="canada">🇨🇦 Canada</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <Label htmlFor="tempState" className="text-sm font-semibold text-gray-700">
                State *
              </Label>
              <Input
                id="tempState"
                defaultValue="Tamil Nadu"
                placeholder="Enter state"
                className="bg-white border-gray-300 focus:border-orange-500 focus:ring-orange-500 h-10 text-sm hover:bg-gray-50 transition-colors"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="tempCity" className="text-sm font-semibold text-gray-700">
                City *
              </Label>
              <Input
                id="tempCity"
                defaultValue="Chennai"
                placeholder="Enter city"
                className="bg-white border-gray-300 focus:border-orange-500 focus:ring-orange-500 h-10 text-sm hover:bg-gray-50 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Label htmlFor="tempPinCode" className="text-sm font-semibold text-gray-700">
                PIN Code *
              </Label>
              <Input
                id="tempPinCode"
                defaultValue="600002"
                placeholder="Enter PIN code"
                className="bg-white border-gray-300 focus:border-orange-500 focus:ring-orange-500 h-10 text-sm hover:bg-gray-50 transition-colors font-mono"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="tempTaluka" className="text-sm font-semibold text-gray-700">
                Taluka
              </Label>
              <Input
                id="tempTaluka"
                defaultValue="West"
                placeholder="Enter taluka"
                className="bg-white border-gray-300 focus:border-orange-500 focus:ring-orange-500 h-10 text-sm hover:bg-gray-50 transition-colors"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderDocumentsForm = () => (
    <Card className="group relative overflow-hidden shadow-2xl border-0 bg-white/80 backdrop-blur-xl hover:shadow-3xl transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/5 to-teal-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <CardHeader className="relative bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/90 to-teal-700/90 backdrop-blur-sm"></div>
        <div className="relative">
          <CardTitle className="flex items-center gap-4 text-xl">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <div>Document Information</div>
              <div className="text-sm font-normal text-emerald-100 mt-1">
                Step {getCurrentStepNumber()} of {tabs.length}
              </div>
            </div>
          </CardTitle>
          <CardDescription className="text-emerald-100 mt-3 text-base">
            Upload and manage your identification documents
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="relative p-8 space-y-12">
        {/* Document Upload Section */}
        <div className="space-y-8">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
            <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Identity Documents</h3>
              <p className="text-sm text-gray-600">Upload your official identification documents</p>
            </div>
            <Badge className="ml-auto bg-blue-100 text-blue-800 border-blue-200">Required</Badge>
          </div>

          {/* Document Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <Label htmlFor="documentTypeCode" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                Document Type Code *
                <Badge variant="secondary" className="text-xs">
                  Auto-generated
                </Badge>
              </Label>
              <div className="relative">
                <Input
                  id="documentTypeCode"
                  value="DOC1"
                  className="bg-gradient-to-r from-gray-50 to-gray-100 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 h-10 text-sm font-mono"
                  readOnly
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <Label htmlFor="documentTypeTitle" className="text-sm font-semibold text-gray-700">
                Document Type Title *
              </Label>
              <Select defaultValue="pan">
                <SelectTrigger className="bg-white border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 h-10 text-sm hover:bg-gray-50 transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-xl">
                  <SelectItem value="pan">🆔 PAN CARD</SelectItem>
                  <SelectItem value="aadhar">🏛️ AADHAR CARD</SelectItem>
                  <SelectItem value="passport">📘 PASSPORT</SelectItem>
                  <SelectItem value="driving">🚗 DRIVING LICENSE</SelectItem>
                  <SelectItem value="voter">🗳️ VOTER ID</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <Label htmlFor="identificationNumber" className="text-sm font-semibold text-gray-700">
                Identification Number *
              </Label>
              <Input
                id="identificationNumber"
                placeholder="Enter document number"
                className="bg-white border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 h-10 text-sm placeholder:text-gray-400 hover:bg-gray-50 transition-colors font-mono"
              />
            </div>
          </div>

          {/* File Upload Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                <Upload className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Document Upload</h3>
                <p className="text-sm text-gray-600">Upload clear, readable copies of your documents</p>
              </div>
              <Badge variant="outline" className="ml-auto border-blue-200 text-blue-700">
                PDF, JPG, PNG
              </Badge>
            </div>

            {/* Current Document Display */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg">
                    <File className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Current Document</h4>
                    <p className="text-sm text-gray-600 font-mono">/documents/idproof.pdf</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">Uploaded</Badge>
                      <span className="text-xs text-gray-500">• 2.4 MB • PDF</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </div>

            {/* Upload New Document */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-emerald-400 hover:bg-emerald-50/50 transition-all duration-300 cursor-pointer group">
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Upload className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Upload New Document</h3>
                  <p className="text-sm text-gray-600 mt-1">Drag and drop your file here, or click to browse</p>
                  <p className="text-xs text-gray-500 mt-2">Supported formats: PDF, JPG, PNG • Max size: 10MB</p>
                </div>
                <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                  <Upload className="h-4 w-4 mr-2" />
                  Choose File
                </Button>
              </div>
            </div>
          </div>

          {/* Document Verification Status */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Document Verification</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Your documents will be verified within 24-48 hours after submission
                </p>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending Verification</Badge>
            </div>
          </div>

          {/* Additional Documents Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Additional Documents</h3>
                <p className="text-sm text-gray-600">Optional supporting documents</p>
              </div>
              <Badge variant="outline" className="ml-auto border-purple-200 text-purple-700">
                Optional
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <File className="h-5 w-5 text-gray-400" />
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900">Educational Certificates</h5>
                    <p className="text-sm text-gray-500">Upload degree/diploma certificates</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <File className="h-5 w-5 text-gray-400" />
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900">Experience Letters</h5>
                    <p className="text-sm text-gray-500">Previous employment documents</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderBankDetailsForm = () => (
    <Card className="group relative overflow-hidden shadow-2xl border-0 bg-white/80 backdrop-blur-xl hover:shadow-3xl transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <CardHeader className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-700/90 backdrop-blur-sm"></div>
        <div className="relative">
          <CardTitle className="flex items-center gap-4 text-xl">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <div>Bank Details</div>
              <div className="text-sm font-normal text-blue-100 mt-1">
                Step {getCurrentStepNumber()} of {tabs.length}
              </div>
            </div>
          </CardTitle>
          <CardDescription className="text-blue-100 mt-3 text-base">
            Provide your banking information for salary and payment processing
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="relative p-8 space-y-12">
        {/* Bank Account Information */}
        <div className="space-y-8">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
              <Landmark className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Primary Bank Account</h3>
              <p className="text-sm text-gray-600">Your salary will be credited to this account</p>
            </div>
            <Badge className="ml-auto bg-red-100 text-red-800 border-red-200">Required</Badge>
          </div>

          {/* Bank Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Label htmlFor="bankName" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Landmark className="h-4 w-4 text-blue-600" />
                Bank Name *
              </Label>
              <div className="relative">
                <Input
                  id="bankName"
                  defaultValue="Bank A"
                  className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Building2 className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="branchName" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Building2 className="h-4 w-4 text-blue-600" />
                Branch Name *
              </Label>
              <div className="relative">
                <Input
                  id="branchName"
                  defaultValue="Branch A"
                  className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Building2 className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="ifscCode" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Hash className="h-4 w-4 text-blue-600" />
                IFSC Code *
              </Label>
              <div className="relative">
                <Input
                  id="ifscCode"
                  defaultValue="IFSC001"
                  className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-10 text-sm hover:bg-gray-50 transition-colors font-mono pl-12 uppercase"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Hash className="h-5 w-5 text-gray-400" />
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
              </div>
              <p className="text-xs text-gray-500">11-character alphanumeric code</p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="accountNumber" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-blue-600" />
                Account Number *
              </Label>
              <div className="relative">
                <Input
                  id="accountNumber"
                  defaultValue="1234567890"
                  className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-10 text-sm hover:bg-gray-50 transition-colors font-mono pl-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <CreditCard className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Account Type Selection */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
              <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg">
                <DollarSign className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Account Information</h3>
                <p className="text-sm text-gray-600">Additional account details and preferences</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="accountType" className="text-sm font-semibold text-gray-700">
                  Account Type *
                </Label>
                <Select defaultValue="savings">
                  <SelectTrigger className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-10 text-sm hover:bg-gray-50 transition-colors">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-xl">
                    <SelectItem value="savings">💰 Savings Account</SelectItem>
                    <SelectItem value="current">🏢 Current Account</SelectItem>
                    <SelectItem value="salary">💼 Salary Account</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="accountHolderName" className="text-sm font-semibold text-gray-700">
                  Account Holder Name *
                </Label>
                <Input
                  id="accountHolderName"
                  placeholder="As per bank records"
                  className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-10 text-sm placeholder:text-gray-400 hover:bg-gray-50 transition-colors"
                />
                <p className="text-xs text-gray-500">Must match exactly with bank records</p>
              </div>
            </div>
          </div>

          {/* Bank Verification Status */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Bank Account Verification</h4>
                <p className="text-sm text-gray-600 mt-1">
                  We'll verify your bank account details through a small test deposit (₹1) which will be refunded
                </p>
              </div>
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">Pending Verification</Badge>
            </div>
          </div>

          {/* Additional Banking Information */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                <CreditCard className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Additional Information</h3>
                <p className="text-sm text-gray-600">Optional banking preferences</p>
              </div>
              <Badge variant="outline" className="ml-auto border-purple-200 text-purple-700">
                Optional
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-blue-500" />
                    <h5 className="font-medium text-gray-900">UPI ID</h5>
                  </div>
                  <Input
                    placeholder="yourname@bankname"
                    className="bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500">For quick payments and transfers</p>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-blue-500" />
                    <h5 className="font-medium text-gray-900">Branch Address</h5>
                  </div>
                  <Input
                    placeholder="Branch full address"
                    className="bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500">Complete branch address</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderFamilyForm = () => (
    <Card className="group relative overflow-hidden shadow-2xl border-0 bg-white/80 backdrop-blur-xl hover:shadow-3xl transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-r from-pink-600/5 to-rose-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <CardHeader className="relative bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600/90 to-red-600/90 backdrop-blur-sm"></div>
        <div className="relative">
          <CardTitle className="flex items-center gap-4 text-xl">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <div>Family Members</div>
              <div className="text-sm font-normal text-pink-100 mt-1">
                Step {getCurrentStepNumber()} of {tabs.length}
              </div>
            </div>
          </CardTitle>
          <CardDescription className="text-pink-100 mt-3 text-base">
            Add information about your family members and dependents
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="relative p-8 space-y-12">
        {/* Family Member 1 */}
        <div className="space-y-8">
          <div className="flex items-center justify-between pb-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Family Member 1</h3>
                <p className="text-sm text-gray-600">Primary family member information</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">Primary</Badge>
              <Button variant="outline" size="sm" className="border-red-200 text-red-700 hover:bg-red-50">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Personal Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <Label htmlFor="memberName" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <User className="h-4 w-4 text-pink-600" />
                Member Name *
              </Label>
              <div className="relative">
                <Input
                  id="memberName"
                  defaultValue="Jane Doe"
                  className="bg-white border-gray-300 focus:border-pink-500 focus:ring-pink-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="relation" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Heart className="h-4 w-4 text-pink-600" />
                Relation *
              </Label>
              <Select defaultValue="spouse">
                <SelectTrigger className="bg-white border-gray-300 focus:border-pink-500 focus:ring-pink-500 h-10 text-sm hover:bg-gray-50 transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-xl">
                  <SelectItem value="spouse">💑 Spouse</SelectItem>
                  <SelectItem value="child">👶 Child</SelectItem>
                  <SelectItem value="parent">👨‍👩‍👧‍👦 Parent</SelectItem>
                  <SelectItem value="sibling">👫 Sibling</SelectItem>
                  <SelectItem value="other">👥 Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="gender" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Users className="h-4 w-4 text-pink-600" />
                Gender *
              </Label>
              <Select defaultValue="female">
                <SelectTrigger className="bg-white border-gray-300 focus:border-pink-500 focus:ring-pink-500 h-10 text-sm hover:bg-gray-50 transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-xl">
                  <SelectItem value="female">👩 Female</SelectItem>
                  <SelectItem value="male">👨 Male</SelectItem>
                  <SelectItem value="other">⚧ Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="birthDate" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-pink-600" />
                Birth Date *
              </Label>
              <div className="relative">
                <Input
                  id="birthDate"
                  type="date"
                  defaultValue="1992-03-15"
                  className="bg-white border-gray-300 focus:border-pink-500 focus:ring-pink-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="isDependent" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Baby className="h-4 w-4 text-pink-600" />
                Is Dependent *
              </Label>
              <Select defaultValue="yes">
                <SelectTrigger className="bg-white border-gray-300 focus:border-pink-500 focus:ring-pink-500 h-10 text-sm hover:bg-gray-50 transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-xl">
                  <SelectItem value="yes">✅ Yes</SelectItem>
                  <SelectItem value="no">❌ No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Document Information */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                <IdCard className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Identity Documents</h3>
                <p className="text-sm text-gray-600">Official identification documents</p>
              </div>
              <Badge variant="outline" className="ml-auto border-blue-200 text-blue-700">
                Required
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="aadharNumber" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <IdCard className="h-4 w-4 text-blue-600" />
                  Aadhar Card Number *
                </Label>
                <div className="relative">
                  <Input
                    id="aadharNumber"
                    defaultValue="123456789012"
                    className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-10 text-sm hover:bg-gray-50 transition-colors font-mono pl-12"
                    maxLength={12}
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <IdCard className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="aadharPath" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-600" />
                  Aadhar Card Path
                </Label>
                <div className="relative">
                  <Input
                    id="aadharPath"
                    defaultValue="/documents/aadhar.pdf"
                    className="bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-10 text-sm font-mono pl-12"
                    readOnly
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FileText className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="electionNumber" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <IdCard className="h-4 w-4 text-blue-600" />
                  Election Card Number
                </Label>
                <div className="relative">
                  <Input
                    id="electionNumber"
                    defaultValue="ELE1234567"
                    className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-10 text-sm hover:bg-gray-50 transition-colors font-mono pl-12"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <IdCard className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="electionPath" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-600" />
                  Election Card Path
                </Label>
                <div className="relative">
                  <Input
                    id="electionPath"
                    defaultValue="/documents/electioncard.pdf"
                    className="bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-10 text-sm font-mono pl-12"
                    readOnly
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FileText className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="panNumber" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <IdCard className="h-4 w-4 text-blue-600" />
                  PAN Card Number
                </Label>
                <div className="relative">
                  <Input
                    id="panNumber"
                    defaultValue="PAN1234567"
                    className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-10 text-sm hover:bg-gray-50 transition-colors font-mono pl-12 uppercase"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <IdCard className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="panPath" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-600" />
                  PAN Card Path
                </Label>
                <div className="relative">
                  <Input
                    id="panPath"
                    defaultValue="/documents/pancard.pdf"
                    className="bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-10 text-sm font-mono pl-12"
                    readOnly
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FileText className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Remarks Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Additional Information</h3>
                <p className="text-sm text-gray-600">Optional remarks and notes</p>
              </div>
              <Badge variant="outline" className="ml-auto border-purple-200 text-purple-700">
                Optional
              </Badge>
            </div>

            <div className="space-y-3">
              <Label htmlFor="remark" className="text-sm font-semibold text-gray-700">
                Remark
              </Label>
              <Textarea
                id="remark"
                defaultValue="N/A"
                placeholder="Add any additional notes about this family member..."
                className="bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500 min-h-[100px] text-sm hover:bg-gray-50 transition-colors resize-none"
              />
            </div>
          </div>

          {/* Family Member Status */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Family Member Verification</h4>
                <p className="text-sm text-gray-600 mt-1">
                  All family member information will be verified against official records
                </p>
              </div>
              <Badge className="bg-green-100 text-green-800 border-green-200">Verified</Badge>
            </div>
          </div>
        </div>

        {/* Add More Family Members */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-pink-400 hover:bg-pink-50/50 transition-all duration-300 cursor-pointer group">
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Plus className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Add Another Family Member</h3>
              <p className="text-sm text-gray-600 mt-1">Click to add more family members or dependents</p>
            </div>
            <Button className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Family Member
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderEducationForm = () => (
    <Card className="group relative overflow-hidden shadow-2xl border-0 bg-white/80 backdrop-blur-xl hover:shadow-3xl transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <CardHeader className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/90 to-violet-600/90 backdrop-blur-sm"></div>
        <div className="relative">
          <CardTitle className="flex items-center gap-4 text-xl">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <div>Education Information</div>
              <div className="text-sm font-normal text-indigo-100 mt-1">
                Step {getCurrentStepNumber()} of {tabs.length}
              </div>
            </div>
          </CardTitle>
          <CardDescription className="text-indigo-100 mt-3 text-base">
            Provide your educational qualifications and academic achievements
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="relative p-8 space-y-12">
        {/* Primary Education */}
        <div className="space-y-8">
          <div className="flex items-center justify-between pb-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Primary Education</h3>
                <p className="text-sm text-gray-600">Your highest educational qualification</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">Primary</Badge>
              <Button variant="outline" size="sm" className="border-red-200 text-red-700 hover:bg-red-50">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Education Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Label htmlFor="educationTitle" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Award className="h-4 w-4 text-indigo-600" />
                Education Title *
              </Label>
              <div className="relative">
                <Input
                  id="educationTitle"
                  defaultValue="B.Tech"
                  className="bg-white border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Award className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="courseTitle" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-indigo-600" />
                Course Title *
              </Label>
              <div className="relative">
                <Input
                  id="courseTitle"
                  defaultValue="Electrical Engineering"
                  className="bg-white border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <BookOpen className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="stream" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <School className="h-4 w-4 text-indigo-600" />
                Stream *
              </Label>
              <Select defaultValue="engineering">
                <SelectTrigger className="bg-white border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 h-10 text-sm hover:bg-gray-50 transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-xl">
                  <SelectItem value="engineering">⚙️ Engineering</SelectItem>
                  <SelectItem value="science">🔬 Science</SelectItem>
                  <SelectItem value="commerce">💼 Commerce</SelectItem>
                  <SelectItem value="arts">🎨 Arts</SelectItem>
                  <SelectItem value="medical">🏥 Medical</SelectItem>
                  <SelectItem value="law">⚖️ Law</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="college" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <School className="h-4 w-4 text-indigo-600" />
                College/University *
              </Label>
              <div className="relative">
                <Input
                  id="college"
                  defaultValue="XYZ University"
                  className="bg-white border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <School className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="yearOfPassing" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-indigo-600" />
                Year of Passing *
              </Label>
              <div className="relative">
                <Input
                  id="yearOfPassing"
                  defaultValue="2012"
                  type="number"
                  min="1950"
                  max="2030"
                  className="bg-white border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <CalendarIcon className="h-4 w-4 text-pink-600" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="monthOfPassing" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-indigo-600" />
                Month of Passing *
              </Label>
              <Select defaultValue="6">
                <SelectTrigger className="bg-white border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 h-10 text-sm hover:bg-gray-50 transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-xl">
                  <SelectItem value="1">January</SelectItem>
                  <SelectItem value="2">February</SelectItem>
                  <SelectItem value="3">March</SelectItem>
                  <SelectItem value="4">April</SelectItem>
                  <SelectItem value="5">May</SelectItem>
                  <SelectItem value="6">June</SelectItem>
                  <SelectItem value="7">July</SelectItem>
                  <SelectItem value="8">August</SelectItem>
                  <SelectItem value="9">September</SelectItem>
                  <SelectItem value="10">October</SelectItem>
                  <SelectItem value="11">November</SelectItem>
                  <SelectItem value="12">December</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="percentage" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Trophy className="h-4 w-4 text-indigo-600" />
                Percentage/CGPA *
              </Label>
              <div className="relative">
                <Input
                  id="percentage"
                  defaultValue="75%"
                  className="bg-white border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Trophy className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              <p className="text-xs text-gray-500">Enter percentage (e.g., 75%) or CGPA (e.g., 8.5)</p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="isVerified" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-indigo-600" />
                Is Verified *
              </Label>
              <Select defaultValue="yes">
                <SelectTrigger className="bg-white border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 h-10 text-sm hover:bg-gray-50 transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-xl">
                  <SelectItem value="yes">✅ Yes - Verified</SelectItem>
                  <SelectItem value="no">❌ No - Pending</SelectItem>
                  <SelectItem value="partial">⏳ Partially Verified</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Education Verification Status */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Education Verification</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Your educational credentials have been verified against official university records
                </p>
              </div>
              <Badge className="bg-green-100 text-green-800 border-green-200">Verified</Badge>
            </div>
          </div>
        </div>

        {/* Additional Qualifications */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
              <Award className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Additional Qualifications</h3>
              <p className="text-sm text-gray-600">Certifications, diplomas, and other achievements</p>
            </div>
            <Badge variant="outline" className="ml-auto border-blue-200 text-blue-700">
              Optional
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-blue-500" />
                  <h5 className="font-medium text-gray-900">Professional Certifications</h5>
                </div>
                <Input
                  placeholder="e.g., PMP, AWS, Google Cloud"
                  className="bg-gray-50 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                />
                <p className="text-xs text-gray-500">List your professional certifications</p>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-blue-500" />
                  <h5 className="font-medium text-gray-900">Additional Courses</h5>
                </div>
                <Input
                  placeholder="e.g., Machine Learning, Data Science"
                  className="bg-gray-50 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                />
                <p className="text-xs text-gray-500">Online courses, workshops, etc.</p>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Trophy className="h-5 w-5 text-blue-500" />
                  <h5 className="font-medium text-gray-900">Awards & Honors</h5>
                </div>
                <Input
                  placeholder="e.g., Dean's List, Merit Scholarship"
                  className="bg-gray-50 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                />
                <p className="text-xs text-gray-500">Academic achievements and recognitions</p>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-blue-500" />
                  <h5 className="font-medium text-gray-900">Research & Publications</h5>
                </div>
                <Input
                  placeholder="e.g., Research papers, thesis"
                  className="bg-gray-50 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                />
                <p className="text-xs text-gray-500">Academic research and publications</p>
              </div>
            </div>
          </div>
        </div>

        {/* Add More Education */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-indigo-400 hover:bg-indigo-50/50 transition-all duration-300 cursor-pointer group">
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Plus className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Add Another Education</h3>
              <p className="text-sm text-gray-600 mt-1">Add additional degrees, diplomas, or certifications</p>
            </div>
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Education
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderExperienceForm = () => (
    <Card className="group relative overflow-hidden shadow-2xl border-0 bg-white/80 backdrop-blur-xl hover:shadow-3xl transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/5 to-teal-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <CardHeader className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/90 to-cyan-600/90 backdrop-blur-sm"></div>
        <div className="relative">
          <CardTitle className="flex items-center gap-4 text-xl">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <div>Experience Information</div>
              <div className="text-sm font-normal text-emerald-100 mt-1">
                Step {getCurrentStepNumber()} of {tabs.length}
              </div>
            </div>
          </CardTitle>
          <CardDescription className="text-emerald-100 mt-3 text-base">
            Provide your professional work experience and employment history
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="relative p-8 space-y-12">
        {/* Primary Work Experience */}
        <div className="space-y-8">
          <div className="flex items-center justify-between pb-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Work Experience 1</h3>
                <p className="text-sm text-gray-600">Your most recent or current employment</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">Current</Badge>
              <Button variant="outline" size="sm" className="border-red-200 text-red-700 hover:bg-red-50">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Experience Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Label htmlFor="companyName" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Building2 className="h-4 w-4 text-emerald-600" />
                Company Name *
              </Label>
              <div className="relative">
                <Input
                  id="companyName"
                  defaultValue="ABC Corp"
                  className="bg-white border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Building2 className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="designation" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Award className="h-4 w-4 text-emerald-600" />
                Designation *
              </Label>
              <div className="relative">
                <Input
                  id="designation"
                  defaultValue="Engineer"
                  className="bg-white border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Award className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="fromDate" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-emerald-600" />
                From Date *
              </Label>
              <div className="relative">
                <Input
                  id="fromDate"
                  type="date"
                  defaultValue="2013-01-01"
                  className="bg-white border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <CalendarIcon className="h-4 w-4 text-pink-600" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="toDate" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-emerald-600" />
                To Date *
              </Label>
              <div className="relative">
                <Input
                  id="toDate"
                  type="date"
                  defaultValue="2022-12-31"
                  className="bg-white border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              <p className="text-xs text-gray-500">Leave blank if currently employed</p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="filePath" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <FileText className="h-4 w-4 text-emerald-600" />
                Experience Certificate Path
              </Label>
              <div className="relative">
                <Input
                  id="filePath"
                  defaultValue="/documents/experience.pdf"
                  className="bg-gray-50 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 h-10 text-sm font-mono pl-12"
                  readOnly
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FileText className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="employmentType" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Building2 className="h-4 w-4 text-emerald-600" />
                Employment Type *
              </Label>
              <Select defaultValue="fulltime">
                <SelectTrigger className="bg-white border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 h-10 text-sm hover:bg-gray-50 transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-xl">
                  <SelectItem value="fulltime">💼 Full-time</SelectItem>
                  <SelectItem value="parttime">⏰ Part-time</SelectItem>
                  <SelectItem value="contract">📝 Contract</SelectItem>
                  <SelectItem value="freelance">🆓 Freelance</SelectItem>
                  <SelectItem value="internship">🎓 Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Additional Experience Details */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                <Award className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Additional Details</h3>
                <p className="text-sm text-gray-600">Salary, location, and other employment information</p>
              </div>
              <Badge variant="outline" className="ml-auto border-blue-200 text-blue-700">
                Optional
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="location" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  Work Location
                </Label>
                <div className="relative">
                  <Input
                    id="location"
                    placeholder="e.g., New York, NY"
                    className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="salary" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-blue-600" />
                  Salary Range
                </Label>
                <div className="relative">
                  <Input
                    id="salary"
                    placeholder="e.g., $50,000 - $60,000"
                    className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="responsibilities" className="text-sm font-semibold text-gray-700">
                Key Responsibilities & Achievements
              </Label>
              <Textarea
                id="responsibilities"
                placeholder="Describe your main responsibilities, achievements, and key projects..."
                className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 min-h-[120px] text-sm hover:bg-gray-50 transition-colors resize-none"
              />
            </div>
          </div>

          {/* Experience Verification Status */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Experience Verification</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Your employment history will be verified with previous employers and HR records
                </p>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending Verification</Badge>
            </div>
          </div>
        </div>

        {/* Skills & Technologies */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
              <Award className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Skills & Technologies</h3>
              <p className="text-sm text-gray-600">Technical skills and tools used in this role</p>
            </div>
            <Badge variant="outline" className="ml-auto border-purple-200 text-purple-700">
              Optional
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-purple-500" />
                  <h5 className="font-medium text-gray-900">Technical Skills</h5>
                </div>
                <Input
                  placeholder="e.g., JavaScript, Python, React"
                  className="bg-gray-50 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                />
                <p className="text-xs text-gray-500">Programming languages, frameworks, etc.</p>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-purple-500" />
                  <h5 className="font-medium text-gray-900">Tools & Software</h5>
                </div>
                <Input
                  placeholder="e.g., Docker, AWS, Jira"
                  className="bg-gray-50 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                />
                <p className="text-xs text-gray-500">Development tools, platforms, etc.</p>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-purple-500" />
                  <h5 className="font-medium text-gray-900">Soft Skills</h5>
                </div>
                <Input
                  placeholder="e.g., Leadership, Communication"
                  className="bg-gray-50 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                />
                <p className="text-xs text-gray-500">Management, communication skills, etc.</p>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-purple-500" />
                  <h5 className="font-medium text-gray-900">Certifications</h5>
                </div>
                <Input
                  placeholder="e.g., PMP, AWS Certified"
                  className="bg-gray-50 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                />
                <p className="text-xs text-gray-500">Professional certifications earned</p>
              </div>
            </div>
          </div>
        </div>

        {/* Add More Experience */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-emerald-400 hover:bg-emerald-50/50 transition-all duration-300 cursor-pointer group">
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Plus className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Add Another Experience</h3>
              <p className="text-sm text-gray-600 mt-1">Add previous employment or work experience</p>
            </div>
            <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderTrainingForm = () => (
    <Card className="group relative overflow-hidden shadow-2xl border-0 bg-white/80 backdrop-blur-xl hover:shadow-3xl transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-600/5 to-amber-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <CardHeader className="relative bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/90 to-yellow-600/90 backdrop-blur-sm"></div>
        <div className="relative">
          <CardTitle className="flex items-center gap-4 text-xl">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <div>Training Information</div>
              <div className="text-sm font-normal text-orange-100 mt-1">
                Step {getCurrentStepNumber()} of {tabs.length}
              </div>
            </div>
          </CardTitle>
          <CardDescription className="text-orange-100 mt-3 text-base">
            Provide details about your professional training and certifications
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="relative p-8 space-y-12">
        {/* Training 1 */}
        <div className="space-y-8">
          <div className="flex items-center justify-between pb-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Training 1</h3>
                <p className="text-sm text-gray-600">Primary training program details</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">Active</Badge>
              <Button variant="outline" size="sm" className="border-red-200 text-red-700 hover:bg-red-50">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Training Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Label
                htmlFor="trainingProgramCode"
                className="text-sm font-semibold text-gray-700 flex items-center gap-2"
              >
                <Award className="h-4 w-4 text-orange-600" />
                Training Program Code *
              </Label>
              <div className="relative">
                <Input
                  id="trainingProgramCode"
                  defaultValue="TRP001"
                  className="bg-white border-gray-300 focus:border-orange-500 focus:ring-orange-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12 font-mono"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Award className="h-5 w-5 text-gray-400" />
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="trainingProgramTitle"
                className="text-sm font-semibold text-gray-700 flex items-center gap-2"
              >
                <BookOpen className="h-4 w-4 text-orange-600" />
                Training Program Title *
              </Label>
              <div className="relative">
                <Input
                  id="trainingProgramTitle"
                  defaultValue="Safety Training"
                  className="bg-white border-gray-300 focus:border-orange-500 focus:ring-orange-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <BookOpen className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="fromDate" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-orange-600" />
                From Date *
              </Label>
              <div className="relative">
                <Input
                  id="fromDate"
                  type="date"
                  defaultValue="2022-01-01"
                  className="bg-white border-gray-300 focus:border-orange-500 focus:ring-orange-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="toDate" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-orange-600" />
                To Date *
              </Label>
              <div className="relative">
                <Input
                  id="toDate"
                  type="date"
                  defaultValue="2022-01-15"
                  className="bg-white border-gray-300 focus:border-orange-500 focus:ring-orange-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="totalDays" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-600" />
                Total Days *
              </Label>
              <div className="relative">
                <Input
                  id="totalDays"
                  type="number"
                  defaultValue="15"
                  min="1"
                  className="bg-white border-gray-300 focus:border-orange-500 focus:ring-orange-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Clock className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="totalHours" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-600" />
                Total Hours *
              </Label>
              <div className="relative">
                <Input
                  id="totalHours"
                  type="number"
                  defaultValue="120"
                  min="1"
                  className="bg-white border-gray-300 focus:border-orange-500 focus:ring-orange-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Clock className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="validUpto" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-orange-600" />
                Valid Upto *
              </Label>
              <div className="relative">
                <Input
                  id="validUpto"
                  type="date"
                  defaultValue="2023-01-01"
                  className="bg-white border-gray-300 focus:border-orange-500 focus:ring-orange-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              <p className="text-xs text-gray-500">Certificate expiration date</p>
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="conductedByFaculty"
                className="text-sm font-semibold text-gray-700 flex items-center gap-2"
              >
                <Users className="h-4 w-4 text-orange-600" />
                Conducted By Faculty *
              </Label>
              <div className="relative">
                <Input
                  id="conductedByFaculty"
                  defaultValue="Trainer A"
                  className="bg-white border-gray-300 focus:border-orange-500 focus:ring-orange-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Users className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="conductedByCompany"
                className="text-sm font-semibold text-gray-700 flex items-center gap-2"
              >
                <Building2 className="h-4 w-4 text-orange-600" />
                Conducted By Company *
              </Label>
              <div className="relative">
                <Input
                  id="conductedByCompany"
                  defaultValue="ABC Corp"
                  className="bg-white border-gray-300 focus:border-orange-500 focus:ring-orange-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Building2 className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="filePath" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <FileText className="h-4 w-4 text-orange-600" />
                Training Certificate Path
              </Label>
              <div className="relative">
                <Input
                  id="filePath"
                  defaultValue="/documents/training.pdf"
                  className="bg-gray-50 border-gray-300 focus:border-orange-500 focus:ring-orange-500 h-10 text-sm font-mono pl-12"
                  readOnly
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FileText className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Training Category & Type */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                <Award className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Training Classification</h3>
                <p className="text-sm text-gray-600">Category and type of training program</p>
              </div>
              <Badge variant="outline" className="ml-auto border-blue-200 text-blue-700">
                Optional
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label
                  htmlFor="trainingCategory"
                  className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                >
                  <BookOpen className="h-4 w-4 text-blue-600" />
                  Training Category
                </Label>
                <Select defaultValue="safety">
                  <SelectTrigger className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-10 text-sm hover:bg-gray-50 transition-colors">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-xl">
                    <SelectItem value="safety">🦺 Safety Training</SelectItem>
                    <SelectItem value="technical">⚙️ Technical Training</SelectItem>
                    <SelectItem value="compliance">📋 Compliance Training</SelectItem>
                    <SelectItem value="leadership">👥 Leadership Training</SelectItem>
                    <SelectItem value="soft-skills">💬 Soft Skills Training</SelectItem>
                    <SelectItem value="certification">🏆 Certification Program</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="trainingType" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-blue-600" />
                  Training Type
                </Label>
                <Select defaultValue="classroom">
                  <SelectTrigger className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-10 text-sm hover:bg-gray-50 transition-colors">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-xl">
                    <SelectItem value="classroom">🏫 Classroom Training</SelectItem>
                    <SelectItem value="online">💻 Online Training</SelectItem>
                    <SelectItem value="workshop">🔧 Workshop</SelectItem>
                    <SelectItem value="seminar">🎤 Seminar</SelectItem>
                    <SelectItem value="hands-on">👐 Hands-on Training</SelectItem>
                    <SelectItem value="hybrid">🔄 Hybrid Training</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Training Description */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Training Details</h3>
                <p className="text-sm text-gray-600">Additional information about the training</p>
              </div>
              <Badge variant="outline" className="ml-auto border-purple-200 text-purple-700">
                Optional
              </Badge>
            </div>

            <div className="space-y-3">
              <Label htmlFor="trainingDescription" className="text-sm font-semibold text-gray-700">
                Training Description & Objectives
              </Label>
              <Textarea
                id="trainingDescription"
                placeholder="Describe the training content, objectives, and key learning outcomes..."
                className="bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500 min-h-[120px] text-sm hover:bg-gray-50 transition-colors resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-purple-500" />
                    <h5 className="font-medium text-gray-900">Skills Acquired</h5>
                  </div>
                  <Input
                    placeholder="e.g., Risk Assessment, Emergency Response"
                    className="bg-gray-50 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                  />
                  <p className="text-xs text-gray-500">Key skills learned during training</p>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-purple-500" />
                    <h5 className="font-medium text-gray-900">Certification Status</h5>
                  </div>
                  <Select defaultValue="completed">
                    <SelectTrigger className="bg-gray-50 border-gray-200 focus:border-purple-500 focus:ring-purple-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="completed">✅ Completed</SelectItem>
                      <SelectItem value="in-progress">⏳ In Progress</SelectItem>
                      <SelectItem value="pending">⏸️ Pending</SelectItem>
                      <SelectItem value="expired">❌ Expired</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500">Current status of certification</p>
                </div>
              </div>
            </div>
          </div>

          {/* Training Verification Status */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Training Verification</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Your training records have been verified with the training provider and certification body
                </p>
              </div>
              <Badge className="bg-green-100 text-green-800 border-green-200">Verified</Badge>
            </div>
          </div>
        </div>

        {/* Add More Training */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-orange-400 hover:bg-orange-50/50 transition-all duration-300 cursor-pointer group">
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Plus className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Add Another Training</h3>
              <p className="text-sm text-gray-600 mt-1">Add additional training programs or certifications</p>
            </div>
            <Button className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Training
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderAssetsForm = () => (
    <Card className="group relative overflow-hidden shadow-2xl border-0 bg-white/80 backdrop-blur-xl hover:shadow-3xl transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <CardHeader className="relative bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/90 to-indigo-600/90 backdrop-blur-sm"></div>
        <div className="relative">
          <CardTitle className="flex items-center gap-4 text-xl">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <div>Assets Information</div>
              <div className="text-sm font-normal text-violet-100 mt-1">
                Step {getCurrentStepNumber()} of {tabs.length}
              </div>
            </div>
          </CardTitle>
          <CardDescription className="text-violet-100 mt-3 text-base">
            Declare your assets and valuable possessions
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="relative p-8 space-y-12">
        {/* Asset 1 */}
        <div className="space-y-8">
          <div className="flex items-center justify-between pb-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Asset 1</h3>
                <p className="text-sm text-gray-600">Primary asset declaration</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">Primary</Badge>
              <Button variant="outline" size="sm" className="border-red-200 text-red-700 hover:bg-red-50">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Asset Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Label htmlFor="assetCode" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Award className="h-4 w-4 text-violet-600" />
                Asset Code *
              </Label>
              <div className="relative">
                <Input
                  id="assetCode"
                  defaultValue="AST001"
                  className="bg-white border-gray-300 focus:border-violet-500 focus:ring-violet-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12 font-mono"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Award className="h-5 w-5 text-gray-400" />
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="assetName" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Shield className="h-4 w-4 text-violet-600" />
                Asset Name *
              </Label>
              <div className="relative">
                <Input
                  id="assetName"
                  defaultValue="Laptop"
                  className="bg-white border-gray-300 focus:border-violet-500 focus:ring-violet-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Shield className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="assetType" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Building2 className="h-4 w-4 text-violet-600" />
                Asset Type *
              </Label>
              <Select defaultValue="electronic">
                <SelectTrigger className="bg-white border-gray-300 focus:border-violet-500 focus:ring-violet-500 h-10 text-sm hover:bg-gray-50 transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-xl">
                  <SelectItem value="electronic">💻 Electronic Equipment</SelectItem>
                  <SelectItem value="vehicle">🚗 Vehicle</SelectItem>
                  <SelectItem value="property">🏠 Property</SelectItem>
                  <SelectItem value="jewelry">💎 Jewelry</SelectItem>
                  <SelectItem value="investment">📈 Investment</SelectItem>
                  <SelectItem value="other">📦 Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="assetValue" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-violet-600" />
                Asset Value *
              </Label>
              <div className="relative">
                <Input
                  id="assetValue"
                  defaultValue="50000"
                  type="number"
                  min="0"
                  className="bg-white border-gray-300 focus:border-violet-500 focus:ring-violet-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              <p className="text-xs text-gray-500">Enter value in your local currency</p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="purchaseDate" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-violet-600" />
                Purchase Date *
              </Label>
              <div className="relative">
                <Input
                  id="purchaseDate"
                  type="date"
                  defaultValue="2022-01-15"
                  className="bg-white border-gray-300 focus:border-violet-500 focus:ring-violet-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="assetLocation" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-violet-600" />
                Asset Location *
              </Label>
              <div className="relative">
                <Input
                  id="assetLocation"
                  defaultValue="Home Office"
                  className="bg-white border-gray-300 focus:border-violet-500 focus:ring-violet-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="assetStatus" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-violet-600" />
                Asset Status *
              </Label>
              <Select defaultValue="active">
                <SelectTrigger className="bg-white border-gray-300 focus:border-violet-500 focus:ring-violet-500 h-10 text-sm hover:bg-gray-50 transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-xl">
                  <SelectItem value="active">✅ Active</SelectItem>
                  <SelectItem value="inactive">⏸️ Inactive</SelectItem>
                  <SelectItem value="maintenance">🔧 Under Maintenance</SelectItem>
                  <SelectItem value="disposed">🗑️ Disposed</SelectItem>
                  <SelectItem value="lost">❌ Lost/Stolen</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="assetCondition" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Star className="h-4 w-4 text-violet-600" />
                Asset Condition
              </Label>
              <Select defaultValue="excellent">
                <SelectTrigger className="bg-white border-gray-300 focus:border-violet-500 focus:ring-violet-500 h-10 text-sm hover:bg-gray-50 transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-xl">
                  <SelectItem value="excellent">⭐ Excellent</SelectItem>
                  <SelectItem value="good">👍 Good</SelectItem>
                  <SelectItem value="fair">😐 Fair</SelectItem>
                  <SelectItem value="poor">👎 Poor</SelectItem>
                  <SelectItem value="damaged">💥 Damaged</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Asset Description */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Asset Details</h3>
                <p className="text-sm text-gray-600">Additional information about the asset</p>
              </div>
              <Badge variant="outline" className="ml-auto border-blue-200 text-blue-700">
                Optional
              </Badge>
            </div>

            <div className="space-y-3">
              <Label htmlFor="assetDescription" className="text-sm font-semibold text-gray-700">
                Asset Description
              </Label>
              <Textarea
                id="assetDescription"
                placeholder="Describe the asset, its specifications, and any relevant details..."
                className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 min-h-[120px] text-sm hover:bg-gray-50 transition-colors resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-blue-500" />
                    <h5 className="font-medium text-gray-900">Serial Number</h5>
                  </div>
                  <Input
                    placeholder="e.g., SN123456789"
                    className="bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500">Asset serial or model number</p>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-blue-500" />
                    <h5 className="font-medium text-gray-900">Insurance Details</h5>
                  </div>
                  <Input
                    placeholder="e.g., Policy #INS123456"
                    className="bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500">Insurance policy information</p>
                </div>
              </div>
            </div>
          </div>

          {/* Asset Verification Status */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Asset Verification</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Your asset declarations will be verified against official records and documentation
                </p>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending Verification</Badge>
            </div>
          </div>
        </div>

        {/* Add More Assets */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-violet-400 hover:bg-violet-50/50 transition-all duration-300 cursor-pointer group">
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Plus className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Add Another Asset</h3>
              <p className="text-sm text-gray-600 mt-1">Declare additional assets or valuable possessions</p>
            </div>
            <Button className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Asset
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderPenaltiesForm = () => (
    <Card className="group relative overflow-hidden shadow-2xl border-0 bg-white/80 backdrop-blur-xl hover:shadow-3xl transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 to-rose-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <CardHeader className="relative bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-pink-600/90 backdrop-blur-sm"></div>
        <div className="relative">
          <CardTitle className="flex items-center gap-4 text-xl">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <div>Penalties Information</div>
              <div className="text-sm font-normal text-red-100 mt-1">
                Step {getCurrentStepNumber()} of {tabs.length}
              </div>
            </div>
          </CardTitle>
          <CardDescription className="text-red-100 mt-3 text-base">
            Declare any penalties, violations, or disciplinary actions
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="relative p-8 space-y-12">
        {/* Penalty 1 */}
        <div className="space-y-8">
          <div className="flex items-center justify-between pb-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-red-500 to-rose-500 rounded-lg">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Penalty 1</h3>
                <p className="text-sm text-gray-600">Primary penalty declaration</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge className="bg-red-100 text-red-800 border-red-200">Active</Badge>
              <Button variant="outline" size="sm" className="border-red-200 text-red-700 hover:bg-red-50">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Penalty Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Label htmlFor="penaltyCode" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Award className="h-4 w-4 text-red-600" />
                Penalty Code *
              </Label>
              <div className="relative">
                <Input
                  id="penaltyCode"
                  defaultValue="PEN001"
                  className="bg-white border-gray-300 focus:border-red-500 focus:ring-red-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12 font-mono"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Award className="h-5 w-5 text-gray-400" />
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="penaltyType" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <FileText className="h-4 w-4 text-red-600" />
                Penalty Type *
              </Label>
              <Select defaultValue="minor">
                <SelectTrigger className="bg-white border-gray-300 focus:border-red-500 focus:ring-red-500 h-10 text-sm hover:bg-gray-50 transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-xl">
                  <SelectItem value="minor">⚠️ Minor Violation</SelectItem>
                  <SelectItem value="major">🚨 Major Violation</SelectItem>
                  <SelectItem value="disciplinary">⚖️ Disciplinary Action</SelectItem>
                  <SelectItem value="legal">👮 Legal Penalty</SelectItem>
                  <SelectItem value="financial">💰 Financial Penalty</SelectItem>
                  <SelectItem value="other">📋 Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="penaltyDate" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-red-600" />
                Penalty Date *
              </Label>
              <div className="relative">
                <Input
                  id="penaltyDate"
                  type="date"
                  defaultValue="2023-06-15"
                  className="bg-white border-gray-300 focus:border-red-500 focus:ring-red-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="penaltyAmount" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-red-600" />
                Penalty Amount
              </Label>
              <div className="relative">
                <Input
                  id="penaltyAmount"
                  defaultValue="500"
                  type="number"
                  min="0"
                  className="bg-white border-gray-300 focus:border-red-500 focus:ring-red-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              <p className="text-xs text-gray-500">Enter 0 if no financial penalty</p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="penaltyStatus" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-red-600" />
                Penalty Status *
              </Label>
              <Select defaultValue="active">
                <SelectTrigger className="bg-white border-gray-300 focus:border-red-500 focus:ring-red-500 h-10 text-sm hover:bg-gray-50 transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-xl">
                  <SelectItem value="active">⏳ Active</SelectItem>
                  <SelectItem value="resolved">✅ Resolved</SelectItem>
                  <SelectItem value="appealed">📝 Appealed</SelectItem>
                  <SelectItem value="expired">⏰ Expired</SelectItem>
                  <SelectItem value="waived">🎫 Waived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="penaltyDuration" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Clock className="h-4 w-4 text-red-600" />
                Penalty Duration
              </Label>
              <div className="relative">
                <Input
                  id="penaltyDuration"
                  defaultValue="30"
                  type="number"
                  min="1"
                  className="bg-white border-gray-300 focus:border-red-500 focus:ring-red-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Clock className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              <p className="text-xs text-gray-500">Duration in days</p>
            </div>
          </div>

          {/* Penalty Description */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Penalty Details</h3>
                <p className="text-sm text-gray-600">Additional information about the penalty</p>
              </div>
              <Badge variant="outline" className="ml-auto border-blue-200 text-blue-700">
                Required
              </Badge>
            </div>

            <div className="space-y-3">
              <Label htmlFor="penaltyDescription" className="text-sm font-semibold text-gray-700">
                Penalty Description *
              </Label>
              <Textarea
                id="penaltyDescription"
                placeholder="Describe the violation, circumstances, and details of the penalty..."
                className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 min-h-[120px] text-sm hover:bg-gray-50 transition-colors resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-blue-500" />
                    <h5 className="font-medium text-gray-900">Issuing Authority</h5>
                  </div>
                  <Input
                    placeholder="e.g., HR Department, Legal Team"
                    className="bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500">Authority that issued the penalty</p>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-blue-500" />
                    <h5 className="font-medium text-gray-900">Reference Number</h5>
                  </div>
                  <Input
                    placeholder="e.g., REF123456"
                    className="bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500">Official reference or case number</p>
                </div>
              </div>
            </div>
          </div>

          {/* Penalty Resolution */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
              <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Resolution Details</h3>
                <p className="text-sm text-gray-600">How the penalty was resolved or addressed</p>
              </div>
              <Badge variant="outline" className="ml-auto border-green-200 text-green-700">
                Optional
              </Badge>
            </div>

            <div className="space-y-3">
              <Label htmlFor="resolutionDate" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-green-600" />
                Resolution Date
              </Label>
              <div className="relative">
                <Input
                  id="resolutionDate"
                  type="date"
                  className="bg-white border-gray-300 focus:border-green-500 focus:ring-green-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="resolutionNotes" className="text-sm font-semibold text-gray-700">
                Resolution Notes
              </Label>
              <Textarea
                id="resolutionNotes"
                placeholder="Describe how the penalty was resolved, any actions taken, or lessons learned..."
                className="bg-white border-gray-300 focus:border-green-500 focus:ring-green-500 min-h-[100px] text-sm hover:bg-gray-50 transition-colors resize-none"
              />
            </div>
          </div>

          {/* Penalty Verification Status */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Penalty Verification</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Your penalty declarations will be verified against official records and documentation
                </p>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Under Review</Badge>
            </div>
          </div>
        </div>

        {/* Add More Penalties */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-red-400 hover:bg-red-50/50 transition-all duration-300 cursor-pointer group">
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-red-500 to-rose-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Plus className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Add Another Penalty</h3>
              <p className="text-sm text-gray-600 mt-1">Declare additional penalties or violations</p>
            </div>
            <Button className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Penalty
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderAssetsWorkForm = () => (
    <Card className="group relative overflow-hidden shadow-2xl border-0 bg-white/80 backdrop-blur-xl hover:shadow-3xl transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <CardHeader className="relative bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/90 to-indigo-600/90 backdrop-blur-sm"></div>
        <div className="relative">
          <CardTitle className="flex items-center gap-4 text-xl">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Package className="h-6 w-6" />
            </div>
            <div>
              <div>Assets & Work</div>
              <div className="text-sm font-normal text-cyan-100 mt-1">
                Step {getCurrentStepNumber()} of {tabs.length}
              </div>
            </div>
          </CardTitle>
          <CardDescription className="text-cyan-100 mt-3 text-base">
            Manage asset allocation and work order assignments
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="relative p-8 space-y-12">
        {/* Asset Allocation Section */}
        <div className="space-y-8">
          <div className="flex items-center justify-between pb-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
                <Package className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Asset Allocation</h3>
                <p className="text-sm text-gray-600">Company assets assigned to employee</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">Active</Badge>
              <Button variant="outline" size="sm" className="border-red-200 text-red-700 hover:bg-red-50">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Asset Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <Label htmlFor="assetCode" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Hash className="h-4 w-4 text-cyan-600" />
                Asset Code *
              </Label>
              <div className="relative">
                <Input
                  id="assetCode"
                  defaultValue="AST001"
                  className="bg-white border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12 font-mono"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Hash className="h-5 w-5 text-gray-400" />
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="assetName" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Monitor className="h-4 w-4 text-cyan-600" />
                Asset Name *
              </Label>
              <div className="relative">
                <Input
                  id="assetName"
                  defaultValue="Laptop"
                  className="bg-white border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Monitor className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="assetType" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Package className="h-4 w-4 text-cyan-600" />
                Asset Type *
              </Label>
              <Select defaultValue="">
                <SelectTrigger className="bg-white border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 h-10 text-sm hover:bg-gray-50 transition-colors">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-xl">
                  <SelectItem value="laptop">💻 Laptop</SelectItem>
                  <SelectItem value="desktop">🖥️ Desktop Computer</SelectItem>
                  <SelectItem value="mobile">📱 Mobile Phone</SelectItem>
                  <SelectItem value="tablet">📱 Tablet</SelectItem>
                  <SelectItem value="monitor">🖥️ Monitor</SelectItem>
                  <SelectItem value="printer">🖨️ Printer</SelectItem>
                  <SelectItem value="vehicle">🚗 Vehicle</SelectItem>
                  <SelectItem value="tools">🔧 Tools & Equipment</SelectItem>
                  <SelectItem value="furniture">🪑 Furniture</SelectItem>
                  <SelectItem value="other">📦 Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="issueDate" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-cyan-600" />
                Issue Date *
              </Label>
              <div className="relative">
                <Input
                  id="issueDate"
                  type="date"
                  className="bg-white border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="returnDate" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-cyan-600" />
                Return Date *
              </Label>
              <div className="relative">
                <Input
                  id="returnDate"
                  type="date"
                  className="bg-white border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              <p className="text-xs text-gray-500">Expected return date or leave blank if permanent</p>
            </div>
          </div>

          {/* Asset Status */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Asset Status</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Asset has been allocated and is currently in use by the employee
                </p>
              </div>
              <Badge className="bg-green-100 text-green-800 border-green-200">Allocated</Badge>
            </div>
          </div>
        </div>

        {/* Work Orders Section */}
        <div className="space-y-8">
          <div className="flex items-center justify-between pb-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Work Orders</h3>
                <p className="text-sm text-gray-600">Active work assignments and project orders</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge className="bg-purple-100 text-purple-800 border-purple-200">Current</Badge>
              <Button variant="outline" size="sm" className="border-red-200 text-red-700 hover:bg-red-50">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Work Order Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <Label htmlFor="workOrderNumber" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Hash className="h-4 w-4 text-indigo-600" />
                Work Order Number *
              </Label>
              <div className="relative">
                <Input
                  id="workOrderNumber"
                  placeholder="e.g., WON123456"
                  className="bg-white border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12 font-mono"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Hash className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="effectiveFrom" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-indigo-600" />
                Effective From *
              </Label>
              <div className="relative">
                <Input
                  id="effectiveFrom"
                  type="date"
                  className="bg-white border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="effectiveTo" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-indigo-600" />
                Effective To *
              </Label>
              <div className="relative">
                <Input
                  id="effectiveTo"
                  type="date"
                  className="bg-white border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Work Order Additional Details */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Work Order Details</h3>
                <p className="text-sm text-gray-600">Additional information about the work assignment</p>
              </div>
              <Badge variant="outline" className="ml-auto border-blue-200 text-blue-700">
                Optional
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Briefcase className="h-5 w-5 text-blue-500" />
                    <h5 className="font-medium text-gray-900">Project Name</h5>
                  </div>
                  <Input
                    placeholder="e.g., Infrastructure Development"
                    className="bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500">Name of the project or assignment</p>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-blue-500" />
                    <h5 className="font-medium text-gray-900">Department</h5>
                  </div>
                  <Select defaultValue="">
                    <SelectTrigger className="bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engineering">⚙️ Engineering</SelectItem>
                      <SelectItem value="construction">🏗️ Construction</SelectItem>
                      <SelectItem value="maintenance">🔧 Maintenance</SelectItem>
                      <SelectItem value="safety">🦺 Safety</SelectItem>
                      <SelectItem value="quality">✅ Quality Control</SelectItem>
                      <SelectItem value="admin">📋 Administration</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500">Department responsible for the work</p>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-blue-500" />
                    <h5 className="font-medium text-gray-900">Supervisor</h5>
                  </div>
                  <Input
                    placeholder="e.g., John Smith"
                    className="bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500">Name of the supervising manager</p>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Star className="h-5 w-5 text-blue-500" />
                    <h5 className="font-medium text-gray-900">Priority Level</h5>
                  </div>
                  <Select defaultValue="">
                    <SelectTrigger className="bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="critical">🔴 Critical</SelectItem>
                      <SelectItem value="high">🟠 High</SelectItem>
                      <SelectItem value="medium">🟡 Medium</SelectItem>
                      <SelectItem value="low">🟢 Low</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500">Priority level of the work order</p>
                </div>
              </div>
            </div>
          </div>

          {/* Work Order Status */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Work Order Status</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Work order is active and employee is currently assigned to this project
                </p>
              </div>
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">Active</Badge>
            </div>
          </div>
        </div>

        {/* Add More Assets/Work Orders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-cyan-400 hover:bg-cyan-50/50 transition-all duration-300 cursor-pointer group">
            <div className="space-y-3">
              <div className="mx-auto w-12 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Plus className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Add Asset</h3>
                <p className="text-sm text-gray-600">Allocate another asset</p>
              </div>
              <Button
                size="sm"
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Asset
              </Button>
            </div>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-indigo-400 hover:bg-indigo-50/50 transition-all duration-300 cursor-pointer group">
            <div className="space-y-3">
              <div className="mx-auto w-12 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Plus className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Add Work Order</h3>
                <p className="text-sm text-gray-600">Create new work assignment</p>
              </div>
              <Button
                size="sm"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Work Order
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderNomineesForm = () => (
    <Card className="group relative overflow-hidden shadow-2xl border-0 bg-white/80 backdrop-blur-xl hover:shadow-3xl transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/5 to-teal-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <CardHeader className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/90 to-cyan-600/90 backdrop-blur-sm"></div>
        <div className="relative">
          <CardTitle className="flex items-center gap-4 text-xl">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <div>Nominees</div>
              <div className="text-sm font-normal text-emerald-100 mt-1">
                Step {getCurrentStepNumber()} of {tabs.length}
              </div>
            </div>
          </CardTitle>
          <CardDescription className="text-emerald-100 mt-3 text-base">
            Manage PF and Gratuity nominee information
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="relative p-8 space-y-12">
        {/* PF Nominee Section */}
        <div className="space-y-8">
          <div className="flex items-center justify-between pb-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg">
                <UserPlus className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">PF Nominee</h3>
                <p className="text-sm text-gray-600">Provident Fund beneficiary details</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">Active</Badge>
              <Button variant="outline" size="sm" className="border-red-200 text-red-700 hover:bg-red-50">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* PF Nominee Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-3">
              <Label htmlFor="pfMemberName" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <User className="h-4 w-4 text-emerald-600" />
                Member Name *
              </Label>
              <div className="relative">
                <Input
                  id="pfMemberName"
                  placeholder="Enter full name"
                  className="bg-white border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="pfRelation" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Heart className="h-4 w-4 text-emerald-600" />
                Relation *
              </Label>
              <Select defaultValue="">
                <SelectTrigger className="bg-white border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 h-10 text-sm hover:bg-gray-50 transition-colors">
                  <SelectValue placeholder="Select relation" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-xl">
                  <SelectItem value="spouse">💑 Spouse</SelectItem>
                  <SelectItem value="father">👨 Father</SelectItem>
                  <SelectItem value="mother">👩 Mother</SelectItem>
                  <SelectItem value="son">👦 Son</SelectItem>
                  <SelectItem value="daughter">👧 Daughter</SelectItem>
                  <SelectItem value="brother">👨‍🦱 Brother</SelectItem>
                  <SelectItem value="sister">👩‍🦱 Sister</SelectItem>
                  <SelectItem value="other">👥 Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="pfBirthDate" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-emerald-600" />
                Birth Date *
              </Label>
              <div className="relative">
                <Input
                  id="pfBirthDate"
                  type="date"
                  className="bg-white border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="pfPercentage" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Percent className="h-4 w-4 text-emerald-600" />
                Percentage *
              </Label>
              <div className="relative">
                <Input
                  id="pfPercentage"
                  type="number"
                  placeholder="0"
                  min="0"
                  max="100"
                  className="bg-white border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12 pr-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Percent className="h-5 w-5 text-gray-400" />
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="text-gray-400 text-sm">%</span>
                </div>
              </div>
              <p className="text-xs text-gray-500">Percentage of PF amount (0-100%)</p>
            </div>
          </div>

          {/* PF Nominee Additional Details */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Additional Information</h3>
                <p className="text-sm text-gray-600">Optional nominee details</p>
              </div>
              <Badge variant="outline" className="ml-auto border-blue-200 text-blue-700">
                Optional
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-blue-500" />
                    <h5 className="font-medium text-gray-900">Guardian Name</h5>
                  </div>
                  <Input
                    placeholder="If nominee is minor"
                    className="bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500">Required if nominee is under 18 years</p>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-blue-500" />
                    <h5 className="font-medium text-gray-900">Address</h5>
                  </div>
                  <Input
                    placeholder="Nominee's address"
                    className="bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500">Current residential address</p>
                </div>
              </div>
            </div>
          </div>

          {/* PF Nominee Status */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">PF Nominee Status</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Nominee information is complete and verified for Provident Fund benefits
                </p>
              </div>
              <Badge className="bg-green-100 text-green-800 border-green-200">Verified</Badge>
            </div>
          </div>
        </div>

        {/* Gratuity Nominee Section */}
        <div className="space-y-8">
          <div className="flex items-center justify-between pb-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Gratuity Nominee</h3>
                <p className="text-sm text-gray-600">Gratuity beneficiary details</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge className="bg-purple-100 text-purple-800 border-purple-200">Active</Badge>
              <Button variant="outline" size="sm" className="border-red-200 text-red-700 hover:bg-red-50">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Gratuity Nominee Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-3">
              <Label
                htmlFor="gratuityMemberName"
                className="text-sm font-semibold text-gray-700 flex items-center gap-2"
              >
                <User className="h-4 w-4 text-purple-600" />
                Member Name *
              </Label>
              <div className="relative">
                <Input
                  id="gratuityMemberName"
                  placeholder="Enter full name"
                  className="bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="gratuityRelation" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Heart className="h-4 w-4 text-purple-600" />
                Relation *
              </Label>
              <Select defaultValue="">
                <SelectTrigger className="bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500 h-10 text-sm hover:bg-gray-50 transition-colors">
                  <SelectValue placeholder="Select relation" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-xl">
                  <SelectItem value="spouse">💑 Spouse</SelectItem>
                  <SelectItem value="father">👨 Father</SelectItem>
                  <SelectItem value="mother">👩 Mother</SelectItem>
                  <SelectItem value="son">👦 Son</SelectItem>
                  <SelectItem value="daughter">👧 Daughter</SelectItem>
                  <SelectItem value="brother">👨‍🦱 Brother</SelectItem>
                  <SelectItem value="sister">👩‍🦱 Sister</SelectItem>
                  <SelectItem value="other">👥 Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="gratuityBirthDate"
                className="text-sm font-semibold text-gray-700 flex items-center gap-2"
              >
                <CalendarIcon className="h-4 w-4 text-purple-600" />
                Birth Date *
              </Label>
              <div className="relative">
                <Input
                  id="gratuityBirthDate"
                  type="date"
                  className="bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="gratuityPercentage"
                className="text-sm font-semibold text-gray-700 flex items-center gap-2"
              >
                <Percent className="h-4 w-4 text-purple-600" />
                Percentage *
              </Label>
              <div className="relative">
                <Input
                  id="gratuityPercentage"
                  type="number"
                  placeholder="0"
                  min="0"
                  max="100"
                  className="bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12 pr-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Percent className="h-5 w-5 text-gray-400" />
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="text-gray-400 text-sm">%</span>
                </div>
              </div>
              <p className="text-xs text-gray-500">Percentage of gratuity amount (0-100%)</p>
            </div>
          </div>

          {/* Gratuity Nominee Additional Details */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
              <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Additional Information</h3>
                <p className="text-sm text-gray-600">Optional nominee details</p>
              </div>
              <Badge variant="outline" className="ml-auto border-indigo-200 text-indigo-700">
                Optional
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-indigo-500" />
                    <h5 className="font-medium text-gray-900">Guardian Name</h5>
                  </div>
                  <Input
                    placeholder="If nominee is minor"
                    className="bg-gray-50 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <p className="text-xs text-gray-500">Required if nominee is under 18 years</p>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-indigo-500" />
                    <h5 className="font-medium text-gray-900">Address</h5>
                  </div>
                  <Input
                    placeholder="Nominee's address"
                    className="bg-gray-50 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <p className="text-xs text-gray-500">Current residential address</p>
                </div>
              </div>
            </div>
          </div>

          {/* Gratuity Nominee Status */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Gratuity Nominee Status</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Nominee information is complete and verified for Gratuity benefits
                </p>
              </div>
              <Badge className="bg-purple-100 text-purple-800 border-purple-200">Verified</Badge>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex-shrink-0">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-2">Important Notes</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Total percentage for all nominees should equal 100%</li>
                <li>• Guardian details are mandatory for nominees under 18 years</li>
                <li>• PF and Gratuity nominees can be different persons</li>
                <li>• Changes to nominee information require proper documentation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Add More Nominees */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-emerald-400 hover:bg-emerald-50/50 transition-all duration-300 cursor-pointer group">
            <div className="space-y-3">
              <div className="mx-auto w-12 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Plus className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Add PF Nominee</h3>
                <p className="text-sm text-gray-600">Add another PF beneficiary</p>
              </div>
              <Button
                size="sm"
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add PF Nominee
              </Button>
            </div>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-purple-400 hover:bg-purple-50/50 transition-all duration-300 cursor-pointer group">
            <div className="space-y-3">
              <div className="mx-auto w-12 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Plus className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Add Gratuity Nominee</h3>
                <p className="text-sm text-gray-600">Add another gratuity beneficiary</p>
              </div>
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Gratuity Nominee
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderMedicalVerificationForm = () => (
    <Card className="group relative overflow-hidden shadow-2xl border-0 bg-white/80 backdrop-blur-xl hover:shadow-3xl transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-r from-teal-600/5 to-green-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <CardHeader className="relative bg-gradient-to-r from-teal-600 via-green-600 to-lime-600 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600/90 to-green-600/90 backdrop-blur-sm"></div>
        <div className="relative">
          <CardTitle className="flex items-center gap-4 text-xl">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Stethoscope className="h-6 w-6" />
            </div>
            <div>
              <div>Medical & Verification</div>
              <div className="text-sm font-normal text-teal-100 mt-1">
                Step {getCurrentStepNumber()} of {tabs.length}
              </div>
            </div>
          </CardTitle>
          <CardDescription className="text-teal-100 mt-3 text-base">
            Health & Background Verification
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="relative p-8 space-y-12">
        {/* Medical Checkup Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-900">Medical Checkup</h2>
                <p className="text-sm text-gray-500">Health examination and medical records</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
              <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-green-600" />
                Checkup Date *
              </Label>
              <Input type="date" className="h-11" />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Clock className="w-4 h-4 text-green-600" />
                Next Checkup *
              </Label>
              <Input type="date" className="h-11" />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <FileText className="w-4 h-4 text-green-600" />
                Medical Status *
              </Label>
              <Select>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fit">Fit for Duty</SelectItem>
                  <SelectItem value="unfit">Unfit for Duty</SelectItem>
                  <SelectItem value="conditional">Conditional Fit</SelectItem>
                  <SelectItem value="pending">Pending Review</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Upload className="w-4 h-4 text-green-600" />
                Document Path *
              </Label>
              <div className="flex gap-2">
                <Input placeholder="Enter document path" className="h-11" />
                <Button variant="outline" size="icon" className="h-11 w-11 shrink-0">
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <Label className="text-sm font-medium text-gray-700">Medical Notes</Label>
            <Textarea
              placeholder="Enter medical examination details, findings, or recommendations..."
              className="min-h-[100px] resize-none"
            />
          </div>
        </div>

        {/* Police Verification Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-900">Police Verification</h2>
                <p className="text-sm text-gray-500">Background verification and clearance records</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Verified</Badge>
              <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-blue-600" />
                Verification Date *
              </Label>
              <Input type="date" className="h-11" />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                Next Verification *
              </Label>
              <Input type="date" className="h-11" />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-600" />
                Verification Status *
              </Label>
              <Select>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cleared">Cleared</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="under-review">Under Review</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Upload className="w-4 h-4 text-blue-600" />
                Document Path *
              </Label>
              <div className="flex gap-2">
                <Input placeholder="Enter document path" className="h-11" />
                <Button variant="outline" size="icon" className="h-11 w-11 shrink-0">
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <Label className="text-sm font-medium text-gray-700">Verification Notes</Label>
            <Textarea
              placeholder="Enter verification details, background check results, or additional notes..."
              className="min-h-[100px] resize-none"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderDisciplinaryAccidentsForm = () => (
    <Card className="group relative overflow-hidden shadow-2xl border-0 bg-white/80 backdrop-blur-xl hover:shadow-3xl transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 to-rose-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <CardHeader className="relative bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-pink-600/90 backdrop-blur-sm"></div>
        <div className="relative">
          <CardTitle className="flex items-center gap-4 text-xl">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <div>Disciplinary & Accidents</div>
              <div className="text-sm font-normal text-red-100 mt-1">
                Step {getCurrentStepNumber()} of {tabs.length}
              </div>
            </div>
          </CardTitle>
          <CardDescription className="text-red-100 mt-3 text-base">
            Declare any disciplinary actions, accidents, or incidents
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="relative p-8 space-y-12">
        {/* Disciplinary Action */}
        <div className="space-y-8">
          <div className="flex items-center justify-between pb-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-red-500 to-rose-500 rounded-lg">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Disciplinary Action</h3>
                <p className="text-sm text-gray-600">Primary disciplinary action declaration</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge className="bg-red-100 text-red-800 border-red-200">Active</Badge>
              <Button variant="outline" size="sm" className="border-red-200 text-red-700 hover:bg-red-50">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Disciplinary Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Label htmlFor="offenceDate" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-red-600" />
                Offence Date *
              </Label>
              <div className="relative">
                <Input
                  id="offenceDate"
                  type="date"
                  defaultValue="2023-07-01"
                  className="bg-white border-gray-300 focus:border-red-500 focus:ring-red-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="fineRealisedDate" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-red-600" />
                Fine Realised Date
              </Label>
              <div className="relative">
                <Input
                  id="fineRealisedDate"
                  type="date"
                  className="bg-white border-gray-300 focus:border-red-500 focus:ring-red-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="issueReportedDate" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-red-600" />
                Issue Reported Date
              </Label>
              <div className="relative">
                <Input
                  id="issueReportedDate"
                  type="date"
                  className="bg-white border-gray-300 focus:border-red-500 focus:ring-red-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="actionTakenDate" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-red-600" />
                Action Taken Date
              </Label>
              <div className="relative">
                <Input
                  id="actionTakenDate"
                  type="date"
                  className="bg-white border-gray-300 focus:border-red-500 focus:ring-red-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="accidentDate" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-red-600" />
                Accident Date
              </Label>
              <div className="relative">
                <Input
                  id="accidentDate"
                  type="date"
                  className="bg-white border-gray-300 focus:border-red-500 focus:ring-red-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="reportDate" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-red-600" />
                Report Date
              </Label>
              <div className="relative">
                <Input
                  id="reportDate"
                  type="date"
                  className="bg-white border-gray-300 focus:border-red-500 focus:ring-red-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="returnDate" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-red-600" />
                Return Date
              </Label>
              <div className="relative">
                <Input
                  id="returnDate"
                  type="date"
                  className="bg-white border-gray-300 focus:border-red-500 focus:ring-red-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="causeShown" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <FileText className="h-4 w-4 text-red-600" />
                Cause of Incident
              </Label>
              <div className="relative">
                <Input
                  id="causeShown"
                  placeholder="Describe the circumstances leading to the incident..."
                  className="bg-white border-gray-300 focus:border-red-500 focus:ring-red-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FileText className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Disciplinary Action Status */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Disciplinary Action Status</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Disciplinary action has been taken and documented
                </p>
              </div>
              <Badge className="bg-green-100 text-green-800 border-green-200">Taken</Badge>
            </div>
          </div>
        </div>

        {/* Add More Disciplinary Actions */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-red-400 hover:bg-red-50/50 transition-all duration-300 cursor-pointer group">
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-red-500 to-rose-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Plus className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Add Another Disciplinary Action</h3>
              <p className="text-sm text-gray-600 mt-1">Declare additional disciplinary actions</p>
            </div>
            <Button className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Disciplinary Action
            </Button>
          </div>
        </div>

        {/* Accident Incident */}
        <div className="space-y-8">
          <div className="flex items-center justify-between pb-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Accident Incident</h3>
                <p className="text-sm text-gray-600">Details of the accident incident</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Active</Badge>
              <Button variant="outline" size="sm" className="border-yellow-200 text-yellow-700 hover:bg-yellow-50">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Accident Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Label htmlFor="accidentDate" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-yellow-600" />
                Accident Date *
              </Label>
              <div className="relative">
                <Input
                  id="accidentDate"
                  type="date"
                  className="bg-white border-gray-300 focus:border-yellow-500 focus:ring-yellow-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="accidentDescription" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <FileText className="h-4 w-4 text-yellow-600" />
                Accident Description *
              </Label>
              <div className="relative">
                <Input
                  id="accidentDescription"
                  placeholder="Describe the accident incident..."
                  className="bg-white border-gray-300 focus:border-yellow-500 focus:ring-yellow-500 h-10 text-sm hover:bg-gray-50 transition-colors pl-12"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FileText className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Accident Verification Status */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Accident Verification</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Accident incident has been reported and documented
                </p>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending Verification</Badge>
            </div>
          </div>
        </div>

        {/* Add More Accidents */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-yellow-400 hover:bg-yellow-50/50 transition-all duration-300 cursor-pointer group">
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Plus className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Add Another Accident</h3>
              <p className="text-sm text-gray-600 mt-1">Report a new accident incident</p>
            </div>
            <Button className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Accident
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderStatusAuditForm = () => (
    <Card className="group relative overflow-hidden shadow-2xl border-0 bg-white/80 backdrop-blur-xl hover:shadow-3xl transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <CardHeader className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90 backdrop-blur-sm"></div>
        <div className="relative">
          <CardTitle className="flex items-center gap-4 text-xl">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <div>Status & Audit</div>
              <div className="text-sm font-normal text-blue-100 mt-1">
                Step {getCurrentStepNumber()} of {tabs.length}
              </div>
            </div>
          </CardTitle>
          <CardDescription className="text-blue-100 mt-3 text-base">
            Employee Status & System Audit
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="relative p-8 space-y-12">
        {/* Employee Status Section */}
        <div className="space-y-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-900">Employee Status</h2>
                <p className="text-sm text-gray-500">Current employment status and related information</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
              <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-blue-600" />
                Current Status *
              </Label>
              <Select defaultValue="active">
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="terminated">Terminated</SelectItem>
                  <SelectItem value="resigned">Resigned</SelectItem>
                  <SelectItem value="on-leave">On Leave</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-blue-600" />
                Resignation Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal h-11",
                      !resignationDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {resignationDate ? format(resignationDate, "dd-MM-yyyy") : "dd-mm-yyyy"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={resignationDate} onSelect={setResignationDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-blue-600" />
                Relieving Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal h-11",
                      !relievingDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {relievingDate ? format(relievingDate, "dd-MM-yyyy") : "dd-mm-yyyy"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={relievingDate} onSelect={setRelievingDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                Not To Rehire
                <Switch checked={notToRehire} onCheckedChange={setNotToRehire} />
              </Label>
              <div className="h-11 flex items-center">
                <span className="text-sm text-gray-500">
                  {notToRehire ? "Employee marked as not eligible for rehire" : "Eligible for rehire"}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                On Notice Period
                <Switch checked={onNoticePeriod} onCheckedChange={setOnNoticePeriod} />
              </Label>
              <div className="h-11 flex items-center">
                <span className="text-sm text-gray-500">
                  {onNoticePeriod ? "Currently serving notice period" : "Not on notice period"}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" />
                Manager Employee Code
              </Label>
              <Input placeholder="EMP001" defaultValue="EMP001" className="h-11" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                Supervisor Employee Code
              </Label>
              <Input placeholder="EMP002" defaultValue="EMP002" className="h-11" />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Remark</Label>
            <Textarea placeholder="New hire" defaultValue="New hire" className="min-h-[100px] resize-none" />
          </div>
        </div>

        {/* Audit Trail Section */}
        <div className="space-y-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                <Activity className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-900">Audit Trail</h2>
                <p className="text-sm text-gray-500">System audit information and change tracking</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-100">Tracked</Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <User className="w-4 h-4 text-indigo-600" />
                Created By
              </Label>
              <Input placeholder="Enter creator name" className="h-11" />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-600" />
                Created On
              </Label>
              <Input placeholder="2023-04-27 21:02" defaultValue="2023-04-27 21:02" className="h-11" readOnly />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <User className="w-4 h-4 text-indigo-600" />
                Updated By
              </Label>
              <Input placeholder="Enter updater name" className="h-11" />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-600" />
                Updated On
              </Label>
              <Input placeholder="2023-04-28 10:24" defaultValue="2023-04-28 10:24" className="h-11" readOnly />
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Recent Activity</span>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Status updated to Active</span>
                <span>2023-04-28 10:24</span>
              </div>
              <div className="flex justify-between">
                <span>Manager code updated</span>
                <span>2023-04-27 21:02</span>
              </div>
              <div className="flex justify-between">
                <span>Record created</span>
                <span>2023-04-27 21:02</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24 lg:py-32">
        {/* Header Section */}
        <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-100 to-purple-100 p-3 mb-6 shadow-lg">
            <div className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 p-4 shadow-inner">
              <User className="h-8 w-8 text-white" />
            </div>
          </div>
          <div>
           
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Contractor Employee Information
          </h1>
            <div className="flex items-center justify-center gap-2 mt-2">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-sm text-gray-600 font-medium">Premium Form Experience</span>
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
            </div>
          </div>
          <p className="text-gray-600 max-w-3xl mx-auto text-sm leading-relaxed mt-4">
            Complete your employee information with our streamlined, secure form. All required fields are marked with
            an asterisk (*). Your data is encrypted and protected.
          </p>

          {/* Progress indicator */}
          <div className="max-w-md mx-auto space-y-3 mt-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Form Completion</span>
              <span className="font-semibold text-blue-600">{completionProgress}%</span>
            </div>
            <Progress value={completionProgress} className="h-2 bg-gray-200" />
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>Estimated time: 8-12 minutes</span>
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-xl overflow-hidden shadow-2xl rounded-2xl border border-white/20">
          <div className="px-6 py-6 sm:p-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group relative px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                      : "bg-white/80 text-gray-700 hover:bg-white hover:shadow-md border border-gray-200/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`relative ${activeTab === tab.id ? "text-white" : "text-gray-500"}`}>
                      <tab.icon className="h-5 w-5" />
                      {tab.completed && (
                        <CheckCircle className="absolute -top-1 -right-1 h-3 w-3 text-green-500 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="hidden sm:inline">{tab.label}</span>
                  </div>
                  {activeTab === tab.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl blur-xl"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className="px-6 py-6 sm:p-8">
            {renderCurrentForm()}
          </div>
          <div className="px-6 py-6 sm:px-8 sm:flex sm:flex-row-reverse bg-white/50 backdrop-blur-sm border-t border-white/20">
            <Button
              onClick={goToPreviousTab}
              disabled={activeTab === tabs[0].id}
              variant="outline"
              size="lg"
              className="px-10 py-4 text-sm font-semibold border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg order-1 sm:order-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Previous
            </Button>

            <div className="flex gap-4 order-3 sm:order-none">
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-sm font-semibold border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <FileText className="h-5 w-5 mr-2" />
                Save Draft
              </Button>
              <Button
                onClick={goToNextTab}
                disabled={activeTab === tabs[tabs.length - 1].id}
                size="lg"
                className="px-10 py-4 text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <span className="relative z-10">Next</span>
                <ArrowRight className="h-5 w-5 ml-2 relative z-10" />
              </Button>
            </div>

            <Button
              variant="outline"
              size="lg"
              className="px-10 py-4 text-sm font-semibold border-2 border-green-300 text-green-600 hover:border-green-400 hover:bg-green-50 transition-all duration-300 transform hover:scale-105 shadow-lg order-2 sm:order-none"
            >
              <CheckCircle className="h-5 w-5 mr-2" />
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}