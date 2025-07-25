"use client"

import type React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import * as yup from "yup"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Input } from "@repo/ui/components/ui/input"
import { Label } from "@repo/ui/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/ui/select"
import { Separator } from "@repo/ui/components/ui/separator"
import { Button } from "@repo/ui/components/ui/button"
import { User, Building2, Mail, Calendar, Globe, Phone, Clock, Camera, Upload, X, RotateCcw, ArrowRight } from "lucide-react"
import { useState } from "react"

// Zod Schema for validation
const basicInformationSchema = z.object({
  employeeCode: z.string().min(1, "Employee code is required").regex(/^EMP\d{3,}$/, "Employee code must start with EMP followed by numbers"),
  firstName: z.string().min(2, "First name must be at least 2 characters").max(50, "First name must be less than 50 characters"),
  middleName: z.string().optional(),
  lastName: z.string().min(2, "Last name must be at least 2 characters").max(50, "Last name must be less than 50 characters"),
  gender: z.enum(["male", "female", "other", "prefer-not-to-say"], {
    required_error: "Please select a gender",
  }),
  birthDate: z.string().min(1, "Birth date is required").refine((date) => {
    const birthDate = new Date(date)
    const today = new Date()
    const age = today.getFullYear() - birthDate.getFullYear()
    return age >= 18 && age <= 100
  }, "Age must be between 18 and 100 years"),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
    required_error: "Please select a blood group",
  }),
  photo: z.string().optional(),
  nationality: z.string().min(2, "Nationality must be at least 2 characters").max(50, "Nationality must be less than 50 characters"),
  maritalStatus: z.enum(["Unmarried", "Married", "Divorced", "Widowed"], {
    required_error: "Please select a marital status",
  }),
  joiningDate: z.string().min(1, "Joining date is required").refine((date) => {
    const joiningDate = new Date(date)
    const today = new Date()
    return joiningDate <= today
  }, "Joining date cannot be in the future"),
  emailID: z.string().email("Please enter a valid email address"),
})

// Yup Schema for additional validation
const yupSchema = yup.object({
  employeeCode: yup
    .string()
    .required("Employee code is required")
    .matches(/^EMP\d{3,}$/, "Employee code must start with EMP followed by numbers"),
  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .matches(/^[a-zA-Z\s]+$/, "First name can only contain letters and spaces"),
  middleName: yup
    .string()
    .optional()
    .matches(/^[a-zA-Z\s]*$/, "Middle name can only contain letters and spaces"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters")
    .matches(/^[a-zA-Z\s]+$/, "Last name can only contain letters and spaces"),
  gender: yup
    .string()
    .required("Gender is required")
    .oneOf(["male", "female", "other", "prefer-not-to-say"], "Please select a valid gender"),
  birthDate: yup
    .string()
    .required("Birth date is required")
    .test("age", "Age must be between 18 and 100 years", function(value) {
      if (!value) return false
      const birthDate = new Date(value)
      const today = new Date()
      const age = today.getFullYear() - birthDate.getFullYear()
      return age >= 18 && age <= 100
    }),
  bloodGroup: yup
    .string()
    .required("Blood group is required")
    .oneOf(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], "Please select a valid blood group"),
  photo: yup.string().optional(),
  nationality: yup
    .string()
    .required("Nationality is required")
    .min(2, "Nationality must be at least 2 characters")
    .max(50, "Nationality must be less than 50 characters")
    .matches(/^[a-zA-Z\s]+$/, "Nationality can only contain letters and spaces"),
  maritalStatus: yup
    .string()
    .required("Marital status is required")
    .oneOf(["Unmarried", "Married", "Divorced", "Widowed"], "Please select a valid marital status"),
  joiningDate: yup
    .string()
    .required("Joining date is required")
    .test("future-date", "Joining date cannot be in the future", function(value) {
      if (!value) return false
      const joiningDate = new Date(value)
      const today = new Date()
      return joiningDate <= today
    }),
  emailID: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
})

type BasicInformationData = z.infer<typeof basicInformationSchema>

interface BasicInformationFormProps {
  formData: BasicInformationData
  onFormDataChange: (data: Partial<BasicInformationData>) => void
  onNextTab?: () => void
}

export function BasicInformationForm({ formData, onFormDataChange, onNextTab }: BasicInformationFormProps) {
  const [photoPreview, setPhotoPreview] = useState<string>(formData.photo || "")
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [showErrors, setShowErrors] = useState(false)

  const {
    register,
    formState: { errors, isValid },
    watch,
    setValue,
    trigger,
    reset,
    handleSubmit,
  } = useForm<BasicInformationData>({
    resolver: zodResolver(basicInformationSchema),
    defaultValues: {
      employeeCode: formData.employeeCode || "",
      firstName: formData.firstName || "",
      middleName: formData.middleName || "",
      lastName: formData.lastName || "",
      gender: formData.gender || "",
      birthDate: formData.birthDate || "",
      bloodGroup: formData.bloodGroup || "",
      photo: formData.photo || "",
      nationality: formData.nationality || "",
      maritalStatus: formData.maritalStatus || "",
      joiningDate: formData.joiningDate || "",
      emailID: formData.emailID || "",
    },
    mode: "onChange",
  })

  const handleInputChange = async (field: keyof BasicInformationData, value: string) => {
    setValue(field, value)
    await trigger(field)
    onFormDataChange({ [field]: value })
  }

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setPhotoFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setPhotoPreview(result)
        setValue("photo", result)
        onFormDataChange({ photo: result })
      }
      reader.readAsDataURL(file)
    }
  }

  const removePhoto = () => {
    setPhotoPreview("")
    setPhotoFile(null)
    setValue("photo", "")
    onFormDataChange({ photo: "" })
  }

  const handleReset = () => {
    reset({
      employeeCode: "",
      firstName: "",
      middleName: "",
      lastName: "",
      gender: undefined,
      birthDate: "",
      bloodGroup: undefined,
      photo: "",
      nationality: "",
      maritalStatus: undefined,
      joiningDate: "",
      emailID: "",
    })
    setPhotoPreview("")
    setPhotoFile(null)
    setShowErrors(false)
    
    // Clear all form data
    onFormDataChange({
      employeeCode: "",
      firstName: "",
      middleName: "",
      lastName: "",
      birthDate: "",
      photo: "",
      nationality: "",
      joiningDate: "",
      emailID: "",
    })
  }

  const handleSaveAndContinue = async () => {
    setShowErrors(true)
    const isValid = await trigger()
    
    if (isValid) {
      // Form is valid, proceed to next tab
      if (onNextTab) {
        onNextTab()
      }
    } else {
      // Form has errors, they will be displayed below fields
      console.log("Form validation failed")
    }
  }

  const watchedValues = watch()

  return (
    <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/70 backdrop-blur-xl shadow-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-indigo-700/90"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <User className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">Personal Information</CardTitle>
                <CardDescription className="text-blue-100 text-base">
                  Essential personal details and identification
                </CardDescription>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Profile Photo and Employee Details in One Row */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Profile Photo Section */}
              <div className="lg:col-span-1">
                <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Camera className="h-5 w-5 text-blue-600" />
                  Profile Photo
                </h3>
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    {photoPreview ? (
                      <div className="relative">
                        <img
                          src={photoPreview}
                          alt="Profile preview"
                          className="w-32 h-32 rounded-full object-cover border-2 border-gray-200 shadow-lg"
                        />
                        <button
                          type="button"
                          onClick={removePhoto}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                        <Camera className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="w-full">
                    <Input
                      {...register("photo")}
                      id="photo"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("photo")?.click()}
                      className="w-full h-10 border-2 border-gray-200 hover:border-blue-500 focus:ring-4 focus:ring-blue-500/20 rounded-xl transition-all duration-300"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Choose Photo
                    </Button>
                    {photoFile && (
                      <p className="text-xs text-gray-600 mt-2 text-center truncate">
                        {photoFile.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Employee Details Section */}
              <div className="lg:col-span-3">
                <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  Employee Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="group">
                    <Label htmlFor="employeeCode" className="text-sm font-semibold text-gray-700 mb-2 block">
                      Employee Code <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      {...register("employeeCode")}
                      id="employeeCode"
                      className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 ${
                        (showErrors && errors.employeeCode) 
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                          : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                      }`}
                      placeholder="Enter employee code (e.g., EMP001)"
                    />
                    {showErrors && errors.employeeCode && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <X className="h-3 w-3" />
                        {errors.employeeCode.message}
                      </p>
                    )}
                  </div>
                  <div className="group">
                    <Label htmlFor="firstName" className="text-sm font-semibold text-gray-700 mb-2 block">
                      First Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      {...register("firstName")}
                      id="firstName"
                      className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 ${
                        (showErrors && errors.firstName) 
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                          : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                      }`}
                      placeholder="Enter first name"
                    />
                    {showErrors && errors.firstName && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <X className="h-3 w-3" />
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div className="group">
                    <Label htmlFor="middleName" className="text-sm font-semibold text-gray-700 mb-2 block">
                      Middle Name
                    </Label>
                    <Input
                      {...register("middleName")}
                      id="middleName"
                      className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 ${
                        (showErrors && errors.middleName) 
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                          : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                      }`}
                      placeholder="Enter middle name"
                    />
                    {showErrors && errors.middleName && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <X className="h-3 w-3" />
                        {errors.middleName.message}
                      </p>
                    )}
                  </div>
                  <div className="group">
                    <Label htmlFor="lastName" className="text-sm font-semibold text-gray-700 mb-2 block">
                      Last Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      {...register("lastName")}
                      id="lastName"
                      className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 ${
                        (showErrors && errors.lastName) 
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                          : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                      }`}
                      placeholder="Enter last name"
                    />
                    {showErrors && errors.lastName && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <X className="h-3 w-3" />
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator className="lg:col-span-3 my-2" />

          {/* Additional Personal Information */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-blue-600" />
              Additional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="group">
                <Label htmlFor="gender" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Gender <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={watchedValues.gender} 
                  onValueChange={(value) => handleInputChange("gender", value)}
                >
                  <SelectTrigger className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white ${
                    (showErrors && errors.gender) 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                  }`}>
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-2 bg-white">
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
                {showErrors && errors.gender && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.gender.message}
                  </p>
                )}
              </div>

              <div className="group">
                <Label htmlFor="nationality" className="text-sm font-semibold text-gray-700 mb-2 block">
                  <Globe className="h-4 w-4 inline mr-1" />
                  Nationality <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register("nationality")}
                  id="nationality"
                  className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 ${
                    (showErrors && errors.nationality) 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                  }`}
                  placeholder="Enter nationality"
                />
                {showErrors && errors.nationality && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.nationality.message}
                  </p>
                )}
              </div>

              <div className="group">
                <Label htmlFor="emailID" className="text-sm font-semibold text-gray-700 mb-2 block">
                  <Mail className="h-4 w-4 inline mr-1" />
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register("emailID")}
                  id="emailID"
                  type="email"
                  className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 ${
                    (showErrors && errors.emailID) 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                  }`}
                  placeholder="Enter email address"
                />
                {showErrors && errors.emailID && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.emailID.message}
                  </p>
                )}
              </div>

              <div className="group">
                <Label htmlFor="birthDate" className="text-sm font-semibold text-gray-700 mb-2 block">
                  <Calendar className="h-4 w-4 inline mr-1" />
                  Date of Birth <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register("birthDate")}
                  id="birthDate"
                  type="date"
                  className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 ${
                    (showErrors && errors.birthDate) 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                  }`}
                />
                {showErrors && errors.birthDate && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.birthDate.message}
                  </p>
                )}
              </div>

              <div className="group">
                <Label htmlFor="bloodGroup" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Blood Group <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={watchedValues.bloodGroup} 
                  onValueChange={(value) => handleInputChange("bloodGroup", value)}
                >
                  <SelectTrigger className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white ${
                    (showErrors && errors.bloodGroup) 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                  }`}>
                    <SelectValue placeholder="Select Blood Group" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-2 bg-white">
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
                {showErrors && errors.bloodGroup && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.bloodGroup.message}
                  </p>
                )}
              </div>

              <div className="group">
                <Label htmlFor="maritalStatus" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Marital Status <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={watchedValues.maritalStatus} 
                  onValueChange={(value) => handleInputChange("maritalStatus", value)}
                >
                  <SelectTrigger className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white ${
                    (showErrors && errors.maritalStatus) 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                  }`}>
                    <SelectValue placeholder="Select Marital Status" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-2 bg-white">
                    <SelectItem value="Unmarried">Unmarried</SelectItem>
                    <SelectItem value="Married">Married</SelectItem>
                    <SelectItem value="Divorced">Divorced</SelectItem>
                    <SelectItem value="Widowed">Widowed</SelectItem>
                  </SelectContent>
                </Select>
                {showErrors && errors.maritalStatus && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.maritalStatus.message}
                  </p>
                )}
              </div>

              <div className="group">
                <Label htmlFor="joiningDate" className="text-sm font-semibold text-gray-700 mb-2 block">
                  <Clock className="h-4 w-4 inline mr-1" />
                  Joining Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register("joiningDate")}
                  id="joiningDate"
                  type="date"
                  className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 ${
                    (showErrors && errors.joiningDate) 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                  }`}
                />
                {showErrors && errors.joiningDate && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.joiningDate.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            className="px-6 py-3 h-12 rounded-xl border-2 border-gray-300 hover:bg-gray-50 bg-transparent text-gray-700 hover:text-gray-900 transition-colors"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset Form
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isValid ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
              <span className="text-sm font-medium text-gray-700">
                {isValid ? 'Form is valid and ready to continue' : 'Please complete all required fields'}
              </span>
            </div>
            
            <Button
              type="button"
              onClick={handleSaveAndContinue}
              className="px-6 py-3 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg text-white font-medium transition-all duration-300"
            >
              <ArrowRight className="h-4 w-4 mr-2" />
              Save & Continue
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 