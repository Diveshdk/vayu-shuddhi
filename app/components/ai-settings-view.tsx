"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Brain, Settings, Activity, Zap, Target, TrendingUp } from "lucide-react"

interface AIMetrics {
  modelAccuracy: number
  predictionConfidence: number
  energyOptimization: number
  learningRate: number
}

export function AISettingsView() {
  const [aiEnabled, setAiEnabled] = useState(true)
  const [autoOptimization, setAutoOptimization] = useState(true)
  const [learningRate, setLearningRate] = useState([0.75])
  const [optimizationLevel, setOptimizationLevel] = useState([80])
  const [predictionWindow, setPredictionWindow] = useState([30])
  const [aiMetrics, setAiMetrics] = useState<AIMetrics>({
    modelAccuracy: 97.8,
    predictionConfidence: 94.2,
    energyOptimization: 32.4,
    learningRate: 0.75,
  })

  // Real-time AI metrics updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAiMetrics((prev) => ({
        modelAccuracy: Math.max(90, Math.min(100, prev.modelAccuracy + (Math.random() - 0.5) * 0.5)),
        predictionConfidence: Math.max(85, Math.min(100, prev.predictionConfidence + (Math.random() - 0.5) * 1)),
        energyOptimization: Math.max(20, Math.min(50, prev.energyOptimization + (Math.random() - 0.5) * 0.8)),
        learningRate: learningRate[0],
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [learningRate])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">AI Configuration & Settings</h2>
        <Badge variant={aiEnabled ? "default" : "secondary"} className="bg-green-600">
          AI System {aiEnabled ? "Active" : "Inactive"}
        </Badge>
      </div>

      {/* AI Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Model Accuracy</CardTitle>
            <Target className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">{aiMetrics.modelAccuracy.toFixed(1)}%</div>
            <Progress value={aiMetrics.modelAccuracy} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Prediction Confidence</CardTitle>
            <Brain className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">{aiMetrics.predictionConfidence.toFixed(1)}%</div>
            <Progress value={aiMetrics.predictionConfidence} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Energy Optimization</CardTitle>
            <Zap className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-400">{aiMetrics.energyOptimization.toFixed(1)}%</div>
            <Progress value={aiMetrics.energyOptimization} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Learning Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-400">{(aiMetrics.learningRate * 100).toFixed(0)}%</div>
            <Progress value={aiMetrics.learningRate * 100} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div>

      {/* AI Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Settings className="h-5 w-5 mr-2 text-blue-400" />
              Core AI Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-slate-300">AI System</Label>
                <p className="text-xs text-slate-400">Enable/disable AI-powered optimization</p>
              </div>
              <Switch checked={aiEnabled} onCheckedChange={setAiEnabled} className="data-[state=checked]:bg-blue-600" />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-slate-300">Auto Optimization</Label>
                <p className="text-xs text-slate-400">Automatically optimize based on patterns</p>
              </div>
              <Switch
                checked={autoOptimization}
                onCheckedChange={setAutoOptimization}
                disabled={!aiEnabled}
                className="data-[state=checked]:bg-green-600"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-slate-300">Learning Rate: {(learningRate[0] * 100).toFixed(0)}%</Label>
              <Slider
                value={learningRate}
                onValueChange={setLearningRate}
                max={1}
                min={0.1}
                step={0.05}
                disabled={!aiEnabled}
                className="w-full"
              />
              <p className="text-xs text-slate-400">Higher values make the AI adapt faster to changes</p>
            </div>

            <div className="space-y-3">
              <Label className="text-slate-300">Optimization Level: {optimizationLevel[0]}%</Label>
              <Slider
                value={optimizationLevel}
                onValueChange={setOptimizationLevel}
                max={100}
                min={20}
                step={5}
                disabled={!aiEnabled}
                className="w-full"
              />
              <p className="text-xs text-slate-400">Balance between energy savings and comfort</p>
            </div>

            <div className="space-y-3">
              <Label className="text-slate-300">Prediction Window: {predictionWindow[0]} minutes</Label>
              <Slider
                value={predictionWindow}
                onValueChange={setPredictionWindow}
                max={120}
                min={5}
                step={5}
                disabled={!aiEnabled}
                className="w-full"
              />
              <p className="text-xs text-slate-400">How far ahead the AI predicts occupancy</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Activity className="h-5 w-5 mr-2 text-green-400" />
              Model Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-300">Occupancy Detection</span>
                <span className="text-sm font-bold text-green-400">97.8%</span>
              </div>
              <Progress value={97.8} className="h-2" />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-300">Energy Prediction</span>
                <span className="text-sm font-bold text-blue-400">94.2%</span>
              </div>
              <Progress value={94.2} className="h-2" />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-300">Temperature Control</span>
                <span className="text-sm font-bold text-yellow-400">96.5%</span>
              </div>
              <Progress value={96.5} className="h-2" />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-300">System Health</span>
                <span className="text-sm font-bold text-purple-400">98.1%</span>
              </div>
              <Progress value={98.1} className="h-2" />
            </div>

            <div className="pt-4 border-t border-slate-700">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-green-400">1,247</div>
                  <div className="text-xs text-slate-400">Predictions Today</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-blue-400">32.4%</div>
                  <div className="text-xs text-slate-400">Energy Saved</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Model Training & Updates */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Model Training & Updates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-slate-300">Last Training Session</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Date:</span>
                  <span className="text-white">2024-01-15 14:30</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Duration:</span>
                  <span className="text-white">2h 34m</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Samples:</span>
                  <span className="text-white">45,672</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-slate-300">Model Version</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Current:</span>
                  <span className="text-white">v2.4.1</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Released:</span>
                  <span className="text-white">2024-01-10</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Status:</span>
                  <Badge className="bg-green-600 text-white text-xs">Stable</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-slate-300">Actions</h4>
              <div className="space-y-2">
                <Button className="w-full bg-blue-600 hover:bg-blue-700" disabled={!aiEnabled}>
                  Retrain Model
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                >
                  Export Model Data
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                >
                  Reset to Defaults
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
