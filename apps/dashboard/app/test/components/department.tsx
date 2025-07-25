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

interface Department {
  id: string
  departmentName: string
  departmentCode: string
  divisionCode: string
  locationCode: string[]
  organizationCode: string
  subsidiaryCode: string
  departmentDescription: string
  isActive: boolean
  createdAt: string
}

export default function DepartmentManagement() {
  const [departments, setDepartments] = useState<Department[]>([
    {
      id: "1",
      departmentName: "ggg",
      departmentCode: "ggg",
      divisionCode: "fff",
      locationCode: ["LOC001", "LOC002"],
      organizationCode: "aaa",
      subsidiaryCode: "bbb",
      departmentDescription: "ggg",
      isActive: true,
      createdAt: "2024-01-15",
    }
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [newDepartment, setNewDepartment] = useState<Partial<Department>>({
    departmentName: "",
    departmentCode: "",
    divisionCode: "",
    locationCode: [],
    organizationCode: "",
    subsidiaryCode: "",
    departmentDescription: "",
    isActive: true,
  })

  const filteredDepartments = departments.filter((department) => {
    const matchesSearch = Object.values(department).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    )
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && department.isActive) ||
      (filterStatus === "inactive" && !department.isActive)

    return matchesSearch && matchesStatus
  })

  const validateForm = (data: Partial<Department>) => {
    const newErrors: Record<string, string> = {}

    if (!data.departmentCode?.trim()) newErrors.departmentCode = "Department code is required"
    if (!data.departmentName?.trim()) newErrors.departmentName = "Department name is required"
    if (!data.subsidiaryCode?.trim()) newErrors.subsidiaryCode = "Subsidiary code is required"
    if (!data.organizationCode?.trim()) newErrors.organizationCode = "Organization code is required"
    if (!data.divisionCode?.trim()) newErrors.divisionCode = "Division code is required"
    if (!data.locationCode?.length) newErrors.locationCode = "At least one location code is required"

    // Check for duplicate code
    const isDuplicate = departments.some(
      (dept) => dept.departmentCode === data.departmentCode && dept.id !== editingDepartment?.id,
    )
    if (isDuplicate) newErrors.departmentCode = "Department code already exists"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddDepartment = async () => {
    if (!validateForm(newDepartment)) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const department: Department = {
      ...(newDepartment as Department),
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
    }

    setDepartments([...departments, department])
    resetForm()
    setIsLoading(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleEditDepartment = async () => {
    if (!editingDepartment || !validateForm(newDepartment)) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setDepartments(
      departments.map((dept) => (dept.id === editingDepartment.id ? { ...dept, ...newDepartment } as Department : dept)),
    )

    resetForm()
    setIsLoading(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleDeleteDepartment = async (id: string) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setDepartments(departments.filter((department) => department.id !== id))
    setIsLoading(false)
  }

  const handleToggleStatus = async (id: string) => {
    setDepartments(departments.map((dept) => (dept.id === id ? { ...dept, isActive: !dept.isActive } : dept)))
  }

  const resetForm = () => {
    setNewDepartment({
      departmentName: "",
      departmentCode: "",
      divisionCode: "",
      locationCode: [],
      organizationCode: "",
      subsidiaryCode: "",
      departmentDescription: "",
      isActive: true,
    })
    setEditingDepartment(null)
    setIsAddDialogOpen(false)
    setErrors({})
  }

  const startEdit = (department: Department) => {
    setEditingDepartment(department)
    setNewDepartment(department)
    setIsAddDialogOpen(true)
  }

  const activeDepartments = departments.filter((dept) => dept.isActive).length
  const inactiveDepartments = departments.length - activeDepartments

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Success Alert */}
        {showSuccess && (
          <Alert className="border-green-200 bg-green-50 text-green-800 animate-in slide-in-from-top-2 duration-300">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>Department {editingDepartment ? "updated" : "added"} successfully!</AlertDescription>
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
              Department Management
            </h1>
            <p className="text-gray-600 mt-1 text-lg">Manage your organization departments efficiently</p>
          </div>
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
                  setEditingDepartment(null)
                  resetForm()
                }}
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Department
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl">
                  <Building2 className="h-6 w-6 text-blue-600" />
                  {editingDepartment ? "Edit Department" : "Add New Department"}
                </DialogTitle>
                <DialogDescription>
                  {editingDepartment
                    ? "Update the department details below."
                    : "Enter the details for the new department below."}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="departmentCode" className="text-sm font-medium">
                        Department Code *
                      </Label>
                      <Input
                        id="departmentCode"
                        placeholder="DEP001"
                        value={newDepartment.departmentCode}
                        onChange={(e) => setNewDepartment({ ...newDepartment, departmentCode: e.target.value.toUpperCase() })}
                        className={errors.departmentCode ? "border-red-300 focus:border-red-500" : ""}
                      />
                      {errors.departmentCode && <p className="text-sm text-red-600">{errors.departmentCode}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="departmentName" className="text-sm font-medium">
                        Department Name *
                      </Label>
                      <Input
                        id="departmentName"
                        placeholder="Human Resources"
                        value={newDepartment.departmentName}
                        onChange={(e) => setNewDepartment({ ...newDepartment, departmentName: e.target.value })}
                        className={errors.departmentName ? "border-red-300 focus:border-red-500" : ""}
                      />
                      {errors.departmentName && <p className="text-sm text-red-600">{errors.departmentName}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="subsidiaryCode" className="text-sm font-medium">
                        Subsidiary Code *
                      </Label>
                      <Input
                        id="subsidiaryCode"
                        placeholder="SUB001"
                        value={newDepartment.subsidiaryCode}
                        onChange={(e) => setNewDepartment({ ...newDepartment, subsidiaryCode: e.target.value.toUpperCase() })}
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
                        value={newDepartment.organizationCode}
                        onChange={(e) => setNewDepartment({ ...newDepartment, organizationCode: e.target.value.toUpperCase() })}
                        className={errors.organizationCode ? "border-red-300 focus:border-red-500" : ""}
                      />
                      {errors.organizationCode && <p className="text-sm text-red-600">{errors.organizationCode}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="divisionCode" className="text-sm font-medium">
                      Division Code *
                    </Label>
                    <Input
                      id="divisionCode"
                      placeholder="DIV001"
                      value={newDepartment.divisionCode}
                      onChange={(e) => setNewDepartment({ ...newDepartment, divisionCode: e.target.value.toUpperCase() })}
                      className={errors.divisionCode ? "border-red-300 focus:border-red-500" : ""}
                    />
                    {errors.divisionCode && <p className="text-sm text-red-600">{errors.divisionCode}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="departmentDescription" className="text-sm font-medium">
                      Description
                    </Label>
                    <Textarea
                      id="departmentDescription"
                      placeholder="Enter department description..."
                      value={newDepartment.departmentDescription}
                      onChange={(e) => setNewDepartment({ ...newDepartment, departmentDescription: e.target.value })}
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
                      value={newDepartment.locationCode?.[0] || ""}
                      onValueChange={(value) =>
                        setNewDepartment({ ...newDepartment, locationCode: [value, ...(newDepartment.locationCode || []).slice(1)] })
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
                    <p className="text-sm text-gray-600">Enable or disable this department</p>
                  </div>
                  <Switch
                    checked={newDepartment.isActive}
                    onCheckedChange={(checked) => setNewDepartment({ ...newDepartment, isActive: checked })}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={resetForm} disabled={isLoading}>
                  Cancel
                </Button>
                <Button
                  onClick={editingDepartment ? handleEditDepartment : handleAddDepartment}
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      {editingDepartment ? "Updating..." : "Adding..."}
                    </div>
                  ) : editingDepartment ? (
                    "Update Department"
                  ) : (
                    "Add Department"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Departments</p>
                  <p className="text-3xl font-bold">{departments.length}</p>
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
                  <p className="text-3xl font-bold">{activeDepartments}</p>
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
                  <p className="text-3xl font-bold">{inactiveDepartments}</p>
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
                  placeholder="Search departments by name, code..."
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

        {/* Departments Table */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold text-gray-900">
                Departments ({filteredDepartments.length})
              </CardTitle>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Showing {filteredDepartments.length} of {departments.length}
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
                  {filteredDepartments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="h-32 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <Building2 className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-lg font-medium text-gray-900 mb-1">No departments found</p>
                          <p className="text-gray-500">
                            {searchTerm || filterStatus !== "all"
                              ? "Try adjusting your search criteria or filters"
                              : "Get started by adding your first department"}
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredDepartments.map((department) => (
                      <TableRow key={department.id} className="hover:bg-gray-50/50 transition-all duration-200 group">
                        <TableCell className="font-mono text-blue-600 font-medium">{department.departmentCode}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900">{department.departmentName}</p>
                            <p className="text-sm text-gray-500">Created {department.createdAt}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                            {department.divisionCode}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                            {department.subsidiaryCode}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {department.organizationCode}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {department.locationCode.map((code) => (
                              <Badge key={code} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                {code}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <p className="text-sm text-gray-600 truncate">{department.departmentDescription}</p>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Switch checked={department.isActive} onCheckedChange={() => handleToggleStatus(department.id)} />
                            <Badge
                              variant={department.isActive ? "default" : "secondary"}
                              className={department.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}
                            >
                              {department.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                              onClick={() => startEdit(department)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                              onClick={() => handleDeleteDepartment(department.id)}
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
