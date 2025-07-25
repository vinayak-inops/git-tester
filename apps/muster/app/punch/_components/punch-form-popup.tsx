"use client"

import type React from "react"
import { useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { X, Clock, User, MessageSquare, AlertCircle } from "lucide-react"

// Types
export type PunchReason = "DEFAULT" | "OFFICIAL" | "MEDICAL" | "PERSONAL" | "LUNCH"
export type SwipeMode = "In" | "Out"

export interface PunchApplication {
  id: string
  employee: string
  attendanceDate: string
  reasonCode: PunchReason
  deleted: boolean
  punchedTime: string
  swipeMode: SwipeMode
  transactionTime: string
  comments: string
}

// Constants
const reasonOptions: PunchReason[] = ["DEFAULT", "OFFICIAL", "MEDICAL", "PERSONAL", "LUNCH"]
const swipeOptions: SwipeMode[] = ["In", "Out"]

// Validation Schema
const validationSchema = yup.object({
  employee: yup
    .string()
    .required("Employee name is required")
    .min(2, "Employee name must be at least 2 characters")
    .max(50, "Employee name must not exceed 50 characters")
    .matches(/^[a-zA-Z\s]+$/, "Employee name can only contain letters and spaces"),

  attendanceDate: yup
    .string()
    .required("Attendance date is required")
    .test("not-future", "Attendance date cannot be in the future", (value) => {
      if (!value) return true
      const selectedDate = new Date(value)
      const today = new Date()
      today.setHours(23, 59, 59, 999)
      return selectedDate <= today
    })
    .test("not-too-old", "Attendance date cannot be more than 30 days old", (value) => {
      if (!value) return true
      const selectedDate = new Date(value)
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      return selectedDate >= thirtyDaysAgo
    }),

  reasonCode: yup
    .string()
    .required("Reason code is required")
    .oneOf(["DEFAULT", "OFFICIAL", "MEDICAL", "PERSONAL", "LUNCH"], "Please select a valid reason"),

  deleted: yup.boolean().required("Status is required"),

  punchedTime: yup
    .string()
    .required("Punched time is required")
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Please enter a valid time (HH:MM)")
    .test("business-hours", "Punch time should be within business hours (6 AM - 10 PM)", (value) => {
      if (!value) return true
      const [hours] = value.split(":").map(Number)
      return hours >= 6 && hours <= 22
    }),

  swipeMode: yup.string().required("Swipe mode is required").oneOf(["In", "Out"], "Please select a valid swipe mode"),

  transactionTime: yup
    .string()
    .required("Transaction time is required")
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Please enter a valid time (HH:MM)")
    .test("business-hours", "Transaction time should be within business hours (6 AM - 10 PM)", (value) => {
      if (!value) return true
      const [hours] = value.split(":").map(Number)
      return hours >= 6 && hours <= 22
    }),

  comments: yup
    .string()
    .required("Comments are required")
    .min(10, "Comments must be at least 10 characters")
    .max(500, "Comments must not exceed 500 characters")
    .test("no-profanity", "Comments contain inappropriate language", (value) => {
      if (!value) return true
      const profanityWords = ["spam", "inappropriate"] // Add your profanity list
      return !profanityWords.some((word) => value.toLowerCase().includes(word))
    }),
})

type FormData = yup.InferType<typeof validationSchema>

// Props interface
interface PunchFormPopupProps {
  isOpen: boolean
  onClose: () => void
  initialValues?: Partial<PunchApplication>
  onSubmit: (data: PunchApplication) => void
}

// Main Component
export default function PunchFormPopup({ isOpen, onClose, initialValues = {}, onSubmit }: PunchFormPopupProps) {
  // React Hook Form setup
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isSubmitting, isDirty },
    clearErrors,
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      employee: initialValues.employee || "",
      attendanceDate: initialValues.attendanceDate || "",
      reasonCode: initialValues.reasonCode || "DEFAULT",
      deleted: initialValues.deleted ?? false,
      punchedTime: initialValues.punchedTime || "",
      swipeMode: initialValues.swipeMode || "In",
      transactionTime: initialValues.transactionTime || "",
      comments: initialValues.comments || "",
    },
    mode: "onChange", // Validate on change for real-time feedback
  })

  // Common field styles for consistent height
  const fieldStyles =
    "w-full h-10 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:shadow-lg shadow-sm transition hover:border-blue-400"

  const fieldErrorStyles =
    "w-full h-10 rounded-lg border border-red-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:shadow-lg shadow-sm transition hover:border-red-400"

  // Reset form when popup opens
  useEffect(() => {
    if (isOpen) {
      reset({
        employee: initialValues.employee || "",
        attendanceDate: initialValues.attendanceDate || "",
        reasonCode: initialValues.reasonCode || "DEFAULT",
        deleted: initialValues.deleted ?? false,
        punchedTime: initialValues.punchedTime || "",
        swipeMode: initialValues.swipeMode || "In",
        transactionTime: initialValues.transactionTime || "",
        comments: initialValues.comments || "",
      })
      clearErrors()
    }
  }, [initialValues, isOpen, reset, clearErrors])

  // Handle form submission
  const onFormSubmit = (data: FormData) => {
    const formattedData: any = {
      ...data,
      id: initialValues.id || crypto.randomUUID(),
      reasonCode: data.reasonCode as PunchReason,
    }
    onSubmit(formattedData)
    onClose()
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
      document.body.style.overflow = "hidden" // Prevent background scroll
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
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 -mt-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl flex flex-col" style={{ maxHeight: "90vh" }}>{/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between rounded-t-xl">
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2">
            <Clock className="h-6 w-6" />
            Punch Application Details
            </h2>
            <p className="text-blue-100 text-sm mt-1">Enter the details for the punch application</p>
          </div>
          <button
             onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors"
            aria-label="Close popup"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
              {/* Employee Information Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-lg font-semibold text-gray-800 border-b border-blue-200 pb-2">
                  <User className="h-5 w-5 text-blue-600" />
                  Employee Information
                </div>

                {/* Employee Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Employee <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("employee")}
                    placeholder="Enter employee name"
                    className={errors.employee ? fieldErrorStyles : fieldStyles}
                  />
                  <ErrorMessage error={errors.employee?.message} />
                </div>

                {/* Row: Attendance Date, Reason Code, Status */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Attendance Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      {...register("attendanceDate")}
                      max={new Date().toISOString().split("T")[0]}
                      min={new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
                      className={errors.attendanceDate ? fieldErrorStyles : fieldStyles}
                    />
                    <ErrorMessage error={errors.attendanceDate?.message} />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Reason Code <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      name="reasonCode"
                      control={control}
                      render={({ field }) => (
                        <select {...field} className={errors.reasonCode ? fieldErrorStyles : fieldStyles}>
                          <option value="">Select a Reason</option>
                          {reasonOptions.map((r) => (
                            <option key={r} value={r}>
                              {r}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                    <ErrorMessage error={errors.reasonCode?.message} />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Status</label>
                    <div className="flex gap-4 h-10 items-center">
                      <Controller
                        name="deleted"
                        control={control}
                        render={({ field }) => (
                          <>
                            <label className="flex items-center gap-2 text-sm">
                              <input
                                type="radio"
                                value="false"
                                checked={!field.value}
                                onChange={() => field.onChange(false)}
                                className="accent-blue-600"
                              />
                              Active
                            </label>
                            <label className="flex items-center gap-2 text-sm">
                              <input
                                type="radio"
                                value="true"
                                checked={field.value}
                                onChange={() => field.onChange(true)}
                                className="accent-blue-600"
                              />
                              Deleted
                            </label>
                          </>
                        )}
                      />
                    </div>
                    <ErrorMessage error={errors.deleted?.message} />
                  </div>
                </div>
              </div>

              {/* Punch Details Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-lg font-semibold text-gray-800 border-b border-blue-200 pb-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  Punch Details
                </div>

                {/* First Punch Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Punched Time <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="time"
                      {...register("punchedTime")}
                      className={errors.punchedTime ? fieldErrorStyles : fieldStyles}
                    />
                    <ErrorMessage error={errors.punchedTime?.message} />
                    <p className="text-xs text-gray-500">Business hours: 6:00 AM - 10:00 PM</p>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Swipe Mode <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      name="swipeMode"
                      control={control}
                      render={({ field }) => (
                        <select {...field} className={errors.swipeMode ? fieldErrorStyles : fieldStyles}>
                          <option value="">Select One</option>
                          {swipeOptions.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                    <ErrorMessage error={errors.swipeMode?.message} />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Transaction Time <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="time"
                      {...register("transactionTime")}
                      className={errors.transactionTime ? fieldErrorStyles : fieldStyles}
                    />
                    <ErrorMessage error={errors.transactionTime?.message} />
                    <p className="text-xs text-gray-500">Time when transaction was processed</p>
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-lg font-semibold text-gray-800 border-b border-blue-200 pb-2">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                  Additional Information
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Comments <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register("comments")}
                    placeholder="Enter comments (minimum 10 characters)"
                    rows={4}
                    className={`w-full rounded-lg border ${
                      errors.comments ? "border-red-300" : "border-gray-200"
                    } bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                      errors.comments
                        ? "focus:ring-red-500 focus:border-red-500"
                        : "focus:ring-blue-500 focus:border-blue-500"
                    } focus:shadow-lg shadow-sm resize-none transition hover:border-blue-400`}
                  />
                  <ErrorMessage error={errors.comments?.message} />
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Minimum 10 characters, maximum 500 characters</span>
                    <span className="text-xs text-gray-500">{watch("comments")?.length || 0}/500</span>
                  </div>
                </div>
              </div>

              {/* Form Status */}
              {Object.keys(errors).length > 0 && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 text-red-800 font-medium mb-2">
                    <AlertCircle className="h-4 w-4" />
                    Please fix the following errors:
                  </div>
                  <ul className="text-sm text-red-700 space-y-1">
                    {Object.entries(errors).map(([field, error]) => (
                      <li key={field}>• {error?.message}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Bottom padding for scroll */}
              <div className="pb-4"></div>
            </form>
          </div>
        </div>

        {/* Footer - Fixed at bottom */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-200 flex-shrink-0 rounded-b-xl">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-6 py-2 h-10 rounded-md font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit(onFormSubmit)}
            disabled={isSubmitting || !isDirty}
            className="px-6 py-2 h-10 rounded-md font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Saving..." : "Save Application"}
          </button>
        </div>
      </div>
    </div>
  )
}
