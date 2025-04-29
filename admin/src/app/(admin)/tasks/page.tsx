"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  MoreHorizontal,
  Calendar,
  MapPin,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Define interfaces for type safety
interface User {
  id: number;
  name: string;
  avatar: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  category: string;
  status: "Open" | "Assigned" | "In Progress" | "Completed" | "Cancelled";
  location: string;
  dueDate: string;
  budget: number;
  remote: boolean;
  createdAt: string;
  taskmaster: User;
  tasker: User | null;
  offers: number;
  completedAt?: string;
  cancelledAt?: string;
  cancellationReason?: string;
}

// Mock data for tasks
const initialTasks: Task[] = [
  {
    id: 1,
    title: "Help moving furniture to new apartment",
    description:
      "Need help moving a couch, bed, and dining table from my current apartment to my new place about 2 miles away.",
    category: "Moving",
    status: "Open",
    location: "Brooklyn, NY",
    dueDate: "2023-05-15",
    budget: 120,
    remote: false,
    createdAt: "2023-05-10",
    taskmaster: {
      id: 1,
      name: "John Smith",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    tasker: null,
    offers: 3,
  },
  {
    id: 2,
    title: "House cleaning for 2-bedroom apartment",
    description:
      "Looking for someone to do a deep clean of my 2-bedroom apartment, including kitchen, bathrooms, and floors.",
    category: "Cleaning",
    status: "Assigned",
    location: "Manhattan, NY",
    dueDate: "2023-05-18",
    budget: 150,
    remote: false,
    createdAt: "2023-05-09",
    taskmaster: {
      id: 5,
      name: "David Miller",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    tasker: {
      id: 2,
      name: "Emily Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    offers: 7,
  },
  {
    id: 3,
    title: "Website design for small business",
    description: "Need a professional to design a simple website for my bakery business. Should include about 5 pages.",
    category: "Web Design",
    status: "In Progress",
    location: "Remote",
    dueDate: "2023-05-30",
    budget: 500,
    remote: true,
    createdAt: "2023-05-08",
    taskmaster: {
      id: 3,
      name: "Michael Brown",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    tasker: {
      id: 8,
      name: "Jennifer Lee",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    offers: 12,
  },
  {
    id: 4,
    title: "Assemble IKEA furniture",
    description: "Need help assembling a bed frame, dresser, and bookshelf from IKEA. All items are still in boxes.",
    category: "Furniture Assembly",
    status: "Completed",
    location: "Queens, NY",
    dueDate: "2023-05-14",
    budget: 100,
    remote: false,
    createdAt: "2023-05-07",
    taskmaster: {
      id: 6,
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    tasker: {
      id: 3,
      name: "Michael Brown",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    offers: 5,
    completedAt: "2023-05-14",
  },
  {
    id: 5,
    title: "Dog walking for 2 weeks",
    description: "Looking for someone to walk my golden retriever once a day for 2 weeks while I'm on vacation.",
    category: "Pet Care",
    status: "Cancelled",
    location: "Bronx, NY",
    dueDate: "2023-05-20",
    budget: 200,
    remote: false,
    createdAt: "2023-05-06",
    taskmaster: {
      id: 7,
      name: "Robert Wilson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    tasker: null,
    offers: 4,
    cancelledAt: "2023-05-12",
    cancellationReason: "Taskmaster found another solution",
  },
  {
    id: 6,
    title: "Social media content creation",
    description:
      "Need someone to create content for my small business Instagram account. Looking for 20 posts with captions.",
    category: "Social Media",
    status: "Open",
    location: "Remote",
    dueDate: "2023-05-25",
    budget: 300,
    remote: true,
    createdAt: "2023-05-05",
    taskmaster: {
      id: 4,
      name: "Jessica Davis",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    tasker: null,
    offers: 9,
  },
  {
    id: 7,
    title: "Garden maintenance and lawn mowing",
    description:
      "Need someone to mow the lawn, trim hedges, and do general garden maintenance for a medium-sized yard.",
    category: "Gardening",
    status: "In Progress",
    location: "Staten Island, NY",
    dueDate: "2023-05-16",
    budget: 80,
    remote: false,
    createdAt: "2023-05-04",
    taskmaster: {
      id: 2,
      name: "Emily Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    tasker: {
      id: 6,
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    offers: 3,
  },
  {
    id: 8,
    title: "Data entry for customer database",
    description: "Need help transferring customer information from spreadsheets to our new CRM system.",
    category: "Admin Support",
    status: "Completed",
    location: "Remote",
    dueDate: "2023-05-12",
    budget: 150,
    remote: true,
    createdAt: "2023-05-03",
    taskmaster: {
      id: 8,
      name: "Jennifer Lee",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    tasker: {
      id: 4,
      name: "Jessica Davis",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    offers: 6,
   

 completedAt: "2023-05-11",
  },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<Task | null>(null);

  // Filter tasks based on search term and filters
  const filteredTasks = tasks.filter((task: Task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.taskmaster.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.tasker && task.tasker.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = categoryFilter === "all" || task.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || task.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Calculate statistics
  const openTasks = tasks.filter((t) => t.status === "Open").length;
  const inProgressTasks = tasks.filter((t) => t.status === "In Progress").length;
  const completedTasks = tasks.filter((t) => t.status === "Completed").length;
  const totalBudget = tasks.reduce((sum, t) => sum + t.budget, 0);

  const handleUpdateTaskStatus = (
    taskId: number,
    newStatus: Task["status"],
  ) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    );
    setIsDetailsDialogOpen(false);
  };

  const handleSaveTask = () => {
    if (!editTask) return;

    setTasks(
      tasks.map((task) =>
        task.id === editTask.id ? { ...editTask } : task,
      ),
    );
    setIsEditDialogOpen(false);
    setEditTask(null);
  };

  const getStatusBadgeVariant = (
    status: Task["status"],
  ): "outline" | "secondary" | "default" | "success" | "destructive" => {
    switch (status) {
      case "Open":
        return "outline";
      case "Assigned":
        return "secondary";
      case "In Progress":
        return "default";
      case "Completed":
        return "success";
      case "Cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getStatusIcon = (status: Task["status"]) => {
    switch (status) {
      case "Open":
      case "Assigned":
        return null;
      case "In Progress":
        return <Clock className="h-4 w-4 mr-1" />;
      case "Completed":
        return <CheckCircle className="h-4 w-4 mr-1" />;
      case "Cancelled":
        return <AlertCircle className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Tasks Management</h1>
        <Button asChild>
          <Link href="/admin/tasks/new">Create Task</Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{openTasks}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressTasks}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTasks}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalBudget.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search tasks..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Moving">Moving</SelectItem>
              <SelectItem value="Cleaning">Cleaning</SelectItem>
              <SelectItem value="Web Design">Web Design</SelectItem>
              <SelectItem value="Furniture Assembly">Furniture Assembly</SelectItem>
              <SelectItem value="Pet Care">Pet Care</SelectItem>
              <SelectItem value="Social Media">Social Media</SelectItem>
              <SelectItem value="Gardening">Gardening</SelectItem>
              <SelectItem value="Admin Support">Admin Support</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Open">Open</SelectItem>
              <SelectItem value="Assigned">Assigned</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Taskmaster</TableHead>
              <TableHead className="hidden md:table-cell">Tasker</TableHead>
              <TableHead className="hidden md:table-cell">Due Date</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No tasks found
                </TableCell>
              </TableRow>
            ) : (
              filteredTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <div className="font-medium">{task.title}</div>
                    <div className="text-sm text-muted-foreground line-clamp-1 md:hidden">
                      {task.taskmaster.name} • {task.dueDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{task.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(task.status)} className="flex items-center w-fit">
                      {getStatusIcon(task.status)}
                      {task.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={task.taskmaster.avatar} alt={task.taskmaster.name} />
                        <AvatarFallback>
                          {task.taskmaster.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{task.taskmaster.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {task.tasker ? (
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={task.tasker.avatar} alt={task.tasker.name} />
                          <AvatarFallback>
                            {task.tasker.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{task.tasker.name}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">Unassigned</span>
                    )}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{task.dueDate}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{task.budget}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog
                      open={isDetailsDialogOpen && selectedTask?.id === task.id}
                      onOpenChange={(open) => {
                        setIsDetailsDialogOpen(open);
                        if (!open) setSelectedTask(null);
                      }}
                    >
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedTask(task);
                              setIsDetailsDialogOpen(true);
                            }}
                          >
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setEditTask(task);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            Edit Task
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {task.status === "Open" && (
                            <DropdownMenuItem onClick={() => handleUpdateTaskStatus(task.id, "Assigned")}>
                              Mark as Assigned
                            </DropdownMenuItem>
                          )}
                          {(task.status === "Open" || task.status === "Assigned") && (
                            <DropdownMenuItem onClick={() => handleUpdateTaskStatus(task.id, "In Progress")}>
                              Mark as In Progress
                            </DropdownMenuItem>
                          )}
                          {task.status === "In Progress" && (
                            <DropdownMenuItem onClick={() => handleUpdateTaskStatus(task.id, "Completed")}>
                              Mark as Completed
                            </DropdownMenuItem>
                          )}
                          {task.status !== "Completed" && task.status !== "Cancelled" && (
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleUpdateTaskStatus(task.id, "Cancelled")}
                            >
                              Cancel Task
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>Task Details</DialogTitle>
                          <DialogDescription>Complete information about this task.</DialogDescription>
                        </DialogHeader>
                        {selectedTask && (
                          <div className="grid gap-6 py-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h2 className="text-xl font-semibold mb-1">{selectedTask.title}</h2>
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline">{selectedTask.category}</Badge>
                                  <Badge variant={getStatusBadgeVariant(selectedTask.status)}>
                                    {selectedTask.status}
                                  </Badge>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-medium text-lg">${selectedTask.budget}</div>
                                <div className="text-sm text-muted-foreground">
                                  Created on {new Date(selectedTask.createdAt).toLocaleDateString()}
                                </div>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label>Description</Label>
                              <div className="p-4 bg-muted rounded-md">{selectedTask.description}</div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                              <div className="space-y-4">
                                <div>
                                  <Label>Taskmaster</Label>
                                  <div className="flex items-center gap-3 mt-2">
                                    <Avatar>
                                      <AvatarImage
                                        src={selectedTask.taskmaster.avatar}
                                        alt={selectedTask.taskmaster.name}
                                      />
                                      <AvatarFallback>
                                        {selectedTask.taskmaster.name
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <div className="font-medium">{selectedTask.taskmaster.name}</div>
                                      <div className="text-sm text-muted-foreground">
                                        ID: {selectedTask.taskmaster.id}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div>
                                  <Label>Tasker</Label>
                                  {selectedTask.tasker ? (
                                    <div className="flex items-center gap-3 mt-2">
                                      <Avatar>
                                        <AvatarImage
                                          src={selectedTask.tasker.avatar}
                                          alt={selectedTask.tasker.name}
                                        />
                                        <AvatarFallback>
                                          {selectedTask.tasker.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <div className="font-medium">{selectedTask.tasker.name}</div>
                                        <div className="text-sm text-muted-foreground">
                                          ID: {selectedTask.tasker.id}
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="text-muted-foreground mt-2">Not assigned yet</div>
                                  )}
                                </div>
                              </div>

                              <div className="space-y-4">
                                <div>
                                  <Label>Location</Label>
                                  <div className="flex items-center gap-2 mt-2">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <span>{selectedTask.location}</span>
                                    {selectedTask.remote && <Badge variant="outline">Remote</Badge>}
                                  </div>
                                </div>

                                <div>
                                  <Label>Due Date</Label>
                                  <div className="flex items-center gap-2 mt-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span>{selectedTask.dueDate}</span>
                                  </div>
                                </div>

                                <div>
                                  <Label>Offers</Label>
                                  <div className="mt-2">
                                    <span className="font-medium">{selectedTask.offers}</span>{" "}
                                    <span className="text-muted-foreground">offers received</span>
                                  </div>
                                </div>

                                {selectedTask.status === "Completed" && selectedTask.completedAt && (
                                  <div>
                                    <Label>Completed On</Label>
                                    <div className="flex items-center gap-2 mt-2">
                                      <CheckCircle className="h-4 w-4 text-green-500" />
                                      <span>{selectedTask.completedAt}</span>
                                    </div>
                                  </div>
                                )}

                                {selectedTask.status === "Cancelled" && selectedTask.cancelledAt && (
                                  <div>
                                    <Label>Cancelled On</Label>
                                    <div className="flex items-center gap-2 mt-2">
                                      <AlertCircle className="h-4 w-4 text-red-500" />
                                      <span>{selectedTask.cancelledAt}</span>
                                    </div>
                                    {selectedTask.cancellationReason && (
                                      <div className="mt-1 text-sm text-muted-foreground">
                                        Reason: {selectedTask.cancellationReason}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsDetailsDialogOpen(false)}>
                            Close
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Dialog
                      open={isEditDialogOpen && editTask?.id === task.id}
                      onOpenChange={(open) => {
                        setIsEditDialogOpen(open);
                        if (!open) setEditTask(null);
                      }}
                    >
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Task</DialogTitle>
                          <DialogDescription>Make changes to the task details.</DialogDescription>
                        </DialogHeader>
                        {editTask && (
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="title">Title</Label>
                              <Input
                                id="title"
                                value={editTask.title}
                                onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="description">Description</Label>
                              <Textarea
                                id="description"
                                rows={4}
                                value={editTask.description}
                                onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="grid gap-2">
                                <Label htmlFor="category">Category</Label>
                                <Select
                                  value={editTask.category}
                                  onValueChange={(value) => setEditTask({ ...editTask, category: value })}
                                >
                                  <SelectTrigger id="category">
                                    <SelectValue placeholder="Select category" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Moving">Moving</SelectItem>
                                    <SelectItem value="Cleaning">Cleaning</SelectItem>
                                    <SelectItem value="Web Design">Web Design</SelectItem>
                                    <SelectItem value="Furniture Assembly">Furniture Assembly</SelectItem>
                                    <SelectItem value="Pet Care">Pet Care</SelectItem>
                                    <SelectItem value="Social Media">Social Media</SelectItem>
                                    <SelectItem value="Gardening">Gardening</SelectItem>
                                    <SelectItem value="Admin Support">Admin Support</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="status">Status</Label>
                                <Select
                                  value={editTask.status}
                                  onValueChange={(value: Task["status"]) => setEditTask({ ...editTask, status: value })}
                                >
                                  <SelectTrigger id="status">
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Open">Open</SelectItem>
                                    <SelectItem value="Assigned">Assigned</SelectItem>
                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                    <SelectItem value="Completed">Completed</SelectItem>
                                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="grid gap-2">
                                <Label htmlFor="location">Location</Label>
                                <Input
                                  id="location"
                                  value={editTask.location}
                                  onChange={(e) => setEditTask({ ...editTask, location: e.target.value })}
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="budget">Budget ($)</Label>
                                <Input
                                  id="budget"
                                  type="number"
                                  value={editTask.budget}
                                  onChange={(e) => setEditTask({ ...editTask, budget: Number(e.target.value) })}
                                />
                              </div>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="dueDate">Due Date</Label>
                              <Input
                                id="dueDate"
                                type="date"
                                value={editTask.dueDate}
                                onChange={(e) => setEditTask({ ...editTask, dueDate: e.target.value })}
                              />
                            </div>
                          </div>
                        )}
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleSaveTask} disabled={!editTask}>
                            Save Changes
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}