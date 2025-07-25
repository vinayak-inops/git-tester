"use client"

import { useState } from "react"
import {
  CalendarIcon,
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Shield,
  CheckCircle2,
  XCircle,
  Users,
  Calendar,
  Home,
  Trash2,
  Plus,
  FileText,
  CreditCard,
  DollarSign,
  Upload,
  AlertTriangle,
  FileCheck,
  ClipboardList,
  Settings,
} from "lucide-react"
import { format } from "date-fns"

import { Button } from "@repo/ui/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@repo/ui/components/ui/card"
import { Input } from "@repo/ui/components/ui/input"
import { Label } from "@repo/ui/components/ui/label"
import { Switch } from "@repo/ui/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/ui/select"
import { Calendar as CalendarComponent } from "@repo/ui/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui/components/ui/popover"
import { Badge } from "@repo/ui/components/ui/badge"
import { cn } from "@repo/ui/lib/utils"

export default function ContractorForm() {
  const [date, setDate] = useState<Date>(new Date("2020-10-31"))
  const [formData, setFormData] = useState({
    contractorName: "ACE Associates-EN",
    contractorCode: "740117",
    active: true,
    deeded: false,
    restricted: false,
    individualContractor: true,
    ownerName: "R.Ravisankar",
    ownerContact: "9840930061",
    ownerEmail: "ravisankar@ehassoc.in",
    contactPersonName: "Vivekananthar",
    contactPersonContact: "9500080305",
    contactPersonEmail: "ACE001",
    typeOfCompany: "Proprietorship",
    workTypeCode: "WC1",
    workTypeTitle: "Proprietorship Work",
    areaOfWorkCode: "AOW1",
    areaOfWorkTitle: "General Construction",
    // Local Address
    localAddressLine1: "A.I.E",
    localAddressLine2: "A.I.E",
    localCountry: "India",
    localState: "Tamil Nadu",
    localCity: "Chennai",
    localDistrict: "Thiruvallur",
    localPincode: "600057",
    localContactNumber: "9444261938",
    // Corporate Address
    corporateAddressLine1: "Dummy Address 1",
    corporateAddressLine2: "Dummy Address 2",
    corporateCountry: "India",
    corporateState: "Tamil Nadu",
    corporateCity: "Chennai",
    corporateDistrict: "Thiruvallur",
    corporatePincode: "600057",
    corporateContactNumber: "9444261938",
    // Licenses
    licenses: [
      {
        id: 1,
        licenseNo: "L001",
        fromDate: "2023-01-01",
        toDate: "2023-12-31",
        workmen: "50",
        issuedOn: "2023-01-01",
        natureOfWork: "Construction",
      },
    ],
    // Important Numbers
    importantNumbers: [
      {
        id: 1,
        documentTypeCode: "DOC001",
        documentTypeTitle: "SAMPLE1",
        identificationNumber: "0343595792",
      },
    ],
    // Bank Details
    bankDetails: [
      {
        id: 1,
        bankName: "Dummy Bank",
        branchName: "Dummy Branch",
        micrNo: "123456789",
        ifscNo: "DUMMY12345",
        accountNo: "1234567890",
      },
    ],
    // Security Deposits
    securityDeposits: [
      {
        id: 1,
        depositDate: "2023-01-01",
        depositDetail: "Dummy deposit detail",
        depositAmount: "10000",
      },
    ],
    // Documents
    documents: [
      {
        id: 1,
        categoryCode: "License",
        categoryTitle: "License",
        typeCode: "DOC001",
        typeTitle: "SAMPLE1",
        storagePath: "/documents/contractor/license.pdf",
      },
    ],
    // Penalties
    penalties: [
      {
        id: 1,
        dateOfOffence: "2023-06-01",
        actOfMisconduct: "Late Submission",
        actionTaken: "Warning Issued",
        amount: "500",
        month: "6",
        witnessName: "Admin",
        fineRealisedDate: "2023-06-15",
      },
    ],
    // WC Policies
    wcPolicies: [
      {
        id: 1,
        policyNumber: "POLICY123456",
        startDate: "2023-01-01",
        expiryDate: "2023-12-31",
        companyName: "Dummy Insurance Company",
        maxWorkmen: "100",
      },
    ],
    // Work Orders
    workOrders: [
      {
        id: 1,
        orderNumber: "7400100",
        orderDate: "2023-06-01",
        proposalRef: "",
        noOfEmployees: "1000",
        contractFrom: "2023-07-01",
        contractTo: "2029-12-31",
        orderDocPath: "dummy/doc",
        annexurePath: "dummy/doc",
        serviceCharge: "0",
        orderType: "Standard",
        orderLineItems: "General Item",
        serviceLineItems: "General servi",
        serviceCode: "SVC001",
        wcChargesPerEmp: "0",
      },
      {
        id: 2,
        orderNumber: "6400100",
        orderDate: "2023-06-01",
        proposalRef: "6400100",
        noOfEmployees: "2000",
        contractFrom: "2023-07-01",
        contractTo: "2029-12-31",
        orderDocPath: "dummy/doc",
        annexurePath: "dummy/doc",
        serviceCharge: "0",
        orderType: "Standard",
        orderLineItems: "General Item",
        serviceLineItems: "General servi",
        serviceCode: "SVC001",
        wcChargesPerEmp: "0",
      },
    ],
    // Other
    organizationCode: "ORG1",
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addLicense = () => {
    const newLicense = {
      id: Date.now(),
      licenseNo: "",
      fromDate: "",
      toDate: "",
      workmen: "",
      issuedOn: "",
      natureOfWork: "",
    }
    setFormData((prev) => ({
      ...prev,
      licenses: [...prev.licenses, newLicense],
    }))
  }

  const removeLicense = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      licenses: prev.licenses.filter((license) => license.id !== id),
    }))
  }

  const updateLicense = (id: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      licenses: prev.licenses.map((license) => (license.id === id ? { ...license, [field]: value } : license)),
    }))
  }

  const addImportantNumber = () => {
    const newNumber = {
      id: Date.now(),
      documentTypeCode: "",
      documentTypeTitle: "",
      identificationNumber: "",
    }
    setFormData((prev) => ({
      ...prev,
      importantNumbers: [...prev.importantNumbers, newNumber],
    }))
  }

  const removeImportantNumber = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      importantNumbers: prev.importantNumbers.filter((number) => number.id !== id),
    }))
  }

  const updateImportantNumber = (id: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      importantNumbers: prev.importantNumbers.map((number) =>
        number.id === id ? { ...number, [field]: value } : number,
      ),
    }))
  }

  const addBankDetail = () => {
    const newBank = {
      id: Date.now(),
      bankName: "",
      branchName: "",
      micrNo: "",
      ifscNo: "",
      accountNo: "",
    }
    setFormData((prev) => ({
      ...prev,
      bankDetails: [...prev.bankDetails, newBank],
    }))
  }

  const removeBankDetail = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      bankDetails: prev.bankDetails.filter((bank) => bank.id !== id),
    }))
  }

  const updateBankDetail = (id: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      bankDetails: prev.bankDetails.map((bank) => (bank.id === id ? { ...bank, [field]: value } : bank)),
    }))
  }

  const addSecurityDeposit = () => {
    const newDeposit = {
      id: Date.now(),
      depositDate: "",
      depositDetail: "",
      depositAmount: "",
    }
    setFormData((prev) => ({
      ...prev,
      securityDeposits: [...prev.securityDeposits, newDeposit],
    }))
  }

  const removeSecurityDeposit = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      securityDeposits: prev.securityDeposits.filter((deposit) => deposit.id !== id),
    }))
  }

  const updateSecurityDeposit = (id: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      securityDeposits: prev.securityDeposits.map((deposit) =>
        deposit.id === id ? { ...deposit, [field]: value } : deposit,
      ),
    }))
  }

  const addDocument = () => {
    const newDocument = {
      id: Date.now(),
      categoryCode: "",
      categoryTitle: "",
      typeCode: "",
      typeTitle: "",
      storagePath: "",
    }
    setFormData((prev) => ({
      ...prev,
      documents: [...prev.documents, newDocument],
    }))
  }

  const removeDocument = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      documents: prev.documents.filter((document) => document.id !== id),
    }))
  }

  const updateDocument = (id: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      documents: prev.documents.map((document) => (document.id === id ? { ...document, [field]: value } : document)),
    }))
  }

  const addPenalty = () => {
    const newPenalty = {
      id: Date.now(),
      dateOfOffence: "",
      actOfMisconduct: "",
      actionTaken: "",
      amount: "",
      month: "",
      witnessName: "",
      fineRealisedDate: "",
    }
    setFormData((prev) => ({
      ...prev,
      penalties: [...prev.penalties, newPenalty],
    }))
  }

  const removePenalty = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      penalties: prev.penalties.filter((penalty) => penalty.id !== id),
    }))
  }

  const updatePenalty = (id: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      penalties: prev.penalties.map((penalty) => (penalty.id === id ? { ...penalty, [field]: value } : penalty)),
    }))
  }

  const addWcPolicy = () => {
    const newPolicy = {
      id: Date.now(),
      policyNumber: "",
      startDate: "",
      expiryDate: "",
      companyName: "",
      maxWorkmen: "",
    }
    setFormData((prev) => ({
      ...prev,
      wcPolicies: [...prev.wcPolicies, newPolicy],
    }))
  }

  const removeWcPolicy = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      wcPolicies: prev.wcPolicies.filter((policy) => policy.id !== id),
    }))
  }

  const updateWcPolicy = (id: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      wcPolicies: prev.wcPolicies.map((policy) => (policy.id === id ? { ...policy, [field]: value } : policy)),
    }))
  }

  const addWorkOrder = () => {
    const newWorkOrder = {
      id: Date.now(),
      orderNumber: "",
      orderDate: "",
      proposalRef: "",
      noOfEmployees: "",
      contractFrom: "",
      contractTo: "",
      orderDocPath: "",
      annexurePath: "",
      serviceCharge: "",
      orderType: "",
      orderLineItems: "",
      serviceLineItems: "",
      serviceCode: "",
      wcChargesPerEmp: "",
    }
    setFormData((prev) => ({
      ...prev,
      workOrders: [...prev.workOrders, newWorkOrder],
    }))
  }

  const removeWorkOrder = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      workOrders: prev.workOrders.filter((order) => order.id !== id),
    }))
  }

  const updateWorkOrder = (id: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      workOrders: prev.workOrders.map((order) => (order.id === id ? { ...order, [field]: value } : order)),
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4 py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Contractor Management
          </h1>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            Comprehensive contractor information system with advanced management capabilities
          </p>
        </div>

        {/* Status Overview */}
        <Card className="border-0 shadow-xl bg-gradient-to-r from-white to-gray-50">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div
                  className={`inline-flex items-center justify-center w-12 h-[40px] rounded-full mb-2 ${
                    formData.active ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-gray-900">Active Status</p>
                <Badge variant={formData.active ? "default" : "secondary"} className="mt-1">
                  {formData.active ? "Active" : "Inactive"}
                </Badge>
              </div>
              <div className="text-center">
                <div
                  className={`inline-flex items-center justify-center w-12 h-[40px] rounded-full mb-2 ${
                    formData.individualContractor ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <User className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-gray-900">Type</p>
                <Badge variant="outline" className="mt-1">
                  {formData.individualContractor ? "Individual" : "Company"}
                </Badge>
              </div>
              <div className="text-center">
                <div
                  className={`inline-flex items-center justify-center w-12 h-[40px] rounded-full mb-2 ${
                    formData.restricted ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                  }`}
                >
                  <Shield className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-gray-900">Access</p>
                <Badge variant={formData.restricted ? "destructive" : "default"} className="mt-1">
                  {formData.restricted ? "Restricted" : "Full Access"}
                </Badge>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-[40px] bg-purple-100 text-purple-600 rounded-full mb-2">
                  <Briefcase className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-gray-900">Work Type</p>
                <Badge variant="outline" className="mt-1">
                  {formData.workTypeCode}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Basic Information */}
        <Card className="border-0 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
            <CardTitle className="text-2xl text-white flex items-center gap-3">
              <User className="w-6 h-6" />
              Basic Information
            </CardTitle>
            <CardDescription className="text-blue-100 mt-2">
              Essential contractor details and operational status
            </CardDescription>
          </div>
          <CardContent className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="contractorName" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Contractor Name
                </Label>
                <Input
                  id="contractorName"
                  value={formData.contractorName}
                  onChange={(e) => handleInputChange("contractorName", e.target.value)}
                  className="h-[40px] text-sm font-medium border-2 focus:border-blue-500 transition-colors"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="contractorCode" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Contractor Code
                </Label>
                <Input
                  id="contractorCode"
                  value={formData.contractorCode}
                  onChange={(e) => handleInputChange("contractorCode", e.target.value)}
                  className="h-[40px] text-sm font-medium border-2 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="group">
                <div className="flex items-center justify-between space-x-3 p-6 border-2 rounded-xl hover:border-green-300 transition-all duration-200 hover:shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
                  <div className="space-y-1">
                    <Label htmlFor="active" className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      Active Status
                    </Label>
                    <p className="text-xs text-gray-600">Contractor operational status</p>
                  </div>
                  <Switch
                    id="active"
                    checked={formData.active}
                    onCheckedChange={(checked) => handleInputChange("active", checked)}
                    className="data-[state=checked]:bg-green-600"
                  />
                </div>
              </div>

              <div className="group">
                <div className="flex items-center justify-between space-x-3 p-6 border-2 rounded-xl hover:border-blue-300 transition-all duration-200 hover:shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
                  <div className="space-y-1">
                    <Label htmlFor="deeded" className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      Deeded
                    </Label>
                    <p className="text-xs text-gray-600">Property deed verification</p>
                  </div>
                  <Switch
                    id="deeded"
                    checked={formData.deeded}
                    onCheckedChange={(checked) => handleInputChange("deeded", checked)}
                    className="data-[state=checked]:bg-blue-600"
                  />
                </div>
              </div>

              <div className="group">
                <div className="flex items-center justify-between space-x-3 p-6 border-2 rounded-xl hover:border-red-300 transition-all duration-200 hover:shadow-lg bg-gradient-to-br from-red-50 to-pink-50">
                  <div className="space-y-1">
                    <Label htmlFor="restricted" className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-600" />
                      Restricted
                    </Label>
                    <p className="text-xs text-gray-600">Access limitations apply</p>
                  </div>
                  <Switch
                    id="restricted"
                    checked={formData.restricted}
                    onCheckedChange={(checked) => handleInputChange("restricted", checked)}
                    className="data-[state=checked]:bg-red-600"
                  />
                </div>
              </div>

              <div className="group">
                <div className="flex items-center justify-between space-x-3 p-6 border-2 rounded-xl hover:border-purple-300 transition-all duration-200 hover:shadow-lg bg-gradient-to-br from-purple-50 to-violet-50">
                  <div className="space-y-1">
                    <Label
                      htmlFor="individualContractor"
                      className="text-sm font-semibold text-gray-800 flex items-center gap-2"
                    >
                      <Users className="w-4 h-4 text-purple-600" />
                      Individual
                    </Label>
                    <p className="text-xs text-gray-600">Single person contractor</p>
                  </div>
                  <Switch
                    id="individualContractor"
                    checked={formData.individualContractor}
                    onCheckedChange={(checked) => handleInputChange("individualContractor", checked)}
                    className="data-[state=checked]:bg-purple-600"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Owner Information */}
        <Card className="border-0 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6">
            <CardTitle className="text-2xl text-white flex items-center gap-3">
              <User className="w-6 h-6" />
              Owner Information
            </CardTitle>
            <CardDescription className="text-emerald-100 mt-2">
              Primary owner contact details and information
            </CardDescription>
          </div>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <Label htmlFor="ownerName" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <User className="w-4 h-4 text-emerald-600" />
                  Owner Name
                </Label>
                <Input
                  id="ownerName"
                  value={formData.ownerName}
                  onChange={(e) => handleInputChange("ownerName", e.target.value)}
                  className="h-[40px] text-sm border-2 focus:border-emerald-500 transition-colors"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="ownerContact" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  Contact Number
                </Label>
                <Input
                  id="ownerContact"
                  value={formData.ownerContact}
                  onChange={(e) => handleInputChange("ownerContact", e.target.value)}
                  type="tel"
                  className="h-[40px] text-sm border-2 focus:border-emerald-500 transition-colors"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="ownerEmail" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-600" />
                  Email Address
                </Label>
                <Input
                  id="ownerEmail"
                  value={formData.ownerEmail}
                  onChange={(e) => handleInputChange("ownerEmail", e.target.value)}
                  type="email"
                  className="h-[40px] text-sm border-2 focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Person Information */}
        <Card className="border-0 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-orange-600 to-red-600 p-6">
            <CardTitle className="text-2xl text-white flex items-center gap-3">
              <Users className="w-6 h-6" />
              Contact Person Information
            </CardTitle>
            <CardDescription className="text-orange-100 mt-2">
              Primary contact for communication and coordination
            </CardDescription>
          </div>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <Label
                  htmlFor="contactPersonName"
                  className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                >
                  <User className="w-4 h-4 text-orange-600" />
                  Contact Person Name
                </Label>
                <Input
                  id="contactPersonName"
                  value={formData.contactPersonName}
                  onChange={(e) => handleInputChange("contactPersonName", e.target.value)}
                  className="h-[40px] text-sm border-2 focus:border-orange-500 transition-colors"
                />
              </div>
              <div className="space-y-3">
                <Label
                  htmlFor="contactPersonContact"
                  className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-orange-600" />
                  Contact Number
                </Label>
                <Input
                  id="contactPersonContact"
                  value={formData.contactPersonContact}
                  onChange={(e) => handleInputChange("contactPersonContact", e.target.value)}
                  type="tel"
                  className="h-[40px] text-sm border-2 focus:border-orange-500 transition-colors"
                />
              </div>
              <div className="space-y-3">
                <Label
                  htmlFor="contactPersonEmail"
                  className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-orange-600" />
                  Email Address
                </Label>
                <Input
                  id="contactPersonEmail"
                  value={formData.contactPersonEmail}
                  onChange={(e) => handleInputChange("contactPersonEmail", e.target.value)}
                  type="email"
                  className="h-[40px] text-sm border-2 focus:border-orange-500 transition-colors"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Company Information */}
        <Card className="border-0 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6">
            <CardTitle className="text-2xl text-white flex items-center gap-3">
              <Building2 className="w-6 h-6" />
              Company Information
            </CardTitle>
            <CardDescription className="text-purple-100 mt-2">
              Business details and operational specifications
            </CardDescription>
          </div>
          <CardContent className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-600" />
                  Service Since
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full h-[40px] justify-start text-left font-medium text-sm border-2 hover:border-purple-500 transition-colors",
                        !date && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-3 h-5 w-5 text-purple-600" />
                      {date ? format(date, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent 
                      mode="single" 
                      selected={date} 
                      onSelect={(selectedDate) => selectedDate && setDate(selectedDate)} 
                      initialFocus 
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-3">
                <Label htmlFor="typeOfCompany" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-purple-600" />
                  Company Type
                </Label>
                <Select
                  value={formData.typeOfCompany}
                  onValueChange={(value) => handleInputChange("typeOfCompany", value)}
                >
                  <SelectTrigger className="h-[40px] text-sm border-2 focus:border-purple-500">
                    <SelectValue placeholder="Select company type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Proprietorship">Proprietorship</SelectItem>
                    <SelectItem value="Partnership">Partnership</SelectItem>
                    <SelectItem value="Private Limited">Private Limited</SelectItem>
                    <SelectItem value="Public Limited">Public Limited</SelectItem>
                    <SelectItem value="LLP">Limited Liability Partnership</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="workTypeCode" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-purple-600" />
                  Work Type Code
                </Label>
                <Input
                  id="workTypeCode"
                  value={formData.workTypeCode}
                  onChange={(e) => handleInputChange("workTypeCode", e.target.value)}
                  className="h-[40px] text-sm border-2 focus:border-purple-500 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <Label htmlFor="workTypeTitle" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-purple-600" />
                  Work Type Title
                </Label>
                <Input
                  id="workTypeTitle"
                  value={formData.workTypeTitle}
                  onChange={(e) => handleInputChange("workTypeTitle", e.target.value)}
                  className="h-[40px] text-sm border-2 focus:border-purple-500 transition-colors"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="areaOfWorkCode" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-600" />
                  Area Of Work Code
                </Label>
                <Input
                  id="areaOfWorkCode"
                  value={formData.areaOfWorkCode}
                  onChange={(e) => handleInputChange("areaOfWorkCode", e.target.value)}
                  className="h-[40px] text-sm border-2 focus:border-purple-500 transition-colors"
                />
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="areaOfWorkTitle"
                  className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4 text-purple-600" />
                  Area Of Work Title
                </Label>
                <Input
                  id="areaOfWorkTitle"
                  value={formData.areaOfWorkTitle}
                  onChange={(e) => handleInputChange("areaOfWorkTitle", e.target.value)}
                  className="h-[40px] text-sm border-2 focus:border-purple-500 transition-colors"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Address Information */}
        <Card className="border-0 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-teal-600 to-cyan-600 p-6">
            <CardTitle className="text-2xl text-white flex items-center gap-3">
              <Home className="w-6 h-6" />
            </CardTitle>
            <CardDescription className="text-teal-100 mt-2">
              Local and corporate address details with contact information
            </CardDescription>
          </div>
          <CardContent className="p-8 space-y-12">
            {/* Local Address */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                <div className="inline-flex items-center justify-center w-10 h-[40px] bg-teal-100 text-teal-600 rounded-lg">
                  <Home className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Local Address</h3>
                  <p className="text-sm text-gray-600">Primary business location details</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label
                    htmlFor="localAddressLine1"
                    className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                  >
                    <MapPin className="w-4 h-4 text-teal-600" />
                    Address Line 1
                  </Label>
                  <Input
                    id="localAddressLine1"
                    value={formData.localAddressLine1}
                    onChange={(e) => handleInputChange("localAddressLine1", e.target.value)}
                    className="h-[40px] text-sm border-2 focus:border-teal-500 transition-colors"
                  />
                </div>
                <div className="space-y-3">
                  <Label
                    htmlFor="localAddressLine2"
                    className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                  >
                    <MapPin className="w-4 h-4 text-teal-600" />
                    Address Line 2
                  </Label>
                  <Input
                    id="localAddressLine2"
                    value={formData.localAddressLine2}
                    onChange={(e) => handleInputChange("localAddressLine2", e.target.value)}
                    className="h-[40px] text-sm border-2 focus:border-teal-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="localCountry" className="text-sm font-semibold text-gray-700">
                    Country
                  </Label>
                  <Select
                    value={formData.localCountry}
                    onValueChange={(value) => handleInputChange("localCountry", value)}
                  >
                    <SelectTrigger className="h-[40px] text-sm border-2 focus:border-teal-500">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="India">India</SelectItem>
                      <SelectItem value="USA">United States</SelectItem>
                      <SelectItem value="UK">United Kingdom</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="localState" className="text-sm font-semibold text-gray-700">
                    State
                  </Label>
                  <Input
                    id="localState"
                    value={formData.localState}
                    onChange={(e) => handleInputChange("localState", e.target.value)}
                    className="h-[40px] text-sm border-2 focus:border-teal-500 transition-colors"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="localCity" className="text-sm font-semibold text-gray-700">
                    City
                  </Label>
                  <Input
                    id="localCity"
                    value={formData.localCity}
                    onChange={(e) => handleInputChange("localCity", e.target.value)}
                    className="h-[40px] text-sm border-2 focus:border-teal-500 transition-colors"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="localDistrict" className="text-sm font-semibold text-gray-700">
                    District
                  </Label>
                  <Input
                    id="localDistrict"
                    value={formData.localDistrict}
                    onChange={(e) => handleInputChange("localDistrict", e.target.value)}
                    className="h-[40px] text-sm border-2 focus:border-teal-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label htmlFor="localPincode" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-teal-600" />
                    Pincode
                  </Label>
                  <Input
                    id="localPincode"
                    value={formData.localPincode}
                    onChange={(e) => handleInputChange("localPincode", e.target.value)}
                    className="h-[40px] text-sm border-2 focus:border-teal-500 transition-colors"
                  />
                </div>
                <div className="space-y-3">
                  <Label
                    htmlFor="localContactNumber"
                    className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-teal-600" />
                    Contact Number
                  </Label>
                  <Input
                    id="localContactNumber"
                    value={formData.localContactNumber}
                    onChange={(e) => handleInputChange("localContactNumber", e.target.value)}
                    type="tel"
                    className="h-[40px] text-sm border-2 focus:border-teal-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Corporate Address */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                <div className="inline-flex items-center justify-center w-10 h-[40px] bg-cyan-100 text-cyan-600 rounded-lg">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Corporate Address</h3>
                  <p className="text-sm text-gray-600">Registered business address information</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label
                    htmlFor="corporateAddressLine1"
                    className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                  >
                    <MapPin className="w-4 h-4 text-cyan-600" />
                    Address Line 1
                  </Label>
                  <Input
                    id="corporateAddressLine1"
                    value={formData.corporateAddressLine1}
                    onChange={(e) => handleInputChange("corporateAddressLine1", e.target.value)}
                    className="h-[40px] text-sm border-2 focus:border-cyan-500 transition-colors"
                  />
                </div>
                <div className="space-y-3">
                  <Label
                    htmlFor="corporateAddressLine2"
                    className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                  >
                    <MapPin className="w-4 h-4 text-cyan-600" />
                    Address Line 2
                  </Label>
                  <Input
                    id="corporateAddressLine2"
                    value={formData.corporateAddressLine2}
                    onChange={(e) => handleInputChange("corporateAddressLine2", e.target.value)}
                    className="h-[40px] text-sm border-2 focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="corporateCountry" className="text-sm font-semibold text-gray-700">
                    Country
                  </Label>
                  <Select
                    value={formData.corporateCountry}
                    onValueChange={(value) => handleInputChange("corporateCountry", value)}
                  >
                    <SelectTrigger className="h-[40px] text-sm border-2 focus:border-cyan-500">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="India">India</SelectItem>
                      <SelectItem value="USA">United States</SelectItem>
                      <SelectItem value="UK">United Kingdom</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="corporateState" className="text-sm font-semibold text-gray-700">
                    State
                  </Label>
                  <Input
                    id="corporateState"
                    value={formData.corporateState}
                    onChange={(e) => handleInputChange("corporateState", e.target.value)}
                    className="h-[40px] text-sm border-2 focus:border-cyan-500 transition-colors"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="corporateCity" className="text-sm font-semibold text-gray-700">
                    City
                  </Label>
                  <Input
                    id="corporateCity"
                    value={formData.corporateCity}
                    onChange={(e) => handleInputChange("corporateCity", e.target.value)}
                    className="h-[40px] text-sm border-2 focus:border-cyan-500 transition-colors"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="corporateDistrict" className="text-sm font-semibold text-gray-700">
                    District
                  </Label>
                  <Input
                    id="corporateDistrict"
                    value={formData.corporateDistrict}
                    onChange={(e) => handleInputChange("corporateDistrict", e.target.value)}
                    className="h-[40px] text-sm border-2 focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label
                    htmlFor="corporatePincode"
                    className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                  >
                    <MapPin className="w-4 h-4 text-cyan-600" />
                    Pincode
                  </Label>
                  <Input
                    id="corporatePincode"
                    value={formData.corporatePincode}
                    onChange={(e) => handleInputChange("corporatePincode", e.target.value)}
                    className="h-[40px] text-sm border-2 focus:border-cyan-500 transition-colors"
                  />
                </div>
                <div className="space-y-3">
                  <Label
                    htmlFor="corporateContactNumber"
                    className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-cyan-600" />
                    Contact Number
                  </Label>
                  <Input
                    id="corporateContactNumber"
                    value={formData.corporateContactNumber}
                    onChange={(e) => handleInputChange("corporateContactNumber", e.target.value)}
                    type="tel"
                    className="h-[40px] text-sm border-2 focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Licenses */}
        <Card className="border-0 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-amber-600 to-yellow-600 p-6">
            <CardTitle className="text-2xl text-white flex items-center gap-3">
              <FileText className="w-6 h-6" />
              Licenses
            </CardTitle>
            <CardDescription className="text-amber-100 mt-2">
              Professional licenses and certifications with validity periods
            </CardDescription>
          </div>
          <CardContent className="p-8 space-y-6">
            {formData.licenses.map((license) => (
              <div
                key={license.id}
                className="p-6 border-2 border-amber-100 rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">License No</Label>
                    <Input
                      value={license.licenseNo}
                      onChange={(e) => updateLicense(license.id, "licenseNo", e.target.value)}
                      className="h-[40px] border-2 focus:border-amber-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">From</Label>
                    <Input
                      type="date"
                      value={license.fromDate}
                      onChange={(e) => updateLicense(license.id, "fromDate", e.target.value)}
                      className="h-[40px] border-2 focus:border-amber-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">To</Label>
                    <Input
                      type="date"
                      value={license.toDate}
                      onChange={(e) => updateLicense(license.id, "toDate", e.target.value)}
                      className="h-[40px] border-2 focus:border-amber-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Workmen</Label>
                    <Input
                      type="number"
                      value={license.workmen}
                      onChange={(e) => updateLicense(license.id, "workmen", e.target.value)}
                      className="h-[40px] border-2 focus:border-amber-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Issued On</Label>
                    <Input
                      type="date"
                      value={license.issuedOn}
                      onChange={(e) => updateLicense(license.id, "issuedOn", e.target.value)}
                      className="h-[40px] border-2 focus:border-amber-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Nature Of Work</Label>
                    <Input
                      value={license.natureOfWork}
                      onChange={(e) => updateLicense(license.id, "natureOfWork", e.target.value)}
                      className="h-[40px] border-2 focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeLicense(license.id)}
                    className="flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </Button>
                </div>
              </div>
            ))}
            <div className="flex justify-center">
              <Button
                onClick={addLicense}
                variant="outline"
                className="flex items-center gap-2 border-2 border-amber-300 text-amber-700 hover:bg-amber-50"
              >
                <Plus className="w-4 h-4" />
                Add License
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Important Numbers */}
        <Card className="border-0 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-rose-600 to-pink-600 p-6">
            <CardTitle className="text-2xl text-white flex items-center gap-3">
              <Shield className="w-6 h-6" />
              Important Numbers
            </CardTitle>
            <CardDescription className="text-rose-100 mt-2">
              Document identification numbers and important references
            </CardDescription>
          </div>
          <CardContent className="p-8 space-y-6">
            {formData.importantNumbers.map((number) => (
              <div
                key={number.id}
                className="p-6 border-2 border-rose-100 rounded-xl bg-gradient-to-br from-rose-50 to-pink-50 space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Document Type Code</Label>
                    <Input
                      value={number.documentTypeCode}
                      onChange={(e) => updateImportantNumber(number.id, "documentTypeCode", e.target.value)}
                      className="h-[40px] border-2 focus:border-rose-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Document Type Title</Label>
                    <Input
                      value={number.documentTypeTitle}
                      onChange={(e) => updateImportantNumber(number.id, "documentTypeTitle", e.target.value)}
                      className="h-[40px] border-2 focus:border-rose-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Identification Number</Label>
                    <Input
                      value={number.identificationNumber}
                      onChange={(e) => updateImportantNumber(number.id, "identificationNumber", e.target.value)}
                      className="h-[40px] border-2 focus:border-rose-500 transition-colors"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeImportantNumber(number.id)}
                    className="flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </Button>
                </div>
              </div>
            ))}
            <div className="flex justify-center">
              <Button
                onClick={addImportantNumber}
                variant="outline"
                className="flex items-center gap-2 border-2 border-rose-300 text-rose-700 hover:bg-rose-50"
              >
                <Plus className="w-4 h-4" />
                Add Number
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Bank Details */}
        <Card className="border-0 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6">
            <CardTitle className="text-2xl text-white flex items-center gap-3">
              <CreditCard className="w-6 h-6" />
              Bank Details
            </CardTitle>
            <CardDescription className="text-green-100 mt-2">
              Banking information and account details for transactions
            </CardDescription>
          </div>
          <CardContent className="p-8 space-y-6">
            {formData.bankDetails.map((bank) => (
              <div
                key={bank.id}
                className="p-6 border-2 border-green-100 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Bank Name</Label>
                    <Input
                      value={bank.bankName}
                      onChange={(e) => updateBankDetail(bank.id, "bankName", e.target.value)}
                      className="h-[40px] border-2 focus:border-green-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Branch Name</Label>
                    <Input
                      value={bank.branchName}
                      onChange={(e) => updateBankDetail(bank.id, "branchName", e.target.value)}
                      className="h-[40px] border-2 focus:border-green-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">MICR No</Label>
                    <Input
                      value={bank.micrNo}
                      onChange={(e) => updateBankDetail(bank.id, "micrNo", e.target.value)}
                      className="h-[40px] border-2 focus:border-green-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">IFSC No</Label>
                    <Input
                      value={bank.ifscNo}
                      onChange={(e) => updateBankDetail(bank.id, "ifscNo", e.target.value)}
                      className="h-[40px] border-2 focus:border-green-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Account No</Label>
                    <Input
                      value={bank.accountNo}
                      onChange={(e) => updateBankDetail(bank.id, "accountNo", e.target.value)}
                      className="h-[40px] border-2 focus:border-green-500 transition-colors"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeBankDetail(bank.id)}
                    className="flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </Button>
                </div>
              </div>
            ))}
            <div className="flex justify-center">
              <Button
                onClick={addBankDetail}
                variant="outline"
                className="flex items-center gap-2 border-2 border-green-300 text-green-700 hover:bg-green-50"
              >
                <Plus className="w-4 h-4" />
                Add Bank
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security Deposit */}
        <Card className="border-0 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-violet-600 to-purple-600 p-6">
            <CardTitle className="text-2xl text-white flex items-center gap-3">
              <DollarSign className="w-6 h-6" />
              Security Deposit
            </CardTitle>
            <CardDescription className="text-violet-100 mt-2">
              Security deposit information and payment details
            </CardDescription>
          </div>
          <CardContent className="p-8 space-y-6">
            {formData.securityDeposits.map((deposit) => (
              <div
                key={deposit.id}
                className="p-6 border-2 border-violet-100 rounded-xl bg-gradient-to-br from-violet-50 to-purple-50 space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Deposit Date</Label>
                    <Input
                      type="date"
                      value={deposit.depositDate}
                      onChange={(e) => updateSecurityDeposit(deposit.id, "depositDate", e.target.value)}
                      className="h-[40px] border-2 focus:border-violet-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Deposit Detail</Label>
                    <Input
                      value={deposit.depositDetail}
                      onChange={(e) => updateSecurityDeposit(deposit.id, "depositDetail", e.target.value)}
                      className="h-[40px] border-2 focus:border-violet-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Deposit Amount</Label>
                    <Input
                      type="number"
                      value={deposit.depositAmount}
                      onChange={(e) => updateSecurityDeposit(deposit.id, "depositAmount", e.target.value)}
                      className="h-[40px] border-2 focus:border-violet-500 transition-colors"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeSecurityDeposit(deposit.id)}
                    className="flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </Button>
                </div>
              </div>
            ))}
            <div className="flex justify-center">
              <Button
                onClick={addSecurityDeposit}
                variant="outline"
                className="flex items-center gap-2 border-2 border-violet-300 text-violet-700 hover:bg-violet-50"
              >
                <Plus className="w-4 h-4" />
                Add Deposit
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Documents */}
        <Card className="border-0 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6">
            <CardTitle className="text-2xl text-white flex items-center gap-3">
              <Upload className="w-6 h-6" />
              Documents
            </CardTitle>
            <CardDescription className="text-indigo-100 mt-2">
              Document management and file storage information
            </CardDescription>
          </div>
          <CardContent className="p-8 space-y-6">
            {formData.documents.map((document) => (
              <div
                key={document.id}
                className="p-6 border-2 border-indigo-100 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Category Code</Label>
                    <Input
                      value={document.categoryCode}
                      onChange={(e) => updateDocument(document.id, "categoryCode", e.target.value)}
                      className="h-[40px] border-2 focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Category Title</Label>
                    <Input
                      value={document.categoryTitle}
                      onChange={(e) => updateDocument(document.id, "categoryTitle", e.target.value)}
                      className="h-[40px] border-2 focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Type Code</Label>
                    <Input
                      value={document.typeCode}
                      onChange={(e) => updateDocument(document.id, "typeCode", e.target.value)}
                      className="h-[40px] border-2 focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Type Title</Label>
                    <Input
                      value={document.typeTitle}
                      onChange={(e) => updateDocument(document.id, "typeTitle", e.target.value)}
                      className="h-[40px] border-2 focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Storage Path</Label>
                    <Input
                      value={document.storagePath}
                      onChange={(e) => updateDocument(document.id, "storagePath", e.target.value)}
                      className="h-[40px] border-2 focus:border-indigo-500 transition-colors"
                      placeholder="/documents/contractor/..."
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeDocument(document.id)}
                    className="flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </Button>
                </div>
              </div>
            ))}
            <div className="flex justify-center">
              <Button
                onClick={addDocument}
                variant="outline"
                className="flex items-center gap-2 border-2 border-indigo-300 text-indigo-700 hover:bg-indigo-50"
              >
                <Plus className="w-4 h-4" />
                Add Document
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Penalty */}
        <Card className="border-0 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 to-rose-600 p-6">
            <CardTitle className="text-2xl text-white flex items-center gap-3">
              <AlertTriangle className="w-6 h-6" />
              Penalty
            </CardTitle>
            <CardDescription className="text-red-100 mt-2">
              Penalty records and disciplinary action management
            </CardDescription>
          </div>
          <CardContent className="p-8 space-y-6">
            {formData.penalties.map((penalty) => (
              <div
                key={penalty.id}
                className="p-6 border-2 border-red-100 rounded-xl bg-gradient-to-br from-red-50 to-rose-50 space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Date Of Offence</Label>
                    <Input
                      type="date"
                      value={penalty.dateOfOffence}
                      onChange={(e) => updatePenalty(penalty.id, "dateOfOffence", e.target.value)}
                      className="h-[40px] border-2 focus:border-red-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Act Of Misconduct</Label>
                    <Input
                      value={penalty.actOfMisconduct}
                      onChange={(e) => updatePenalty(penalty.id, "actOfMisconduct", e.target.value)}
                      className="h-[40px] border-2 focus:border-red-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Action Taken</Label>
                    <Input
                      value={penalty.actionTaken}
                      onChange={(e) => updatePenalty(penalty.id, "actionTaken", e.target.value)}
                      className="h-[40px] border-2 focus:border-red-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Amount</Label>
                    <Input
                      type="number"
                      value={penalty.amount}
                      onChange={(e) => updatePenalty(penalty.id, "amount", e.target.value)}
                      className="h-[40px] border-2 focus:border-red-500 transition-colors"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Month</Label>
                    <Input
                      type="number"
                      min="1"
                      max="12"
                      value={penalty.month}
                      onChange={(e) => updatePenalty(penalty.id, "month", e.target.value)}
                      className="h-[40px] border-2 focus:border-red-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Witness Name</Label>
                    <Input
                      value={penalty.witnessName}
                      onChange={(e) => updatePenalty(penalty.id, "witnessName", e.target.value)}
                      className="h-[40px] border-2 focus:border-red-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Fine Realised Date</Label>
                    <Input
                      type="date"
                      value={penalty.fineRealisedDate}
                      onChange={(e) => updatePenalty(penalty.id, "fineRealisedDate", e.target.value)}
                      className="h-[40px] border-2 focus:border-red-500 transition-colors"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removePenalty(penalty.id)}
                    className="flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </Button>
                </div>
              </div>
            ))}
            <div className="flex justify-center">
              <Button
                onClick={addPenalty}
                variant="outline"
                className="flex items-center gap-2 border-2 border-red-300 text-red-700 hover:bg-red-50"
              >
                <Plus className="w-4 h-4" />
                Add Penalty
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* WC Policies */}
        <Card className="border-0 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-slate-600 to-gray-600 p-6">
            <CardTitle className="text-2xl text-white flex items-center gap-3">
              <FileCheck className="w-6 h-6" />
              WC Policies
            </CardTitle>
            <CardDescription className="text-slate-100 mt-2">
              Workers' Compensation policy information and coverage details
            </CardDescription>
          </div>
          <CardContent className="p-8 space-y-6">
            {formData.wcPolicies.map((policy) => (
              <div
                key={policy.id}
                className="p-6 border-2 border-slate-100 rounded-xl bg-gradient-to-br from-slate-50 to-gray-50 space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Policy Number</Label>
                    <Input
                      value={policy.policyNumber}
                      onChange={(e) => updateWcPolicy(policy.id, "policyNumber", e.target.value)}
                      className="h-[40px] border-2 focus:border-slate-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Start Date</Label>
                    <Input
                      type="date"
                      value={policy.startDate}
                      onChange={(e) => updateWcPolicy(policy.id, "startDate", e.target.value)}
                      className="h-[40px] border-2 focus:border-slate-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Expiry Date</Label>
                    <Input
                      type="date"
                      value={policy.expiryDate}
                      onChange={(e) => updateWcPolicy(policy.id, "expiryDate", e.target.value)}
                      className="h-[40px] border-2 focus:border-slate-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Company Name</Label>
                    <Input
                      value={policy.companyName}
                      onChange={(e) => updateWcPolicy(policy.id, "companyName", e.target.value)}
                      className="h-[40px] border-2 focus:border-slate-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Max Workmen</Label>
                    <Input
                      type="number"
                      value={policy.maxWorkmen}
                      onChange={(e) => updateWcPolicy(policy.id, "maxWorkmen", e.target.value)}
                      className="h-[40px] border-2 focus:border-slate-500 transition-colors"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeWcPolicy(policy.id)}
                    className="flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </Button>
                </div>
              </div>
            ))}
            <div className="flex justify-center">
              <Button
                onClick={addWcPolicy}
                variant="outline"
                className="flex items-center gap-2 border-2 border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                <Plus className="w-4 h-4" />
                Add Policy
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Work Orders */}
        <Card className="border-0 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-6">
            <CardTitle className="text-2xl text-white flex items-center gap-3">
              <ClipboardList className="w-6 h-6" />
              Work Orders
            </CardTitle>
            <CardDescription className="text-cyan-100 mt-2">
              Project work orders and contract management with detailed specifications
            </CardDescription>
          </div>
          <CardContent className="p-8 space-y-6">
            {formData.workOrders.map((order) => (
              <div
                key={order.id}
                className="p-6 border-2 border-cyan-100 rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 space-y-6"
              >
                {/* First Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Order Number</Label>
                    <Input
                      value={order.orderNumber}
                      onChange={(e) => updateWorkOrder(order.id, "orderNumber", e.target.value)}
                      className="h-[40px] border-2 focus:border-cyan-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Order Date</Label>
                    <Input
                      type="date"
                      value={order.orderDate}
                      onChange={(e) => updateWorkOrder(order.id, "orderDate", e.target.value)}
                      className="h-[40px] border-2 focus:border-cyan-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Proposal Ref</Label>
                    <Input
                      value={order.proposalRef}
                      onChange={(e) => updateWorkOrder(order.id, "proposalRef", e.target.value)}
                      className="h-[40px] border-2 focus:border-cyan-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">No. of Employees</Label>
                    <Input
                      type="number"
                      value={order.noOfEmployees}
                      onChange={(e) => updateWorkOrder(order.id, "noOfEmployees", e.target.value)}
                      className="h-[40px] border-2 focus:border-cyan-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Second Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Contract From</Label>
                    <Input
                      type="date"
                      value={order.contractFrom}
                      onChange={(e) => updateWorkOrder(order.id, "contractFrom", e.target.value)}
                      className="h-[40px] border-2 focus:border-cyan-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Contract To</Label>
                    <Input
                      type="date"
                      value={order.contractTo}
                      onChange={(e) => updateWorkOrder(order.id, "contractTo", e.target.value)}
                      className="h-[40px] border-2 focus:border-cyan-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Order Doc Path</Label>
                    <Input
                      value={order.orderDocPath}
                      onChange={(e) => updateWorkOrder(order.id, "orderDocPath", e.target.value)}
                      className="h-[40px] border-2 focus:border-cyan-500 transition-colors"
                      placeholder="/documents/orders/..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Annexure Path</Label>
                    <Input
                      value={order.annexurePath}
                      onChange={(e) => updateWorkOrder(order.id, "annexurePath", e.target.value)}
                      className="h-[40px] border-2 focus:border-cyan-500 transition-colors"
                      placeholder="/documents/annexure/..."
                    />
                  </div>
                </div>

                {/* Third Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Service Charge</Label>
                    <Input
                      type="number"
                      value={order.serviceCharge}
                      onChange={(e) => updateWorkOrder(order.id, "serviceCharge", e.target.value)}
                      className="h-[40px] border-2 focus:border-cyan-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Order Type</Label>
                    <Select
                      value={order.orderType}
                      onValueChange={(value) => updateWorkOrder(order.id, "orderType", value)}
                    >
                      <SelectTrigger className="h-[40px] border-2 focus:border-cyan-500">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Standard">Standard</SelectItem>
                        <SelectItem value="Premium">Premium</SelectItem>
                        <SelectItem value="Custom">Custom</SelectItem>
                        <SelectItem value="Emergency">Emergency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Order Line Items</Label>
                    <Input
                      value={order.orderLineItems}
                      onChange={(e) => updateWorkOrder(order.id, "orderLineItems", e.target.value)}
                      className="h-[40px] border-2 focus:border-cyan-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Service Line Items</Label>
                    <Input
                      value={order.serviceLineItems}
                      onChange={(e) => updateWorkOrder(order.id, "serviceLineItems", e.target.value)}
                      className="h-[40px] border-2 focus:border-cyan-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Service Code</Label>
                    <Input
                      value={order.serviceCode}
                      onChange={(e) => updateWorkOrder(order.id, "serviceCode", e.target.value)}
                      className="h-[40px] border-2 focus:border-cyan-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Fourth Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">WC Charges/Emp</Label>
                    <Input
                      type="number"
                      value={order.wcChargesPerEmp}
                      onChange={(e) => updateWorkOrder(order.id, "wcChargesPerEmp", e.target.value)}
                      className="h-[40px] border-2 focus:border-cyan-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeWorkOrder(order.id)}
                    className="flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </Button>
                </div>
              </div>
            ))}
            <div className="flex justify-center">
              <Button
                onClick={addWorkOrder}
                variant="outline"
                className="flex items-center gap-2 border-2 border-cyan-300 text-cyan-700 hover:bg-cyan-50"
              >
                <Plus className="w-4 h-4" />
                Add Work Order
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Other */}
        <Card className="border-0 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-gray-600 to-slate-600 p-6">
            <CardTitle className="text-2xl text-white flex items-center gap-3">
              <Settings className="w-6 h-6" />
              Other
            </CardTitle>
            <CardDescription className="text-gray-100 mt-2">
              Additional organizational settings and configuration
            </CardDescription>
          </div>
          <CardContent className="p-8">
            <div className="max-w-md">
              <div className="space-y-3">
                <Label
                  htmlFor="organizationCode"
                  className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                >
                  <Settings className="w-4 h-4 text-gray-600" />
                  Organization Code
                </Label>
                <Input
                  id="organizationCode"
                  value={formData.organizationCode}
                  onChange={(e) => handleInputChange("organizationCode", e.target.value)}
                  className="h-[40px] text-sm border-2 focus:border-gray-500 transition-colors"
                  placeholder="Enter organization code"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8 pb-12">
          <Button
            variant="outline"
            size="lg"
            className="h-14 px-8 text-sm font-semibold border-2 hover:bg-gray-50 transition-all duration-200"
          >
            Reset Form
          </Button>
          <Button
            size="lg"
            className="h-14 px-12 text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Save Contractor Details
          </Button>
        </div>
      </div>
    </div>
  )
}