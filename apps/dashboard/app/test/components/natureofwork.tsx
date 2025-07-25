"use client"

import { useState } from "react"
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Briefcase,
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

interface NatureOfWork {
  id: string
  natureOfWorkCode: string
  natureOfWorkTitle: string
  isActive: boolean
  createdAt: string
}

export default function NatureOfWorkManagement() {
  const [natureOfWorks, setNatureOfWorks] = useState<NatureOfWork[]>([
    {
      id: "1",
      natureOfWorkCode: "NOW001",
      natureOfWorkTitle: "Technical",
      isActive: true,
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      natureOfWorkCode: "NOW002",
      natureOfWorkTitle: "Non-Technical",
      isActive: true,
      createdAt: "2024-01-15",
    },
    {
      id: "3",
      natureOfWorkCode: "NOW003",
      natureOfWorkTitle: "Skilled",
      isActive: true,
      createdAt: "2024-01-15",
    },
    {
      id: "4",
      natureOfWorkCode: "NOW004",
      natureOfWorkTitle: "Unskilled",
      isActive: true,
      createdAt: "2024-01-15",
    },
    {
      id: "5",
      natureOfWorkCode: "NOW005",
      natureOfWorkTitle: "Supervisory",
      isActive: true,
      createdAt: "2024-01-15",
    },
    {
      id: "6",
      natureOfWorkCode: "NOW006",
      natureOfWorkTitle: "Clerical",
      isActive: true,
      createdAt: "2024-01-15",
    },
    {
      id: "7",
      natureOfWorkCode: "NOW007",
      natureOfWorkTitle: "Administrative",
      isActive: true,
      createdAt: "2024-01-15",
    },
    {
      id: "8",
      natureOfWorkCode: "NOW008",
      natureOfWorkTitle: "Field Work",
      isActive: true,
      createdAt: "2024-01-15",
    },
    {
      id: "9",
      natureOfWorkCode: "NOW009",
      natureOfWorkTitle: "Maintenance",
      isActive: true,
      createdAt: "2024-01-15",
    },
    {
      id: "10",
      natureOfWorkCode: "NOW010",
      natureOfWorkTitle: "Logistics",
      isActive: true,
      createdAt: "2024-01-15",
    }
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingNatureOfWork, setEditingNatureOfWork] = useState<NatureOfWork | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [newNatureOfWork, setNewNatureOfWork] = useState<Partial<NatureOfWork>>({
    natureOfWorkCode: "",
    natureOfWorkTitle: "",
    isActive: true,
  })

  const filteredNatureOfWorks = natureOfWorks.filter((now) => {
    const matchesSearch = Object.values(now).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    )
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && now.isActive) ||
      (filterStatus === "inactive" && !now.isActive)

    return matchesSearch && matchesStatus
  })

  const validateForm = (data: Partial<NatureOfWork>) => {
    const newErrors: Record<string, string> = {}

    if (!data.natureOfWorkCode?.trim()) newErrors.natureOfWorkCode = "Nature of work code is required"
    if (!data.natureOfWorkTitle?.trim()) newErrors.natureOfWorkTitle = "Nature of work title is required"

    // Check for duplicate code
    const isDuplicate = natureOfWorks.some(
      (now) => now.natureOfWorkCode === data.natureOfWorkCode && now.id !== editingNatureOfWork?.id,
    )
    if (isDuplicate) newErrors.natureOfWorkCode = "Nature of work code already exists"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddNatureOfWork = async () => {
    if (!validateForm(newNatureOfWork)) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const natureOfWork: NatureOfWork = {
      ...(newNatureOfWork as NatureOfWork),
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
    }

    setNatureOfWorks([...natureOfWorks, natureOfWork])
    resetForm()
    setIsLoading(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleEditNatureOfWork = async () => {
    if (!editingNatureOfWork || !validateForm(newNatureOfWork)) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setNatureOfWorks(
      natureOfWorks.map((now) => (now.id === editingNatureOfWork.id ? { ...now, ...newNatureOfWork } as NatureOfWork : now)),
    )

    resetForm()
    setIsLoading(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleDeleteNatureOfWork = async (id: string) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setNatureOfWorks(natureOfWorks.filter((now) => now.id !== id))
    setIsLoading(false)
  }

  const handleToggleStatus = async (id: string) => {
    setNatureOfWorks(natureOfWorks.map((now) => (now.id === id ? { ...now, isActive: !now.isActive } : now)))
  }

  const resetForm = () => {
    setNewNatureOfWork({
      natureOfWorkCode: "",
      natureOfWorkTitle: "",
      isActive: true,
    })
    setEditingNatureOfWork(null)
    setIsAddDialogOpen(false)
    setErrors({})
  }

  const startEdit = (natureOfWork: NatureOfWork) => {
    setEditingNatureOfWork(natureOfWork)
    setNewNatureOfWork(natureOfWork)
    setIsAddDialogOpen(true)
  }

  const activeNatureOfWorks = natureOfWorks.filter((now) => now.isActive).length
  const inactiveNatureOfWorks = natureOfWorks.length - activeNatureOfWorks

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Success Alert */}
        {showSuccess && (
          <Alert className="border-green-200 bg-green-50 text-green-800 animate-in slide-in-from-top-2 duration-300">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>Nature of work {editingNatureOfWork ? "updated" : "added"} successfully!</AlertDescription>
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
            <Briefcase className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Nature of Work Management
            </h1>
            <p className="text-gray-600 mt-1 text-lg">Manage your organization's nature of work categories</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Categories</p>
                  <p className="text-3xl font-bold">{natureOfWorks.length}</p>
                </div>
                <Briefcase className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Active</p>
                  <p className="text-3xl font-bold">{activeNatureOfWorks}</p>
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
                  <p className="text-3xl font-bold">{inactiveNatureOfWorks}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4">
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
                  setEditingNatureOfWork(null)
                  resetForm()
                }}
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Nature of Work
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl">
                  <Briefcase className="h-6 w-6 text-blue-600" />
                  {editingNatureOfWork ? "Edit Nature of Work" : "Add New Nature of Work"}
                </DialogTitle>
                <DialogDescription>
                  {editingNatureOfWork
                    ? "Update the nature of work details below."
                    : "Enter the details for the new nature of work category below."}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="natureOfWorkCode" className="text-sm font-medium">
                        Nature of Work Code *
                      </Label>
                      <Input
                        id="natureOfWorkCode"
                        placeholder="NOW001"
                        value={newNatureOfWork.natureOfWorkCode}
                        onChange={(e) => setNewNatureOfWork({ ...newNatureOfWork, natureOfWorkCode: e.target.value.toUpperCase() })}
                        className={errors.natureOfWorkCode ? "border-red-300 focus:border-red-500" : ""}
                      />
                      {errors.natureOfWorkCode && <p className="text-sm text-red-600">{errors.natureOfWorkCode}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="natureOfWorkTitle" className="text-sm font-medium">
                        Nature of Work Title *
                      </Label>
                      <Input
                        id="natureOfWorkTitle"
                        placeholder="Technical"
                        value={newNatureOfWork.natureOfWorkTitle}
                        onChange={(e) => setNewNatureOfWork({ ...newNatureOfWork, natureOfWorkTitle: e.target.value })}
                        className={errors.natureOfWorkTitle ? "border-red-300 focus:border-red-500" : ""}
                      />
                      {errors.natureOfWorkTitle && <p className="text-sm text-red-600">{errors.natureOfWorkTitle}</p>}
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-sm font-medium">Status</Label>
                    <p className="text-sm text-gray-600">Enable or disable this nature of work category</p>
                  </div>
                  <Switch
                    checked={newNatureOfWork.isActive}
                    onCheckedChange={(checked) => setNewNatureOfWork({ ...newNatureOfWork, isActive: checked })}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button
                  onClick={editingNatureOfWork ? handleEditNatureOfWork : handleAddNatureOfWork}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </div>
                  ) : (
                    <>{editingNatureOfWork ? "Update Nature of Work" : "Add Nature of Work"}</>
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
                  placeholder="Search by code or title..."
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

        {/* Nature of Work Table */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold text-gray-900">
                Nature of Work Categories ({filteredNatureOfWorks.length})
              </CardTitle>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Showing {filteredNatureOfWorks.length} of {natureOfWorks.length}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50/80">
                    <TableHead className="font-semibold text-gray-700">Code</TableHead>
                    <TableHead className="font-semibold text-gray-700">Title</TableHead>
                    <TableHead className="font-semibold text-gray-700">Created At</TableHead>
                    <TableHead className="font-semibold text-gray-700">Status</TableHead>
                    <TableHead className="font-semibold text-gray-700 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredNatureOfWorks.map((now) => (
                    <TableRow key={now.id} className="hover:bg-gray-50/50 transition-all duration-200 group">
                      <TableCell className="font-mono text-blue-600 font-medium">{now.natureOfWorkCode}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-900">{now.natureOfWorkTitle}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-gray-500">{now.createdAt}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={now.isActive}
                            onCheckedChange={() => handleToggleStatus(now.id)}
                            className="data-[state=checked]:bg-green-500"
                          />
                          <span className={`text-sm ${now.isActive ? "text-green-600" : "text-gray-600"}`}>
                            {now.isActive ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                            onClick={() => startEdit(now)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                            onClick={() => handleDeleteNatureOfWork(now.id)}
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