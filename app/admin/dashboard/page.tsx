"use client"

import { Users, BookOpen, GraduationCap, BarChart3 } from "lucide-react"

export default function DashboardPage() {
  // Placeholder stats
  const stats = [
    {
      title: "Total Students",
      value: "2,345",
      change: "+12%",
      icon: Users,
    },
    {
      title: "Active Courses",
      value: "18",
      change: "+2",
      icon: BookOpen,
    },
    {
      title: "Completion Rate",
      value: "87%",
      change: "+5%",
      icon: GraduationCap,
    },
    {
      title: "Revenue",
      value: "$12,345",
      change: "+18%",
      icon: BarChart3,
    },
  ]

  return (
    <div>
      {/* Welcome section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, Admin</h2>
        <p className="mt-2 text-muted-foreground">
          Here&apos;s what&apos;s happening with your academy today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="relative overflow-hidden rounded-lg border border-border bg-card px-4 py-5 sm:p-6"
          >
            <dt>
              <div className="absolute rounded-md bg-primary/10 p-3">
                <stat.icon className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-muted-foreground">
                {stat.title}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline">
              <p className="text-2xl font-semibold">{stat.value}</p>
              <p className="ml-2 flex items-baseline text-sm text-green-600">
                {stat.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      {/* Recent activity */}
      <div className="mt-8">
        <div className="border border-border rounded-lg bg-card">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium">Recent Activity</h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            {/* Add activity content here */}
            <p className="text-muted-foreground">No recent activity</p>
          </div>
        </div>
      </div>
    </div>
  )
} 