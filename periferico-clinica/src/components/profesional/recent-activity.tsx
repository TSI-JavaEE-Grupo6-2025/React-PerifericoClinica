import { Card, CardContent, CardHeader, CardTitle } from "../../components"
import { Avatar, AvatarFallback } from "../../components"
import { Badge } from "../../components/"



const activities = [

    {
        user: "",
        action: "",
        patient: "",
        time: "",
        type: "",
    },
]

export function RecentActivity() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-[#2c3e50]">Actividad Recientes</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    {activities.length > 0 && activities.some(activity => activity.user && activity.action) ? (
                        activities
                            .filter(activity => activity.user && activity.action)
                            .map((activity, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <Avatar className="h-9 w-9">
                                       <AvatarFallback className="bg-[#2890b9] text-white text-xs">
                                        {activity.user
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                       </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm">
                                            <span className="font-medium text-[#2c3e50]">{activity.user}</span>
                                        </p>
                                        <p className="text-xs text-muted-foreground">{activity.patient}</p>
                                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                                    </div>
                                    <Badge variant="outline" className="text-xs">
                                        {activity.type}
                                    </Badge>
                                </div>
                            ))
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-gray-500 text-sm">Próximamente...</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
