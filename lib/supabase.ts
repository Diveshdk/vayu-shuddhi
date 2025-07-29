import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://your-project.supabase.co"
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "your-anon-key"

export const supabase = createClient(supabaseUrl, supabaseKey)

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

export type SystemEvent = {
  id: string
  device_id: string
  event_type: "alert" | "info" | "warning"
  message: string
  timestamp: string
}
