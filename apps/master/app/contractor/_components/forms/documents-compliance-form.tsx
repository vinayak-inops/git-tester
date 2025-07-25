"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Input } from "@repo/ui/components/ui/input"
import { Label } from "@repo/ui/components/ui/label"
import { Button } from "@repo/ui/components/ui/button"
import { Separator } from "@repo/ui/components/ui/separator"
import { FileText, Plus, Trash2 } from "lucide-react"

interface Document {
  documentCategoryCode: string
  documentcategoryTitle: string
  documentTypeCode: string
  documentTypeTitle: string
  storagePath: string
}

interface DocumentsComplianceFormProps {
  documents: Document[]
  onDocumentsChange: (documents: Document[]) => void
}

export function DocumentsComplianceForm({ documents, onDocumentsChange }: DocumentsComplianceFormProps) {
  const addDocument = () => {
    onDocumentsChange([
      ...documents,
      {
        documentCategoryCode: "",
        documentcategoryTitle: "",
        documentTypeCode: "",
        documentTypeTitle: "",
        storagePath: "",
      },
    ])
  }

  const removeDocument = (index: number) => {
    onDocumentsChange(documents.filter((_, i) => i !== index))
  }

  const updateDocument = (index: number, field: string, value: string) => {
    const updated = [...documents]
    updated[index] = { ...updated[index], [field]: value }
    onDocumentsChange(updated)
  }

  return (
    <Card className="rounded-2xl border-0 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-[#B3D9FF] to-[#87CEEB] text-white rounded-t-2xl">
        <CardTitle className="flex items-center space-x-3 text-xl">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
          <span>Documents & Compliance</span>
        </CardTitle>
        <CardDescription className="text-blue-100">Document management and compliance records</CardDescription>
      </CardHeader>
      <CardContent className="p-8 space-y-8">
        {/* Documents */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Documents</h3>
            <Button onClick={addDocument} className="bg-[#6BB6FF] hover:bg-[#4A90E2]">
              <Plus className="w-4 h-4 mr-2" />
              Add Document
            </Button>
          </div>

          {documents.map((document, index) => (
            <div key={index} className="p-6 border border-gray-200 rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-md font-medium text-gray-800">Document {index + 1}</h4>
                <Button
                  onClick={() => removeDocument(index)}
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-300 hover:bg-red-50 bg-transparent"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Document Category Code</Label>
                  <Input
                    value={document.documentCategoryCode}
                    onChange={(e) => updateDocument(index, "documentCategoryCode", e.target.value)}
                    className="h-10 border-2 border-gray-200 focus:border-[#6BB6FF] focus:ring-[#6BB6FF]/20 rounded-lg"
                    placeholder="Enter document category code"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Document Category Title</Label>
                  <Input
                    value={document.documentcategoryTitle}
                    onChange={(e) => updateDocument(index, "documentcategoryTitle", e.target.value)}
                    className="h-10 border-2 border-gray-200 focus:border-[#6BB6FF] focus:ring-[#6BB6FF]/20 rounded-lg"
                    placeholder="Enter document category title"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Document Type Code</Label>
                  <Input
                    value={document.documentTypeCode}
                    onChange={(e) => updateDocument(index, "documentTypeCode", e.target.value)}
                    className="h-10 border-2 border-gray-200 focus:border-[#6BB6FF] focus:ring-[#6BB6FF]/20 rounded-lg"
                    placeholder="Enter document type code"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Document Type Title</Label>
                  <Input
                    value={document.documentTypeTitle}
                    onChange={(e) => updateDocument(index, "documentTypeTitle", e.target.value)}
                    className="h-10 border-2 border-gray-200 focus:border-[#6BB6FF] focus:ring-[#6BB6FF]/20 rounded-lg"
                    placeholder="Enter document type title"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-sm font-medium text-gray-700">Storage Path</Label>
                  <Input
                    value={document.storagePath}
                    onChange={(e) => updateDocument(index, "storagePath", e.target.value)}
                    className="h-10 border-2 border-gray-200 focus:border-[#6BB6FF] focus:ring-[#6BB6FF]/20 rounded-lg"
                    placeholder="Enter storage path"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 