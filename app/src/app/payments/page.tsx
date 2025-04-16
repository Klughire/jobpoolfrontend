"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Toaster } from "../../components/ui/sonner"
import { toast } from "sonner"
import { DollarSign, Clock, CheckCircle, AlertCircle, CreditCard, Calendar } from "lucide-react"

// Define interfaces for type safety
interface User {
  id: string;
  name: string;
}

interface Payment {
  id: string;
  taskId: string;
  taskTitle: string;
  amount: number;
  tasker: {
    id: string;
    name: string;
  };
  status: string;
  requestedAt?: string;
  completedAt?: string;
  transactionId?: string;
}

interface PaymentRequest {
  id: string;
  taskId: string;
  taskTitle: string;
  amount: number;
  poster: {
    id: string;
    name: string;
  };
  status: string;
  requestedAt: string;
}

interface PaymentMethod {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

export default function PaymentsPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  // Mock data for payments
  const pendingPayments: Payment[] = [
    {
      id: "payment1",
      taskId: "task1",
      taskTitle: "Help with moving furniture",
      amount: 50,
      tasker: {
        id: "user2",
        name: "Alex Johnson",
      },
      status: "pending",
      requestedAt: "2 days ago",
    },
    {
      id: "payment2",
      taskId: "task3",
      taskTitle: "Website debugging",
      amount: 120,
      tasker: {
        id: "user4",
        name: "Mike Smith",
      },
      status: "pending",
      requestedAt: "1 day ago",
    },
  ]

  const completedPayments: Payment[] = [
    {
      id: "payment3",
      taskId: "task2",
      taskTitle: "Fix leaky faucet",
      amount: 75,
      tasker: {
        id: "user3",
        name: "Sarah Williams",
      },
      status: "completed",
      completedAt: "1 week ago",
      transactionId: "TRX123456789",
    },
  ]

  const paymentRequests: PaymentRequest[] = [
    {
      id: "request1",
      taskId: "task4",
      taskTitle: "Dog walking",
      amount: 60,
      poster: {
        id: "user5",
        name: "Emma S.",
      },
      status: "requested",
      requestedAt: "3 hours ago",
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPaymentMethod((prev) => ({ ...prev, [name]: value }))
  }

  const handlePayment = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast.success("Payment Successful", {
        description: "Your payment has been processed successfully.",
      })
      setIsSubmitting(false)
    }, 1500)
  }

  const handleRequestPayment = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast.success("Payment Request Sent", {
        description: "Your payment request has been sent to the task poster.",
      })
      setIsSubmitting(false)
    }, 1500)
  }

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Toaster />
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-primary">JobPool</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/dashboard" className="text-sm font-medium hover:underline underline-offset-4">
              Dashboard
            </Link>
            <Link href="/browse" className="text-sm font-medium hover:underline underline-offset-4">
              Browse Tasks
            </Link>
            <Link href="/messages" className="text-sm font-medium hover:underline underline-offset-4">
              Messages
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 container py-6 md:py-10 px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
          <p className="text-muted-foreground">Manage your payments and payment methods</p>
        </div>

        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending">Pending Payments</TabsTrigger>
            <TabsTrigger value="completed">Payment History</TabsTrigger>
            <TabsTrigger value="requests">Payment Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4 mt-6">
            <h2 className="text-xl font-semibold">Pending Payments</h2>
            {pendingPayments.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <p className="text-muted-foreground mb-4">You don't have any pending payments</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {pendingPayments.map((payment) => (
                  <Card key={payment.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{payment.taskTitle}</CardTitle>
                        <Badge variant="outline">Pending</Badge>
                      </div>
                      <CardDescription className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>Requested {payment.requestedAt}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="font-bold">${payment.amount}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-4 w-4">
                            <AvatarFallback>{payment.tasker.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span>To: {payment.tasker.name}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" onClick={handlePayment} disabled={isSubmitting}>
                        {isSubmitting ? "Processing..." : "Pay Now"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}

            <h2 className="text-xl font-semibold mt-8">Payment Methods</h2>
            <Card>
              <CardHeader>
                <CardTitle>Add Payment Method</CardTitle>
                <CardDescription>Add a new credit or debit card</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      className="pl-9"
                      value={paymentMethod.cardNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input
                    id="cardName"
                    name="cardName"
                    placeholder="John Doe"
                    value={paymentMethod.cardName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="expiryDate"
                        name="expiryDate"
                        placeholder="MM/YY"
                        className="pl-9"
                        value={paymentMethod.expiryDate}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      name="cvv"
                      placeholder="123"
                      value={paymentMethod.cvv}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Save Card</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="completed" className="space-y-4 mt-6">
            <h2 className="text-xl font-semibold">Payment History</h2>
            {completedPayments.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <p className="text-muted-foreground mb-4">You don't have any completed payments</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {completedPayments.map((payment) => (
                  <Card key={payment.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{payment.taskTitle}</CardTitle>
                        <Badge variant="secondary">Completed</Badge>
                      </div>
                      <CardDescription className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        <span>Paid {payment.completedAt}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="font-bold">${payment.amount}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-4 w-4">
                            <AvatarFallback>{payment.tasker.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span>To: {payment.tasker.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Transaction ID: {payment.transactionId}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        View Receipt
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="requests" className="space-y-4 mt-6">
            <h2 className="text-xl font-semibold">Payment Requests</h2>
            {paymentRequests.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <p className="text-muted-foreground mb-4">You don't have any payment requests</p>
                  <Button onClick={() => router.push("/dashboard")}>View Your Tasks</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {paymentRequests.map((request) => (
                  <Card key={request.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{request.taskTitle}</CardTitle>
                        <Badge>Requested</Badge>
                      </div>
                      <CardDescription className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>Requested {request.requestedAt}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="font-bold">${request.amount}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-4 w-4">
                            <AvatarFallback>{request.poster.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span>From: {request.poster.name}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full"
                        onClick={handleRequestPayment}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Processing..." : "Send Payment Request"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}

            <h2 className="text-xl font-semibold mt-8">Request Payment</h2>
            <Card>
              <CardHeader>
                <CardTitle>Request Payment for Completed Task</CardTitle>
                <CardDescription>
                  Request payment for a task you've completed but haven't been paid for yet
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="taskId">Select Task</Label>
                  <select
                    id="taskId"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select a completed task</option>
                    <option value="task6">Lawn mowing</option>
                    <option value="task7">Computer setup</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount ($)</Label>
                  <Input id="amount" type="number" placeholder="e.g., 50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Input id="notes" placeholder="Add any additional information" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Submit Payment Request</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}