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

interface Grade {
  id: string
  gradeCode: string
  gradeName: string
  gradeDescription: string
  designationCode: string
  locationCode: string[]
  organizationCode: string
  subsidiaryCode: string
  divisionCode: string
  isActive: boolean
  createdAt: string
}

export default function GradeManagement() {
  const [grades, setGrades] = useState<Grade[]>([
    {
      id: "1",
      gradeCode: "ddd",
      gradeName: "ddd",
      gradeDescription: "ddd",
      designationCode: "ccc",
      locationCode: ["LOC001", "LOC002"],
      organizationCode: "aaa",
      subsidiaryCode: "bbb",
      divisionCode: "fff",
      isActive: true,
      createdAt: "2024-01-15",
    }
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingGrade, setEditingGrade] = useState<Grade | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [newGrade, setNewGrade] = useState<Partial<Grade>>({
    gradeCode: "",
    gradeName: "",
    gradeDescription: "",
    designationCode: "",
    locationCode: [],
    organizationCode: "",
    subsidiaryCode: "",
    divisionCode: "",
    isActive: true,
  })

  const filteredGrades = grades.filter((grade) => {
    const matchesSearch = Object.values(grade).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    )
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && grade.isActive) ||
      (filterStatus === "inactive" && !grade.isActive)

    return matchesSearch && matchesStatus
  })

  const validateForm = (data: Partial<Grade>) => {
    const newErrors: Record<string, string> = {}

    if (!data.gradeCode?.trim()) newErrors.gradeCode = "Grade code is required"
    if (!data.gradeName?.trim()) newErrors.gradeName = "Grade name is required"
    if (!data.designationCode?.trim()) newErrors.designationCode = "Designation code is required"
    if (!data.subsidiaryCode?.trim()) newErrors.subsidiaryCode = "Subsidiary code is required"
    if (!data.organizationCode?.trim()) newErrors.organizationCode = "Organization code is required"
    if (!data.divisionCode?.trim()) newErrors.divisionCode = "Division code is required"
    if (!data.locationCode?.length) newErrors.locationCode = "At least one location code is required"

    // Check for duplicate code
    const isDuplicate = grades.some(
      (grade) => grade.gradeCode === data.gradeCode && grade.id !== editingGrade?.id,
    )
    if (isDuplicate) newErrors.gradeCode = "Grade code already exists"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddGrade = async () => {
    if (!validateForm(newGrade)) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const grade: Grade = {
      ...(newGrade as Grade),
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
    }

    setGrades([...grades, grade])
    resetForm()
    setIsLoading(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleEditGrade = async () => {
    if (!editingGrade || !validateForm(newGrade)) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setGrades(
      grades.map((grade) => (grade.id === editingGrade.id ? { ...grade, ...newGrade } as Grade : grade)),
    )

    resetForm()
    setIsLoading(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleDeleteGrade = async (id: string) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setGrades(grades.filter((grade) => grade.id !== id))
    setIsLoading(false)
  }

  const handleToggleStatus = async (id: string) => {
    setGrades(grades.map((grade) => (grade.id === id ? { ...grade, isActive: !grade.isActive } : grade)))
  }

  const resetForm = () => {
    setNewGrade({
      gradeCode: "",
      gradeName: "",
      gradeDescription: "",
      designationCode: "",
      locationCode: [],
      organizationCode: "",
      subsidiaryCode: "",
      divisionCode: "",
      isActive: true,
    })
    setEditingGrade(null)
    setIsAddDialogOpen(false)
    setErrors({})
  }

  const startEdit = (grade: Grade) => {
    setEditingGrade(grade)
    setNewGrade(grade)
    setIsAddDialogOpen(true)
  }

  const activeGrades = grades.filter((grade) => grade.isActive).length
  const inactiveGrades = grades.length - activeGrades

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Success Alert */}
        {showSuccess && (
          <Alert className="border-green-200 bg-green-50 text-green-800 animate-in slide-in-from-top-2 duration-300">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>Grade {editingGrade ? "updated" : "added"} successfully!</AlertDescription>
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
              Grade Management
            </h1>
            <p className="text-gray-600 mt-1 text-lg">Manage your organization grades efficiently</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Grades</p>
                  <p className="text-3xl font-bold">{grades.length}</p>
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
                  <p className="text-3xl font-bold">{activeGrades}</p>
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
                  <p className="text-3xl font-bold">{inactiveGrades}</p>
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
                  setEditingGrade(null)
                  resetForm()
                }}
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Grade
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl">
                  <Building2 className="h-6 w-6 text-blue-600" />
                  {editingGrade ? "Edit Grade" : "Add New Grade"}
                </DialogTitle>
                <DialogDescription>
                  {editingGrade
                    ? "Update the grade details below."
                    : "Enter the details for the new grade below."}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="gradeCode" className="text-sm font-medium">
                        Grade Code *
                      </Label>
                      <Input
                        id="gradeCode"
                        placeholder="GRD001"
                        value={newGrade.gradeCode}
                        onChange={(e) => setNewGrade({ ...newGrade, gradeCode: e.target.value.toUpperCase() })}
                        className={errors.gradeCode ? "border-red-300 focus:border-red-500" : ""}
                      />
                      {errors.gradeCode && <p className="text-sm text-red-600">{errors.gradeCode}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gradeName" className="text-sm font-medium">
                        Grade Name *
                      </Label>
                      <Input
                        id="gradeName"
                        placeholder="Senior Grade"
                        value={newGrade.gradeName}
                        onChange={(e) => setNewGrade({ ...newGrade, gradeName: e.target.value })}
                        className={errors.gradeName ? "border-red-300 focus:border-red-500" : ""}
                      />
                      {errors.gradeName && <p className="text-sm text-red-600">{errors.gradeName}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="designationCode" className="text-sm font-medium">
                        Designation Code *
                      </Label>
                      <Input
                        id="designationCode"
                        placeholder="DES001"
                        value={newGrade.designationCode}
                        onChange={(e) => setNewGrade({ ...newGrade, designationCode: e.target.value.toUpperCase() })}
                        className={errors.designationCode ? "border-red-300 focus:border-red-500" : ""}
                      />
                      {errors.designationCode && <p className="text-sm text-red-600">{errors.designationCode}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="divisionCode" className="text-sm font-medium">
                        Division Code *
                      </Label>
                      <Input
                        id="divisionCode"
                        placeholder="DIV001"
                        value={newGrade.divisionCode}
                        onChange={(e) => setNewGrade({ ...newGrade, divisionCode: e.target.value.toUpperCase() })}
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
                        value={newGrade.subsidiaryCode}
                        onChange={(e) => setNewGrade({ ...newGrade, subsidiaryCode: e.target.value.toUpperCase() })}
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
                        value={newGrade.organizationCode}
                        onChange={(e) => setNewGrade({ ...newGrade, organizationCode: e.target.value.toUpperCase() })}
                        className={errors.organizationCode ? "border-red-300 focus:border-red-500" : ""}
                      />
                      {errors.organizationCode && <p className="text-sm text-red-600">{errors.organizationCode}</p>}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="gradeDescription" className="text-sm font-medium">
                      Description
                    </Label>
                    <Textarea
                      id="gradeDescription"
                      placeholder="Enter grade description..."
                      value={newGrade.gradeDescription}
                      onChange={(e) => setNewGrade({ ...newGrade, gradeDescription: e.target.value })}
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
                      value={newGrade.locationCode?.[0] || ""}
                      onValueChange={(value) =>
                        setNewGrade({ ...newGrade, locationCode: [value, ...(newGrade.locationCode || []).slice(1)] })
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
                    <p className="text-sm text-gray-600">Enable or disable this grade</p>
                  </div>
                  <Switch
                    checked={newGrade.isActive}
                    onCheckedChange={(checked) => setNewGrade({ ...newGrade, isActive: checked })}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button
                  onClick={editingGrade ? handleEditGrade : handleAddGrade}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </div>
                  ) : (
                    <>{editingGrade ? "Update Grade" : "Add Grade"}</>
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
                  placeholder="Search grades by name, code..."
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

        {/* Grades Table */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold text-gray-900">
                Grades ({filteredGrades.length})
              </CardTitle>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Showing {filteredGrades.length} of {grades.length}
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
                    <TableHead className="font-semibold text-gray-700">Designation</TableHead>
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
                  {filteredGrades.map((grade) => (
                    <TableRow key={grade.id} className="hover:bg-gray-50/50 transition-all duration-200 group">
                      <TableCell className="font-mono text-blue-600 font-medium">{grade.gradeCode}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-900">{grade.gradeName}</p>
                          <p className="text-sm text-gray-500">Created {grade.createdAt}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {grade.designationCode}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                          {grade.divisionCode}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                          {grade.subsidiaryCode}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {grade.organizationCode}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1 flex-wrap">
                          {grade.locationCode.map((loc) => (
                            <Badge key={loc} variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                              {loc}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[200px]">
                        <p className="text-sm text-gray-600 truncate">{grade.gradeDescription}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={grade.isActive}
                            onCheckedChange={() => handleToggleStatus(grade.id)}
                            className="data-[state=checked]:bg-green-500"
                          />
                          <span className={`text-sm ${grade.isActive ? "text-green-600" : "text-gray-600"}`}>
                            {grade.isActive ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                            onClick={() => startEdit(grade)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                            onClick={() => handleDeleteGrade(grade.id)}
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