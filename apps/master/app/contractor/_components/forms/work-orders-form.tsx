"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Input } from "@repo/ui/components/ui/input"
import { Label } from "@repo/ui/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/ui/select"
import { Button } from "@repo/ui/components/ui/button"
import { Textarea } from "@repo/ui/components/ui/textarea"
import { Separator } from "@repo/ui/components/ui/separator"
import { ClipboardList, Plus, Trash2 } from "lucide-react"

interface AssetCharge {
  assetCode: string
  assetName: string
  assetCharges: number
}

interface EmployeeWages {
  wageType: string
  wageAmount: number
}

interface WorkOrder {
  workOrderNumber: string
  workOrderDate: string
  proposalReferenceNumber: string
  NumberOfEmployees: number
  contractPeriodFrom: string
  contractPeriodTo: string
  workOrderDocumentFilePath: string
  annexureFilePath: string
  serviceChargeAmount: number
  workOrderType: string
  workOrderLineItems: string
  serviceLineItems: string
  serviceCode: string
  wcChargesPerEmployee: number
  assetChargesPerDay: AssetCharge[]
  employeeWages: EmployeeWages
}

interface WorkOrdersFormProps {
  workOrders: WorkOrder[]
  onWorkOrdersChange: (workOrders: WorkOrder[]) => void
}

export function WorkOrdersForm({ workOrders, onWorkOrdersChange }: WorkOrdersFormProps) {
  const addWorkOrder = () => {
    onWorkOrdersChange([
      ...workOrders,
      {
        workOrderNumber: "",
        workOrderDate: "",
        proposalReferenceNumber: "",
        NumberOfEmployees: 0,
        contractPeriodFrom: "",
        contractPeriodTo: "",
        workOrderDocumentFilePath: "",
        annexureFilePath: "",
        serviceChargeAmount: 0,
        workOrderType: "Standard",
        workOrderLineItems: "",
        serviceLineItems: "",
        serviceCode: "",
        wcChargesPerEmployee: 0,
        assetChargesPerDay: [],
        employeeWages: {
          wageType: "hourly",
          wageAmount: 0,
        },
      },
    ])
  }

  const removeWorkOrder = (index: number) => {
    onWorkOrdersChange(workOrders.filter((_, i) => i !== index))
  }

  const updateWorkOrder = (index: number, field: string, value: any) => {
    const updatedWorkOrders = [...workOrders]
    updatedWorkOrders[index] = { ...updatedWorkOrders[index], [field]: value }
    onWorkOrdersChange(updatedWorkOrders)
  }

  const addAssetCharge = (workOrderIndex: number) => {
    const updatedWorkOrders = [...workOrders]
    updatedWorkOrders[workOrderIndex].assetChargesPerDay.push({
      assetCode: "",
      assetName: "",
      assetCharges: 0,
    })
    onWorkOrdersChange(updatedWorkOrders)
  }

  const removeAssetCharge = (workOrderIndex: number, assetIndex: number) => {
    const updatedWorkOrders = [...workOrders]
    updatedWorkOrders[workOrderIndex].assetChargesPerDay = updatedWorkOrders[
      workOrderIndex
    ].assetChargesPerDay.filter((_, i) => i !== assetIndex)
    onWorkOrdersChange(updatedWorkOrders)
  }

  return (
    <Card className="rounded-2xl border-0 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-[#6BB6FF] to-[#4A90E2] text-white rounded-t-2xl">
        <CardTitle className="flex items-center space-x-3 text-xl">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
            <ClipboardList className="w-6 h-6" />
          </div>
          <span>Work Orders</span>
        </CardTitle>
        <CardDescription className="text-blue-100">Work order management and contract details</CardDescription>
      </CardHeader>
      <CardContent className="p-8 space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Work Orders</h3>
            <Button onClick={addWorkOrder} className="bg-[#007AFF] hover:bg-[#0056CC]">
              <Plus className="w-4 h-4 mr-2" />
              Add Work Order
            </Button>
          </div>

          {workOrders.map((workOrder, index) => (
            <div key={index} className="p-6 border border-gray-200 rounded-xl space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-md font-medium text-gray-800">Work Order {index + 1}</h4>
                <Button
                  onClick={() => removeWorkOrder(index)}
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-300 hover:bg-red-50 bg-transparent"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove
                </Button>
              </div>

              {/* Basic Work Order Details */}
              <div className="space-y-4">
                <h5 className="text-sm font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  Basic Details
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Work Order Number</Label>
                    <Input
                      value={workOrder.workOrderNumber}
                      onChange={(e) => updateWorkOrder(index, "workOrderNumber", e.target.value)}
                      className="h-10 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-lg"
                      placeholder="Enter work order number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Work Order Date</Label>
                    <Input
                      type="date"
                      value={workOrder.workOrderDate}
                      onChange={(e) => updateWorkOrder(index, "workOrderDate", e.target.value)}
                      className="h-10 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Proposal Reference Number</Label>
                    <Input
                      value={workOrder.proposalReferenceNumber}
                      onChange={(e) => updateWorkOrder(index, "proposalReferenceNumber", e.target.value)}
                      className="h-10 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-lg"
                      placeholder="Enter proposal reference number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Number of Employees</Label>
                    <Input
                      type="number"
                      value={workOrder.NumberOfEmployees}
                      onChange={(e) =>
                        updateWorkOrder(index, "NumberOfEmployees", Number.parseInt(e.target.value))
                      }
                      className="h-10 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-lg"
                      placeholder="Enter number of employees"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Contract Period From</Label>
                    <Input
                      type="date"
                      value={workOrder.contractPeriodFrom}
                      onChange={(e) => updateWorkOrder(index, "contractPeriodFrom", e.target.value)}
                      className="h-10 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Contract Period To</Label>
                    <Input
                      type="date"
                      value={workOrder.contractPeriodTo}
                      onChange={(e) => updateWorkOrder(index, "contractPeriodTo", e.target.value)}
                      className="h-10 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Document Paths */}
              <div className="space-y-4">
                <h5 className="text-sm font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  Document Paths
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Work Order Document File Path</Label>
                    <Input
                      value={workOrder.workOrderDocumentFilePath}
                      onChange={(e) => updateWorkOrder(index, "workOrderDocumentFilePath", e.target.value)}
                      className="h-10 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-lg"
                      placeholder="Enter work order document path"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Annexure File Path</Label>
                    <Input
                      value={workOrder.annexureFilePath}
                      onChange={(e) => updateWorkOrder(index, "annexureFilePath", e.target.value)}
                      className="h-10 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-lg"
                      placeholder="Enter annexure file path"
                    />
                  </div>
                </div>
              </div>

              {/* Service Details */}
              <div className="space-y-4">
                <h5 className="text-sm font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  Service Details
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Service Charge Amount</Label>
                    <Input
                      type="number"
                      value={workOrder.serviceChargeAmount}
                      onChange={(e) =>
                        updateWorkOrder(index, "serviceChargeAmount", Number.parseFloat(e.target.value))
                      }
                      className="h-10 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-lg"
                      placeholder="Enter service charge amount"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Work Order Type</Label>
                    <Select
                      value={workOrder.workOrderType}
                      onValueChange={(value) => updateWorkOrder(index, "workOrderType", value)}
                    >
                      <SelectTrigger className="h-10 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-lg">
                        <SelectValue placeholder="Select work order type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Standard">Standard</SelectItem>
                        <SelectItem value="Premium">Premium</SelectItem>
                        <SelectItem value="Custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Work Order Line Items</Label>
                    <Textarea
                      value={workOrder.workOrderLineItems}
                      onChange={(e) => updateWorkOrder(index, "workOrderLineItems", e.target.value)}
                      className="border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-lg"
                      placeholder="Enter work order line items"
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Service Line Items</Label>
                    <Textarea
                      value={workOrder.serviceLineItems}
                      onChange={(e) => updateWorkOrder(index, "serviceLineItems", e.target.value)}
                      className="border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-lg"
                      placeholder="Enter service line items"
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Service Code</Label>
                    <Input
                      value={workOrder.serviceCode}
                      onChange={(e) => updateWorkOrder(index, "serviceCode", e.target.value)}
                      className="h-10 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-lg"
                      placeholder="Enter service code"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">WC Charges Per Employee</Label>
                    <Input
                      type="number"
                      value={workOrder.wcChargesPerEmployee}
                      onChange={(e) =>
                        updateWorkOrder(index, "wcChargesPerEmployee", Number.parseFloat(e.target.value))
                      }
                      className="h-10 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-lg"
                      placeholder="Enter WC charges per employee"
                    />
                  </div>
                </div>
              </div>

              {/* Employee Wages */}
              <div className="space-y-4">
                <h5 className="text-sm font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  Employee Wages
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Wage Type</Label>
                    <Select
                      value={workOrder.employeeWages.wageType}
                      onValueChange={(value) => {
                        const updatedWorkOrders = [...workOrders]
                        updatedWorkOrders[index].employeeWages.wageType = value
                        onWorkOrdersChange(updatedWorkOrders)
                      }}
                    >
                      <SelectTrigger className="h-10 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-lg">
                        <SelectValue placeholder="Select wage type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Wage Amount</Label>
                    <Input
                      type="number"
                      value={workOrder.employeeWages.wageAmount}
                      onChange={(e) => {
                        const updatedWorkOrders = [...workOrders]
                        updatedWorkOrders[index].employeeWages.wageAmount = Number.parseFloat(e.target.value)
                        onWorkOrdersChange(updatedWorkOrders)
                      }}
                      className="h-10 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-lg"
                      placeholder="Enter wage amount"
                    />
                  </div>
                </div>
              </div>

              {/* Asset Charges Per Day */}
              <div className="space-y-4">
                <h5 className="text-sm font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  Asset Charges Per Day
                </h5>
                <Button
                  onClick={() => addAssetCharge(index)}
                  variant="outline"
                  size="sm"
                  className="mb-4"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Asset Charge
                </Button>

                {workOrder.assetChargesPerDay.map((asset, assetIndex) => (
                  <div key={assetIndex} className="p-4 bg-gray-50 rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <h6 className="text-sm font-medium text-gray-700">Asset {assetIndex + 1}</h6>
                      <Button
                        onClick={() => removeAssetCharge(index, assetIndex)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-300 hover:bg-red-50 bg-transparent"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Asset Code</Label>
                        <Input
                          value={asset.assetCode}
                          onChange={(e) => {
                            const updatedWorkOrders = [...workOrders]
                            updatedWorkOrders[index].assetChargesPerDay[assetIndex].assetCode = e.target.value
                            onWorkOrdersChange(updatedWorkOrders)
                          }}
                          className="h-10 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-lg"
                          placeholder="Enter asset code"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Asset Name</Label>
                        <Input
                          value={asset.assetName}
                          onChange={(e) => {
                            const updatedWorkOrders = [...workOrders]
                            updatedWorkOrders[index].assetChargesPerDay[assetIndex].assetName = e.target.value
                            onWorkOrdersChange(updatedWorkOrders)
                          }}
                          className="h-10 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-lg"
                          placeholder="Enter asset name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Asset Charges</Label>
                        <Input
                          type="number"
                          value={asset.assetCharges}
                          onChange={(e) => {
                            const updatedWorkOrders = [...workOrders]
                            updatedWorkOrders[index].assetChargesPerDay[assetIndex].assetCharges =
                              Number.parseFloat(e.target.value)
                            onWorkOrdersChange(updatedWorkOrders)
                          }}
                          className="h-10 border-2 border-gray-200 focus:border-[#007AFF] focus:ring-[#007AFF]/20 rounded-lg"
                          placeholder="Enter asset charges"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 