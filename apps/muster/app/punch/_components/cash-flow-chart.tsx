"use client";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from "recharts";

// Daily data with time slots
const dailyData = [
  { time: "09:00", punchIn: 12, punchOut: -10 },
  { time: "10:00", punchIn: 15, punchOut: -13 },
  { time: "11:00", punchIn: 18, punchOut: -15 },
  { time: "12:00", punchIn: 14, punchOut: -12 },
  { time: "13:00", punchIn: 20, punchOut: -17 },
  { time: "14:00", punchIn: 8, punchOut: -6 },
  { time: "15:00", punchIn: 6, punchOut: -5 },
  { time: "16:00", punchIn: 10, punchOut: -8 },
  { time: "17:00", punchIn: 12, punchOut: -9 },
  { time: "18:00", punchIn: 5, punchOut: -4 },
];

function countFormatter(value: number) {
  return `${Math.abs(value)}`;
}

export default function CashFlowChart() {
  const chartData = dailyData;
  
  // Get today's date
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className=" border bg-white border-gray-200 shadow-xl rounded-xl  p-4">
      {/* Header with buttons on the right */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-4">
          <span className="text-xl font-semibold text-gray-900">Punch In & Punch Out</span>
          <Legend
            wrapperStyle={{ paddingLeft: 0 }}
            iconType="rect"
            formatter={(value) =>
              <span className={value === "punchIn" ? "text-[#0092fb] font-medium" : "text-[#cde9ff] font-medium"}>
                {value === "punchIn" ? "Punch In" : "Punch Out"}
              </span>
            }
          />
        </div>
        {/* Buttons aligned right */}
        <div className="flex gap-2">
          {/* Date Display */}
          <div className="px-4 py-1.5 rounded-md border border-gray-200 bg-white text-gray-800 font-medium shadow-sm">
            {today}
          </div>
          {/* Manage Button */}
          <button className="px-4 py-1.5 rounded-md border border-gray-200 bg-white text-gray-800 font-medium shadow-sm hover:bg-gray-50 transition flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Manage
          </button>
        </div>
      </div>
      <div className="border-b border-gray-100 mb-2" />
      {/* Chart */}
      <div className="flex flex-row gap-6">
        {/* Chart Area */}
        <div className="flex-1 min-w-0">
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 20, left: 0, bottom: 48 }}
                barCategoryGap={16}
                barGap={-32}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="time"
                  tick={{ fontSize: 13 }}
                  angle={-35}
                  dy={16}
                  interval={0}
                  label={{ value: "Time", position: "insideBottom", offset: -30 }}
                />
                <YAxis 
                  tickFormatter={countFormatter} 
                  tick={{ fontSize: 14 }} 
                  domain={[-80, 80]}
                  label={{ value: "Count", angle: -90, position: "insideLeft", offset: 10 }}
                />
                <Tooltip 
                  formatter={(value: number, name: string) => [`${Math.abs(value)}`, name === 'punchIn' ? 'Punch In' : 'Punch Out']} 
                  labelFormatter={(label) => `${label}`}
                />
                <ReferenceLine y={0} stroke="#222" strokeWidth={1} />
                <Bar dataKey="punchIn" fill="#0092fb" radius={[6, 6, 0, 0]} barSize={32} name="Punch In" />
                <Bar dataKey="punchOut" fill="#cde9ff" radius={[6, 6, 0, 0]} barSize={32} name="Punch Out" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Right Side: Buttons + Stat Cards */}
        <div className="flex flex-col items-end min-w-[260px] w-[300px]">
          {/* Punch In Card */}
          <div className="bg-white border-l h-full p-6 w-full max-w-sm flex flex-col gap-4">
            <div className="flex items-center w-full max-w-md">
              {/* Icon */}
              <div className="rounded-xl w-14 h-14 flex items-center justify-center mr-4" style={{background: "#0092fb"}}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M8 12l4 4 4-4" />
                </svg>
              </div>
              {/* Label and Value */}
              <div className="flex flex-col flex-1 justify-center">
                <span className="text-gray-500 font-medium">Punch In</span>
                <span className="text-xl font-bold text-gray-900">
                  {chartData.reduce((sum, item) => sum + item.punchIn, 0)}
                </span>
              </div>
              {/* Percentage */}
              <span className="px-3 py-1 rounded-full text-sm font-semibold ml-4 bg-green-100 text-green-600">
                {Math.round((chartData.reduce((sum, item) => sum + item.punchIn, 0) / (chartData.length * 50)) * 100)}%
              </span>
            </div>
            <div className="border-t border-gray-100 my-2" />
            {/* Punch Out Card */}
            <div className="flex items-center w-full max-w-md">
              {/* Icon */}
              <div className="rounded-xl w-14 h-14 flex items-center justify-center mr-4" style={{background: "#cde9ff"}}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M16 12l-4-4-4 4" />
                </svg>
              </div>
              {/* Label and Value */}
              <div className="flex flex-col flex-1 justify-center">
                <span className="text-gray-500 font-medium">Punch Out</span>
                <span className="text-xl font-bold text-gray-900">
                  {Math.abs(chartData.reduce((sum, item) => sum + item.punchOut, 0))}
                </span>
              </div>
              {/* Percentage */}
              <span className="px-3 py-1 rounded-full text-sm font-semibold ml-4 bg-blue-100 text-blue-600">
                {Math.round((Math.abs(chartData.reduce((sum, item) => sum + item.punchOut, 0)) / (chartData.length * 40)) * 100)}%
              </span>
            </div>
            <div className="border-t border-gray-100 my-2" />
            {/* Net Card */}
            <div className="flex items-center w-full max-w-md">
              {/* Icon */}
              <div className="rounded-xl w-14 h-14 flex items-center justify-center mr-4" style={{background: "#7daae8"}}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              {/* Label and Value */}
              <div className="flex flex-col flex-1 justify-center">
                <span className="text-gray-500 font-medium">Net</span>
                <span className="text-xl font-bold text-gray-900">
                  {chartData.reduce((sum, item) => sum + item.punchIn + item.punchOut, 0)}
                </span>
              </div>
              {/* Percentage */}
              <span className="px-3 py-1 rounded-full text-sm font-semibold ml-4 bg-purple-100 text-purple-600">
                Net
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 