"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { X, Calendar, User, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"

// Types
export interface AttendanceRequest {
  name: string
  employeeId: string
}

// Validation Schema
const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  employeeId: yup.string().when([], {
    is: () => false,
    then: (schema) => schema,
    otherwise: (schema) => schema,
  }),
})

type FormData = yup.InferType<typeof validationSchema>

// Props interface
interface AttendancePopupProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: AttendanceRequest) => void
}

// Main Component
export default function AttendancePopup({ isOpen, onClose, onSubmit }: AttendancePopupProps) {
  const router = useRouter()
  const [showEmployerFilter, setShowEmployerFilter] = useState(false)
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("")
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  const [filterErrors, setFilterErrors] = useState<{employeeId?: string, fromDate?: string, toDate?: string}>({})
  const employeeIds = ["EMP001", "EMP002", "EMP003", "EMP004"] // Example static list

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      employeeId: "",
    },
    mode: "onChange",
  })

  // Field styles
  const fieldStyles =
    "w-full h-10 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:shadow-lg shadow-sm transition hover:border-blue-400"
  const fieldErrorStyles =
    "w-full h-10 rounded-lg border border-red-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:shadow-lg shadow-sm transition hover:border-red-400"

  // Reset form when popup opens
  useEffect(() => {
    if (isOpen) {
      reset()
      clearErrors()
    }
  }, [isOpen, reset, clearErrors])

  // Handle form submission
  const onFormSubmit = (data: FormData) => {
    setShowEmployerFilter(true)
  }

  // Handle Employer Filter Submit
  const handleEmployerFilterSubmit = () => {
    const errors: {employeeId?: string, fromDate?: string, toDate?: string} = {}
    if (!selectedEmployeeId) {
      errors.employeeId = "Employee ID is required"
    }
    if (!fromDate) {
      errors.fromDate = "From date is required"
    } else if (new Date(fromDate) > new Date()) {
      errors.fromDate = "From date cannot be in the future"
    }
    if (!toDate) {
      errors.toDate = "To date is required"
    } else if (new Date(toDate) > new Date()) {
      errors.toDate = "To date cannot be in the future"
    } else if (fromDate && new Date(toDate) < new Date(fromDate)) {
      errors.toDate = "To date must be after from date"
    }
    setFilterErrors(errors)
    if (Object.keys(errors).length === 0) {
      // No errors, proceed with submission logic
      router.push(
        `/punch/individual-punch/table/information?employeeId=${selectedEmployeeId}&fromdate=${fromDate}&todate=${toDate}`
      );
    }
  }

  // Handle backdrop click to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  // Error message component
  const ErrorMessage = ({ error }: { error?: string }) => {
    if (!error) return null
    return (
      <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
        <AlertCircle className="h-3 w-3" />
        {error}
      </div>
    )
  }

  // Don't render if not open
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between rounded-t-xl">
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              View Attendance
            </h2>
            <p className="text-blue-100 text-sm mt-1">Select date range and view format</p>
          </div>
          <button
            onClick={() => router.push("http://localhost:3006/muster/punch")}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors"
            aria-label="Close popup"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
            {/* Name Field and Search Button in a Row */}
            <div className="flex items-end gap-2">
              <div className="flex-1 space-y-2">
                <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <User className="h-4 w-4 text-blue-600" />
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("name")}
                  placeholder="Enter employee name"
                  className={errors.name ? fieldErrorStyles : fieldStyles}
                />
                <ErrorMessage error={errors.name?.message} />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 h-10 rounded-md font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                style={{ marginBottom: 0 }}
              >
                {isSubmitting ? "Loading..." : "Search"}
              </button>
            </div>

            {/* Error Summary */}
            {Object.keys(errors).length > 0 && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2 text-red-800 font-medium text-sm">
                  <AlertCircle className="h-4 w-4" />
                  Please fix the errors above
                </div>
              </div>
            )}
          </form>

          {/* Employer Filter Section (shown after Search) */}
          {showEmployerFilter && (
            <div className="mt-6 bg-white ">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <User className="h-4 w-4 text-blue-600" />
                Employee ID <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedEmployeeId}
                onChange={e => setSelectedEmployeeId(e.target.value)}
                className={fieldStyles}
              >
                <option value="" disabled>Select Employee ID</option>
                {employeeIds.map(id => (
                  <option key={id} value={id}>{id}</option>
                ))}
              </select>
              {filterErrors.employeeId && (
                <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                  <AlertCircle className="h-3 w-3" />
                  {filterErrors.employeeId}
                </div>
              )}
              {selectedEmployeeId && (
                <div className="mt-3 text-green-700 text-sm font-medium flex items-center gap-2">
                  <User className="h-4 w-4 text-green-600" />
                  Selected Employee ID: {selectedEmployeeId}
                </div>
              )}

              {/* From Date and To Date Fields */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    From Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    className={fieldStyles}
                    max={new Date().toISOString().split("T")[0]}
                    value={fromDate}
                    onChange={e => setFromDate(e.target.value)}
                  />
                  {filterErrors.fromDate && (
                    <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                      <AlertCircle className="h-3 w-3" />
                      {filterErrors.fromDate}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    To Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    className={fieldStyles}
                    max={new Date().toISOString().split("T")[0]}
                    value={toDate}
                    onChange={e => setToDate(e.target.value)}
                  />
                  {filterErrors.toDate && (
                    <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                      <AlertCircle className="h-3 w-3" />
                      {filterErrors.toDate}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-200 rounded-b-xl">
          <button
            type="button"
            onClick={() => router.push("http://localhost:3006/muster/punch")}
            disabled={isSubmitting}
            className="px-4 py-2 h-9 rounded-md font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors disabled:opacity-50 text-sm"
          >
            Cancel
          </button>
          {showEmployerFilter && (
            <button
              type="button"
              onClick={handleEmployerFilterSubmit}
              className="px-4 py-2 h-9 rounded-md font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
