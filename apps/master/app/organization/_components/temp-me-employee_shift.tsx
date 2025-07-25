"use client"

import { Button } from "@repo/ui/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Input } from "@repo/ui/components/ui/input"
import { Label } from "@repo/ui/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/ui/select"
import { Badge } from "@repo/ui/components/ui/badge"
import { Separator } from "@repo/ui/components/ui/separator"
import { Switch } from "@repo/ui/components/ui/switch"
import { Checkbox } from "@repo/ui/components/ui/checkbox"
import {
  Building2,
  Clock,
  Calendar,
  RotateCcw,
  Settings,
  Users,
  Timer,
  RefreshCw,
  Plus,
  Send,
  Sparkles,
  CheckCircle,
  Save,
  CalendarDays,
  UserCheck,
  Zap,
} from "lucide-react"
import { useState } from "react"

export default function EmployeeShiftForm() {
  const [isRotation, setIsRotation] = useState(false)
  const [isActive, setIsActive] = useState(true)
  const [allowNormalComputation, setAllowNormalComputation] = useState(false)
  const [graceSettings, setGraceSettings] = useState({
    inAheadMargin: false,
    outAheadMargin: false,
    cutAheadMargin: false,
    cutAboveMargin: false,
    lateInAdvanced: false,
    earlyOutAdvanced: false,
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-6 shadow-2xl">
              <Clock className="h-[40px] w-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent mb-4">
              Employee Shift Management
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Configure and manage employee shift schedules, rotations, and attendance settings with precision
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <Sparkles className="h-5 w-5 text-yellow-500" />
              <span className="text-sm text-gray-500 font-medium">Advanced Shift Management System</span>
            </div>
          </div>

          <form className="space-y-8">
            {/* Basic Configuration Section */}
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
                        <CardTitle className="text-2xl font-bold">Basic Configuration</CardTitle>
                        <CardDescription className="text-blue-100 text-base">
                          Organization and employee identification settings
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">Setup</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="group">
                    <Label htmlFor="orgCode" className="text-sm font-semibold text-gray-700 mb-2 block">
                      Organization Code
                    </Label>
                    <Input
                      id="orgCode"
                      defaultValue="ORG"
                      className="h-[40px] border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300"
                    />
                  </div>
                  <div className="group">
                    <Label htmlFor="restartCode" className="text-sm font-semibold text-gray-700 mb-2 block">
                      Restart Code
                    </Label>
                    <Input
                      id="restartCode"
                      defaultValue="RESTART"
                      className="h-[40px] border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300"
                    />
                  </div>
                  <div className="group">
                    <Label htmlFor="employeeId" className="text-sm font-semibold text-gray-700 mb-2 block">
                      <Users className="h-4 w-4 inline mr-1" />
                      Employee ID
                    </Label>
                    <Input
                      id="employeeId"
                      defaultValue="EMP001"
                      className="h-[40px] border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300"
                    />
                  </div>
                  <div className="group">
                    <Label htmlFor="shiftGroupCode" className="text-sm font-semibold text-gray-700 mb-2 block">
                      Shift Group Code
                    </Label>
                    <Input
                      id="shiftGroupCode"
                      className="h-[40px] border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300"
                    />
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="group lg:col-span-1">
                    <Label htmlFor="shiftGroupName" className="text-sm font-semibold text-gray-700 mb-2 block">
                      Shift Group Name
                    </Label>
                    <Select defaultValue="day-shift">
                      <SelectTrigger className="h-[40px] border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-2">
                        <SelectItem value="day-shift">Day Shift</SelectItem>
                        <SelectItem value="night-shift">Night Shift</SelectItem>
                        <SelectItem value="rotating-shift">Rotating Shift</SelectItem>
                        <SelectItem value="flexible-shift">Flexible Shift</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="group">
                    <Label htmlFor="fromDate" className="text-sm font-semibold text-gray-700 mb-2 block">
                      <Calendar className="h-4 w-4 inline mr-1" />
                      From Date
                    </Label>
                    <Input
                      id="fromDate"
                      type="date"
                      defaultValue="2024-01-01"
                      className="h-[40px] border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300"
                    />
                  </div>
                  <div className="group">
                    <Label htmlFor="toDate" className="text-sm font-semibold text-gray-700 mb-2 block">
                      <Calendar className="h-4 w-4 inline mr-1" />
                      To Date
                    </Label>
                    <Input
                      id="toDate"
                      type="date"
                      defaultValue="2024-12-31"
                      className="h-[40px] border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-center gap-8 mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
                  <div className="flex items-center space-x-3">
                    <Switch
                      id="isRotation"
                      checked={isRotation}
                      onCheckedChange={setIsRotation}
                      className="data-[state=checked]:bg-blue-600"
                    />
                    <Label htmlFor="isRotation" className="text-sm font-semibold text-gray-700 cursor-pointer">
                      <RefreshCw className="h-4 w-4 inline mr-1" />
                      Is Rotation
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Switch
                      id="isActive"
                      checked={isActive}
                      onCheckedChange={setIsActive}
                      className="data-[state=checked]:bg-green-600"
                    />
                    <Label htmlFor="isActive" className="text-sm font-semibold text-gray-700 cursor-pointer">
                      <CheckCircle className="h-4 w-4 inline mr-1" />
                      Is Active
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pattern Section */}
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/70 backdrop-blur-xl shadow-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-emerald-600 via-green-700 to-teal-700 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/90 to-teal-700/90"></div>
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <CalendarDays className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-bold">Shift Pattern</CardTitle>
                        <CardDescription className="text-emerald-100 text-base">
                          Configure daily shift patterns and schedules
                        </CardDescription>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="secondary"
                      className="bg-white/20 text-white border-white/30 hover:bg-white/30 rounded-xl"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Pattern
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="group">
                    <Label htmlFor="days" className="text-sm font-semibold text-gray-700 mb-2 block">
                      Days
                    </Label>
                    <Input
                      id="days"
                      placeholder="Enter days (e.g., Mon, Tue, Wed)"
                      className="h-[40px] border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300"
                    />
                  </div>
                  <div className="group">
                    <Label htmlFor="shiftCode" className="text-sm font-semibold text-gray-700 mb-2 block">
                      Shift Code
                    </Label>
                    <Select>
                      <SelectTrigger className="h-[40px] border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300">
                        <SelectValue placeholder="Select shift code" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-2">
                        <SelectItem value="morning">Morning Shift (9AM-5PM)</SelectItem>
                        <SelectItem value="evening">Evening Shift (2PM-10PM)</SelectItem>
                        <SelectItem value="night">Night Shift (10PM-6AM)</SelectItem>
                        <SelectItem value="flexible">Flexible Hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Button
                    type="button"
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Request Pattern
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Week Offs Section */}
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/70 backdrop-blur-xl shadow-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600/90 to-pink-600/90"></div>
                <div className="absolute top-0 right-0 w-36 h-36 bg-white/10 rounded-full -translate-y-18 translate-x-18"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <Timer className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-bold">Week Offs</CardTitle>
                        <CardDescription className="text-orange-100 text-base">
                          Configure weekly off days and rest periods
                        </CardDescription>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="secondary"
                      className="bg-white/20 text-white border-white/30 hover:bg-white/30 rounded-xl"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Week Off
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="group">
                    <Label htmlFor="week" className="text-sm font-semibold text-gray-700 mb-2 block">
                      Week
                    </Label>
                    <Select>
                      <SelectTrigger className="h-[40px] border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300">
                        <SelectValue placeholder="Select week" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-2">
                        <SelectItem value="week1">Week 1</SelectItem>
                        <SelectItem value="week2">Week 2</SelectItem>
                        <SelectItem value="week3">Week 3</SelectItem>
                        <SelectItem value="week4">Week 4</SelectItem>
                        <SelectItem value="all">All Weeks</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="group">
                    <Label htmlFor="weekOff" className="text-sm font-semibold text-gray-700 mb-2 block">
                      Week Off Days
                      <span className="text-xs text-gray-500 ml-2">(Days off/week are required)</span>
                    </Label>
                    <Select>
                      <SelectTrigger className="h-[40px] border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300">
                        <SelectValue placeholder="Select week off days" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-2">
                        <SelectItem value="saturday-sunday">Saturday & Sunday</SelectItem>
                        <SelectItem value="sunday">Sunday Only</SelectItem>
                        <SelectItem value="saturday">Saturday Only</SelectItem>
                        <SelectItem value="friday-saturday">Friday & Saturday</SelectItem>
                        <SelectItem value="custom">Custom Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Button
                    type="button"
                    className="bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Request Week Off
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Rotation Section */}
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/70 backdrop-blur-xl shadow-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-600 via-violet-700 to-indigo-700 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 to-indigo-700/90"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <RotateCcw className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-bold">Rotation Settings</CardTitle>
                        <CardDescription className="text-purple-100 text-base">
                          Configure shift rotation patterns and priorities
                        </CardDescription>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="secondary"
                      className="bg-white/20 text-white border-white/30 hover:bg-white/30 rounded-xl"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Rotation
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  <div className="group">
                    <Label htmlFor="rotationDays" className="text-sm font-semibold text-gray-700 mb-2 block">
                      Days
                    </Label>
                    <Input
                      id="rotationDays"
                      placeholder="Enter rotation days"
                      className="h-[40px] border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300"
                    />
                  </div>
                  <div className="group">
                    <Label htmlFor="priority" className="text-sm font-semibold text-gray-700 mb-2 block">
                      Priority
                    </Label>
                    <Select>
                      <SelectTrigger className="h-[40px] border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-2">
                        <SelectItem value="high">High Priority</SelectItem>
                        <SelectItem value="medium">Medium Priority</SelectItem>
                        <SelectItem value="low">Low Priority</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="group">
                    <Label htmlFor="rotationShiftGroupCode" className="text-sm font-semibold text-gray-700 mb-2 block">
                      Shift Group Code
                    </Label>
                    <Input
                      id="rotationShiftGroupCode"
                      placeholder="Enter shift group code"
                      className="h-[40px] border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300"
                    />
                  </div>
                  <div className="group">
                    <Label htmlFor="rotationShiftCode" className="text-sm font-semibold text-gray-700 mb-2 block">
                      Shift Code
                    </Label>
                    <Select>
                      <SelectTrigger className="h-[40px] border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300">
                        <SelectValue placeholder="Select shift code" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-2">
                        <SelectItem value="morning">Morning Shift</SelectItem>
                        <SelectItem value="evening">Evening Shift</SelectItem>
                        <SelectItem value="night">Night Shift</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Button
                    type="button"
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Request Rotation
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Grace Settings Section */}
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/70 backdrop-blur-xl shadow-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-teal-600 via-cyan-700 to-blue-700 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-600/90 to-blue-700/90"></div>
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                      <Settings className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold">Grace Settings</CardTitle>
                      <CardDescription className="text-teal-100 text-base">
                        Configure attendance grace periods and margin settings
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                      <UserCheck className="h-5 w-5 text-teal-600" />
                      Margin Settings
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl">
                        <Label htmlFor="inAheadMargin" className="text-sm font-medium text-gray-700">
                          In Ahead Margin Included
                        </Label>
                        <Checkbox
                          id="inAheadMargin"
                          checked={graceSettings.inAheadMargin}
                          onCheckedChange={(checked) =>
                            setGraceSettings((prev) => ({ ...prev, inAheadMargin: checked as boolean }))
                          }
                          className="data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600"
                        />
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl">
                        <Label htmlFor="outAheadMargin" className="text-sm font-medium text-gray-700">
                          Out Ahead Margin Included
                        </Label>
                        <Checkbox
                          id="outAheadMargin"
                          checked={graceSettings.outAheadMargin}
                          onCheckedChange={(checked) =>
                            setGraceSettings((prev) => ({ ...prev, outAheadMargin: checked as boolean }))
                          }
                          className="data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                      <Timer className="h-5 w-5 text-teal-600" />
                      Time Intervals
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="lateInAdvanced" className="text-sm font-medium text-gray-700 mb-2 block">
                          Late In Advanced Time (minutes)
                        </Label>
                        <Input
                          id="lateInAdvanced"
                          type="number"
                          placeholder="15"
                          className="h-[40px] border-2 border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 rounded-xl transition-all duration-300"
                        />
                      </div>
                      <div>
                        <Label htmlFor="earlyOutAdvanced" className="text-sm font-medium text-gray-700 mb-2 block">
                          Early Out Advanced Time (minutes)
                        </Label>
                        <Input
                          id="earlyOutAdvanced"
                          type="number"
                          placeholder="15"
                          className="h-[40px] border-2 border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 rounded-xl transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                      <Zap className="h-5 w-5 text-teal-600" />
                      Advanced Options
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl">
                        <Label htmlFor="cutAheadMargin" className="text-sm font-medium text-gray-700">
                          Cut Ahead Margin Included
                        </Label>
                        <Checkbox
                          id="cutAheadMargin"
                          checked={graceSettings.cutAheadMargin}
                          onCheckedChange={(checked) =>
                            setGraceSettings((prev) => ({ ...prev, cutAheadMargin: checked as boolean }))
                          }
                          className="data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600"
                        />
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl">
                        <Label htmlFor="cutAboveMargin" className="text-sm font-medium text-gray-700">
                          Cut Above Margin Included
                        </Label>
                        <Checkbox
                          id="cutAboveMargin"
                          checked={graceSettings.cutAboveMargin}
                          onCheckedChange={(checked) =>
                            setGraceSettings((prev) => ({ ...prev, cutAboveMargin: checked as boolean }))
                          }
                          className="data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-8" />

                <div className="flex items-center justify-center p-6 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl">
                  <div className="flex items-center space-x-3">
                    <Switch
                      id="allowNormalComputation"
                      checked={allowNormalComputation}
                      onCheckedChange={setAllowNormalComputation}
                      className="data-[state=checked]:bg-teal-600"
                    />
                    <Label
                      htmlFor="allowNormalComputation"
                      className="text-sm font-semibold text-gray-700 cursor-pointer"
                    >
                      <Zap className="h-5 w-5 inline mr-2" />
                      Allow Normal Computation
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Section */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Button
                type="submit"
                size="lg"
                className="group bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white px-12 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 text-sm font-semibold"
              >
                <Send className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                Submit Configuration
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
              Configuration Valid
            </Badge>
            <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full shadow-lg">
              <Clock className="h-4 w-4 mr-2" />
              Shifts Synchronized
            </Badge>
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full shadow-lg">
              <Sparkles className="h-4 w-4 mr-2" />
              Ready to Deploy
            </Badge>
          </div>

          {/* Footer */}
          <div className="text-center mt-16 pb-8">
            <p className="text-gray-500 text-sm">Advanced Shift Management System • Secure & Reliable</p>
          </div>
        </div>
      </div>
    </div>
  )
}