"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Input } from "@repo/ui/components/ui/input"
import { Label } from "@repo/ui/components/ui/label"
import { Button } from "@repo/ui/components/ui/button"
import { Separator } from "@repo/ui/components/ui/separator"
import { CreditCard, Plus, Trash2 } from "lucide-react"

interface BankDetail {
  bankName: string
  branchName: string
  micrNo: string
  ifscNo: string
  bankAccountNo: string
}

interface SecurityDeposit {
  depositDate: string
  depositDetail: string
  depositAmount: number
}

interface FinancialDetailsFormProps {
  bankDetails: BankDetail[]
  securityDeposits: SecurityDeposit[]
  onBankDetailsChange: (bankDetails: BankDetail[]) => void
  onSecurityDepositsChange: (deposits: SecurityDeposit[]) => void
}

export function FinancialDetailsForm({ 
  bankDetails, 
  securityDeposits, 
  onBankDetailsChange, 
  onSecurityDepositsChange 
}: FinancialDetailsFormProps) {
  const addBankDetail = () => {
    onBankDetailsChange([
      ...bankDetails,
      {
        bankName: "",
        branchName: "",
        micrNo: "",
        ifscNo: "",
        bankAccountNo: "",
      },
    ])
  }

  const removeBankDetail = (index: number) => {
    onBankDetailsChange(bankDetails.filter((_, i) => i !== index))
  }

  const updateBankDetail = (index: number, field: string, value: string) => {
    const updatedBankDetails = [...bankDetails]
    updatedBankDetails[index] = { ...updatedBankDetails[index], [field]: value }
    onBankDetailsChange(updatedBankDetails)
  }

  const addSecurityDeposit = () => {
    onSecurityDepositsChange([
      ...securityDeposits,
      { depositDate: "", depositDetail: "", depositAmount: 0 },
    ])
  }

  const removeSecurityDeposit = (index: number) => {
    onSecurityDepositsChange(securityDeposits.filter((_, i) => i !== index))
  }

  const updateSecurityDeposit = (index: number, field: string, value: any) => {
    const updated = [...securityDeposits]
    updated[index] = { ...updated[index], [field]: value }
    onSecurityDepositsChange(updated)
  }

  return (
    <Card className="rounded-2xl border-0 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-[#6BB6FF] to-[#4A90E2] text-white rounded-t-2xl">
        <CardTitle className="flex items-center space-x-3 text-xl">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
            <CreditCard className="w-6 h-6" />
          </div>
          <span>Financial Details</span>
        </CardTitle>
        <CardDescription className="text-blue-100">
          Bank details and security deposit information
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8 space-y-8">
        {/* Bank Details */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Bank Details</h3>
            <Button onClick={addBankDetail} className="bg-[#007AFF] hover:bg-[#0056CC]">
              <Plus className="w-4 h-4 mr-2" />
              Add Bank Detail
            </Button>
          </div>

          {bankDetails.map((bank, index) => (
            <div key={index} className="p-6 border border-gray-200 rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-md font-medium text-gray-800">Bank Detail {index + 1}</h4>
                <Button
                  onClick={() => removeBankDetail(index)}
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
                  <Label className="text-sm font-medium text-gray-700">Bank Name</Label>
                  <Input
                    value={bank.bankName}
                    onChange={(e) => updateBankDetail(index, "bankName", e.target.value)}
                    className="h-10 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-lg"
                    placeholder="Enter bank name"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Branch Name</Label>
                  <Input
                    value={bank.branchName}
                    onChange={(e) => updateBankDetail(index, "branchName", e.target.value)}
                    className="h-10 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-lg"
                    placeholder="Enter branch name"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">MICR Number</Label>
                  <Input
                    value={bank.micrNo}
                    onChange={(e) => updateBankDetail(index, "micrNo", e.target.value)}
                    className="h-10 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-lg"
                    placeholder="Enter MICR number"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">IFSC Code</Label>
                  <Input
                    value={bank.ifscNo}
                    onChange={(e) => updateBankDetail(index, "ifscNo", e.target.value)}
                    className="h-10 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-lg"
                    placeholder="Enter IFSC code"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-sm font-medium text-gray-700">Bank Account Number</Label>
                  <Input
                    value={bank.bankAccountNo}
                    onChange={(e) => updateBankDetail(index, "bankAccountNo", e.target.value)}
                    className="h-10 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-lg"
                    placeholder="Enter bank account number"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        {/* Security Deposits */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Security Deposits</h3>
            <Button onClick={addSecurityDeposit} className="bg-[#007AFF] hover:bg-[#0056CC]">
              <Plus className="w-4 h-4 mr-2" />
              Add Deposit
            </Button>
          </div>

          {securityDeposits.map((deposit, index) => (
            <div key={index} className="p-6 border border-gray-200 rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-md font-medium text-gray-800">Security Deposit {index + 1}</h4>
                <Button
                  onClick={() => removeSecurityDeposit(index)}
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
                  <Label className="text-sm font-medium text-gray-700">Deposit Date</Label>
                  <Input
                    type="date"
                    value={deposit.depositDate}
                    onChange={(e) => updateSecurityDeposit(index, "depositDate", e.target.value)}
                    className="h-10 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Deposit Amount</Label>
                  <Input
                    type="number"
                    value={deposit.depositAmount}
                    onChange={(e) => updateSecurityDeposit(index, "depositAmount", Number.parseFloat(e.target.value))}
                    className="h-10 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-lg"
                    placeholder="Enter deposit amount"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Deposit Detail</Label>
                  <Input
                    value={deposit.depositDetail}
                    onChange={(e) => updateSecurityDeposit(index, "depositDetail", e.target.value)}
                    className="h-10 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-lg"
                    placeholder="Enter deposit detail"
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