import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/components/ui/card";

interface StatCardProps {
    title: string,
    meta: string
    description: string,
    className?: string
}


function StatCard({ title, meta, description, className }: StatCardProps) {
    return (
        <Card className={`${className} text-center`}>
            <CardHeader>
                <h2 className="text-xl font-medium">{title}</h2>
                <CardDescription className="dark:text-white">{meta}</CardDescription>
                <CardContent>
                    <CardDescription>{description}</CardDescription>
                </CardContent>
            </CardHeader>
        </Card>
    )
}

export default StatCard;