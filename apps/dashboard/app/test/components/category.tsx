"use client"

import { useState } from "react"
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Users,
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
import { Switch } from "@repo/ui/components/ui/switch"
import { Alert, AlertDescription } from "@repo/ui/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectValue } from "@radix-ui/react-select"
import { SelectTrigger } from "@repo/ui/components/ui/select"

interface EmployeeCategory {
  id: string
  employeeCategoryCode: string
  employeeCategoryName: string
  employeeCategoryDescription: string
  isActive: boolean
  createdAt: string
}

export default function CategoryManagement() {
  const [categories, setCategories] = useState<EmployeeCategory[]>([
    {
      id: "1",
      employeeCategoryCode: "WKM",
      employeeCategoryName: "Workman",
      employeeCategoryDescription: "General labor category for skilled/unskilled workers",
      isActive: true,
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      employeeCategoryCode: "SUP",
      employeeCategoryName: "Supervisor",
      employeeCategoryDescription: "Oversees teams and daily operations",
      isActive: true,
      createdAt: "2024-01-15",
    },
    {
      id: "3",
      employeeCategoryCode: "CLRK",
      employeeCategoryName: "Clerk",
      employeeCategoryDescription: "Handles clerical and administrative work",
      isActive: true,
      createdAt: "2024-01-15",
    },
    {
      id: "4",
      employeeCategoryCode: "MGR",
      employeeCategoryName: "Manager",
      employeeCategoryDescription: "Manages departments or functional teams",
      isActive: true,
      createdAt: "2024-01-15",
    },
    {
      id: "5",
      employeeCategoryCode: "TECH",
      employeeCategoryName: "Technician",
      employeeCategoryDescription: "Performs technical and maintenance-related tasks",
      isActive: true,
      createdAt: "2024-01-15",
    },
    {
      id: "6",
      employeeCategoryCode: "CNTR",
      employeeCategoryName: "Contractor",
      employeeCategoryDescription: "On-site third-party staff on a contract basis",
      isActive: true,
      createdAt: "2024-01-15",
    }
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<EmployeeCategory | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [newCategory, setNewCategory] = useState<Partial<EmployeeCategory>>({
    employeeCategoryCode: "",
    employeeCategoryName: "",
    employeeCategoryDescription: "",
    isActive: true,
  })

  const filteredCategories = categories.filter((category) => {
    const matchesSearch = Object.values(category).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    )
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && category.isActive) ||
      (filterStatus === "inactive" && !category.isActive)

    return matchesSearch && matchesStatus
  })

  const validateForm = (data: Partial<EmployeeCategory>) => {
    const newErrors: Record<string, string> = {}

    if (!data.employeeCategoryCode?.trim()) newErrors.employeeCategoryCode = "Category code is required"
    if (!data.employeeCategoryName?.trim()) newErrors.employeeCategoryName = "Category name is required"
    if (!data.employeeCategoryDescription?.trim()) newErrors.employeeCategoryDescription = "Category description is required"

    const isDuplicate = categories.some(
      (cat) => cat.employeeCategoryCode === data.employeeCategoryCode && cat.id !== editingCategory?.id,
    )
    if (isDuplicate) newErrors.employeeCategoryCode = "Category code already exists"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddCategory = async () => {
    if (!validateForm(newCategory)) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const category: EmployeeCategory = {
      ...(newCategory as EmployeeCategory),
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
    }

    setCategories([...categories, category])
    resetForm()
    setIsLoading(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleEditCategory = async () => {
    if (!editingCategory || !validateForm(newCategory)) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setCategories(
      categories.map((cat) => (cat.id === editingCategory.id ? { ...cat, ...newCategory } as EmployeeCategory : cat)),
    )

    resetForm()
    setIsLoading(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleDeleteCategory = async (id: string) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setCategories(categories.filter((cat) => cat.id !== id))
    setIsLoading(false)
  }

  const handleToggleStatus = async (id: string) => {
    setCategories(categories.map((cat) => (cat.id === id ? { ...cat, isActive: !cat.isActive } : cat)))
  }

  const resetForm = () => {
    setNewCategory({
      employeeCategoryCode: "",
      employeeCategoryName: "",
      employeeCategoryDescription: "",
      isActive: true,
    })
    setEditingCategory(null)
    setIsAddDialogOpen(false)
    setErrors({})
  }

  const startEdit = (category: EmployeeCategory) => {
    setEditingCategory(category)
    setNewCategory(category)
    setIsAddDialogOpen(true)
  }

  const activeCategories = categories.filter((cat) => cat.isActive).length
  const inactiveCategories = categories.length - activeCategories

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Success Alert */}
        {showSuccess && (
          <Alert className="border-green-200 bg-green-50 text-green-800 animate-in slide-in-from-top-2 duration-300">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>Category {editingCategory ? "updated" : "added"} successfully!</AlertDescription>
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
          <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
            <Users className="h-8 w-8 text-white animate-pulse" />
          </div>
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Employee Categories
            </h1>
            <p className="text-gray-600 mt-1 text-lg">Manage employee categories and their details</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Categories</p>
                  <p className="text-3xl font-bold">{categories.length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Active</p>
                  <p className="text-3xl font-bold">{activeCategories}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">Inactive</p>
                  <p className="text-3xl font-bold">{inactiveCategories}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions Row */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-1 gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="hover:bg-gray-50">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button variant="outline" size="sm" className="hover:bg-gray-50">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  size="lg"
                  onClick={() => resetForm()}
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-xl">
                    <Users className="h-6 w-6 text-blue-600" />
                    {editingCategory ? "Edit Category" : "Add New Category"}
                  </DialogTitle>
                  <DialogDescription>
                    {editingCategory
                      ? "Update the category details below"
                      : "Enter the details for the new employee category"}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="code" className="text-sm font-medium">
                          Category Code *
                        </Label>
                        <Input
                          id="code"
                          value={newCategory.employeeCategoryCode}
                          onChange={(e) =>
                            setNewCategory({ ...newCategory, employeeCategoryCode: e.target.value.toUpperCase() })
                          }
                          placeholder="Enter category code"
                          className={errors.employeeCategoryCode ? "border-red-300 focus:border-red-500" : ""}
                        />
                        {errors.employeeCategoryCode && (
                          <p className="text-sm text-red-600">{errors.employeeCategoryCode}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium">
                          Category Name *
                        </Label>
                        <Input
                          id="name"
                          value={newCategory.employeeCategoryName}
                          onChange={(e) =>
                            setNewCategory({ ...newCategory, employeeCategoryName: e.target.value })
                          }
                          placeholder="Enter category name"
                          className={errors.employeeCategoryName ? "border-red-300 focus:border-red-500" : ""}
                        />
                        {errors.employeeCategoryName && (
                          <p className="text-sm text-red-600">{errors.employeeCategoryName}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description" className="text-sm font-medium">
                          Description *
                        </Label>
                        <Input
                          id="description"
                          value={newCategory.employeeCategoryDescription}
                          onChange={(e) =>
                            setNewCategory({ ...newCategory, employeeCategoryDescription: e.target.value })
                          }
                          placeholder="Enter category description"
                          className={errors.employeeCategoryDescription ? "border-red-300 focus:border-red-500" : ""}
                        />
                        {errors.employeeCategoryDescription && (
                          <p className="text-sm text-red-600">{errors.employeeCategoryDescription}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium">Status</Label>
                      <p className="text-sm text-gray-600">Enable or disable this category</p>
                    </div>
                    <Switch
                      checked={newCategory.isActive}
                      onCheckedChange={(checked) =>
                        setNewCategory({ ...newCategory, isActive: checked })
                      }
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={editingCategory ? handleEditCategory : handleAddCategory}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </div>
                    ) : (
                      <>{editingCategory ? "Update Category" : "Add Category"}</>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Categories Table */}
        <Card className="shadow-lg border-0 overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold text-gray-900">
                Employee Categories ({filteredCategories.length})
              </CardTitle>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Showing {filteredCategories.length} of {categories.length}
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
                    <TableHead className="font-semibold text-gray-700">Description</TableHead>
                    <TableHead className="font-semibold text-gray-700">Status</TableHead>
                    <TableHead className="font-semibold text-gray-700 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCategories.map((category) => (
                    <TableRow key={category.id} className="hover:bg-gray-50/50 transition-all duration-200 group">
                      <TableCell className="font-mono text-blue-600 font-medium">
                        {category.employeeCategoryCode}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-900">{category.employeeCategoryName}</p>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-md">
                        <p className="text-sm text-gray-600 truncate">
                          {category.employeeCategoryDescription}
                        </p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={category.isActive}
                            onCheckedChange={() => handleToggleStatus(category.id)}
                            className="data-[state=checked]:bg-green-500"
                          />
                          <span className={`text-sm ${category.isActive ? "text-green-600" : "text-gray-600"}`}>
                            {category.isActive ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                            onClick={() => startEdit(category)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                            onClick={() => handleDeleteCategory(category.id)}
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
