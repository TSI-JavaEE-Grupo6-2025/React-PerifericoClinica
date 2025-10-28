import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui"




// interface para las props del componente stats-card
/**
 * Interface para las props del componente stats-card
 * @param title - El título de la tarjeta
 * @param value - El valor de la tarjeta
 * @param change - El cambio de la tarjeta
 * @param icon - El icono de la tarjeta
 */
interface StatsCardProps {
    title: string
    value: string
    change: string
    icon: React.ComponentType<{ className?: string }>
}
/**
 * Stats mostraran -> cantidad de pacientes, cantidad de documentos, cantidad de historias clinicas,...
 */

const stats: Array<StatsCardProps> = []

export function StatsCard() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.length > 0 ? (
                stats.map((stats)=> (
                    <Card key={stats.title}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">{stats.title}</CardTitle>
                        <stats.icon className="h-4 w-4 text-[#2980b9]"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-[#2c3e50]">{stats.value}</div>
                        <p className="text-xs text-muted-foreground mt-1">{stats.change}</p>
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