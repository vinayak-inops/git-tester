"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@repo/ui/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Input } from "@repo/ui/components/ui/input"
import { Label } from "@repo/ui/components/ui/label"
import { Switch } from "@repo/ui/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/ui/tabs"
import { Badge } from "@repo/ui/components/ui/badge"
import { Separator } from "@repo/ui/components/ui/separator"
import { Clock, Calendar, RotateCcw, Users, Save, ArrowLeft, Plus, Trash2 } from "lucide-react"

interface PatternItem {
  days: number
  shift: string
}

interface GraceSettings {
  inAheadMargin: number
  inAboveMargin: number
  outAheadMargin: number
  outAboveMargin: number
  lateInAllowedTime: number
  earlyOutAllowedTime: number
  graceIn: number
  graceOut: number
  minimumDurationForPresent: number
  allowNormalComputation: boolean
}

interface WeekOff {
  week: number
  weekOff: number[]
}

interface RotationItem {
  days: number
  priority: number
  shiftGroupCode: string
  shiftCode: string
}

interface ShiftManagementData {
  _id?: string
  organizationCode: string
  tenantCode: string
  shiftGroupCode: string
  pattern: PatternItem[]
  grace: GraceSettings
  isRotation: boolean
  shiftGroupName: string
  weekOffs: WeekOff[]
  isActive: boolean
  employeeID: string
  fromDate: string
  toDate: string
  isRotational: boolean
  rotation: RotationItem[]
}

export function ShiftManagementForm() {
  const [formData, setFormData] = useState<ShiftManagementData>({
    organizationCode: "ALL",
    tenantCode: "tenant1",
    shiftGroupCode: "A",
    pattern: [
      { days: 10, shift: "A001" },
      { days: 10, shift: "A002" },
    ],
    grace: {
      inAheadMargin: 30,
      inAboveMargin: 30,
      outAheadMargin: 30,
      outAboveMargin: 30,
      lateInAllowedTime: 15,
      earlyOutAllowedTime: 15,
      graceIn: 5,
      graceOut: 5,
      minimumDurationForPresent: 240,
      allowNormalComputation: true,
    },
    isRotation: true,
    shiftGroupName: "First Group",
    weekOffs: [
      { week: 1, weekOff: [1, 2] },
      { week: 2, weekOff: [1, 2] },
      { week: 3, weekOff: [1, 2] },
      { week: 4, weekOff: [1, 2] },
      { week: 5, weekOff: [1, 2] },
    ],
    isActive: true,
    employeeID: "EMP001",
    fromDate: "2025-01-01",
    toDate: "2025-12-31",
    isRotational: true,
    rotation: [
      { days: 5, priority: 1, shiftGroupCode: "A", shiftCode: "A001" },
      { days: 10, priority: 1, shiftGroupCode: "A", shiftCode: "A001" },
      { days: 15, priority: 1, shiftGroupCode: "A", shiftCode: "A001" },
    ],
  })

  const weekDays = [
    { value: 1, label: "Monday" },
    { value: 2, label: "Tuesday" },
    { value: 3, label: "Wednesday" },
    { value: 4, label: "Thursday" },
    { value: 5, label: "Friday" },
    { value: 6, label: "Saturday" },
    { value: 7, label: "Sunday" },
  ]

  const updateBasicField = (field: keyof ShiftManagementData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const updateGraceField = (field: keyof GraceSettings, value: any) => {
    setFormData((prev) => ({
      ...prev,
      grace: { ...prev.grace, [field]: value },
    }))
  }

  const addPatternItem = () => {
    setFormData((prev) => ({
      ...prev,
      pattern: [...prev.pattern, { days: 0, shift: "" }],
    }))
  }

  const removePatternItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      pattern: prev.pattern.filter((_, i) => i !== index),
    }))
  }

  const updatePatternItem = (index: number, field: keyof PatternItem, value: any) => {
    setFormData((prev) => ({
      ...prev,
      pattern: prev.pattern.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    }))
  }

  const addWeekOff = () => {
    const nextWeek = Math.max(...formData.weekOffs.map((w) => w.week)) + 1
    setFormData((prev) => ({
      ...prev,
      weekOffs: [...prev.weekOffs, { week: nextWeek, weekOff: [] }],
    }))
  }

  const removeWeekOff = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      weekOffs: prev.weekOffs.filter((_, i) => i !== index),
    }))
  }

  const updateWeekOff = (index: number, weekOff: number[]) => {
    setFormData((prev) => ({
      ...prev,
      weekOffs: prev.weekOffs.map((item, i) => (i === index ? { ...item, weekOff } : item)),
    }))
  }

  const addRotationItem = () => {
    setFormData((prev) => ({
      ...prev,
      rotation: [...prev.rotation, { days: 0, priority: 1, shiftGroupCode: "", shiftCode: "" }],
    }))
  }

  const removeRotationItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      rotation: prev.rotation.filter((_, i) => i !== index),
    }))
  }

  const updateRotationItem = (index: number, field: keyof RotationItem, value: any) => {
    setFormData((prev) => ({
      ...prev,
      rotation: prev.rotation.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Shift management form submitted:", formData)
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <span>HR Management</span>
        <span>/</span>
        <span>Shift Management</span>
        <span>/</span>
        <span className="text-gray-900 font-medium">New Shift Configuration</span>
      </div>

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="p-2 hover:bg-blue-50">
            <ArrowLeft className="w-4 h-4 text-blue-600" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Shift Management Configuration</h2>
            <p className="text-gray-600">Configure shift patterns, grace periods, and rotation schedules</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="border-gray-300 hover:bg-gray-50 bg-transparent">
            Cancel
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg">
            <Save className="w-4 h-4 mr-2" />
            Save Configuration
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="basic" className="w-full">
          {/* Clean Horizontal Tab Navigation */}
          <div className="bg-white rounded-lg border border-gray-200 mb-6 shadow-sm">
            <TabsList className="w-full justify-start bg-transparent border-b border-gray-100 rounded-none p-0 h-auto">
              {[
                { value: "basic", label: "Basic Information", icon: Users },
                { value: "pattern", label: "Shift Pattern", icon: Calendar },
                { value: "grace", label: "Grace Settings", icon: Clock },
                { value: "weekoffs", label: "Week Offs", icon: Calendar },
                { value: "rotation", label: "Rotation Settings", icon: RotateCcw },
              ].map((tab) => {
                const IconComponent = tab.icon
                return (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="flex items-center space-x-3 px-4 py-4 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 text-gray-500 hover:text-gray-700 rounded-none font-medium transition-colors duration-200 text-sm"
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </TabsTrigger>
                )
              })}
            </TabsList>
          </div>

          {/* Basic Information Tab */}
          <TabsContent value="basic" className="space-y-6">
            <Card className="rounded-2xl border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center space-x-3 text-xl">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Users className="w-6 h-6" />
                  </div>
                  <span>Basic Information</span>
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Core shift group details and employee assignment information
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                {/* Organization Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    Organization Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="organizationCode" className="text-sm font-medium text-gray-700">
                        Organization Code *
                      </Label>
                      <Input
                        id="organizationCode"
                        value={formData.organizationCode}
                        onChange={(e) => updateBasicField("organizationCode", e.target.value)}
                        className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                        placeholder="Enter organization code"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tenantCode" className="text-sm font-medium text-gray-700">
                        Tenant Code *
                      </Label>
                      <Input
                        id="tenantCode"
                        value={formData.tenantCode}
                        onChange={(e) => updateBasicField("tenantCode", e.target.value)}
                        className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                        placeholder="Enter tenant code"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="employeeID" className="text-sm font-medium text-gray-700">
                        Employee ID *
                      </Label>
                      <Input
                        id="employeeID"
                        value={formData.employeeID}
                        onChange={(e) => updateBasicField("employeeID", e.target.value)}
                        className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                        placeholder="Enter employee ID"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Shift Group Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    Shift Group Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="shiftGroupCode" className="text-sm font-medium text-gray-700">
                        Shift Group Code *
                      </Label>
                      <Input
                        id="shiftGroupCode"
                        value={formData.shiftGroupCode}
                        onChange={(e) => updateBasicField("shiftGroupCode", e.target.value)}
                        className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                        placeholder="Enter shift group code"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="shiftGroupName" className="text-sm font-medium text-gray-700">
                        Shift Group Name *
                      </Label>
                      <Input
                        id="shiftGroupName"
                        value={formData.shiftGroupName}
                        onChange={(e) => updateBasicField("shiftGroupName", e.target.value)}
                        className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                        placeholder="Enter shift group name"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Date Range */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    Effective Period
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fromDate" className="text-sm font-medium text-gray-700">
                        From Date *
                      </Label>
                      <Input
                        id="fromDate"
                        type="date"
                        value={formData.fromDate}
                        onChange={(e) => updateBasicField("fromDate", e.target.value)}
                        className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="toDate" className="text-sm font-medium text-gray-700">
                        To Date *
                      </Label>
                      <Input
                        id="toDate"
                        type="date"
                        value={formData.toDate}
                        onChange={(e) => updateBasicField("toDate", e.target.value)}
                        className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Status Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    Configuration Settings
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
                      <div className="space-y-1">
                        <Label htmlFor="isActive" className="text-sm font-semibold text-gray-900">
                          Active Status
                        </Label>
                        <p className="text-xs text-blue-700">Enable this shift configuration</p>
                      </div>
                      <Switch
                        id="isActive"
                        checked={formData.isActive}
                        onCheckedChange={(checked) => updateBasicField("isActive", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
                      <div className="space-y-1">
                        <Label htmlFor="isRotation" className="text-sm font-semibold text-gray-900">
                          Is Rotation
                        </Label>
                        <p className="text-xs text-blue-700">Enable rotation for this shift group</p>
                      </div>
                      <Switch
                        id="isRotation"
                        checked={formData.isRotation}
                        onCheckedChange={(checked) => updateBasicField("isRotation", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
                      <div className="space-y-1">
                        <Label htmlFor="isRotational" className="text-sm font-semibold text-gray-900">
                          Is Rotational
                        </Label>
                        <p className="text-xs text-blue-700">Enable rotational scheduling</p>
                      </div>
                      <Switch
                        id="isRotational"
                        checked={formData.isRotational}
                        onCheckedChange={(checked) => updateBasicField("isRotational", checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Shift Pattern Tab */}
          <TabsContent value="pattern" className="space-y-6">
            <Card className="rounded-2xl border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-[#007AFF] to-[#0056CC] text-white rounded-t-2xl">
                <CardTitle className="flex items-center space-x-3 text-xl">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <span>Shift Pattern Configuration</span>
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Define shift patterns with days and shift codes for the rotation cycle
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Pattern Items</h3>
                  <Button type="button" onClick={addPatternItem} className="bg-[#007AFF] hover:bg-[#0056CC]">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Pattern
                  </Button>
                </div>

                <div className="space-y-4">
                  {formData.pattern.map((item, index) => (
                    <div key={index} className="p-6 border border-gray-200 rounded-xl space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-md font-medium text-gray-800">Pattern {index + 1}</h4>
                        {formData.pattern.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removePatternItem(index)}
                            className="text-red-600 border-red-300 hover:bg-red-50 bg-transparent"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-700">Days</Label>
                          <Input
                            type="number"
                            value={item.days}
                            onChange={(e) => updatePatternItem(index, "days", Number.parseInt(e.target.value) || 0)}
                            className="h-12 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-xl"
                            placeholder="Enter number of days"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-700">Shift Code</Label>
                          <Input
                            value={item.shift}
                            onChange={(e) => updatePatternItem(index, "shift", e.target.value)}
                            className="h-12 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-xl"
                            placeholder="Enter shift code"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                  <h4 className="text-lg font-semibold text-blue-900 mb-4">Pattern Summary</h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {formData.pattern.map((item, index) => (
                      <Badge key={index} className="bg-[#B3D9FF] text-[#0056CC]">
                        {item.days} days - {item.shift || "No shift"}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-blue-700">
                    Total cycle: {formData.pattern.reduce((sum, item) => sum + item.days, 0)} days
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Grace Settings Tab */}
          <TabsContent value="grace" className="space-y-6">
            <Card className="rounded-2xl border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-[#6BB6FF] to-[#4A90E2] text-white rounded-t-2xl">
                <CardTitle className="flex items-center space-x-3 text-xl">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Clock className="w-6 h-6" />
                  </div>
                  <span>Grace Period Settings</span>
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Configure grace periods, margins, and attendance calculation rules
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                {/* Margin Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    Time Margins (minutes)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="inAheadMargin" className="text-sm font-medium text-gray-700">
                        In Ahead Margin
                      </Label>
                      <Input
                        id="inAheadMargin"
                        type="number"
                        value={formData.grace.inAheadMargin}
                        onChange={(e) => updateGraceField("inAheadMargin", Number.parseInt(e.target.value) || 0)}
                        className="h-12 border-2 border-gray-200 focus:border-[#6BB6FF] focus:ring-[#6BB6FF]/20 rounded-xl"
                        placeholder="Enter minutes"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="inAboveMargin" className="text-sm font-medium text-gray-700">
                        In Above Margin
                      </Label>
                      <Input
                        id="inAboveMargin"
                        type="number"
                        value={formData.grace.inAboveMargin}
                        onChange={(e) => updateGraceField("inAboveMargin", Number.parseInt(e.target.value) || 0)}
                        className="h-12 border-2 border-gray-200 focus:border-[#6BB6FF] focus:ring-[#6BB6FF]/20 rounded-xl"
                        placeholder="Enter minutes"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="outAheadMargin" className="text-sm font-medium text-gray-700">
                        Out Ahead Margin
                      </Label>
                      <Input
                        id="outAheadMargin"
                        type="number"
                        value={formData.grace.outAheadMargin}
                        onChange={(e) => updateGraceField("outAheadMargin", Number.parseInt(e.target.value) || 0)}
                        className="h-12 border-2 border-gray-200 focus:border-[#6BB6FF] focus:ring-[#6BB6FF]/20 rounded-xl"
                        placeholder="Enter minutes"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="outAboveMargin" className="text-sm font-medium text-gray-700">
                        Out Above Margin
                      </Label>
                      <Input
                        id="outAboveMargin"
                        type="number"
                        value={formData.grace.outAboveMargin}
                        onChange={(e) => updateGraceField("outAboveMargin", Number.parseInt(e.target.value) || 0)}
                        className="h-12 border-2 border-gray-200 focus:border-[#6BB6FF] focus:ring-[#6BB6FF]/20 rounded-xl"
                        placeholder="Enter minutes"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Grace and Allowance Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    Grace & Allowance Settings
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="lateInAllowedTime" className="text-sm font-medium text-gray-700">
                        Late In Allowed Time (minutes)
                      </Label>
                      <Input
                        id="lateInAllowedTime"
                        type="number"
                        value={formData.grace.lateInAllowedTime}
                        onChange={(e) => updateGraceField("lateInAllowedTime", Number.parseInt(e.target.value) || 0)}
                        className="h-12 border-2 border-gray-200 focus:border-[#6BB6FF] focus:ring-[#6BB6FF]/20 rounded-xl"
                        placeholder="Enter minutes"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="earlyOutAllowedTime" className="text-sm font-medium text-gray-700">
                        Early Out Allowed Time (minutes)
                      </Label>
                      <Input
                        id="earlyOutAllowedTime"
                        type="number"
                        value={formData.grace.earlyOutAllowedTime}
                        onChange={(e) => updateGraceField("earlyOutAllowedTime", Number.parseInt(e.target.value) || 0)}
                        className="h-12 border-2 border-gray-200 focus:border-[#6BB6FF] focus:ring-[#6BB6FF]/20 rounded-xl"
                        placeholder="Enter minutes"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="graceIn" className="text-sm font-medium text-gray-700">
                        Grace In (minutes)
                      </Label>
                      <Input
                        id="graceIn"
                        type="number"
                        value={formData.grace.graceIn}
                        onChange={(e) => updateGraceField("graceIn", Number.parseInt(e.target.value) || 0)}
                        className="h-12 border-2 border-gray-200 focus:border-[#6BB6FF] focus:ring-[#6BB6FF]/20 rounded-xl"
                        placeholder="Enter minutes"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="graceOut" className="text-sm font-medium text-gray-700">
                        Grace Out (minutes)
                      </Label>
                      <Input
                        id="graceOut"
                        type="number"
                        value={formData.grace.graceOut}
                        onChange={(e) => updateGraceField("graceOut", Number.parseInt(e.target.value) || 0)}
                        className="h-12 border-2 border-gray-200 focus:border-[#6BB6FF] focus:ring-[#6BB6FF]/20 rounded-xl"
                        placeholder="Enter minutes"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Duration and Computation Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    Duration & Computation
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="minimumDurationForPresent" className="text-sm font-medium text-gray-700">
                        Minimum Duration for Present (minutes)
                      </Label>
                      <Input
                        id="minimumDurationForPresent"
                        type="number"
                        value={formData.grace.minimumDurationForPresent}
                        onChange={(e) =>
                          updateGraceField("minimumDurationForPresent", Number.parseInt(e.target.value) || 0)
                        }
                        className="h-12 border-2 border-gray-200 focus:border-[#6BB6FF] focus:ring-[#6BB6FF]/20 rounded-xl"
                        placeholder="Enter minutes"
                      />
                    </div>
                    <div className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200">
                      <div className="space-y-1">
                        <Label htmlFor="allowNormalComputation" className="text-sm font-semibold text-gray-900">
                          Allow Normal Computation
                        </Label>
                        <p className="text-xs text-gray-600">Enable standard attendance calculation</p>
                      </div>
                      <Switch
                        id="allowNormalComputation"
                        checked={formData.grace.allowNormalComputation}
                        onCheckedChange={(checked) => updateGraceField("allowNormalComputation", checked)}
                      />
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                  <h4 className="text-lg font-semibold text-blue-900 mb-4">Grace Settings Summary</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p>
                        <span className="font-medium">Grace In:</span> {formData.grace.graceIn} minutes
                      </p>
                      <p>
                        <span className="font-medium">Grace Out:</span> {formData.grace.graceOut} minutes
                      </p>
                      <p>
                        <span className="font-medium">Late In Allowed:</span> {formData.grace.lateInAllowedTime} minutes
                      </p>
                      <p>
                        <span className="font-medium">Early Out Allowed:</span> {formData.grace.earlyOutAllowedTime}{" "}
                        minutes
                      </p>
                    </div>
                    <div>
                      <p>
                        <span className="font-medium">Minimum Duration:</span>{" "}
                        {formData.grace.minimumDurationForPresent} minutes
                      </p>
                      <p>
                        <span className="font-medium">Normal Computation:</span>{" "}
                        {formData.grace.allowNormalComputation ? "Enabled" : "Disabled"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Week Offs Tab */}
          <TabsContent value="weekoffs" className="space-y-6">
            <Card className="rounded-2xl border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-[#6BB6FF] to-[#4A90E2] text-white rounded-t-2xl">
                <CardTitle className="flex items-center space-x-3 text-xl">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <span>Week Off Configuration</span>
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Configure weekly off days for different weeks in the rotation cycle
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Week Off Schedule</h3>
                  <Button type="button" onClick={addWeekOff} className="bg-[#007AFF] hover:bg-[#0056CC]">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Week
                  </Button>
                </div>

                <div className="space-y-4">
                  {formData.weekOffs.map((weekOff, index) => (
                    <div key={index} className="p-6 border border-gray-200 rounded-xl space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold text-gray-900">Week {weekOff.week}</h4>
                        {formData.weekOffs.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeWeekOff(index)}
                            className="text-red-600 border-red-300 hover:bg-red-50 bg-transparent"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
                        {weekDays.map((day) => (
                          <label
                            key={day.value}
                            className="flex items-center space-x-2 cursor-pointer p-3 rounded-lg border border-gray-200 hover:bg-blue-50"
                          >
                            <input
                              type="checkbox"
                              checked={weekOff.weekOff.includes(day.value)}
                              onChange={(e) => {
                                const newWeekOff = e.target.checked
                                  ? [...weekOff.weekOff, day.value]
                                  : weekOff.weekOff.filter((d) => d !== day.value)
                                updateWeekOff(index, newWeekOff.sort())
                              }}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">{day.label}</span>
                          </label>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {weekOff.weekOff.map((dayNum) => {
                          const dayName = weekDays.find((d) => d.value === dayNum)?.label
                          return (
                            <Badge key={dayNum} className="bg-[#B3D9FF] text-[#0056CC]">
                              {dayName}
                            </Badge>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rotation Settings Tab */}
          <TabsContent value="rotation" className="space-y-6">
            <Card className="rounded-2xl border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-[#007AFF] to-[#0056CC] text-white rounded-t-2xl">
                <CardTitle className="flex items-center space-x-3 text-xl">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <RotateCcw className="w-6 h-6" />
                  </div>
                  <span>Rotation Configuration</span>
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Configure rotation schedules with priority-based shift assignments
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Rotation Schedule</h3>
                  <Button type="button" onClick={addRotationItem} className="bg-[#007AFF] hover:bg-[#0056CC]">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Rotation
                  </Button>
                </div>

                <div className="space-y-4">
                  {formData.rotation.map((item, index) => (
                    <div key={index} className="p-6 border border-gray-200 rounded-xl space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-md font-medium text-gray-800">Rotation {index + 1}</h4>
                        {formData.rotation.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeRotationItem(index)}
                            className="text-red-600 border-red-300 hover:bg-red-50 bg-transparent"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-700">Days</Label>
                          <Input
                            type="number"
                            value={item.days}
                            onChange={(e) => updateRotationItem(index, "days", Number.parseInt(e.target.value) || 0)}
                            className="h-12 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-xl"
                            placeholder="Enter days"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-700">Priority</Label>
                          <Input
                            type="number"
                            value={item.priority}
                            onChange={(e) =>
                              updateRotationItem(index, "priority", Number.parseInt(e.target.value) || 1)
                            }
                            className="h-12 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-xl"
                            placeholder="Enter priority"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-700">Shift Group Code</Label>
                          <Input
                            value={item.shiftGroupCode}
                            onChange={(e) => updateRotationItem(index, "shiftGroupCode", e.target.value)}
                            className="h-12 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-xl"
                            placeholder="Enter group code"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-700">Shift Code</Label>
                          <Input
                            value={item.shiftCode}
                            onChange={(e) => updateRotationItem(index, "shiftCode", e.target.value)}
                            className="h-12 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-xl"
                            placeholder="Enter shift code"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                  <h4 className="text-lg font-semibold text-blue-900 mb-4">Rotation Summary</h4>
                  <div className="space-y-2">
                    {formData.rotation.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-white rounded-lg border border-blue-200"
                      >
                        <div className="flex items-center gap-4">
                          <Badge variant="outline" className="border-blue-300 text-blue-700">
                            Priority {item.priority}
                          </Badge>
                          <span className="text-sm text-gray-700">
                            {item.days} days - {item.shiftCode || "No shift"} ({item.shiftGroupCode || "No group"})
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-blue-700 mt-3">
                    Total rotation cycle: {formData.rotation.reduce((sum, item) => sum + item.days, 0)} days
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Enhanced Action Buttons */}
        <div className="flex justify-end space-x-4 pt-8 border-t-2 border-gray-200">
          <Button
            type="button"
            variant="outline"
            className="px-8 py-3 h-12 rounded-xl border-2 border-gray-300 hover:bg-gray-50 bg-transparent"
          >
            Save as Draft
          </Button>
          <Button
            type="submit"
            className="px-8 py-3 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg"
          >
            <Save className="w-5 h-5 mr-2" />
            Save Configuration
          </Button>
        </div>
      </form>
    </div>
  )
}
