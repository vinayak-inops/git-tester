import { Search, Plus, Filter, Download, Users, UserCheck, Clock, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Button } from "@repo/ui/components/ui/button"
import { Badge } from "@repo/ui/components/ui/badge"
import { Input } from "@repo/ui/components/ui/input"
import ValueFilterSection from "./value-filter-section"

const employees = [
  {
    id: "EMP-2022-1547",
    name: "John Michael Smith",
    title: "Senior Software Engineer",
    joinDate: "March 15, 2022",
    status: "Active",
    avatar: "JS",
  },
  {
    id: "EMP-2022-1823",
    name: "Sarah Johnson",
    title: "Product Manager",
    joinDate: "January 8, 2022",
    status: "Active",
    avatar: "SJ",
  },
  {
    id: "EMP-2023-0234",
    name: "David Chen",
    title: "UX Designer",
    joinDate: "June 12, 2023",
    status: "Active",
    avatar: "DC",
  },
  {
    id: "EMP-2021-0891",
    name: "Emily Rodriguez",
    title: "Marketing Specialist",
    joinDate: "September 3, 2021",
    status: "Active",
    avatar: "ER",
  },
  {
    id: "EMP-2023-0445",
    name: "Michael Thompson",
    title: "Data Analyst",
    joinDate: "April 20, 2023",
    status: "On Leave",
    avatar: "MT",
  },
  {
    id: "EMP-2022-1156",
    name: "Lisa Wang",
    title: "HR Manager",
    joinDate: "November 14, 2022",
    status: "Active",
    avatar: "LW",
  },
]

const stats = [
  { title: "Total Employees", value: "156", icon: Users, color: "blue" },
  { title: "Active Employees", value: "142", icon: UserCheck, color: "green" },
  { title: "On Leave", value: "8", icon: Clock, color: "yellow" },
  { title: "New Hires (30d)", value: "12", icon: TrendingUp, color: "purple" },
]

export default function Component() {
  return (
    <div className="px-7">

      <div className="  py-0">
        {/* Search and Filters */}
        <Card className="border-0 shadow-blue-50 mb-0">
          <div className=" py-6 px-6">
          <ValueFilterSection />
          </div>
          <CardContent>
            

            {/* Employee Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {employees.map((employee) => (
                <Card
                  key={employee.id}
                  className="border-0 bg-white shadow-md shadow-blue-50 hover:shadow-lg hover:shadow-blue-100 transition-all duration-300 cursor-pointer"
                >
                  <CardContent className="p-6">
                    {/* Employee Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {employee.avatar}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm">{employee.name}</h3>
                          <p className="text-blue-600 text-xs font-medium">{employee.title}</p>
                        </div>
                      </div>
                      <Badge
                        className={`text-xs ${
                          employee.status === "Active"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-yellow-50 text-yellow-700 border-yellow-200"
                        }`}
                      >
                        {employee.status}
                      </Badge>
                    </div>

                    {/* Employee Details */}
                    <div className="space-y-3 mb-4">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-500 font-medium">Employee ID</p>
                        <p className="text-sm font-semibold text-gray-900">{employee.id}</p>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                        Joined {employee.joinDate}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <Button size="sm" className="text-white flex-1 bg-blue-600 hover:bg-blue-700 text-xs h-8">
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-gray-200 text-gray-600 hover:bg-gray-50 text-xs h-8 bg-transparent"
                      >
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
