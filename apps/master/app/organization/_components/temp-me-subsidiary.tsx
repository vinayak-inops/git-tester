"use client"

import { useState, useEffect } from "react"
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

interface Subsidiary {
  id: string
  subsidiaryName: string
  subsidiaryCode: string
  subsidiaryDescription: string
  locationCode: string[]
  organizationCode: string
  isActive: boolean
  createdAt: string
}

export default function SubsidiaryManagement() {
  const [subsidiaries, setSubsidiaries] = useState<Subsidiary[]>([
    {
      id: "1",
      subsidiaryName: "Subsidiary-1",
      subsidiaryCode: "bbb",
      subsidiaryDescription: "Description of Subsidiary-1",
      locationCode: ["LOC001", "LOC002"],
      organizationCode: "aaa",
      isActive: true,
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      subsidiaryName: "Subsidiary-2",
      subsidiaryCode: "bbba",
      subsidiaryDescription: "Description of Subsidiary-2",
      locationCode: ["LOC004"],
      organizationCode: "aaa",
      isActive: true,
      createdAt: "2024-02-10",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingSubsidiary, setEditingSubsidiary] = useState<Subsidiary | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [newSubsidiary, setNewSubsidiary] = useState<Partial<Subsidiary>>({
    subsidiaryName: "",
    subsidiaryCode: "",
    subsidiaryDescription: "",
    locationCode: [],
    organizationCode: "",
    isActive: true,
  })

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredSubsidiaries = subsidiaries.filter((subsidiary) => {
    const matchesSearch = Object.values(subsidiary).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    )
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && subsidiary.isActive) ||
      (filterStatus === "inactive" && !subsidiary.isActive)

    return matchesSearch && matchesStatus
  })

  // Calculate pagination
  const totalPages = Math.ceil(filteredSubsidiaries.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedSubsidiaries = filteredSubsidiaries.slice(startIndex, startIndex + itemsPerPage)

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, filterStatus])

  const validateForm = (data: Partial<Subsidiary>) => {
    const newErrors: Record<string, string> = {}

    if (!data.subsidiaryCode?.trim()) newErrors.subsidiaryCode = "Subsidiary code is required"
    if (!data.subsidiaryName?.trim()) newErrors.subsidiaryName = "Subsidiary name is required"
    if (!data.organizationCode?.trim()) newErrors.organizationCode = "Organization code is required"
    if (!data.locationCode?.length) newErrors.locationCode = "At least one location code is required"

    // Check for duplicate code
    const isDuplicate = subsidiaries.some(
      (sub) => sub.subsidiaryCode === data.subsidiaryCode && sub.id !== editingSubsidiary?.id,
    )
    if (isDuplicate) newErrors.subsidiaryCode = "Subsidiary code already exists"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddSubsidiary = async () => {
    if (!validateForm(newSubsidiary)) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const subsidiary: Subsidiary = {
      ...(newSubsidiary as Subsidiary),
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
    }

    setSubsidiaries([...subsidiaries, subsidiary])
    resetForm()
    setIsLoading(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleEditSubsidiary = async () => {
    if (!editingSubsidiary || !validateForm(newSubsidiary)) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setSubsidiaries(
      subsidiaries.map((sub) => (sub.id === editingSubsidiary.id ? { ...sub, ...newSubsidiary } as Subsidiary : sub)),
    )

    resetForm()
    setIsLoading(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleDeleteSubsidiary = async (id: string) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setSubsidiaries(subsidiaries.filter((subsidiary) => subsidiary.id !== id))
    setIsLoading(false)
  }

  const handleToggleStatus = async (id: string) => {
    setSubsidiaries(subsidiaries.map((sub) => (sub.id === id ? { ...sub, isActive: !sub.isActive } : sub)))
  }

  const resetForm = () => {
    setNewSubsidiary({
      subsidiaryName: "",
      subsidiaryCode: "",
      subsidiaryDescription: "",
      locationCode: [],
      organizationCode: "",
      isActive: true,
    })
    setEditingSubsidiary(null)
    setIsAddDialogOpen(false)
    setErrors({})
  }

  const startEdit = (subsidiary: Subsidiary) => {
    setEditingSubsidiary(subsidiary)
    setNewSubsidiary(subsidiary)
    setIsAddDialogOpen(true)
  }

  const activeSubsidiaries = subsidiaries.filter((sub) => sub.isActive).length
  const inactiveSubsidiaries = subsidiaries.length - activeSubsidiaries

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Success Alert */}
        {showSuccess && (
          <Alert className="border-green-200 bg-green-50 text-green-800 animate-in slide-in-from-top-2 duration-300">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>Subsidiary {editingSubsidiary ? "updated" : "added"} successfully!</AlertDescription>
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
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Subsidiary Management
                </h1>
                <p className="text-gray-600 mt-1 text-lg">Manage your organization subsidiaries efficiently</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
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
                      setEditingSubsidiary(null)
                      resetForm()
                    }}
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Add Subsidiary
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                      <Building2 className="h-6 w-6 text-blue-600" />
                      {editingSubsidiary ? "Edit Subsidiary" : "Add New Subsidiary"}
                    </DialogTitle>
                    <DialogDescription>
                      {editingSubsidiary
                        ? "Update the subsidiary details below."
                        : "Enter the details for the new subsidiary below."}
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-6">
                    {/* Basic Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="subsidiaryCode" className="text-sm font-medium">
                            Subsidiary Code *
                          </Label>
                          <Input
                            id="subsidiaryCode"
                            placeholder="SUB001"
                            value={newSubsidiary.subsidiaryCode}
                            onChange={(e) => setNewSubsidiary({ ...newSubsidiary, subsidiaryCode: e.target.value.toUpperCase() })}
                            className={errors.subsidiaryCode ? "border-red-300 focus:border-red-500" : ""}
                          />
                          {errors.subsidiaryCode && <p className="text-sm text-red-600">{errors.subsidiaryCode}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subsidiaryName" className="text-sm font-medium">
                            Subsidiary Name *
                          </Label>
                          <Input
                            id="subsidiaryName"
                            placeholder="Main Branch"
                            value={newSubsidiary.subsidiaryName}
                            onChange={(e) => setNewSubsidiary({ ...newSubsidiary, subsidiaryName: e.target.value })}
                            className={errors.subsidiaryName ? "border-red-300 focus:border-red-500" : ""}
                          />
                          {errors.subsidiaryName && <p className="text-sm text-red-600">{errors.subsidiaryName}</p>}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="organizationCode" className="text-sm font-medium">
                          Organization Code *
                        </Label>
                        <Input
                          id="organizationCode"
                          placeholder="ORG001"
                          value={newSubsidiary.organizationCode}
                          onChange={(e) => setNewSubsidiary({ ...newSubsidiary, organizationCode: e.target.value.toUpperCase() })}
                          className={errors.organizationCode ? "border-red-300 focus:border-red-500" : ""}
                        />
                        {errors.organizationCode && <p className="text-sm text-red-600">{errors.organizationCode}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subsidiaryDescription" className="text-sm font-medium">
                          Description
                        </Label>
                        <Textarea
                          id="subsidiaryDescription"
                          placeholder="Enter subsidiary description..."
                          value={newSubsidiary.subsidiaryDescription}
                          onChange={(e) => setNewSubsidiary({ ...newSubsidiary, subsidiaryDescription: e.target.value })}
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
                          value={newSubsidiary.locationCode?.[0] || ""}
                          onValueChange={(value) =>
                            setNewSubsidiary({ ...newSubsidiary, locationCode: [value, ...(newSubsidiary.locationCode || []).slice(1)] })
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
                        <p className="text-sm text-gray-600">Enable or disable this subsidiary</p>
                      </div>
                      <Switch
                        checked={newSubsidiary.isActive}
                        onCheckedChange={(checked) => setNewSubsidiary({ ...newSubsidiary, isActive: checked })}
                      />
                    </div>
                  </div>

                  <DialogFooter className="gap-2 mt-6">
                    <Button variant="outline" onClick={resetForm} disabled={isLoading}>
                      Cancel
                    </Button>
                    <Button
                      onClick={editingSubsidiary ? handleEditSubsidiary : handleAddSubsidiary}
                      disabled={isLoading}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          {editingSubsidiary ? "Updating..." : "Adding..."}
                        </div>
                      ) : editingSubsidiary ? (
                        "Update Subsidiary"
                      ) : (
                        "Add Subsidiary"
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Subsidiaries</p>
                  <p className="text-3xl font-bold">{subsidiaries.length}</p>
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
                  <p className="text-3xl font-bold">{activeSubsidiaries}</p>
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
                  <p className="text-3xl font-bold">{inactiveSubsidiaries}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search subsidiaries by name, code..."
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

        {/* Subsidiaries Table */}
        <Card className="shadow-lg border-0">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold text-gray-900">
                Subsidiaries ({filteredSubsidiaries.length})
              </CardTitle>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Page {currentPage} of {totalPages}
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
                    <TableHead className="font-semibold text-gray-700">Organization</TableHead>
                    <TableHead className="font-semibold text-gray-700">Locations</TableHead>
                    <TableHead className="font-semibold text-gray-700">Description</TableHead>
                    <TableHead className="font-semibold text-gray-700">Status</TableHead>
                    <TableHead className="font-semibold text-gray-700 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedSubsidiaries.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-32 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <Building2 className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-lg font-medium text-gray-900 mb-1">No subsidiaries found</p>
                          <p className="text-gray-500">
                            {searchTerm || filterStatus !== "all"
                              ? "Try adjusting your search criteria or filters"
                              : "Get started by adding your first subsidiary"}
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedSubsidiaries.map((subsidiary) => (
                      <TableRow key={subsidiary.id} className="hover:bg-gray-50/50 transition-all duration-200 group">
                        <TableCell className="font-mono text-blue-600 font-medium">{subsidiary.subsidiaryCode}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900">{subsidiary.subsidiaryName}</p>
                            <p className="text-sm text-gray-500">Created {subsidiary.createdAt}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                            {subsidiary.organizationCode}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {subsidiary.locationCode.map((code) => (
                              <Badge key={code} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                {code}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <p className="text-sm text-gray-600 truncate">{subsidiary.subsidiaryDescription}</p>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Switch checked={subsidiary.isActive} onCheckedChange={() => handleToggleStatus(subsidiary.id)} />
                            <Badge
                              variant={subsidiary.isActive ? "default" : "secondary"}
                              className={subsidiary.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}
                            >
                              {subsidiary.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                              onClick={() => startEdit(subsidiary)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                              onClick={() => handleDeleteSubsidiary(subsidiary.id)}
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
            {/* Pagination Controls */}
            <div className="flex items-center justify-between p-4 border-t">
              <div className="text-sm text-gray-600">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredSubsidiaries.length)} of{" "}
                {filteredSubsidiaries.length} entries
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                >
                  First
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className="w-8 h-8 p-0"
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                >
                  Last
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}