"use client"

import { Home, Server, Database, Brain, Snowflake } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import type { ViewType } from "../page"

interface AppSidebarProps {
  currentView: ViewType
  onViewChange: (view: ViewType) => void
}

const navigationItems = [
  {
    id: "dashboard" as ViewType,
    title: "Dashboard",
    icon: Home,
    tooltip: "System Overview",
  },
  {
    id: "devices" as ViewType,
    title: "Device Management",
    icon: Server,
    tooltip: "Manage HVAC Units",
  },
  {
    id: "data" as ViewType,
    title: "Data & Logs",
    icon: Database,
    tooltip: "Analytics & Historical Data",
  },
  {
    id: "ai-settings" as ViewType,
    title: "AI Settings",
    icon: Brain,
    tooltip: "AI Configuration",
  },
]

export function AppSidebar({ currentView, onViewChange }: AppSidebarProps) {
  return (
    <Sidebar className="border-r border-slate-700 bg-slate-800">
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <Snowflake className="h-5 w-5 text-white" />
          </div>
          <span className="font-semibold text-white">VayuShuddhi</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onViewChange(item.id)}
                    isActive={currentView === item.id}
                    tooltip={item.tooltip}
                    className="text-slate-300 hover:text-white hover:bg-slate-700 data-[active=true]:bg-blue-600 data-[active=true]:text-white"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
