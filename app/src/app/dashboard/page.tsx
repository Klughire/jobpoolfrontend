"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  DollarSign,
  MapPin,
  Star,
  Briefcase,
  CheckCircle,
} from "lucide-react";

import axiosInstance from "@/lib/axiosInstance";
import useStore from "@/lib/Zustand";
import { toast } from "sonner";

// Interfaces
interface User {
  id: string;
  name: string;
  email: string;
  accountType: string;
  isLoggedIn: boolean;
}

interface Task {
  id: string;
  user_ref_id?: string;
  title: string;
  description: string;
  budget: number;
  location: string;
  status: string;
  postedAt: string;
  offers?: number;
  assignedTo?: string;
  posted_by?: string;
  dueDate?: string;
  completedDate?: string;
  rating?: number;
}

interface Bid {
  id: string;
  task_id: string;
  task_title: string;
  bid_amount: number;
  status: string;
  created_at: string;
  task_location: string;
  task_description: string;
  posted_by: string;
}

interface BidRequest {
  bid_id: number;
  task_id: string;
  task_title: string;
  bid_amount: number;
  bid_description: string;
  status: string;
  created_at: string;
  task_location: string;
  task_description: string;
  posted_by: string;
  job_due_date: string;
  job_budget: number;
  job_category: string;
  category_name: string;
}

interface APIResponse<T> {
  status_code: number;
  message: string;
  timestamp: string;
  data: T;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [postedTasks, setPostedTasks] = useState<Task[]>([]);
  const [availableTasks, setAvailableTasks] = useState<Task[]>([]);
  const [bids, setBids] = useState<Bid[]>([]);
  const [assignedTasks, setAssignedTasks] = useState<Task[]>([]);
  const [requestedTasks, setRequestedTasks] = useState<BidRequest[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const { userId } = useStore();

  // Check authentication
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
        router.push("/signin");
      }
    } else {
      router.push("/signin");
    }
    setLoading(false);
  }, [router]);

  // Fetch user's posted tasks
  useEffect(() => {
    if (!user || !userId) return;

    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get<APIResponse<{ jobs: any[] }>>(
          `/get-user-jobs/${userId}/`
        );
        const result = response.data;

        if (result.status_code === 200 && result.data?.jobs) {
          const tasks: Task[] = result.data.jobs.map((job) => ({
            id: job.job_id.toString(),
            title: job.job_title || "Untitled",
            description: job.job_description || "No description provided.",
            budget: Number(job.job_budget) || 0,
            location: job.job_location || "Unknown",
            status: job.status ? "assigned" : "open",
            postedAt: job.job_due_date
              ? new Date(job.job_due_date).toLocaleDateString("en-GB")
              : "Unknown",
            offers: job.offers || 0,
            posted_by: job.posted_by || "Unknown",
          }));
          setPostedTasks(tasks);
        } else {
          console.warn("No jobs found or API error:", result.message);
          //toast.error("Failed to load postted tasks.");
        }
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
        //toast.error("An error occurred while fetching posted tasks.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [user, userId]);

  // Fetch all available tasks
  useEffect(() => {
    if (!user || !userId) return;

    const fetchAllTasks = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get<APIResponse<{ jobs: any[] }>>(
          `/get-all-jobs/`
        );
        const result = response.data;

        if (result.status_code === 200 && result.data?.jobs) {
          const tasks: Task[] = result.data.jobs
            .filter((job) => job.user_ref_id !== userId)
            .map((job) => ({
              id: job.job_id.toString(),
              title: job.job_title || "Untitled",
              description: job.job_description || "No description provided.",
              budget: Number(job.job_budget) || 0,
              location: job.job_location || "Unknown",
              status: job.status ? "assigned" : "open",
              postedAt: job.job_due_date
                ? new Date(job.job_due_date).toLocaleDateString("en-GB")
                : "Unknown",
              offers: job.offers || 0,
              posted_by: job.posted_by || "Unknown",
            }));
          setAvailableTasks(tasks);
        } else {
          console.warn("No jobs found or API error:", result.message);
          //toast.error("Failed to load available tasks.");
        }
      } catch (err) {
        console.error("Failed to fetch all tasks:", err);
        //toast.error("An error occurred while fetching available tasks.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllTasks();
  }, [user, userId]);

  // Fetch user's bids
  useEffect(() => {
    if (!user || !userId) return;

    const fetchBids = async () => {
      try {
        const response = await axiosInstance.get<APIResponse<{ bids: any[] }>>(
          `/get-user-bids/${userId}/`
        );
        const result = response.data;

        if (result.status_code === 200 && result.data?.bids) {
          const userBids: Bid[] = result.data.bids.map((bid) => ({
            id: bid.bid_id.toString(),
            task_id: bid.task_id.toString(),
            task_title: bid.task_title || "Untitled",
            bid_amount: Number(bid.bid_amount) || 0,
            status: bid.status || "pending",
            created_at: bid.created_at
              ? new Date(bid.created_at).toLocaleDateString("en-GB")
              : "Unknown",
            task_location: bid.task_location || "Unknown",
            task_description:
              bid.task_description || "No description provided.",
            posted_by: bid.posted_by || "Unknown",
          }));
          setBids(userBids);
        } else {
          console.warn("No bids found or API error:", result.message);
          //toast.error("Failed to load bids.");
        }
      } catch (err) {
        console.error("Failed to fetch bids:", err);
        //toast.error("An error occurred while fetching bids.");
      }
    };

    fetchBids();
  }, [user, userId]);

  // Fetch assigned tasks
  useEffect(() => {
    if (!user || !userId) return;

    const fetchAssignedBids = async () => {
      try {
        const response = await axiosInstance.get<APIResponse<{ jobs: any[] }>>(
          `/get-user-assigned-bids/${userId}/`
        );
        const result = response.data;

        if (result.status_code === 200 && Array.isArray(result.data?.jobs)) {
          const tasks: Task[] = result.data.jobs.map((job) => ({
            id: job.job_id.toString(),
            title: job.job_title || "Untitled",
            description: job.job_description || "No description provided.",
            budget: Number(job.job_budget) || 0,
            location: job.job_location || "Unknown",
            status: job.status ? "assigned" : "open",
            postedAt: job.created_at
              ? new Date(job.created_at).toLocaleDateString("en-GB")
              : "Unknown",
            dueDate: job.job_due_date
              ? new Date(job.job_due_date).toLocaleDateString("en-GB")
              : "Unknown",
            offers: job.offers?.length || 0,
            posted_by: job.posted_by || "Unknown",
          }));
          setAssignedTasks(tasks);
        } else {
          console.warn("No assigned tasks found or API error:", result.message);
          //toast.error("Failed to load assigned tasks.");
        }
      } catch (err) {
        console.error("Failed to fetch assigned tasks:", err);
        //toast.error("An error occurred while fetching assigned tasks.");
      }
    };

    fetchAssignedBids();
  }, [user, userId]);

  // Fetch requested bids
  useEffect(() => {
    if (!user || !userId) return;

    const fetchRequestedBids = async () => {
      try {
        const response = await axiosInstance.get<
          APIResponse<{ bids: BidRequest[] }>
        >(`/get-user-requested-bids/${userId}/`);
        const result = response.data;

        if (result.status_code === 200 && Array.isArray(result.data?.bids)) {
          const bids: BidRequest[] = result.data.bids.map((bid) => ({
            bid_id: bid.bid_id,
            task_id: bid.task_id.toString(),
            task_title: bid.task_title || "Untitled",
            bid_amount: Number(bid.bid_amount) || 0,
            bid_description: bid.bid_description || "No description provided.",
            status: bid.status || "pending",
            created_at: bid.created_at
              ? new Date(bid.created_at).toLocaleDateString("en-GB")
              : "Unknown",
            task_location: bid.task_location || "Unknown",
            task_description:
              bid.task_description || "No description provided.",
            posted_by: bid.posted_by || "Unknown",
            job_due_date: bid.job_due_date
              ? new Date(bid.job_due_date).toLocaleDateString("en-GB")
              : "Unknown",
            job_budget: Number(bid.job_budget) || 0,
            job_category: bid.job_category || "General",
            category_name: bid.category_name || "Unknown",
          }));
          setRequestedTasks(bids);
        } else {
          console.warn("No requested bids found or API error:", result.message);
          //toast.error("Failed to load requested bids.");
        }
      } catch (err) {
        console.error("Failed to fetch requested bids:", err);
        //toast.error("An error occurred while fetching requested bids.");
      }
    };

    fetchRequestedBids();
  }, [user, userId]);

  // Fetch completed tasks
  useEffect(() => {
    if (!user || !userId) return;

    const fetchCompletedTasks = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get<APIResponse<{ jobs: any[] }>>(
          `/fetch-completed-tasks/${userId}/`
        );
        const result = response.data;

        if (result.status_code === 200 && result.data?.jobs) {
          const tasks: Task[] = result.data.jobs.map((job) => ({
            id: job.job_id.toString(),
            title: job.job_title || "Untitled",
            description: job.job_description || "No description provided.",
            budget: Number(job.job_budget) || 0,
            location: job.job_location || "Unknown",
            status: "completed",
            postedAt: job.job_due_date
              ? new Date(job.job_due_date).toLocaleDateString("en-GB")
              : "Unknown",
            completedDate: job.completed_date
              ? new Date(job.completed_date).toLocaleDateString("en-GB")
              : "Unknown",
            rating: job.rating || 0,
            offers: job.offers || 0,
            posted_by: job.posted_by || "Unknown",
          }));
          setCompletedTasks(tasks);
        } else {
          console.warn(
            "No completed tasks found or API error:",
            result.message
          );
          //toast.error("Failed to load completed tasks.");
        }
      } catch (err) {
        console.error("Failed to fetch completed tasks:", err);
       // toast.error("An error occurred while fetching completed tasks.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedTasks();
  }, [user, userId]);

  const handleComplete = async (jobId: string) => {
    try {
      const response = await axiosInstance.put<APIResponse<any>>(
        `/mark-complete/${jobId}/`
      );

      if (response.data.status_code === 200) {
        toast.success("Task marked as complete!");
        // Remove the task from assignedTasks and add to completedTasks
        setAssignedTasks((prev) => prev.filter((task) => task.id !== jobId));
        setCompletedTasks((prev) => [
          ...prev,
          {
            ...assignedTasks.find((task) => task.id === jobId)!,
            status: "completed",
            completedDate: new Date().toLocaleDateString("en-GB"),
          },
        ]);

        router.push(`/tasks/${jobId}/complete`);
      } else {
        // toast.error(
        //   response.data.message || "Failed to mark task as complete."
        // );
        console.error("Error marking task as complete:");
      }
    } catch (error) {
      console.error("Error marking task as complete:", error);
      //toast.error("An error occurred while marking the task as complete.");
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-primary">JobPool</span>
          </Link>

          {/* <nav className="hidden md:flex gap-6">
            <Link
              href="/browse"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Browse Tasks
            </Link>
            <Link
              href="/post-task"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Post a Task
            </Link>
            <Link
              href="/messages"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Messages
            </Link>
          </nav> */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium hidden md:inline-block">
                {user.name}
              </span>
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
            <p className="text-muted-foreground">Manage your tasks and bids</p>
          </div>
          <Link href="/post-task" passHref>
            <Button>+ Post a Task</Button>
          </Link>
        </div>

        <Tabs defaultValue="my-tasks" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="my-tasks">My Tasks</TabsTrigger>
            <TabsTrigger value="available">Available Tasks</TabsTrigger>
            <TabsTrigger value="assigned">Assigned to Me</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="my-bids">My Bids</TabsTrigger>
          </TabsList>

          <TabsContent value="my-tasks" className="space-y-4 mt-6">
            <h2 className="text-xl font-semibold">Tasks You've Posted</h2>
            {postedTasks.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <p className="text-muted-foreground mb-4">
                    You haven't posted any tasks yet
                  </p>
                  <Link href="/post-task">
                    <Button>Post Your First Task</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {postedTasks.map((task) => (
                  <Card key={task.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{task.title}</CardTitle>
                        <Badge
                          variant={
                            task.status === "open" ? "outline" : "secondary"
                          }
                        >
                          {task.status.charAt(0).toUpperCase() +
                            task.status.slice(1)}
                        </Badge>
                      </div>
                      <CardDescription className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{task.postedAt}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {task.description}
                      </p>
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
                          <span>{task.offers || 0} offers</span>
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
            {availableTasks.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <p className="text-muted-foreground mb-4">
                    No available tasks found
                  </p>
                  <Link href="/browse">
                    <Button>Browse Tasks</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {availableTasks.map((task) => (
                  <Card key={task.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{task.title}</CardTitle>
                        <Badge variant="outline">
                          {task.status.charAt(0).toUpperCase() +
                            task.status.slice(1)}
                        </Badge>
                      </div>
                      <CardDescription className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{task.postedAt}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {task.description}
                      </p>
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
                            <AvatarFallback>
                              {task.posted_by?.charAt(0) || "?"}
                            </AvatarFallback>
                          </Avatar>
                          <span>{task.posted_by}</span>
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
            )}
          </TabsContent>

          <TabsContent value="assigned" className="space-y-4 mt-6">
            <h2 className="text-xl font-semibold">Tasks Assigned to You</h2>
            {assignedTasks.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <p className="text-muted-foreground">
                    You don't have any assigned tasks
                  </p>
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
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {task.description}
                      </p>
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
                            <AvatarFallback>
                              {task.posted_by?.charAt(0) || "?"}
                            </AvatarFallback>
                          </Avatar>
                          <span>{task.posted_by}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Link href={`/tasks/${task.id}`} className="flex-1">
                        <Button variant="outline" className="w-full">
                          View Details
                        </Button>
                      </Link>
                      <Button
                        className="flex-1"
                        onClick={() => handleComplete(task.id)}
                      >
                        Mark Complete
                      </Button>
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
                  <p className="text-muted-foreground">
                    You don't have any completed tasks
                  </p>
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
                      <CardDescription className="flex items-&center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        <span>Completed: {task.completedDate}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {task.description}
                      </p>
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
                          <span>Rating: {task.rating || "Not rated"}/5</span>
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

          <TabsContent value="my-bids" className="space-y-4 mt-6">
            <h2 className="text-xl font-semibold">My Bids</h2>
            {requestedTasks.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <p className="text-muted-foreground mb-4">
                    You haven't placed any bids yet
                  </p>
                  <Link href="/browse">
                    <Button>Browse Available Tasks</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {requestedTasks.map((bid) => (
                  <Card key={bid.bid_id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">
                          {bid.task_title}
                        </CardTitle>
                        <Badge
                          variant={
                            bid.status === "pending"
                              ? "outline"
                              : bid.status === "accepted"
                              ? "default"
                              : "destructive"
                          }
                        >
                          {bid.status.charAt(0).toUpperCase() +
                            bid.status.slice(1)}
                        </Badge>
                      </div>
                      <CardDescription className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>Bid placed: {bid.created_at}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {bid.task_description}
                      </p>
                      <div className="flex flex-col gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span>Your bid: ${bid.bid_amount}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{bid.task_location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-4 w-4">
                            <AvatarFallback>
                              {bid.posted_by?.charAt(0) || "?"}
                            </AvatarFallback>
                          </Avatar>
                          <span>{bid.posted_by}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link href={`/tasks/${bid.task_id}`} className="w-full">
                        <Button variant="outline" className="w-full">
                          View Task Details
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
  );
}
