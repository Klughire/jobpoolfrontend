"use client"

import { useState } from "react"
import { Search, MoreHorizontal, Mail, Phone, UserCheck, UserX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Define the Customer type for TypeScript
interface Customer {
  id: number
  name: string
  email: string
  phone: string
  role: string
  status: string
  tasksCreated: number
  tasksCompleted: number
  joinDate: string
  lastActive: string
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Function to handle status changes
  const handleStatusChange = (customerId: number, newStatus: string) => {
    setCustomers(
      customers.map((customer) =>
        customer.id === customerId ? { ...customer, status: newStatus } : customer
      )
    )
  }

  // Filter customers based on search term and filters
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)

    const matchesRole = roleFilter === "all" || customer.role.toLowerCase() === roleFilter.toLowerCase()
    const matchesStatus = statusFilter === "all" || customer.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesRole && matchesStatus
  })

  // Calculate statistics
  const totalCustomers = customers.length
  const activeCustomers = customers.filter((c) => c.status === "Active").length
  const taskmasters = customers.filter((c) => c.role === "Taskmaster" || c.role === "Both").length
  const taskers = customers.filter((c) => c.role === "Tasker" || c.role === "Both").length

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Customers Management</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCustomers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taskmasters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{taskmasters}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taskers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{taskers}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 https://lucide.dev/?h=4&w=4" />
          <Input
            type="search"
            placeholder="Search customers..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="taskmaster">Taskmaster</SelectItem>
              <SelectItem value="tasker">Tasker</SelectItem>
              <SelectItem value="both">Both</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden md:table-cell">Contact</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Tasks</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No customers found
                </TableCell>
              </TableRow>
            ) : (
              filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={customer.name} />
                        <AvatarFallback>
                          {customer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-muted-foreground md:hidden">{customer.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="text-sm">
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {customer.email}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <Phone className="h-3 w-3" />
                        {customer.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        customer.role === "Taskmaster"
                          ? "outline"
                          : customer.role === "Tasker"
                            ? "secondary"
                            : "default"
                      }
                    >
                      {customer.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        customer.status === "Active"
                          ? "default"
                          : customer.status === "Inactive"
                            ? "outline"
                            : "destructive"
                      }
                    >
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="text-sm">
                      {customer.role === "Taskmaster" || customer.role === "Both" ? (
                        <div>Created: {customer.tasksCreated}</div>
                      ) : null}
                      {customer.role === "Tasker" || customer.role === "Both" ? (
                        <div>Completed: {customer.tasksCompleted}</div>
                      ) : null}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Send Message</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {customer.status === "Active" ? (
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleStatusChange(customer.id, "Suspended")}
                          >
                            <UserX className="mr-2 h-4 w-4" />
                            Suspend Account
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            onClick={() => handleStatusChange(customer.id, "Active")}
                          >
                            <UserCheck className="mr-2 h-4 w-4" />
                            Activate Account
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}