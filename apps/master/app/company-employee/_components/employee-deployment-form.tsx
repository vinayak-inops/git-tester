"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@repo/ui/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/ui/tabs"
import { Save, ArrowLeft, User, Building2, MapPin, Settings, Users } from "lucide-react"

import {
  BasicInformationForm,
  OrganizationalStructureForm,
  DeploymentDetailsForm,
  ManagementHierarchyForm,
  SettingsRemarksForm,
} from "./forms"
import type { EmployeeDeploymentData } from "./types/employee-deployment.types"

export function EmployeeDeploymentForm() {
  const [activeTab, setActiveTab] = useState("basic")
  const [formData, setFormData] = useState<EmployeeDeploymentData>({
    // Basic Employee Information
    employeeCode: "EMP001",
    firstName: "John",
    middleName: "Dumb",
    lastName: "Doe",
    gender: "male", // must be one of: "male", "female", "other", "prefer-not-to-say"
    birthDate: "1994-01-01",
    bloodGroup: "A+", // must be one of: "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"
    nationality: "Indian",
    maritalStatus: "Unmarried",
    joiningDate: "2014-01-01",
    emailID: "John.Doe@gmail.com",
    manager: "EMP002",
    photo: "", // <-- Add photo field

    // Deployment Structure
    deployment: {
      subsidiary: {
        subsidiaryCode: "SUB001",
        subsidiaryName: "Subsidiary A",
      },
      division: {
        divisionCode: "DIV001",
        divisionName: "Division A",
      },
      department: {
        departmentCode: "DEPT001",
        departmentName: "Department A",
      },
      subDepartment: {
        subDepartmentCode: "SUBDEPT001",
        subDepartmentName: "Sub Department A",
      },
      section: {
        sectionCode: "SEC001",
        sectionName: "Section A",
      },
      employeeCategory: {
        employeeCategoryCode: "EC001",
        employeeCategoryTitle: "Category A",
      },
      grade: {
        gradeCode: "GRD001",
        gradeTitle: "Grade A",
      },
      designation: {
        designationCode: "DES001",
        designationName: "Designation A",
      },
      location: {
        locationCode: "LOC001",
        locationName: "Location A",
      },
      skillLevel: {
        skillLevelCode: "SKL001",
        skillLevelTitle: "Level A",
      },
      effectiveFrom: "2023-01-01",
      remark: "Deployment Remark",
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Employee deployment form submitted:", formData)
  }

  const updateBasicInformation = (data: Partial<EmployeeDeploymentData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const updateOrganizationalStructure = (data: any) => {
    setFormData((prev) => ({
      ...prev,
      deployment: { ...prev.deployment, ...data },
    }))
  }

  const updateDeploymentDetails = (data: any) => {
    setFormData((prev) => ({
      ...prev,
      deployment: { ...prev.deployment, ...data },
    }))
  }

  const updateManagementHierarchy = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const updateSettingsRemarks = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const handleNextTab = () => {
    // Navigate to the next tab in sequence
    const tabOrder = ["basic", "organizational", "deployment", "hierarchy", "settings"]
    const currentIndex = tabOrder.indexOf(activeTab)
    const nextIndex = currentIndex + 1
    if (nextIndex < tabOrder.length) {
      setActiveTab(tabOrder[nextIndex])
    }
  }

  const handlePreviousTab = () => {
    // Navigate to the previous tab in sequence
    const tabOrder = ["basic", "organizational", "deployment", "hierarchy", "settings"]
    const currentIndex = tabOrder.indexOf(activeTab)
    const previousIndex = currentIndex - 1
    if (previousIndex >= 0) {
      setActiveTab(tabOrder[previousIndex])
    }
  }

  // Prepare data for individual form components
  const basicInformationData = {
    employeeCode: formData.employeeCode,
    firstName: formData.firstName,
    middleName: formData.middleName,
    lastName: formData.lastName,
    gender: formData.gender as "male" | "female" | "other" | "prefer-not-to-say",
    photo: formData.photo, // <-- Ensure photo is included
    birthDate: formData.birthDate,
    bloodGroup: formData.bloodGroup as "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-",
    nationality: formData.nationality,
    maritalStatus: formData.maritalStatus as "Unmarried" | "Married" | "Divorced" | "Widowed",
    joiningDate: formData.joiningDate,
    emailID: formData.emailID,
  }

  const organizationalStructureData = {
    subsidiary: formData.deployment.subsidiary,
    division: formData.deployment.division,
    department: formData.deployment.department,
    subDepartment: formData.deployment.subDepartment,
    section: formData.deployment.section,
  }

  const deploymentDetailsData = {
    employeeCategory: formData.deployment.employeeCategory,
    grade: formData.deployment.grade,
    designation: formData.deployment.designation,
    location: formData.deployment.location,
    skillLevel: formData.deployment.skillLevel,
  }

  const managementHierarchyData = {
    manager: formData.manager,
    managerName: "", // Will be auto-filled based on manager selection
  }

  const settingsRemarksData = {
    deployment: {
      effectiveFrom: formData.deployment.effectiveFrom,
      remark: formData.deployment.remark,
    },
    status: "active" as "active" | "pending" | "inactive", // Default status
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <span>HR Management</span>
        <span>/</span>
        <span>Employee Management</span>
        <span>/</span>
        <span className="text-gray-900 font-medium">Employee Deployment</span>
      </div>

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="p-2 hover:bg-blue-50">
            <ArrowLeft className="w-4 h-4 text-blue-600" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Employee Deployment Management</h2>
            <p className="text-gray-600">Manage employee deployment and organizational structure</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="border-gray-300 hover:bg-gray-50 bg-transparent">
            Cancel
          </Button>
          <Button className="bg-gradient-to-r text-white from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg">
            <Save className="w-4 h-4 mr-2" />
            Save Deployment
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Clean Horizontal Tab Navigation */}
          <div className="bg-white rounded-lg border border-gray-200 mb-6 shadow-sm">
            <TabsList className="w-full justify-start bg-transparent border-b border-gray-100 rounded-none p-0 h-auto">
              {[
                { value: "basic", label: "Basic Information", icon: User },
                { value: "organizational", label: "Organizational Structure", icon: Building2 },
                { value: "deployment", label: "Deployment Details", icon: MapPin },
                { value: "hierarchy", label: "Management Hierarchy", icon: Users },
                { value: "settings", label: "Settings & Remarks", icon: Settings },
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
              formData={basicInformationData}
              onFormDataChange={updateBasicInformation}
              onNextTab={handleNextTab}
            />
          </TabsContent>

          {/* Organizational Structure Tab */}
          <TabsContent value="organizational" className="space-y-6">
            <OrganizationalStructureForm
              formData={organizationalStructureData}
              onFormDataChange={updateOrganizationalStructure}
              onNextTab={handleNextTab}
              onPreviousTab={handlePreviousTab}
            />
          </TabsContent>

          {/* Deployment Details Tab */}
          <TabsContent value="deployment" className="space-y-6">
            <DeploymentDetailsForm
              formData={deploymentDetailsData}
              onFormDataChange={updateDeploymentDetails}
              onNextTab={handleNextTab}
              onPreviousTab={handlePreviousTab}
            />
          </TabsContent>

          {/* Management Hierarchy Tab */}
          <TabsContent value="hierarchy" className="space-y-6">
            <ManagementHierarchyForm
              formData={managementHierarchyData}
              onFormDataChange={updateManagementHierarchy}
              onNextTab={handleNextTab}
              onPreviousTab={handlePreviousTab}
            />
          </TabsContent>

          {/* Settings & Remarks Tab */}
          <TabsContent value="settings" className="space-y-6">
            <SettingsRemarksForm
              formData={settingsRemarksData}
              onFormDataChange={updateSettingsRemarks}
              onPreviousTab={handlePreviousTab}
              onSubmit={(data) => {
                console.log("Employee deployment form submitted:", { ...formData, ...data })
                // Handle form submission here
              }}
            />
          </TabsContent>
        </Tabs>

        
      </form>
    </div>
  )
}
