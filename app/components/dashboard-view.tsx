"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Activity, AlertTriangle, Zap, Shield, MapPin } from "lucide-react"

interface KPIData {
  totalUnits: number
  energySavings: number
  activeAlerts: number
  systemHealth: number
}

interface SystemEvent {
  id: string
  deviceId: string
  message: string
  type: "info" | "warning" | "alert"
  timestamp: Date
}

interface DeviceStatus {
  id: string
  location: string
  status: "online" | "offline" | "warning"
  x: number
  y: number
}

export function DashboardView() {
  const [kpiData, setKpiData] = useState<KPIData>({
    totalUnits: 16,
    energySavings: 29,
    activeAlerts: 2,
    systemHealth: 98,
  })

  const [events, setEvents] = useState<SystemEvent[]>([])
  const [devices, setDevices] = useState<DeviceStatus[]>([
    { id: "HVAC-01", location: "Conference Room A", status: "online", x: 20, y: 30 },
    { id: "HVAC-02", location: "Office Floor 1", status: "online", x: 60, y: 20 },
    { id: "HVAC-03", location: "Lobby", status: "warning", x: 40, y: 60 },
    { id: "HVAC-04", location: "Server Room", status: "online", x: 80, y: 40 },
    { id: "HVAC-05", location: "Break Room", status: "offline", x: 30, y: 80 },
    { id: "HVAC-06", location: "Office Floor 2", status: "online", x: 70, y: 70 },
  ])

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update KPI data
      setKpiData((prev) => ({
        totalUnits: prev.totalUnits + Math.floor(Math.random() * 3) - 1,
        energySavings: Math.max(0, Math.min(100, prev.energySavings + (Math.random() - 0.5) * 2)),
        activeAlerts: Math.max(0, prev.activeAlerts + Math.floor(Math.random() * 3) - 1),
        systemHealth: Math.max(85, Math.min(100, prev.systemHealth + (Math.random() - 0.5) * 2)),
      }))

      // Add random events
      if (Math.random() < 0.3) {
        const eventTypes = ["info", "warning", "alert"] as const
        const messages = [
          "High CO₂ detected",
          "Manual override activated",
          "Temperature setpoint adjusted",
          "Filter maintenance required",
          "Energy optimization applied",
          "Occupancy pattern detected",
          "System performance optimal",
        ]

        const newEvent: SystemEvent = {
          id: Date.now().toString(),
          deviceId: `HVAC-${String(Math.floor(Math.random() * 16) + 1).padStart(2, "0")}`,
          message: messages[Math.floor(Math.random() * messages.length)],
          type: eventTypes[Math.floor(Math.random() * eventTypes.length)],
          timestamp: new Date(),
        }

        setEvents((prev) => [newEvent, ...prev.slice(0, 19)])
      }

      // Update device statuses
      setDevices((prev) =>
        prev.map((device) => ({
          ...device,
          status: Math.random() < 0.05 ? (Math.random() < 0.5 ? "warning" : "offline") : "online",
        })),
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Total Active Units</CardTitle>
            <Activity className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{kpiData.totalUnits}</div>
            <p className="text-xs text-slate-400">HVAC units online</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Energy Savings</CardTitle>
            <Zap className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">{kpiData.energySavings.toFixed(1)}%</div>
            <p className="text-xs text-slate-400">vs baseline consumption</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-400">{kpiData.activeAlerts}</div>
            <p className="text-xs text-slate-400">requiring attention</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">System Health</CardTitle>
            <Shield className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">{kpiData.systemHealth.toFixed(0)}%</div>
            <p className="text-xs text-slate-400">overall performance</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Event Log */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Activity className="h-5 w-5 mr-2 text-blue-400" />
              Live Event Log
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-96">
              <div className="space-y-2">
                {events.map((event) => (
                  <div key={event.id} className="flex items-start space-x-3 p-3 rounded-lg bg-slate-700/50">
                    <Badge
                      variant={
                        event.type === "alert" ? "destructive" : event.type === "warning" ? "secondary" : "default"
                      }
                      className="mt-0.5"
                    >
                      {event.type}
                    </Badge>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white">
                        <span className="font-medium text-blue-400">{event.deviceId}:</span> {event.message}
                      </p>
                      <p className="text-xs text-slate-400">{event.timestamp.toLocaleTimeString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Device Status Map */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-green-400" />
              Device Status Map
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative bg-slate-700 rounded-lg h-96 overflow-hidden">
              {/* Floor plan background */}
              <div className="absolute inset-4 border-2 border-slate-600 rounded">
                <div className="absolute top-4 left-4 w-16 h-12 border border-slate-500 rounded text-xs text-slate-400 flex items-center justify-center">
                  Lobby
                </div>
                <div className="absolute top-4 right-4 w-20 h-16 border border-slate-500 rounded text-xs text-slate-400 flex items-center justify-center">
                  Conference
                </div>
                <div className="absolute bottom-4 left-4 w-24 h-20 border border-slate-500 rounded text-xs text-slate-400 flex items-center justify-center">
                  Office Floor 1
                </div>
                <div className="absolute bottom-4 right-4 w-20 h-16 border border-slate-500 rounded text-xs text-slate-400 flex items-center justify-center">
                  Server Room
                </div>
              </div>

              {/* Device status dots */}
              {devices.map((device) => (
                <div
                  key={device.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                  style={{ left: `${device.x}%`, top: `${device.y}%` }}
                >
                  <div
                    className={`w-4 h-4 rounded-full border-2 border-white ${
                      device.status === "online"
                        ? "bg-green-400"
                        : device.status === "warning"
                          ? "bg-yellow-400"
                          : "bg-red-400"
                    } animate-pulse`}
                  />
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {device.id} - {device.location}
                    <br />
                    Status: {device.status}
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-xs text-slate-400">Online</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <span className="text-xs text-slate-400">Warning</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <span className="text-xs text-slate-400">Offline</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
