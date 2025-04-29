"use client"

import { useState } from "react"
import { Search, Download, MoreHorizontal, CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react"
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
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

// Mock data for payouts
const initialPayouts = [
  {
    id: 1,
    tasker: {
      id: 2,
      name: "Emily Johnson",
      email: "emily.j@example.com",
    },
    amount: 450.0,
    fee: 22.5,
    netAmount: 427.5,
    status: "Completed",
    method: "Bank Transfer",
    reference: "PAY-1234567890",
    date: "2023-04-15",
    completedDate: "2023-04-15",
  },
  {
    id: 2,
    tasker: {
      id: 3,
      name: "Michael Brown",
      email: "michael.b@example.com",
    },
    amount: 150.0,
    fee: 7.5,
    netAmount: 142.5,
    status: "Completed",
    method: "PayPal",
    reference: "PAY-0987654321",
    date: "2023-04-14",
    completedDate: "2023-04-14",
  },
  {
    id: 3,
    tasker: {
      id: 4,
      name: "Jessica Davis",
      email: "jessica.d@example.com",
    },
    amount: 300.0,
    fee: 15.0,
    netAmount: 285.0,
    status: "Pending",
    method: "Bank Transfer",
    reference: "PAY-5678901234",
    date: "2023-04-14",
    completedDate: null,
  },
  {
    id: 4,
    tasker: {
      id: 8,
      name: "Jennifer Lee",
      email: "jennifer.l@example.com",
    },
    amount: 600.0,
    fee: 30.0,
    netAmount: 570.0,
    status: "Completed",
    method: "PayPal",
    reference: "PAY-3456789012",
    date: "2023-04-13",
    completedDate: "2023-04-13",
  },
  {
    id: 5,
    tasker: {
      id: 6,
      name: "Sarah Williams",
      email: "sarah.w@example.com",
    },
    amount: 275.0,
    fee: 13.75,
    netAmount: 261.25,
    status: "Failed",
    method: "Bank Transfer",
    reference: "PAY-6789012345",
    date: "2023-04-12",
    completedDate: null,
  },
  {
    id: 6,
    tasker: {
      id: 2,
      name: "Emily Johnson",
      email: "emily.j@example.com",
    },
    amount: 525.0,
    fee: 26.25,
    netAmount: 498.75,
    status: "Processing",
    method: "Bank Transfer",
    reference: "PAY-9012345678",
    date: "2023-04-16",
    completedDate: null,
  },
  {
    id: 7,
    tasker: {
      id: 3,
      name: "Michael Brown",
      email: "michael.b@example.com",
    },
    amount: 180.0,
    fee: 9.0,
    netAmount: 171.0,
    status: "Pending",
    method: "PayPal",
    reference: "PAY-2345678901",
    date: "2023-04-16",
    completedDate: null,
  },
  {
    id: 8,
    tasker: {
      id: 8,
      name: "Jennifer Lee",
      email: "jennifer.l@example.com",
    },
    amount: 350.0,
    fee: 17.5,
    netAmount: 332.5,
    status: "Pending",
    method: "Bank Transfer",
    reference: "PAY-4567890123",
    date: "2023-04-16",
    completedDate: null,
  },
]

export default function PayoutsPage() {
  const [payouts, setPayouts] = useState(initialPayouts)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [methodFilter, setMethodFilter] = useState("all")
  const [selectedPayout, setSelectedPayout] = useState(null)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)

  // Filter payouts based on search term and filters
  const filteredPayouts = payouts.filter((payout) => {
    const matchesSearch =
      payout.tasker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payout.tasker.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payout.reference.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || payout.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesMethod = methodFilter === "all" || payout.method.toLowerCase() === methodFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesMethod
  })

  // Calculate statistics
  const totalPending = payouts
    .filter((p) => p.status === "Pending")
    .reduce((sum, p) => sum + p.amount, 0)
    .toFixed(2)
  const totalProcessing = payouts
    .filter((p) => p.status === "Processing")
    .reduce((sum, p) => sum + p.amount, 0)
    .toFixed(2)
  const totalCompleted = payouts
    .filter((p) => p.status === "Completed")
    .reduce((sum, p) => sum + p.amount, 0)
    .toFixed(2)
  const totalFailed = payouts
    .filter((p) => p.status === "Failed")
    .reduce((sum, p) => sum + p.amount, 0)
    .toFixed(2)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Payouts Management</h1>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalPending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalProcessing}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalCompleted}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalFailed}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search payouts..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={methodFilter} onValueChange={setMethodFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Methods</SelectItem>
              <SelectItem value="bank transfer">Bank Transfer</SelectItem>
              <SelectItem value="paypal">PayPal</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tasker</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Method</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayouts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No payouts found
                </TableCell>
              </TableRow>
            ) : (
              filteredPayouts.map((payout) => (
                <TableRow key={payout.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={payout.tasker.name} />
                        <AvatarFallback>
                          {payout.tasker.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{payout.tasker.name}</div>
                        <div className="text-sm text-muted-foreground">{payout.tasker.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">${payout.amount.toFixed(2)}</div>
                    <div className="text-sm text-muted-foreground">Net: ${payout.netAmount.toFixed(2)}</div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        payout.status === "Completed"
                          ? "success"
                          : payout.status === "Pending"
                            ? "outline"
                            : payout.status === "Processing"
                              ? "secondary"
                              : "destructive"
                      }
                    >
                      {payout.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{payout.method}</TableCell>
                  <TableCell className="hidden md:table-cell">{payout.date}</TableCell>
                  <TableCell className="text-right">
                    <Dialog
                      open={isDetailsDialogOpen && selectedPayout?.id === payout.id}
                      onOpenChange={(open) => {
                        setIsDetailsDialogOpen(open)
                        if (!open) setSelectedPayout(null)
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
                              setSelectedPayout(payout)
                              setIsDetailsDialogOpen(true)
                            }}
                          >
                            View Details
                          </DropdownMenuItem>
                          {payout.status === "Pending" && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Process Payout</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">Cancel Payout</DropdownMenuItem>
                            </>
                          )}
                          {payout.status === "Failed" && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Retry Payout</DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Payout Details</DialogTitle>
                          <DialogDescription>Complete information about this payout.</DialogDescription>
                        </DialogHeader>
                        {selectedPayout && (
                          <div className="grid gap-4 py-4">
                            <div className="flex items-center gap-4">
                              <Avatar className="h-12 w-12">
                                <AvatarImage
                                  src={`/placeholder.svg?height=48&width=48`}
                                  alt={selectedPayout.tasker.name}
                                />
                                <AvatarFallback>
                                  {selectedPayout.tasker.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium">{selectedPayout.tasker.name}</h3>
                                <p className="text-sm text-muted-foreground">{selectedPayout.tasker.email}</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Amount</Label>
                                <div className="font-medium">${selectedPayout.amount.toFixed(2)}</div>
                              </div>
                              <div>
                                <Label>Status</Label>
                                <div>
                                  <Badge
                                    variant={
                                      selectedPayout.status === "Completed"
                                        ? "success"
                                        : selectedPayout.status === "Pending"
                                          ? "outline"
                                          : selectedPayout.status === "Processing"
                                            ? "secondary"
                                            : "destructive"
                                    }
                                  >
                                    {selectedPayout.status}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Fee</Label>
                                <div className="font-medium">${selectedPayout.fee.toFixed(2)}</div>
                              </div>
                              <div>
                                <Label>Net Amount</Label>
                                <div className="font-medium">${selectedPayout.netAmount.toFixed(2)}</div>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Method</Label>
                                <div>{selectedPayout.method}</div>
                              </div>
                              <div>
                                <Label>Reference</Label>
                                <div className="font-mono text-sm">{selectedPayout.reference}</div>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Request Date</Label>
                                <div>{selectedPayout.date}</div>
                              </div>
                              <div>
                                <Label>Completed Date</Label>
                                <div>{selectedPayout.completedDate || "N/A"}</div>
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
