"use client"

import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { MapPin } from "lucide-react"
import SemiPopupWrapper from "@repo/ui/components/popupwrapper/semi-popup-wrapper"
import { useOrganizationCrud } from "@/hooks/organization/useCurdOrganization"
import { useAuthToken } from "@repo/ui/hooks/auth/useAuthToken"
import { useEffect } from "react"
import { Input } from "@repo/ui/components/ui/input"
import { Label } from "@repo/ui/components/ui/label"
import { Button } from "@repo/ui/components/ui/button"

interface StateFormData {
  countryCode: string
  stateCode: string
  stateName: string
  region: string
}

interface StateFormModalProps {
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
    countryCode: yup
      .string()
      .required("Country code is required"),
    stateCode: yup
      .string()
      .when([], {
        is: () => isEditMode,
        then: schema => schema.required("State code is required"),
        otherwise: schema =>
          schema
            .required("State code is required")
            .test('unique-state-code', 'State code already exists in the organization', function(value) {
              if (!value) return true;
              const existingStates = organizationData.state || [];
              const exists = existingStates.some((state: any) => {
                const stateId = (state.id || state._id || '').toString();
                const editId = (editData?.id || editData?._id || '').toString();
                if (isEditMode && editId && stateId === editId) return false;
                return state.stateCode === value;
              });
              return !exists;
            })
      }),
    stateName: yup
      .string()
      .when([], {
        is: () => isEditMode,
        then: schema => schema.required("State name is required"),
        otherwise: schema =>
          schema
            .required("State name is required")
            .test('unique-state-name', 'State name already exists in the organization', function(value) {
              if (!value) return true;
              const existingStates = organizationData.state || [];
              const exists = existingStates.some((state: any) => {
                const stateId = (state.id || state._id || '').toString();
                const editId = (editData?.id || editData?._id || '').toString();
                if (isEditMode && editId && stateId === editId) return false;
                return state.stateName === value;
              });
              return !exists;
            })
      }),
    region: yup.string().required("Region is required"),
  })
}

export default function StateAddFormValidated({ open, setOpen, organizationData = {}, onSuccess, onServerUpdate, editData, isEditMode, deleteValue }: StateFormModalProps) {
  
  // Use the dynamic CRUD hook for 'state' category
  const { addCategoryItem, updateCategoryItem, organizationData: crudData, deleteCategoryItem } = useOrganizationCrud('state', organizationData)
  
  const { token, loading: tokenLoading, error: tokenError } = useAuthToken();
  
  // Create dynamic schema based on current organization data
  const schema = createSchema(organizationData, isEditMode || false, editData)

  useEffect(() => {
    if (deleteValue) {
      handleDeleteItem(deleteValue.stateCode)
    }
  }, [deleteValue])

  const handleDeleteItem = async (stateCode: string) => {
    try {
      console.log("Deleting state:", stateCode)
      
      // Delete from local state
      const updatedData = deleteCategoryItem(stateCode, organizationData)
      
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
        throw new Error(responseData.message || 'Failed to delete state')
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

      console.log("State deleted successfully:", stateCode)
    } catch (error) {
      console.error("Error deleting state:", error)
    }
  }
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<StateFormData>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      countryCode: "",
      stateCode: "",
      stateName: "",
      region: "",
    },
  })

  // Populate form with edit data when in edit mode
  useEffect(() => {
    if (isEditMode && editData) {
      setValue("countryCode", editData.countryCode || "")
      setValue("stateCode", editData.stateCode || "")
      setValue("stateName", editData.stateName || "")
      setValue("region", editData.region || "")
    } else {
      reset()
    }
  }, [isEditMode, editData, setValue, reset])

  const handleFormSubmit = async (data: StateFormData) => {
    console.log("data", data)
    try {
      console.log("Form data:", data)
      console.log("Mode:", isEditMode ? "Edit" : "Add")
      
      let updatedData;
      
      if (isEditMode && editData) {
        // Edit mode - update existing state
        console.log("editData", editData)
        updatedData = updateCategoryItem(editData.stateCode, data, organizationData)
      } else {
        // Add mode - add new state
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
    
    console.log(isEditMode ? "State updated successfully:" : "State added successfully:", data)
    } catch (error) {
      console.error("Error processing state:", error)
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
        title: isEditMode ? "Edit State" : "Add New State",
        description: "Create a new state entry with detailed information"
      }}
    >
      <div className="w-full h-full flex flex-col overflow-hidden">
        {/* Header - Matching EnhancedHeader Design */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 flex items-center justify-between rounded-t-lg -mx-6 pt-4 mb-4">
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
                  {isEditMode ? "Edit State" : "Add New State"}
                </h1>
                <p className="text-green-100 text-sm mt-1">
                  {isEditMode ? "Update state information" : "Create a new state entry with detailed information"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit(handleFormSubmit as SubmitHandler<StateFormData>)} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="countryCode">Country Code</Label>
                  <Input
                    id="countryCode"
                    {...register("countryCode")}
                    placeholder="Enter country code (e.g., IN)"
                    className={errors.countryCode?.message ? 'border-red-500' : ''}
                  />
                  {errors.countryCode?.message && <p className="text-sm text-red-500">{errors.countryCode.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stateCode">State Code</Label>
                  <Input
                    id="stateCode"
                    {...register("stateCode")}
                    placeholder="Enter state code (e.g., OR)"
                    className={errors.stateCode?.message ? 'border-red-500' : ''}
                    disabled={isEditMode}
                  />
                  {errors.stateCode?.message && <p className="text-sm text-red-500">{errors.stateCode.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stateName">State Name</Label>
                  <Input
                    id="stateName"
                    {...register("stateName")}
                    placeholder="Enter state name (e.g., Odisha)"
                    className={errors.stateName?.message ? 'border-red-500' : ''}
                  />
                  {errors.stateName?.message && <p className="text-sm text-red-500">{errors.stateName.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="region">Region</Label>
                  <Input
                    id="region"
                    {...register("region")}
                    placeholder="Enter region (e.g., Eastern India)"
                    className={errors.region?.message ? 'border-red-500' : ''}
                  />
                  {errors.region?.message && <p className="text-sm text-red-500">{errors.region.message}</p>}
                </div>
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