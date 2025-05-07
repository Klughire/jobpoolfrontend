"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, XCircle, Edit, User, Mail, Phone, MapPin, Building, Calendar } from "lucide-react"

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    address: "123 Main Street, Bangalore, Karnataka",
    company: "Tech Solutions Pvt Ltd",
    joinDate: "January 15, 2023",
    avatar: "/placeholder.svg?height=128&width=128",
  })

  const [verificationStatus, setVerificationStatus] = useState({
    pan: {
      completed: true,
      skipped: false,
      number: "ABCDE1234F",
      name: "John Doe",
      verified_at: "2023-05-15",
    },
    aadhar: {
      completed: true,
      skipped: false,
      number: "1234-5678-9012",
      verified_at: "2023-05-16",
    },
    bank: {
      completed: false,
      skipped: true,
      account_number: "",
      ifsc: "",
      bank_name: "",
      account_holder: "",
    },
  })

  // Function to mask sensitive information
  const maskString = (str: string, visibleStart = 0, visibleEnd = 0) => {
    if (!str) return ""
    const start = str.slice(0, visibleStart)
    const middle = str.slice(visibleStart, str.length - visibleEnd).replace(/./g, "*")
    const end = str.slice(str.length - visibleEnd)
    return start + middle + end
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Summary Card */}
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-col items-center space-y-2 text-center">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl">{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="mt-2">
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{user.name}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{user.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{user.address}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span>{user.company}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Joined: {user.joinDate}</span>
              </div>
            </div>

            <div className="pt-4">
              <h3 className="mb-2 text-sm font-medium">Verification Status</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">PAN Card</span>
                  {verificationStatus.pan.completed ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      <CheckCircle className="mr-1 h-3 w-3" /> Verified
                    </Badge>
                  ) : verificationStatus.pan.skipped ? (
                    <Badge variant="outline" className="bg-amber-50 text-amber-700">
                      <XCircle className="mr-1 h-3 w-3" /> Skipped
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-gray-100 text-gray-700">
                      Pending
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Aadhar</span>
                  {verificationStatus.aadhar.completed ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      <CheckCircle className="mr-1 h-3 w-3" /> Verified
                    </Badge>
                  ) : verificationStatus.aadhar.skipped ? (
                    <Badge variant="outline" className="bg-amber-50 text-amber-700">
                      <XCircle className="mr-1 h-3 w-3" /> Skipped
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-gray-100 text-gray-700">
                      Pending
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Bank Account</span>
                  {verificationStatus.bank.completed ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      <CheckCircle className="mr-1 h-3 w-3" /> Verified
                    </Badge>
                  ) : verificationStatus.bank.skipped ? (
                    <Badge variant="outline" className="bg-amber-50 text-amber-700">
                      <XCircle className="mr-1 h-3 w-3" /> Skipped
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-gray-100 text-gray-700">
                      Pending
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verification Details Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Verification Details</CardTitle>
            <CardDescription>View and manage your verification documents and information</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="pan">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="pan">PAN Card</TabsTrigger>
                <TabsTrigger value="aadhar">Aadhar</TabsTrigger>
                <TabsTrigger value="bank">Bank Account</TabsTrigger>
              </TabsList>

              <TabsContent value="pan" className="space-y-4 pt-4">
                <div className="flex flex-col gap-4 md:flex-row">
                  <div className="w-full md:w-1/3">
                    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                      <img
                        src="/placeholder.svg?height=160&width=240"
                        alt="PAN Card"
                        className="mx-auto h-40 w-60 rounded-md object-cover"
                      />
                    </div>
                  </div>
                  <div className="w-full space-y-4 md:w-2/3">
                    {verificationStatus.pan.completed ? (
                      <>
                        <div className="rounded-md bg-green-50 p-3 text-green-700">
                          <div className="flex items-center">
                            <CheckCircle className="mr-2 h-5 w-5" />
                            <div>
                              <p className="font-medium">Verification Complete</p>
                              <p className="text-sm">Verified on {verificationStatus.pan.verified_at}</p>
                            </div>
                          </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">PAN Number</p>
                            <p>{maskString(verificationStatus.pan.number, 2, 2)}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Name on PAN</p>
                            <p>{verificationStatus.pan.name}</p>
                          </div>
                        </div>
                      </>
                    ) : verificationStatus.pan.skipped ? (
                      <div className="rounded-md bg-amber-50 p-3 text-amber-700">
                        <div className="flex items-center">
                          <XCircle className="mr-2 h-5 w-5" />
                          <div>
                            <p className="font-medium">Verification Skipped</p>
                            <p className="text-sm">Some features may be limited</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-md bg-gray-100 p-3">
                        <div className="flex items-center">
                          <div>
                            <p className="font-medium">Verification Pending</p>
                            <p className="text-sm">Please complete your PAN verification</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {!verificationStatus.pan.completed && (
                      <Button asChild>
                        <Link href="/verification">
                          {verificationStatus.pan.skipped ? "Complete Verification" : "Start Verification"}
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="aadhar" className="space-y-4 pt-4">
                <div className="flex flex-col gap-4 md:flex-row">
                  <div className="w-full md:w-1/3">
                    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                      <img
                        src="/placeholder.svg?height=160&width=240"
                        alt="Aadhar Card"
                        className="mx-auto h-40 w-60 rounded-md object-cover"
                      />
                    </div>
                  </div>
                  <div className="w-full space-y-4 md:w-2/3">
                    {verificationStatus.aadhar.completed ? (
                      <>
                        <div className="rounded-md bg-green-50 p-3 text-green-700">
                          <div className="flex items-center">
                            <CheckCircle className="mr-2 h-5 w-5" />
                            <div>
                              <p className="font-medium">Verification Complete</p>
                              <p className="text-sm">Verified on {verificationStatus.aadhar.verified_at}</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Aadhar Number</p>
                          <p>{maskString(verificationStatus.aadhar.number, 0, 4)}</p>
                        </div>
                      </>
                    ) : verificationStatus.aadhar.skipped ? (
                      <div className="rounded-md bg-amber-50 p-3 text-amber-700">
                        <div className="flex items-center">
                          <XCircle className="mr-2 h-5 w-5" />
                          <div>
                            <p className="font-medium">Verification Skipped</p>
                            <p className="text-sm">Some features may be limited</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-md bg-gray-100 p-3">
                        <div className="flex items-center">
                          <div>
                            <p className="font-medium">Verification Pending</p>
                            <p className="text-sm">Please complete your Aadhar verification</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {!verificationStatus.aadhar.completed && (
                      <Button asChild>
                        <Link href="/verification">
                          {verificationStatus.aadhar.skipped ? "Complete Verification" : "Start Verification"}
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="bank" className="space-y-4 pt-4">
                <div className="flex flex-col gap-4 md:flex-row">
                  <div className="w-full md:w-1/3">
                    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                      <img
                        src="/placeholder.svg?height=160&width=240"
                        alt="Bank Details"
                        className="mx-auto h-40 w-60 rounded-md object-cover"
                      />
                    </div>
                  </div>
                  <div className="w-full space-y-4 md:w-2/3">
                    {verificationStatus.bank.completed ? (
                      <>
                        <div className="rounded-md bg-green-50 p-3 text-green-700">
                          <div className="flex items-center">
                            <CheckCircle className="mr-2 h-5 w-5" />
                            <div>
                              <p className="font-medium">Verification Complete</p>
                            </div>
                          </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Account Number</p>
                            <p>{maskString(verificationStatus.bank.account_number, 0, 4)}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">IFSC Code</p>
                            <p>{verificationStatus.bank.ifsc}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Bank Name</p>
                            <p>{verificationStatus.bank.bank_name}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Account Holder</p>
                            <p>{verificationStatus.bank.account_holder}</p>
                          </div>
                        </div>
                      </>
                    ) : verificationStatus.bank.skipped ? (
                      <div className="rounded-md bg-amber-50 p-3 text-amber-700">
                        <div className="flex items-center">
                          <XCircle className="mr-2 h-5 w-5" />
                          <div>
                            <p className="font-medium">Verification Skipped</p>
                            <p className="text-sm">Some features may be limited</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-md bg-gray-100 p-3">
                        <div className="flex items-center">
                          <div>
                            <p className="font-medium">Verification Pending</p>
                            <p className="text-sm">Please complete your bank account verification</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {!verificationStatus.bank.completed && (
                      <Button asChild>
                        <Link href="/verification">
                          {verificationStatus.bank.skipped ? "Complete Verification" : "Start Verification"}
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
