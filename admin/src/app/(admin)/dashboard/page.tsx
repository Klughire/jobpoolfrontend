import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, CreditCard, DollarSign, Users, CheckCircle2, Clock, AlertCircle } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">+201 since last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,234</div>
            <p className="text-xs text-muted-foreground">+10.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$6,354.12</div>
            <p className="text-xs text-muted-foreground">24 payouts pending</p>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="payouts">Payouts</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ActivityList />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Task Status</CardTitle>
                <CardDescription>Distribution of tasks by status</CardDescription>
              </CardHeader>
              <CardContent>
                <TaskStatusList />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Tasks</CardTitle>
              <CardDescription>Overview of recently created tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentTasksList />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="payouts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Payouts</CardTitle>
              <CardDescription>Overview of recent payouts to taskers</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentPayoutsList />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ActivityList() {
  const activities = [
    {
      id: 1,
      user: "John Doe",
      action: "completed a task",
      task: "Website Redesign",
      time: "2 hours ago",
    },
    {
      id: 2,
      user: "Jane Smith",
      action: "created a new task",
      task: "Mobile App Development",
      time: "3 hours ago",
    },
    {
      id: 3,
      user: "Robert Johnson",
      action: "received a payout",
      task: "$250.00",
      time: "5 hours ago",
    },
    {
      id: 4,
      user: "Emily Davis",
      action: "updated a task",
      task: "Content Writing",
      time: "6 hours ago",
    },
    {
      id: 5,
      user: "Michael Wilson",
      action: "joined as a tasker",
      task: "",
      time: "1 day ago",
    },
  ]

  return (
    <div className="space-y-8">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center">
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              <span className="font-semibold">{activity.user}</span> {activity.action}
              {activity.task && <span className="font-medium"> {activity.task}</span>}
            </p>
            <p className="text-sm text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function TaskStatusList() {
  const statuses = [
    {
      id: 1,
      name: "Completed",
      count: 345,
      percentage: 45,
      icon: CheckCircle2,
      color: "text-green-500",
    },
    {
      id: 2,
      name: "In Progress",
      count: 192,
      percentage: 25,
      icon: Clock,
      color: "text-blue-500",
    },
    {
      id: 3,
      name: "Pending",
      count: 156,
      percentage: 20,
      icon: Clock,
      color: "text-yellow-500",
    },
    {
      id: 4,
      name: "Cancelled",
      count: 78,
      percentage: 10,
      icon: AlertCircle,
      color: "text-red-500",
    },
  ]

  return (
    <div className="space-y-4">
      {statuses.map((status) => (
        <div key={status.id} className="flex items-center">
          <status.icon className={`mr-2 h-4 w-4 ${status.color}`} />
          <div className="w-full">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{status.name}</span>
              <span className="text-sm text-muted-foreground">{status.count}</span>
            </div>
            <div className="mt-1 h-2 w-full rounded-full bg-muted">
              <div
                className={`h-full rounded-full bg-${status.color.replace("text-", "")}`}
                style={{ width: `${status.percentage}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function RecentTasksList() {
  const tasks = [
    {
      id: 1,
      title: "Website Redesign",
      category: "Web Development",
      taskmaster: "John Smith",
      tasker: "Emily Johnson",
      status: "In Progress",
      amount: "$500.00",
    },
    {
      id: 2,
      title: "Content Writing for Blog",
      category: "Content Creation",
      taskmaster: "Sarah Williams",
      tasker: "Michael Brown",
      status: "Completed",
      amount: "$150.00",
    },
    {
      id: 3,
      title: "Logo Design",
      category: "Graphic Design",
      taskmaster: "David Miller",
      tasker: "Jessica Davis",
      status: "Pending",
      amount: "$300.00",
    },
    {
      id: 4,
      title: "Social Media Management",
      category: "Marketing",
      taskmaster: "Robert Wilson",
      tasker: "Unassigned",
      status: "Open",
      amount: "$400.00",
    },
    {
      id: 5,
      title: "Mobile App Development",
      category: "App Development",
      taskmaster: "Jennifer Lee",
      tasker: "Thomas Anderson",
      status: "In Progress",
      amount: "$1,200.00",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-6 font-medium text-sm">
        <div>Title</div>
        <div>Category</div>
        <div>Taskmaster</div>
        <div>Tasker</div>
        <div>Status</div>
        <div className="text-right">Amount</div>
      </div>
      {tasks.map((task) => (
        <div key={task.id} className="grid grid-cols-6 text-sm py-2 border-t">
          <div>{task.title}</div>
          <div>{task.category}</div>
          <div>{task.taskmaster}</div>
          <div>{task.tasker}</div>
          <div>
            <span
              className={`px-2 py-1 rounded-full text-xs ${
                task.status === "Completed"
                  ? "bg-green-100 text-green-800"
                  : task.status === "In Progress"
                    ? "bg-blue-100 text-blue-800"
                    : task.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-800"
              }`}
            >
              {task.status}
            </span>
          </div>
          <div className="text-right">{task.amount}</div>
        </div>
      ))}
    </div>
  )
}

function RecentPayoutsList() {
  const payouts = [
    {
      id: 1,
      tasker: "Emily Johnson",
      amount: "$450.00",
      date: "2023-04-15",
      status: "Completed",
      method: "Bank Transfer",
    },
    {
      id: 2,
      tasker: "Michael Brown",
      amount: "$150.00",
      date: "2023-04-14",
      status: "Completed",
      method: "PayPal",
    },
    {
      id: 3,
      tasker: "Jessica Davis",
      amount: "$300.00",
      date: "2023-04-14",
      status: "Pending",
      method: "Bank Transfer",
    },
    {
      id: 4,
      tasker: "Thomas Anderson",
      amount: "$600.00",
      date: "2023-04-13",
      status: "Completed",
      method: "PayPal",
    },
    {
      id: 5,
      tasker: "Sarah Williams",
      amount: "$275.00",
      date: "2023-04-12",
      status: "Failed",
      method: "Bank Transfer",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 font-medium text-sm">
        <div>Tasker</div>
        <div>Amount</div>
        <div>Date</div>
        <div>Method</div>
        <div>Status</div>
      </div>
      {payouts.map((payout) => (
        <div key={payout.id} className="grid grid-cols-5 text-sm py-2 border-t">
          <div>{payout.tasker}</div>
          <div>{payout.amount}</div>
          <div>{payout.date}</div>
          <div>{payout.method}</div>
          <div>
            <span
              className={`px-2 py-1 rounded-full text-xs ${
                payout.status === "Completed"
                  ? "bg-green-100 text-green-800"
                  : payout.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
              }`}
            >
              {payout.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
