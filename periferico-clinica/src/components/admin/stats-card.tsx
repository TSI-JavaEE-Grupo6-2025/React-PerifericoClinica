import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components"


// Array vacío para simular que no hay datos del backend
const stats: Array<{title: string; value: string; change: string; icon: React.ComponentType<{className?: string}>}> = []

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.length > 0 ? (
        stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-[#2980b9]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#2c3e50]">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="col-span-full">
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500 text-sm">Próximamente...</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
