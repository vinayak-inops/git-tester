"use client";

import { useEffect } from "react"
import { CheckCircle, XCircle, Clock, ArrowUpIcon as ClockArrowUp, } from "lucide-react"
import { MoreHorizontal, Settings, ArrowUpRight, DollarSign, RefreshCw, Edit } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@repo/ui/components/ui/card"
import { Button } from "@repo/ui/components/ui/button"
import React, { useState } from "react"
import { Bar, BarChart, XAxis } from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"



// Move the chart data outside component
const chartData1 = [
    { m: 450, f: 300 },
    { m: 380, f: 420 },
    { m: 520, f: 120 },
]

const chartConfig1 = {
    m: {
        label: "Male",
        color: "rgb(59, 130, 246)",
    },
    f: {
        label: "Female",
        color: "rgb(191, 219, 254)",
    },
} satisfies ChartConfig


export default function PresentAbsent() {
    const [value, setValue] = useState("")
    const [stats, setStats] = useState({ total: 0, present: 0 })
    const [shiftCodes, setShiftCodes] = useState<string[]>([]);
   
    const token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJLbkw4Q0ZfZUJHSHR2cW1NaG92cFpCWkpLMlBRdlFWOGtSMWRrRU0yNU1nIn0.eyJleHAiOjE3NDk1NjcyMjUsImlhdCI6MTc0OTUzMTIyNSwianRpIjoib25ydHJvOjk3YmU2ZDg0LTdkYjMtNGM3Yy1hZmM0LTcxMjcyZDQ4OWYxNiIsImlzcyI6Imh0dHA6Ly8xMjIuMTY2LjI0NS45Nzo4MDgwL3JlYWxtcy9pbm9wcyIsImF1ZCI6WyJyZWFsbS1tYW5hZ2VtZW50IiwiYnJva2VyIiwiYWNjb3VudCJdLCJzdWIiOiI2MjkyNDkzZi05ZjU0LTQxOGMtYWJhNi1hMmQzMjk0ODE2OTciLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJzcHJpbmctYmFja2VuZCIsInNpZCI6ImNlYTU4MTE4LTNmNWMtNDMyYS04YTFkLWY2Y2I0MWZhMmE3YiIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1pbm9wcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsicmVhbG0tbWFuYWdlbWVudCI6eyJyb2xlcyI6WyJjcmVhdGUtY2xpZW50Il19LCJicm9rZXIiOnsicm9sZXMiOlsicmVhZC10b2tlbiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsInZpZXctYXBwbGljYXRpb25zIiwidmlldy1jb25zZW50Iiwidmlldy1ncm91cHMiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsImRlbGV0ZS1hY2NvdW50IiwibWFuYWdlLWNvbnNlbnQiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJQcmFqd2FsIE4iLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ0ZXN0dXNlciIsImdpdmVuX25hbWUiOiJQcmFqd2FsIiwiZmFtaWx5X25hbWUiOiJOIiwiZW1haWwiOiJwcmFqd2FsQGlub3BzLnRlY2gifQ.ZcGf_GuhYf48eR6qTNHoTD585fq610jN4d8jbYb-5xvn0LrQrhZfFkLav4pNjWVgCeWEaw0cXkije214ib7bOyOSxI273osv3Vz2I_407U0yXFMtqRKStgykF3j0gpEuO1b9iM4Pi2wt_nhErusdWEVw3zW7taG1X3_MPiimZVM14aBDCn_UAT5NgwtxLKXHJJZzv6o4XUY3LoT3uBHxDoPoToWot1W1vShP7CYj7X8YsxTtmNLm5jGYMOHv8ymtGKU99c2XSsyYAOJFry0__ul4EuM8IoaOtXrtzVM9ZoStXOpNGu5TFkcPhiHKNr2DS_LapBt60VyWRB2fnh-mng";
    useEffect(() => {
       // fetch("http://192.168.71.20:8000/api/query/attendance/headcount", {
             fetch("http://192.168.88.100:8000/api/query/attendance/headcount", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                credentials: "include",
            },
            mode: "cors",
        }) // calls Next.js API route or proxy
            .then(res => res.json())
            .then(data => setStats(data[0]))
            .catch(err => console.error("Fetch error:", err))
    }, [])

    useEffect(() => {
       // fetch("http://192.168.71.20:8000/api/query/attendance/shift", {
             fetch("http://192.168.88.100:8000/api/query/attendance/shift", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                credentials: "include",
            },
            mode: "cors",
        }) // replace with your real API
            .then(res => res.json())
            .then(data => {
                console.log("API data:", data);
                const labels = data.flatMap((item: any) =>
                    item.shift?.map((s: any) => s.shiftCode) || []
                );
                setShiftCodes(labels);
                console.log("Extracted shift codes:", labels);
            })
            .catch(err => console.error("Error fetching shift codes:", err));
    }, []);


    console.log(stats);
    console.log(shiftCodes);

    const chartData2 = shiftCodes.map((code, index) => ({
        label: code,//.replace(/^A0*/, 'A'), // Convert A001 → A1, A002 → A2, etc.
        ...chartData1[index]
      }));
      
      console.log(chartData2);
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

    const openPopup = (url: string) => {
        window.open(
            url,
            "popup",
            "width=800,height=600,scrollbars=yes,resizable=yes,toolbar=no,menubar=no,location=no,status=no",
        )
    }
    return (
        <div>
            <main>
                <div className="p-0 space-y-4 bg-gray-50">
                    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4 p-4">

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5" />
                                    Present
                                </CardTitle>
                                {/* <CardTitle className="text-base font-medium">Present</CardTitle> */}

                                <Button onClick={() => openPopup("https://www.google.com")} className="flex items-center gap-2 bg-blue-500">
                                    <ArrowUpRight className="w-4 h-4" />
                                </Button>

                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold"> {stats.present}/{stats.total}</div>
                                <div className="mt-2 mb-4">
                                    {/* <div className="inline-flex items-center rounded-md bg-emerald-500 px-2 py-1 text-xs font-medium text-white">
<span className="ml-1"> Total 2000</span>
</div> */}
                                </div>
                                <ChartContainer config={chartConfig1}>
                                    <BarChart accessibilityLayer data={chartData2}>
                                        <XAxis
                                            dataKey="label"
                                            tickLine={false}
                                            tickMargin={10}
                                            axisLine={false}
                                            tickFormatter={(value) => {
                                                return value;
                                            }} />
                                        <Bar
                                            dataKey="m"
                                            stackId="a"
                                            fill="var(--color-m)"
                                            radius={[0, 0, 4, 4]}
                                             />
                                        <Bar
                                            dataKey="f"
                                            stackId="a"
                                            fill="var(--color-f)"
                                            radius={[4, 4, 0, 0]} 
                                            />
                                        <ChartTooltip
                                            content={<ChartTooltipContent
                                                hideLabel
                                                className="w-[180px]"
                                                formatter={(value, name, item, index) => (
                                                    <>
                                                        <div
                                                            className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-[--color-bg]"
                                                            style={{
                                                                "--color-bg": `var(--color-${name})`,
                                                            } as React.CSSProperties} />

                                                        {chartConfig1[name as keyof typeof chartConfig1]?.label ||
                                                            name}
                                                        <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                                                            {value}

                                                        </div>
                                                        {/* Add this after the last item */}
                                                        {index === 1 && (
                                                            <div className="mt-1.5 flex basis-full items-center border-t pt-1.5 text-xs font-medium text-foreground">
                                                                Total :
                                                                <span className="font-normal text-muted-foreground">
                                                                    {item.payload.label}
                                                                </span>
                                                                <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">

                                                                    {item.payload.m + item.payload.f}

                                                                </div>
                                                            </div>
                                                        )}
                                                    </>
                                                )} />}
                                            cursor={false}
                                            defaultIndex={1} />
                                    </BarChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium flex items-center gap-2">
                                    <XCircle className="w-5 h-5" />
                                    Absent
                                </CardTitle>
                                {/* <CardTitle className="text-base font-medium">Present</CardTitle> */}
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <ArrowUpRight className="h-4 w-4" />
                                    <span className="sr-only">More options</span>
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">1440/2000</div>
                                <div className="mt-2 mb-4">
                                    {/* <div className="inline-flex items-center rounded-md bg-emerald-500 px-2 py-1 text-xs font-medium text-white">
<span className="ml-1"> Total 2000</span>
</div> */}
                                </div>
                                <ChartContainer config={chartConfig1}>
                                    <BarChart accessibilityLayer data={chartData1}>
                                        <XAxis
                                            dataKey="label"
                                            tickLine={false}
                                            tickMargin={10}
                                            axisLine={false}
                                            tickFormatter={(value) => {
                                                return value;
                                            }} />
                                        <Bar
                                            dataKey="m"
                                            stackId="a"
                                            fill="var(--color-m)"
                                            radius={[0, 0, 4, 4]} />
                                        <Bar
                                            dataKey="f"
                                            stackId="a"
                                            fill="var(--color-f)"
                                            radius={[4, 4, 0, 0]} />
                                        <ChartTooltip
                                            content={<ChartTooltipContent
                                                hideLabel
                                                className="w-[180px]"
                                                formatter={(value, name, item, index) => (
                                                    <>
                                                        <div
                                                            className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-[--color-bg]"
                                                            style={{
                                                                "--color-bg": `var(--color-${name})`,
                                                            } as React.CSSProperties} />
                                                        {chartConfig1[name as keyof typeof chartConfig1]?.label ||
                                                            name}
                                                        <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                                                            {value}
                                                            {/* <span className="font-normal text-muted-foreground">
                        {name}
                    </span> */}
                                                        </div>
                                                        {/* Add this after the last item */}
                                                        {index === 1 && (
                                                            <div className="mt-1.5 flex basis-full items-center border-t pt-1.5 text-xs font-medium text-foreground">
                                                                Total :
                                                                <span className="font-normal text-muted-foreground">
                                                                    {item.payload.label}
                                                                </span>
                                                                <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                                                                    {item.payload.m + item.payload.f}
                                                                    {/* <span className="font-normal text-muted-foreground">
                                {name}
                            </span> */}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </>
                                                )} />}
                                            cursor={false}
                                            defaultIndex={1} />
                                    </BarChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>


                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium flex items-center gap-2">
                                    <Clock className="w-5 h-5" />
                                    Late
                                </CardTitle>
                                {/* <CardTitle className="text-base font-medium">Present</CardTitle> */}
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <ArrowUpRight className="h-4 w-4" />
                                    <span className="sr-only">More options</span>
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">1440/2000</div>
                                <div className="mt-2 mb-4">
                                    {/* <div className="inline-flex items-center rounded-md bg-emerald-500 px-2 py-1 text-xs font-medium text-white">
<span className="ml-1"> Total 2000</span>
</div> */}
                                </div>
                                <ChartContainer config={chartConfig1}>
                                    <BarChart accessibilityLayer data={chartData1}>
                                        <XAxis
                                            dataKey="label"
                                            tickLine={false}
                                            tickMargin={10}
                                            axisLine={false}
                                            tickFormatter={(value) => {
                                                return value;
                                            }} />
                                        <Bar
                                            dataKey="m"
                                            stackId="a"
                                            fill="var(--color-m)"
                                            radius={[0, 0, 4, 4]} />
                                        <Bar
                                            dataKey="f"
                                            stackId="a"
                                            fill="var(--color-f)"
                                            radius={[4, 4, 0, 0]} />
                                        <ChartTooltip
                                            content={<ChartTooltipContent
                                                hideLabel
                                                className="w-[180px]"
                                                formatter={(value, name, item, index) => (
                                                    <>
                                                        <div
                                                            className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-[--color-bg]"
                                                            style={{
                                                                "--color-bg": `var(--color-${name})`,
                                                            } as React.CSSProperties} />
                                                        {chartConfig1[name as keyof typeof chartConfig1]?.label ||
                                                            name}
                                                        <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                                                            {value}
                                                            {/* <span className="font-normal text-muted-foreground">
                        {name}
                    </span> */}
                                                        </div>
                                                        {/* Add this after the last item */}
                                                        {index === 1 && (
                                                            <div className="mt-1.5 flex basis-full items-center border-t pt-1.5 text-xs font-medium text-foreground">
                                                                Total :
                                                                <span className="font-normal text-muted-foreground">
                                                                    {item.payload.label}
                                                                </span>
                                                                <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                                                                    {item.payload.m + item.payload.f}
                                                                    {/* <span className="font-normal text-muted-foreground">
                                {name}
                            </span> */}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </>
                                                )} />}
                                            cursor={false}
                                            defaultIndex={1} />
                                    </BarChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium flex items-center gap-2">
                                    <ClockArrowUp className="w-5 h-5" />
                                    Early
                                </CardTitle>
                                {/* <CardTitle className="text-base font-medium">Present</CardTitle> */}
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <ArrowUpRight className="h-4 w-4" />
                                    <span className="sr-only">More options</span>
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">1440/2000</div>
                                <div className="mt-2 mb-4">
                                    {/* <div className="inline-flex items-center rounded-md bg-emerald-500 px-2 py-1 text-xs font-medium text-white">
<span className="ml-1"> Total 2000</span>
</div> */}
                                </div>
                                <ChartContainer config={chartConfig1}>
                                    <BarChart accessibilityLayer data={chartData1}>
                                        <XAxis
                                            dataKey="label"
                                            tickLine={false}
                                            tickMargin={10}
                                            axisLine={false}
                                            tickFormatter={(value) => {
                                                return value;
                                            }} />
                                        <Bar
                                            dataKey="m"
                                            stackId="a"
                                            fill="var(--color-m)"
                                            radius={[0, 0, 4, 4]} />
                                        <Bar
                                            dataKey="f"
                                            stackId="a"
                                            fill="var(--color-f)"
                                            radius={[4, 4, 0, 0]} />
                                        <ChartTooltip
                                            content={<ChartTooltipContent
                                                hideLabel
                                                className="w-[180px]"
                                                formatter={(value, name, item, index) => (
                                                    <>
                                                        <div
                                                            className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-[--color-bg]"
                                                            style={{
                                                                "--color-bg": `var(--color-${name})`,
                                                            } as React.CSSProperties} />
                                                        {chartConfig1[name as keyof typeof chartConfig1]?.label ||
                                                            name}
                                                        <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                                                            {value}
                                                            {/* <span className="font-normal text-muted-foreground">
                        {name}
                    </span> */}
                                                        </div>
                                                        {/* Add this after the last item */}
                                                        {index === 1 && (
                                                            <div className="mt-1.5 flex basis-full items-center border-t pt-1.5 text-xs font-medium text-foreground">
                                                                Total :
                                                                <span className="font-normal text-muted-foreground">
                                                                    {item.payload.label}
                                                                </span>
                                                                <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                                                                    {item.payload.m + item.payload.f}
                                                                    {/* <span className="font-normal text-muted-foreground">
                                {name}
                            </span> */}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </>
                                                )} />}
                                            cursor={false}
                                            defaultIndex={1} />
                                    </BarChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>

                    </div>
                </div>

            </main>

        </div>
    )
}
