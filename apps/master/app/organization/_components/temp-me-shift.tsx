"use client"

import { useState, useEffect } from "react"
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Clock,
  Download,
  Upload,
  CheckCircle,
  AlertCircle,
  X,
  Loader2,
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
import { Checkbox } from "@repo/ui/components/ui/checkbox"

interface Shift {
  _id: string
  organizationCode: string
  tenantCode: string
  shiftGroupCode: string
  shiftGroupName: string
  subsidiary: {
    subsidiaryCode: string
    subsidiaryName: string
  }
  location: {
    locationCode: string
    locationName: string
  }
  employeeCategory: string[]
  shift: {
    shiftCode: string
    shiftName: string
    shiftStart: string
    shiftEnd: string
    firstHalfStart: string
    firstHalfEnd: string
    secondHalfStart: string
    secondHalfEnd: string
    lunchStart: string
    lunchEnd: string
    duration: number
    crossDay: boolean
    flexible: boolean
    flexiFullDayDuration: number
    flexiHalfDayDuration: number
    inAheadMargin: number
    inAboveMargin: number
    outAheadMargin: number
    outAboveMargin: number
    lateInAllowedTime: number
    earlyOutAllowedTime: number
    graceIn: number
    graceOut: number
    earlyOutTime: number
    minimumDurationForFullDay: number
    minimumDurationForHalfDay: number
    minimumExtraMinutesForExtraHours: number
  }[]
}

export default function ShiftManagement() {
  const [shifts, setShifts] = useState<Shift[]>([
    {
      _id: "67dcffb89afc43a5d1be809e",
      organizationCode: "ALL",
      tenantCode: "tenant1",
      shiftGroupCode: "A",
      shiftGroupName: "First Group",
      subsidiary: {
        subsidiaryCode: "sub001",
        subsidiaryName: "subsidiary001"
      },
      location: {
        locationCode: "001",
        locationName: "Bangalore"
      },
      employeeCategory: ["WKM", "Cat2", "Cat3"],
      shift: [
        {
          shiftCode: "A001",
          shiftName: "First Shift",
          shiftStart: "03:30",
          shiftEnd: "11:30",
          firstHalfStart: "03:30",
          firstHalfEnd: "07:30",
          secondHalfStart: "08:30",
          secondHalfEnd: "11:30",
          lunchStart: "07:30",
          lunchEnd: "08:30",
          duration: 480,
          crossDay: false,
          flexible: false,
          flexiFullDayDuration: 0,
          flexiHalfDayDuration: 0,
          inAheadMargin: 0,
          inAboveMargin: 0,
          outAheadMargin: 0,
          outAboveMargin: 0,
          lateInAllowedTime: 0,
          earlyOutAllowedTime: 0,
          graceIn: 5,
          graceOut: 5,
          earlyOutTime: 10,
          minimumDurationForFullDay: 360,
          minimumDurationForHalfDay: 180,
          minimumExtraMinutesForExtraHours: 30
        },
        {
          shiftCode: "A002",
          shiftName: "Second Shift",
          shiftStart: "11:30",
          shiftEnd: "19:30",
          firstHalfStart: "11:30",
          firstHalfEnd: "15:30",
          secondHalfStart: "16:30",
          secondHalfEnd: "19:30",
          lunchStart: "15:30",
          lunchEnd: "16:30",
          duration: 480,
          crossDay: false,
          flexible: true,
          flexiFullDayDuration: 480,
          flexiHalfDayDuration: 240,
          inAheadMargin: 15,
          inAboveMargin: 15,
          outAheadMargin: 15,
          outAboveMargin: 15,
          lateInAllowedTime: 15,
          earlyOutAllowedTime: 15,
          graceIn: 10,
          graceOut: 10,
          earlyOutTime: 15,
          minimumDurationForFullDay: 360,
          minimumDurationForHalfDay: 180,
          minimumExtraMinutesForExtraHours: 30
        }
      ]
    },
    {
      _id: "67dcffb89afc43a5d1be809f",
      organizationCode: "ALL",
      tenantCode: "tenant1",
      shiftGroupCode: "B",
      shiftGroupName: "Second Group",
      subsidiary: {
        subsidiaryCode: "sub002",
        subsidiaryName: "subsidiary002"
      },
      location: {
        locationCode: "002",
        locationName: "Hyderabad"
      },
      employeeCategory: ["WKM", "Cat1", "Cat4"],
      shift: [
        {
          shiftCode: "B001",
          shiftName: "Night Shift",
          shiftStart: "19:30",
          shiftEnd: "03:30",
          firstHalfStart: "19:30",
          firstHalfEnd: "23:30",
          secondHalfStart: "00:30",
          secondHalfEnd: "03:30",
          lunchStart: "23:30",
          lunchEnd: "00:30",
          duration: 480,
          crossDay: true,
          flexible: false,
          flexiFullDayDuration: 0,
          flexiHalfDayDuration: 0,
          inAheadMargin: 0,
          inAboveMargin: 0,
          outAheadMargin: 0,
          outAboveMargin: 0,
          lateInAllowedTime: 0,
          earlyOutAllowedTime: 0,
          graceIn: 5,
          graceOut: 5,
          earlyOutTime: 10,
          minimumDurationForFullDay: 360,
          minimumDurationForHalfDay: 180,
          minimumExtraMinutesForExtraHours: 30
        }
      ]
    }
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingShift, setEditingShift] = useState<Shift | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [newShift, setNewShift] = useState<Partial<Shift>>({
    organizationCode: "",
    tenantCode: "",
    shiftGroupCode: "",
    shiftGroupName: "",
    subsidiary: {
      subsidiaryCode: "",
      subsidiaryName: ""
    },
    location: {
      locationCode: "",
      locationName: ""
    },
    employeeCategory: [],
    shift: [{
      shiftCode: "",
      shiftName: "",
      shiftStart: "",
      shiftEnd: "",
      firstHalfStart: "",
      firstHalfEnd: "",
      secondHalfStart: "",
      secondHalfEnd: "",
      lunchStart: "",
      lunchEnd: "",
      duration: 0,
      crossDay: false,
      flexible: false,
      flexiFullDayDuration: 0,
      flexiHalfDayDuration: 0,
      inAheadMargin: 0,
      inAboveMargin: 0,
      outAheadMargin: 0,
      outAboveMargin: 0,
      lateInAllowedTime: 0,
      earlyOutAllowedTime: 0,
      graceIn: 5,
      graceOut: 5,
      earlyOutTime: 10,
      minimumDurationForFullDay: 360,
      minimumDurationForHalfDay: 180,
      minimumExtraMinutesForExtraHours: 30
    }]
  })

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredShifts = shifts.filter((shift) => {
    const matchesSearch = 
      shift.shiftGroupCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shift.shiftGroupName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shift.shift.some(s => 
        s.shiftCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.shiftName.toLowerCase().includes(searchTerm.toLowerCase())
      )

    return matchesSearch
  })

  // Calculate pagination
  const totalPages = Math.ceil(filteredShifts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedShifts = filteredShifts.slice(startIndex, startIndex + itemsPerPage)

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, filterStatus])

  // Form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!newShift.shiftGroupCode) {
      newErrors.shiftGroupCode = "Shift group code is required"
    }
    if (!newShift.shiftGroupName) {
      newErrors.shiftGroupName = "Shift group name is required"
    }
    if (!newShift.organizationCode) {
      newErrors.organizationCode = "Organization code is required"
    }
    if (!newShift.tenantCode) {
      newErrors.tenantCode = "Tenant code is required"
    }
    if (!newShift.subsidiary?.subsidiaryCode) {
      newErrors.subsidiaryCode = "Subsidiary code is required"
    }
    if (!newShift.location?.locationCode) {
      newErrors.locationCode = "Location code is required"
    }
    if (!newShift.employeeCategory?.length) {
      newErrors.employeeCategory = "At least one employee category is required"
    }
    if (!newShift.shift?.[0]?.shiftCode) {
      newErrors.shiftCode = "Shift code is required"
    }
    if (!newShift.shift?.[0]?.shiftName) {
      newErrors.shiftName = "Shift name is required"
    }
    if (!newShift.shift?.[0]?.shiftStart) {
      newErrors.shiftStart = "Shift start time is required"
    }
    if (!newShift.shift?.[0]?.shiftEnd) {
      newErrors.shiftEnd = "Shift end time is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    try {
      if (editingShift) {
        // Update existing shift
        const updatedShifts = shifts.map((shift) =>
          shift._id === editingShift._id ? { ...newShift, _id: shift._id } as Shift : shift
        )
        setShifts(updatedShifts)
      } else {
        // Add new shift
        const newShiftWithId = {
          ...newShift,
          _id: Math.random().toString(36).substr(2, 9)
        } as Shift
        setShifts([...shifts, newShiftWithId])
      }

      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
      setIsAddDialogOpen(false)
      setEditingShift(null)
      setNewShift({
        organizationCode: "",
        tenantCode: "",
        shiftGroupCode: "",
        shiftGroupName: "",
        subsidiary: {
          subsidiaryCode: "",
          subsidiaryName: ""
        },
        location: {
          locationCode: "",
          locationName: ""
        },
        employeeCategory: [],
        shift: [{
          shiftCode: "",
          shiftName: "",
          shiftStart: "",
          shiftEnd: "",
          firstHalfStart: "",
          firstHalfEnd: "",
          secondHalfStart: "",
          secondHalfEnd: "",
          lunchStart: "",
          lunchEnd: "",
          duration: 0,
          crossDay: false,
          flexible: false,
          flexiFullDayDuration: 0,
          flexiHalfDayDuration: 0,
          inAheadMargin: 0,
          inAboveMargin: 0,
          outAheadMargin: 0,
          outAboveMargin: 0,
          lateInAllowedTime: 0,
          earlyOutAllowedTime: 0,
          graceIn: 5,
          graceOut: 5,
          earlyOutTime: 10,
          minimumDurationForFullDay: 360,
          minimumDurationForHalfDay: 180,
          minimumExtraMinutesForExtraHours: 30
        }]
      })
    } catch (error) {
      console.error("Error saving shift:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (shift: Shift) => {
    setEditingShift(shift)
    setNewShift(shift)
    setIsAddDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this shift?")) {
      try {
        const updatedShifts = shifts.filter((shift) => shift._id !== id)
        setShifts(updatedShifts)
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 3000)
      } catch (error) {
        console.error("Error deleting shift:", error)
      }
    }
  }

  const activeShifts = shifts.filter((shift) => shift.shift[0]?.flexible).length
  const regularShifts = shifts.length - activeShifts

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Success Alert */}
        {showSuccess && (
          <Alert className="border-green-200 bg-green-50 text-green-800 animate-in slide-in-from-top-2 duration-300">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>Shift {editingShift ? "updated" : "added"} successfully!</AlertDescription>
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Shift Management
              </h1>
              <p className="text-gray-600 mt-1 text-lg">Manage your organization's shifts and schedules</p>
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
            <Button
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              size="lg"
              onClick={() => {
                setEditingShift(null)
                setNewShift({
                  organizationCode: "",
                  tenantCode: "",
                  shiftGroupCode: "",
                  shiftGroupName: "",
                  subsidiary: {
                    subsidiaryCode: "",
                    subsidiaryName: ""
                  },
                  location: {
                    locationCode: "",
                    locationName: ""
                  },
                  employeeCategory: [],
                  shift: [{
                    shiftCode: "",
                    shiftName: "",
                    shiftStart: "",
                    shiftEnd: "",
                    firstHalfStart: "",
                    firstHalfEnd: "",
                    secondHalfStart: "",
                    secondHalfEnd: "",
                    lunchStart: "",
                    lunchEnd: "",
                    duration: 0,
                    crossDay: false,
                    flexible: false,
                    flexiFullDayDuration: 0,
                    flexiHalfDayDuration: 0,
                    inAheadMargin: 0,
                    inAboveMargin: 0,
                    outAheadMargin: 0,
                    outAboveMargin: 0,
                    lateInAllowedTime: 0,
                    earlyOutAllowedTime: 0,
                    graceIn: 5,
                    graceOut: 5,
                    earlyOutTime: 10,
                    minimumDurationForFullDay: 360,
                    minimumDurationForHalfDay: 180,
                    minimumExtraMinutesForExtraHours: 30
                  }]
                })
                setIsAddDialogOpen(true)
              }}
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Shift
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Shifts</p>
                  <p className="text-3xl font-bold">{shifts.length}</p>
                </div>
                <Clock className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Flexible Shifts</p>
                  <p className="text-3xl font-bold">{activeShifts}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">Regular Shifts</p>
                  <p className="text-3xl font-bold">{regularShifts}</p>
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
                  placeholder="Search shifts by name, code..."
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
                  <SelectItem value="flexible">Flexible</SelectItem>
                  <SelectItem value="regular">Regular</SelectItem>
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

        {/* Shifts Table */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold text-gray-900">
                Shifts ({filteredShifts.length})
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
                    <TableHead className="font-semibold text-gray-700">Group Code</TableHead>
                    <TableHead className="font-semibold text-gray-700">Group Name</TableHead>
                    <TableHead className="font-semibold text-gray-700">Organization</TableHead>
                    <TableHead className="font-semibold text-gray-700">Location</TableHead>
                    <TableHead className="font-semibold text-gray-700">Subsidiary</TableHead>
                    <TableHead className="font-semibold text-gray-700">Shift Code</TableHead>
                    <TableHead className="font-semibold text-gray-700">Shift Name</TableHead>
                    <TableHead className="font-semibold text-gray-700">Timings</TableHead>
                    <TableHead className="font-semibold text-gray-700">Type</TableHead>
                    <TableHead className="font-semibold text-gray-700">Categories</TableHead>
                    <TableHead className="font-semibold text-gray-700 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedShifts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={11} className="h-32 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <Clock className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-lg font-medium text-gray-900 mb-1">No shifts found</p>
                          <p className="text-gray-500">
                            {searchTerm || filterStatus !== "all"
                              ? "Try adjusting your search criteria or filters"
                              : "Get started by adding your first shift"}
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedShifts.flatMap((shift) =>
                      shift.shift.map((s, index) => (
                        <TableRow key={`${shift._id}-${index}`} className="hover:bg-gray-50/50 transition-all duration-200 group">
                          <TableCell className="font-mono text-blue-600 font-medium">{shift.shiftGroupCode}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium text-gray-900">{shift.shiftGroupName}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                              {shift.organizationCode}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              {shift.location.locationName}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              {shift.subsidiary.subsidiaryName}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-mono text-blue-600">{s.shiftCode}</TableCell>
                          <TableCell className="font-medium text-gray-900">{s.shiftName}</TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <p className="text-sm text-gray-600">
                                {s.shiftStart} - {s.shiftEnd}
                              </p>
                              {s.lunchStart && s.lunchEnd && (
                                <p className="text-xs text-gray-500">
                                  Lunch: {s.lunchStart} - {s.lunchEnd}
                                </p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {s.crossDay && (
                                <Badge variant="secondary" className="bg-orange-50 text-orange-700 border-orange-200">
                                  Cross Day
                                </Badge>
                              )}
                              {s.flexible && (
                                <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                                  Flexible
                                </Badge>
                              )}
                              {!s.crossDay && !s.flexible && (
                                <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                                  Regular
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {shift.employeeCategory.map((category, index) => (
                                <Badge key={index} variant="secondary" className="bg-gray-50 text-gray-700 border-gray-200">
                                  {category}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                                onClick={() => handleEdit(shift)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                                onClick={() => handleDelete(shift._id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between p-4 border-t">
              <div className="text-sm text-gray-600">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredShifts.length)} of{" "}
                {filteredShifts.length} entries
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

        {/* Add/Edit Shift Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <Clock className="h-6 w-6 text-blue-600" />
                {editingShift ? "Edit Shift" : "Add New Shift"}
              </DialogTitle>
              <DialogDescription>
                {editingShift
                  ? "Update the shift details below"
                  : "Fill in the details to create a new shift"}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="shiftGroupCode" className="text-sm font-medium">
                      Shift Group Code *
                    </Label>
                    <Input
                      id="shiftGroupCode"
                      placeholder="GRP001"
                      value={newShift.shiftGroupCode}
                      onChange={(e) =>
                        setNewShift({ ...newShift, shiftGroupCode: e.target.value.toUpperCase() })
                      }
                      className={errors.shiftGroupCode ? "border-red-300 focus:border-red-500" : ""}
                    />
                    {errors.shiftGroupCode && (
                      <p className="text-sm text-red-600">{errors.shiftGroupCode}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shiftGroupName" className="text-sm font-medium">
                      Shift Group Name *
                    </Label>
                    <Input
                      id="shiftGroupName"
                      placeholder="Morning Shift Group"
                      value={newShift.shiftGroupName}
                      onChange={(e) =>
                        setNewShift({ ...newShift, shiftGroupName: e.target.value })
                      }
                      className={errors.shiftGroupName ? "border-red-300 focus:border-red-500" : ""}
                    />
                    {errors.shiftGroupName && (
                      <p className="text-sm text-red-600">{errors.shiftGroupName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="organizationCode" className="text-sm font-medium">
                      Organization Code *
                    </Label>
                    <Input
                      id="organizationCode"
                      placeholder="ORG001"
                      value={newShift.organizationCode}
                      onChange={(e) =>
                        setNewShift({ ...newShift, organizationCode: e.target.value.toUpperCase() })
                      }
                      className={errors.organizationCode ? "border-red-300 focus:border-red-500" : ""}
                    />
                    {errors.organizationCode && (
                      <p className="text-sm text-red-600">{errors.organizationCode}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tenantCode" className="text-sm font-medium">
                      Tenant Code *
                    </Label>
                    <Input
                      id="tenantCode"
                      placeholder="TNT001"
                      value={newShift.tenantCode}
                      onChange={(e) =>
                        setNewShift({ ...newShift, tenantCode: e.target.value.toUpperCase() })
                      }
                      className={errors.tenantCode ? "border-red-300 focus:border-red-500" : ""}
                    />
                    {errors.tenantCode && (
                      <p className="text-sm text-red-600">{errors.tenantCode}</p>
                    )}
                  </div>
                </div>

                {/* Location and Subsidiary */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Location & Subsidiary</h3>

                  <div className="space-y-2">
                    <Label htmlFor="subsidiaryCode" className="text-sm font-medium">
                      Subsidiary Code *
                    </Label>
                    <Input
                      id="subsidiaryCode"
                      placeholder="SUB001"
                      value={newShift.subsidiary?.subsidiaryCode}
                      onChange={(e) =>
                        setNewShift({
                          ...newShift,
                          subsidiary: {
                            ...newShift.subsidiary!,
                            subsidiaryCode: e.target.value.toUpperCase()
                          }
                        })
                      }
                      className={errors.subsidiaryCode ? "border-red-300 focus:border-red-500" : ""}
                    />
                    {errors.subsidiaryCode && (
                      <p className="text-sm text-red-600">{errors.subsidiaryCode}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subsidiaryName" className="text-sm font-medium">
                      Subsidiary Name
                    </Label>
                    <Input
                      id="subsidiaryName"
                      placeholder="Main Branch"
                      value={newShift.subsidiary?.subsidiaryName}
                      onChange={(e) =>
                        setNewShift({
                          ...newShift,
                          subsidiary: {
                            ...newShift.subsidiary!,
                            subsidiaryName: e.target.value
                          }
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="locationCode" className="text-sm font-medium">
                      Location Code *
                    </Label>
                    <Input
                      id="locationCode"
                      placeholder="LOC001"
                      value={newShift.location?.locationCode}
                      onChange={(e) =>
                        setNewShift({
                          ...newShift,
                          location: {
                            ...newShift.location!,
                            locationCode: e.target.value.toUpperCase()
                          }
                        })
                      }
                      className={errors.locationCode ? "border-red-300 focus:border-red-500" : ""}
                    />
                    {errors.locationCode && (
                      <p className="text-sm text-red-600">{errors.locationCode}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="locationName" className="text-sm font-medium">
                      Location Name
                    </Label>
                    <Input
                      id="locationName"
                      placeholder="Bangalore Office"
                      value={newShift.location?.locationName}
                      onChange={(e) =>
                        setNewShift({
                          ...newShift,
                          location: {
                            ...newShift.location!,
                            locationName: e.target.value
                          }
                        })
                      }
                    />
                  </div>
                </div>

                {/* Shift Details */}
                <div className="col-span-1 space-y-4 sm:col-span-2">
                  <h3 className="text-lg font-semibold text-gray-900">Shift Details</h3>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="shiftCode" className="text-sm font-medium">
                        Shift Code *
                      </Label>
                      <Input
                        id="shiftCode"
                        placeholder="SHF001"
                        value={newShift.shift?.[0]?.shiftCode}
                        onChange={(e) =>
                          setNewShift({
                            ...newShift,
                            shift: [
                              {
                                ...newShift.shift![0],
                                shiftCode: e.target.value.toUpperCase()
                              }
                            ]
                          })
                        }
                        className={errors.shiftCode ? "border-red-300 focus:border-red-500" : ""}
                      />
                      {errors.shiftCode && (
                        <p className="text-sm text-red-600">{errors.shiftCode}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="shiftName" className="text-sm font-medium">
                        Shift Name *
                      </Label>
                      <Input
                        id="shiftName"
                        placeholder="Morning Shift"
                        value={newShift.shift?.[0]?.shiftName}
                        onChange={(e) =>
                          setNewShift({
                            ...newShift,
                            shift: [
                              {
                                ...newShift.shift![0],
                                shiftName: e.target.value
                              }
                            ]
                          })
                        }
                        className={errors.shiftName ? "border-red-300 focus:border-red-500" : ""}
                      />
                      {errors.shiftName && (
                        <p className="text-sm text-red-600">{errors.shiftName}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="shiftStart" className="text-sm font-medium">
                        Shift Start Time *
                      </Label>
                      <Input
                        id="shiftStart"
                        type="time"
                        value={newShift.shift?.[0]?.shiftStart}
                        onChange={(e) =>
                          setNewShift({
                            ...newShift,
                            shift: [
                              {
                                ...newShift.shift![0],
                                shiftStart: e.target.value
                              }
                            ]
                          })
                        }
                        className={errors.shiftStart ? "border-red-300 focus:border-red-500" : ""}
                      />
                      {errors.shiftStart && (
                        <p className="text-sm text-red-600">{errors.shiftStart}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="shiftEnd" className="text-sm font-medium">
                        Shift End Time *
                      </Label>
                      <Input
                        id="shiftEnd"
                        type="time"
                        value={newShift.shift?.[0]?.shiftEnd}
                        onChange={(e) =>
                          setNewShift({
                            ...newShift,
                            shift: [
                              {
                                ...newShift.shift![0],
                                shiftEnd: e.target.value
                              }
                            ]
                          })
                        }
                        className={errors.shiftEnd ? "border-red-300 focus:border-red-500" : ""}
                      />
                      {errors.shiftEnd && (
                        <p className="text-sm text-red-600">{errors.shiftEnd}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lunchStart" className="text-sm font-medium">
                        Lunch Start Time
                      </Label>
                      <Input
                        id="lunchStart"
                        type="time"
                        value={newShift.shift?.[0]?.lunchStart}
                        onChange={(e) =>
                          setNewShift({
                            ...newShift,
                            shift: [
                              {
                                ...newShift.shift![0],
                                lunchStart: e.target.value
                              }
                            ]
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lunchEnd" className="text-sm font-medium">
                        Lunch End Time
                      </Label>
                      <Input
                        id="lunchEnd"
                        type="time"
                        value={newShift.shift?.[0]?.lunchEnd}
                        onChange={(e) =>
                          setNewShift({
                            ...newShift,
                            shift: [
                              {
                                ...newShift.shift![0],
                                lunchEnd: e.target.value
                              }
                            ]
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="graceIn" className="text-sm font-medium">
                        Grace In (minutes)
                      </Label>
                      <Input
                        id="graceIn"
                        type="number"
                        value={newShift.shift?.[0]?.graceIn}
                        onChange={(e) =>
                          setNewShift({
                            ...newShift,
                            shift: [
                              {
                                ...newShift.shift![0],
                                graceIn: parseInt(e.target.value)
                              }
                            ]
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="graceOut" className="text-sm font-medium">
                        Grace Out (minutes)
                      </Label>
                      <Input
                        id="graceOut"
                        type="number"
                        value={newShift.shift?.[0]?.graceOut}
                        onChange={(e) =>
                          setNewShift({
                            ...newShift,
                            shift: [
                              {
                                ...newShift.shift![0],
                                graceOut: parseInt(e.target.value)
                              }
                            ]
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="crossDay"
                        checked={newShift.shift?.[0]?.crossDay}
                        onCheckedChange={(checked) =>
                          setNewShift({
                            ...newShift,
                            shift: [
                              {
                                ...newShift.shift![0],
                                crossDay: checked as boolean
                              }
                            ]
                          })
                        }
                      />
                      <Label htmlFor="crossDay" className="text-sm font-medium">Cross Day Shift</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="flexible"
                        checked={newShift.shift?.[0]?.flexible}
                        onCheckedChange={(checked) =>
                          setNewShift({
                            ...newShift,
                            shift: [
                              {
                                ...newShift.shift![0],
                                flexible: checked as boolean
                              }
                            ]
                          })
                        }
                      />
                      <Label htmlFor="flexible" className="text-sm font-medium">Flexible Shift</Label>
                    </div>
                  </div>
                </div>

                {/* Employee Categories */}
                <div className="col-span-1 space-y-4 sm:col-span-2">
                  <h3 className="text-lg font-semibold text-gray-900">Employee Categories</h3>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Select Categories *</Label>
                    <div className="flex flex-wrap gap-2">
                      {["WKM", "Cat1", "Cat2", "Cat3", "Cat4"].map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox
                            id={category}
                            checked={newShift.employeeCategory?.includes(category)}
                            onCheckedChange={(checked) => {
                              const updatedCategories = checked
                                ? [...(newShift.employeeCategory || []), category]
                                : (newShift.employeeCategory || []).filter(
                                    (c) => c !== category
                                  )
                              setNewShift({
                                ...newShift,
                                employeeCategory: updatedCategories
                              })
                            }}
                          />
                          <Label htmlFor={category} className="text-sm font-medium">{category}</Label>
                        </div>
                      ))}
                    </div>
                    {errors.employeeCategory && (
                      <p className="text-sm text-red-600">{errors.employeeCategory}</p>
                    )}
                  </div>
                </div>
              </div>

              <DialogFooter className="gap-2 mt-6">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} disabled={isLoading}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      {editingShift ? "Updating..." : "Adding..."}
                    </div>
                  ) : editingShift ? (
                    "Update Shift"
                  ) : (
                    "Add Shift"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
} 