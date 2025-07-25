import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Input } from "@repo/ui/components/ui/input"
import { Label } from "@repo/ui/components/ui/label"
import { Checkbox } from "@repo/ui/components/ui/checkbox"
import { Switch } from "@repo/ui/components/ui/switch"
import { Button } from "@repo/ui/components/ui/button"
import { Badge } from "@repo/ui/components/ui/badge"
import { Separator } from "@repo/ui/components/ui/separator"
import {
  Building2,
  Users,
  Calendar,
  Settings,
  Clock,
  Calculator,
  CheckCircle,
  Sliders,
  Sparkles,
  Shield,
  Zap,
} from "lucide-react"

export default function PremiumBeautifiedForm() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12">
        <div className="w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl" />
      </div>
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12">
        <div className="w-96 h-96 bg-gradient-to-tr from-emerald-400/20 to-blue-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Enhanced Header */}
          <div className="text-center space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-200/50 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Configuration Panel</span>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent">
              Compensation Policy Settings
            </h1>
            <p className="text-sm text-slate-600 max-w-2xl mx-auto">
              Configure your organization's compensation policies with advanced settings and automated workflows
            </p>
          </div>

          {/* Enhanced Basic Information Section */}
          <div className="grid xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2">
              <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 backdrop-blur-sm shadow-xl">
                <CardHeader className="pb-6 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 rounded-t-lg" />
                  <div className="relative flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                      <Building2 className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-semibold text-slate-900">Organization Details</CardTitle>
                      <CardDescription className="text-slate-600">
                        Configure your organizational hierarchy and structure
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label
                        htmlFor="org-code"
                        className="text-sm font-semibold text-slate-700 flex items-center gap-2"
                      >
                        Organization Code
                        <Badge variant="secondary" className="text-xs">
                          Required
                        </Badge>
                      </Label>
                      <Input
                        id="org-code"
                        placeholder="ORG001"
                        className="h-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white/80 backdrop-blur-sm transition-all duration-200"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="org-name" className="text-sm font-semibold text-slate-700">
                        Organization Name
                      </Label>
                      <Input
                        id="org-name"
                        placeholder="Headquarters Division"
                        className="h-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white/80 backdrop-blur-sm transition-all duration-200"
                      />
                    </div>
                  </div>

                  <Separator className="bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="sub-code" className="text-sm font-semibold text-slate-700">
                        Subsidiary Code
                      </Label>
                      <Input
                        id="sub-code"
                        placeholder="SUB001"
                        className="h-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white/80 backdrop-blur-sm transition-all duration-200"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="sub-name" className="text-sm font-semibold text-slate-700">
                        Subsidiary Name
                      </Label>
                      <Input
                        id="sub-name"
                        placeholder="Primary Subsidiary"
                        className="h-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white/80 backdrop-blur-sm transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="loc-code" className="text-sm font-semibold text-slate-700">
                        Location Code
                      </Label>
                      <Input
                        id="loc-code"
                        placeholder="LOC001"
                        className="h-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white/80 backdrop-blur-sm transition-all duration-200"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="loc-name" className="text-sm font-semibold text-slate-700">
                        Location Name
                      </Label>
                      <Input
                        id="loc-name"
                        placeholder="Main Campus - Building A"
                        className="h-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white/80 backdrop-blur-sm transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="dest-code" className="text-sm font-semibold text-slate-700">
                        Destination Code
                      </Label>
                      <Input
                        id="dest-code"
                        placeholder="DEST001"
                        className="h-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white/80 backdrop-blur-sm transition-all duration-200"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="dest-name" className="text-sm font-semibold text-slate-700">
                        Destination Name
                      </Label>
                      <Input
                        id="dest-name"
                        placeholder="Primary Destination"
                        className="h-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white/80 backdrop-blur-sm transition-all duration-200"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Employment Categories */}
            <div>
              <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white via-emerald-50/30 to-green-50/50 backdrop-blur-sm shadow-xl h-fit">
                <CardHeader className="pb-6 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/5 to-green-600/5 rounded-t-lg" />
                  <div className="relative flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl shadow-lg">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-semibold text-slate-900">Employee Categories</CardTitle>
                      <CardDescription className="text-slate-600">Select applicable categories</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "SEIU", type: "Union", color: "from-purple-500 to-purple-600" },
                      { name: "Category 1", type: "Executive", color: "from-blue-500 to-blue-600" },
                      { name: "Category 2", type: "Management", color: "from-indigo-500 to-indigo-600" },
                      { name: "Category 3", type: "Staff", color: "from-green-500 to-green-600" },
                      { name: "Category 4", type: "Support", color: "from-orange-500 to-orange-600" },
                    ].map((category) => (
                      <div
                        key={category.name}
                        className="group/item flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-white/80 to-slate-50/80 hover:from-white hover:to-slate-50 border border-slate-200/50 hover:border-slate-300/50 hover:shadow-md transition-all duration-300 cursor-pointer"
                      >
                        <Checkbox
                          id={category.name.toLowerCase().replace(" ", "-")}
                          className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-blue-600 border-2"
                        />
                        <div className="flex-1">
                          <Label
                            htmlFor={category.name.toLowerCase().replace(" ", "-")}
                            className="text-sm font-semibold text-slate-800 cursor-pointer group-hover/item:text-slate-900 transition-colors"
                          >
                            {category.name}
                          </Label>
                        </div>
                        <Badge
                          variant="outline"
                          className={`text-xs bg-gradient-to-r ${category.color} text-white border-0 shadow-sm`}
                        >
                          {category.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Enhanced Policy Configuration */}
          <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white via-purple-50/30 to-pink-50/50 backdrop-blur-sm shadow-xl">
            <CardHeader className="pb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5 rounded-t-lg" />
              <div className="relative flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    Compensation Policy Configuration
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    Define your compensation policy parameters and identifiers
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label htmlFor="policy-code" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    Policy Code
                    <Badge variant="secondary" className="text-xs">
                      Auto-generated
                    </Badge>
                  </Label>
                  <Input
                    id="policy-code"
                    placeholder="COMP-POL-001"
                    className="h-10 border-slate-200 focus:border-purple-500 focus:ring-purple-500/20 bg-white/80 backdrop-blur-sm transition-all duration-200"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="policy-title" className="text-sm font-semibold text-slate-700">
                    Policy Title
                  </Label>
                  <Input
                    id="policy-title"
                    placeholder="Standard Compensation Policy 2024"
                    className="h-10 border-slate-200 focus:border-purple-500 focus:ring-purple-500/20 bg-white/80 backdrop-blur-sm transition-all duration-200"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Settings Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Generation Settings */}
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white via-orange-50/30 to-amber-50/50 backdrop-blur-sm shadow-xl">
              <CardHeader className="pb-6 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600/5 to-amber-600/5 rounded-t-lg" />
                <div className="relative flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl shadow-lg">
                    <Settings className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-semibold text-slate-900">Generation Rules</CardTitle>
                    <CardDescription className="text-slate-600">
                      Configure when compensation can be generated
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  {
                    title: "Generate on Work Day",
                    description: "Allow compensation generation during regular work days",
                    icon: Calendar,
                    defaultChecked: true,
                  },
                  {
                    title: "Generate on Work Off",
                    description: "Enable compensation for work-off days",
                    icon: Clock,
                    defaultChecked: false,
                  },
                  {
                    title: "Generate on Holiday",
                    description: "Allow compensation generation on public holidays",
                    icon: Sparkles,
                    defaultChecked: true,
                  },
                ].map((setting, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-5 rounded-xl bg-gradient-to-r from-white/90 to-orange-50/50 border border-orange-200/50 hover:border-orange-300/50 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-gradient-to-br from-orange-100 to-amber-100 rounded-lg">
                        <setting.icon className="h-4 w-4 text-orange-600" />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-sm font-semibold text-slate-800">{setting.title}</Label>
                        <p className="text-xs text-slate-600">{setting.description}</p>
                      </div>
                    </div>
                    <Switch
                      defaultChecked={setting.defaultChecked}
                      className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-orange-500 data-[state=checked]:to-amber-500"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Compensation Settings */}
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white via-red-50/30 to-rose-50/50 backdrop-blur-sm shadow-xl">
              <CardHeader className="pb-6 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 to-rose-600/5 rounded-t-lg" />
                <div className="relative flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl shadow-lg">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-semibold text-slate-900">Compensation Rules</CardTitle>
                    <CardDescription className="text-slate-600">
                      Define compensation parameters and limits
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Label htmlFor="half-day" className="text-sm font-semibold text-slate-700">
                      Half Day Allowance
                    </Label>
                    <Input
                      id="half-day"
                      placeholder="4 hours minimum"
                      className="h-11 border-slate-200 focus:border-red-500 focus:ring-red-500/20 bg-white/80 backdrop-blur-sm transition-all duration-200"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="expire-year" className="text-sm font-semibold text-slate-700">
                      Expiry Period
                    </Label>
                    <Input
                      id="expire-year"
                      placeholder="12 months"
                      className="h-11 border-slate-200 focus:border-red-500 focus:ring-red-500/20 bg-white/80 backdrop-blur-sm transition-all duration-200"
                    />
                  </div>
                </div>

                <Separator className="bg-gradient-to-r from-transparent via-red-200 to-transparent" />

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Label htmlFor="monthly-limit" className="text-sm font-semibold text-slate-700">
                      Monthly Limit
                    </Label>
                    <Input
                      id="monthly-limit"
                      placeholder="10 days"
                      className="h-11 border-slate-200 focus:border-red-500 focus:ring-red-500/20 bg-white/80 backdrop-blur-sm transition-all duration-200"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="generation-limit" className="text-sm font-semibold text-slate-700">
                      Generation Limit
                    </Label>
                    <Input
                      id="generation-limit"
                      placeholder="Unlimited"
                      className="h-11 border-slate-200 focus:border-red-500 focus:ring-red-500/20 bg-white/80 backdrop-blur-sm transition-all duration-200"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Advanced Settings Grid */}
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Back Date Settings */}
            <Card className="group hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-white via-indigo-50/30 to-blue-50/50 backdrop-blur-sm shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg shadow-sm">
                    <Calendar className="h-4 w-4 text-white" />
                  </div>
                  <CardTitle className="text-sm font-semibold text-slate-900">Back Dating</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="back-date-comp" className="text-xs font-semibold text-slate-700">
                    Back Date Policy
                  </Label>
                  <Input
                    id="back-date-comp"
                    placeholder="Allow retroactive"
                    className="h-10 text-sm border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 bg-white/80"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-back-days" className="text-xs font-semibold text-slate-700">
                    Max Days Back
                  </Label>
                  <Input
                    id="max-back-days"
                    placeholder="30 days"
                    className="h-10 text-sm border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 bg-white/80"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Minutes Configuration */}
            <Card className="group hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-white via-teal-50/30 to-cyan-50/50 backdrop-blur-sm shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg shadow-sm">
                    <Clock className="h-4 w-4 text-white" />
                  </div>
                  <CardTitle className="text-sm font-semibold text-slate-900">Time Config</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="minutes-full" className="text-xs font-semibold text-slate-700">
                    Full Day (mins)
                  </Label>
                  <Input
                    id="minutes-full"
                    placeholder="480"
                    className="h-10 text-sm border-slate-200 focus:border-teal-500 focus:ring-teal-500/20 bg-white/80"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minutes-half" className="text-xs font-semibold text-slate-700">
                    Half Day (mins)
                  </Label>
                  <Input
                    id="minutes-half"
                    placeholder="240"
                    className="h-10 text-sm border-slate-200 focus:border-teal-500 focus:ring-teal-500/20 bg-white/80"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Multipliers */}
            <Card className="group hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-white via-amber-50/30 to-yellow-50/50 backdrop-blur-sm shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-lg shadow-sm">
                    <Calculator className="h-4 w-4 text-white" />
                  </div>
                  <CardTitle className="text-sm font-semibold text-slate-900">Multipliers</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="work-off-multiplier" className="text-xs font-semibold text-slate-700">
                    Work Off Rate
                  </Label>
                  <Input
                    id="work-off-multiplier"
                    placeholder="1.5x"
                    className="h-10 text-sm border-slate-200 focus:border-amber-500 focus:ring-amber-500/20 bg-white/80"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="holiday-multiplier" className="text-xs font-semibold text-slate-700">
                    Holiday Rate
                  </Label>
                  <Input
                    id="holiday-multiplier"
                    placeholder="2.0x"
                    className="h-10 text-sm border-slate-200 focus:border-amber-500 focus:ring-amber-500/20 bg-white/80"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Auto Approval */}
            <Card className="group hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-white via-emerald-50/30 to-green-50/50 backdrop-blur-sm shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg shadow-sm">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <CardTitle className="text-sm font-semibold text-slate-900">Auto Approval</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200">
                  <Label className="text-xs font-semibold text-emerald-900">Enable Auto</Label>
                  <Switch className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-emerald-500 data-[state=checked]:to-green-500" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="days-shift-auto" className="text-xs font-semibold text-slate-700">
                    Auto Days
                  </Label>
                  <Input
                    id="days-shift-auto"
                    placeholder="3 days"
                    className="h-10 text-sm border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 bg-white/80"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Other Settings */}
          <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white via-slate-50/30 to-gray-50/50 backdrop-blur-sm shadow-xl">
            <CardHeader className="pb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-600/5 to-gray-600/5 rounded-t-lg" />
              <div className="relative flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-slate-600 to-gray-700 rounded-xl shadow-lg">
                  <Sliders className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold text-slate-900">Additional Settings</CardTitle>
                  <CardDescription className="text-slate-600">
                    Configure additional policy parameters and restrictions
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between p-5 rounded-xl bg-gradient-to-r from-white/90 to-slate-50/50 border border-slate-200/50 hover:border-slate-300/50 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-gradient-to-br from-slate-100 to-gray-100 rounded-lg">
                      <Shield className="h-4 w-4 text-slate-600" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm font-semibold text-slate-800">Notice Period Policy</Label>
                      <p className="text-xs text-slate-600">Allow compensation during notice period</p>
                    </div>
                  </div>
                  <Switch className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-slate-500 data-[state=checked]:to-gray-600" />
                </div>

                <div className="flex items-center justify-between p-5 rounded-xl bg-gradient-to-r from-white/90 to-slate-50/50 border border-slate-200/50 hover:border-slate-300/50 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-gradient-to-br from-slate-100 to-gray-100 rounded-lg">
                      <Zap className="h-4 w-4 text-slate-600" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm font-semibold text-slate-800">Application Required</Label>
                      <p className="text-xs text-slate-600">Require formal application submission</p>
                    </div>
                  </div>
                  <Switch
                    defaultChecked
                    className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-slate-500 data-[state=checked]:to-gray-600"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Action Buttons */}
          <div className="flex justify-end gap-4 pt-8">
            <Button
              variant="outline"
              size="lg"
              className="px-8 h-12 border-2 border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all duration-200"
            >
              Cancel Changes
            </Button>
            <Button
              size="lg"
              className="px-8 h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-300 text-white font-semibold"
            >
              <CheckCircle className="h-5 w-5 mr-2" />
              Save Policy Configuration
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}