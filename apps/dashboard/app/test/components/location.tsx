"use client"

import { useState } from "react"
import {
  Search,
  Plus,
  Edit,
  Trash2,
  MapPin,
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


interface Location {
  id: string
  code: string
  name: string
  region: string
  state: string
  city: string
  pincode: string
  address?: string
  isActive: boolean
  createdAt: string
  organizationCode: string
  type: "office" | "warehouse" | "retail" | "branch"
}

export default function LocationManagement() {
  const [locations, setLocations] = useState<Location[]>([
    {
      id: "1",
      code: "LOC001",
      name: "Mumbai Office",
      region: "WI",
      state: "MH",
      city: "Mumbai",
      pincode: "400001",
      address: "Bandra Kurla Complex, Mumbai",
      isActive: true,
      createdAt: "2024-01-15",
      organizationCode: "aaa",
      type: "office",
    },
    {
      id: "2",
      code: "LOC002",
      name: "Delhi Warehouse",
      region: "NI",
      state: "DL",
      city: "Delhi",
      pincode: "110001",
      address: "Connaught Place, New Delhi",
      isActive: true,
      createdAt: "2024-02-10",
      organizationCode: "aaa",
      type: "warehouse",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterRegion, setFilterRegion] = useState("all")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingLocation, setEditingLocation] = useState<Location | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [newLocation, setNewLocation] = useState<Partial<Location>>({
    code: "",
    name: "",
    region: "",
    state: "",
    city: "",
    pincode: "",
    address: "",
    isActive: true,
    type: "office",
  })

  const regions = [
    { value: "NI", label: "North India" },
    { value: "SI", label: "South India" },
    { value: "WI", label: "West India" },
    { value: "EI", label: "East India" },
  ]

  const locationTypes = [
    { value: "office", label: "Office", icon: "🏢" },
    { value: "warehouse", label: "Warehouse", icon: "🏭" },
    { value: "retail", label: "Retail Store", icon: "🏪" },
    { value: "branch", label: "Branch", icon: "🏦" },
  ]

  const filteredLocations = locations.filter((location) => {
    const matchesSearch = Object.values(location).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    )
    const matchesRegion = filterRegion === "all" || location.region === filterRegion
    const matchesType = filterType === "all" || location.type === filterType
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && location.isActive) ||
      (filterStatus === "inactive" && !location.isActive)

    return matchesSearch && matchesRegion && matchesType && matchesStatus
  })

  const validateForm = (data: Partial<Location>) => {
    const newErrors: Record<string, string> = {}

    if (!data.code?.trim()) newErrors.code = "Location code is required"
    if (!data.name?.trim()) newErrors.name = "Location name is required"
    if (!data.region) newErrors.region = "Region is required"
    if (!data.state?.trim()) newErrors.state = "State is required"
    if (!data.city?.trim()) newErrors.city = "City is required"
    if (!data.pincode?.trim()) newErrors.pincode = "Pincode is required"
    else if (!/^\d{6}$/.test(data.pincode)) newErrors.pincode = "Pincode must be 6 digits"

    // Check for duplicate code
    const isDuplicate = locations.some((loc) => loc.code === data.code && loc.id !== editingLocation?.id)
    if (isDuplicate) newErrors.code = "Location code already exists"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddLocation = async () => {
    if (!validateForm(newLocation)) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const location: Location = {
      ...(newLocation as Location),
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
    }

    setLocations([...locations, location])
    resetForm()
    setIsLoading(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleEditLocation = async () => {
    if (!editingLocation || !validateForm(newLocation)) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setLocations(
      locations.map((loc) => (loc.id === editingLocation.id ? ({ ...loc, ...newLocation } as Location) : loc)),
    )

    resetForm()
    setIsLoading(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleDeleteLocation = async (id: string) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setLocations(locations.filter((location) => location.id !== id))
    setIsLoading(false)
  }

  const handleToggleStatus = async (id: string) => {
    setLocations(locations.map((loc) => (loc.id === id ? { ...loc, isActive: !loc.isActive } : loc)))
  }

  const resetForm = () => {
    setNewLocation({
      code: "",
      name: "",
      region: "",
      state: "",
      city: "",
      pincode: "",
      address: "",
      isActive: true,
      type: "office",
    })
    setEditingLocation(null)
    setIsAddDialogOpen(false)
    setErrors({})
  }

  const startEdit = (location: Location) => {
    setEditingLocation(location)
    setNewLocation(location)
    setIsAddDialogOpen(true)
  }

  const getTypeIcon = (type: string) => {
    return locationTypes.find((t) => t.value === type)?.icon || "🏢"
  }

  const activeLocations = locations.filter((loc) => loc.isActive).length
  const inactiveLocations = locations.length - activeLocations

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Success Alert */}
        {showSuccess && (
          <Alert className="border-green-200 bg-green-50 text-green-800 animate-in slide-in-from-top-2 duration-300">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>Location {editingLocation ? "updated" : "added"} successfully!</AlertDescription>
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
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg">
              <MapPin className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Location Management
              </h1>
              <p className="text-gray-600 mt-1 text-lg">Manage your office locations and branches efficiently</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
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
                    setEditingLocation(null)
                    resetForm()
                  }}
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Location
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-xl">
                    <Building2 className="h-6 w-6 text-blue-600" />
                    {editingLocation ? "Edit Location" : "Add New Location"}
                  </DialogTitle>
                  <DialogDescription>
                    {editingLocation
                      ? "Update the location details below."
                      : "Enter the details for the new location below."}
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="code" className="text-sm font-medium">
                          Location Code *
                        </Label>
                        <Input
                          id="code"
                          placeholder="LOC003"
                          value={newLocation.code}
                          onChange={(e) => setNewLocation({ ...newLocation, code: e.target.value.toUpperCase() })}
                          className={errors.code ? "border-red-300 focus:border-red-500" : ""}
                        />
                        {errors.code && <p className="text-sm text-red-600">{errors.code}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium">
                          Location Name *
                        </Label>
                        <Input
                          id="name"
                          placeholder="Bangalore Office"
                          value={newLocation.name}
                          onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
                          className={errors.name ? "border-red-300 focus:border-red-500" : ""}
                        />
                        {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                      <Label htmlFor="organizationCode" className="text-sm font-medium">
                        Organization Code *
                      </Label>
                      <Input
                        id="organizationCode"
                        placeholder="ORG001"
                        value={newLocation.organizationCode}
                        onChange={(e) => setNewLocation({ ...newLocation, organizationCode: e.target.value.toUpperCase() })}
                        className={errors.organizationCode ? "border-red-300 focus:border-red-500" : ""}
                      />
                      {errors.organizationCode && <p className="text-sm text-red-600">{errors.organizationCode}</p>}

                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="region" className="text-sm font-medium">
                          Region *
                        </Label>
                        <Select
                          value={newLocation.region}
                          onValueChange={(value) => setNewLocation({ ...newLocation, region: value })}
                        >
                          <SelectTrigger className={errors.region ? "border-red-300 focus:border-red-500" : ""}>
                            <SelectValue placeholder="Select region" />
                          </SelectTrigger>
                          <SelectContent>
                            {regions.map((region) => (
                              <SelectItem key={region.value} value={region.value}>
                                {region.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.region && <p className="text-sm text-red-600">{errors.region}</p>}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Address Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Address Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="state" className="text-sm font-medium">
                          State *
                        </Label>
                        <Input
                          id="state"
                          placeholder="KA"
                          value={newLocation.state}
                          onChange={(e) => setNewLocation({ ...newLocation, state: e.target.value.toUpperCase() })}
                          className={errors.state ? "border-red-300 focus:border-red-500" : ""}
                        />
                        {errors.state && <p className="text-sm text-red-600">{errors.state}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-sm font-medium">
                          City *
                        </Label>
                        <Input
                          id="city"
                          placeholder="Bangalore"
                          value={newLocation.city}
                          onChange={(e) => setNewLocation({ ...newLocation, city: e.target.value })}
                          className={errors.city ? "border-red-300 focus:border-red-500" : ""}
                        />
                        {errors.city && <p className="text-sm text-red-600">{errors.city}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pincode" className="text-sm font-medium">
                          Pincode *
                        </Label>
                        <Input
                          id="pincode"
                          placeholder="560001"
                          value={newLocation.pincode}
                          onChange={(e) =>
                            setNewLocation({ ...newLocation, pincode: e.target.value.replace(/\D/g, "").slice(0, 6) })
                          }
                          className={errors.pincode ? "border-red-300 focus:border-red-500" : ""}
                        />
                        {errors.pincode && <p className="text-sm text-red-600">{errors.pincode}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-sm font-medium">
                        Full Address
                      </Label>
                      <Textarea
                        id="address"
                        placeholder="Enter complete address..."
                        value={newLocation.address}
                        onChange={(e) => setNewLocation({ ...newLocation, address: e.target.value })}
                        rows={3}
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Status */}
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium">Status</Label>
                      <p className="text-sm text-gray-600">Enable or disable this location</p>
                    </div>
                    <Switch
                      checked={newLocation.isActive}
                      onCheckedChange={(checked) => setNewLocation({ ...newLocation, isActive: checked })}
                    />
                  </div>
                </div>

                <DialogFooter className="gap-2">
                  <Button variant="outline" onClick={resetForm} disabled={isLoading}>
                    Cancel
                  </Button>
                  <Button
                    onClick={editingLocation ? handleEditLocation : handleAddLocation}
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        {editingLocation ? "Updating..." : "Adding..."}
                      </div>
                    ) : editingLocation ? (
                      "Update Location"
                    ) : (
                      "Add Location"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Locations</p>
                  <p className="text-3xl font-bold">{locations.length}</p>
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
                  <p className="text-3xl font-bold">{activeLocations}</p>
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
                  <p className="text-3xl font-bold">{inactiveLocations}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Regions</p>
                  <p className="text-3xl font-bold">{new Set(locations.map((l) => l.region)).size}</p>
                </div>
                <MapPin className="h-8 w-8 text-purple-200" />
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
                  placeholder="Search locations by name, code, city..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-11 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <Select value={filterRegion} onValueChange={setFilterRegion}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="All Regions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    {regions.map((region) => (
                      <SelectItem key={region.value} value={region.value}>
                        {region.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {locationTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.icon} {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

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
            </div>

            {(searchTerm || filterRegion !== "all" || filterType !== "all" || filterStatus !== "all") && (
              <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                <span className="text-sm text-gray-600">Active filters:</span>
                {searchTerm && (
                  <Badge variant="secondary" className="gap-1">
                    Search: {searchTerm}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchTerm("")} />
                  </Badge>
                )}
                {filterRegion !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    Region: {regions.find((r) => r.value === filterRegion)?.label}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setFilterRegion("all")} />
                  </Badge>
                )}
                {filterType !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    Type: {locationTypes.find((t) => t.value === filterType)?.label}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setFilterType("all")} />
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

        {/* Locations Table */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold text-gray-900">
                Locations ({filteredLocations.length})
              </CardTitle>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Showing {filteredLocations.length} of {locations.length}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50/80">
                    <TableHead className="font-semibold text-gray-700">Code</TableHead>
                    <TableHead className="font-semibold text-gray-700">Location</TableHead>
                    <TableHead className="font-semibold text-gray-700">Organization</TableHead>
                    <TableHead className="font-semibold text-gray-700">Region</TableHead>
                    <TableHead className="font-semibold text-gray-700">Address</TableHead>
                    <TableHead className="font-semibold text-gray-700">Status</TableHead>
                    <TableHead className="font-semibold text-gray-700 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLocations.map((location) => (
                    <TableRow key={location.id} className="hover:bg-gray-50/50 transition-all duration-200 group">
                      <TableCell className="font-mono text-blue-600 font-medium">{location.code}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-900">{location.name}</p>
                          <p className="text-sm text-gray-500">
                            {location.city}, {location.state}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                            {location.organizationCode}
                          </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {regions.find((r) => r.value === location.region)?.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <p className="text-sm text-gray-600 truncate">
                          {location.address || `${location.city}, ${location.state} - ${location.pincode}`}
                        </p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={location.isActive}
                            onCheckedChange={() => handleToggleStatus(location.id)}
                          />
                          <Badge
                            variant={location.isActive ? "default" : "secondary"}
                            className={location.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}
                          >
                            {location.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                            onClick={() => startEdit(location)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                            onClick={() => handleDeleteLocation(location.id)}
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

            {filteredLocations.length === 0 && (
              <div className="text-center py-16">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No locations found</h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm || filterRegion !== "all" || filterType !== "all" || filterStatus !== "all"
                    ? "Try adjusting your search criteria or filters"
                    : "Get started by adding your first location"}
                </p>
                {!searchTerm && filterRegion === "all" && filterType === "all" && filterStatus === "all" && (
                  <Button onClick={() => setIsAddDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Location
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
