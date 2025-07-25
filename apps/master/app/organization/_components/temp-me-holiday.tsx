"use client"

import { useState, useEffect } from "react"
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Calendar as CalendarIcon,
  Download,
  Upload,
  CheckCircle,
  AlertCircle,
  X,
  Building2,
  MapPin,
  Users,
} from "lucide-react"
import * as z from "zod"
import { format } from "date-fns"

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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/ui/popover"
import { Calendar } from "@repo/ui/components/ui/calendar"
import { cn } from "@repo/ui/lib/utils"

// Holiday form schema
const holidayFormSchema = z.object({
  organizationCode: z.string().min(1, "Organization code is required"),
  tenantCode: z.string().min(1, "Tenant code is required"),
  subsidiary: z.object({
    subsidiaryCode: z.string().min(1, "Subsidiary code is required"),
    subsidiaryName: z.string().min(1, "Subsidiary name is required"),
  }),
  location: z.object({
    locationCode: z.string().min(1, "Location code is required"),
    locationName: z.string().min(1, "Location name is required"),
  }),
  employeeCategory: z.array(z.string()).min(1, "At least one employee category is required"),
  holiday: z.object({
    holidayName: z.string().min(1, "Holiday name is required"),
    holidayDate: z.date({
      required_error: "Holiday date is required",
    }),
    holidayType: z.string().min(1, "Holiday type is required"),
  }),
  isActive: z.boolean().default(true),
})

type HolidayFormValues = z.infer<typeof holidayFormSchema>

interface Holiday {
  id: string
  organizationCode: string
  tenantCode: string
  subsidiary: {
    subsidiaryCode: string
    subsidiaryName: string
  }
  location: {
    locationCode: string
    locationName: string
  }
  employeeCategory: string[]
  holiday: {
    holidayName: string
    holidayDate: Date
    holidayType: string
  }
  isActive: boolean
  createdAt: string
}

// Employee category options
const employeeCategoryOptions = [
  { label: "Workmen", value: "WKM" },
  { label: "Category 2", value: "Cat2" },
  { label: "Category 3", value: "Cat3" },
  { label: "Management", value: "MGT" },
  { label: "Executive", value: "EXE" },
]

// Holiday type options
const holidayTypeOptions = [
  { label: "National", value: "National" },
  { label: "Regional", value: "Regional" },
  { label: "Company", value: "Company" },
  { label: "Optional", value: "Optional" },
  { label: "Religious", value: "Religious" },
]

export default function HolidayManagement() {
  const [holidays, setHolidays] = useState<Holiday[]>([
    {
      id: "1",
      organizationCode: "ALL",
      tenantCode: "tenant01",
      subsidiary: {
        subsidiaryCode: "sub1",
        subsidiaryName: "subsidiary001",
      },
      location: {
        locationCode: "LOC001",
        locationName: "Bangalore",
      },
      employeeCategory: ["WKM", "Cat2", "Cat3"],
      holiday: {
        holidayName: "Gandhi Jayanti",
        holidayDate: new Date("2024-10-02"),
        holidayType: "National",
      },
      isActive: true,
      createdAt: "2024-01-15",
    }
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingHoliday, setEditingHoliday] = useState<Holiday | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [newHoliday, setNewHoliday] = useState<Partial<Holiday>>({
    organizationCode: "ALL",
    tenantCode: "tenant01",
    subsidiary: {
      subsidiaryCode: "sub1",
      subsidiaryName: "subsidiary001",
    },
    location: {
      locationCode: "LOC001",
      locationName: "Bangalore",
    },
    employeeCategory: ["WKM", "Cat2", "Cat3"],
    holiday: {
      holidayName: "Gandhi Jayanti",
      holidayDate: new Date("2024-10-02"),
      holidayType: "National",
    },
    isActive: true,
  })

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredHolidays = holidays.filter((holiday) => {
    const matchesSearch = 
      holiday.holiday.holidayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      holiday.holiday.holidayType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      holiday.location.locationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      holiday.subsidiary.subsidiaryName.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && holiday.isActive) ||
      (filterStatus === "inactive" && !holiday.isActive)

    return matchesSearch && matchesStatus
  })

  // Calculate pagination
  const totalPages = Math.ceil(filteredHolidays.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedHolidays = filteredHolidays.slice(startIndex, startIndex + itemsPerPage)

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, filterStatus])

  const validateForm = (data: Partial<Holiday>) => {
    const newErrors: Record<string, string> = {}

    if (!data.organizationCode?.trim()) newErrors.organizationCode = "Organization code is required"
    if (!data.tenantCode?.trim()) newErrors.tenantCode = "Tenant code is required"
    if (!data.subsidiary?.subsidiaryCode?.trim()) newErrors.subsidiaryCode = "Subsidiary code is required"
    if (!data.subsidiary?.subsidiaryName?.trim()) newErrors.subsidiaryName = "Subsidiary name is required"
    if (!data.location?.locationCode?.trim()) newErrors.locationCode = "Location code is required"
    if (!data.location?.locationName?.trim()) newErrors.locationName = "Location name is required"
    if (!data.holiday?.holidayName?.trim()) newErrors.holidayName = "Holiday name is required"
    if (!data.holiday?.holidayType?.trim()) newErrors.holidayType = "Holiday type is required"
    if (!data.employeeCategory?.length) newErrors.employeeCategory = "At least one employee category is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddHoliday = async () => {
    if (!validateForm(newHoliday)) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const holiday: Holiday = {
      ...(newHoliday as Holiday),
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
    }

    setHolidays([...holidays, holiday])
    resetForm()
    setIsLoading(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleEditHoliday = async () => {
    if (!editingHoliday || !validateForm(newHoliday)) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setHolidays(
      holidays.map((hol) => (hol.id === editingHoliday.id ? { ...hol, ...newHoliday } as Holiday : hol)),
    )

    resetForm()
    setIsLoading(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleDeleteHoliday = async (id: string) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setHolidays(holidays.filter((holiday) => holiday.id !== id))
    setIsLoading(false)
  }

  const handleToggleStatus = async (id: string) => {
    setHolidays(holidays.map((hol) => (hol.id === id ? { ...hol, isActive: !hol.isActive } : hol)))
  }

  const resetForm = () => {
    setNewHoliday({
      organizationCode: "ALL",
      tenantCode: "tenant01",
      subsidiary: {
        subsidiaryCode: "sub1",
        subsidiaryName: "subsidiary001",
      },
      location: {
        locationCode: "LOC001",
        locationName: "Bangalore",
      },
      employeeCategory: ["WKM", "Cat2", "Cat3"],
      holiday: {
        holidayName: "Gandhi Jayanti",
        holidayDate: new Date("2024-10-02"),
        holidayType: "National",
      },
      isActive: true,
    })
    setEditingHoliday(null)
    setIsAddDialogOpen(false)
    setErrors({})
  }

  const startEdit = (holiday: Holiday) => {
    setEditingHoliday(holiday)
    setNewHoliday(holiday)
    setIsAddDialogOpen(true)
  }

  const activeHolidays = holidays.filter((hol) => hol.isActive).length
  const inactiveHolidays = holidays.length - activeHolidays

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 sm:p-6">
      <div className="px-4 space-y-6">
        {/* Success Alert */}
        {showSuccess && (
          <Alert className="border-green-200 bg-green-50 text-green-800 animate-in slide-in-from-top-2 duration-300">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>Holiday {editingHoliday ? "updated" : "added"} successfully!</AlertDescription>
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
              <CalendarIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Holiday Management
              </h1>
              <p className="text-gray-600 mt-1 text-lg">Manage your organization holidays efficiently</p>
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
                    setEditingHoliday(null)
                    resetForm()
                  }}
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Holiday
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-xl">
                    <CalendarIcon className="h-6 w-6 text-blue-600" />
                    {editingHoliday ? "Edit Holiday" : "Add New Holiday"}
                  </DialogTitle>
                  <DialogDescription>
                    {editingHoliday
                      ? "Update the holiday details below."
                      : "Enter the details for the new holiday below."}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Organization Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Organization Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="organizationCode" className="text-sm font-medium">
                          Organization Code *
                        </Label>
                        <Input
                          id="organizationCode"
                          placeholder="ALL"
                          value={newHoliday.organizationCode}
                          onChange={(e) => setNewHoliday({ ...newHoliday, organizationCode: e.target.value.toUpperCase() })}
                          className={errors.organizationCode ? "border-red-300 focus:border-red-500" : ""}
                        />
                        {errors.organizationCode && <p className="text-sm text-red-600">{errors.organizationCode}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tenantCode" className="text-sm font-medium">
                          Tenant Code *
                        </Label>
                        <Input
                          id="tenantCode"
                          placeholder="tenant01"
                          value={newHoliday.tenantCode}
                          onChange={(e) => setNewHoliday({ ...newHoliday, tenantCode: e.target.value })}
                          className={errors.tenantCode ? "border-red-300 focus:border-red-500" : ""}
                        />
                        {errors.tenantCode && <p className="text-sm text-red-600">{errors.tenantCode}</p>}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Subsidiary Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Subsidiary Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="subsidiaryCode" className="text-sm font-medium">
                          Subsidiary Code *
                        </Label>
                        <Input
                          id="subsidiaryCode"
                          placeholder="sub1"
                          value={newHoliday.subsidiary?.subsidiaryCode}
                          onChange={(e) => setNewHoliday({ 
                            ...newHoliday, 
                            subsidiary: { 
                              ...newHoliday.subsidiary!, 
                              subsidiaryCode: e.target.value 
                            } 
                          })}
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
                          placeholder="subsidiary001"
                          value={newHoliday.subsidiary?.subsidiaryName}
                          onChange={(e) => setNewHoliday({ 
                            ...newHoliday, 
                            subsidiary: { 
                              ...newHoliday.subsidiary!, 
                              subsidiaryName: e.target.value 
                            } 
                          })}
                          className={errors.subsidiaryName ? "border-red-300 focus:border-red-500" : ""}
                        />
                        {errors.subsidiaryName && <p className="text-sm text-red-600">{errors.subsidiaryName}</p>}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Location Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Location Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="locationCode" className="text-sm font-medium">
                          Location Code *
                        </Label>
                        <Input
                          id="locationCode"
                          placeholder="LOC001"
                          value={newHoliday.location?.locationCode}
                          onChange={(e) => setNewHoliday({ 
                            ...newHoliday, 
                            location: { 
                              ...newHoliday.location!, 
                              locationCode: e.target.value.toUpperCase() 
                            } 
                          })}
                          className={errors.locationCode ? "border-red-300 focus:border-red-500" : ""}
                        />
                        {errors.locationCode && <p className="text-sm text-red-600">{errors.locationCode}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="locationName" className="text-sm font-medium">
                          Location Name *
                        </Label>
                        <Input
                          id="locationName"
                          placeholder="Bangalore"
                          value={newHoliday.location?.locationName}
                          onChange={(e) => setNewHoliday({ 
                            ...newHoliday, 
                            location: { 
                              ...newHoliday.location!, 
                              locationName: e.target.value 
                            } 
                          })}
                          className={errors.locationName ? "border-red-300 focus:border-red-500" : ""}
                        />
                        {errors.locationName && <p className="text-sm text-red-600">{errors.locationName}</p>}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Employee Category */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Employee Category</h3>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Employee Categories *</Label>
                      <Select
                        value={newHoliday.employeeCategory?.[0] || ""}
                        onValueChange={(value) => {
                          const currentValues = newHoliday.employeeCategory || []
                          if (!currentValues.includes(value)) {
                            setNewHoliday({ 
                              ...newHoliday, 
                              employeeCategory: [...currentValues, value] 
                            })
                          }
                        }}
                      >
                        <SelectTrigger className={errors.employeeCategory ? "border-red-300 focus:border-red-500" : ""}>
                          <SelectValue placeholder="Select employee categories" />
                        </SelectTrigger>
                        <SelectContent>
                          {employeeCategoryOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-gray-600">
                        Selected categories: {newHoliday.employeeCategory?.join(", ") || "None"}
                      </p>
                      {errors.employeeCategory && <p className="text-sm text-red-600">{errors.employeeCategory}</p>}
                    </div>
                  </div>

                  <Separator />

                  {/* Holiday Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Holiday Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="holidayName" className="text-sm font-medium">
                          Holiday Name *
                        </Label>
                        <Input
                          id="holidayName"
                          placeholder="Gandhi Jayanti"
                          value={newHoliday.holiday?.holidayName}
                          onChange={(e) => setNewHoliday({ 
                            ...newHoliday, 
                            holiday: { 
                              ...newHoliday.holiday!, 
                              holidayName: e.target.value 
                            } 
                          })}
                          className={errors.holidayName ? "border-red-300 focus:border-red-500" : ""}
                        />
                        {errors.holidayName && <p className="text-sm text-red-600">{errors.holidayName}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="holidayType" className="text-sm font-medium">
                          Holiday Type *
                        </Label>
                        <Select 
                          value={newHoliday.holiday?.holidayType} 
                          onValueChange={(value) => setNewHoliday({ 
                            ...newHoliday, 
                            holiday: { 
                              ...newHoliday.holiday!, 
                              holidayType: value 
                            } 
                          })}
                        >
                          <SelectTrigger className={errors.holidayType ? "border-red-300 focus:border-red-500" : ""}>
                            <SelectValue placeholder="Select holiday type" />
                          </SelectTrigger>
                          <SelectContent>
                            {holidayTypeOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.holidayType && <p className="text-sm text-red-600">{errors.holidayType}</p>}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="holidayDate" className="text-sm font-medium">
                        Holiday Date *
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !newHoliday.holiday?.holidayDate && "text-muted-foreground"
                            )}
                          >
                            {newHoliday.holiday?.holidayDate ? (
                              format(newHoliday.holiday.holidayDate, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <Calendar className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={newHoliday.holiday?.holidayDate}
                            onSelect={(date) => {
                              if (date) {
                                setNewHoliday({ 
                                  ...newHoliday, 
                                  holiday: { 
                                    ...newHoliday.holiday!, 
                                    holidayDate: date 
                                  } 
                                })
                              }
                            }}
                            disabled={(date: Date) =>
                              date < new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <Separator />

                  {/* Status */}
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium">Status</Label>
                      <p className="text-sm text-gray-600">Enable or disable this holiday</p>
                    </div>
                    <Switch
                      checked={newHoliday.isActive}
                      onCheckedChange={(checked) => setNewHoliday({ ...newHoliday, isActive: checked })}
                    />
                  </div>
                </div>

                <DialogFooter className="gap-2 mt-6">
                  <Button variant="outline" onClick={resetForm} disabled={isLoading}>
                    Cancel
                  </Button>
                  <Button
                    onClick={editingHoliday ? handleEditHoliday : handleAddHoliday}
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        {editingHoliday ? "Updating..." : "Adding..."}
                      </div>
                    ) : editingHoliday ? (
                      "Update Holiday"
                    ) : (
                      "Add Holiday"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Holidays</p>
                  <p className="text-3xl font-bold">{holidays.length}</p>
                </div>
                <CalendarIcon className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Active</p>
                  <p className="text-3xl font-bold">{activeHolidays}</p>
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
                  <p className="text-3xl font-bold">{inactiveHolidays}</p>
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
                  placeholder="Search holidays by name, type, location..."
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

        {/* Holidays Table */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold text-gray-900">
                Holidays ({filteredHolidays.length})
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
                    <TableHead className="font-semibold text-gray-700">Holiday Name</TableHead>
                    <TableHead className="font-semibold text-gray-700">Date</TableHead>
                    <TableHead className="font-semibold text-gray-700">Type</TableHead>
                    <TableHead className="font-semibold text-gray-700">Location</TableHead>
                    <TableHead className="font-semibold text-gray-700">Subsidiary</TableHead>
                    <TableHead className="font-semibold text-gray-700">Categories</TableHead>
                    <TableHead className="font-semibold text-gray-700">Status</TableHead>
                    <TableHead className="font-semibold text-gray-700 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedHolidays.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="h-32 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <CalendarIcon className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-lg font-medium text-gray-900 mb-1">No holidays found</p>
                          <p className="text-gray-500">
                            {searchTerm || filterStatus !== "all"
                              ? "Try adjusting your search criteria or filters"
                              : "Get started by adding your first holiday"}
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedHolidays.map((holiday) => (
                      <TableRow key={holiday.id} className="hover:bg-gray-50/50 transition-all duration-200 group">
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900">{holiday.holiday.holidayName}</p>
                            <p className="text-sm text-gray-500">Created {holiday.createdAt}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {format(holiday.holiday.holidayDate, "MMM dd, yyyy")}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                            {holiday.holiday.holidayType}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <div>
                              <p className="font-medium text-gray-900">{holiday.location.locationName}</p>
                              <p className="text-sm text-gray-500">{holiday.location.locationCode}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-gray-400" />
                            <div>
                              <p className="font-medium text-gray-900">{holiday.subsidiary.subsidiaryName}</p>
                              <p className="text-sm text-gray-500">{holiday.subsidiary.subsidiaryCode}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {holiday.employeeCategory.map((category) => (
                              <Badge key={category} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                {category}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Switch checked={holiday.isActive} onCheckedChange={() => handleToggleStatus(holiday.id)} />
                            <Badge
                              variant={holiday.isActive ? "default" : "secondary"}
                              className={holiday.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}
                            >
                              {holiday.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                              onClick={() => startEdit(holiday)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                              onClick={() => handleDeleteHoliday(holiday.id)}
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
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredHolidays.length)} of{" "}
                {filteredHolidays.length} entries
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

