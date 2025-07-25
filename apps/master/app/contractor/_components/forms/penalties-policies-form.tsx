"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Input } from "@repo/ui/components/ui/input"
import { Label } from "@repo/ui/components/ui/label"
import { Button } from "@repo/ui/components/ui/button"
import { Separator } from "@repo/ui/components/ui/separator"
import { AlertTriangle, Plus, Trash2 } from "lucide-react"

interface Penalty {
  dateOfOffence: string
  actOfMisconduct: string
  actionTaken: string
  amount: number
  month: number
  witnessName: string
  fineRealisedDate: string
}

interface WCPolicy {
  policyNumber: string
  policyStartDate: string
  policyExpiryDate: string
  policyCompanyName: string
  maximumWorkmen: number
}

interface PenaltiesPoliciesFormProps {
  penalties: Penalty[]
  wcPolicies: WCPolicy[]
  onPenaltiesChange: (penalties: Penalty[]) => void
  onWcPoliciesChange: (policies: WCPolicy[]) => void
}

export function PenaltiesPoliciesForm({ 
  penalties, 
  wcPolicies, 
  onPenaltiesChange, 
  onWcPoliciesChange 
}: PenaltiesPoliciesFormProps) {
  const addPenalty = () => {
    onPenaltiesChange([
      ...penalties,
      {
        dateOfOffence: "",
        actOfMisconduct: "",
        actionTaken: "",
        amount: 0,
        month: 0,
        witnessName: "",
        fineRealisedDate: "",
      },
    ])
  }

  const removePenalty = (index: number) => {
    onPenaltiesChange(penalties.filter((_, i) => i !== index))
  }

  const updatePenalty = (index: number, field: string, value: any) => {
    const updated = [...penalties]
    updated[index] = { ...updated[index], [field]: value }
    onPenaltiesChange(updated)
  }

  const addWcPolicy = () => {
    onWcPoliciesChange([
      ...wcPolicies,
      {
        policyNumber: "",
        policyStartDate: "",
        policyExpiryDate: "",
        policyCompanyName: "",
        maximumWorkmen: 0,
      },
    ])
  }

  const removeWcPolicy = (index: number) => {
    onWcPoliciesChange(wcPolicies.filter((_, i) => i !== index))
  }

  const updateWcPolicy = (index: number, field: string, value: any) => {
    const updated = [...wcPolicies]
    updated[index] = { ...updated[index], [field]: value }
    onWcPoliciesChange(updated)
  }

  return (
    <Card className="rounded-2xl border-0 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-[#007AFF] to-[#0056CC] text-white rounded-t-2xl">
        <CardTitle className="flex items-center space-x-3 text-xl">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <span>Penalties & Policies</span>
        </CardTitle>
        <CardDescription className="text-blue-100">Penalty records and WC policy information</CardDescription>
      </CardHeader>
      <CardContent className="p-8 space-y-8">
        {/* Penalties */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Penalties</h3>
            <Button onClick={addPenalty} className="bg-[#6BB6FF] hover:bg-[#4A90E2]">
              <Plus className="w-4 h-4 mr-2" />
              Add Penalty
            </Button>
          </div>

          {penalties.map((penalty, index) => (
            <div key={index} className="p-6 border border-gray-200 rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-md font-medium text-gray-800">Penalty {index + 1}</h4>
                <Button
                  onClick={() => removePenalty(index)}
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-300 hover:bg-red-50 bg-transparent"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Date of Offence</Label>
                  <Input
                    type="date"
                    value={penalty.dateOfOffence}
                    onChange={(e) => updatePenalty(index, "dateOfOffence", e.target.value)}
                    className="h-10 border-2 border-gray-200 focus:border-[#6BB6FF] focus:ring-[#6BB6FF]/20 rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Act of Misconduct</Label>
                  <Input
                    value={penalty.actOfMisconduct}
                    onChange={(e) => updatePenalty(index, "actOfMisconduct", e.target.value)}
                    className="h-10 border-2 border-gray-200 focus:border-[#6BB6FF] focus:ring-[#6BB6FF]/20 rounded-lg"
                    placeholder="Enter act of misconduct"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Action Taken</Label>
                  <Input
                    value={penalty.actionTaken}
                    onChange={(e) => updatePenalty(index, "actionTaken", e.target.value)}
                    className="h-10 border-2 border-gray-200 focus:border-[#6BB6FF] focus:ring-[#6BB6FF]/20 rounded-lg"
                    placeholder="Enter action taken"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Amount</Label>
                  <Input
                    type="number"
                    value={penalty.amount}
                    onChange={(e) => updatePenalty(index, "amount", Number.parseFloat(e.target.value))}
                    className="h-10 border-2 border-gray-200 focus:border-[#6BB6FF] focus:ring-[#6BB6FF]/20 rounded-lg"
                    placeholder="Enter amount"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Month</Label>
                  <Input
                    type="number"
                    value={penalty.month}
                    onChange={(e) => updatePenalty(index, "month", Number.parseInt(e.target.value))}
                    className="h-10 border-2 border-gray-200 focus:border-[#6BB6FF] focus:ring-[#6BB6FF]/20 rounded-lg"
                    placeholder="Enter month"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Witness Name</Label>
                  <Input
                    value={penalty.witnessName}
                    onChange={(e) => updatePenalty(index, "witnessName", e.target.value)}
                    className="h-10 border-2 border-gray-200 focus:border-[#6BB6FF] focus:ring-[#6BB6FF]/20 rounded-lg"
                    placeholder="Enter witness name"
                  />
                </div>
                <div className="space-y-2 md:col-span-3">
                  <Label className="text-sm font-medium text-gray-700">Fine Realised Date</Label>
                  <Input
                    type="date"
                    value={penalty.fineRealisedDate}
                    onChange={(e) => updatePenalty(index, "fineRealisedDate", e.target.value)}
                    className="h-10 border-2 border-gray-200 focus:border-[#6BB6FF] focus:ring-[#6BB6FF]/20 rounded-lg max-w-md"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        {/* WC Policies */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">WC Policies</h3>
            <Button onClick={addWcPolicy} className="bg-[#6BB6FF] hover:bg-[#4A90E2]">
              <Plus className="w-4 h-4 mr-2" />
              Add WC Policy
            </Button>
          </div>

          {wcPolicies.map((policy, index) => (
            <div key={index} className="p-6 border border-gray-200 rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-md font-medium text-gray-800">WC Policy {index + 1}</h4>
                <Button
                  onClick={() => removeWcPolicy(index)}
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
                  <Label className="text-sm font-medium text-gray-700">Policy Number</Label>
                  <Input
                    value={policy.policyNumber}
                    onChange={(e) => updateWcPolicy(index, "policyNumber", e.target.value)}
                    className="h-10 border-2 border-gray-200 focus:border-[#6BB6FF] focus:ring-[#6BB6FF]/20 rounded-lg"
                    placeholder="Enter policy number"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Policy Company Name</Label>
                  <Input
                    value={policy.policyCompanyName}
                    onChange={(e) => updateWcPolicy(index, "policyCompanyName", e.target.value)}
                    className="h-10 border-2 border-gray-200 focus:border-[#6BB6FF] focus:ring-[#6BB6FF]/20 rounded-lg"
                    placeholder="Enter policy company name"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Policy Start Date</Label>
                  <Input
                    type="date"
                    value={policy.policyStartDate}
                    onChange={(e) => updateWcPolicy(index, "policyStartDate", e.target.value)}
                    className="h-10 border-2 border-gray-200 focus:border-[#6BB6FF] focus:ring-[#6BB6FF]/20 rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Policy Expiry Date</Label>
                  <Input
                    type="date"
                    value={policy.policyExpiryDate}
                    onChange={(e) => updateWcPolicy(index, "policyExpiryDate", e.target.value)}
                    className="h-10 border-2 border-gray-200 focus:border-[#6BB6FF] focus:ring-[#6BB6FF]/20 rounded-lg"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-sm font-medium text-gray-700">Maximum Workmen</Label>
                  <Input
                    type="number"
                    value={policy.maximumWorkmen}
                    onChange={(e) => updateWcPolicy(index, "maximumWorkmen", Number.parseInt(e.target.value))}
                    className="h-10 border-2 border-gray-200 focus:border-[#6BB6FF] focus:ring-[#6BB6FF]/20 rounded-lg max-w-md"
                    placeholder="Enter maximum workmen"
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