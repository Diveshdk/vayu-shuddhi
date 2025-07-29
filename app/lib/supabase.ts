"use client"

export type Device = {
  id: string
  location: string
  live_temp: number
  live_humidity: number
  live_co2: number
  occupancy: boolean
  ac_status: "cooling" | "heating" | "off" | "auto"
  fan_speed: number
  health: number
  last_updated: string
}

export type SensorReading = {
  id: string
  device_id: string
  temperature: number
  humidity: number
  co2: number
  timestamp: string
}
