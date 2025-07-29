"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Settings, FileText, Thermometer, Fan } from "lucide-react"
import type { Device } from "../lib/supabase"

export function DeviceManagementView() {
  const [devices, setDevices] = useState<Device[]>([])
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null)
  const [tempSetpoint, setTempSetpoint] = useState([22])
  const [fanSpeed, setFanSpeed] = useState([70])

  // Initialize devices with mock data
  useEffect(() => {
    const mockDevices: Device[] = Array.from({ length: 16 }, (_, i) => ({
      id: `HVAC-${String(i + 1).padStart(2, "0")}`,
      location: [
        "Conference Room A",
        "Office Floor 1",
        "Lobby",
        "Server Room",
        "Break Room",
        "Office Floor 2",
        "Meeting Room B",
        "Reception",
        "Storage Room",
        "Kitchen",
        "Executive Office",
        "Open Workspace",
        "Training Room",
        "IT Department",
        "HR Department",
        "Finance Office",
      ][i],
      live_temp: 20 + Math.random() * 8,
      live_humidity: 40 + Math.random() * 30,
      live_co2: 400 + Math.random() * 800,
      occupancy: Math.random() > 0.6,
      ac_status: ["cooling", "heating", "off", "auto"][Math.floor(Math.random() * 4)] as any,
      fan_speed: Math.floor(Math.random() * 100),
      health: 85 + Math.random() * 15,
      last_updated: new Date().toISOString(),
    }))
    setDevices(mockDevices)
  }, [])

  // Real-time data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setDevices((prev) =>
        prev.map((device) => ({
          ...device,
          live_temp: Math.max(18, Math.min(30, device.live_temp + (Math.random() - 0.5) * 0.5)),
          live_humidity: Math.max(30, Math.min(80, device.live_humidity + (Math.random() - 0.5) * 2)),
          live_co2: Math.max(350, Math.min(1500, device.live_co2 + (Math.random() - 0.5) * 50)),
          occupancy: Math.random() > 0.7 ? !device.occupancy : device.occupancy,
          fan_speed: Math.max(0, Math.min(100, device.fan_speed + (Math.random() - 0.5) * 10)),
          health: Math.max(80, Math.min(100, device.health + (Math.random() - 0.5) * 2)),
          last_updated: new Date().toISOString(),
        })),
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleManualControl = (device: Device) => {
    setSelectedDevice(device)
    setTempSetpoint([device.live_temp])
    setFanSpeed([device.fan_speed])
  }

  const applyManualControl = () => {
    if (selectedDevice) {
      setDevices((prev) =>
        prev.map((device) =>
          device.id === selectedDevice.id
            ? { ...device, live_temp: tempSetpoint[0], fan_speed: fanSpeed[0], ac_status: "auto" as any }
            : device,
        ),
      )
      setSelectedDevice(null)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "cooling":
        return "bg-blue-500"
      case "heating":
        return "bg-red-500"
      case "auto":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getHealthColor = (health: number) => {
    if (health >= 95) return "text-green-400"
    if (health >= 85) return "text-yellow-400"
    return "text-red-400"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Device Management & Control</h2>
        <Badge variant="secondary" className="bg-slate-700 text-slate-300">
          {devices.length} Active Devices
        </Badge>
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700">
                <TableHead className="text-slate-300">Device ID</TableHead>
                <TableHead className="text-slate-300">Location</TableHead>
                <TableHead className="text-slate-300">Live Temp</TableHead>
                <TableHead className="text-slate-300">Humidity</TableHead>
                <TableHead className="text-slate-300">CO₂</TableHead>
                <TableHead className="text-slate-300">Occupancy</TableHead>
                <TableHead className="text-slate-300">AC Status</TableHead>
                <TableHead className="text-slate-300">Fan Speed</TableHead>
                <TableHead className="text-slate-300">Health</TableHead>
                <TableHead className="text-slate-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {devices.map((device) => (
                <TableRow key={device.id} className="border-slate-700">
                  <TableCell className="font-medium text-blue-400">{device.id}</TableCell>
                  <TableCell className="text-slate-300">{device.location}</TableCell>
                  <TableCell className="text-slate-300">
                    <div className="flex items-center space-x-1">
                      <Thermometer className="h-3 w-3 text-red-400" />
                      <span>{device.live_temp.toFixed(1)}°C</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-300">{device.live_humidity.toFixed(0)}%</TableCell>
                  <TableCell className="text-slate-300">{device.live_co2.toFixed(0)} ppm</TableCell>
                  <TableCell>
                    <Badge variant={device.occupancy ? "default" : "secondary"} className="text-xs">
                      {device.occupancy ? "Occupied" : "Empty"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(device.ac_status)} text-white text-xs`}>
                      {device.ac_status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-300">
                    <div className="flex items-center space-x-1">
                      <Fan className="h-3 w-3 text-cyan-400" />
                      <span>{device.fan_speed.toFixed(0)}%</span>
                    </div>
                  </TableCell>
                  <TableCell className={getHealthColor(device.health)}>{device.health.toFixed(0)}%</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                      >
                        <FileText className="h-3 w-3 mr-1" />
                        Logs
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-blue-600 text-blue-400 hover:bg-blue-900 bg-transparent"
                            onClick={() => handleManualControl(device)}
                          >
                            <Settings className="h-3 w-3 mr-1" />
                            Control
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-slate-800 border-slate-700 text-white">
                          <DialogHeader>
                            <DialogTitle>Manual Control - {selectedDevice?.id}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-6 py-4">
                            <div className="space-y-2">
                              <Label className="text-slate-300">
                                Temperature Setpoint: {tempSetpoint[0].toFixed(1)}°C
                              </Label>
                              <Slider
                                value={tempSetpoint}
                                onValueChange={setTempSetpoint}
                                max={30}
                                min={16}
                                step={0.5}
                                className="w-full"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-slate-300">Fan Speed: {fanSpeed[0]}%</Label>
                              <Slider
                                value={fanSpeed}
                                onValueChange={setFanSpeed}
                                max={100}
                                min={0}
                                step={5}
                                className="w-full"
                              />
                            </div>
                            <div className="flex justify-end space-x-2">
                              <Button variant="outline" className="border-slate-600 text-slate-300 bg-transparent">
                                Cancel
                              </Button>
                              <Button onClick={applyManualControl} className="bg-blue-600 hover:bg-blue-700">
                                Apply Changes
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
