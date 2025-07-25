"use client"

import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { MapPin } from "lucide-react"
import SemiPopupWrapper from "@repo/ui/components/popupwrapper/semi-popup-wrapper"
import { Separator } from "@repo/ui/components/ui/separator"
import { useOrganizationCrud } from "@/hooks/organization/useCurdOrganization"
import { useAuthToken } from "@repo/ui/hooks/auth/useAuthToken"
import { useEffect } from "react"
import {
  LocationCodeField,
  LocationNameField,
  RegionCodeField,
  AddressFields,
  FormActions
} from "./fields"

interface LocationFormData {
  locationCode?: string
  locationName?: string
  regionCode: string
  countryCode: string
  stateCode: string
  city: string
  pincode: string
}

interface LocationFormModalProps {
  open: boolean
  setOpen: any
  organizationData?: any
  onSuccess?: (updatedOrganizationData: any) => void
  onServerUpdate?: () => Promise<any>
  editData?: any // Data for editing mode
  isEditMode?: boolean // Flag to indicate edit mode
  deleteValue?: any
}

// Custom validation schema with duplicate checks
const createSchema = (organizationData: any, isEditMode: boolean, editData?: any) => {
  return yup.object().shape({
    locationCode: yup
      .string()
      .when([], {
        is: () => isEditMode,
        then: schema => schema, // No validation in edit mode
        otherwise: schema =>
          schema
            .required("Location code is required")
            .test('unique-location-code', 'Location code already exists in the organization', function(value) {
              if (!value) return true;
              const existingLocations = organizationData.location || [];
              const exists = existingLocations.some((loc: any) => {
                const locId = (loc.id || loc._id || '').toString();
                const editId = (editData?.id || editData?._id || '').toString();
                if (isEditMode && editId && locId === editId) return false;
                return loc.locationCode === value;
              });
              return !exists;
            })
      }),
    locationName: yup
      .string()
      .when([], {
        is: () => isEditMode,
        then: schema => schema.required("Location name is required"), // Only required in edit mode
        otherwise: schema =>
          schema
            .required("Location name is required")
            .test('unique-location-name', 'Location name already exists in the organization', function(value) {
              if (!value) return true;
              const existingLocations = organizationData.location || [];
              const exists = existingLocations.some((loc: any) => {
                const locId = (loc.id || loc._id || '').toString();
                const editId = (editData?.id || editData?._id || '').toString();
                if (isEditMode && editId && locId === editId) return false;
                return loc.locationName === value;
              });
              return !exists;
            })
      }),
    regionCode: yup.string().required("Region code is required"),
    countryCode: yup.string().required("Country code is required"),
    stateCode: yup.string().required("State code is required"),
    city: yup.string().required("City is required"),
    pincode: yup
      .string()
      .required("Pincode is required")
      .matches(/^\d{6}$/, "Pincode must be 6 digits"),
  })
}

export default function LocationFormModal({ open, setOpen, organizationData = {}, onSuccess, onServerUpdate, editData, isEditMode, deleteValue }: LocationFormModalProps) {
  
  // Use the dynamic CRUD hook for 'location' category
  const { addCategoryItem, updateCategoryItem, organizationData: crudData, deleteCategoryItem } = useOrganizationCrud('location', organizationData)
  
  const { token, loading: tokenLoading, error: tokenError } = useAuthToken();
  
  // Get region options from organization data
  const regionOptions = (organizationData.region || []).map((region: any) => ({
    label: `${region.regionName} (${region.regionCode})`,
    value: region.regionCode
  }))

  // Create dynamic schema based on current organization data
  const schema = createSchema(organizationData, isEditMode || false, editData)
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<LocationFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      locationCode: "",
      locationName: "",
      regionCode: "",
      countryCode: "",
      stateCode: "",
      city: "",
      pincode: "",
    },
  })


  useEffect(() => {
    if (deleteValue) {
      handleDeleteItem(deleteValue.locationCode)
    }
  }, [deleteValue])

  const handleDeleteItem = async (locationCode: string) => {
    try {
      console.log("Deleting location:", locationCode)
      
      // Delete from local state
      const updatedData = deleteCategoryItem(locationCode, organizationData)
      
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
        throw new Error(responseData.message || 'Failed to delete location')
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

      console.log("Location deleted successfully:", locationCode)
    } catch (error) {
      console.error("Error deleting location:", error)
    }
  }

  // Populate form with edit data when in edit mode
  useEffect(() => {
    if (isEditMode && editData) {
      setValue("locationCode", editData.locationCode || "")
      setValue("locationName", editData.locationName || "")
      setValue("regionCode", editData.regionCode || "")
      setValue("countryCode", editData.countryCode || "")
      setValue("stateCode", editData.stateCode || "")
      setValue("city", editData.city || "")
      setValue("pincode", editData.pincode || "")
    } else {
      // Reset form for add mode
      reset()
    }
  }, [isEditMode, editData, setValue, reset])

  const handleFormSubmit = async (data: LocationFormData) => {
    console.log("data", data)
    try {
      console.log("Form data:", data)
      console.log("Mode:", isEditMode ? "Edit" : "Add")
      
              let updatedData;
        console.log("isEditMode", isEditMode)

        if (isEditMode ) {
          // Edit mode - update existing location
          console.log("editData", editData)
          updatedData = updateCategoryItem(editData.locationCode, data, organizationData)
        } else {
          // Add mode - add new location
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
    
    // Call the success callback with updated organization data
    if (onSuccess) {
      onSuccess(updatedData)
    }

    // Trigger server refresh if callback provided
    if (onServerUpdate) {
      await onServerUpdate()
    }
    
    // Reset form and close popup
    reset()
    setOpen(false)
    
    console.log(isEditMode ? "Location updated successfully:" : "Location added successfully:", data)
    } catch (error) {
      console.error("Error processing location:", error)
    }
  }

  const handleCancel = () => {
    reset()
    setOpen(false)
  }

  return (
    <SemiPopupWrapper
      open={open}
      setOpen={setOpen}
      content={{
        title: "Add New Location",
        description: "Create a new location entry with detailed information"
      }}
    >
      <div className="w-full h-full flex flex-col overflow-hidden">
        {/* Header - Matching EnhancedHeader Design */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between rounded-t-lg -mx-6 pt-4 mb-4">
          <div className="group cursor-default pl-8">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-200 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:scale-105">
                  <MapPin className="w-5 h-5 text-gray-700 transition-colors duration-300 group-hover:text-gray-900" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-sm animate-pulse"></div>
              </div>
              <div className="transform transition-all duration-300 group-hover:translate-x-1">
                <h1 className="text-lg font-bold flex items-center gap-2">
                  {isEditMode ? "Edit Location" : "Add New Location"}
                </h1>
                <p className="text-blue-100 text-sm mt-1">
                  {isEditMode ? "Update location information" : "Create a new location entry with detailed information"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit(handleFormSubmit as SubmitHandler<LocationFormData>)} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <LocationCodeField 
                  register={register} 
                  error={errors.locationCode?.message} 
                  disabled={isEditMode}
                />
                <LocationNameField 
                  register={register} 
                  error={errors.locationName?.message} 
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <RegionCodeField 
                  setValue={setValue}
                  watch={watch}
                  error={errors.regionCode}
                  regionOptions={regionOptions}
                />
              </div>
            </div>

            <Separator />

            {/* Address Information */}
            <AddressFields 
              address={watch('city')}
              city={watch('city')}
              state={watch('stateCode')}
              country={watch('countryCode')}
              zipCode={watch('pincode')}
              onAddressChange={(value) => setValue('city', value)}
              onCityChange={(value) => setValue('city', value)}
              onStateChange={(value) => setValue('stateCode', value)}
              onCountryChange={(value) => setValue('countryCode', value)}
              onZipCodeChange={(value) => setValue('pincode', value)}
            />

            {/* Action Buttons */}
            <FormActions 
              onSave={handleSubmit(handleFormSubmit as SubmitHandler<LocationFormData>)}
              onCancel={handleCancel}
              loading={isSubmitting}
            />
          </form>
        </div>
      </div>
    </SemiPopupWrapper>
  )
}
