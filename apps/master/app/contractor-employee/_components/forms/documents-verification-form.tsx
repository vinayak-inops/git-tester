"use client"

import type React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Input } from "@repo/ui/components/ui/input"
import { Label } from "@repo/ui/components/ui/label"
import { Button } from "@repo/ui/components/ui/button"
import { Badge } from "@repo/ui/components/ui/badge"
import { Switch } from "@repo/ui/components/ui/switch"
import { Textarea } from "@repo/ui/components/ui/textarea"
import { Separator } from "@repo/ui/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/ui/select"
import { FileText, Plus, Trash2, Upload, Calendar, CreditCard, Shield, FileCheck, X } from "lucide-react"
import { useState } from "react"

// Zod Schema for validation
const documentsVerificationSchema = z.object({
  passport: z.object({
    passportNumber: z.string().min(1, "Passport number is required"),
    passportExpiryDate: z.string().min(1, "Passport expiry date is required"),
    passportPath: z.string().optional(),
  }),
  cards: z.array(z.object({
    cardNumber: z.string().min(1, "Card number is required"),
    effectiveFrom: z.string().min(1, "Effective from date is required"),
    effectiveTo: z.string().min(1, "Effective to date is required"),
    isPrimaryCard: z.boolean(),
  })).min(1, "At least one card is required"),
  documents: z.array(z.object({
    documentTypeCode: z.string().min(1, "Document type code is required"),
    documentTypeTitle: z.string().min(1, "Document type title is required"),
    identificationNumber: z.string().optional(),
    documentPath: z.string().optional(),
  })).optional(),
  insuranceNumber: z.string().optional(),
  mediclaimPolicyNumber: z.string().optional(),
  WCPolicyNumber: z.string().optional(),
  accidentPolicyNumber: z.string().optional(),
  uploadedDocuments: z.array(z.object({
    documentCategory: z.object({
      documentCategoryCode: z.string().min(1, "Category code is required"),
      documentCategoryTitle: z.string().min(1, "Category title is required"),
    }),
    documentType: z.object({
      documentTypeCode: z.string().min(1, "Type code is required"),
      documentTypeTitle: z.string().min(1, "Type title is required"),
    }),
    documentPath: z.string().optional(),
  })).optional(),
  workPermit: z.object({
    workpermitNumber: z.string().min(1, "Work permit number is required"),
    workpermitExpiryDate: z.string().min(1, "Work permit expiry date is required"),
    workPermitPath: z.string().optional(),
  }),
  labourCard: z.object({
    labourCardNumber: z.string().min(1, "Labour card number is required"),
    labourcardExpiryDate: z.string().min(1, "Labour card expiry date is required"),
    labourCardPath: z.string().optional(),
  }),
})

type DocumentsVerificationData = z.infer<typeof documentsVerificationSchema>

interface DocumentsVerificationFormProps {
  formData: DocumentsVerificationData
  onFormDataChange: (data: Partial<DocumentsVerificationData>) => void
  onNextTab?: () => void
  onPreviousTab?: () => void
}

// Mock data for dropdowns
const documentTypeOptions = [
  { code: "DOC1", title: "PAN CARD" },
  { code: "DOC2", title: "AADHAR CARD" },
  { code: "DOC3", title: "DRIVING LICENSE" },
  { code: "DOC4", title: "VOTER ID" },
]

const documentCategoryOptions = [
  { code: "CAT001", title: "Identity Proof" },
  { code: "CAT002", title: "Address Proof" },
  { code: "CAT003", title: "Educational Certificate" },
  { code: "CAT004", title: "Experience Certificate" },
]

const documentTypeUploadOptions = [
  { code: "DT001", title: "Passport" },
  { code: "DT002", title: "PAN Card" },
  { code: "DT003", title: "Aadhar Card" },
  { code: "DT004", title: "Driving License" },
]

export function DocumentsVerificationForm({ formData, onFormDataChange, onNextTab, onPreviousTab }: DocumentsVerificationFormProps) {
  const [showErrors, setShowErrors] = useState(false)

  const {
    register,
    formState: { errors, isValid },
    watch,
    setValue,
    trigger,
    reset,
  } = useForm<DocumentsVerificationData>({
    resolver: zodResolver(documentsVerificationSchema),
    defaultValues: {
      passport: formData.passport || {
        passportNumber: "P1234567",
        passportExpiryDate: "2030-01-01",
        passportPath: "/documents/passport.pdf",
      },
      cards: formData.cards || [{
        cardNumber: "CARD001",
        effectiveFrom: "2023-01-01",
        effectiveTo: "2024-01-01",
        isPrimaryCard: true,
      }],
      documents: formData.documents || [{
        documentTypeCode: "DOC1",
        documentTypeTitle: "PAN CARD",
        identificationNumber: "",
        documentPath: "/documents/idproof.pdf",
      }],
      insuranceNumber: formData.insuranceNumber || "INS1234567",
      mediclaimPolicyNumber: formData.mediclaimPolicyNumber || "MED1234567",
      WCPolicyNumber: formData.WCPolicyNumber || "WC1234567",
      accidentPolicyNumber: formData.accidentPolicyNumber || "ACC1234567",
      uploadedDocuments: formData.uploadedDocuments || [{
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
      workPermit: formData.workPermit || {
        workpermitNumber: "WP1234567",
        workpermitExpiryDate: "2025-01-01",
        workPermitPath: "/documents/workpermit.pdf",
      },
      labourCard: formData.labourCard || {
        labourCardNumber: "LC1234567",
        labourcardExpiryDate: "2024-01-01",
        labourCardPath: "/documents/labourcard.pdf",
      },
    },
    mode: "onChange",
  })

  const watchedValues = watch()

  const handleReset = () => {
    reset()
    setShowErrors(false)
    onFormDataChange({})
  }

  const handleSaveAndContinue = async () => {
    setShowErrors(true)
    const isValid = await trigger()
    
    if (isValid) {
      if (onNextTab) {
        onNextTab()
      }
    } else {
      console.log("Form validation failed")
    }
  }

  const addCard = () => {
    const newCards = [...(watchedValues.cards || []), {
      cardNumber: "",
      effectiveFrom: "",
      effectiveTo: "",
      isPrimaryCard: false,
    }]
    setValue("cards", newCards)
    onFormDataChange({ cards: newCards })
  }

  const removeCard = (index: number) => {
    const newCards = watchedValues.cards?.filter((_, i) => i !== index) || []
    setValue("cards", newCards)
    onFormDataChange({ cards: newCards })
  }

  const addDocument = () => {
    const newDocuments = [...(watchedValues.documents || []), {
      documentTypeCode: "",
      documentTypeTitle: "",
      identificationNumber: "",
      documentPath: "",
    }]
    setValue("documents", newDocuments)
    onFormDataChange({ documents: newDocuments })
  }

  const removeDocument = (index: number) => {
    const newDocuments = watchedValues.documents?.filter((_, i) => i !== index) || []
    setValue("documents", newDocuments)
    onFormDataChange({ documents: newDocuments })
  }

  const addUploadedDocument = () => {
    const newUploadedDocuments = [...(watchedValues.uploadedDocuments || []), {
      documentCategory: {
        documentCategoryCode: "",
        documentCategoryTitle: "",
      },
      documentType: {
        documentTypeCode: "",
        documentTypeTitle: "",
      },
      documentPath: "",
    }]
    setValue("uploadedDocuments", newUploadedDocuments)
    onFormDataChange({ uploadedDocuments: newUploadedDocuments })
  }

  const removeUploadedDocument = (index: number) => {
    const newUploadedDocuments = watchedValues.uploadedDocuments?.filter((_, i) => i !== index) || []
    setValue("uploadedDocuments", newUploadedDocuments)
    onFormDataChange({ uploadedDocuments: newUploadedDocuments })
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
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">Documents & Verification</CardTitle>
                <CardDescription className="text-blue-100 text-base">
                  Identity documents, work permits, and verification details
                </CardDescription>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <div className="space-y-8">
          {/* Passport Details */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Passport Details
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="group">
                <Label htmlFor="passportNumber" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Passport Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="passportNumber"
                  {...register("passport.passportNumber")}
                  className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white ${
                    (showErrors && errors.passport?.passportNumber) 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                  }`}
                  placeholder="Enter passport number"
                />
                {showErrors && errors.passport?.passportNumber && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.passport.passportNumber.message}
                  </p>
                )}
              </div>

              <div className="group">
                <Label htmlFor="passportExpiryDate" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Passport Expiry Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="passportExpiryDate"
                  type="date"
                  {...register("passport.passportExpiryDate")}
                  className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white ${
                    (showErrors && errors.passport?.passportExpiryDate) 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                  }`}
                />
                {showErrors && errors.passport?.passportExpiryDate && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.passport.passportExpiryDate.message}
                  </p>
                )}
              </div>

              <div className="group">
                <Label htmlFor="passportPath" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Passport Document
                </Label>
                <div className="relative">
                  <Input
                    id="passportPath"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        setValue("passport.passportPath", file.name)
                        onFormDataChange({
                          passport: { ...watchedValues.passport, passportPath: file.name }
                        })
                      }
                    }}
                    className="hidden"
                  />
                  {watchedValues.passport?.passportPath ? (
                    <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <FileCheck className="h-5 w-5 text-green-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-green-800">Passport Document</p>
                        <p className="text-xs text-green-600">File uploaded successfully</p>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setValue("passport.passportPath", "")
                          onFormDataChange({
                            passport: { ...watchedValues.passport, passportPath: "" }
                          })
                        }}
                        className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <Button
                      type="button"
                      onClick={() => document.getElementById('passportPath')?.click()}
                      className="w-full flex items-center justify-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-colors bg-gray-50/50"
                    >
                      <Upload className="h-6 w-6 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Upload Passport Document</span>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Work Permit */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              Work Permit
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="group">
                <Label htmlFor="workpermitNumber" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Work Permit Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="workpermitNumber"
                  {...register("workPermit.workpermitNumber")}
                  className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white ${
                    (showErrors && errors.workPermit?.workpermitNumber) 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                  }`}
                  placeholder="Enter work permit number"
                />
                {showErrors && errors.workPermit?.workpermitNumber && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.workPermit.workpermitNumber.message}
                  </p>
                )}
              </div>

              <div className="group">
                <Label htmlFor="workpermitExpiryDate" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Work Permit Expiry Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="workpermitExpiryDate"
                  type="date"
                  {...register("workPermit.workpermitExpiryDate")}
                  className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white ${
                    (showErrors && errors.workPermit?.workpermitExpiryDate) 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                  }`}
                />
                {showErrors && errors.workPermit?.workpermitExpiryDate && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.workPermit.workpermitExpiryDate.message}
                  </p>
                )}
              </div>

              <div className="group">
                <Label htmlFor="workPermitPath" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Work Permit Document
                </Label>
                <div className="relative">
                  <Input
                    id="workPermitPath"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        setValue("workPermit.workPermitPath", file.name)
                        onFormDataChange({
                          workPermit: { ...watchedValues.workPermit, workPermitPath: file.name }
                        })
                      }
                    }}
                    className="hidden"
                  />
                  {watchedValues.workPermit?.workPermitPath ? (
                    <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <FileCheck className="h-5 w-5 text-green-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-green-800">Work Permit Document</p>
                        <p className="text-xs text-green-600">File uploaded successfully</p>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setValue("workPermit.workPermitPath", "")
                          onFormDataChange({
                            workPermit: { ...watchedValues.workPermit, workPermitPath: "" }
                          })
                        }}
                        className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <Button
                      type="button"
                      onClick={() => document.getElementById('workPermitPath')?.click()}
                      className="w-full flex items-center justify-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-colors bg-gray-50/50"
                    >
                      <Upload className="h-6 w-6 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Upload Work Permit Document</span>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Labour Card */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-blue-600" />
              Labour Card
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="group">
                <Label htmlFor="labourCardNumber" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Labour Card Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="labourCardNumber"
                  {...register("labourCard.labourCardNumber")}
                  className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white ${
                    (showErrors && errors.labourCard?.labourCardNumber) 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                  }`}
                  placeholder="Enter labour card number"
                />
                {showErrors && errors.labourCard?.labourCardNumber && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.labourCard.labourCardNumber.message}
                  </p>
                )}
              </div>

              <div className="group">
                <Label htmlFor="labourcardExpiryDate" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Labour Card Expiry Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="labourcardExpiryDate"
                  type="date"
                  {...register("labourCard.labourcardExpiryDate")}
                  className={`h-10 border-2 focus:ring-4 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white ${
                    (showErrors && errors.labourCard?.labourcardExpiryDate) 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                  }`}
                />
                {showErrors && errors.labourCard?.labourcardExpiryDate && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    {errors.labourCard.labourcardExpiryDate.message}
                  </p>
                )}
              </div>

              <div className="group">
                <Label htmlFor="labourCardPath" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Labour Card Document
                </Label>
                <div className="relative">
                  <Input
                    id="labourCardPath"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        setValue("labourCard.labourCardPath", file.name)
                        onFormDataChange({
                          labourCard: { ...watchedValues.labourCard, labourCardPath: file.name }
                        })
                      }
                    }}
                    className="hidden"
                  />
                  {watchedValues.labourCard?.labourCardPath ? (
                    <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <FileCheck className="h-5 w-5 text-green-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-green-800">Labour Card Document</p>
                        <p className="text-xs text-green-600">File uploaded successfully</p>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setValue("labourCard.labourCardPath", "")
                          onFormDataChange({
                            labourCard: { ...watchedValues.labourCard, labourCardPath: "" }
                          })
                        }}
                        className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <Button
                      type="button"
                      onClick={() => document.getElementById('labourCardPath')?.click()}
                      className="w-full flex items-center justify-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-colors bg-gray-50/50"
                    >
                      <Upload className="h-6 w-6 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Upload Labour Card Document</span>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Employee Cards */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-blue-600" />
                Employee Cards
              </h3>
              <Button
                type="button"
                onClick={addCard}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Card
              </Button>
            </div>
            
            <div className="space-y-4">
              {watchedValues.cards?.map((card, index) => (
                <div key={index} className="p-6 border border-gray-200 rounded-xl bg-gray-50/50">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-md font-medium text-gray-800">Card - {card.cardNumber || `CARD${index + 1}`}</h4>
                    <div className="flex items-center gap-2">
                      {card.isPrimaryCard && (
                        <Badge className="bg-blue-100 text-blue-800">Primary</Badge>
                      )}
                      {watchedValues.cards && watchedValues.cards.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeCard(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    <div className="group">
                      <Label className="text-sm font-medium text-gray-700">Card Number <span className="text-red-500">*</span></Label>
                      <Input
                        {...register(`cards.${index}.cardNumber`)}
                        className="h-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg"
                        placeholder="Enter card number"
                      />
                    </div>
                    <div className="group">
                      <Label className="text-sm font-medium text-gray-700">Effective From <span className="text-red-500">*</span></Label>
                      <Input
                        type="date"
                        {...register(`cards.${index}.effectiveFrom`)}
                        className="h-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg"
                      />
                    </div>
                    <div className="group">
                      <Label className="text-sm font-medium text-gray-700">Effective To <span className="text-red-500">*</span></Label>
                      <Input
                        type="date"
                        {...register(`cards.${index}.effectiveTo`)}
                        className="h-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg"
                      />
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                      <Switch
                        checked={card.isPrimaryCard}
                        onCheckedChange={(checked) => {
                          setValue(`cards.${index}.isPrimaryCard`, checked)
                          onFormDataChange({
                            cards: watchedValues.cards?.map((c, i) => 
                              i === index ? { ...c, isPrimaryCard: checked } : c
                            )
                          })
                        }}
                        className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-200"
                      />
                      <Label className="text-sm text-gray-700 font-medium cursor-pointer">
                        {card.isPrimaryCard ? (
                          <span className="text-blue-600">Primary Card</span>
                        ) : (
                          <span className="text-gray-500">Set as Primary</span>
                        )}
                      </Label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Document Categories */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Document Categories
              </h3>
              <Button
                type="button"
                onClick={addDocument}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Document
              </Button>
            </div>

            <div className="space-y-4">
              {watchedValues.documents?.map((doc, index) => (
                <div key={index} className="p-6 border border-gray-200 rounded-xl bg-gray-50/50">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-md font-medium text-gray-800">{doc.documentTypeTitle || `Document ${index + 1}`}</h4>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800">Document</Badge>
                      {watchedValues.documents && watchedValues.documents.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeDocument(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    <div className="group">
                      <Label className="text-sm font-medium text-gray-700">Document Type Code <span className="text-red-500">*</span></Label>
                      <Select
                        value={doc.documentTypeCode}
                        onValueChange={(value) => {
                          const option = documentTypeOptions.find(opt => opt.code === value)
                          setValue(`documents.${index}.documentTypeCode`, value)
                          setValue(`documents.${index}.documentTypeTitle`, option?.title || "")
                          onFormDataChange({
                            documents: watchedValues.documents?.map((d, i) => 
                              i === index ? { ...d, documentTypeCode: value, documentTypeTitle: option?.title || "" } : d
                            )
                          })
                        }}
                      >
                        <SelectTrigger className="h-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg">
                          <SelectValue placeholder="Select document type" />
                        </SelectTrigger>
                        <SelectContent>
                          {documentTypeOptions.map((option) => (
                            <SelectItem key={option.code} value={option.code}>
                              {option.code} - {option.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="group">
                      <Label className="text-sm font-medium text-gray-700">Document Type Title <span className="text-red-500">*</span></Label>
                      <div className="h-10 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg text-blue-800 flex items-center font-medium">
                        {doc.documentTypeTitle || "Will auto-fill from code"}
                      </div>
                    </div>
                    <div className="group">
                      <Label className="text-sm font-medium text-gray-700">Identification Number</Label>
                      <Input
                        {...register(`documents.${index}.identificationNumber`)}
                        className="h-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg"
                        placeholder="Enter identification number"
                      />
                    </div>
                    <div className="group">
                      <Label className="text-sm font-medium text-gray-700">Upload Document</Label>
                      <div className="relative">
                        <Input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              setValue(`documents.${index}.documentPath`, file.name)
                              onFormDataChange({
                                documents: watchedValues.documents?.map((d, i) => 
                                  i === index ? { ...d, documentPath: file.name } : d
                                )
                              })
                            }
                          }}
                          className="hidden"
                        />
                        {doc.documentPath ? (
                          <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <FileCheck className="h-5 w-5 text-green-600" />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-green-800">{doc.documentTypeTitle}</p>
                              <p className="text-xs text-green-600">File uploaded successfully</p>
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setValue(`documents.${index}.documentPath`, "")
                                onFormDataChange({
                                  documents: watchedValues.documents?.map((d, i) => 
                                    i === index ? { ...d, documentPath: "" } : d
                                  )
                                })
                              }}
                              className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                            >
                              Remove
                            </Button>
                          </div>
                        ) : (
                          <Button
                            type="button"
                            onClick={() => {
                              const input = document.querySelector(`input[type="file"]`) as HTMLInputElement
                              if (input) input.click()
                            }}
                            className="w-full flex items-center justify-center gap-3 p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors bg-gray-50/50"
                          >
                            <Upload className="h-5 w-5 text-gray-500" />
                            <span className="text-sm font-medium text-gray-700">Upload {doc.documentTypeTitle}</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Insurance Details */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              Insurance Details
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="group">
                <Label htmlFor="insuranceNumber" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Insurance Number
                </Label>
                <Input
                  id="insuranceNumber"
                  {...register("insuranceNumber")}
                  className="h-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white"
                  placeholder="Enter insurance number"
                />
              </div>

              <div className="group">
                <Label htmlFor="mediclaimPolicyNumber" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Mediclaim Policy Number
                </Label>
                <Input
                  id="mediclaimPolicyNumber"
                  {...register("mediclaimPolicyNumber")}
                  className="h-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white"
                  placeholder="Enter mediclaim policy number"
                />
              </div>

              <div className="group">
                <Label htmlFor="WCPolicyNumber" className="text-sm font-semibold text-gray-700 mb-2 block">
                  WC Policy Number
                </Label>
                <Input
                  id="WCPolicyNumber"
                  {...register("WCPolicyNumber")}
                  className="h-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white"
                  placeholder="Enter WC policy number"
                />
              </div>

              <div className="group">
                <Label htmlFor="accidentPolicyNumber" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Accident Policy Number
                </Label>
                <Input
                  id="accidentPolicyNumber"
                  {...register("accidentPolicyNumber")}
                  className="h-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl transition-all duration-300 group-hover:border-gray-300 bg-white"
                  placeholder="Enter accident policy number"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Uploaded Documents */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                <Upload className="h-5 w-5 text-blue-600" />
                Uploaded Documents
              </h3>
              <Button
                type="button"
                onClick={addUploadedDocument}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Document
              </Button>
            </div>

            <div className="space-y-4">
              {watchedValues.uploadedDocuments?.map((doc, index) => (
                <div key={index} className="p-6 border border-gray-200 rounded-xl bg-gray-50/50">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-md font-medium text-gray-800">
                      {doc.documentCategory.documentCategoryTitle} - {doc.documentType.documentTypeTitle}
                    </h4>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-purple-100 text-purple-800">Uploaded</Badge>
                      {watchedValues.uploadedDocuments && watchedValues.uploadedDocuments.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeUploadedDocument(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="group">
                      <Label className="text-sm font-medium text-gray-700">Document Category <span className="text-red-500">*</span></Label>
                      <Select
                        value={doc.documentCategory.documentCategoryCode}
                        onValueChange={(value) => {
                          const option = documentCategoryOptions.find(opt => opt.code === value)
                          setValue(`uploadedDocuments.${index}.documentCategory.documentCategoryCode`, value)
                          setValue(`uploadedDocuments.${index}.documentCategory.documentCategoryTitle`, option?.title || "")
                          onFormDataChange({
                            uploadedDocuments: watchedValues.uploadedDocuments?.map((d, i) => 
                              i === index ? { 
                                ...d, 
                                documentCategory: { 
                                  documentCategoryCode: value, 
                                  documentCategoryTitle: option?.title || "" 
                                } 
                              } : d
                            )
                          })
                        }}
                      >
                        <SelectTrigger className="h-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {documentCategoryOptions.map((option) => (
                            <SelectItem key={option.code} value={option.code}>
                              {option.code} - {option.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="group">
                      <Label className="text-sm font-medium text-gray-700">Document Type <span className="text-red-500">*</span></Label>
                      <Select
                        value={doc.documentType.documentTypeCode}
                        onValueChange={(value) => {
                          const option = documentTypeUploadOptions.find(opt => opt.code === value)
                          setValue(`uploadedDocuments.${index}.documentType.documentTypeCode`, value)
                          setValue(`uploadedDocuments.${index}.documentType.documentTypeTitle`, option?.title || "")
                          onFormDataChange({
                            uploadedDocuments: watchedValues.uploadedDocuments?.map((d, i) => 
                              i === index ? { 
                                ...d, 
                                documentType: { 
                                  documentTypeCode: value, 
                                  documentTypeTitle: option?.title || "" 
                                } 
                              } : d
                            )
                          })
                        }}
                      >
                        <SelectTrigger className="h-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg">
                          <SelectValue placeholder="Select document type" />
                        </SelectTrigger>
                        <SelectContent>
                          {documentTypeUploadOptions.map((option) => (
                            <SelectItem key={option.code} value={option.code}>
                              {option.code} - {option.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="group">
                      <Label className="text-sm font-medium text-gray-700">Upload Document</Label>
                      <div className="relative">
                        <Input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              setValue(`uploadedDocuments.${index}.documentPath`, file.name)
                              onFormDataChange({
                                uploadedDocuments: watchedValues.uploadedDocuments?.map((d, i) => 
                                  i === index ? { ...d, documentPath: file.name } : d
                                )
                              })
                            }
                          }}
                          className="hidden"
                        />
                        {doc.documentPath ? (
                          <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <FileCheck className="h-5 w-5 text-green-600" />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-green-800">{doc.documentType.documentTypeTitle}</p>
                              <p className="text-xs text-green-600">File uploaded successfully</p>
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setValue(`uploadedDocuments.${index}.documentPath`, "")
                                onFormDataChange({
                                  uploadedDocuments: watchedValues.uploadedDocuments?.map((d, i) => 
                                    i === index ? { ...d, documentPath: "" } : d
                                  )
                                })
                              }}
                              className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                            >
                              Remove
                            </Button>
                          </div>
                        ) : (
                          <Button
                            type="button"
                            onClick={() => {
                              const input = document.querySelector(`input[type="file"]`) as HTMLInputElement
                              if (input) input.click()
                            }}
                            className="w-full flex items-center justify-center gap-3 p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors bg-gray-50/50"
                          >
                            <Upload className="h-5 w-5 text-gray-500" />
                            <span className="text-sm font-medium text-gray-700">Upload {doc.documentType.documentTypeTitle}</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center gap-3">
            {onPreviousTab && (
              <Button
                type="button"
                variant="outline"
                onClick={onPreviousTab}
                className="px-6 py-3 h-12 rounded-xl border-2 border-gray-300 hover:bg-gray-50 bg-transparent text-gray-700 hover:text-gray-900 transition-colors"
              >
                Back
              </Button>
            )}
            
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="px-6 py-3 h-12 rounded-xl border-2 border-gray-300 hover:bg-gray-50 bg-transparent text-gray-700 hover:text-gray-900 transition-colors"
            >
              Reset Form
            </Button>
          </div>
          
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
              Save & Continue
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 