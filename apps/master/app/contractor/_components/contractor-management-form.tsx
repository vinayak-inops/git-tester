"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@repo/ui/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/ui/tabs"
import {
  Building2,
  User,
  FileText,
  CreditCard,
  MapPin,
  Shield,
  ClipboardList,
  AlertTriangle,
  Settings,
  Save,
  ArrowLeft,
} from "lucide-react"

// Import form components
import { BasicInformationForm } from "./forms/basic-information-form"
import { CompanyDetailsForm } from "./forms/company-details-form"
import { LicensesPermitsForm } from "./forms/licenses-permits-form"
import { FinancialDetailsForm } from "./forms/financial-details-form"
import { AddressInformationForm } from "./forms/address-information-form"
import { DocumentsComplianceForm } from "./forms/documents-compliance-form"
import { WorkOrdersForm } from "./forms/work-orders-form"
import { PenaltiesPoliciesForm } from "./forms/penalties-policies-form"
import { AuditStatusForm } from "./forms/audit-status-form"

export function ContractorManagementForm() {
  const [formData, setFormData] = useState({
    // Basic Information
    contractorName: "ACE Associates-EN",
    contractorCode: "7401117",
    isActive: true,
    isDeleted: false,
    ownerName: "R.Ravisankar",
    ownerContactNo: "9840930061",
    ownerEmailId: "ravisankar@atlasace.in",
    contactPersonName: "Vivekshankar",
    contactPersonContactNo: "9500080305",
    contactPersonEmailId: "ACE001",
    serviceSince: "2020-10-31",
    typeOfCompany: "Proprietorship",
    workTypeCode: "WC1",
    workTypeTitle: "Proprietorship Work",
    areaOfWorkCode: "AOW1",
    areaOfWorkTitle: "General Construction",
    restricted: false,
    contractorImage: "defaultImage.png",
    individualContractor: true,
    birthDate: "2001-10-31",
    fatherName: "Ramamirtham",
    workLocation: "",
    organizationCode: "ORG1",

    // Address Information
    localAddressLine1: "ALE",
    localAddressLine2: "ALE",
    localCountry: "India",
    localState: "Tamil Nadu",
    localCity: "Chennai",
    localDistrict: "Tiruvallur",
    localPincode: "600057",
    localContactNumber: "04442611838",

    corporateAddressLine1: "Dummy Address 1",
    corporateAddressLine2: "Dummy Address 2",
    corporateCountry: "India",
    corporateState: "Tamil Nadu",
    corporateCity: "Chennai",
    corporateDistrict: "Tiruvallur",
    corporatePincode: "600057",
    corporateContactNumber: "04442611838",

    // Audit Trail
    createdBy: "1",
    createdOn: "2023-04-27",
    updatedBy: "1",
    updatedOn: "2023-06-08",
  })

  const [licenses, setLicenses] = useState([
    {
      licenseNo: "L001",
      licenseFromDate: "2023-01-01",
      licenseToDate: "2023-12-31",
      workmen: 50,
      issuedOn: "2023-01-01",
      natureOfWork: "Construction",
    },
  ])

  const [importantNumbers, setImportantNumbers] = useState([
    {
      documentTypeCode: "DOC001",
      documentTypeTitle: "SAMPLE1",
      identificatinNumber: "0343595792",
    },
  ])

  const [bankDetails, setBankDetails] = useState([
    {
      bankName: "Dummy Bank",
      branchName: "Dummy Branch",
      micrNo: "123456789",
      ifscNo: "DUMMY12345",
      bankAccountNo: "1234567890",
    },
  ])

  const [securityDeposits, setSecurityDeposits] = useState([
    {
      depositDate: "2023-01-01",
      depositDetail: "Dummy deposit detail",
      depositAmount: 10000,
    },
  ])

  const [documents, setDocuments] = useState([
    {
      documentCategoryCode: "License",
      documentcategoryTitle: "License",
      documentTypeCode: "DOC001",
      documentTypeTitle: "SAMPLE1",
      storagePath: "/documents/contractor/license.pdf",
    },
  ])

  const [penalties, setPenalties] = useState([
    {
      dateOfOffence: "2023-06-01",
      actOfMisconduct: "Late Submission",
      actionTaken: "Warning Issued",
      amount: 500,
      month: 6,
      witnessName: "Admin",
      fineRealisedDate: "2023-06-15",
    },
  ])

  const [wcPolicies, setWcPolicies] = useState([
    {
      policyNumber: "POLICY123456",
      policyStartDate: "2023-01-01",
      policyExpiryDate: "2023-12-31",
      policyCompanyName: "Dummy Insurance Company",
      maximumWorkmen: 100,
    },
  ])

  const [workOrders, setWorkOrders] = useState([
    {
      workOrderNumber: "7400100",
      workOrderDate: "2023-06-01",
      proposalReferenceNumber: "",
      NumberOfEmployees: 1000,
      contractPeriodFrom: "2023-07-01",
      contractPeriodTo: "2029-12-31",
      workOrderDocumentFilePath: "dummy/documents/workOrder7400100.pdf",
      annexureFilePath: "dummy/documents/annexure7400100.pdf",
      serviceChargeAmount: 0,
      workOrderType: "Standard",
      workOrderLineItems: "General items",
      serviceLineItems: "General services",
      serviceCode: "SVC001",
      wcChargesPerEmployee: 0,
      assetChargesPerDay: [
        {
          assetCode: "A01",
          assetName: "Default Asset",
          assetCharges: 0,
        },
      ],
      employeeWages: {
        wageType: "hourly",
        wageAmount: 20,
      },
    },
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const completeFormData = {
      ...formData,
      licenses,
      importantNumbers,
      bankDetails,
      securityDeposits,
      documents,
      penalties,
      wcPolicies,
      workOrders,
    }
    console.log("Contractor form submitted:", completeFormData)
  }

  const handleFormDataChange = (data: Partial<typeof formData>) => {
    setFormData({ ...formData, ...data })
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <span>Contractor Management</span>
        <span>/</span>
        <span>Contractors</span>
        <span>/</span>
        <span className="text-gray-900 font-medium">New Contractor</span>
      </div>

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="p-2 hover:bg-blue-50">
            <ArrowLeft className="w-4 h-4 text-blue-600" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Contractor Registration</h2>
            <p className="text-gray-600">Create a comprehensive contractor profile</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="border-gray-300 hover:bg-gray-50 bg-transparent">
            Cancel
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg">
            <Save className="w-4 h-4 mr-2" />
            Save Contractor
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="basic" className="w-full">
          {/* Clean Horizontal Tab Navigation */}
          <div className="bg-white rounded-lg border border-gray-200 mb-6 shadow-sm">
            <TabsList className="w-full justify-start bg-transparent border-b border-gray-100 rounded-none p-0 h-auto">
              {[
                { value: "basic", label: "Basic Information", icon: User },
                { value: "company", label: "Company Details", icon: Building2 },
                { value: "licenses", label: "Licenses & Permits", icon: Shield },
                { value: "financial", label: "Financial Details", icon: CreditCard },
                { value: "address", label: "Address Information", icon: MapPin },
                { value: "documents", label: "Documents & Compliance", icon: FileText },
                { value: "workorders", label: "Work Orders", icon: ClipboardList },
                { value: "penalties", label: "Penalties & Policies", icon: AlertTriangle },
                { value: "audit", label: "Audit & Status", icon: Settings },
              ].map((tab) => {
                const IconComponent = tab.icon
                return (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="flex items-center space-x-3 px-4 py-4 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 text-gray-500 hover:text-gray-700 rounded-none font-medium transition-colors duration-200 text-sm"
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </TabsTrigger>
                )
              })}
            </TabsList>
          </div>

          {/* Basic Information Tab */}
          <TabsContent value="basic" className="space-y-6">
            <BasicInformationForm 
              formData={formData} 
              onFormDataChange={handleFormDataChange} 
            />
          </TabsContent>

          {/* Company Details Tab */}
          <TabsContent value="company" className="space-y-6">
            <CompanyDetailsForm 
              formData={formData} 
              onFormDataChange={handleFormDataChange} 
            />
          </TabsContent>

          {/* Licenses & Permits Tab */}
          <TabsContent value="licenses" className="space-y-6">
            <LicensesPermitsForm 
              licenses={licenses}
              importantNumbers={importantNumbers}
              onLicensesChange={setLicenses}
              onImportantNumbersChange={setImportantNumbers}
            />
          </TabsContent>

          {/* Financial Details Tab */}
          <TabsContent value="financial" className="space-y-6">
            <FinancialDetailsForm 
              bankDetails={bankDetails}
              securityDeposits={securityDeposits}
              onBankDetailsChange={setBankDetails}
              onSecurityDepositsChange={setSecurityDeposits}
            />
          </TabsContent>

          {/* Address Information Tab */}
          <TabsContent value="address" className="space-y-6">
            <AddressInformationForm 
              formData={formData} 
              onFormDataChange={handleFormDataChange} 
            />
          </TabsContent>

          {/* Documents & Compliance Tab */}
          <TabsContent value="documents" className="space-y-6">
            <DocumentsComplianceForm 
              documents={documents}
              onDocumentsChange={setDocuments}
            />
          </TabsContent>

          {/* Work Orders Tab */}
          <TabsContent value="workorders" className="space-y-6">
            <WorkOrdersForm 
              workOrders={workOrders}
              onWorkOrdersChange={setWorkOrders}
            />
          </TabsContent>

          {/* Penalties & Policies Tab */}
          <TabsContent value="penalties" className="space-y-6">
            <PenaltiesPoliciesForm 
              penalties={penalties}
              wcPolicies={wcPolicies}
              onPenaltiesChange={setPenalties}
              onWcPoliciesChange={setWcPolicies}
            />
          </TabsContent>

          {/* Audit & Status Tab */}
          <TabsContent value="audit" className="space-y-6">
            <AuditStatusForm 
              formData={formData} 
              onFormDataChange={handleFormDataChange} 
            />
          </TabsContent>
        </Tabs>

        {/* Enhanced Action Buttons */}
        <div className="flex justify-end space-x-4 pt-8 border-t-2 border-gray-200">
          <Button
            type="button"
            variant="outline"
            className="px-8 py-3 h-12 rounded-xl border-2 border-gray-300 hover:bg-gray-50 bg-transparent"
          >
            Save as Draft
          </Button>
          <Button
            type="submit"
            className="px-8 py-3 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg"
          >
            <Save className="w-5 h-5 mr-2" />
            Save Contractor
          </Button>
        </div>
      </form>
    </div>
  )
}
