import Dashboard1 from "../components/dashboard1"
import SocialMediaDashboard from "../components/social-metrics-dashboard"
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Eye } from "lucide-react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Button } from "@repo/ui/components/ui/button"
import { Badge } from "@repo/ui/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/ui/components/ui/table"
import { Spacer } from "../components/ui/spacer"
import { Suspense } from "react"
import DashboardAnalytics from "../components/dashboard-analytics"
import LivePerformanceDashboard from "../components/live-performance-dashboard"
import MySwiper from "../components/MySwiper"
import EmployeeAttendanceCalendar from "../components/employee-attendance-calendar"
import NotificationDropdown from "../components/notification-dropdown";
import AnalyticsDashboard from "../components/analytics-dashboard"

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <main className="flex flex-1 flex-col gap-2 p-0 md:gap-4 md:p-4">

        {/* // <main className="flex min-h-screen flex-col items-center justify-between p-8 bg-gray-50"> */}


        <header className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-800">Historic Dashboard</h1>
            <div className="flex items-center space-x-4">
              {/* <NotificationDropdown /> */}
            </div>
          </div>
        </header>


        <Dashboard1 />

        <AnalyticsDashboard />

        <EmployeeAttendanceCalendar />

        {/* <SocialMediaDashboard />

        <LivePerformanceDashboard /> */}

        {/* <Spacer size="lg" /> */}

        {/* <DashboardAnalytics />

        <MySwiper /> */}

      </main>
    </div>
  )
}



