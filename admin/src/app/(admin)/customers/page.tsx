"use client";

import { useState, useEffect } from "react";
import { Search, MoreHorizontal, Mail, UserCheck, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";

interface Customer {
  user_id: string;
  user_fullname: string;
  user_email: string;
  tasker: boolean;
  task_manager: boolean;
  status: boolean;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  const fetchCustomers = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get("all-user-details/");
      setCustomers(response.data);
    } catch (error) {
      toast.error("An error occurred while fetching customers");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleStatusChange = async (userId: string, newStatus: boolean) => {
    try {
      setIsLoading(true);
      // Assuming there's an endpoint to update user status; adjust as needed
      const response = await axiosInstance.put(`update-user-status/${userId}/`, {
        status: newStatus,
      });

      if (response.data.status_code === 200) {
        toast.success(`User ${newStatus ? "deactivated" : "activated"} successfully`);
        setCustomers(
          customers.map((customer) =>
            customer.user_id === userId ? { ...customer, status: newStatus } : customer
          )
        );
      } else {
        toast.error(response.data.message || "Failed to update user status");
      }
    } catch (error) {
      toast.error("An error occurred while updating user status");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.user_fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.user_email.toLowerCase().includes(searchTerm.toLowerCase());

    const role = customer.tasker && customer.task_manager ? "both" :
                  customer.tasker ? "tasker" : 
                  customer.task_manager ? "taskmaster" : "none";
    const matchesRole = roleFilter === "all" || role.toLowerCase() === roleFilter.toLowerCase();

    const status = customer.status ? "inactive" : "active";
    const matchesStatus = statusFilter === "all" || status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesRole && matchesStatus;
  });

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter((c) => !c.status).length;
  const taskmasters = customers.filter((c) => c.task_manager).length;
  const taskers = customers.filter((c) => c.tasker).length;

  return (
    <div className="flex flex-col gap-4">
      <Toaster />
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
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search customers..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Select value={roleFilter} onValueChange={setRoleFilter} disabled={isLoading}>
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
          <Select value={statusFilter} onValueChange={setStatusFilter} disabled={isLoading}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
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
              {/* <TableHead className="text-right">Actions</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  Loading...
                </TableCell>
              </TableRow>
            ) : filteredCustomers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No customers found
                </TableCell>
              </TableRow>
            ) : (
              filteredCustomers.map((customer) => {
                const role = customer.tasker && customer.task_manager ? "Both" :
                             customer.tasker ? "Tasker" :
                             customer.task_manager ? "Taskmaster" : "None";
                return (
                  <TableRow key={customer.user_id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {customer.user_fullname
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{customer.user_fullname}</div>
                          <div className="text-sm text-muted-foreground md:hidden">{customer.user_email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="text-sm">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {customer.user_email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          role === "Taskmaster" ? "outline" :
                          role === "Tasker" ? "secondary" : "default"
                        }
                      >
                        {role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={customer.status ? "outline" : "default"}
                      >
                        {customer.status ? "Inactive" : "Active"}
                      </Badge>
                    </TableCell>
                    {/* <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" disabled={isLoading}>
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Send Message</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {customer.status ? (
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(customer.user_id, false)}
                            >
                              <UserCheck className="mr-2 h-4 w-4" />
                              Activate Account
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleStatusChange(customer.user_id, true)}
                            >
                              <UserX className="mr-2 h-4 w-4" />
                              Deactivate Account
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell> */}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}