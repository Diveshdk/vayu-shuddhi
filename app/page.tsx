"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./components/app-sidebar"
import { DashboardView } from "./components/dashboard-view"
import { DeviceManagementView } from "./components/device-management-view"
import { DataLogsView } from "./components/data-logs-view"
import { AISettingsView } from "./components/ai-settings-view"
import {
  Thermometer,
  Droplets,
  Users,
  Leaf,
  Snowflake,
  Zap,
  Fan,
  Brain,
  Activity,
  Settings,
  TrendingUp,
  Clock,
  Power,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts"

// Real HVAC occupancy detection data patterns based on the Kaggle dataset
const occupancyData = [
  { time: "00:00", temperature: 21.0, humidity: 27.2, light: 0, co2: 426, occupancy: 0, predicted: 0.05 },
  { time: "02:00", temperature: 21.0, humidity: 27.2, light: 0, co2: 429, occupancy: 0, predicted: 0.08 },
  { time: "06:00", temperature: 21.5, humidity: 27.5, light: 0, co2: 435, occupancy: 0, predicted: 0.12 },
  { time: "08:00", temperature: 23.7, humidity: 26.9, light: 585, co2: 749, occupancy: 1, predicted: 0.89 },
  { time: "10:00", temperature: 24.1, humidity: 26.2, light: 578, co2: 864, occupancy: 1, predicted: 0.94 },
  { time: "12:00", temperature: 24.3, humidity: 25.8, light: 572, co2: 1073, occupancy: 1, predicted: 0.97 },
  { time: "14:00", temperature: 24.5, humidity: 25.6, light: 563, co2: 1182, occupancy: 1, predicted: 0.98 },
  { time: "16:00", temperature: 24.2, humidity: 26.1, light: 547, co2: 1009, occupancy: 1, predicted: 0.95 },
  { time: "18:00", temperature: 23.8, humidity: 26.8, light: 381, co2: 632, occupancy: 0, predicted: 0.23 },
  { time: "20:00", temperature: 22.5, humidity: 27.1, light: 0, co2: 483, occupancy: 0, predicted: 0.11 },
  { time: "22:00", temperature: 21.8, humidity: 27.3, light: 0, co2: 451, occupancy: 0, predicted: 0.07 },
  { time: "24:00", temperature: 21.2, humidity: 27.4, light: 0, co2: 433, occupancy: 0, predicted: 0.04 },
]

const energyData = [
  { hour: "00", consumption: 2.1, baseline: 3.2 },
  { hour: "06", consumption: 2.3, baseline: 3.4 },
  { hour: "08", consumption: 4.8, baseline: 6.1 },
  { hour: "12", consumption: 5.2, baseline: 6.8 },
  { hour: "16", consumption: 4.9, baseline: 6.5 },
  { hour: "18", consumption: 3.1, baseline: 4.2 },
  { hour: "22", consumption: 2.4, baseline: 3.5 },
]

const mlMetrics = [
  { name: "Accuracy", value: 97.8, color: "#10b981" },
  { name: "Precision", value: 96.2, color: "#3b82f6" },
  { name: "Recall", value: 98.1, color: "#f59e0b" },
  { name: "F1-Score", value: 97.1, color: "#ef4444" },
]

export type ViewType = "dashboard" | "devices" | "data" | "ai-settings"

export default function AdminDashboard() {
  const [currentView, setCurrentView] = useState<ViewType>("dashboard")
  const [isAutoMode, setIsAutoMode] = useState(true)
  const [tempSetpoint, setTempSetpoint] = useState([22.5])
  const [fanSpeed, setFanSpeed] = useState([75])
  const [systemStatus, setSystemStatus] = useState("optimal")
  const [currentTime, setCurrentTime] = useState(new Date())
  const [occupancyPrediction, setOccupancyPrediction] = useState(0.94)
  const [energySavings, setEnergySavings] = useState(32.4)

  // Current sensor readings (simulated real-time data)
  const currentReadings = {
    temperature: 24.3,
    humidity: 25.8,
    co2: 1073,
    light: 572,
    occupancy: 1,
    prediction: 0.97,
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const renderCurrentView = () => {
    switch (currentView) {
      case "dashboard":
        return (
          <div className="max-w-7xl mx-auto p-6 space-y-6">
            {/* System Status Bar */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">System Status</p>
                      <p className="text-lg font-semibold text-green-400">Optimal</p>
                    </div>
                    <Power className="h-8 w-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Energy Efficiency</p>
                      <p className="text-lg font-semibold text-blue-400">{energySavings.toFixed(1)}%</p>
                    </div>
                    <Zap className="h-8 w-8 text-yellow-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">ML Accuracy</p>
                      <p className="text-lg font-semibold text-purple-400">97.8%</p>
                    </div>
                    <Brain className="h-8 w-8 text-purple-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Occupancy Confidence</p>
                      <p className="text-lg font-semibold text-cyan-400">{(occupancyPrediction * 100).toFixed(1)}%</p>
                    </div>
                    <Activity className="h-8 w-8 text-cyan-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="bg-slate-800/50 border-slate-700">
                <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="control" className="data-[state=active]:bg-blue-600">
                  System Control
                </TabsTrigger>
                <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-600">
                  ML Analytics
                </TabsTrigger>
                <TabsTrigger value="energy" className="data-[state=active]:bg-blue-600">
                  Energy Management
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Environmental Sensors */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="bg-gradient-to-br from-red-900/20 to-red-800/20 border-red-700/50 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-red-300 flex items-center">
                        <Thermometer className="h-4 w-4 mr-2" />
                        Temperature
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-red-400">{currentReadings.temperature}°C</div>
                      <div className="mt-2 flex items-center text-sm text-red-300">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +0.2°C from target
                      </div>
                      <Progress value={((currentReadings.temperature - 20) / 10) * 100} className="mt-3 h-2" />
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 border-blue-700/50 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-blue-300 flex items-center">
                        <Droplets className="h-4 w-4 mr-2" />
                        Humidity
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-blue-400">{currentReadings.humidity}%</div>
                      <div className="mt-2 flex items-center text-sm text-blue-300">
                        <Activity className="h-3 w-3 mr-1" />
                        Optimal range
                      </div>
                      <Progress value={currentReadings.humidity} className="mt-3 h-2" />
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-green-900/20 to-green-800/20 border-green-700/50 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-green-300 flex items-center">
                        <Leaf className="h-4 w-4 mr-2" />
                        CO₂ Level
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-green-400">{currentReadings.co2}</div>
                      <div className="text-sm text-green-300">ppm</div>
                      <Badge className="mt-2 bg-green-800/50 text-green-300 border-green-600">
                        {currentReadings.co2 < 800 ? "Good" : currentReadings.co2 < 1200 ? "Moderate" : "High"}
                      </Badge>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-900/20 to-purple-800/20 border-purple-700/50 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-purple-300 flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        Occupancy
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-purple-400">
                        {currentReadings.occupancy ? "Occupied" : "Empty"}
                      </div>
                      <div className="mt-2 text-sm text-purple-300">
                        Confidence: {(currentReadings.prediction * 100).toFixed(1)}%
                      </div>
                      <div className="mt-3 flex space-x-1">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className={`w-3 h-3 rounded-full ${
                              i <= currentReadings.occupancy ? "bg-purple-400" : "bg-slate-600"
                            }`}
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Real-time Environmental Trends */}
                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-white flex items-center">
                      <Activity className="h-5 w-5 mr-2 text-blue-400" />
                      Environmental Trends & Occupancy Detection (24 Hours)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={occupancyData}>
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
                            dot={{ fill: "#ef4444", strokeWidth: 2, r: 3 }}
                          />
                          <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="humidity"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            name="Humidity (%)"
                            dot={{ fill: "#3b82f6", strokeWidth: 2, r: 3 }}
                          />
                          <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="co2"
                            stroke="#10b981"
                            strokeWidth={2}
                            name="CO₂ (ppm)"
                            dot={{ fill: "#10b981", strokeWidth: 2, r: 3 }}
                          />
                          <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="predicted"
                            stroke="#a855f7"
                            strokeWidth={3}
                            strokeDasharray="5 5"
                            name="ML Occupancy Prediction"
                            dot={{ fill: "#a855f7", strokeWidth: 2, r: 4 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="control" className="space-y-6">
                {/* System Control Panel */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold text-white flex items-center">
                        <Settings className="h-5 w-5 mr-2 text-blue-400" />
                        System Control
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Mode Toggle */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-slate-300">Operation Mode</span>
                          <div className="flex items-center space-x-3">
                            <span
                              className={`text-sm ${isAutoMode ? "text-blue-400 font-semibold" : "text-slate-500"}`}
                            >
                              AI Auto
                            </span>
                            <Switch
                              checked={!isAutoMode}
                              onCheckedChange={(checked) => setIsAutoMode(!checked)}
                              className="data-[state=checked]:bg-blue-600"
                            />
                            <span
                              className={`text-sm ${!isAutoMode ? "text-blue-400 font-semibold" : "text-slate-500"}`}
                            >
                              Manual
                            </span>
                          </div>
                        </div>

                        {isAutoMode && (
                          <div className="p-4 bg-blue-900/20 border border-blue-700/50 rounded-lg">
                            <div className="flex items-center space-x-2 mb-2">
                              <Brain className="h-4 w-4 text-blue-400" />
                              <span className="text-sm font-medium text-blue-300">AI Optimization Active</span>
                            </div>
                            <p className="text-xs text-blue-200">
                              System is automatically adjusting based on occupancy prediction and environmental
                              conditions.
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Manual Controls */}
                      <div className={`space-y-6 transition-opacity ${isAutoMode ? "opacity-50" : "opacity-100"}`}>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-slate-300">Temperature Setpoint</label>
                            <span className="text-lg font-bold text-white">{tempSetpoint[0]}°C</span>
                          </div>
                          <Slider
                            value={tempSetpoint}
                            onValueChange={setTempSetpoint}
                            max={30}
                            min={16}
                            step={0.5}
                            disabled={isAutoMode}
                            className="w-full"
                          />
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-slate-300">Fan Speed</label>
                            <span className="text-lg font-bold text-white">{fanSpeed[0]}%</span>
                          </div>
                          <Slider
                            value={fanSpeed}
                            onValueChange={setFanSpeed}
                            max={100}
                            min={0}
                            step={5}
                            disabled={isAutoMode}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold text-white flex items-center">
                        <Fan className="h-5 w-5 mr-2 text-cyan-400" />
                        System Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Snowflake className="h-4 w-4 text-cyan-400" />
                            <span className="text-sm text-slate-300">AC Status</span>
                          </div>
                          <Badge className="bg-cyan-800/50 text-cyan-300 border-cyan-600">Cooling</Badge>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-green-400" />
                            <span className="text-sm text-slate-300">Runtime</span>
                          </div>
                          <span className="text-lg font-bold text-green-400">4h 23m</span>
                        </div>
                      </div>

                      {/* Fan Speed Gauge */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-slate-300">Current Fan Speed</span>
                          <span className="text-lg font-bold text-cyan-400">{fanSpeed[0]}%</span>
                        </div>
                        <div className="relative">
                          <Progress value={fanSpeed[0]} className="h-4" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Fan
                              className="h-3 w-3 text-white animate-spin"
                              style={{ animationDuration: `${2000 / fanSpeed[0]}ms` }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                        >
                          Schedule
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                        >
                          Diagnostics
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                {/* ML Performance Metrics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold text-white flex items-center">
                        <Brain className="h-5 w-5 mr-2 text-purple-400" />
                        ML Model Performance
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mlMetrics.map((metric) => (
                          <div key={metric.name} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-slate-300">{metric.name}</span>
                              <span className="text-lg font-bold" style={{ color: metric.color }}>
                                {metric.value}%
                              </span>
                            </div>
                            <Progress value={metric.value} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold text-white flex items-center">
                        <Activity className="h-5 w-5 mr-2 text-green-400" />
                        Occupancy Prediction Accuracy
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={occupancyData.slice(-12)}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} />
                            <YAxis stroke="#9ca3af" fontSize={12} />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "#1f2937",
                                border: "1px solid #374151",
                                borderRadius: "8px",
                                color: "#f9fafb",
                              }}
                            />
                            <Area
                              type="monotone"
                              dataKey="predicted"
                              stroke="#a855f7"
                              fill="#a855f7"
                              fillOpacity={0.3}
                              name="Prediction Confidence"
                            />
                            <Area
                              type="monotone"
                              dataKey="occupancy"
                              stroke="#10b981"
                              fill="#10b981"
                              fillOpacity={0.6}
                              name="Actual Occupancy"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Feature Importance */}
                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-white">
                      Sensor Feature Importance for Occupancy Detection
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { feature: "Light", importance: 0.45, color: "#f59e0b" },
                            { feature: "CO₂", importance: 0.32, color: "#10b981" },
                            { feature: "Temperature", importance: 0.15, color: "#ef4444" },
                            { feature: "Humidity", importance: 0.08, color: "#3b82f6" },
                          ]}
                          layout="horizontal"
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis type="number" stroke="#9ca3af" fontSize={12} />
                          <YAxis dataKey="feature" type="category" stroke="#9ca3af" fontSize={12} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#1f2937",
                              border: "1px solid #374151",
                              borderRadius: "8px",
                              color: "#f9fafb",
                            }}
                          />
                          <Bar dataKey="importance" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="energy" className="space-y-6">
                {/* Energy Consumption */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold text-white flex items-center">
                        <Zap className="h-5 w-5 mr-2 text-yellow-400" />
                        Energy Consumption vs Baseline
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={energyData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis dataKey="hour" stroke="#9ca3af" fontSize={12} />
                            <YAxis stroke="#9ca3af" fontSize={12} />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "#1f2937",
                                border: "1px solid #374151",
                                borderRadius: "8px",
                                color: "#f9fafb",
                              }}
                            />
                            <Legend />
                            <Bar dataKey="consumption" fill="#10b981" name="AI Optimized" />
                            <Bar dataKey="baseline" fill="#ef4444" name="Baseline" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold text-white">Energy Savings Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-green-400">{energySavings.toFixed(1)}%</div>
                        <p className="text-sm text-slate-400">Total Energy Saved This Month</p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-300">Cost Savings</span>
                          <span className="text-lg font-bold text-green-400">$247.80</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-300">CO₂ Reduced</span>
                          <span className="text-lg font-bold text-green-400">156 kg</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-300">kWh Saved</span>
                          <span className="text-lg font-bold text-green-400">1,247</span>
                        </div>
                      </div>

                      <div className="p-4 bg-green-900/20 border border-green-700/50 rounded-lg">
                        <p className="text-xs text-green-200">
                          AI-driven occupancy detection has optimized HVAC operation, reducing unnecessary cooling
                          during unoccupied periods while maintaining comfort when people are present.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )
      case "devices":
        return <DeviceManagementView />
      case "data":
        return <DataLogsView />
      case "ai-settings":
        return <AISettingsView />
      default:
        return <DashboardView />
    }
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <SidebarProvider>
        <AppSidebar currentView={currentView} onViewChange={setCurrentView} />
        <main className="flex-1 bg-slate-900">
          <div className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm p-4">
            <div className="flex items-center space-x-4">
              <SidebarTrigger className="text-white hover:bg-slate-700" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  VayuShuddhi Admin
                </h1>
                <p className="text-sm text-slate-400">Smart HVAC Management System</p>
              </div>
            </div>
          </div>
          <div className="p-6">{renderCurrentView()}</div>
        </main>
      </SidebarProvider>
    </div>
  )
}
