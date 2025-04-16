"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Clock, DollarSign, MapPin, Star, Briefcase, CheckCircle } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  accountType: string
  isLoggedIn: boolean
}

interface Task {
  id: string
  title: string
  description: string
  budget: number
  location: string
  status: string
  postedAt: string
  offers?: number
  assignedTo?: string
  postedBy?: string
  dueDate?: string
  completedDate?: string
  rating?: number
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Mock data for tasks
  const myTasks: Task[] = [
    {
      id: "task1",
      title: "Help with moving furniture",
      description: "Need help moving a couch and a few boxes from my apartment to my new place.",
      budget: 50,
      location: "Brooklyn, NY",
      status: "open",
      postedAt: "2 days ago",
      offers: 3,
    },
    {
      id: "task2",
      title: "Fix leaky faucet",
      description: "Kitchen faucet is leaking and needs to be fixed or replaced.",
      budget: 75,
      location: "Queens, NY",
      status: "assigned",
      postedAt: "1 week ago",
      assignedTo: "John D.",
      offers: 5,
    },
  ]

  const availableTasks: Task[] = [
    {
      id: "task3",
      title: "Website debugging",
      description: "Need help fixing some bugs on my WordPress website.",
      budget: 120,
      location: "Remote",
      status: "open",
      postedAt: "3 hours ago",
      postedBy: "Sarah M.",
      offers: 2,
    },
    {
      id: "task4",
      title: "Dog walking",
      description: "Need someone to walk my dog for the next 3 days while I'm away.",
      budget: 60,
      location: "Manhattan, NY",
      status: "open",
      postedAt: "1 day ago",
      postedBy: "Mike T.",
      offers: 4,
    },
    {
      id: "task5",
      title: "Grocery delivery",
      description: "Need someone to pick up groceries from the store and deliver to my home.",
      budget: 30,
      location: "Bronx, NY",
      status: "open",
      postedAt: "5 hours ago",
      postedBy: "Lisa K.",
      offers: 1,
    },
  ]

  const assignedTasks: Task[] = [
    {
      id: "task6",
      title: "Lawn mowing",
      description: "Need lawn mowed and edges trimmed.",
      budget: 45,
      location: "Staten Island, NY",
      status: "in-progress",
      postedAt: "3 days ago",
      postedBy: "Robert J.",
      dueDate: "Tomorrow",
    },
  ]

  const completedTasks: Task[] = [
    {
      id: "task7",
      title: "Computer setup",
      description: "Help setting up new computer and transferring files.",
      budget: 80,
      location: "Remote",
      status: "completed",
      postedAt: "2 weeks ago",
      postedBy: "Emma S.",
      completedDate: "1 week ago",
      rating: 5,
    },
  ]

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      // Redirect to sign in if not logged in
      router.push("/signin")
    }
    setLoading(false)
  }, [router])

  const handleSignOut = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-primary">JobPool</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/browse" className="text-sm font-medium hover:underline underline-offset-4">
              Browse Tasks
            </Link>
            <Link href="/post-task" className="text-sm font-medium hover:underline underline-offset-4">
              Post a Task
            </Link>
            <Link href="/messages" className="text-sm font-medium hover:underline underline-offset-4">
              Messages
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium hidden md:inline-block">{user.name}</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-6 md:py-10 px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Manage your tasks and offers</p>
          </div>
          <Link href="/post-task">
            <Button>
              <Briefcase className="mr-2 h-4 w-4" />
              Post a New Task
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="my-tasks" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="my-tasks">My Tasks</TabsTrigger>
            <TabsTrigger value="available">Available Tasks</TabsTrigger>
            <TabsTrigger value="assigned">Assigned to Me</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="my-tasks" className="space-y-4 mt-6">
            <h2 className="text-xl font-semibold">Tasks You've Posted</h2>
            {myTasks.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <p className="text-muted-foreground mb-4">You haven't posted any tasks yet</p>
                  <Link href="/post-task">
                    <Button>Post Your First Task</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {myTasks.map((task) => (
                  <Card key={task.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{task.title}</CardTitle>
                        <Badge variant={task.status === "open" ? "outline" : "secondary"}>
                          {task.status === "open" ? "Open" : "Assigned"}
                        </Badge>
                      </div>
                      <CardDescription className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{task.postedAt}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{task.description}</p>
                      <div className="flex flex-col gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span>${task.budget}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{task.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-muted-foreground" />
                          <span>{task.offers} offers</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link href={`/tasks/${task.id}`} className="w-full">
                        <Button variant="outline" className="w-full">
                          View Details
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="available" className="space-y-4 mt-6">
            <h2 className="text-xl font-semibold">Available Tasks</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {availableTasks.map((task) => (
                <Card key={task.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{task.title}</CardTitle>
                      <Badge variant="outline">Open</Badge>
                    </div>
                    <CardDescription className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{task.postedAt}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{task.description}</p>
                    <div className="flex flex-col gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>${task.budget}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{task.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-4 w-4">
                          <AvatarFallback>{task.postedBy?.charAt(0) || "?"}</AvatarFallback>
                        </Avatar>
                        <span>{task.postedBy}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/tasks/${task.id}`} className="w-full">
                      <Button className="w-full">Make an Offer</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="assigned" className="space-y-4 mt-6">
            <h2 className="text-xl font-semibold">Tasks Assigned to You</h2>
            {assignedTasks.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <p className="text-muted-foreground">You don't have any assigned tasks</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {assignedTasks.map((task) => (
                  <Card key={task.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{task.title}</CardTitle>
                        <Badge>In Progress</Badge>
                      </div>
                      <CardDescription className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>Due: {task.dueDate}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{task.description}</p>
                      <div className="flex flex-col gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span>${task.budget}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{task.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-4 w-4">
                            <AvatarFallback>{task.postedBy?.charAt(0) || "?"}</AvatarFallback>
                          </Avatar>
                          <span>{task.postedBy}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Link href={`/tasks/${task.id}`} className="flex-1">
                        <Button variant="outline" className="w-full">
                          View Details
                        </Button>
                      </Link>
                      <Link href={`/tasks/${task.id}/complete`} className="flex-1">
                        <Button className="w-full">Mark Complete</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4 mt-6">
            <h2 className="text-xl font-semibold">Completed Tasks</h2>
            {completedTasks.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <p className="text-muted-foreground">You don't have any completed tasks</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {completedTasks.map((task) => (
                  <Card key={task.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{task.title}</CardTitle>
                        <Badge variant="secondary">Completed</Badge>
                      </div>
                      <CardDescription className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        <span>{task.completedDate}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{task.description}</p>
                      <div className="flex flex-col gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span>${task.budget}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{task.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          <span>Rating: {task.rating}/5</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link href={`/tasks/${task.id}`} className="w-full">
                        <Button variant="outline" className="w-full">
                          View Details
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}