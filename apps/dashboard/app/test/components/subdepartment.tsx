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

interface SubDepartment {
  id: string
  subDepartmentName: string
  subDepartmentCode: string
  departmentCode: string
  divisionCode: string
  locationCode: string[]
  organizationCode: string
  subsidiaryCode: string
  subDepartmentDescription: string
  isActive: boolean
  createdAt: string
}

export default function SubDepartmentManagement() {
  const [subDepartments, setSubDepartments] = useState<SubDepartment[]>([
    {
      id: "1",
      subDepartmentName: "hhh",
      subDepartmentCode: "hhh",
      departmentCode: "ggg",
      divisionCode: "fff",
      locationCode: ["LOC001", "LOC002"],
      organizationCode: "aaa",
      subsidiaryCode: "bbb",
      subDepartmentDescription: "hhh",
      isActive: true,
      createdAt: "2024-01-15",
    }
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingSubDepartment, setEditingSubDepartment] = useState<SubDepartment | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [newSubDepartment, setNewSubDepartment] = useState<Partial<SubDepartment>>({
    subDepartmentName: "",
    subDepartmentCode: "",
    departmentCode: "",
    divisionCode: "",
    locationCode: [],
    organizationCode: "",
    subsidiaryCode: "",
    subDepartmentDescription: "",
    isActive: true,
  })

  const filteredSubDepartments = subDepartments.filter((subDepartment) => {
    const matchesSearch = Object.values(subDepartment).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    )
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && subDepartment.isActive) ||
      (filterStatus === "inactive" && !subDepartment.isActive)

    return matchesSearch && matchesStatus
  })

  const validateForm = (data: Partial<SubDepartment>) => {
    const newErrors: Record<string, string> = {}

    if (!data.subDepartmentCode?.trim()) newErrors.subDepartmentCode = "Sub-department code is required"
    if (!data.subDepartmentName?.trim()) newErrors.subDepartmentName = "Sub-department name is required"
    if (!data.departmentCode?.trim()) newErrors.departmentCode = "Department code is required"
    if (!data.subsidiaryCode?.trim()) newErrors.subsidiaryCode = "Subsidiary code is required"
    if (!data.organizationCode?.trim()) newErrors.organizationCode = "Organization code is required"
    if (!data.divisionCode?.trim()) newErrors.divisionCode = "Division code is required"
    if (!data.locationCode?.length) newErrors.locationCode = "At least one location code is required"

    // Check for duplicate code
    const isDuplicate = subDepartments.some(
      (dept) => dept.subDepartmentCode === data.subDepartmentCode && dept.id !== editingSubDepartment?.id,
    )
    if (isDuplicate) newErrors.subDepartmentCode = "Sub-department code already exists"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddSubDepartment = async () => {
    if (!validateForm(newSubDepartment)) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const subDepartment: SubDepartment = {
      ...(newSubDepartment as SubDepartment),
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
    }

    setSubDepartments([...subDepartments, subDepartment])
    resetForm()
    setIsLoading(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleEditSubDepartment = async () => {
    if (!editingSubDepartment || !validateForm(newSubDepartment)) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setSubDepartments(
      subDepartments.map((dept) => (dept.id === editingSubDepartment.id ? { ...dept, ...newSubDepartment } as SubDepartment : dept)),
    )

    resetForm()
    setIsLoading(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleDeleteSubDepartment = async (id: string) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setSubDepartments(subDepartments.filter((subDepartment) => subDepartment.id !== id))
    setIsLoading(false)
  }

  const handleToggleStatus = async (id: string) => {
    setSubDepartments(subDepartments.map((dept) => (dept.id === id ? { ...dept, isActive: !dept.isActive } : dept)))
  }

  const resetForm = () => {
    setNewSubDepartment({
      subDepartmentName: "",
      subDepartmentCode: "",
      departmentCode: "",
      divisionCode: "",
      locationCode: [],
      organizationCode: "",
      subsidiaryCode: "",
      subDepartmentDescription: "",
      isActive: true,
    })
    setEditingSubDepartment(null)
    setIsAddDialogOpen(false)
    setErrors({})
  }

  const startEdit = (subDepartment: SubDepartment) => {
    setEditingSubDepartment(subDepartment)
    setNewSubDepartment(subDepartment)
    setIsAddDialogOpen(true)
  }

  const activeSubDepartments = subDepartments.filter((dept) => dept.isActive).length
  const inactiveSubDepartments = subDepartments.length - activeSubDepartments

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Success Alert */}
        {showSuccess && (
          <Alert className="border-green-200 bg-green-50 text-green-800 animate-in slide-in-from-top-2 duration-300">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>Sub-department {editingSubDepartment ? "updated" : "added"} successfully!</AlertDescription>
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
              Sub-Department Management
            </h1>
            <p className="text-gray-600 mt-1 text-lg">Manage your organization sub-departments efficiently</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
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
                  setEditingSubDepartment(null)
                  resetForm()
                }}
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Sub-Department
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl">
                  <Building2 className="h-6 w-6 text-blue-600" />
                  {editingSubDepartment ? "Edit Sub-Department" : "Add New Sub-Department"}
                </DialogTitle>
                <DialogDescription>
                  {editingSubDepartment
                    ? "Update the sub-department details below."
                    : "Enter the details for the new sub-department below."}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="subDepartmentCode" className="text-sm font-medium">
                        Sub-Department Code *
                      </Label>
                      <Input
                        id="subDepartmentCode"
                        placeholder="SUBDEP001"
                        value={newSubDepartment.subDepartmentCode}
                        onChange={(e) => setNewSubDepartment({ ...newSubDepartment, subDepartmentCode: e.target.value.toUpperCase() })}
                        className={errors.subDepartmentCode ? "border-red-300 focus:border-red-500" : ""}
                      />
                      {errors.subDepartmentCode && <p className="text-sm text-red-600">{errors.subDepartmentCode}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subDepartmentName" className="text-sm font-medium">
                        Sub-Department Name *
                      </Label>
                      <Input
                        id="subDepartmentName"
                        placeholder="HR Operations"
                        value={newSubDepartment.subDepartmentName}
                        onChange={(e) => setNewSubDepartment({ ...newSubDepartment, subDepartmentName: e.target.value })}
                        className={errors.subDepartmentName ? "border-red-300 focus:border-red-500" : ""}
                      />
                      {errors.subDepartmentName && <p className="text-sm text-red-600">{errors.subDepartmentName}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="departmentCode" className="text-sm font-medium">
                        Department Code *
                      </Label>
                      <Input
                        id="departmentCode"
                        placeholder="DEP001"
                        value={newSubDepartment.departmentCode}
                        onChange={(e) => setNewSubDepartment({ ...newSubDepartment, departmentCode: e.target.value.toUpperCase() })}
                        className={errors.departmentCode ? "border-red-300 focus:border-red-500" : ""}
                      />
                      {errors.departmentCode && <p className="text-sm text-red-600">{errors.departmentCode}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="divisionCode" className="text-sm font-medium">
                        Division Code *
                      </Label>
                      <Input
                        id="divisionCode"
                        placeholder="DIV001"
                        value={newSubDepartment.divisionCode}
                        onChange={(e) => setNewSubDepartment({ ...newSubDepartment, divisionCode: e.target.value.toUpperCase() })}
                        className={errors.divisionCode ? "border-red-300 focus:border-red-500" : ""}
                      />
                      {errors.divisionCode && <p className="text-sm text-red-600">{errors.divisionCode}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="subsidiaryCode" className="text-sm font-medium">
                        Subsidiary Code *
                      </Label>
                      <Input
                        id="subsidiaryCode"
                        placeholder="SUB001"
                        value={newSubDepartment.subsidiaryCode}
                        onChange={(e) => setNewSubDepartment({ ...newSubDepartment, subsidiaryCode: e.target.value.toUpperCase() })}
                        className={errors.subsidiaryCode ? "border-red-300 focus:border-red-500" : ""}
                      />
                      {errors.subsidiaryCode && <p className="text-sm text-red-600">{errors.subsidiaryCode}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="organizationCode" className="text-sm font-medium">
                        Organization Code *
                      </Label>
                      <Input
                        id="organizationCode"
                        placeholder="ORG001"
                        value={newSubDepartment.organizationCode}
                        onChange={(e) => setNewSubDepartment({ ...newSubDepartment, organizationCode: e.target.value.toUpperCase() })}
                        className={errors.organizationCode ? "border-red-300 focus:border-red-500" : ""}
                      />
                      {errors.organizationCode && <p className="text-sm text-red-600">{errors.organizationCode}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subDepartmentDescription" className="text-sm font-medium">
                      Description
                    </Label>
                    <Textarea
                      id="subDepartmentDescription"
                      placeholder="Enter sub-department description..."
                      value={newSubDepartment.subDepartmentDescription}
                      onChange={(e) => setNewSubDepartment({ ...newSubDepartment, subDepartmentDescription: e.target.value })}
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
                      value={newSubDepartment.locationCode?.[0] || ""}
                      onValueChange={(value) =>
                        setNewSubDepartment({ ...newSubDepartment, locationCode: [value, ...(newSubDepartment.locationCode || []).slice(1)] })
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
                    <p className="text-sm text-gray-600">Enable or disable this sub-department</p>
                  </div>
                  <Switch
                    checked={newSubDepartment.isActive}
                    onCheckedChange={(checked) => setNewSubDepartment({ ...newSubDepartment, isActive: checked })}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={resetForm} disabled={isLoading}>
                  Cancel
                </Button>
                <Button
                  onClick={editingSubDepartment ? handleEditSubDepartment : handleAddSubDepartment}
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      {editingSubDepartment ? "Updating..." : "Adding..."}
                    </div>
                  ) : editingSubDepartment ? (
                    "Update Sub-Department"
                  ) : (
                    "Add Sub-Department"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Sub-Departments</p>
                  <p className="text-3xl font-bold">{subDepartments.length}</p>
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
                  <p className="text-3xl font-bold">{activeSubDepartments}</p>
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
                  <p className="text-3xl font-bold">{inactiveSubDepartments}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search sub-departments by name, code..."
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

            {(searchTerm || filterStatus !== "all") && (
              <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                <span className="text-sm text-gray-600">Active filters:</span>
                {searchTerm && (
                  <Badge variant="secondary" className="gap-1">
                    Search: {searchTerm}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchTerm("")} />
                  </Badge>
                )}
                {filterStatus !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    Status: {filterStatus}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setFilterStatus("all")} />
                  </Badge>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Sub-Departments Table */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold text-gray-900">
                Sub-Departments ({filteredSubDepartments.length})
              </CardTitle>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Showing {filteredSubDepartments.length} of {subDepartments.length}
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
                  {filteredSubDepartments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={10} className="h-32 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <Building2 className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-lg font-medium text-gray-900 mb-1">No sub-departments found</p>
                          <p className="text-gray-500">
                            {searchTerm || filterStatus !== "all"
                              ? "Try adjusting your search criteria or filters"
                              : "Get started by adding your first sub-department"}
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredSubDepartments.map((subDepartment) => (
                      <TableRow key={subDepartment.id} className="hover:bg-gray-50/50 transition-all duration-200 group">
                        <TableCell className="font-mono text-blue-600 font-medium">{subDepartment.subDepartmentCode}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900">{subDepartment.subDepartmentName}</p>
                            <p className="text-sm text-gray-500">Created {subDepartment.createdAt}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {subDepartment.departmentCode}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                            {subDepartment.divisionCode}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                            {subDepartment.subsidiaryCode}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {subDepartment.organizationCode}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {subDepartment.locationCode.map((code) => (
                              <Badge key={code} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                {code}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm text-gray-600 truncate">{subDepartment.subDepartmentDescription}</p>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Switch checked={subDepartment.isActive} onCheckedChange={() => handleToggleStatus(subDepartment.id)} />
                            <Badge
                              variant={subDepartment.isActive ? "default" : "secondary"}
                              className={subDepartment.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}
                            >
                              {subDepartment.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                              onClick={() => startEdit(subDepartment)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                              onClick={() => handleDeleteSubDepartment(subDepartment.id)}
                              disabled={isLoading}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
