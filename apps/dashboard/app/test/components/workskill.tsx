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

interface WorkSkill {
  id: string
  workSkillCode: string
  workSkillTitle: string
  isActive: boolean
  createdAt: string
}

export default function WorkSkillManagement() {
  const [workSkills, setWorkSkills] = useState<WorkSkill[]>([
    {
      id: "1",
      workSkillCode: "WSK001",
      workSkillTitle: "Electrician",
      isActive: true,
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      workSkillCode: "WSK002",
      workSkillTitle: "Plumber",
      isActive: true,
      createdAt: "2024-01-15",
    },
    {
      id: "3",
      workSkillCode: "WSK003",
      workSkillTitle: "Carpenter",
      isActive: true,
      createdAt: "2024-01-15",
    },
    {
      id: "4",
      workSkillCode: "WSK004",
      workSkillTitle: "Welder",
      isActive: true,
      createdAt: "2024-01-15",
    },
    {
      id: "5",
      workSkillCode: "WSK005",
      workSkillTitle: "Painter",
      isActive: true,
      createdAt: "2024-01-15",
    },
    {
      id: "6",
      workSkillCode: "WSK007",
      workSkillTitle: "Heavy Equipment Operator",
      isActive: true,
      createdAt: "2024-01-15",
    },
    {
      id: "7",
      workSkillCode: "WSK010",
      workSkillTitle: "Security Guard",
      isActive: true,
      createdAt: "2024-01-15",
    }
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingWorkSkill, setEditingWorkSkill] = useState<WorkSkill | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [newWorkSkill, setNewWorkSkill] = useState<Partial<WorkSkill>>({
    workSkillCode: "",
    workSkillTitle: "",
    isActive: true,
  })

  const filteredWorkSkills = workSkills.filter((skill) => {
    const matchesSearch = Object.values(skill).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    )
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && skill.isActive) ||
      (filterStatus === "inactive" && !skill.isActive)

    return matchesSearch && matchesStatus
  })

  const validateForm = (data: Partial<WorkSkill>) => {
    const newErrors: Record<string, string> = {}

    if (!data.workSkillCode?.trim()) newErrors.workSkillCode = "Work skill code is required"
    if (!data.workSkillTitle?.trim()) newErrors.workSkillTitle = "Work skill title is required"

    const isDuplicate = workSkills.some(
      (skill) => skill.workSkillCode === data.workSkillCode && skill.id !== editingWorkSkill?.id,
    )
    if (isDuplicate) newErrors.workSkillCode = "Work skill code already exists"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddWorkSkill = async () => {
    if (!validateForm(newWorkSkill)) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const workSkill: WorkSkill = {
      ...(newWorkSkill as WorkSkill),
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
    }

    setWorkSkills([...workSkills, workSkill])
    resetForm()
    setIsLoading(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleEditWorkSkill = async () => {
    if (!editingWorkSkill || !validateForm(newWorkSkill)) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setWorkSkills(
      workSkills.map((skill) => (skill.id === editingWorkSkill.id ? { ...skill, ...newWorkSkill } as WorkSkill : skill)),
    )

    resetForm()
    setIsLoading(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleDeleteWorkSkill = async (id: string) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setWorkSkills(workSkills.filter((skill) => skill.id !== id))
    setIsLoading(false)
  }

  const handleToggleStatus = async (id: string) => {
    setWorkSkills(workSkills.map((skill) => (skill.id === id ? { ...skill, isActive: !skill.isActive } : skill)))
  }

  const resetForm = () => {
    setNewWorkSkill({
      workSkillCode: "",
      workSkillTitle: "",
      isActive: true,
    })
    setEditingWorkSkill(null)
    setIsAddDialogOpen(false)
    setErrors({})
  }

  const startEdit = (workSkill: WorkSkill) => {
    setEditingWorkSkill(workSkill)
    setNewWorkSkill(workSkill)
    setIsAddDialogOpen(true)
  }

  const activeWorkSkills = workSkills.filter((skill) => skill.isActive).length
  const inactiveWorkSkills = workSkills.length - activeWorkSkills

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Success Alert */}
        {showSuccess && (
          <Alert className="border-green-200 bg-green-50 text-green-800 animate-in slide-in-from-top-2 duration-300">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>Work skill {editingWorkSkill ? "updated" : "added"} successfully!</AlertDescription>
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
            <Briefcase className="h-8 w-8 text-white animate-pulse" />
          </div>
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Work Skills Management
            </h1>
            <p className="text-gray-600 mt-1 text-lg">Manage and organize your organization's work skills</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Skills</p>
                  <p className="text-3xl font-bold">{workSkills.length}</p>
                </div>
                <Briefcase className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Active</p>
                  <p className="text-3xl font-bold">{activeWorkSkills}</p>
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
                  <p className="text-3xl font-bold">{inactiveWorkSkills}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-6 rounded-xl shadow-lg">
          <div className="flex flex-1 gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search work skills..."
                className="pl-10 h-11 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px] h-11">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-11 px-4 hover:bg-gray-50">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button variant="outline" size="sm" className="h-11 px-4 hover:bg-gray-50">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white h-11 px-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => resetForm()}
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Work Skill
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-xl">
                    <Briefcase className="h-6 w-6 text-blue-600" />
                    {editingWorkSkill ? "Edit Work Skill" : "Add New Work Skill"}
                  </DialogTitle>
                  <DialogDescription>
                    {editingWorkSkill
                      ? "Update the work skill details below."
                      : "Enter the details for the new work skill below."}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="workSkillCode" className="text-sm font-medium">
                          Work Skill Code *
                        </Label>
                        <Input
                          id="workSkillCode"
                          placeholder="WSK001"
                          value={newWorkSkill.workSkillCode}
                          onChange={(e) =>
                            setNewWorkSkill({ ...newWorkSkill, workSkillCode: e.target.value.toUpperCase() })
                          }
                          className={errors.workSkillCode ? "border-red-300 focus:border-red-500" : ""}
                        />
                        {errors.workSkillCode && (
                          <p className="text-sm text-red-600">{errors.workSkillCode}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="workSkillTitle" className="text-sm font-medium">
                          Work Skill Title *
                        </Label>
                        <Input
                          id="workSkillTitle"
                          placeholder="Enter work skill title"
                          value={newWorkSkill.workSkillTitle}
                          onChange={(e) =>
                            setNewWorkSkill({ ...newWorkSkill, workSkillTitle: e.target.value })
                          }
                          className={errors.workSkillTitle ? "border-red-300 focus:border-red-500" : ""}
                        />
                        {errors.workSkillTitle && (
                          <p className="text-sm text-red-600">{errors.workSkillTitle}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium">Status</Label>
                      <p className="text-sm text-gray-600">Enable or disable this work skill</p>
                    </div>
                    <Switch
                      checked={newWorkSkill.isActive}
                      onCheckedChange={(checked) =>
                        setNewWorkSkill({ ...newWorkSkill, isActive: checked })
                      }
                      className="data-[state=checked]:bg-blue-600"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={editingWorkSkill ? handleEditWorkSkill : handleAddWorkSkill}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </div>
                    ) : (
                      <>{editingWorkSkill ? "Update Work Skill" : "Add Work Skill"}</>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Table */}
        <Card className="shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold text-gray-900">
                Work Skills ({filteredWorkSkills.length})
              </CardTitle>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Showing {filteredWorkSkills.length} of {workSkills.length}
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
                  {filteredWorkSkills.map((skill) => (
                    <TableRow key={skill.id} className="hover:bg-gray-50/50 transition-all duration-200 group">
                      <TableCell className="font-mono text-blue-600 font-medium">{skill.workSkillCode}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-900">{skill.workSkillTitle}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-gray-500">{skill.createdAt}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={skill.isActive}
                            onCheckedChange={() => handleToggleStatus(skill.id)}
                            className="data-[state=checked]:bg-green-500"
                          />
                          <span className={`text-sm ${skill.isActive ? "text-green-600" : "text-gray-600"}`}>
                            {skill.isActive ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                            onClick={() => startEdit(skill)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                            onClick={() => handleDeleteWorkSkill(skill.id)}
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