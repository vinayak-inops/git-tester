"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@repo/ui/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/ui/tabs"
import { Save, ArrowLeft, User, Phone, Building2, FileText, Users, GraduationCap, Briefcase, Heart, Settings, ChevronLeft, ChevronRight } from "lucide-react"
import { PersonalInformationForm } from "./forms/personal-information-form"
import { ContactEmergencyForm } from "./forms/contact-emergency-form"
import { EmploymentDetailsForm } from "./forms/employment-details-form"
import { DocumentsVerificationForm } from "./forms/documents-verification-form"
import { FamilyDependentsForm } from "./forms/family-dependents-form"
import { EducationExperienceForm } from "./forms/education-experience-form"
import { TrainingAssetsForm } from "./forms/training-assets-form"
import { MedicalSafetyForm } from "./forms/medical-safety-form"
import { ActionsStatusForm } from "./forms/actions-status-form"

// Combined interface for all form data
interface EmployeeManagementData {
  // Personal Information
  organizationCode: string
  contractorCode: string
  firstName: string
  middleName: string
  lastName: string
  fatherHusbandName: string
  gender: string
  birthDate: string
  bloodGroup: string
  nationality: string
  maritalStatus: string
  marriageDate: string
  referenceBy: string
  employeeID: string
  tenantCode: string
  manager: string
  superviser: string
  personalRemark: string
  isRejoining: boolean
  oldEmployeeCode: string
  permanentAddressLine1: string
  permanentAddressLine2: string
  permanentCountry: string
  permanentState: string
  permanentCity: string
  permanentPinCode: string
  permanentTaluka: string
  permanentIsVerified: boolean
  temporaryAddressLine1: string
  temporaryAddressLine2: string
  temporaryCountry: string
  temporaryState: string
  temporaryCity: string
  temporaryPinCode: string
  temporaryTaluka: string
  temporaryIsVerified: boolean

  // Contact & Emergency
  primaryEmailID: string
  secondaryEmailID: string
  primaryContactNo: string
  secondaryContactNumber: string
  emergencyContactPerson1: string
  emergencyContactNo1: string
  emergencyContactPerson2: string
  emergencyContactNo2: string

  // Employment Details
  dateOfJoining: string
  contractFrom: string
  contractTo: string
  contractPeriod: number
  workSkillCode: string
  workSkillTitle: string
  paymentMode: string
  subsidiaryCode: string
  subsidiaryName: string
  divisionCode: string
  divisionName: string
  departmentCode: string
  departmentName: string
  subDepartmentCode: string
  subDepartmentName: string
  sectionCode: string
  sectionName: string
  employeeCategoryCode: string
  employeeCategoryTitle: string
  gradeCode: string
  gradeTitle: string
  designationCode: string
  designationName: string
  locationCode: string
  locationName: string
  skilledLevelTitle: string
  skilledLevelDescription: string
  contractorName: string
  deploymentEffectiveFrom: string
  deploymentRemark: string
  bankName: string
  ifscCode: string
  branchName: string
  accountNumber: string
  busNumber: string
  busRegistrationNumber: string
  route: string
  natureOfWorkCode: string
  natureOfWorkTitle: string

  // Documents & Verification
  passport: {
    passportNumber: string
    passportExpiryDate: string
    passportPath?: string
  }
  cards: Array<{
    cardNumber: string
    effectiveFrom: string
    effectiveTo: string
    isPrimaryCard: boolean
  }>
  documents?: Array<{
    documentTypeCode: string
    documentTypeTitle: string
    identificationNumber?: string
    documentPath?: string
  }>
  insuranceNumber?: string
  mediclaimPolicyNumber?: string
  WCPolicyNumber?: string
  accidentPolicyNumber?: string
  uploadedDocuments?: Array<{
    documentCategory: {
      documentCategoryCode: string
      documentCategoryTitle: string
    }
    documentType: {
      documentTypeCode: string
      documentTypeTitle: string
    }
    documentPath?: string
  }>
  workPermit: {
    workpermitNumber: string
    workpermitExpiryDate: string
    workPermitPath?: string
  }
  labourCard: {
    labourCardNumber: string
    labourcardExpiryDate: string
    labourCardPath?: string
  }

  // Family & Dependents - Updated Structure
  familyMember: Array<{
    memberName: string
    relation: string
    gender: string
    birthDate: string
    aadharCard: {
      aadharCardNumber: string
      aadharCardPath?: string
    }
    electionCard: {
      electionCardNumber: string
      electionCardPath?: string
    }
    panCard: {
      panCardNumber: string
      panCardPath?: string
    }
    remark?: string
    isDependent: boolean
  }>
  pfNominee: Array<{
    memberName: string
    relation: string
    birthDate: string
    percentage: string
  }>
  gratuityNominee: Array<{
    memberName: string
    relation: string
    birthDate: string
    percentage: string
  }>

  // Education & Experience - Updated Structure
  highestEducation: {
    educationTitle: string
    courseTitle: string
    stream?: string
    college: string
    yearOfPassing: string
    monthOfPassing: number
    percentage?: string
    isVerified: boolean
  }
  experience: {
    companyName: string
    fromDate: string
    toDate: string
    designation: string
    filePath?: string
  }

  // Training & Assets
  trainings: Array<{
    trainingProgram: {
      trainingProgramCode: string
      trainingProgramTitle: string
    }
    fromDate: string
    toDate: string
    totalDays: number
    totalHours: string
    validUpto: string
    conductedByFaculty: string
    conductedByCompany: string
    filePath?: string
  }>
  assetAllocated: Array<{
    asset: {
      assetCode: string
      assetName: string
      assetType: {
        assetTypeCode: string
        assetTypeTitle: string
      }
    }
    issueDate: string
    returnDate: string
  }>
  workOrder: Array<{
    workOrderNumber: string
    effectiveFrom: string
    effectiveTo: string
  }>

  // Medical & Safety - Updated Structure
  medicalVerificationRemark?: string
  covidVaccine: {
    vaccine1: boolean
    vaccine2: boolean
    vaccine3: boolean
    vaccine1Certificate?: string
    vaccine2Certificate?: string
    vaccine3Certificate?: string
  }
  policeVerification?: Array<{
    verificationDate: string
    nextVerificationDate: string
    description: string
    documentPath?: string
  }>
  medicalCheckup?: Array<{
    checkupDate: string
    nextCheckupDate: string
    description: string
    documentPath?: string
  }>
  accidentRegister?: Array<{
    dateOfAccident: string
    dateOfReport: string
    accidentDescription: string
    dateOfReturn: string
  }>

  // Actions & Status - Updated Structure
  remark?: string
  status: {
    currentStatus: string
    resignationDate?: string
    relievingDate?: string
    notToReHire: boolean
  }
  auditTrail: {
    createdBy: string
    createdOn: string
    updatedBy: string
    updatedOn: string
  }
  penalty?: Array<{
    dateOfOffence: string
    offenceDescription: string
    actionTaken: string
    fineImposed: number
    month: number
    isCauseShownAgainstFine: boolean
    witnessName?: string
    fineRealisedDate?: string
  }>
  disciplinaryAction?: Array<{
    actionTakenOn: string
    issueReportedOn: string
    issuedescription: string
    actionDescription: string
    remark?: string
    status: string
    documentPath?: string
  }>
}

export function EmployeeManagementForm() {
  const [showLeftScroll, setShowLeftScroll] = useState(false)
  const [showRightScroll, setShowRightScroll] = useState(false)
  const tabsRef = useRef<HTMLDivElement>(null)

  const checkScrollButtons = () => {
    if (tabsRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current
      setShowLeftScroll(scrollLeft > 0)
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  const scrollLeft = () => {
    if (tabsRef.current) {
      tabsRef.current.scrollBy({ left: -200, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (tabsRef.current) {
      tabsRef.current.scrollBy({ left: 200, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    checkScrollButtons()
    window.addEventListener('resize', checkScrollButtons)
    return () => window.removeEventListener('resize', checkScrollButtons)
  }, [])

  const [formData, setFormData] = useState<EmployeeManagementData>({
    // Personal Information
    organizationCode: "ALL",
    contractorCode: "CON001",
    firstName: "John",
    middleName: "A.",
    lastName: "Doe",
    fatherHusbandName: "Michael Doe",
    gender: "Male",
    birthDate: "1990-05-15",
    bloodGroup: "O+",
    nationality: "American",
    maritalStatus: "Married",
    marriageDate: "2015-08-20",
    referenceBy: "Jane Smith",
    employeeID: "EMP001",
    tenantCode: "tenant1",
    manager: "EMP001",
    superviser: "EMP002",
    personalRemark: "New hire",
    isRejoining: false,
    oldEmployeeCode: "",
    permanentAddressLine1: "123 Street",
    permanentAddressLine2: "Near Park",
    permanentCountry: "USA",
    permanentState: "California",
    permanentCity: "Los Angeles",
    permanentPinCode: "90001",
    permanentTaluka: "Central",
    permanentIsVerified: true,
    temporaryAddressLine1: "456 Street",
    temporaryAddressLine2: "Near Mall",
    temporaryCountry: "USA",
    temporaryState: "California",
    temporaryCity: "Los Angeles",
    temporaryPinCode: "90002",
    temporaryTaluka: "West",
    temporaryIsVerified: false,

    // Contact & Emergency
    primaryEmailID: "john.doe@example.com",
    secondaryEmailID: "johndoe.backup@example.com",
    primaryContactNo: "1234567890",
    secondaryContactNumber: "0987654321",
    emergencyContactPerson1: "Jane Doe",
    emergencyContactNo1: "1122334455",
    emergencyContactPerson2: "Mike Smith",
    emergencyContactNo2: "2233445566",

    // Employment Details
    dateOfJoining: "2020-10-31",
    contractFrom: "2023-01-01",
    contractTo: "2024-01-01",
    contractPeriod: 12,
    workSkillCode: "WSK001",
    workSkillTitle: "Electrician",
    paymentMode: "Bank Transfer",
    subsidiaryCode: "sub1",
    subsidiaryName: "Subsidiary-1",
    divisionCode: "DIV001",
    divisionName: "Division A",
    departmentCode: "DEPT001",
    departmentName: "Department A",
    subDepartmentCode: "SUBDEPT001",
    subDepartmentName: "Sub Department A",
    sectionCode: "SEC001",
    sectionName: "Section A",
    employeeCategoryCode: "WKM",
    employeeCategoryTitle: "WKM",
    gradeCode: "GRD001",
    gradeTitle: "Grade A",
    designationCode: "D001",
    designationName: "Manager",
    locationCode: "LOC001",
    locationName: "Location A",
    skilledLevelTitle: "Low-Skilled",
    skilledLevelDescription: "Entry-level skills",
    contractorName: "Contractor A",
    deploymentEffectiveFrom: "2024-01-01",
    deploymentRemark: "Deployment Remark",
    bankName: "Bank A",
    ifscCode: "IFSC001",
    branchName: "Branch A",
    accountNumber: "1234567890",
    busNumber: "1234",
    busRegistrationNumber: "REG123",
    route: "Route A",
    natureOfWorkCode: "NOW001",
    natureOfWorkTitle: "Technical",

    // Documents & Verification
    passport: {
      passportNumber: "P1234567",
      passportExpiryDate: "2030-01-01",
      passportPath: "/documents/passport.pdf",
    },
    cards: [{
      cardNumber: "CARD001",
      effectiveFrom: "2023-01-01",
      effectiveTo: "2024-01-01",
      isPrimaryCard: true,
    }],
    documents: [{
      documentTypeCode: "DOC1",
      documentTypeTitle: "PAN CARD",
      identificationNumber: "",
      documentPath: "/documents/idproof.pdf",
    }],
    insuranceNumber: "INS1234567",
    mediclaimPolicyNumber: "MED1234567",
    WCPolicyNumber: "WC1234567",
    accidentPolicyNumber: "ACC1234567",
    uploadedDocuments: [{
      documentCategory: {
        documentCategoryCode: "CAT001",
        documentCategoryTitle: "Identity Proof",
      },
      documentType: {
        documentTypeCode: "DT001",
        documentTypeTitle: "Passport",
      },
      documentPath: "/documents/identityproof.pdf",
    }],
    workPermit: {
      workpermitNumber: "WP1234567",
      workpermitExpiryDate: "2025-01-01",
      workPermitPath: "/documents/workpermit.pdf",
    },
    labourCard: {
      labourCardNumber: "LC1234567",
      labourcardExpiryDate: "2024-01-01",
      labourCardPath: "/documents/labourcard.pdf",
    },

    // Family & Dependents - Updated Structure
    familyMember: [{
      memberName: "Jane Doe",
      relation: "Spouse",
      gender: "Female",
      birthDate: "1992-03-15",
      aadharCard: {
        aadharCardNumber: "123456789012",
        aadharCardPath: "/documents/aadhar.pdf"
      },
      electionCard: {
        electionCardNumber: "ELE1234567",
        electionCardPath: "/documents/electioncard.pdf"
      },
      panCard: {
        panCardNumber: "PAN1234567",
        panCardPath: "/documents/pancard.pdf"
      },
      remark: "N/A",
      isDependent: true
    }],
    pfNominee: [{
      memberName: "Jane Doe",
      relation: "Spouse",
      birthDate: "1992-03-15",
      percentage: "100%"
    }],
    gratuityNominee: [{
      memberName: "Jane Doe",
      relation: "Spouse",
      birthDate: "1992-03-15",
      percentage: "100%"
    }],

    // Education & Experience - Updated Structure
    highestEducation: {
      educationTitle: "B.Tech",
      courseTitle: "Electrical Engineering",
      stream: "Engineering",
      college: "XYZ University",
      yearOfPassing: "2012",
      monthOfPassing: 6,
      percentage: "75%",
      isVerified: true,
    },
    experience: {
      companyName: "ABC Corp",
      fromDate: "2013-01-01",
      toDate: "2022-12-31",
      designation: "Engineer",
      filePath: "/documents/experience.pdf",
    },

    // Training & Assets
    trainings: [{
      trainingProgram: {
        trainingProgramCode: "TRP001",
        trainingProgramTitle: "Safety Training",
      },
      fromDate: "2022-01-01",
      toDate: "2022-01-15",
      totalDays: 15,
      totalHours: "120",
      validUpto: "2023-01-01",
      conductedByFaculty: "Trainer A",
      conductedByCompany: "ABC Corp",
      filePath: "/documents/training.pdf",
    }],
    assetAllocated: [{
      asset: {
        assetCode: "AST001",
        assetName: "Laptop",
        assetType: {
          assetTypeCode: "AT001",
          assetTypeTitle: "Returnable",
        },
      },
      issueDate: "2023-01-01",
      returnDate: "2024-01-01",
    }],
    workOrder: [{
      workOrderNumber: "WON123456",
      effectiveFrom: "2023-01-01",
      effectiveTo: "2023-12-31",
    }],

    // Medical & Safety - Updated Structure
    medicalVerificationRemark: "Cleared",
    covidVaccine: {
      vaccine1: true,
      vaccine2: true,
      vaccine3: false,
      vaccine1Certificate: "vaccine1_cert.pdf",
      vaccine2Certificate: "vaccine2_cert.pdf",
      vaccine3Certificate: "",
    },
    policeVerification: [{
      verificationDate: "2023-01-01",
      nextVerificationDate: "2025-01-01",
      description: "Background Check",
      documentPath: "/documents/policeverification.pdf",
    }],
    medicalCheckup: [{
      checkupDate: "2023-01-01",
      nextCheckupDate: "2024-01-01",
      description: "General Checkup",
      documentPath: "/documents/medicalcheckup.pdf",
    }],
    accidentRegister: [{
      dateOfAccident: "2023-04-01",
      dateOfReport: "2023-04-02",
      accidentDescription: "Slip and Fall",
      dateOfReturn: "2023-04-10",
    }],

    // Actions & Status - Updated Structure
    remark: "New hire",
    status: {
      currentStatus: "Active",
      resignationDate: "2025-05-14",
      relievingDate: "2025-05-20",
      notToReHire: false,
    },
    auditTrail: {
      createdBy: "1",
      createdOn: "2023-04-27",
      updatedBy: "1",
      updatedOn: "2023-06-08",
    },
    penalty: [{
      dateOfOffence: "2023-02-01",
      offenceDescription: "Late Submission",
      actionTaken: "Warning",
      fineImposed: 50,
      month: 2,
      isCauseShownAgainstFine: false,
      witnessName: "Jane Doe",
      fineRealisedDate: "2023-02-10",
    }],
    disciplinaryAction: [{
      actionTakenOn: "2023-03-01",
      issueReportedOn: "2023-02-25",
      issuedescription: "Misconduct",
      actionDescription: "Suspension",
      remark: "N/A",
      status: "Closed",
      documentPath: "/documents/disciplinary.pdf",
    }],
  })

  const handleFormDataChange = (sectionData: Partial<EmployeeManagementData>) => {
    setFormData((prev) => ({ ...prev, ...sectionData }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Employee form submitted:", formData)
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <span>HR Management</span>
        <span>/</span>
        <span>Employee Management</span>
        <span>/</span>
        <span className="text-gray-900 font-medium">New Employee</span>
      </div>

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="p-2 hover:bg-blue-50">
            <ArrowLeft className="w-4 h-4 text-blue-600" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Employee Registration</h2>
            <p className="text-gray-600">Create a comprehensive employee profile</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="border-gray-300 hover:bg-gray-50 bg-transparent">
            Cancel
          </Button>
          <Button className="bg-gradient-to-r text-white from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg">
            <Save className="w-4 h-4 mr-2" />
            Save Employee
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
                <Tabs defaultValue="personal" className="w-full">
          {/* Clean Horizontal Tab Navigation with Scroll Buttons */}
          <div className="bg-white rounded-lg border border-gray-200 mb-6 shadow-sm relative">
            {/* Left Scroll Button */}
            {showLeftScroll && (
              <Button
                variant="ghost"
                size="sm"
                onClick={scrollLeft}
                className="absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-white to-transparent hover:from-gray-50 rounded-l-lg border-r border-gray-200"
              >
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </Button>
            )}

            {/* Right Scroll Button */}
            {showRightScroll && (
              <Button
                variant="ghost"
                size="sm"
                onClick={scrollRight}
                className="absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-white to-transparent hover:from-gray-50 rounded-r-lg border-l border-gray-200"
              >
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </Button>
            )}

            <div 
              ref={tabsRef}
              className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              onScroll={checkScrollButtons}
            >
              <TabsList className="w-full justify-start bg-transparent border-b border-gray-100 rounded-none p-0 h-auto min-w-max">
                {[
                  { value: "personal", label: "Personal Info", icon: User },
                  { value: "contact", label: "Contact & Emergency", icon: Phone },
                  { value: "employment", label: "Employment Details", icon: Building2 },
                  { value: "documents", label: "Documents & Verification", icon: FileText },
                  { value: "family", label: "Family & Dependents", icon: Users },
                  { value: "education", label: "Education & Experience", icon: GraduationCap },
                  { value: "training", label: "Training & Assets", icon: Briefcase },
                  { value: "medical", label: "Medical & Safety", icon: Heart },
                  { value: "status", label: "Actions & Status", icon: Settings },
                ].map((tab) => {
                  const IconComponent = tab.icon
                  return (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className="flex items-center space-x-3 px-4 py-4 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 text-gray-500 hover:text-gray-700 rounded-none font-medium transition-colors duration-200 text-sm whitespace-nowrap"
                    >
                      <IconComponent className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </TabsTrigger>
                  )
                })}
              </TabsList>
            </div>
          </div>

          {/* Personal Information Tab */}
          <TabsContent value="personal" className="space-y-6">
            <PersonalInformationForm
              formData={{
                photo: "",
                firstName: formData.firstName,
                middleName: formData.middleName,
                lastName: formData.lastName,
                fatherHusbandName: formData.fatherHusbandName,
                gender: (["Male", "Female", "Other"].includes(formData.gender) ? formData.gender : "Male") as "Male" | "Female" | "Other",
                birthDate: formData.birthDate,
                bloodGroup: (["A+","A-","B+","B-","AB+","AB-","O+","O-"].includes(formData.bloodGroup) ? formData.bloodGroup : "O+") as "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-",
                nationality: formData.nationality,
                maritalStatus: (["Married", "Unmarried", "Divorced", "Widowed"].includes(formData.maritalStatus) ? formData.maritalStatus : "Unmarried") as "Married" | "Unmarried" | "Divorced" | "Widowed",
                marriageDate: formData.marriageDate,
                address: {
                  permanentAddress: {
                    addressLine1: formData.permanentAddressLine1,
                    addressLine2: formData.permanentAddressLine2,
                    country: formData.permanentCountry,
                    state: formData.permanentState,
                    city: formData.permanentCity,
                    pinCode: formData.permanentPinCode,
                    taluka: formData.permanentTaluka,
                    isVerified: formData.permanentIsVerified,
                  },
                  temporaryAddress: {
                    addressLine1: formData.temporaryAddressLine1,
                    addressLine2: formData.temporaryAddressLine2,
                    country: formData.temporaryCountry,
                    state: formData.temporaryState,
                    city: formData.temporaryCity,
                    pinCode: formData.temporaryPinCode,
                    taluka: formData.temporaryTaluka,
                    isVerified: formData.temporaryIsVerified,
                  },
                },
              }}
              onFormDataChange={handleFormDataChange}
            />
          </TabsContent>

          {/* Contact & Emergency Tab */}
          <TabsContent value="contact" className="space-y-6">
            <ContactEmergencyForm
              formData={{
                emailID: {
                  primaryEmailID: formData.primaryEmailID,
                  secondaryEmailID: formData.secondaryEmailID,
                },
                contactNumber: {
                  primaryContactNo: formData.primaryContactNo,
                  secondarContactNumber: formData.secondaryContactNumber,
                  emergencyContactPerson1: formData.emergencyContactPerson1,
                  emergencyContactNo1: formData.emergencyContactNo1,
                  emergencyContactPerson2: formData.emergencyContactPerson2,
                  emergencyContactNo2: formData.emergencyContactNo2,
                },
              }}
              onFormDataChange={(data) => {
                // Transform nested data back to flat structure for main form
                const flatData: Partial<EmployeeManagementData> = {}
                
                if (data.emailID) {
                  flatData.primaryEmailID = data.emailID.primaryEmailID
                  flatData.secondaryEmailID = data.emailID.secondaryEmailID
                }
                
                if (data.contactNumber) {
                  flatData.primaryContactNo = data.contactNumber.primaryContactNo
                  flatData.secondaryContactNumber = data.contactNumber.secondarContactNumber
                  flatData.emergencyContactPerson1 = data.contactNumber.emergencyContactPerson1
                  flatData.emergencyContactNo1 = data.contactNumber.emergencyContactNo1
                  flatData.emergencyContactPerson2 = data.contactNumber.emergencyContactPerson2
                  flatData.emergencyContactNo2 = data.contactNumber.emergencyContactNo2
                }
                
                handleFormDataChange(flatData)
              }}
              onPreviousTab={() => {
                const tabsList = document.querySelector('[role="tablist"]') as HTMLElement
                const personalTab = tabsList?.querySelector('[value="personal"]') as HTMLElement
                personalTab?.click()
              }}
            />
          </TabsContent>

          {/* Employment Details Tab */}
          <TabsContent value="employment" className="space-y-6">
            <EmploymentDetailsForm
              formData={{
                dateOfJoining: formData.dateOfJoining,
                contractFrom: formData.contractFrom,
                contractTo: formData.contractTo,
                contractPeriod: formData.contractPeriod,
                rejoin: {
                  isRejoining: formData.isRejoining,
                  oldEmployeeCode: formData.oldEmployeeCode,
                },
                workSkill: {
                  workSkillCode: formData.workSkillCode,
                  workSkillTitle: formData.workSkillTitle,
                },
                paymentMode: formData.paymentMode,
                deployment: {
                  subsidiary: {
                    subsidiaryCode: formData.subsidiaryCode,
                    subsidiaryName: formData.subsidiaryName,
                  },
                  division: {
                    divisionCode: formData.divisionCode,
                    divisionName: formData.divisionName,
                  },
                  department: {
                    departmentCode: formData.departmentCode,
                    departmentName: formData.departmentName,
                  },
                  subDepartment: {
                    subDepartmentCode: formData.subDepartmentCode,
                    subDepartmentName: formData.subDepartmentName,
                  },
                  section: {
                    sectionCode: formData.sectionCode,
                    sectionName: formData.sectionName,
                  },
                  employeeCategory: {
                    employeeCategoryCode: formData.employeeCategoryCode,
                    employeeCategoryTitle: formData.employeeCategoryTitle,
                  },
                  grade: {
                    gradeCode: formData.gradeCode,
                    gradeTitle: formData.gradeTitle,
                  },
                  designation: {
                    designationCode: formData.designationCode,
                    designationName: formData.designationName,
                  },
                  location: {
                    locationCode: formData.locationCode,
                    locationName: formData.locationName,
                  },
                  skillLevel: {
                    skilledLevelTitle: formData.skilledLevelTitle,
                    skilledLevelDescription: formData.skilledLevelDescription,
                  },
                  contractor: {
                    contractorName: formData.contractorName,
                  },
                  effectiveFrom: formData.deploymentEffectiveFrom,
                  remark: formData.deploymentRemark,
                },
                busDetail: {
                  busNumber: formData.busNumber,
                  busRegistrationNumber: formData.busRegistrationNumber,
                  route: formData.route,
                },
                natureOfWork: {
                  natureOfWorkCode: formData.natureOfWorkCode,
                  natureOfWorkTitle: formData.natureOfWorkTitle,
                },
                bankDetails: {
                  bankName: formData.bankName,
                  ifscCode: formData.ifscCode,
                  branchName: formData.branchName,
                  accountNumber: formData.accountNumber,
                },
                manager: formData.manager,
                superviser: formData.superviser,
              }}
              onFormDataChange={data => {
                const flat: Partial<EmployeeManagementData> = {
                  dateOfJoining: data.dateOfJoining,
                  contractFrom: data.contractFrom,
                  contractTo: data.contractTo,
                  contractPeriod: data.contractPeriod,
                  isRejoining: data.rejoin?.isRejoining,
                  oldEmployeeCode: data.rejoin?.oldEmployeeCode,
                  paymentMode: data.paymentMode,
                  subsidiaryCode: data.deployment?.subsidiary?.subsidiaryCode,
                  subsidiaryName: data.deployment?.subsidiary?.subsidiaryName,
                  divisionCode: data.deployment?.division?.divisionCode,
                  divisionName: data.deployment?.division?.divisionName,
                  departmentCode: data.deployment?.department?.departmentCode,
                  departmentName: data.deployment?.department?.departmentName,
                  subDepartmentCode: data.deployment?.subDepartment?.subDepartmentCode,
                  subDepartmentName: data.deployment?.subDepartment?.subDepartmentName,
                  sectionCode: data.deployment?.section?.sectionCode,
                  sectionName: data.deployment?.section?.sectionName,
                  employeeCategoryCode: data.deployment?.employeeCategory?.employeeCategoryCode,
                  employeeCategoryTitle: data.deployment?.employeeCategory?.employeeCategoryTitle,
                  gradeCode: data.deployment?.grade?.gradeCode,
                  gradeTitle: data.deployment?.grade?.gradeTitle,
                  designationCode: data.deployment?.designation?.designationCode,
                  designationName: data.deployment?.designation?.designationName,
                  locationCode: data.deployment?.location?.locationCode,
                  locationName: data.deployment?.location?.locationName,
                  skilledLevelTitle: data.deployment?.skillLevel?.skilledLevelTitle,
                  skilledLevelDescription: data.deployment?.skillLevel?.skilledLevelDescription,
                  contractorName: data.deployment?.contractor?.contractorName,
                  deploymentEffectiveFrom: data.deployment?.effectiveFrom,
                  deploymentRemark: data.deployment?.remark,
                  busNumber: data.busDetail?.busNumber,
                  busRegistrationNumber: data.busDetail?.busRegistrationNumber,
                  route: data.busDetail?.route,
                  natureOfWorkCode: data.natureOfWork?.natureOfWorkCode,
                  natureOfWorkTitle: data.natureOfWork?.natureOfWorkTitle,
                  bankName: data.bankDetails?.bankName,
                  ifscCode: data.bankDetails?.ifscCode,
                  branchName: data.bankDetails?.branchName,
                  accountNumber: data.bankDetails?.accountNumber,
                  manager: data.manager,
                  superviser: data.superviser,
                }
                handleFormDataChange(flat)
              }}
              onPreviousTab={() => {
                const tabsList = document.querySelector('[role="tablist"]') as HTMLElement
                const contactTab = tabsList?.querySelector('[value="contact"]') as HTMLElement
                contactTab?.click()
              }}
            />
          </TabsContent>

          {/* Documents & Verification Tab */}
          <TabsContent value="documents" className="space-y-6">
            <DocumentsVerificationForm
              formData={{
                passport: formData.passport,
                cards: formData.cards,
                documents: formData.documents,
                insuranceNumber: formData.insuranceNumber,
                mediclaimPolicyNumber: formData.mediclaimPolicyNumber,
                WCPolicyNumber: formData.WCPolicyNumber,
                accidentPolicyNumber: formData.accidentPolicyNumber,
                uploadedDocuments: formData.uploadedDocuments,
                workPermit: formData.workPermit,
                labourCard: formData.labourCard,
              }}
              onFormDataChange={(data) => {
                // Transform nested data back to flat structure for main form
                const flatData: Partial<EmployeeManagementData> = {}
                
                if (data.passport) {
                  flatData.passport = data.passport
                }
                
                if (data.cards) {
                  flatData.cards = data.cards
                }
                
                if (data.documents) {
                  flatData.documents = data.documents
                }
                
                if (data.insuranceNumber) {
                  flatData.insuranceNumber = data.insuranceNumber
                }
                
                if (data.mediclaimPolicyNumber) {
                  flatData.mediclaimPolicyNumber = data.mediclaimPolicyNumber
                }
                
                if (data.WCPolicyNumber) {
                  flatData.WCPolicyNumber = data.WCPolicyNumber
                }
                
                if (data.accidentPolicyNumber) {
                  flatData.accidentPolicyNumber = data.accidentPolicyNumber
                }
                
                if (data.uploadedDocuments) {
                  flatData.uploadedDocuments = data.uploadedDocuments
                }
                
                if (data.workPermit) {
                  flatData.workPermit = data.workPermit
                }
                
                if (data.labourCard) {
                  flatData.labourCard = data.labourCard
                }
                
                handleFormDataChange(flatData)
              }}
              onPreviousTab={() => {
                const tabsList = document.querySelector('[role="tablist"]') as HTMLElement
                const employmentTab = tabsList?.querySelector('[value="employment"]') as HTMLElement
                employmentTab?.click()
              }}
            />
          </TabsContent>

          {/* Family & Dependents Tab */}
          <TabsContent value="family" className="space-y-6">
            <FamilyDependentsForm
              formData={{
                familyMember: formData.familyMember,
                pfNominee: formData.pfNominee,
                gratuityNominee: formData.gratuityNominee,
              }}
              onFormDataChange={(data) => {
                // Transform nested data back to flat structure for main form
                const flatData: Partial<EmployeeManagementData> = {}
                
                if (data.familyMember) {
                  flatData.familyMember = data.familyMember
                }
                
                if (data.pfNominee) {
                  flatData.pfNominee = data.pfNominee
                }
                
                if (data.gratuityNominee) {
                  flatData.gratuityNominee = data.gratuityNominee
                }
                
                handleFormDataChange(flatData)
              }}
              onPreviousTab={() => {
                const tabsList = document.querySelector('[role="tablist"]') as HTMLElement
                const documentsTab = tabsList?.querySelector('[value="documents"]') as HTMLElement
                documentsTab?.click()
              }}
            />
          </TabsContent>

          {/* Education & Experience Tab */}
          <TabsContent value="education" className="space-y-6">
            <EducationExperienceForm
              formData={{
                highestEducation: formData.highestEducation,
                experience: formData.experience,
              }}
              onFormDataChange={(data) => {
                // Transform nested data back to flat structure for main form
                const flatData: Partial<EmployeeManagementData> = {}
                
                if (data.highestEducation) {
                  flatData.highestEducation = data.highestEducation
                }
                
                if (data.experience) {
                  flatData.experience = data.experience
                }
                
                handleFormDataChange(flatData)
              }}
              onPreviousTab={() => {
                const tabsList = document.querySelector('[role="tablist"]') as HTMLElement
                const familyTab = tabsList?.querySelector('[value="family"]') as HTMLElement
                familyTab?.click()
              }}
            />
          </TabsContent>

          {/* Training & Assets Tab */}
          <TabsContent value="training" className="space-y-6">
            <TrainingAssetsForm
              formData={{
                trainings: formData.trainings,
                assetAllocated: formData.assetAllocated,
                workOrder: formData.workOrder,
              }}
              onFormDataChange={(data) => {
                // Transform nested data back to flat structure for main form
                const flatData: Partial<EmployeeManagementData> = {}
                
                if (data.trainings) {
                  flatData.trainings = data.trainings
                }
                
                if (data.assetAllocated) {
                  flatData.assetAllocated = data.assetAllocated
                }
                
                if (data.workOrder) {
                  flatData.workOrder = data.workOrder
                }
                
                handleFormDataChange(flatData)
              }}
              onPreviousTab={() => {
                const tabsList = document.querySelector('[role="tablist"]') as HTMLElement
                const educationTab = tabsList?.querySelector('[value="education"]') as HTMLElement
                educationTab?.click()
              }}
              onNextTab={() => {
                const tabsList = document.querySelector('[role="tablist"]') as HTMLElement
                const medicalTab = tabsList?.querySelector('[value="medical"]') as HTMLElement
                medicalTab?.click()
              }}
            />
          </TabsContent>

          {/* Medical & Safety Tab */}
          <TabsContent value="medical" className="space-y-6">
            <MedicalSafetyForm
              formData={{
                medicalVerificationRemark: formData.medicalVerificationRemark,
                covidVaccine: formData.covidVaccine,
                policeVerification: formData.policeVerification,
                medicalCheckup: formData.medicalCheckup,
                accidentRegister: formData.accidentRegister,
              }}
              onFormDataChange={(data) => {
                // Transform nested data back to flat structure for main form
                const flatData: Partial<EmployeeManagementData> = {}
                
                if (data.medicalVerificationRemark !== undefined) {
                  flatData.medicalVerificationRemark = data.medicalVerificationRemark
                }
                
                if (data.covidVaccine) {
                  flatData.covidVaccine = data.covidVaccine
                }
                
                if (data.policeVerification) {
                  flatData.policeVerification = data.policeVerification
                }
                
                if (data.medicalCheckup) {
                  flatData.medicalCheckup = data.medicalCheckup
                }
                
                if (data.accidentRegister) {
                  flatData.accidentRegister = data.accidentRegister
                }
                
                handleFormDataChange(flatData)
              }}
              onPreviousTab={() => {
                const tabsList = document.querySelector('[role="tablist"]') as HTMLElement
                const trainingTab = tabsList?.querySelector('[value="training"]') as HTMLElement
                trainingTab?.click()
              }}
              onNextTab={() => {
                const tabsList = document.querySelector('[role="tablist"]') as HTMLElement
                const statusTab = tabsList?.querySelector('[value="status"]') as HTMLElement
                statusTab?.click()
              }}
            />
          </TabsContent>

          {/* Actions & Status Tab */}
          <TabsContent value="status" className="space-y-6">
            <ActionsStatusForm
              formData={{
                remark: formData.remark,
                status: formData.status,
                auditTrail: formData.auditTrail,
                penalty: formData.penalty,
                disciplinaryAction: formData.disciplinaryAction,
              }}
              onFormDataChange={(data) => {
                // Transform nested data back to flat structure for main form
                const flatData: Partial<EmployeeManagementData> = {}
                
                if (data.remark !== undefined) {
                  flatData.remark = data.remark
                }
                
                if (data.status) {
                  flatData.status = data.status
                }
                
                if (data.auditTrail) {
                  flatData.auditTrail = data.auditTrail
                }
                
                if (data.penalty) {
                  flatData.penalty = data.penalty
                }
                
                if (data.disciplinaryAction) {
                  flatData.disciplinaryAction = data.disciplinaryAction
                }
                
                handleFormDataChange(flatData)
              }}
              onPreviousTab={() => {
                const tabsList = document.querySelector('[role="tablist"]') as HTMLElement
                const medicalTab = tabsList?.querySelector('[value="medical"]') as HTMLElement
                medicalTab?.click()
              }}
            />
          </TabsContent>
        </Tabs>

      </form>
    </div>
  )
}
