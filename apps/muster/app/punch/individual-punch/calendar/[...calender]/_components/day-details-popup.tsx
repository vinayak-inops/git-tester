"use client"

import { useState } from "react"
import { X, Filter, Calendar, Clock, MapPin, Smartphone, FileText, Users } from "lucide-react"
import { Button } from "@repo/ui/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Badge } from "@repo/ui/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/ui/select"
import { Input } from "@repo/ui/components/ui/input"
import BigPopupWrapper from "@repo/ui/components/popupwrapper/big-popup-wrapper"

interface PunchRecord {
  id: string
  employeeId: string
  name: string
  date: string
  type: "punch-in" | "punch-out" | "default"
  timestamp: string
  location: string
  device: string
  notes: string
  totalHoursWorked: string
  status: string
}

interface DayDetailsPopupProps {
  isOpen: boolean
  onClose: () => void
  selectedDate: Date | null
  attendanceDetail: any
}

export default function DayDetailsPopup({ isOpen, onClose, selectedDate, attendanceDetail }: DayDetailsPopupProps) {
  const [activeTab, setActiveTab] = useState("all")
  const [filterType, setFilterType] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  if (!isOpen || !selectedDate || !attendanceDetail) return null

  // Extract only available fields from attendanceDetail
  const infoLeft = [
    attendanceDetail.employeeName && { label: 'Courier Name', value: attendanceDetail.employeeName },
    attendanceDetail.employeeId && { label: 'Courier Code', value: attendanceDetail.employeeId },
    attendanceDetail.joinedDate && { label: 'Joined Date', value: attendanceDetail.joinedDate },
    attendanceDetail.email && { label: 'Email', value: attendanceDetail.email, highlight: 'orange' },
    attendanceDetail.address && { label: 'Address', value: attendanceDetail.address },
    attendanceDetail.phone && { label: 'Phone Number', value: attendanceDetail.phone, highlight: 'orange' },
  ].filter(Boolean)

  const infoRight = [
    attendanceDetail.fleetBrand && { label: 'Fleet Brand', value: attendanceDetail.fleetBrand },
    attendanceDetail.fleetModel && { label: 'Fleet Model', value: attendanceDetail.fleetModel },
    attendanceDetail.fleetCode && { label: 'Fleet Code', value: attendanceDetail.fleetCode },
    attendanceDetail.lastChecking && { label: 'Last Checking', value: attendanceDetail.lastChecking, highlight: 'orange' },
    attendanceDetail.fleetCapacity && { label: 'Fleet Capacity', value: attendanceDetail.fleetCapacity },
    attendanceDetail.fleetCondition && { label: 'Fleet Condition', value: attendanceDetail.fleetCondition, highlight: 'green' },
  ].filter(Boolean)

  // Utility to format ISO time strings
  function formatTimeDisplay(isoString: string) {
    if (!isoString) return '';
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return isoString; // fallback if invalid
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }

  // Generate punch records from attendance detail
  const generatePunchRecords = (): PunchRecord[] => {
    const records: PunchRecord[] = [];
    let recordId = 1;

    // Add in punches
    attendanceDetail.punchDetails.inPunches.forEach((punch: any, index: number) => {
      records.push({
        id: `in-${recordId++}`,
        employeeId: attendanceDetail.employeeId || "EMP001",
        name: attendanceDetail.employeeName || "Employee",
        date: attendanceDetail.date,
        type: "punch-in",
        timestamp: formatTimeDisplay(punch.timestamp || `${attendanceDetail.date}T08:30:00`),
        location: punch.location || "Office - Main Gate",
        device: punch.device || "Biometric Device",
        notes: punch.notes || "Regular punch in",
        totalHoursWorked: attendanceDetail.hoursWorked ? `${Math.floor(attendanceDetail.hoursWorked / 60)}:${(attendanceDetail.hoursWorked % 60).toString().padStart(2, '0')}` : "00:00",
        status: "Present"
      })
    })

    // Add out punches
    attendanceDetail.punchDetails.outPunches.forEach((punch: any, index: number) => {
      records.push({
        id: `out-${recordId++}`,
        employeeId: attendanceDetail.employeeId || "EMP001",
        name: attendanceDetail.employeeName || "Employee",
        date: attendanceDetail.date,
        type: "punch-out",
        timestamp: formatTimeDisplay(punch.timestamp || `${attendanceDetail.date}T17:30:00`),
        location: punch.location || "Office - Main Gate",
        device: punch.device || "Biometric Device",
        notes: punch.notes || "Regular punch out",
        totalHoursWorked: attendanceDetail.hoursWorked ? `${Math.floor(attendanceDetail.hoursWorked / 60)}:${(attendanceDetail.hoursWorked % 60).toString().padStart(2, '0')}` : "00:00",
        status: "Present"
      })
    })

    // Add default punches
    attendanceDetail.punchDetails.defaultPunches.forEach((punch: any, index: number) => {
      records.push({
        id: `default-${recordId++}`,
        employeeId: attendanceDetail.employeeId || "EMP001",
        name: attendanceDetail.employeeName || "Employee",
        date: attendanceDetail.date,
        type: "default",
        timestamp: formatTimeDisplay(punch.timestamp || `${attendanceDetail.date}T12:00:00`),
        location: punch.location || "Office - Default",
        device: punch.device || "System Default",
        notes: punch.notes || "Default punch record",
        totalHoursWorked: attendanceDetail.hoursWorked ? `${Math.floor(attendanceDetail.hoursWorked / 60)}:${(attendanceDetail.hoursWorked % 60).toString().padStart(2, '0')}` : "00:00",
        status: "Present"
      })
    })

    return records;
  }

  const allPunchRecords = generatePunchRecords()

  // Filter records based on active tab and search
  const filteredRecords = allPunchRecords.filter(record => {
    const matchesTab = activeTab === "all" || record.type === activeTab
    const matchesSearch = record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.location.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesTab && matchesSearch
  })

  const getPunchTypeColor = (type: string) => {
    switch (type) {
      case "punch-in":
        return "bg-[#eff6ff] text-[#2563eb] border-[#2563eb]"
      case "punch-out":
        return "bg-[#dbeafe] text-[#1e40af] border-[#2563eb]"
      case "default":
        return "bg-[#f1f5f9] text-[#64748b] border-[#cbd5e1]"
      default:
        return "bg-[#f1f5f9] text-[#64748b] border-[#cbd5e1]"
    }
  }

  const getPunchTypeIcon = (type: string) => {
    switch (type) {
      case "punch-in":
        return <span style={{ color: '#2563eb' }}>🟢</span>
      case "punch-out":
        return <span style={{ color: '#1e40af' }}>🔴</span>
      case "default":
        return <span style={{ color: '#64748b' }}>⚪</span>
      default:
        return <span style={{ color: '#64748b' }}>⚪</span>
    }
  }

  return (
    <BigPopupWrapper open={isOpen} setOpen={onClose}>
      <div className="w-full h-full overflow-y-auto space-y-0">
        

        {/* Attendance Details Card */}
        <div className="bg-white/80 backdrop-blur-sm  p-6 ">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-[#2563eb]" />
            <span className="text-lg font-semibold text-[#2563eb]">Attendance Details</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-[15px]">
            {[
              { label: 'Date', value: attendanceDetail.date },
              { label: 'Shift Code', value: attendanceDetail.shiftCode },
              { label: 'Attendance ID', value: attendanceDetail.attendanceID },
              { label: 'Hours Worked', value: attendanceDetail.hoursWorked },
              { label: 'Late In', value: attendanceDetail.lateIn },
              { label: 'Early Out', value: attendanceDetail.earlyOut },
              { label: 'Extra Hours Post Shift', value: attendanceDetail.extraHoursPostShift },
              { label: 'Extra Hours Pre Shift', value: attendanceDetail.extraHoursPreShift },
              { label: 'Extra Hours', value: attendanceDetail.extraHours },
              { label: 'Personal Out', value: attendanceDetail.personalOut },
              { label: 'Official Out', value: attendanceDetail.officialOut },
              { label: 'OT Hours', value: attendanceDetail.otHours },
            ].map((item) => (
              <div key={item.label} className="flex items-center bg-[#2563eb] border border-[#2563eb]/10 rounded-lg px-3 py-2 shadow-sm min-h-[44px]">
                <span className="text-xs text-white font-medium mr-2 whitespace-nowrap">{item.label}:</span>
                <span className="text-base font-semibold text-white truncate">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Content (Tabs, punch details, etc.) */}
        <div className="bg-white  p-6 ">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex items-center justify-between mb-4">
              <TabsList className="grid w-auto grid-cols-4 bg-[#eff6ff] border border-[#2563eb]/20 rounded-lg">
                <TabsTrigger value="all" className={activeTab === 'all' ? 'bg-[#2563eb] text-white shadow' : 'text-[#2563eb] hover:bg-[#dbeafe]'}>All Punches</TabsTrigger>
                <TabsTrigger value="punch-in" className={activeTab === 'punch-in' ? 'bg-[#2563eb] text-white shadow' : 'text-[#2563eb] hover:bg-[#dbeafe]'}>Punch Ins</TabsTrigger>
                <TabsTrigger value="punch-out" className={activeTab === 'punch-out' ? 'bg-[#2563eb] text-white shadow' : 'text-[#2563eb] hover:bg-[#dbeafe]'}>Punch Outs</TabsTrigger>
                <TabsTrigger value="default" className={activeTab === 'default' ? 'bg-[#2563eb] text-white shadow' : 'text-[#2563eb] hover:bg-[#dbeafe]'}>Default</TabsTrigger>
              </TabsList>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-[#2563eb]" />
                <Input
                  placeholder="Search by name, ID, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 border-[#2563eb]/30 focus:border-[#2563eb] focus:ring-[#2563eb]/30"
                />
              </div>
            </div>
            <TabsContent value={activeTab} className="mt-0">
              {filteredRecords.length === 0 ? (
                <div className="text-center py-8 text-[#2563eb]/60">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-[#2563eb]/20" />
                  <p>No punch records found for the selected criteria.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredRecords.map((record) => (
                    <Card key={record.id} className="hover:shadow-lg transition-shadow border border-[#2563eb]/10">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="text-2xl">{getPunchTypeIcon(record.type)}</div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <h3 className="font-semibold text-[#1e40af]">{record.name}</h3>
                                <Badge variant="outline" className={getPunchTypeColor(record.type) + ' border-2'}>
                                  {record.type.replace('-', ' ').toUpperCase()}
                                </Badge>
                              </div>
                              <p className="text-sm text-[#2563eb]">ID: {record.employeeId}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-6 text-sm text-[#2563eb]">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{record.timestamp}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{record.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Smartphone className="h-4 w-4" />
                              <span>{record.device}</span>
                            </div>
                          </div>
                        </div>
                        {record.notes && (
                          <div className="mt-3 pt-3 border-t border-[#2563eb]/10">
                            <p className="text-sm text-[#1e40af]">{record.notes}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </BigPopupWrapper>
  )
} 