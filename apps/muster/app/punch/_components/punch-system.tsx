"use client"

import { useState } from "react"
import { Clock, Send, CheckCircle, XCircle, LogIn, LogOut, User, Calendar, MessageSquare, ChevronRight, Plus } from "lucide-react"
import { Button } from "@repo/ui/components/ui/button"
import { Input } from "@repo/ui/components/ui/input"
import { Label } from "@repo/ui/components/ui/label"
import { Textarea } from "@repo/ui/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@repo/ui/components/ui/dialog"
import NewPunchUpdateForm from "./new-punch-update-form"
import PunchRequestsPopup from "./punch-requests-popup"
import NewShiftForm from "./new-shift-form"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

interface PunchRecord {
  id: string
  type: "in" | "out"
  timestamp: Date
  location?: string
  notes?: string
  status: "approved" | "pending" | "rejected"
  userId?: string
  userName?: string
}

interface PunchRequest {
  id: string
  type: "in" | "out"
  requestedTime: Date
  reason: string
  status: "pending" | "approved" | "rejected"
  submittedAt: Date
}

export default function PunchSystem() {
  const [currentView, setCurrentView] = useState<"main" | "history" | "individual">("main")
  const [selectedUser, setSelectedUser] = useState<string>("")
  const [punchHistory, setPunchHistory] = useState<PunchRecord[]>([
    {
      id: "1",
      type: "in",
      timestamp: new Date("2024-01-15T09:00:00"),
      location: "Main Office",
      status: "approved",
      userId: "user1",
      userName: "John Doe",
    },
    {
      id: "2",
      type: "out",
      timestamp: new Date("2024-01-15T17:30:00"),
      location: "Main Office",
      status: "approved",
      userId: "user1",
      userName: "John Doe",
    },
    {
      id: "3",
      type: "in",
      timestamp: new Date("2024-01-16T08:45:00"),
      location: "Remote",
      status: "pending",
      userId: "user2",
      userName: "Jane Smith",
    },
    {
      id: "4",
      type: "out",
      timestamp: new Date("2024-01-16T12:15:00"),
      location: "Main Office",
      status: "approved",
      userId: "user1",
      userName: "John Doe",
    },
    {
      id: "5",
      type: "in",
      timestamp: new Date("2024-01-17T09:15:00"),
      location: "Main Office",
      status: "approved",
      userId: "user3",
      userName: "Mike Johnson",
    },
  ])

  const [punchRequests, setPunchRequests] = useState<PunchRequest[]>([
    {
      id: "1",
      type: "in",
      requestedTime: new Date("2024-01-14T09:15:00"),
      reason: "Forgot to punch in due to urgent meeting",
      status: "pending",
      submittedAt: new Date("2024-01-14T10:00:00"),
    },
    {
      id: "2",
      type: "out",
      requestedTime: new Date("2024-01-13T18:00:00"),
      reason: "System was down during punch out",
      status: "approved",
      submittedAt: new Date("2024-01-13T19:00:00"),
    },
    {
      id: "3",
      type: "in",
      requestedTime: new Date("2024-01-12T08:30:00"),
      reason: "Traffic jam caused delay",
      status: "approved",
      submittedAt: new Date("2024-01-12T09:30:00"),
    },
    {
      id: "4",
      type: "out",
      requestedTime: new Date("2024-01-11T17:45:00"),
      reason: "Emergency call from client",
      status: "rejected",
      submittedAt: new Date("2024-01-11T18:30:00"),
    },
    {
      id: "5",
      type: "in",
      requestedTime: new Date("2024-01-10T09:00:00"),
      reason: "Doctor appointment ran late",
      status: "pending",
      submittedAt: new Date("2024-01-10T11:00:00"),
    },
    {
      id: "6",
      type: "out",
      requestedTime: new Date("2024-01-09T16:30:00"),
      reason: "Family emergency",
      status: "approved",
      submittedAt: new Date("2024-01-09T17:00:00"),
    },
    {
      id: "7",
      type: "in",
      requestedTime: new Date("2024-01-08T08:45:00"),
      reason: "Public transport delay",
      status: "approved",
      submittedAt: new Date("2024-01-08T10:15:00"),
    },
    {
      id: "8",
      type: "out",
      requestedTime: new Date("2024-01-07T18:15:00"),
      reason: "Forgot to punch out before leaving",
      status: "pending",
      submittedAt: new Date("2024-01-08T08:00:00"),
    },
    {
      id: "9",
      type: "in",
      requestedTime: new Date("2024-01-06T09:30:00"),
      reason: "Car breakdown on the way to office",
      status: "rejected",
      submittedAt: new Date("2024-01-06T12:00:00"),
    },
    {
      id: "10",
      type: "out",
      requestedTime: new Date("2024-01-05T17:00:00"),
      reason: "System maintenance prevented punch out",
      status: "approved",
      submittedAt: new Date("2024-01-05T20:30:00"),
    },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [requestType, setRequestType] = useState<"in" | "out">("in")
  const [requestTime, setRequestTime] = useState("")
  const [requestReason, setRequestReason] = useState("")
  const [showAllDialog, setShowAllDialog] = useState(false)
  const [selectedRequestForPopup, setSelectedRequestForPopup] = useState<PunchRequest | null>(null)
  
  // NewPunchUpdateForm states
  const [isNewPunchFormOpen, setIsNewPunchFormOpen] = useState(false)
  const [punchFormType, setPunchFormType] = useState<"in" | "out">("in")
  
  // NewShiftForm states
  const [isNewShiftFormOpen, setIsNewShiftFormOpen] = useState(false)



  const users = [
    { id: "user1", name: "John Doe" },
    { id: "user2", name: "Jane Smith" },
    { id: "user3", name: "Mike Johnson" },
  ]

  const handlePunchIn = () => {
    setPunchFormType("in")
    setIsNewPunchFormOpen(true)
  }

  const handlePunchOut = () => {
    setPunchFormType("out")
    setIsNewPunchFormOpen(true)
  }

  const handleCreateNewShift = () => {
    setIsNewShiftFormOpen(true)
  }

  const handleNewShiftFormSubmit = async (data: any) => {
    try {
      // Here you would typically send the data to your API
      console.log("New shift data:", data)
      
      // For now, we'll just show a success message
      toast.success("Shift created successfully!")
      
      // You can add API call here:
      // const response = await fetch('/api/shifts', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // })
      
      setIsNewShiftFormOpen(false)
    } catch (error) {
      console.error("Error creating shift:", error)
      toast.error("Failed to create shift. Please try again.")
    }
  }

  const handleOngoingShifts = () => {
    // TODO: Implement ongoing shifts functionality
    console.log("Ongoing Shifts clicked")
    toast.info("Ongoing shifts feature coming soon!")
    // You can add navigation or modal logic here
  }

  const handleSubmitRequest = () => {
    if (!requestTime || !requestReason) return

    const newRequest: PunchRequest = {
      id: Date.now().toString(),
      type: requestType,
      requestedTime: new Date(requestTime),
      reason: requestReason,
      status: "pending",
      submittedAt: new Date(),
    }

    setPunchRequests([newRequest, ...punchRequests])
    setRequestTime("")
    setRequestReason("")
    setIsDialogOpen(false)
  }

  const handleNewPunchFormSubmit = async (data: any) => {
    try {
      // Basic validation
      if (!data.employeeID || !data.punchedTime || !data.attendanceDate) {
        toast.error("❌ Please fill in all required fields", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
        return false
      }

      // Format the data according to the required JSON structure
      const formattedData = {
        tenant: "Midhani",
        action: "insert",
        collectionName: "editPunchApplication",
        id: "",
        event: "reportGeneration",
        data: {
          tenantCode: "tenant1",
          workflowName: "EditPunch Application",
          uploadedBy: "user",
          createdOn: new Date().toISOString(),
          employeeID: data.employeeID,
          punchedTime: data.punchedTime,
          transactionTime: data.transactionTime,
          inOut: data.inOut,
          typeOfMovement: data.typeOfMovement,
          uploadTime: data.uploadTime,
          attendanceDate: data.attendanceDate,
          previosAttendanceDate: data.previosAttendanceDate,
          Status: data.Status,
          organizationCode: "ALL",
          isDeleted: data.isDeleted,
          appliedDate: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
          workflowState: "INITIATED",
          remarks: data.remarks
        }
      }

      console.log("Submitting punch data:", formattedData)

      // For now, use a placeholder token - you can implement proper auth later
      const token = "your-auth-token-here"
      if (!token) {
        toast.error("Error: No authentication token found. Please login again.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
        return false
      }

      // Send POST request to the API
      const response = await fetch('http://192.168.88.100:8000/api/command/attendance/editPunchApplication', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formattedData)
      })

      if (response.ok) {
        const result = await response.json()
        console.log("API Response:", result)
        toast.success("✅ Punch application submitted successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
        
        // Also add to local punch history for UI display
        const newPunch: PunchRecord = {
          id: Date.now().toString(),
          type: data.inOut === "I" ? "in" : "out",
          timestamp: new Date(data.punchedTime),
          location: "Current Location",
          notes: data.remarks,
          status: "approved",
          userId: "current",
          userName: "Current User",
        }
        
        setPunchHistory([newPunch, ...punchHistory])
        setIsNewPunchFormOpen(false)
        return true // Success
      } else {
        const errorData = await response.json().catch(() => ({}))
        console.error("API Error:", errorData)
        toast.error(`❌ Error submitting punch application: ${response.status} - ${errorData.message || response.statusText}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
        return false // Error
      }

    } catch (error) {
      console.error("Error submitting punch application:", error)
      toast.error(`❌ Network error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
      return false // Error
    }
  }

  const handleRequestClick = (request: PunchRequest) => {
    setSelectedRequestForPopup(request)
    setShowAllDialog(true)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  const getTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    if (diffInMinutes < 60) {
      return `${diffInMinutes} min ago`
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60)
      return `${hours} hour${hours > 1 ? "s" : ""} ago`
    } else {
      return formatDate(date)
    }
  }

  const getFilteredHistory = () => {
    if (currentView === "individual" && selectedUser) {
      return punchHistory.filter((punch) => punch.userId === selectedUser)
    }
    return punchHistory
  }

  const renderMainView = () => (
    <>
      {/* Quick Actions */}
      <div className="bg-white/90 backdrop-blur-sm mb-6 rounded-3xl p-6 shadow-xl border border-blue-100/50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handleCreateNewShift}
            className="flex flex-col items-center p-4 bg-blue-50/80 hover:bg-blue-100/80 rounded-2xl transition-all duration-200 group border border-blue-100/50"
          >
            <div className="w-12 h-12 bg-[#007AFF] rounded-2xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform shadow-lg">
              <Plus className="h-6 w-6 text-white" />
            </div>
            <span className="font-medium text-gray-900">Create New Shift</span>
            <span className="text-sm text-blue-600">Add new shift</span>
          </button>
          <button
            onClick={handleOngoingShifts}
            className="flex flex-col items-center p-4 bg-blue-50/80 hover:bg-blue-100/80 rounded-2xl transition-all duration-200 group border border-blue-100/50"
          >
            <div className="w-12 h-12 bg-[#64B5F6] rounded-2xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform shadow-lg">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <span className="font-medium text-gray-900">Ongoing Shifts</span>
            <span className="text-sm text-blue-600">View active shifts</span>
          </button>
        </div>
      </div>

      {/* Request for Punches */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6  shadow-xl border border-blue-100/50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Request for Punches</h2>
          <div className="flex items-center space-x-3">
            
            <button
              onClick={() => setShowAllDialog(true)}
              className="text-sm text-[#007AFF] font-medium hover:text-[#007AFF]/80"
            >
              See All
            </button>
          </div>
        </div>
        <div className="space-y-1">
          {punchRequests.length === 0 ? (
            <div className="text-center py-8 text-blue-400">
              <Send className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p>No punch requests submitted</p>
              {/* <button
                onClick={() => setIsDialogOpen(true)}
                className="mt-3 px-4 py-2 bg-[#007AFF] text-white rounded-xl text-sm hover:bg-[#007AFF]/90 transition-colors"
              >
                Create Request
              </button> */}
            </div>
          ) : (
            <div className="space-y-1 max-h-80 overflow-y-auto scrollbar-hide">
              {punchRequests.slice(0, 3).map((request) => (
                <div
                  key={request.id}
                  onClick={() => handleRequestClick(request)}
                  className="group flex items-center justify-between py-4 border-b border-blue-100/50 last:border-b-0 cursor-pointer hover:bg-blue-50/50 transition-colors rounded-lg px-2"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl border-2 border-[#007AFF]/20 bg-[#E3F2FD] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                      <Send className="h-5 w-5 text-[#007AFF]" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Manual Punch {request.type === "in" ? "In" : "Out"}</p>
                      <p className="text-sm text-blue-600">
                        {formatDate(request.requestedTime)} • {getTimeAgo(request.submittedAt)}
                      </p>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-1">{request.reason}</p>
                    </div>
                  </div>
                  <div className="text-right flex items-center space-x-2">
                    <div>
                      <p className="font-semibold text-gray-900">{formatTime(request.requestedTime)}</p>
                      <div className="flex items-center justify-end mt-1">
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${
                            request.status === "approved"
                              ? "bg-[#007AFF]/10 text-[#007AFF]"
                              : request.status === "pending"
                                ? "bg-[#64B5F6]/10 text-[#64B5F6]"
                                : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {request.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )

  const renderHistoryView = () => (
    <div className="bg-white/90 mb-6 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-blue-100/50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <button onClick={() => setCurrentView("main")} className="p-2 hover:bg-blue-50 rounded-xl transition-colors">
            <svg className="h-5 w-5 text-[#007AFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-xl font-semibold text-gray-900">All Punch History</h2>
        </div>
      </div>
      <div className="space-y-1 max-h-96 overflow-y-auto">
        {punchHistory.map((punch) => (
          <div
            key={punch.id}
            className="flex items-center justify-between py-4 border-b border-blue-100/50 last:border-b-0"
          >
            <div className="flex items-center space-x-4">
              <div
                className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center shadow-sm ${
                  punch.type === "in" ? "border-[#007AFF]/20 bg-[#007AFF]" : "border-[#64B5F6]/20 bg-[#64B5F6]"
                }`}
              >
                {punch.type === "in" ? (
                  <LogIn className="h-5 w-5 text-white" />
                ) : (
                  <LogOut className="h-5 w-5 text-white" />
                )}
              </div>
              <div>
                <p className="font-medium text-gray-900">{punch.userName}</p>
                <p className="text-sm text-blue-600">
                  Punch {punch.type === "in" ? "In" : "Out"} • {formatDate(punch.timestamp)}
                </p>
                {punch.location && <p className="text-xs text-gray-500">{punch.location}</p>}
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">{formatTime(punch.timestamp)}</p>
              <div className="flex items-center justify-end mt-1">
                {punch.status === "approved" && <CheckCircle className="h-3 w-3 text-[#007AFF]" />}
                {punch.status === "pending" && <Clock className="h-3 w-3 text-[#64B5F6]" />}
                {punch.status === "rejected" && <XCircle className="h-3 w-3 text-gray-400" />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderIndividualView = () => (
    <div className="space-y-6 mb-6">
      {/* User Selection */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-blue-100/50">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setCurrentView("main")}
              className="p-2 hover:bg-blue-50 rounded-xl transition-colors"
            >
              <svg className="h-5 w-5 text-[#007AFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 className="text-xl font-semibold text-gray-900">Individual History</h2>
          </div>
        </div>
        <div className="space-y-3">
          <Label className="text-gray-700">Select Person</Label>
          <div className="grid grid-cols-1 gap-2">
            {users.map((user) => (
              <button
                key={user.id}
                onClick={() => setSelectedUser(user.id)}
                className={`p-4 rounded-2xl border-2 transition-all text-left ${
                  selectedUser === user.id
                    ? "border-[#007AFF] bg-[#007AFF]/5"
                    : "border-blue-100 hover:border-blue-200 hover:bg-blue-50/50"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#64B5F6] rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-blue-600">
                      {punchHistory.filter((p) => p.userId === user.id).length} punches
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Individual History */}
      {selectedUser && (
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-blue-100/50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              {users.find((u) => u.id === selectedUser)?.name} History
            </h3>
          </div>
          <div className="space-y-1 max-h-96 overflow-y-auto">
            {getFilteredHistory().length === 0 ? (
              <div className="text-center py-8 text-blue-400">
                <Clock className="h-12 w-12 mx-auto mb-4 opacity-30" />
                <p>No punch history found</p>
              </div>
            ) : (
              getFilteredHistory().map((punch) => (
                <div
                  key={punch.id}
                  className="flex items-center justify-between py-4 border-b border-blue-100/50 last:border-b-0"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center shadow-sm ${
                        punch.type === "in" ? "border-[#007AFF]/20 bg-[#007AFF]" : "border-[#64B5F6]/20 bg-[#64B5F6]"
                      }`}
                    >
                      {punch.type === "in" ? (
                        <LogIn className="h-5 w-5 text-white" />
                      ) : (
                        <LogOut className="h-5 w-5 text-white" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Punch {punch.type === "in" ? "In" : "Out"}</p>
                      <p className="text-sm text-blue-600">{formatDate(punch.timestamp)}</p>
                      {punch.location && <p className="text-xs text-gray-500">{punch.location}</p>}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{formatTime(punch.timestamp)}</p>
                    <div className="flex items-center justify-end mt-1">
                      {punch.status === "approved" && <CheckCircle className="h-3 w-3 text-[#007AFF]" />}
                      {punch.status === "pending" && <Clock className="h-3 w-3 text-[#64B5F6]" />}
                      {punch.status === "rejected" && <XCircle className="h-3 w-3 text-gray-400" />}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className="h-full bg-gradient-to-br pt-4 pb-6">
      <ToastContainer />
      <div className="max-w-md mx-auto ">
        {currentView === "main" && renderMainView()}
        {currentView === "history" && renderHistoryView()}
        {currentView === "individual" && renderIndividualView()}

        {/* Enhanced Manual Punch Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="rounded-3xl border-0 shadow-2xl bg-white/95 backdrop-blur-xl max-w-md mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white/90 to-indigo-50/80 rounded-3xl" />
            <div className="relative">
              <DialogHeader className="pb-4">
                <DialogTitle className="text-xl font-semibold text-gray-900">Request Manual Punch</DialogTitle>
                <DialogDescription className="text-gray-600">
                  Submit a request for a missed punch entry
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Punch Type Selection */}
                <div className="space-y-3">
                  <Label className="text-gray-800 font-semibold text-sm uppercase tracking-wide">Punch Type</Label>
                  <div className="grid grid-cols-2 gap-3 p-1 bg-gray-100/80 rounded-2xl">
                    <button
                      onClick={() => setRequestType("in")}
                      className={`flex items-center justify-center space-x-2 py-4 px-4 rounded-xl font-semibold transition-all duration-200 ${
                        requestType === "in"
                          ? "bg-white text-[#007AFF] shadow-lg shadow-blue-200/50 scale-105"
                          : "text-gray-600 hover:text-gray-800 hover:bg-white/50"
                      }`}
                    >
                      <LogIn className="h-5 w-5" />
                      <span>Punch In</span>
                    </button>
                    <button
                      onClick={() => setRequestType("out")}
                      className={`flex items-center justify-center space-x-2 py-4 px-4 rounded-xl font-semibold transition-all duration-200 ${
                        requestType === "out"
                          ? "bg-white text-[#64B5F6] shadow-lg shadow-blue-200/50 scale-105"
                          : "text-gray-600 hover:text-gray-800 hover:bg-white/50"
                      }`}
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Punch Out</span>
                    </button>
                  </div>
                </div>

                {/* Date & Time Input */}
                <div className="space-y-3">
                  <Label
                    htmlFor="time"
                    className="text-gray-800 font-semibold text-sm uppercase tracking-wide flex items-center space-x-2"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Date & Time</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="time"
                      type="datetime-local"
                      value={requestTime}
                      onChange={(e) => setRequestTime(e.target.value)}
                      className="rounded-2xl border-2 border-gray-200/80 focus:border-[#007AFF] focus:ring-4 focus:ring-[#007AFF]/20 bg-white/80 backdrop-blur-sm py-4 px-4 text-gray-800 font-medium transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Reason Input */}
                <div className="space-y-3">
                  <Label
                    htmlFor="reason"
                    className="text-gray-800 font-semibold text-sm uppercase tracking-wide flex items-center space-x-2"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Reason</span>
                  </Label>
                  <Textarea
                    id="reason"
                    placeholder="Please explain why you need this manual punch entry..."
                    value={requestReason}
                    onChange={(e) => setRequestReason(e.target.value)}
                    className="rounded-2xl border-2 border-gray-200/80 focus:border-[#007AFF] focus:ring-4 focus:ring-[#007AFF]/20 bg-white/80 backdrop-blur-sm py-4 px-4 text-gray-800 font-medium transition-all duration-200 min-h-[100px] resize-none"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    className="flex-1 rounded-2xl border-2 border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-800 font-semibold py-4 transition-all duration-200"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmitRequest}
                    disabled={!requestTime || !requestReason}
                    className="flex-1 rounded-2xl bg-gradient-to-r from-[#007AFF] to-[#64B5F6] hover:from-[#007AFF]/90 hover:to-[#64B5F6]/90 text-white font-semibold py-4 shadow-lg shadow-blue-200/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Submit Request
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Punch Requests Popup */}
        <PunchRequestsPopup
          isOpen={showAllDialog}
          onClose={() => {
            setShowAllDialog(false)
            setSelectedRequestForPopup(null)
          }}
          punchRequests={punchRequests}
          initialSelectedRequest={selectedRequestForPopup}
        />

        {/* NewPunchUpdateForm */}
        <NewPunchUpdateForm
          key={`punch-form-${punchFormType}`}
          isOpen={isNewPunchFormOpen}
          onClose={() => setIsNewPunchFormOpen(false)}
          initialValues={{
            employeeID: "",
            punchedTime: new Date().toISOString().slice(0, 16),
            transactionTime: new Date().toISOString().slice(0, 16),
            inOut: punchFormType === "in" ? "I" : "O",
            typeOfMovement: "P",
            uploadTime: new Date().toISOString().slice(0, 16),
            attendanceDate: new Date().toISOString().split("T")[0],
            previosAttendanceDate: new Date().toISOString().split("T")[0],
            Status: "NEW",
            isDeleted: false,
            remarks: `Manual ${punchFormType === "in" ? "punch in" : "punch out"} request`,
          }}
          disableInOut={true}
          onSubmit={handleNewPunchFormSubmit}
        />

        {/* NewShiftForm */}
        <NewShiftForm
          isOpen={isNewShiftFormOpen}
          onClose={() => setIsNewShiftFormOpen(false)}
          onSubmit={handleNewShiftFormSubmit}
        />
      </div>
    </div>
  )
}
