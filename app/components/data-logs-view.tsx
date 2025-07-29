"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Calendar, Filter, Download } from "lucide-react"
import type { SensorReading } from "../lib/supabase"

export function DataLogsView() {
  const [selectedDevice, setSelectedDevice] = useState("HVAC-01")
  const [dateRange, setDateRange] = useState("24h")
  const [chartData, setChartData] = useState<any[]>([])
  const [sensorReadings, setSensorReadings] = useState<SensorReading[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Generate mock historical data
  useEffect(() => {
    const generateHistoricalData = () => {
      const data = []
      const readings = []
      const now = new Date()
      const hoursBack = dateRange === "24h" ? 24 : dateRange === "7d" ? 168 : 720

      for (let i = hoursBack; i >= 0; i--) {
        const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000)
        const temp = 20 + Math.sin(i / 12) * 3 + Math.random() * 2
        const humidity = 50 + Math.cos(i / 8) * 15 + Math.random() * 5
        const co2 = 400 + Math.sin(i / 6) * 200 + Math.random() * 100

        data.push({
          time: timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          temperature: temp,
          humidity: humidity,
          co2: co2,
          timestamp: timestamp.toISOString(),
        })

        readings.push({
          id: `reading-${i}`,
          device_id: selectedDevice,
          temperature: temp,
          humidity: humidity,
          co2: co2,
          timestamp: timestamp.toISOString(),
        })
      }

      setChartData(data.reverse())
      setSensorReadings(readings.reverse())
    }

    generateHistoricalData()
  }, [selectedDevice, dateRange])

  // Real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const newReading = {
        id: `reading-${Date.now()}`,
        device_id: selectedDevice,
        temperature: 20 + Math.sin(Date.now() / 1000000) * 3 + Math.random() * 2,
        humidity: 50 + Math.cos(Date.now() / 800000) * 15 + Math.random() * 5,
        co2: 400 + Math.sin(Date.now() / 600000) * 200 + Math.random() * 100,
        timestamp: now.toISOString(),
      }

      setSensorReadings((prev) => [newReading, ...prev.slice(0, 99)])

      setChartData((prev) => [
        ...prev.slice(1),
        {
          time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          temperature: newReading.temperature,
          humidity: newReading.humidity,
          co2: newReading.co2,
          timestamp: newReading.timestamp,
        },
      ])
    }, 2000)

    return () => clearInterval(interval)
  }, [selectedDevice])

  const paginatedReadings = sensorReadings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const totalPages = Math.ceil(sensorReadings.length / itemsPerPage)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Data & Logs Analysis</h2>
        <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent">
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Filter className="h-5 w-5 mr-2 text-blue-400" />
            Data Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Device ID</label>
              <Select value={selectedDevice} onValueChange={setSelectedDevice}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  {Array.from({ length: 16 }, (_, i) => (
                    <SelectItem key={i} value={`HVAC-${String(i + 1).padStart(2, "0")}`}>
                      HVAC-{String(i + 1).padStart(2, "0")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Date Range</label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="24h">Last 24 Hours</SelectItem>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                  <SelectItem value="30d">Last 30 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Historical Chart */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-green-400" />
            Historical Environmental Data - {selectedDevice}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} />
                <YAxis yAxisId="left" stroke="#9ca3af" fontSize={12} />
                <YAxis yAxisId="right" orientation="right" stroke="#9ca3af" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#f9fafb",
                  }}
                />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="temperature"
                  stroke="#ef4444"
                  strokeWidth={2}
                  name="Temperature (°C)"
                  dot={false}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="humidity"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Humidity (%)"
                  dot={false}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="co2"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="CO₂ (ppm)"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Raw Data Table */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Raw Sensor Data</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700">
                <TableHead className="text-slate-300">Timestamp</TableHead>
                <TableHead className="text-slate-300">Device ID</TableHead>
                <TableHead className="text-slate-300">Temperature (°C)</TableHead>
                <TableHead className="text-slate-300">Humidity (%)</TableHead>
                <TableHead className="text-slate-300">CO₂ (ppm)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedReadings.map((reading) => (
                <TableRow key={reading.id} className="border-slate-700">
                  <TableCell className="text-slate-300 font-mono text-sm">
                    {new Date(reading.timestamp).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-blue-400 font-medium">{reading.device_id}</TableCell>
                  <TableCell className="text-slate-300">{reading.temperature.toFixed(2)}</TableCell>
                  <TableCell className="text-slate-300">{reading.humidity.toFixed(1)}</TableCell>
                  <TableCell className="text-slate-300">{reading.co2.toFixed(0)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-slate-400">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, sensorReadings.length)} of {sensorReadings.length} entries
            </p>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
