"use client"

import { useState } from "react"
import {
  Search,
  Plus,
  Edit,
  Trash2,
  UserCircle2,
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

interface Designation {
  id: string
  designationName: string
  designationCode: string
  subsidiaryCode: string
  designationDescription: string
  locationCode: string[]
  organizationCode: string
  divisionCode: string
  isActive: boolean
  createdAt: string
}

export default function DesignationManagement() {
  const [designations, setDesignations] = useState<Designation[]>([
    {
      id: "1",
      designationName: "Designation-1",
      designationCode: "ccc",
      subsidiaryCode: "bbb",
      designationDescription: "ccc",
      locationCode: ["LOC001", "LOC002"],
      organizationCode: "aaa",
      divisionCode: "fff",
      isActive: true,
      createdAt: "2024-01-15",
    }
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingDesignation, setEditingDesignation] = useState<Designation | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [newDesignation, setNewDesignation] = useState<Partial<Designation>>({
    designationName: "",
    designationCode: "",
    subsidiaryCode: "",
    designationDescription: "",
    locationCode: [],
    organizationCode: "",
    divisionCode: "",
    isActive: true,
  })

  const filteredDesignations = designations.filter((designation) => {
    const matchesSearch = Object.values(designation).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    )
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && designation.isActive) ||
      (filterStatus === "inactive" && !designation.isActive)

    return matchesSearch && matchesStatus
  })

  const validateForm = (data: Partial<Designation>) => {
    const newErrors: Record<string, string> = {}

    if (!data.designationCode?.trim()) newErrors.designationCode = "Designation code is required"
    if (!data.designationName?.trim()) newErrors.designationName = "Designation name is required"
    if (!data.subsidiaryCode?.trim()) newErrors.subsidiaryCode = "Subsidiary code is required"
    if (!data.organizationCode?.trim()) newErrors.organizationCode = "Organization code is required"
    if (!data.divisionCode?.trim()) newErrors.divisionCode = "Division code is required"
    if (!data.locationCode?.length) newErrors.locationCode = "At least one location code is required"

    // Check for duplicate code
    const isDuplicate = designations.some(
      (des) => des.designationCode === data.designationCode && des.id !== editingDesignation?.id,
    )
    if (isDuplicate) newErrors.designationCode = "Designation code already exists"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddDesignation = async () => {
    if (!validateForm(newDesignation)) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const designation: Designation = {
      ...(newDesignation as Designation),
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
    }

    setDesignations([...designations, designation])
    resetForm()
    setIsLoading(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleEditDesignation = async () => {
    if (!editingDesignation || !validateForm(newDesignation)) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setDesignations(
      designations.map((des) => (des.id === editingDesignation.id ? { ...des, ...newDesignation } as Designation : des)),
    )

    resetForm()
    setIsLoading(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleDeleteDesignation = async (id: string) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setDesignations(designations.filter((designation) => designation.id !== id))
    setIsLoading(false)
  }

  const handleToggleStatus = async (id: string) => {
    setDesignations(designations.map((des) => (des.id === id ? { ...des, isActive: !des.isActive } : des)))
  }

  const resetForm = () => {
    setNewDesignation({
      designationName: "",
      designationCode: "",
      subsidiaryCode: "",
      designationDescription: "",
      locationCode: [],
      organizationCode: "",
      divisionCode: "",
      isActive: true,
    })
    setEditingDesignation(null)
    setIsAddDialogOpen(false)
    setErrors({})
  }

  const startEdit = (designation: Designation) => {
    setEditingDesignation(designation)
    setNewDesignation(designation)
    setIsAddDialogOpen(true)
  }

  const activeDesignations = designations.filter((des) => des.isActive).length
  const inactiveDesignations = designations.length - activeDesignations

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Success Alert */}
        {showSuccess && (
          <Alert className="border-green-200 bg-green-50 text-green-800 animate-in slide-in-from-top-2 duration-300">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>Designation {editingDesignation ? "updated" : "added"} successfully!</AlertDescription>
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
            <UserCircle2 className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Designation Management
            </h1>
            <p className="text-gray-600 mt-1 text-lg">Manage your organization designations efficiently</p>
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
                  setEditingDesignation(null)
                  resetForm()
                }}
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Designation
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl">
                  <UserCircle2 className="h-6 w-6 text-blue-600" />
                  {editingDesignation ? "Edit Designation" : "Add New Designation"}
                </DialogTitle>
                <DialogDescription>
                  {editingDesignation
                    ? "Update the designation details below."
                    : "Enter the details for the new designation below."}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="designationCode" className="text-sm font-medium">
                        Designation Code *
                      </Label>
                      <Input
                        id="designationCode"
                        placeholder="DES001"
                        value={newDesignation.designationCode}
                        onChange={(e) => setNewDesignation({ ...newDesignation, designationCode: e.target.value.toUpperCase() })}
                        className={errors.designationCode ? "border-red-300 focus:border-red-500" : ""}
                      />
                      {errors.designationCode && <p className="text-sm text-red-600">{errors.designationCode}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="designationName" className="text-sm font-medium">
                        Designation Name *
                      </Label>
                      <Input
                        id="designationName"
                        placeholder="Senior Developer"
                        value={newDesignation.designationName}
                        onChange={(e) => setNewDesignation({ ...newDesignation, designationName: e.target.value })}
                        className={errors.designationName ? "border-red-300 focus:border-red-500" : ""}
                      />
                      {errors.designationName && <p className="text-sm text-red-600">{errors.designationName}</p>}
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
                        value={newDesignation.subsidiaryCode}
                        onChange={(e) => setNewDesignation({ ...newDesignation, subsidiaryCode: e.target.value.toUpperCase() })}
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
                        value={newDesignation.organizationCode}
                        onChange={(e) => setNewDesignation({ ...newDesignation, organizationCode: e.target.value.toUpperCase() })}
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
                      value={newDesignation.divisionCode}
                      onChange={(e) => setNewDesignation({ ...newDesignation, divisionCode: e.target.value.toUpperCase() })}
                      className={errors.divisionCode ? "border-red-300 focus:border-red-500" : ""}
                    />
                    {errors.divisionCode && <p className="text-sm text-red-600">{errors.divisionCode}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="designationDescription" className="text-sm font-medium">
                      Description
                    </Label>
                    <Textarea
                      id="designationDescription"
                      placeholder="Enter designation description..."
                      value={newDesignation.designationDescription}
                      onChange={(e) => setNewDesignation({ ...newDesignation, designationDescription: e.target.value })}
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
                      value={newDesignation.locationCode?.[0] || ""}
                      onValueChange={(value) =>
                        setNewDesignation({ ...newDesignation, locationCode: [value, ...(newDesignation.locationCode || []).slice(1)] })
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
                    <p className="text-sm text-gray-600">Enable or disable this designation</p>
                  </div>
                  <Switch
                    checked={newDesignation.isActive}
                    onCheckedChange={(checked) => setNewDesignation({ ...newDesignation, isActive: checked })}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={resetForm} disabled={isLoading}>
                  Cancel
                </Button>
                <Button
                  onClick={editingDesignation ? handleEditDesignation : handleAddDesignation}
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      {editingDesignation ? "Updating..." : "Adding..."}
                    </div>
                  ) : editingDesignation ? (
                    "Update Designation"
                  ) : (
                    "Add Designation"
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
                  <p className="text-blue-100 text-sm font-medium">Total Designations</p>
                  <p className="text-3xl font-bold">{designations.length}</p>
                </div>
                <UserCircle2 className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Active</p>
                  <p className="text-3xl font-bold">{activeDesignations}</p>
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
                  <p className="text-3xl font-bold">{inactiveDesignations}</p>
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
                  placeholder="Search designations by name, code..."
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

        {/* Designations Table */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold text-gray-900">
                Designations ({filteredDesignations.length})
              </CardTitle>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Showing {filteredDesignations.length} of {designations.length}
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
                  {filteredDesignations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="h-32 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <UserCircle2 className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-lg font-medium text-gray-900 mb-1">No designations found</p>
                          <p className="text-gray-500">
                            {searchTerm || filterStatus !== "all"
                              ? "Try adjusting your search criteria or filters"
                              : "Get started by adding your first designation"}
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredDesignations.map((designation) => (
                      <TableRow key={designation.id} className="hover:bg-gray-50/50 transition-all duration-200 group">
                        <TableCell className="font-mono text-blue-600 font-medium">{designation.designationCode}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900">{designation.designationName}</p>
                            <p className="text-sm text-gray-500">Created {designation.createdAt}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                            {designation.divisionCode}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                            {designation.subsidiaryCode}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {designation.organizationCode}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {designation.locationCode.map((code) => (
                              <Badge key={code} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                {code}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <p className="text-sm text-gray-600 truncate">{designation.designationDescription}</p>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Switch checked={designation.isActive} onCheckedChange={() => handleToggleStatus(designation.id)} />
                            <Badge
                              variant={designation.isActive ? "default" : "secondary"}
                              className={designation.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}
                            >
                              {designation.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                              onClick={() => startEdit(designation)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                              onClick={() => handleDeleteDesignation(designation.id)}
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
