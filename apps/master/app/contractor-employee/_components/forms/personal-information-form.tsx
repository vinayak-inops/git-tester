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
import { Textarea } from "@repo/ui/components/ui/textarea"
import { User, Building2, Camera, Upload, X, RotateCcw, ArrowRight, Home, MapPin, Globe, Calendar, Heart, CheckCircle } from "lucide-react"
import { useState } from "react"

// Zod Schema for validation
const addressSchema = z.object({
  addressLine1: z.string().min(1, "Address Line 1 is required"),
  addressLine2: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  pinCode: z.string().min(1, "Pin Code is required"),
  taluka: z.string().optional(),
  isVerified: z.boolean().optional(),
})

const personalInformationSchema = z.object({
  photo: z.string().optional(),
  firstName: z.string().min(2, "First name must be at least 2 characters").max(50, "First name must be less than 50 characters"),
  middleName: z.string().optional(),
  lastName: z.string().min(2, "Last name must be at least 2 characters").max(50, "Last name must be less than 50 characters"),
  fatherHusbandName: z.string().min(2, "Father/Husband name must be at least 2 characters").max(100, "Must be less than 100 characters"),
  gender: z.enum(["Male", "Female", "Other"], { required_error: "Please select a gender" }),
  birthDate: z.string().min(1, "Birth date is required").refine((date) => {
    const birthDate = new Date(date)
    const today = new Date()
    const age = today.getFullYear() - birthDate.getFullYear()
    return age >= 18 && age <= 100
  }, "Age must be between 18 and 100 years"),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], { required_error: "Please select a blood group" }),
  nationality: z.string().min(2, "Nationality must be at least 2 characters").max(50, "Nationality must be less than 50 characters"),
  maritalStatus: z.enum(["Married", "Unmarried", "Divorced", "Widowed"], { required_error: "Please select a marital status" }),
  marriageDate: z.string().optional(),
  address: z.object({
    permanentAddress: addressSchema,
    temporaryAddress: addressSchema,
  }),
})

type PersonalInformationData = z.infer<typeof personalInformationSchema>

interface PersonalInformationFormProps {
  formData: PersonalInformationData
  onFormDataChange: (data: Partial<PersonalInformationData>) => void
  onNextTab?: () => void
}

export function PersonalInformationForm({ formData, onFormDataChange, onNextTab }: PersonalInformationFormProps) {
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
  } = useForm<PersonalInformationData>({
    resolver: zodResolver(personalInformationSchema),
    defaultValues: formData,
    mode: "onChange",
  })

  const watchedValues = watch()

  const handleInputChange = async (field: keyof PersonalInformationData, value: any) => {
    setValue(field, value)
    await trigger(field)
    onFormDataChange({ [field]: value })
  }

  const handleAddressChange = async (
    addressType: "permanentAddress" | "temporaryAddress",
    field: keyof z.infer<typeof addressSchema>,
    value: any
  ) => {
    const updatedAddress = {
      ...watchedValues.address[addressType],
      [field]: value,
    }
    setValue(`address.${addressType}.${field}` as any, value)
    await trigger(`address.${addressType}.${field}` as any)
    onFormDataChange({
      address: {
        ...watchedValues.address,
        [addressType]: updatedAddress,
      },
    })
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
      photo: "",
      firstName: "",
      middleName: "",
      lastName: "",
      fatherHusbandName: "",
      gender: undefined,
      birthDate: "",
      bloodGroup: undefined,
      nationality: "",
      maritalStatus: undefined,
      marriageDate: "",
      address: {
        permanentAddress: {
          addressLine1: "",
          addressLine2: "",
          country: "",
          state: "",
          city: "",
          pinCode: "",
          taluka: "",
          isVerified: false,
        },
        temporaryAddress: {
          addressLine1: "",
          addressLine2: "",
          country: "",
          state: "",
          city: "",
          pinCode: "",
          taluka: "",
          isVerified: false,
        },
      },
    })
    setPhotoPreview("")
    setPhotoFile(null)
    setShowErrors(false)
    onFormDataChange({
      photo: "",
      firstName: "",
      middleName: "",
      lastName: "",
      fatherHusbandName: "",
      gender: undefined,
      birthDate: "",
      bloodGroup: undefined,
      nationality: "",
      maritalStatus: undefined,
      marriageDate: "",
      address: {
        permanentAddress: {
          addressLine1: "",
          addressLine2: "",
          country: "",
          state: "",
          city: "",
          pinCode: "",
          taluka: "",
          isVerified: false,
        },
        temporaryAddress: {
          addressLine1: "",
          addressLine2: "",
          country: "",
          state: "",
          city: "",
          pinCode: "",
          taluka: "",
          isVerified: false,
        },
      },
    })
  }

  const handleSaveAndContinue = async () => {
    setShowErrors(true)
    const valid = await trigger()
    if (valid && onNextTab) {
      onNextTab()
    }
  }

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
                  <div className="group">
                    <Label htmlFor="fatherHusbandName" className="text-sm font-semibold text-gray-700 mb-2 block">
                      Father/Husband Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      {...register("fatherHusbandName")}
                      id="fatherHusbandName"
                      className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 ${
                        (showErrors && errors.fatherHusbandName) 
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                          : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                      }`}
                      placeholder="Enter father/husband name"
                    />
                    {showErrors && errors.fatherHusbandName && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <X className="h-3 w-3" />
                        {errors.fatherHusbandName.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator className="lg:col-span-3 my-2" />

          {/* Additional Personal Information */}
          <div className="lg:col-span-3 pb-6">
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
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
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
                    <SelectItem value="Married">Married</SelectItem>
                    <SelectItem value="Unmarried">Unmarried</SelectItem>
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
              {watchedValues.maritalStatus === "Married" && (
                <div className="group">
                  <Label htmlFor="marriageDate" className="text-sm font-semibold text-gray-700 mb-2 block">
                    Marriage Date
                  </Label>
                  <Input
                    {...register("marriageDate")}
                    id="marriageDate"
                    type="date"
                    className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 ${
                      (showErrors && errors.marriageDate)
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                        : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                    }`}
                  />
                  {showErrors && errors.marriageDate && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <X className="h-3 w-3" />
                      {errors.marriageDate.message}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <Separator className="lg:col-span-3 my-2 " />

        {/* Address Information */}
        <div className="lg:col-span-3 mt-4 mb-4 py-6">
          <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Home className="h-5 w-5 text-blue-600" />
            Permanent Address
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            <div className="group col-span-6">
              <Label htmlFor="permanentAddressLine1" className="text-sm font-semibold text-gray-700 mb-2 block">
                Address Line 1 <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="permanentAddressLine1"
                value={watchedValues.address.permanentAddress.addressLine1}
                onChange={(e) => handleAddressChange("permanentAddress", "addressLine1", e.target.value)}
                className={`min-h-[40px] border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 resize-none ${
                  (showErrors && errors.address?.permanentAddress?.addressLine1)
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                }`}
                placeholder="Enter address line 1"
                rows={2}
              />
              {showErrors && errors.address?.permanentAddress?.addressLine1 && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <X className="h-3 w-3" />
                  {errors.address.permanentAddress.addressLine1?.message}
                </p>
              )}
            </div>
            <div className="group col-span-6">
              <Label htmlFor="permanentAddressLine2" className="text-sm font-semibold text-gray-700 mb-2 block">
                Address Line 2
              </Label>
              <Textarea
                id="permanentAddressLine2"
                value={watchedValues.address.permanentAddress.addressLine2}
                onChange={(e) => handleAddressChange("permanentAddress", "addressLine2", e.target.value)}
                className={`min-h-[40px] border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 resize-none ${
                  (showErrors && errors.address?.permanentAddress?.addressLine2)
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                }`}
                placeholder="Enter address line 2"
                rows={2}
              />
              {showErrors && errors.address?.permanentAddress?.addressLine2 && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <X className="h-3 w-3" />
                  {errors.address.permanentAddress.addressLine2?.message}
                </p>
              )}
            </div>
            <div className="group col-span-2">
              <Label htmlFor="permanentCountry" className="text-sm font-semibold text-gray-700 mb-2 block">
                Country <span className="text-red-500">*</span>
              </Label>
              <Input
                id="permanentCountry"
                value={watchedValues.address.permanentAddress.country}
                onChange={(e) => handleAddressChange("permanentAddress", "country", e.target.value)}
                className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 ${
                  (showErrors && errors.address?.permanentAddress?.country)
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                }`}
                placeholder="Enter country"
              />
              {showErrors && errors.address?.permanentAddress?.country && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <X className="h-3 w-3" />
                  {errors.address.permanentAddress.country?.message}
                </p>
              )}
            </div>
            <div className="group col-span-2">
              <Label htmlFor="permanentState" className="text-sm font-semibold text-gray-700 mb-2 block">
                State <span className="text-red-500">*</span>
              </Label>
              <Input
                id="permanentState"
                value={watchedValues.address.permanentAddress.state}
                onChange={(e) => handleAddressChange("permanentAddress", "state", e.target.value)}
                className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 ${
                  (showErrors && errors.address?.permanentAddress?.state)
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                }`}
                placeholder="Enter state"
              />
              {showErrors && errors.address?.permanentAddress?.state && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <X className="h-3 w-3" />
                  {errors.address.permanentAddress.state?.message}
                </p>
              )}
            </div>
            <div className="group col-span-2">
              <Label htmlFor="permanentCity" className="text-sm font-semibold text-gray-700 mb-2 block">
                City <span className="text-red-500">*</span>
              </Label>
              <Input
                id="permanentCity"
                value={watchedValues.address.permanentAddress.city}
                onChange={(e) => handleAddressChange("permanentAddress", "city", e.target.value)}
                className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 ${
                  (showErrors && errors.address?.permanentAddress?.city)
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                }`}
                placeholder="Enter city"
              />
              {showErrors && errors.address?.permanentAddress?.city && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <X className="h-3 w-3" />
                  {errors.address.permanentAddress.city?.message}
                </p>
              )}
            </div>
            <div className="group col-span-2">
              <Label htmlFor="permanentPinCode" className="text-sm font-semibold text-gray-700 mb-2 block">
                Pin Code <span className="text-red-500">*</span>
              </Label>
              <Input
                id="permanentPinCode"
                value={watchedValues.address.permanentAddress.pinCode}
                onChange={(e) => handleAddressChange("permanentAddress", "pinCode", e.target.value)}
                className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 ${
                  (showErrors && errors.address?.permanentAddress?.pinCode)
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                }`}
                placeholder="Enter pin code"
              />
              {showErrors && errors.address?.permanentAddress?.pinCode && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <X className="h-3 w-3" />
                  {errors.address.permanentAddress.pinCode?.message}
                </p>
              )}
            </div>
            <div className="group col-span-2">
              <Label htmlFor="permanentTaluka" className="text-sm font-semibold text-gray-700 mb-2 block">
                Taluka
              </Label>
              <Input
                id="permanentTaluka"
                value={watchedValues.address.permanentAddress.taluka}
                onChange={(e) => handleAddressChange("permanentAddress", "taluka", e.target.value)}
                className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 ${
                  (showErrors && errors.address?.permanentAddress?.taluka)
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                }`}
                placeholder="Enter taluka"
              />
              {showErrors && errors.address?.permanentAddress?.taluka && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <X className="h-3 w-3" />
                  {errors.address.permanentAddress.taluka?.message}
                </p>
              )}
            </div>
            <div className="flex items-center space-x-2 mt-2 col-span-2">
              <input
                type="checkbox"
                id="permanentIsVerified"
                checked={watchedValues.address.permanentAddress.isVerified || false}
                onChange={(e) => handleAddressChange("permanentAddress", "isVerified", e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <Label htmlFor="permanentIsVerified" className="text-sm text-gray-700">
                Address Verified
              </Label>
            </div>
          </div>
        </div>

        <Separator className="lg:col-span-3 my-2" />

        {/* Temporary Address */}
        <div className="lg:col-span-6 pt-6">
          <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            Temporary Address
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
            <div className="group col-span-6">
              <Label htmlFor="temporaryAddressLine1" className="text-sm font-semibold text-gray-700 mb-2 block">
                Address Line 1
              </Label>
              <Textarea
                id="temporaryAddressLine1"
                value={watchedValues.address.temporaryAddress.addressLine1}
                onChange={(e) => handleAddressChange("temporaryAddress", "addressLine1", e.target.value)}
                className={` min-h-[40px] border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 resize-none ${
                  (showErrors && errors.address?.temporaryAddress?.addressLine1)
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                }`}
                placeholder="Enter address line 1"
                rows={2}
              />
              {showErrors && errors.address?.temporaryAddress?.addressLine1 && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <X className="h-3 w-3" />
                  {errors.address.temporaryAddress.addressLine1?.message}
                </p>
              )}
            </div>
            <div className="group col-span-6">
              <Label htmlFor="temporaryAddressLine2" className="text-sm font-semibold text-gray-700 mb-2 block">
                Address Line 2
              </Label>
              <Textarea
                id="temporaryAddressLine2"
                value={watchedValues.address.temporaryAddress.addressLine2}
                onChange={(e) => handleAddressChange("temporaryAddress", "addressLine2", e.target.value)}
                className={`min-h-[40px] border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 resize-none ${
                  (showErrors && errors.address?.temporaryAddress?.addressLine2)
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                }`}
                placeholder="Enter address line 2"
                rows={2}
              />
              {showErrors && errors.address?.temporaryAddress?.addressLine2 && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <X className="h-3 w-3" />
                  {errors.address.temporaryAddress.addressLine2?.message}
                </p>
              )}
            </div>
            <div className="group col-span-2">
              <Label htmlFor="temporaryCountry" className="text-sm font-semibold text-gray-700 mb-2 block">
                Country
              </Label>
              <Input
                id="temporaryCountry"
                value={watchedValues.address.temporaryAddress.country}
                onChange={(e) => handleAddressChange("temporaryAddress", "country", e.target.value)}
                className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 ${
                  (showErrors && errors.address?.temporaryAddress?.country)
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                }`}
                placeholder="Enter country"
              />
              {showErrors && errors.address?.temporaryAddress?.country && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <X className="h-3 w-3" />
                  {errors.address.temporaryAddress.country?.message}
                </p>
              )}
            </div>
            <div className="group col-span-2">
              <Label htmlFor="temporaryState" className="text-sm font-semibold text-gray-700 mb-2 block">
                State
              </Label>
              <Input
                id="temporaryState"
                value={watchedValues.address.temporaryAddress.state}
                onChange={(e) => handleAddressChange("temporaryAddress", "state", e.target.value)}
                className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 ${
                  (showErrors && errors.address?.temporaryAddress?.state)
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                }`}
                placeholder="Enter state"
              />
              {showErrors && errors.address?.temporaryAddress?.state && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <X className="h-3 w-3" />
                  {errors.address.temporaryAddress.state?.message}
                </p>
              )}
            </div>
            <div className="group col-span-2">
              <Label htmlFor="temporaryCity" className="text-sm font-semibold text-gray-700 mb-2 block">
                City
              </Label>
              <Input
                id="temporaryCity"
                value={watchedValues.address.temporaryAddress.city}
                onChange={(e) => handleAddressChange("temporaryAddress", "city", e.target.value)}
                className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 ${
                  (showErrors && errors.address?.temporaryAddress?.city)
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                }`}
                placeholder="Enter city"
              />
              {showErrors && errors.address?.temporaryAddress?.city && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <X className="h-3 w-3" />
                  {errors.address.temporaryAddress.city?.message}
                </p>
              )}
            </div>
            <div className="group col-span-2">
              <Label htmlFor="temporaryPinCode" className="text-sm font-semibold text-gray-700 mb-2 block">
                Pin Code
              </Label>
              <Input
                id="temporaryPinCode"
                value={watchedValues.address.temporaryAddress.pinCode}
                onChange={(e) => handleAddressChange("temporaryAddress", "pinCode", e.target.value)}
                className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 ${
                  (showErrors && errors.address?.temporaryAddress?.pinCode)
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                }`}
                placeholder="Enter pin code"
              />
              {showErrors && errors.address?.temporaryAddress?.pinCode && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <X className="h-3 w-3" />
                  {errors.address.temporaryAddress.pinCode?.message}
                </p>
              )}
            </div>
            <div className="group col-span-2">
              <Label htmlFor="temporaryTaluka" className="text-sm font-semibold text-gray-700 mb-2 block">
                Taluka
              </Label>
              <Input
                id="temporaryTaluka"
                value={watchedValues.address.temporaryAddress.taluka}
                onChange={(e) => handleAddressChange("temporaryAddress", "taluka", e.target.value)}
                className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 ${
                  (showErrors && errors.address?.temporaryAddress?.taluka)
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                }`}
                placeholder="Enter taluka"
              />
              {showErrors && errors.address?.temporaryAddress?.taluka && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <X className="h-3 w-3" />
                  {errors.address.temporaryAddress.taluka?.message}
                </p>
              )}
            </div>
            <div className="flex items-center space-x-2 mt-2 col-span-2">
              <input
                type="checkbox"
                id="temporaryIsVerified"
                checked={watchedValues.address.temporaryAddress.isVerified || false}
                onChange={(e) => handleAddressChange("temporaryAddress", "isVerified", e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <Label htmlFor="temporaryIsVerified" className="text-sm text-gray-700">
                Address Verified
              </Label>
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