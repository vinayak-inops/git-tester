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

interface Division {
  id: string
  divisionName: string
  divisionCode: string
  subsidiaryCode: string
  divisionDescription: string
  locationCode: string[]
  organizationCode: string
  isActive: boolean
  createdAt: string
}

export default function DivisionManagement() {
  const [divisions, setDivisions] = useState<Division[]>([
    {
      id: "1",
      divisionName: "Division-1",
      divisionCode: "fff",
      subsidiaryCode: "bbb",
      divisionDescription: "fff",
      locationCode: ["LOC001", "LOC002"],
      organizationCode: "aaa",
      isActive: true,
      createdAt: "2024-01-15",
    }
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingDivision, setEditingDivision] = useState<Division | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [newDivision, setNewDivision] = useState<Partial<Division>>({
    divisionName: "",
    divisionCode: "",
    subsidiaryCode: "",
    divisionDescription: "",
    locationCode: [],
    organizationCode: "",
    isActive: true,
  })

  const filteredDivisions = divisions.filter((division) => {
    const matchesSearch = Object.values(division).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    )
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && division.isActive) ||
      (filterStatus === "inactive" && !division.isActive)

    return matchesSearch && matchesStatus
  })

  const validateForm = (data: Partial<Division>) => {
    const newErrors: Record<string, string> = {}

    if (!data.divisionCode?.trim()) newErrors.divisionCode = "Division code is required"
    if (!data.divisionName?.trim()) newErrors.divisionName = "Division name is required"
    if (!data.subsidiaryCode?.trim()) newErrors.subsidiaryCode = "Subsidiary code is required"
    if (!data.organizationCode?.trim()) newErrors.organizationCode = "Organization code is required"
    if (!data.locationCode?.length) newErrors.locationCode = "At least one location code is required"

    // Check for duplicate code
    const isDuplicate = divisions.some(
      (div) => div.divisionCode === data.divisionCode && div.id !== editingDivision?.id,
    )
    if (isDuplicate) newErrors.divisionCode = "Division code already exists"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddDivision = async () => {
    if (!validateForm(newDivision)) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const division: Division = {
      ...(newDivision as Division),
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
    }

    setDivisions([...divisions, division])
    resetForm()
    setIsLoading(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleEditDivision = async () => {
    if (!editingDivision || !validateForm(newDivision)) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setDivisions(
      divisions.map((div) => (div.id === editingDivision.id ? { ...div, ...newDivision } as Division : div)),
    )

    resetForm()
    setIsLoading(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleDeleteDivision = async (id: string) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setDivisions(divisions.filter((division) => division.id !== id))
    setIsLoading(false)
  }

  const handleToggleStatus = async (id: string) => {
    setDivisions(divisions.map((div) => (div.id === id ? { ...div, isActive: !div.isActive } : div)))
  }

  const resetForm = () => {
    setNewDivision({
      divisionName: "",
      divisionCode: "",
      subsidiaryCode: "",
      divisionDescription: "",
      locationCode: [],
      organizationCode: "",
      isActive: true,
    })
    setEditingDivision(null)
    setIsAddDialogOpen(false)
    setErrors({})
  }

  const startEdit = (division: Division) => {
    setEditingDivision(division)
    setNewDivision(division)
    setIsAddDialogOpen(true)
  }

  const activeDivisions = divisions.filter((div) => div.isActive).length
  const inactiveDivisions = divisions.length - activeDivisions

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Success Alert */}
        {showSuccess && (
          <Alert className="border-green-200 bg-green-50 text-green-800 animate-in slide-in-from-top-2 duration-300">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>Division {editingDivision ? "updated" : "added"} successfully!</AlertDescription>
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
              Division Management
            </h1>
            <p className="text-gray-600 mt-1 text-lg">Manage your organization divisions efficiently</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-4">
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
                  setEditingDivision(null)
                  resetForm()
                }}
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Division
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl">
                  <Building2 className="h-6 w-6 text-blue-600" />
                  {editingDivision ? "Edit Division" : "Add New Division"}
                </DialogTitle>
                <DialogDescription>
                  {editingDivision
                    ? "Update the division details below."
                    : "Enter the details for the new division below."}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="divisionCode" className="text-sm font-medium">
                        Division Code *
                      </Label>
                      <Input
                        id="divisionCode"
                        placeholder="DIV001"
                        value={newDivision.divisionCode}
                        onChange={(e) => setNewDivision({ ...newDivision, divisionCode: e.target.value.toUpperCase() })}
                        className={errors.divisionCode ? "border-red-300 focus:border-red-500" : ""}
                      />
                      {errors.divisionCode && <p className="text-sm text-red-600">{errors.divisionCode}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="divisionName" className="text-sm font-medium">
                        Division Name *
                      </Label>
                      <Input
                        id="divisionName"
                        placeholder="Main Division"
                        value={newDivision.divisionName}
                        onChange={(e) => setNewDivision({ ...newDivision, divisionName: e.target.value })}
                        className={errors.divisionName ? "border-red-300 focus:border-red-500" : ""}
                      />
                      {errors.divisionName && <p className="text-sm text-red-600">{errors.divisionName}</p>}
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
                        value={newDivision.subsidiaryCode}
                        onChange={(e) => setNewDivision({ ...newDivision, subsidiaryCode: e.target.value.toUpperCase() })}
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
                        value={newDivision.organizationCode}
                        onChange={(e) => setNewDivision({ ...newDivision, organizationCode: e.target.value.toUpperCase() })}
                        className={errors.organizationCode ? "border-red-300 focus:border-red-500" : ""}
                      />
                      {errors.organizationCode && <p className="text-sm text-red-600">{errors.organizationCode}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="divisionDescription" className="text-sm font-medium">
                      Description
                    </Label>
                    <Textarea
                      id="divisionDescription"
                      placeholder="Enter division description..."
                      value={newDivision.divisionDescription}
                      onChange={(e) => setNewDivision({ ...newDivision, divisionDescription: e.target.value })}
                      rows={3}
                    />
                  </div>
                </div>

                <Separator />

                {/* Location Codes */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Location Codes</h3>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Associated Locations *</Label>
                    <Select
                      value={newDivision.locationCode?.[0] || ""}
                      onValueChange={(value) =>
                        setNewDivision({ ...newDivision, locationCode: [value, ...(newDivision.locationCode || []).slice(1)] })
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
                    <p className="text-sm text-gray-600">Enable or disable this division</p>
                  </div>
                  <Switch
                    checked={newDivision.isActive}
                    onCheckedChange={(checked) => setNewDivision({ ...newDivision, isActive: checked })}
                  />
                </div>
              </div>

              <DialogFooter className="gap-2 mt-6">
                <Button variant="outline" onClick={resetForm} disabled={isLoading}>
                  Cancel
                </Button>
                <Button
                  onClick={editingDivision ? handleEditDivision : handleAddDivision}
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      {editingDivision ? "Updating..." : "Adding..."}
                    </div>
                  ) : editingDivision ? (
                    "Update Division"
                  ) : (
                    "Add Division"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Divisions</p>
                  <p className="text-3xl font-bold">{divisions.length}</p>
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
                  <p className="text-3xl font-bold">{activeDivisions}</p>
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
                  <p className="text-3xl font-bold">{inactiveDivisions}</p>
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
                  placeholder="Search divisions by name, code..."
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

        {/* Divisions Table */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold text-gray-900">
                Divisions ({filteredDivisions.length})
              </CardTitle>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Showing {filteredDivisions.length} of {divisions.length}
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
                    <TableHead className="font-semibold text-gray-700">Subsidiary</TableHead>
                    <TableHead className="font-semibold text-gray-700">Organization</TableHead>
                    <TableHead className="font-semibold text-gray-700">Locations</TableHead>
                    <TableHead className="font-semibold text-gray-700">Description</TableHead>
                    <TableHead className="font-semibold text-gray-700">Status</TableHead>
                    <TableHead className="font-semibold text-gray-700 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDivisions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="h-32 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <Building2 className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-lg font-medium text-gray-900 mb-1">No divisions found</p>
                          <p className="text-gray-500">
                            {searchTerm || filterStatus !== "all"
                              ? "Try adjusting your search criteria or filters"
                              : "Get started by adding your first division"}
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredDivisions.map((division) => (
                      <TableRow key={division.id} className="hover:bg-gray-50/50 transition-all duration-200 group">
                        <TableCell className="font-mono text-blue-600 font-medium">{division.divisionCode}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900">{division.divisionName}</p>
                            <p className="text-sm text-gray-500">Created {division.createdAt}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                            {division.subsidiaryCode}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                            {division.organizationCode}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {division.locationCode.map((code) => (
                              <Badge key={code} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                {code}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <p className="text-sm text-gray-600 truncate">{division.divisionDescription}</p>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Switch checked={division.isActive} onCheckedChange={() => handleToggleStatus(division.id)} />
                            <Badge
                              variant={division.isActive ? "default" : "secondary"}
                              className={division.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}
                            >
                              {division.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                              onClick={() => startEdit(division)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                              onClick={() => handleDeleteDivision(division.id)}
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
