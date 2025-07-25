"use client"

import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Building2, MapPin, X, GitBranch, Settings } from "lucide-react"
import SemiPopupWrapper from "@repo/ui/components/popupwrapper/semi-popup-wrapper"
import { Separator } from "@repo/ui/components/ui/separator"
import { useOrganizationCrud } from "@/hooks/organization/useCurdOrganization"
import { useAuthToken } from "@repo/ui/hooks/auth/useAuthToken"
import { useEffect, useState } from "react"
import { Input } from "@repo/ui/components/ui/input"
import { Label } from "@repo/ui/components/ui/label"
import { Button } from "@repo/ui/components/ui/button"
import { Textarea } from "@repo/ui/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/ui/select"
import { Badge } from "@repo/ui/components/ui/badge"

interface SubDepartmentFormData {
  subDepartmentCode?: string
  subDepartmentName?: string
  subDepartmentDescription?: string
  subsidiaryCode: string
  divisionCode: string
  departmentCode: string
  locationCode?: string[]
}

interface SubDepartmentFormModalProps {
  open: boolean
  setOpen: any
  organizationData?: any
  onSuccess?: (updatedOrganizationData: any) => void
  onServerUpdate?: () => Promise<any>
  editData?: any
  isEditMode?: boolean
  deleteValue?: any
}

// Custom validation schema with duplicate checks
const createSchema = (organizationData: any, isEditMode: boolean, editData?: any) => {
  return yup.object().shape({
    subDepartmentCode: yup
      .string()
      .when([], {
        is: () => isEditMode,
        then: schema => schema,
        otherwise: schema =>
          schema
            .required("Sub Department code is required")
            .test('unique-subdepartment-code', 'Sub Department code already exists in the organization', function(value) {
              if (!value) return true;
              const existingSubDepartments = organizationData.subDepartments || [];
              const exists = existingSubDepartments.some((subDept: any) => {
                const subDeptId = (subDept.id || subDept._id || '').toString();
                const editId = (editData?.id || editData?._id || '').toString();
                if (isEditMode && editId && subDeptId === editId) return false;
                return subDept.subDepartmentCode === value;
              });
              return !exists;
            })
      }),
    subDepartmentName: yup
      .string()
      .when([], {
        is: () => isEditMode,
        then: schema => schema.required("Sub Department name is required"),
        otherwise: schema =>
          schema
            .required("Sub Department name is required")
            .test('unique-subdepartment-name', 'Sub Department name already exists in the organization', function(value) {
              if (!value) return true;
              const existingSubDepartments = organizationData.subDepartments || [];
              const exists = existingSubDepartments.some((subDept: any) => {
                const subDeptId = (subDept.id || subDept._id || '').toString();
                const editId = (editData?.id || editData?._id || '').toString();
                if (isEditMode && editId && subDeptId === editId) return false;
                return subDept.subDepartmentName === value;
              });
              return !exists;
            })
      }),
    subsidiaryCode: yup.string().required("Subsidiary is required"),
    divisionCode: yup.string().required("Division is required"),
    departmentCode: yup.string().required("Department is required"),
    subDepartmentDescription: yup.string().optional(),
  })
}

export default function SubDepartmentAddFormValidated({ open, setOpen, organizationData = {}, onSuccess, onServerUpdate, editData, isEditMode, deleteValue }: SubDepartmentFormModalProps) {
  
  // Use the dynamic CRUD hook for 'subDepartments' category
  const { addCategoryItem, updateCategoryItem, organizationData: crudData, deleteCategoryItem } = useOrganizationCrud('subDepartments', organizationData)
  
  const { token, loading: tokenLoading, error: tokenError } = useAuthToken();
  
  // State for selected values
  const [selectedLocationCodes, setSelectedLocationCodes] = useState<string[]>([])
  const [selectedSubsidiaryCode, setSelectedSubsidiaryCode] = useState<string>("")
  const [selectedDivisionCode, setSelectedDivisionCode] = useState<string>("")
  const [selectedDepartmentCode, setSelectedDepartmentCode] = useState<string>("")
  
  // Get subsidiary options from organization data
  const subsidiaryOptions = (organizationData.subsidiaries || []).map((subsidiary: any) => ({
    label: `${subsidiary.subsidiaryName} (${subsidiary.subsidiaryCode})`,
    value: subsidiary.subsidiaryCode
  }))
  
  // Get filtered division options based on selected subsidiary
  const getFilteredDivisionOptions = () => {
    if (!selectedSubsidiaryCode) return []
    
    return (organizationData.divisions || [])
      .filter((division: any) => division.subsidiaryCode === selectedSubsidiaryCode)
      .map((division: any) => ({
        label: `${division.divisionName} (${division.divisionCode})`,
        value: division.divisionCode
      }))
  }
  
  // Get filtered department options based on selected division
  const getFilteredDepartmentOptions = () => {
    if (!selectedDivisionCode) return []
    
    return (organizationData.departments || [])
      .filter((department: any) => department.divisionCode === selectedDivisionCode)
      .map((department: any) => ({
        label: `${department.departmentName} (${department.departmentCode})`,
        value: department.departmentCode
      }))
  }
  
  // Get filtered location options based on selected department
  const getFilteredLocationOptions = () => {
    if (!selectedDepartmentCode) return []
    
    const selectedDepartment = organizationData.departments?.find((dept: any) => dept.departmentCode === selectedDepartmentCode)
    if (!selectedDepartment || !selectedDepartment.locationCode) return []
    
    const departmentLocationCodes = Array.isArray(selectedDepartment.locationCode) 
      ? selectedDepartment.locationCode 
      : [selectedDepartment.locationCode]
    
    return (organizationData.location || [])
      .filter((location: any) => departmentLocationCodes.includes(location.locationCode))
      .map((location: any) => ({
        label: `${location.locationName} (${location.locationCode})`,
        value: location.locationCode
      }))
  }
  
  const divisionOptions = getFilteredDivisionOptions()
  const departmentOptions = getFilteredDepartmentOptions()
  const locationOptions = getFilteredLocationOptions()
  
  // Create dynamic schema based on current organization data
  const schema = createSchema(organizationData, isEditMode || false, editData)

  useEffect(() => {
    if (deleteValue) {
      handleDeleteItem(deleteValue.subDepartmentCode)
    }
  }, [deleteValue])

  const handleDeleteItem = async (subDepartmentCode: string) => {
    try {
      console.log("Deleting sub department:", subDepartmentCode)
      
      // Delete from local state
      const updatedData = deleteCategoryItem(subDepartmentCode, organizationData)
      
      // Call server to update
      const response = await fetch(
        "http://192.168.88.100:8000/api/command/attendance/organization",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            tenant: "Midhani",
            action: "update",
            id: updatedData._id,
            collectionName: "organization",
            event: "deleteEvent",
            data: updatedData
          })
        }
      )

      const responseData = await response.json()
      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to delete sub department')
      }

      console.log("Server delete successful:", responseData)
      
      // Call success callback to update parent state
      if (onSuccess) {
        onSuccess(updatedData)
      }

      // Trigger server refresh
      if (onServerUpdate) {
        await onServerUpdate()
      }

      console.log("Sub Department deleted successfully:", subDepartmentCode)
    } catch (error) {
      console.error("Error deleting sub department:", error)
    }
  }
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<SubDepartmentFormData>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      subDepartmentCode: "",
      subDepartmentName: "",
      subDepartmentDescription: "",
      subsidiaryCode: "",
      divisionCode: "",
      departmentCode: "",
      locationCode: [],
    },
  })

  // Populate form with edit data when in edit mode
  useEffect(() => {
    if (isEditMode && editData) {
      setValue("subDepartmentCode", editData.subDepartmentCode || "")
      setValue("subDepartmentName", editData.subDepartmentName || "")
      setValue("subDepartmentDescription", editData.subDepartmentDescription || "")
      setValue("subsidiaryCode", editData.subsidiaryCode || "")
      setValue("divisionCode", editData.divisionCode || "")
      setValue("departmentCode", editData.departmentCode || "")
      setSelectedSubsidiaryCode(editData.subsidiaryCode || "")
      setSelectedDivisionCode(editData.divisionCode || "")
      setSelectedDepartmentCode(editData.departmentCode || "")
      setSelectedLocationCodes(editData.locationCode || [])
      setValue("locationCode", editData.locationCode || [])
    } else {
      reset()
      setSelectedLocationCodes([])
      setSelectedSubsidiaryCode("")
      setSelectedDivisionCode("")
      setSelectedDepartmentCode("")
    }
  }, [isEditMode, editData, setValue, reset])

  const handleFormSubmit = async (data: SubDepartmentFormData) => {
    console.log("data", data)
    try {
      console.log("Form data:", data)
      console.log("Mode:", isEditMode ? "Edit" : "Add")
      
      let updatedData;
      
      if (isEditMode && editData) {
        // Edit mode - update existing sub department
        console.log("editData", editData)
        updatedData = updateCategoryItem(editData.subDepartmentCode, data, organizationData)
      } else {
        // Add mode - add new sub department
        updatedData = addCategoryItem(data, organizationData)
      }

      console.log("updatedData", updatedData)
      console.log("updatedData._id", updatedData._id)

      const response = await fetch(
        "http://192.168.88.100:8000/api/command/attendance/organization",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                tenant: "Midhani",
                action: "update",
                id: updatedData._id,
                collectionName: "organization",
                event: "updateEvent",
                data: updatedData
            })
        }
    );

    const responseData = await response.json();
    if (!response.ok) {
        throw new Error(responseData.message || 'Failed to update organization data');
    }
    
    // Only proceed if we have a valid _id in the response
    if (!responseData._id) {
        throw new Error('No report ID received from server');
    }

    console.log("Server update successful:", responseData)
    
    if (onSuccess) {
      onSuccess(updatedData)
    }

    if (onServerUpdate) {
      await onServerUpdate()
    }
    
    reset()
    setOpen(false)
    
    console.log(isEditMode ? "Sub Department updated successfully:" : "Sub Department added successfully:", data)
    } catch (error) {
      console.error("Error processing sub department:", error)
    }
  }

  // Handle subsidiary selection
  const handleSubsidiarySelect = (subsidiaryCode: string) => {
    setSelectedSubsidiaryCode(subsidiaryCode)
    setValue("subsidiaryCode", subsidiaryCode)
    // Clear division, department and location codes when subsidiary changes
    setSelectedDivisionCode("")
    setValue("divisionCode", "")
    setSelectedDepartmentCode("")
    setValue("departmentCode", "")
    setSelectedLocationCodes([])
    setValue("locationCode", [])
  }

  // Handle division selection
  const handleDivisionSelect = (divisionCode: string) => {
    setSelectedDivisionCode(divisionCode)
    setValue("divisionCode", divisionCode)
    // Clear department and location codes when division changes
    setSelectedDepartmentCode("")
    setValue("departmentCode", "")
    setSelectedLocationCodes([])
    setValue("locationCode", [])
  }

  // Handle department selection
  const handleDepartmentSelect = (departmentCode: string) => {
    setSelectedDepartmentCode(departmentCode)
    setValue("departmentCode", departmentCode)
    // Clear location codes when department changes
    setSelectedLocationCodes([])
    setValue("locationCode", [])
  }

  // Handle location code selection
  const handleLocationCodeSelect = (locationCode: string) => {
    if (!selectedLocationCodes.includes(locationCode)) {
      const updatedCodes = [...selectedLocationCodes, locationCode]
      setSelectedLocationCodes(updatedCodes)
      setValue("locationCode", updatedCodes)
    }
  }

  // Handle location code removal
  const handleLocationCodeRemove = (locationCode: string) => {
    const updatedCodes = selectedLocationCodes.filter(code => code !== locationCode)
    setSelectedLocationCodes(updatedCodes)
    setValue("locationCode", updatedCodes)
  }

  const handleCancel = () => {
    reset()
    setSelectedLocationCodes([])
    setSelectedSubsidiaryCode("")
    setSelectedDivisionCode("")
    setSelectedDepartmentCode("")
    setOpen(false)
  }

  return (
    <SemiPopupWrapper
      open={open}
      setOpen={setOpen}
      content={{
        title: isEditMode ? "Edit Sub Department" : "Add New Sub Department",
        description: "Create a new sub department entry with detailed information"
      }}
    >
      <div className="w-full h-full flex flex-col overflow-hidden">
        {/* Header - Matching EnhancedHeader Design */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between rounded-t-lg -mx-6 pt-4 mb-4">
          <div className="group cursor-default pl-8">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-200 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:scale-105">
                  <Settings className="w-5 h-5 text-gray-700 transition-colors duration-300 group-hover:text-gray-900" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-sm animate-pulse"></div>
              </div>
              <div className="transform transition-all duration-300 group-hover:translate-x-1">
                <h1 className="text-lg font-bold flex items-center gap-2">
                  {isEditMode ? "Edit Sub Department" : "Add New Sub Department"}
                </h1>
                <p className="text-purple-100 text-sm mt-1">
                  {isEditMode ? "Update sub department information" : "Create a new sub department entry with detailed information"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit(handleFormSubmit as SubmitHandler<SubDepartmentFormData>)} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="subDepartmentCode">Sub Department Code</Label>
                  <Input
                    id="subDepartmentCode"
                    {...register("subDepartmentCode")}
                    placeholder="Enter sub department code"
                    className={errors.subDepartmentCode?.message ? 'border-red-500' : ''}
                    disabled={isEditMode}
                  />
                  {errors.subDepartmentCode?.message && <p className="text-sm text-red-500">{errors.subDepartmentCode.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subDepartmentName">Sub Department Name</Label>
                  <Input
                    id="subDepartmentName"
                    {...register("subDepartmentName")}
                    placeholder="Enter sub department name"
                    className={errors.subDepartmentName?.message ? 'border-red-500' : ''}
                  />
                  {errors.subDepartmentName?.message && <p className="text-sm text-red-500">{errors.subDepartmentName.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subDepartmentDescription">Description</Label>
                <Textarea
                  id="subDepartmentDescription"
                  {...register("subDepartmentDescription")}
                  placeholder="Enter sub department description"
                  rows={3}
                />
              </div>
            </div>

            <Separator />

            {/* Parent Hierarchy */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Parent Hierarchy</h3>
              
              {/* Subsidiary and Division Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Subsidiary</Label>
                  <Select onValueChange={handleSubsidiarySelect} value={selectedSubsidiaryCode}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subsidiary" />
                    </SelectTrigger>
                    <SelectContent>
                      {subsidiaryOptions.map((option: any) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.subsidiaryCode?.message && <p className="text-sm text-red-500">{errors.subsidiaryCode.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label>Division</Label>
                  <Select onValueChange={handleDivisionSelect} value={selectedDivisionCode} disabled={!selectedSubsidiaryCode}>
                    <SelectTrigger>
                      <SelectValue placeholder={selectedSubsidiaryCode ? "Select a division" : "First select a subsidiary"} />
                    </SelectTrigger>
                    <SelectContent>
                      {divisionOptions.map((option: any) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.divisionCode?.message && <p className="text-sm text-red-500">{errors.divisionCode.message}</p>}
                </div>
              </div>

              {/* Department Selection */}
              <div className="space-y-2">
                <Label>Department</Label>
                <Select onValueChange={handleDepartmentSelect} value={selectedDepartmentCode} disabled={!selectedDivisionCode}>
                  <SelectTrigger>
                    <SelectValue placeholder={selectedDivisionCode ? "Select a department" : "First select a division"} />
                  </SelectTrigger>
                  <SelectContent>
                    {departmentOptions.map((option: any) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.departmentCode?.message && <p className="text-sm text-red-500">{errors.departmentCode.message}</p>}
              </div>
            </div>

            <Separator />

            {/* Location Codes */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Location Assignment</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Location Codes</Label>
                  <Select onValueChange={handleLocationCodeSelect} disabled={!selectedDepartmentCode}>
                    <SelectTrigger>
                      <SelectValue placeholder={selectedDepartmentCode ? "Select location codes" : "First select a department"} />
                    </SelectTrigger>
                    <SelectContent>
                      {locationOptions.map((option: any) => (
                        <SelectItem 
                          key={option.value} 
                          value={option.value}
                          disabled={selectedLocationCodes.includes(option.value)}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Selected Location Codes */}
                {selectedLocationCodes.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Selected Locations:</Label>
                    <div className="flex flex-wrap gap-2">
                      {selectedLocationCodes.map((code) => {
                        const location = organizationData.location?.find((loc: any) => loc.locationCode === code)
                        return (
                          <Badge 
                            key={code} 
                            variant="secondary" 
                            className="flex items-center gap-1 px-3 py-1"
                          >
                            <MapPin className="w-3 h-3" />
                            {location ? `${location.locationName} (${code})` : code}
                            <button
                              type="button"
                              onClick={() => handleLocationCodeRemove(code)}
                              className="ml-1 hover:text-red-500"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                style={{ backgroundColor: '#2d81ff' }}
                className="hover:opacity-90"
              >
                {isSubmitting ? "Saving..." : (isEditMode ? "Update" : "Save")}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </SemiPopupWrapper>
  )
} 