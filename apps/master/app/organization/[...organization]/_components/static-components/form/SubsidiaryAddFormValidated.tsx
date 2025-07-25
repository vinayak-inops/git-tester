"use client"

import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Building2, MapPin, X } from "lucide-react"
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

interface SubsidiaryFormData {
  subsidiaryCode?: string
  subsidiaryName?: string
  subsidiaryDescription?: string
  locationCode?: string[]
}

interface SubsidiaryFormModalProps {
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
    subsidiaryCode: yup
      .string()
      .when([], {
        is: () => isEditMode,
        then: schema => schema,
        otherwise: schema =>
          schema
            .required("Subsidiary code is required")
            .test('unique-subsidiary-code', 'Subsidiary code already exists in the organization', function(value) {
              if (!value) return true;
              const existingSubsidiaries = organizationData.subsidiaries || [];
              const exists = existingSubsidiaries.some((sub: any) => {
                const subId = (sub.id || sub._id || '').toString();
                const editId = (editData?.id || editData?._id || '').toString();
                if (isEditMode && editId && subId === editId) return false;
                return sub.subsidiaryCode === value;
              });
              return !exists;
            })
      }),
    subsidiaryName: yup
      .string()
      .when([], {
        is: () => isEditMode,
        then: schema => schema.required("Subsidiary name is required"),
        otherwise: schema =>
          schema
            .required("Subsidiary name is required")
            .test('unique-subsidiary-name', 'Subsidiary name already exists in the organization', function(value) {
              if (!value) return true;
              const existingSubsidiaries = organizationData.subsidiaries || [];
              const exists = existingSubsidiaries.some((sub: any) => {
                const subId = (sub.id || sub._id || '').toString();
                const editId = (editData?.id || editData?._id || '').toString();
                if (isEditMode && editId && subId === editId) return false;
                return sub.subsidiaryName === value;
              });
              return !exists;
            })
      }),
    subsidiaryDescription: yup.string().optional(),
  })
}

export default function SubsidiaryAddFormValidated({ open, setOpen, organizationData = {}, onSuccess, onServerUpdate, editData, isEditMode, deleteValue }: SubsidiaryFormModalProps) {
  
  // Use the dynamic CRUD hook for 'subsidiaries' category
  const { addCategoryItem, updateCategoryItem, organizationData: crudData, deleteCategoryItem } = useOrganizationCrud('subsidiaries', organizationData)
  
  const { token, loading: tokenLoading, error: tokenError } = useAuthToken();
  
  // State for selected location codes
  const [selectedLocationCodes, setSelectedLocationCodes] = useState<string[]>([])
  
  // Get location options from organization data
  const locationOptions = (organizationData.location || []).map((location: any) => ({
    label: `${location.locationName} (${location.locationCode})`,
    value: location.locationCode
  }))
  
  // Create dynamic schema based on current organization data
  const schema = createSchema(organizationData, isEditMode || false, editData)

  useEffect(() => {
    if (deleteValue) {
      handleDeleteItem(deleteValue.subsidiaryCode)
    }
  }, [deleteValue])

  const handleDeleteItem = async (subsidiaryCode: string) => {
    try {
      console.log("Deleting subsidiary:", subsidiaryCode)
      
      // Delete from local state
      const updatedData = deleteCategoryItem(subsidiaryCode, organizationData)
      
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
        throw new Error(responseData.message || 'Failed to delete subsidiary')
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

      console.log("Subsidiary deleted successfully:", subsidiaryCode)
    } catch (error) {
      console.error("Error deleting subsidiary:", error)
    }
  }
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<SubsidiaryFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      subsidiaryCode: "",
      subsidiaryName: "",
      subsidiaryDescription: "",
      locationCode: [],
    },
  })

  // Populate form with edit data when in edit mode
  useEffect(() => {
    if (isEditMode && editData) {
      setValue("subsidiaryCode", editData.subsidiaryCode || "")
      setValue("subsidiaryName", editData.subsidiaryName || "")
      setValue("subsidiaryDescription", editData.subsidiaryDescription || "")
      setSelectedLocationCodes(editData.locationCode || [])
      setValue("locationCode", editData.locationCode || [])
    } else {
      reset()
      setSelectedLocationCodes([])
    }
  }, [isEditMode, editData, setValue, reset])

  const handleFormSubmit = async (data: SubsidiaryFormData) => {
    console.log("data", data)
    try {
      console.log("Form data:", data)
      console.log("Mode:", isEditMode ? "Edit" : "Add")
      
      let updatedData;
      
      if (isEditMode && editData) {
        // Edit mode - update existing subsidiary
        console.log("editData", editData)
        updatedData = updateCategoryItem(editData.subsidiaryCode, data, organizationData)
      } else {
        // Add mode - add new subsidiary
        updatedData = addCategoryItem(data, organizationData)
      }

      console.log("updatedData", updatedData)

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
            event: isEditMode ? "updateEvent" : "addEvent",
            data: updatedData
          })
        }
      )

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to update organization data');
      }
      
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
      
      console.log(isEditMode ? "Subsidiary updated successfully:" : "Subsidiary added successfully:", data)
    } catch (error) {
      console.error("Error processing subsidiary:", error)
    }
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
    setOpen(false)
  }

  return (
    <SemiPopupWrapper
      open={open}
      setOpen={setOpen}
      content={{
        title: isEditMode ? "Edit Subsidiary" : "Add New Subsidiary",
        description: "Create a new subsidiary entry with detailed information"
      }}
    >
      <div className="w-full h-full flex flex-col overflow-hidden">
        {/* Header - Matching EnhancedHeader Design */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between rounded-t-lg -mx-6 pt-4 mb-4">
          <div className="group cursor-default pl-8">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-200 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:scale-105">
                  <Building2 className="w-5 h-5 text-gray-700 transition-colors duration-300 group-hover:text-gray-900" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-sm animate-pulse"></div>
              </div>
              <div className="transform transition-all duration-300 group-hover:translate-x-1">
                <h1 className="text-lg font-bold flex items-center gap-2">
                  {isEditMode ? "Edit Subsidiary" : "Add New Subsidiary"}
                </h1>
                <p className="text-purple-100 text-sm mt-1">
                  {isEditMode ? "Update subsidiary information" : "Create a new subsidiary entry with detailed information"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit(handleFormSubmit as SubmitHandler<SubsidiaryFormData>)} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="subsidiaryCode">Subsidiary Code</Label>
                  <Input
                    id="subsidiaryCode"
                    {...register("subsidiaryCode")}
                    placeholder="Enter subsidiary code"
                    className={errors.subsidiaryCode?.message ? 'border-red-500' : ''}
                    disabled={isEditMode}
                  />
                  {errors.subsidiaryCode?.message && <p className="text-sm text-red-500">{errors.subsidiaryCode.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subsidiaryName">Subsidiary Name</Label>
                  <Input
                    id="subsidiaryName"
                    {...register("subsidiaryName")}
                    placeholder="Enter subsidiary name"
                    className={errors.subsidiaryName?.message ? 'border-red-500' : ''}
                  />
                  {errors.subsidiaryName?.message && <p className="text-sm text-red-500">{errors.subsidiaryName.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subsidiaryDescription">Description</Label>
                <Textarea
                  id="subsidiaryDescription"
                  {...register("subsidiaryDescription")}
                  placeholder="Enter subsidiary description"
                  rows={3}
                />
              </div>
            </div>

            <Separator />

            {/* Location Codes */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Location Assignment</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Location Codes</Label>
                  <Select onValueChange={handleLocationCodeSelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location codes" />
                    </SelectTrigger>
                    <SelectContent>
                      {locationOptions.map((option:any) => (
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