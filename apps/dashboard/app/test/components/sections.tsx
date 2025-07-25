"use client"

import { useState } from "react"
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Building2,
  Download,
  Upload,
  CheckCircle,
  AlertCircle,
  X,
} from "lucide-react"
import { Button } from "@repo/ui/components/ui/button"
import { Input } from "@repo/ui/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Badge } from "@repo/ui/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/ui/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/ui/dialog"
import { Label } from "@repo/ui/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/ui/select"
import { Switch } from "@repo/ui/components/ui/switch"
import { Textarea } from "@repo/ui/components/ui/textarea"
import { Separator } from "@repo/ui/components/ui/separator"
import { Alert, AlertDescription } from "@repo/ui/components/ui/alert"

interface Section {
  id: string
  sectionCode: string
  sectionName: string
  sectionDescription: string
  subDepartmentCode: string
  departmentCode: string
  divisionCode: string
  locationCode: string[]
  organizationCode: string
  subsidiaryCode: string
  isActive: boolean
  createdAt: string
}

export default function SectionManagement() {
  const [sections, setSections] = useState<Section[]>([
    {
      id: "1",
      sectionCode: "iii",
      sectionName: "iii",
      sectionDescription: "iii",
      subDepartmentCode: "hhh",
      departmentCode: "ggg",
      divisionCode: "fff",
      locationCode: ["LOC001", "LOC002"],
      organizationCode: "aaa",
      subsidiaryCode: "bbb",
      isActive: true,
      createdAt: "2024-01-15",
    }
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingSection, setEditingSection] = useState<Section | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [newSection, setNewSection] = useState<Partial<Section>>({
    sectionCode: "",
    sectionName: "",
    sectionDescription: "",
    subDepartmentCode: "",
    departmentCode: "",
    divisionCode: "",
    locationCode: [],
    organizationCode: "",
    subsidiaryCode: "",
    isActive: true,
  })

  const filteredSections = sections.filter((section) => {
    const matchesSearch = Object.values(section).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    )
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && section.isActive) ||
      (filterStatus === "inactive" && !section.isActive)

    return matchesSearch && matchesStatus
  })

  const validateForm = (data: Partial<Section>) => {
    const newErrors: Record<string, string> = {}

    if (!data.sectionCode?.trim()) newErrors.sectionCode = "Section code is required"
    if (!data.sectionName?.trim()) newErrors.sectionName = "Section name is required"
    if (!data.subDepartmentCode?.trim()) newErrors.subDepartmentCode = "Sub Department code is required"
    if (!data.departmentCode?.trim()) newErrors.departmentCode = "Department code is required"
    if (!data.divisionCode?.trim()) newErrors.divisionCode = "Division code is required"
    if (!data.subsidiaryCode?.trim()) newErrors.subsidiaryCode = "Subsidiary code is required"
    if (!data.organizationCode?.trim()) newErrors.organizationCode = "Organization code is required"
    if (!data.locationCode?.length) newErrors.locationCode = "At least one location code is required"

    // Check for duplicate code
    const isDuplicate = sections.some(
      (section) => section.sectionCode === data.sectionCode && section.id !== editingSection?.id,
    )
    if (isDuplicate) newErrors.sectionCode = "Section code already exists"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddSection = async () => {
    if (!validateForm(newSection)) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const section: Section = {
      ...(newSection as Section),
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
    }

    setSections([...sections, section])
    resetForm()
    setIsLoading(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleEditSection = async () => {
    if (!editingSection || !validateForm(newSection)) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setSections(
      sections.map((section) => (section.id === editingSection.id ? { ...section, ...newSection } as Section : section)),
    )

    resetForm()
    setIsLoading(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleDeleteSection = async (id: string) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setSections(sections.filter((section) => section.id !== id))
    setIsLoading(false)
  }

  const handleToggleStatus = async (id: string) => {
    setSections(sections.map((section) => (section.id === id ? { ...section, isActive: !section.isActive } : section)))
  }

  const resetForm = () => {
    setNewSection({
      sectionCode: "",
      sectionName: "",
      sectionDescription: "",
      subDepartmentCode: "",
      departmentCode: "",
      divisionCode: "",
      locationCode: [],
      organizationCode: "",
      subsidiaryCode: "",
      isActive: true,
    })
    setEditingSection(null)
    setIsAddDialogOpen(false)
    setErrors({})
  }

  const startEdit = (section: Section) => {
    setEditingSection(section)
    setNewSection(section)
    setIsAddDialogOpen(true)
  }

  const activeSections = sections.filter((section) => section.isActive).length
  const inactiveSections = sections.length - activeSections

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Success Alert */}
        {showSuccess && (
          <Alert className="border-green-200 bg-green-50 text-green-800 animate-in slide-in-from-top-2 duration-300">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>Section {editingSection ? "updated" : "added"} successfully!</AlertDescription>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-2 h-6 w-6 p-0"
              onClick={() => setShowSuccess(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </Alert>
        )}

        {/* Header Section */}
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Section Management
            </h1>
            <p className="text-gray-600 mt-1 text-lg">Manage your organization sections efficiently</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Sections</p>
                  <p className="text-3xl font-bold">{sections.length}</p>
                </div>
                <Building2 className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Active</p>
                  <p className="text-3xl font-bold">{activeSections}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">Inactive</p>
                  <p className="text-3xl font-bold">{inactiveSections}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <Button variant="outline" className="hover:bg-gray-50">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" className="hover:bg-gray-50">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                size="lg"
                onClick={() => {
                  setEditingSection(null)
                  resetForm()
                }}
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Section
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl">
                  <Building2 className="h-6 w-6 text-blue-600" />
                  {editingSection ? "Edit Section" : "Add New Section"}
                </DialogTitle>
                <DialogDescription>
                  {editingSection
                    ? "Update the section details below."
                    : "Enter the details for the new section below."}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sectionCode" className="text-sm font-medium">
                        Section Code *
                      </Label>
                      <Input
                        id="sectionCode"
                        placeholder="SEC001"
                        value={newSection.sectionCode}
                        onChange={(e) => setNewSection({ ...newSection, sectionCode: e.target.value.toUpperCase() })}
                        className={errors.sectionCode ? "border-red-300 focus:border-red-500" : ""}
                      />
                      {errors.sectionCode && <p className="text-sm text-red-600">{errors.sectionCode}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sectionName" className="text-sm font-medium">
                        Section Name *
                      </Label>
                      <Input
                        id="sectionName"
                        placeholder="Section Name"
                        value={newSection.sectionName}
                        onChange={(e) => setNewSection({ ...newSection, sectionName: e.target.value })}
                        className={errors.sectionName ? "border-red-300 focus:border-red-500" : ""}
                      />
                      {errors.sectionName && <p className="text-sm text-red-600">{errors.sectionName}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="subDepartmentCode" className="text-sm font-medium">
                        Sub Department Code *
                      </Label>
                      <Input
                        id="subDepartmentCode"
                        placeholder="SUBDEP001"
                        value={newSection.subDepartmentCode}
                        onChange={(e) => setNewSection({ ...newSection, subDepartmentCode: e.target.value.toUpperCase() })}
                        className={errors.subDepartmentCode ? "border-red-300 focus:border-red-500" : ""}
                      />
                      {errors.subDepartmentCode && <p className="text-sm text-red-600">{errors.subDepartmentCode}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="departmentCode" className="text-sm font-medium">
                        Department Code *
                      </Label>
                      <Input
                        id="departmentCode"
                        placeholder="DEP001"
                        value={newSection.departmentCode}
                        onChange={(e) => setNewSection({ ...newSection, departmentCode: e.target.value.toUpperCase() })}
                        className={errors.departmentCode ? "border-red-300 focus:border-red-500" : ""}
                      />
                      {errors.departmentCode && <p className="text-sm text-red-600">{errors.departmentCode}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="divisionCode" className="text-sm font-medium">
                        Division Code *
                      </Label>
                      <Input
                        id="divisionCode"
                        placeholder="DIV001"
                        value={newSection.divisionCode}
                        onChange={(e) => setNewSection({ ...newSection, divisionCode: e.target.value.toUpperCase() })}
                        className={errors.divisionCode ? "border-red-300 focus:border-red-500" : ""}
                      />
                      {errors.divisionCode && <p className="text-sm text-red-600">{errors.divisionCode}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subsidiaryCode" className="text-sm font-medium">
                        Subsidiary Code *
                      </Label>
                      <Input
                        id="subsidiaryCode"
                        placeholder="SUB001"
                        value={newSection.subsidiaryCode}
                        onChange={(e) => setNewSection({ ...newSection, subsidiaryCode: e.target.value.toUpperCase() })}
                        className={errors.subsidiaryCode ? "border-red-300 focus:border-red-500" : ""}
                      />
                      {errors.subsidiaryCode && <p className="text-sm text-red-600">{errors.subsidiaryCode}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="organizationCode" className="text-sm font-medium">
                      Organization Code *
                    </Label>
                    <Input
                      id="organizationCode"
                      placeholder="ORG001"
                      value={newSection.organizationCode}
                      onChange={(e) => setNewSection({ ...newSection, organizationCode: e.target.value.toUpperCase() })}
                      className={errors.organizationCode ? "border-red-300 focus:border-red-500" : ""}
                    />
                    {errors.organizationCode && <p className="text-sm text-red-600">{errors.organizationCode}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sectionDescription" className="text-sm font-medium">
                      Description
                    </Label>
                    <Textarea
                      id="sectionDescription"
                      placeholder="Enter section description..."
                      value={newSection.sectionDescription}
                      onChange={(e) => setNewSection({ ...newSection, sectionDescription: e.target.value })}
                      rows={3}
                    />
                  </div>
                </div>

                <Separator />

                {/* Location Codes */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Location Codes</h3>
                  <div>
                    <Label className="text-sm font-medium">Associated Locations *</Label>
                    <Select
                      value={newSection.locationCode?.[0] || ""}
                      onValueChange={(value) =>
                        setNewSection({ ...newSection, locationCode: [value, ...(newSection.locationCode || []).slice(1)] })
                      }
                    >
                      <SelectTrigger className={errors.locationCode ? "border-red-300 focus:border-red-500" : ""}>
                        <SelectValue placeholder="Select locations" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="LOC001">Location 1</SelectItem>
                        <SelectItem value="LOC002">Location 2</SelectItem>
                        <SelectItem value="LOC003">Location 3</SelectItem>
                        <SelectItem value="LOC004">Location 4</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.locationCode && <p className="text-sm text-red-600">{errors.locationCode}</p>}
                  </div>
                </div>

                <Separator />

                {/* Status */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-sm font-medium">Status</Label>
                    <p className="text-sm text-gray-600">Enable or disable this section</p>
                  </div>
                  <Switch
                    checked={newSection.isActive}
                    onCheckedChange={(checked) => setNewSection({ ...newSection, isActive: checked })}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button
                  onClick={editingSection ? handleEditSection : handleAddSection}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </div>
                  ) : (
                    <>{editingSection ? "Update Section" : "Add Section"}</>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search sections by name, code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-11 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Sections Table */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold text-gray-900">
                Sections ({filteredSections.length})
              </CardTitle>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Showing {filteredSections.length} of {sections.length}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50/80">
                    <TableHead className="font-semibold text-gray-700">Code</TableHead>
                    <TableHead className="font-semibold text-gray-700">Name</TableHead>
                    <TableHead className="font-semibold text-gray-700">Sub Department</TableHead>
                    <TableHead className="font-semibold text-gray-700">Department</TableHead>
                    <TableHead className="font-semibold text-gray-700">Division</TableHead>
                    <TableHead className="font-semibold text-gray-700">Subsidiary</TableHead>
                    <TableHead className="font-semibold text-gray-700">Organization</TableHead>
                    <TableHead className="font-semibold text-gray-700">Locations</TableHead>
                    <TableHead className="font-semibold text-gray-700">Description</TableHead>
                    <TableHead className="font-semibold text-gray-700">Status</TableHead>
                    <TableHead className="font-semibold text-gray-700 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSections.map((section) => (
                    <TableRow key={section.id} className="hover:bg-gray-50/50 transition-all duration-200 group">
                      <TableCell className="font-mono text-blue-600 font-medium">{section.sectionCode}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-900">{section.sectionName}</p>
                          <p className="text-sm text-gray-500">Created {section.createdAt}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                          {section.subDepartmentCode}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {section.departmentCode}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                          {section.divisionCode}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {section.subsidiaryCode}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {section.organizationCode}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1 flex-wrap">
                          {section.locationCode.map((loc) => (
                            <Badge key={loc} variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                              {loc}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[200px]">
                        <p className="text-sm text-gray-600 truncate">{section.sectionDescription}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={section.isActive}
                            onCheckedChange={() => handleToggleStatus(section.id)}
                            className="data-[state=checked]:bg-green-500"
                          />
                          <span className={`text-sm ${section.isActive ? "text-green-600" : "text-gray-600"}`}>
                            {section.isActive ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                            onClick={() => startEdit(section)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                            onClick={() => handleDeleteSection(section.id)}
                            disabled={isLoading}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}