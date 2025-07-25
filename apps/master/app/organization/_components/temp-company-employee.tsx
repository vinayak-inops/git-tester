"use client"

import { Button } from "@repo/ui/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Input } from "@repo/ui/components/ui/input"
import { Label } from "@repo/ui/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/ui/select"
import { Textarea } from "@repo/ui/components/ui/textarea"
import { Badge } from "@repo/ui/components/ui/badge"
import { Separator } from "@repo/ui/components/ui/separator"
import {
  Building2,
  User,
  Mail,
  MapPin,
  Briefcase,
  Calendar,
  Phone,
  Globe,
  Award,
  Clock,
  FileText,
  CheckCircle,
  Save,
  RotateCcw,
  Send,
  Sparkles,
} from "lucide-react"
import { useState } from "react"

export default function CompanyEmployeeForm() {
  const [activeSection, setActiveSection] = useState<string>("basic")

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-2xl">
              <Building2 className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
              Employee Information Portal
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Streamline your employee registration process with our comprehensive information management system
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <Sparkles className="h-5 w-5 text-yellow-500" />
              <span className="text-sm text-gray-500 font-medium">Powered by Advanced Form Technology</span>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  activeSection === "basic" ? "bg-blue-100 text-blue-700" : "text-gray-500"
                }`}
              >
                <User className="h-4 w-4" />
                <span className="font-medium">Basic Info</span>
              </div>
              <div className="w-8 h-0.5 bg-gray-300"></div>
              <div
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  activeSection === "deployment" ? "bg-green-100 text-green-700" : "text-gray-500"
                }`}
              >
                <Briefcase className="h-4 w-4" />
                <span className="font-medium">Deployment</span>
              </div>
              <div className="w-8 h-0.5 bg-gray-300"></div>
              <div
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  activeSection === "additional" ? "bg-purple-100 text-purple-700" : "text-gray-500"
                }`}
              >
                <FileText className="h-4 w-4" />
                <span className="font-medium">Additional</span>
              </div>
            </div>
          </div>

          <form className="space-y-8">
            {/* Basic Information Section */}
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/70 backdrop-blur-xl shadow-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-indigo-700/90"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <User className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-bold">Personal Information</CardTitle>
                        <CardDescription className="text-blue-100 text-base">
                          Essential personal details and identification
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">Step 1 of 3</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Organization Codes Row */}
                  <div className="lg:col-span-3">
                    <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-blue-600" />
                      Organization Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="group">
                        <Label htmlFor="orgCode" className="text-sm font-semibold text-gray-700 mb-2 block">
                          Organization Code
                        </Label>
                        <Input
                          id="orgCode"
                          defaultValue="ORG001"
                          className="h-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300"
                        />
                      </div>
                      <div className="group">
                        <Label htmlFor="teamCode" className="text-sm font-semibold text-gray-700 mb-2 block">
                          Team Code
                        </Label>
                        <Input
                          id="teamCode"
                          defaultValue="TM001"
                          className="h-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300"
                        />
                      </div>
                      <div className="group">
                        <Label htmlFor="empCode" className="text-sm font-semibold text-gray-700 mb-2 block">
                          Employee Code
                        </Label>
                        <Input
                          id="empCode"
                          defaultValue="EMP001"
                          className="h-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator className="lg:col-span-3 my-2" />

                  {/* Personal Details Row */}
                  <div className="lg:col-span-3">
                    <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <User className="h-5 w-5 text-blue-600" />
                      Personal Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="group">
                        <Label htmlFor="name" className="text-sm font-semibold text-gray-700 mb-2 block">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          defaultValue="John Doe"
                          className="h-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300"
                        />
                      </div>

                      <div className="group">
                        <Label htmlFor="gender" className="text-sm font-semibold text-gray-700 mb-2 block">
                          Gender
                        </Label>
                        <Select defaultValue="male">
                          <SelectTrigger className="h-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl border-2">
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="group">
                        <Label htmlFor="nationality" className="text-sm font-semibold text-gray-700 mb-2 block">
                          <Globe className="h-4 w-4 inline mr-1" />
                          Nationality
                        </Label>
                        <Input
                          id="nationality"
                          defaultValue="Indian"
                          className="h-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300"
                        />
                      </div>

                      <div className="group">
                        <Label htmlFor="email" className="text-sm font-semibold text-gray-700 mb-2 block">
                          <Mail className="h-4 w-4 inline mr-1" />
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          defaultValue="john.doe@company.com"
                          className="h-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300"
                        />
                      </div>

                      <div className="group">
                        <Label htmlFor="phone" className="text-sm font-semibold text-gray-700 mb-2 block">
                          <Phone className="h-4 w-4 inline mr-1" />
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          className="h-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300"
                        />
                      </div>

                      <div className="group">
                        <Label htmlFor="birthDate" className="text-sm font-semibold text-gray-700 mb-2 block">
                          <Calendar className="h-4 w-4 inline mr-1" />
                          Date of Birth
                        </Label>
                        <Input
                          id="birthDate"
                          type="date"
                          defaultValue="1994-01-01"
                          className="h-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300"
                        />
                      </div>

                      <div className="group">
                        <Label htmlFor="bloodGroup" className="text-sm font-semibold text-gray-700 mb-2 block">
                          Blood Group
                        </Label>
                        <Select defaultValue="a+">
                          <SelectTrigger className="h-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl border-2">
                            <SelectItem value="a+">A+</SelectItem>
                            <SelectItem value="a-">A-</SelectItem>
                            <SelectItem value="b+">B+</SelectItem>
                            <SelectItem value="b-">B-</SelectItem>
                            <SelectItem value="ab+">AB+</SelectItem>
                            <SelectItem value="ab-">AB-</SelectItem>
                            <SelectItem value="o+">O+</SelectItem>
                            <SelectItem value="o-">O-</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="group">
                        <Label htmlFor="maritalStatus" className="text-sm font-semibold text-gray-700 mb-2 block">
                          Marital Status
                        </Label>
                        <Select defaultValue="single">
                          <SelectTrigger className="h-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl border-2">
                            <SelectItem value="single">Single</SelectItem>
                            <SelectItem value="married">Married</SelectItem>
                            <SelectItem value="divorced">Divorced</SelectItem>
                            <SelectItem value="widowed">Widowed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="group">
                        <Label htmlFor="joiningDate" className="text-sm font-semibold text-gray-700 mb-2 block">
                          <Clock className="h-4 w-4 inline mr-1" />
                          Joining Date
                        </Label>
                        <Input
                          id="joiningDate"
                          type="date"
                          defaultValue="2024-01-01"
                          className="h-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Deployment Information Section */}
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/70 backdrop-blur-xl shadow-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-emerald-600 via-green-700 to-teal-700 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/90 to-teal-700/90"></div>
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
                <div className="absolute bottom-0 left-0 w-28 h-28 bg-white/5 rounded-full translate-y-14 -translate-x-14"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <Briefcase className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-bold">Professional Assignment</CardTitle>
                        <CardDescription className="text-emerald-100 text-base">
                          Organizational structure and role deployment details
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">Step 2 of 3</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-8">
                  {/* Division & Department */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-emerald-600" />
                      Division & Department
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="group">
                        <Label htmlFor="divisionCode" className="text-sm font-semibold text-gray-700 mb-2 block">
                          Division Code
                        </Label>
                        <Input
                          id="divisionCode"
                          defaultValue="DIV01"
                          className="h-10 border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300"
                        />
                      </div>
                      <div className="group">
                        <Label htmlFor="divisionName" className="text-sm font-semibold text-gray-700 mb-2 block">
                          Division Name
                        </Label>
                        <Select defaultValue="technology">
                          <SelectTrigger className="h-10 border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl border-2">
                            <SelectItem value="technology">Technology Division</SelectItem>
                            <SelectItem value="operations">Operations Division</SelectItem>
                            <SelectItem value="finance">Finance Division</SelectItem>
                            <SelectItem value="hr">Human Resources Division</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="group">
                        <Label htmlFor="deptCode" className="text-sm font-semibold text-gray-700 mb-2 block">
                          Department Code
                        </Label>
                        <Input
                          id="deptCode"
                          defaultValue="DEPT01"
                          className="h-10 border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300"
                        />
                      </div>
                      <div className="group">
                        <Label htmlFor="deptName" className="text-sm font-semibold text-gray-700 mb-2 block">
                          Department Name
                        </Label>
                        <Select defaultValue="software-dev">
                          <SelectTrigger className="h-10 border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl border-2">
                            <SelectItem value="software-dev">Software Development</SelectItem>
                            <SelectItem value="qa">Quality Assurance</SelectItem>
                            <SelectItem value="devops">DevOps & Infrastructure</SelectItem>
                            <SelectItem value="product">Product Management</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="group">
                        <Label htmlFor="subDept" className="text-sm font-semibold text-gray-700 mb-2 block">
                          Sub Department
                        </Label>
                        <Select defaultValue="frontend">
                          <SelectTrigger className="h-10 border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl border-2">
                            <SelectItem value="frontend">Frontend Development</SelectItem>
                            <SelectItem value="backend">Backend Development</SelectItem>
                            <SelectItem value="fullstack">Full Stack Development</SelectItem>
                            <SelectItem value="mobile">Mobile Development</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Role & Position */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Award className="h-5 w-5 text-emerald-600" />
                      Role & Position
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="group">
                        <Label htmlFor="designation" className="text-sm font-semibold text-gray-700 mb-2 block">
                          Designation
                        </Label>
                        <Select defaultValue="senior-developer">
                          <SelectTrigger className="h-10 border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl border-2">
                            <SelectItem value="junior-developer">Junior Developer</SelectItem>
                            <SelectItem value="developer">Developer</SelectItem>
                            <SelectItem value="senior-developer">Senior Developer</SelectItem>
                            <SelectItem value="lead-developer">Lead Developer</SelectItem>
                            <SelectItem value="architect">Technical Architect</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="group">
                        <Label htmlFor="gradeCode" className="text-sm font-semibold text-gray-700 mb-2 block">
                          Grade Code
                        </Label>
                        <Input
                          id="gradeCode"
                          defaultValue="GRD003"
                          className="h-10 border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300"
                        />
                      </div>
                      <div className="group">
                        <Label htmlFor="gradeTitle" className="text-sm font-semibold text-gray-700 mb-2 block">
                          Grade Title
                        </Label>
                        <Select defaultValue="senior-grade">
                          <SelectTrigger className="h-10 border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl border-2">
                            <SelectItem value="entry-grade">Entry Grade</SelectItem>
                            <SelectItem value="junior-grade">Junior Grade</SelectItem>
                            <SelectItem value="senior-grade">Senior Grade</SelectItem>
                            <SelectItem value="principal-grade">Principal Grade</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="group">
                        <Label htmlFor="empCategory" className="text-sm font-semibold text-gray-700 mb-2 block">
                          Employee Category
                        </Label>
                        <Select defaultValue="permanent">
                          <SelectTrigger className="h-10 border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl border-2">
                            <SelectItem value="permanent">Permanent</SelectItem>
                            <SelectItem value="contract">Contract</SelectItem>
                            <SelectItem value="consultant">Consultant</SelectItem>
                            <SelectItem value="intern">Intern</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="group">
                        <Label htmlFor="level" className="text-sm font-semibold text-gray-700 mb-2 block">
                          Level
                        </Label>
                        <Select defaultValue="l3">
                          <SelectTrigger className="h-10 border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl border-2">
                            <SelectItem value="l1">Level 1 - Entry</SelectItem>
                            <SelectItem value="l2">Level 2 - Junior</SelectItem>
                            <SelectItem value="l3">Level 3 - Senior</SelectItem>
                            <SelectItem value="l4">Level 4 - Lead</SelectItem>
                            <SelectItem value="l5">Level 5 - Principal</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Location & Timing */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-emerald-600" />
                      Location & Timing
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="group">
                        <Label htmlFor="locationCode" className="text-sm font-semibold text-gray-700 mb-2 block">
                          Location Code
                        </Label>
                        <Input
                          id="locationCode"
                          defaultValue="NYC001"
                          className="h-10 border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300"
                        />
                      </div>
                      <div className="group">
                        <Label htmlFor="locationName" className="text-sm font-semibold text-gray-700 mb-2 block">
                          Location Name
                        </Label>
                        <Select defaultValue="new-york">
                          <SelectTrigger className="h-10 border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl border-2">
                            <SelectItem value="new-york">New York Office</SelectItem>
                            <SelectItem value="san-francisco">San Francisco Office</SelectItem>
                            <SelectItem value="london">London Office</SelectItem>
                            <SelectItem value="remote">Remote</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="group">
                        <Label htmlFor="effectiveDate" className="text-sm font-semibold text-gray-700 mb-2 block">
                          <Calendar className="h-4 w-4 inline mr-1" />
                          Effective Date
                        </Label>
                        <Input
                          id="effectiveDate"
                          type="date"
                          defaultValue="2024-01-01"
                          className="h-10 border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Information Section */}
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/70 backdrop-blur-xl shadow-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-600 via-violet-700 to-indigo-700 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 to-indigo-700/90"></div>
                <div className="absolute top-0 right-0 w-36 h-36 bg-white/10 rounded-full -translate-y-18 translate-x-18"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <FileText className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-bold">Additional Information</CardTitle>
                        <CardDescription className="text-purple-100 text-base">
                          Supplementary details and special instructions
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">Step 3 of 3</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="group">
                    <Label htmlFor="message" className="text-sm font-semibold text-gray-800 mb-3 block">
                      Comments & Special Instructions
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Enter any additional information, special requirements, or comments about this employee..."
                      className="min-h-[150px] border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300 text-base leading-relaxed"
                      defaultValue="Employee requires special accommodation for remote work setup. Preferred communication hours: 9 AM - 6 PM EST."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <Label htmlFor="emergencyContact" className="text-sm font-semibold text-gray-700 mb-2 block">
                        Emergency Contact
                      </Label>
                      <Input
                        id="emergencyContact"
                        placeholder="Emergency contact name and phone"
                        className="h-10 border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300"
                      />
                    </div>
                    <div className="group">
                      <Label htmlFor="reportingManager" className="text-sm font-semibold text-gray-700 mb-2 block">
                        Reporting Manager
                      </Label>
                      <Input
                        id="reportingManager"
                        placeholder="Manager name and employee ID"
                        className="h-10 border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Button
                type="submit"
                size="lg"
                className="group bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white px-12 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 text-sm font-semibold"
              >
                <Send className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                Submit Employee Information
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="group border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-sm font-medium"
              >
                <Save className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                Save as Draft
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="lg"
                className="group text-gray-600 hover:text-gray-800 hover:bg-gray-100 px-8 py-4 rounded-2xl transition-all duration-300 text-sm font-medium"
              >
                <RotateCcw className="h-5 w-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                Reset Form
              </Button>
            </div>
          </form>

          {/* Status Indicators */}
          <div className="mt-12 flex flex-wrap gap-3 justify-center">
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full shadow-lg">
              <CheckCircle className="h-4 w-4 mr-2" />
              Form Auto-saved
            </Badge>
            <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full shadow-lg">
              <CheckCircle className="h-4 w-4 mr-2" />
              All fields validated
            </Badge>
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full shadow-lg">
              <Sparkles className="h-4 w-4 mr-2" />
              Ready to submit
            </Badge>
          </div>

          {/* Footer */}
          <div className="text-center mt-16 pb-8">
            <p className="text-gray-500 text-sm">Powered by Advanced HR Management System • Secure & Confidential</p>
          </div>
        </div>
      </div>
    </div>
  )
}