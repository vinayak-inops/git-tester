"use client"

import { Badge } from "@repo/ui/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Building2, Hash, FileText, MapPin, Mail, Phone, Globe, Edit3 } from "lucide-react"
import { Button } from "@repo/ui/components/ui/button"

interface Country {
  countryCode: string
  countryName: string
}

interface OrganizationData {
  country: Country[]
  logoFileName: string
  description: string
  emailId: string
  contactPersonContactNumber: string
  registrationNo: string
  tenantCode: string
  organizationName: string
  organizationCode: string
  addressLine1: string | null
  addressLine2: string | null
  city: string
  pinCode: string
}

// Sample data based on your structure
const organizationData: OrganizationData = {
  country: [
    { countryCode: "IN", countryName: "India" },
    { countryCode: "US", countryName: "United States" },
    { countryCode: "DE", countryName: "Germany" },
    { countryCode: "BR", countryName: "Brazil" },
    { countryCode: "ZA", countryName: "South Africa" },
    { countryCode: "JP", countryName: "Japan" },
    { countryCode: "FR", countryName: "France" },
    { countryCode: "RU", countryName: "Russia" },
    { countryCode: "AU", countryName: "Australia" },
    { countryCode: "CN", countryName: "China" },
  ],
  logoFileName: "bb31b165-26ec-4ff0-8580-dfb7520beb37.png",
  description:
    "Leading automotive manufacturer specializing in commercial vehicles, buses, and defense systems. Ashok Leyland is committed to providing innovative transportation solutions that drive progress and connectivity across global markets.",
  emailId: "d@d.com",
  contactPersonContactNumber: "3456564",
  registrationNo: "3534646457457",
  tenantCode: "tenant1",
  organizationName: "Ashok Leyland Limited New",
  organizationCode: "ALL",
  addressLine1: null,
  addressLine2: null,
  city: "Hosur",
  pinCode: "411029",
}

export default function OrganizationInfo() {
  const handleEdit = () => {
    console.log("Edit organization information")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      <div className=" p-6 px-12 space-y-8">
        {/* Header Section with Logo */}
        <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white overflow-hidden">
          <CardContent className="p-8 relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">
              {/* Logo Display */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 shadow-lg">
                  <img
                    src={`/placeholder.svg?height=80&width=80`}
                    alt="Organization Logo"
                    className="w-16 h-16 object-contain"
                  />
                </div>
              </div>

              {/* Organization Header Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <h1 className="text-3xl font-bold text-white drop-shadow-sm">{organizationData.organizationName}</h1>
                  <Button
                    onClick={handleEdit}
                    variant="secondary"
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-blue-100">
                  <span className="flex items-center gap-2 bg-white/15 px-3 py-1 rounded-full backdrop-blur-sm">
                    <Hash className="h-4 w-4" />
                    {organizationData.organizationCode}
                  </span>
                  <span className="flex items-center gap-2 bg-white/15 px-3 py-1 rounded-full backdrop-blur-sm">
                    <Building2 className="h-4 w-4" />
                    {organizationData.tenantCode}
                  </span>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-0 shadow-sm">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                    Active
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Basic Information */}
          <Card className="border-0 shadow-lg bg-white overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-400 to-blue-500 text-white">
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className="p-2 bg-white/20 rounded-lg">
                  <FileText className="h-5 w-5" />
                </div>
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
                    <Building2 className="h-4 w-4" />
                    Organization Name
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
                    <p className="font-semibold text-gray-800">{organizationData.organizationName}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
                    <Hash className="h-4 w-4" />
                    Organization Code
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
                    <p className="font-semibold text-gray-800">{organizationData.organizationCode}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
                  <FileText className="h-4 w-4" />
                  Registration Number
                </div>
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <p className="font-mono text-gray-800 font-medium">{organizationData.registrationNo}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium text-blue-600">Description</div>
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-300 shadow-sm">
                  <p className="text-gray-700 leading-relaxed">{organizationData.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Information */}
          <Card className="border-0 shadow-lg bg-white overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Hash className="h-5 w-5" />
                </div>
                System Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
                    <Hash className="h-4 w-4" />
                    Organization Code
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
                    <p className="font-semibold text-gray-800">{organizationData.organizationCode}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
                    <Hash className="h-4 w-4" />
                    Tenant Code
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
                    <p className="font-semibold text-gray-800">{organizationData.tenantCode}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium text-blue-600">Active Status</div>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 px-3 py-1 text-sm border-0">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                  Active
                </Badge>
              </div>

              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-5 text-white shadow-md">
                <h4 className="font-semibold mb-3 text-lg flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                  Quick Overview
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-100">Organization Code:</span>
                    <span className="font-semibold bg-white/20 backdrop-blur-sm px-3 py-1 rounded">
                      {organizationData.organizationCode}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-100">Tenant:</span>
                    <span className="font-semibold bg-white/20 backdrop-blur-sm px-3 py-1 rounded">
                      {organizationData.tenantCode}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <Card className="border-0 shadow-lg bg-white overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-400 to-blue-500 text-white">
            <CardTitle className="flex items-center gap-3 text-lg">
              <div className="p-2 bg-white/20 rounded-lg">
                <Phone className="h-5 w-5" />
              </div>
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
                  <Mail className="h-4 w-4" />
                  Email Address
                </div>
                <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400 shadow-sm">
                  <p className="font-semibold text-gray-800">{organizationData.emailId}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
                  <Phone className="h-4 w-4" />
                  Contact Number
                </div>
                <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400 shadow-sm">
                  <p className="font-semibold text-gray-800">{organizationData.contactPersonContactNumber}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
                  <MapPin className="h-4 w-4" />
                  Location
                </div>
                <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400 shadow-sm">
                  <p className="font-semibold text-gray-800">
                    {organizationData.city}, {organizationData.pinCode}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Countries */}
        <Card className="border-0 shadow-lg bg-white overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardTitle className="flex items-center gap-3 text-lg">
              <div className="p-2 bg-white/20 rounded-lg">
                <Globe className="h-5 w-5" />
              </div>
              Operating Countries
              <Badge className="bg-white/20 text-white ml-2 border-0">{organizationData.country.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {organizationData.country.map((country, index) => (
                <div
                  key={country.countryCode}
                  className="group hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200 hover:border-blue-400 hover:bg-blue-100 transition-all duration-300">
                    <div className="w-8 h-6 bg-gradient-to-r from-blue-400 to-blue-500 rounded flex items-center justify-center text-xs font-bold text-white shadow-sm">
                      {country.countryCode}
                    </div>
                    <span className="text-sm font-medium text-gray-800 group-hover:text-blue-700 transition-colors">
                      {country.countryName}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
