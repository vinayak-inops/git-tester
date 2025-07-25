"use client";

import { useEffect } from "react"
import { ChevronRight, UserPlus, UserMinus, Cake, Glasses } from "lucide-react"
import { CheckCircle, XCircle, Clock, ArrowUpIcon as ClockArrowUp, } from "lucide-react"
import { MoreHorizontal, Settings, ArrowUpRight, DollarSign, RefreshCw, Edit } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@repo/ui/components/ui/card"
import { Button } from "@repo/ui/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@repo/ui/components/ui/dropdown-menu"
import { AreaChart1 } from "../components/area-chart"
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/ui/avatar"
import { Badge } from "@repo/ui/components/ui/badge"
import OrderGraph from "../components/order-graph"
import Timeline from "../components/timeline"
import dynamic from "next/dynamic"
import DashboardInterface from "../components/dashboard-interface";
// import { useRequest } from "@repo/ui/hooks/api/useGetRequest";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@repo/ui/components/ui/select"
import React, { useState } from "react"
import { Bar, BarChart, XAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import HeadcountCard from "../components/HeadcountCard";
import GoalCard from "../components/GoalCard";
import { getCurrentDate } from "../lib/date-utils";
import OrdersDashboard from "../components/orders-dashboard";
import EmployeeAttendanceCalendar from "../components/employee-attendance-calendar";
import AnalyticsDashboard from "../components/analytics-dashboard";
import ShiftChangeForgotPunch from "../components/shiftchangeforgotpunch";
import { ChatDashboard } from "../components/chat-dashboard";
import LiveDataGraph from "../components/livedatagraph";
import PresentAbsent from "../components/presentabsent";
import LocationWiseGraph from "../components/locationwisegraph";
import NotificationDropdown from "../components/notification-dropdown";


const MyComponent = dynamic(() => import('../components/livedatagraph'), { ssr: false })

export default function DashboardPage() {
  const [value, setValue] = useState("")

  // const {
  //   data,
  //   error,
  //   loading,
  //   refetch
  //   } = useRequest<any[]>({
  //   url: "headcount",
  //   onSuccess: (data) => {
  //   console.log(data);
  //   },
  //   onError: (error) => {
  //   console.error('Error loading organization data:', error);
  //   }
  //   });
  //   console.log("hello");


  return (

    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <main className="flex flex-1 flex-col gap-2 p-0 md:gap-4 md:p-4">

        <div>

          <header className="bg-white border-b border-gray-200">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
              <h1 className="text-xl font-semibold text-gray-800">Live Dashboard</h1>
              <div className="flex items-center space-x-4">
                <NotificationDropdown />
              </div>
            </div>
          </header>


          <p className="mt-2 text-gray-800 text-xl font-bold" >
            Organization Live Data
          </p>

          <PresentAbsent />
          <MyComponent />
        </div>


        <div>
          <p className="mt-2 text-gray-600 text-2xl font-bold" >
            Location Live Data
          </p>
          <LocationWiseGraph />
        </div>



        {/* <AnalyticsDashboard /> */}
        {/* <EmployeeAttendanceCalendar /> */}
        {/* <ShiftChangeForgotPunch /> */}
        {/* <ChatDashboard /> */}
        {/* <Timeline /> */}
        {/* <DashboardInterface /> */}



      </main>

    </div>
  )
}

interface ContactItemProps {
  name: string
  email: string
  image: string
  departments: {
    name: string
    color: string
  }[]
}

function ContactItem({ name, email, image, departments }: ContactItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={image || "/placeholder.svg"} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium leading-none">{name}</p>
          <p className="text-sm text-muted-foreground">{email}</p>
        </div>
      </div>
      <div className="flex gap-1">
        {departments.map((dept) => (
          <DepartmentBadge key={dept.name} name={dept.name} color={dept.color} />
        ))}
      </div>
    </div>
  )
}

interface DepartmentBadgeProps {
  name: string
  color: string
}

function DepartmentBadge({ name, color }: DepartmentBadgeProps) {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-600 hover:bg-blue-700",
    orange: "bg-orange-500 hover:bg-orange-600",
    teal: "bg-teal-500 hover:bg-teal-600",
    pink: "bg-pink-500 hover:bg-pink-600",
  }
  return <Badge className={`${colorMap[color]} text-white`}>{name}</Badge>
}


