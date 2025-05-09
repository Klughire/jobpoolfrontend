// "use client"

// import type React from "react"
// import { useRouter } from "next/navigation"
// import { useState, useRef, useEffect } from "react"
// import Link from "next/link"
// import axiosInstance from "@/lib/axiosInstance"
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { CheckCircle, XCircle, Edit, User, Mail, Phone, MapPin, Calendar, Star, Camera, X } from "lucide-react"
// import useStore from '../../lib/Zustand'

// interface Address {
//   id: number
//   address: string
//   isDefault: boolean
// }

// interface UserProfile {
//   profile_id: string
//   name: string
//   email: string
//   phone: string
//   addresses: Address[]
//   avatar: string
//   joinDate: string
//   isEditing?: boolean
// }

// export default function ProfilePage() {
//   const router = useRouter()
//   const fileInputRef = useRef<HTMLInputElement>(null)
//   const [tempAvatar, setTempAvatar] = useState<string | null>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const { userId,logout } = useStore()

//   //console.log('Render: userId=', userId, 'isAuthenticated=', isAuthenticated)

//   const [user, setUser] = useState<UserProfile>({
//     profile_id: "",
//     name: "",
//     email: "",
//     phone: "",
//     addresses: [],
//     avatar: "/images/placeholder.svg?height=128&width=128",
//     joinDate: "",
//     isEditing: false,
//   })

//   const [verificationStatus, setVerificationStatus] = useState({
//     pan: {
//       completed: true,
//       skipped: false,
//       number: "ABCDE1234F",
//       name: "John Doe",
//       verified_at: "2023-05-15",
//     },
//     aadhar: {
//       completed: true,
//       skipped: false,
//       number: "1234-5678-9012",
//       verified_at: "2023-05-16",
//     },
//     bank: {
//       completed: false,
//       skipped: true,
//       account_number: "",
//       ifsc: "",
//       bank_name: "",
//       account_holder: "",
//     },
//   })

//   const [reviews, setReviews] = useState([
//     {
//       id: 1,
//       rating: 4,
//       comment: "Great service, very professional and responsive!",
//       date: "2023-08-15",
//       isEditing: false,
//     },
//     {
//       id: 2,
//       rating: 5,
//       comment: "Excellent work done on time and within budget.",
//       date: "2023-09-22",
//       isEditing: false,
//     },
//     {
//       id: 3,
//       rating: 3,
//       comment: "Good experience overall, but could improve on communication.",
//       date: "2023-10-05",
//       isEditing: false,
//     },
//   ])

//   // Check authentication status and redirect if not logged in
//   // useEffect(() => {
//   //   console.log('Auth check useEffect: userId=', userId, 'isAuthenticated=', isAuthenticated)
//   //   if (!isAuthenticated || !userId) {
//   //     console.warn('Not authenticated or no userId, redirecting to signin')
//   //     logout()
//   //     router.push("/signin")
//   //   }
//   // }, [userId, isAuthenticated, logout, router])

//   // Fetch profile data when userId is available
//   useEffect(() => {
//     console.log('Profile fetch useEffect: userId=', userId)
//     const fetchProfile = async () => {
//       if (!userId) {
//         console.warn('No userId, skipping profile fetch')
//         return
//       }

//       try {
//         setIsLoading(true)
//         console.log('Fetching profile for userId:', userId)
//         const response = await axiosInstance.get(`/profile?user_id=${userId}`)
//         const data = response.data
//         console.log('Profile data received:', data)
//         setUser({
//           profile_id: data.profile_id || "",
//           name: data.name || "",
//           email: data.email || "",
//           phone: data.phone_number || "",
//           addresses: data.addresses ? [{ id: 1, address: data.addresses.address || "", isDefault: true }] : [{ id: 1, address: "", isDefault: true }],
//           avatar: data.profile_img || "/images/placeholder.svg?height=128&width=128",
//           joinDate: data.tstamp ? new Date(data.tstamp).toLocaleDateString() : "",
//         })
//       } catch (err: any) {
//         console.error('Fetch profile error:', err.response?.data || err.message)
//         setError("Failed to load profile")
//         if (err.response?.status === 401) {
//           console.warn('Unauthorized, redirecting to signin')
//           logout()
//           router.push("/signin")
//         }
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchProfile()
//   }, [userId, logout, router])

//   const handleSignOut = () => {
//     console.log('Signing out')
//     logout()
//     router.push("/")
//   }

//   const maskString = (str: string, visibleStart = 0, visibleEnd = 0) => {
//     if (!str) return ""
//     const start = str.slice(0, visibleStart)
//     const middle = str.slice(visibleStart, str.length - visibleEnd).replace(/./g, "*")
//     const end = str.slice(str.length - visibleEnd)
//     return start + middle + end
//   }

//   const handleEditReview = (id: number) => {
//     setReviews(reviews.map((review) => (review.id === id ? { ...review, isEditing: !review.isEditing } : review)))
//   }

//   const saveReviewEdit = (id: number, newComment: string) => {
//     setReviews(
//       reviews.map((review) => (review.id === id ? { ...review, comment: newComment, isEditing: false } : review)),
//     )
//   }

//   const toggleEditProfile = () => {
//     setUser({ ...user, isEditing: !user.isEditing })
//     setTempAvatar(null)
//   }

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       const reader = new FileReader()
//       reader.onload = (event) => {
//         if (event.target?.result) {
//           setTempAvatar(event.target.result as string)
//         }
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   const triggerFileInput = () => {
//     fileInputRef.current?.click()
//   }

//   const removeSelectedImage = () => {
//     setTempAvatar(null)
//     if (fileInputRef.current) {
//       fileInputRef.current.value = ""
//     }
//   }

//   const addNewAddress = () => {
//     const newAddress = {
//       id: user.addresses.length + 1,
//       address: "",
//       isDefault: false,
//     }
//     setUser({
//       ...user,
//       addresses: [...user.addresses, newAddress],
//     })
//   }

//   const removeAddress = (id: number) => {
//     if (user.addresses.find((addr) => addr.id === id)?.isDefault) {
//       return
//     }
//     setUser({
//       ...user,
//       addresses: user.addresses.filter((addr) => addr.id !== id),
//     })
//   }

//   const setDefaultAddress = (id: number) => {
//     setUser({
//       ...user,
//       addresses: user.addresses.map((addr) => ({
//         ...addr,
//         isDefault: addr.id === id,
//       })),
//     })
//   }

//   const updateAddress = (id: number, newAddress: string) => {
//     setUser({
//       ...user,
//       addresses: user.addresses.map((addr) => (addr.id === id ? { ...addr, address: newAddress } : addr)),
//     })
//   }

//   const saveProfileChanges = async (e: React.FormEvent) => {
//     e.preventDefault()
//     console.log('saveProfileChanges triggered')
//     const form = e.target as HTMLFormElement
//     const formData = new FormData(form)
//     console.log('Form data:', Object.fromEntries(formData))

//     if (!user.profile_id) {
//       console.error('Profile ID is missing')
//       setError('Profile ID is required')
//       setIsLoading(false)
//       return
//     }

//     try {
//       setIsLoading(true)
//       const defaultAddress = user.addresses.find((addr) => addr.isDefault)?.address || ""
//       const updateFormData = new FormData()
//       updateFormData.append("profile_id", user.profile_id)
//       updateFormData.append("name", formData.get("name") as string)
//       updateFormData.append("phone_number", formData.get("phone") as string)
//       updateFormData.append("address", JSON.stringify({ address: defaultAddress }))
//       if (fileInputRef.current?.files?.[0]) {
//         updateFormData.append("file", fileInputRef.current.files[0])
//       }

//       console.log('Sending API request with data:', Object.fromEntries(updateFormData))
//       const response = await axiosInstance.put("/profile", updateFormData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       })

//       console.log('API response:', response.data)
//       const data = response.data
//       setUser({
//         ...user,
//         name: data.data.name,
//         phone: data.data.phone_number,
//         addresses: [{ id: 1, address: data.data.address?.address || "", isDefault: true }],
//         avatar: data.data.file_path || user.avatar,
//         isEditing: false,
//       })
//       setTempAvatar(null)
//     } catch (err: any) {
//       console.error('Update profile error:', err.response?.data || err.message)
//       setError("Failed to update profile")
//       if (err.response?.status === 401) {
//         console.warn('Unauthorized, redirecting to signin')
//         logout()
//         router.push("/signin")
//       }
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   if (isLoading) return <div>Loading...</div>
//   if (error) return <div>Error: {error}</div>

//   return (
//     <div className="flex min-h-screen flex-col">
//       <header className="border-b">
//         <div className="container flex h-16 items-center justify-between px-4 md:px-6">
//           <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl">
//             <span className="text-primary">JobPool</span>
//           </Link>
//           <div className="flex items-center gap-4">
//             <div className="flex items-center gap-2">
//               <Avatar className="h-8 w-8">
//                 <AvatarImage src={user.avatar} alt={user.name} />
//                 <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
//               </Avatar>
//               <span className="text-sm font-medium hidden md:inline-block">{user.name}</span>
//             </div>
//             <Button variant="outline" size="sm" onClick={handleSignOut}>
//               Sign Out
//             </Button>
//           </div>
//         </div>
//       </header>
//       <main className="flex-1 container py-6 md:py-10 px-4 md:px-6">
//         <div className="grid gap-6 md:grid-cols-3">
//           <Card className="md:col-span-1">
//             <CardHeader className="flex flex-col items-center space-y-2 text-center">
//               {user.isEditing ? (
//                 <div className="relative">
//                   <Avatar className="h-24 w-24">
//                     <AvatarImage src={tempAvatar || user.avatar} alt={user.name} />
//                     <AvatarFallback>
//                       {user.name
//                         .split(" ")
//                         .map((n) => n[0])
//                         .join("")}
//                     </AvatarFallback>
//                   </Avatar>
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <div className="rounded-full bg-black/50 p-2 cursor-pointer" onClick={triggerFileInput}>
//                       <Camera className="h-6 w-6 text-white" />
//                     </div>
//                   </div>
//                   <input
//                     type="file"
//                     ref={fileInputRef}
//                     className="hidden"
//                     accept="image/*"
//                     onChange={handleImageUpload}
//                   />
//                   {tempAvatar && (
//                     <button
//                       className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1"
//                       onClick={removeSelectedImage}
//                       type="button"
//                     >
//                       <X className="h-4 w-4 text-white" />
//                     </button>
//                   )}
//                 </div>
//               ) : (
//                 <Avatar className="h-24 w-24">
//                   <AvatarImage src={user.avatar} alt={user.name} />
//                   <AvatarFallback>
//                     {user.name
//                       .split(" ")
//                       .map((n) => n[0])
//                       .join("")}
//                   </AvatarFallback>
//                 </Avatar>
//               )}
//               <div>
//                 <CardTitle className="text-xl">{user.name}</CardTitle>
//                 <CardDescription>{user.email}</CardDescription>
//               </div>
//               <Button variant="outline" size="sm" className="mt-2" onClick={toggleEditProfile}>
//                 <Edit className="mr-2 h-4 w-4" />
//                 {user.isEditing ? "Cancel" : "Edit Profile"}
//               </Button>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               {user.isEditing ? (
//                 <form onSubmit={saveProfileChanges} className="space-y-4">
//                   <div className="space-y-2">
//                     <label className="text-sm font-medium" htmlFor="name">
//                       Name
//                     </label>
//                     <input
//                       id="name"
//                       name="name"
//                       className="w-full rounded-md border p-2 text-sm"
//                       defaultValue={user.name}
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <label className="text-sm font-medium" htmlFor="email">
//                       Email
//                     </label>
//                     <input
//                       id="email"
//                       name="email"
//                       type="email"
//                       className="w-full rounded-md border p-2 text-sm bg-gray-100"
//                       defaultValue={user.email}
//                       disabled
//                       readOnly
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <label className="text-sm font-medium" htmlFor="phone">
//                       Phone
//                     </label>
//                     <input
//                       id="phone"
//                       name="phone"
//                       className="w-full rounded-md border p-2 text-sm"
//                       defaultValue={user.phone}
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <label className="text-sm font-medium">Addresses</label>
//                     {user.addresses.map((addr) => (
//                       <div key={addr.id} className="flex items-center gap-2 mb-2">
//                         <textarea
//                           name={addr.isDefault ? "address" : `address-${addr.id}`}
//                           className="w-full rounded-md border p-2 text-sm"
//                           defaultValue={addr.address}
//                           rows={2}
//                           onChange={(e) => updateAddress(addr.id, e.target.value)}
//                         />
//                         <div className="flex flex-col gap-1">
//                           {!addr.isDefault && (
//                             <>
//                               <Button
//                                 type="button"
//                                 variant="outline"
//                                 size="sm"
//                                 onClick={() => setDefaultAddress(addr.id)}
//                               >
//                                 Set Default
//                               </Button>
//                               <Button type="button" variant="outline" size="sm" onClick={() => removeAddress(addr.id)}>
//                                 <X className="h-4 w-4" />
//                               </Button>
//                             </>
//                           )}
//                           {addr.isDefault && (
//                             <Badge variant="outline" className="ml-auto">
//                               Default
//                             </Badge>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                     <Button type="button" variant="outline" size="sm" onClick={addNewAddress}>
//                       Add Address
//                     </Button>
//                   </div>
//                   <div className="flex justify-end">
//                     <Button type="submit" size="sm" disabled={isLoading}>
//                       {isLoading ? "Saving..." : "Save Changes"}
//                     </Button>
//                   </div>
//                 </form>
//               ) : (
//                 <>
//                   <div className="space-y-2">
//                     <div className="flex items-center space-x-2 text-sm">
//                       <User className="h-4 w-4 text-muted-foreground" />
//                       <span>{user.name}</span>
//                     </div>
//                     <div className="flex items-center space-x-2 text-sm">
//                       <Mail className="h-4 w-4 text-muted-foreground" />
//                       <span>{user.email}</span>
//                     </div>
//                     <div className="flex items-center space-x-2 text-sm">
//                       <Phone className="h-4 w-4 text-muted-foreground" />
//                       <span>{user.phone}</span>
//                     </div>
//                     <div className="space-y-2">
//                       <div className="flex items-start space-x-2 text-sm">
//                         <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
//                         <div className="flex flex-col">
//                           <span className="font-medium">Addresses:</span>
//                           {user.addresses.map((addr) => (
//                             <div key={addr.id} className="flex items-center mt-1">
//                               <span>{addr.address}</span>
//                               {addr.isDefault && (
//                                 <Badge variant="outline" className="ml-2 text-xs px-2 py-1">
//                                 Default
//                               </Badge>
//                               )}
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                     <div className="flex items-center space-x-2 text-sm">
//                       <Calendar className="h-4 w-4 text-muted-foreground" />
//                       <span>Joined: {user.joinDate}</span>
//                     </div>
//                   </div>
//                   <div className="pt-4">
//                     <h3 className="mb-2 text-sm font-medium">Verification Status</h3>
//                     <div className="space-y-2">
//                       <div className="flex items-center justify-between">
//                         <span className="text-sm">PAN Card</span>
//                         {verificationStatus.pan.completed ? (
//                           <Badge variant="outline" className="bg-green-50 text-green-700">
//                             <CheckCircle className="mr-1 h-3 w-3" /> Verified
//                           </Badge>
//                         ) : verificationStatus.pan.skipped ? (
//                           <Badge variant="outline" className="bg-amber-50 text-amber-700">
//                             <XCircle className="mr-1 h-3 w-3" /> Skipped
//                           </Badge>
//                         ) : (
//                           <Badge variant="outline" className="bg-gray-100 text-gray-700">
//                             Pending
//                           </Badge>
//                         )}
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <span className="text-sm">Aadhar</span>
//                         {verificationStatus.aadhar.completed ? (
//                           <Badge variant="outline" className="bg-green-50 text-green-700">
//                             <CheckCircle className="mr-1 h-3 w-3" /> Verified
//                           </Badge>
//                         ) : verificationStatus.aadhar.skipped ? (
//                           <Badge variant="outline" className="bg-amber-50 text-amber-700">
//                             <XCircle className="mr-1 h-3 w-3" /> Skipped
//                           </Badge>
//                         ) : (
//                           <Badge variant="outline" className="bg-gray-100 text-gray-700">
//                             Pending
//                           </Badge>
//                         )}
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <span className="text-sm">Bank Account</span>
//                         {verificationStatus.bank.completed ? (
//                           <Badge variant="outline" className="bg-green-50 text-green-700">
//                             <CheckCircle className="mr-1 h-3 w-3" /> Verified
//                           </Badge>
//                         ) : verificationStatus.bank.skipped ? (
//                           <Badge variant="outline" className="bg-amber-50 text-amber-700">
//                             <XCircle className="mr-1 h-3 w-3" /> Skipped
//                           </Badge>
//                         ) : (
//                           <Badge variant="outline" className="bg-gray-100 text-gray-700">
//                             Pending
//                           </Badge>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </>
//               )}
//             </CardContent>
//           </Card>
//           <Card className="md:col-span-2">
//             <CardHeader>
//               <CardTitle>Verification Details</CardTitle>
//               <CardDescription>View and manage your verification documents and information</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <Tabs defaultValue="bank">
//                 <TabsList className="grid w-full grid-cols-2">
//                   <TabsTrigger value="bank">Bank Account</TabsTrigger>
//                   <TabsTrigger value="reviews">Reviews</TabsTrigger>
//                 </TabsList>
//                 <TabsContent value="bank" className="space-y-4 pt-4">
//                   <div className="flex flex-col gap-4 md:flex-row">
//                     <div className="w-full md:w-1/3">
//                       <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
//                         <img
//                           src="/images/placeholder.svg?height=160&width=240"
//                           alt="Bank Details"
//                           className="mx-auto h-40 w-60 rounded-md object-cover"
//                         />
//                       </div>
//                     </div>
//                     <div className="w-full space-y-4 md:w-2/3">
//                       {verificationStatus.bank.completed ? (
//                         <>
//                           <div className="rounded-md bg-green-50 p-3 text-green-700">
//                             <div className="flex items-center">
//                               <CheckCircle className="mr-2 h-5 w-5" />
//                               <div>
//                                 <p className="font-medium">Verification Complete</p>
//                               </div>
//                             </div>
//                           </div>
//                           <div className="grid gap-4 md:grid-cols-2">
//                             <div>
//                               <p className="text-sm font-medium text-muted-foreground">Account Number</p>
//                               <p>{maskString(verificationStatus.bank.account_number, 0, 4)}</p>
//                             </div>
//                             <div>
//                               <p className="text-sm font-medium text-muted-foreground">IFSC Code</p>
//                               <p>{verificationStatus.bank.ifsc}</p>
//                             </div>
//                             <div>
//                               <p className="text-sm font-medium text-muted-foreground">Bank Name</p>
//                               <p>{verificationStatus.bank.bank_name}</p>
//                             </div>
//                             <div>
//                               <p className="text-sm font-medium text-muted-foreground">Account Holder</p>
//                               <p>{verificationStatus.bank.account_holder}</p>
//                             </div>
//                           </div>
//                         </>
//                       ) : verificationStatus.bank.skipped ? (
//                         <div className="rounded-md bg-amber-50 p-3 text-amber-700">
//                           <div className="flex items-center">
//                             <XCircle className="mr-2 h-5 w-5" />
//                             <div>
//                               <p className="font-medium">Verification Skipped</p>
//                               <p className="text-sm">Some features may be limited</p>
//                             </div>
//                           </div>
//                         </div>
//                       ) : (
//                         <div className="rounded-md bg-gray-100 p-3">
//                           <div className="flex items-center">
//                             <div>
//                               <p className="font-medium">Verification Pending</p>
//                               <p className="text-sm">Please complete your bank account verification</p>
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                       {!verificationStatus.bank.completed && (
//                         <Button asChild>
//                           <Link href="/verification">
//                             {verificationStatus.bank.skipped ? "Complete Verification" : "Start Verification"}
//                           </Link>
//                         </Button>
//                       )}
//                     </div>
//                   </div>
//                 </TabsContent>
//                 <TabsContent value="reviews" className="space-y-4 pt-4">
//                   <div className="space-y-4">
//                     <div className="flex justify-between items-center">
//                       <h3 className="text-lg font-medium">Your Reviews</h3>
//                       <Button variant="outline" size="sm">
//                         <Edit className="mr-2 h-4 w-4" />
//                         Add Review
//                       </Button>
//                     </div>
//                     {reviews.map((review) => (
//                       <div key={review.id} className="rounded-lg border p-4 space-y-2">
//                         <div className="flex justify-between items-start">
//                           <div>
//                             <div className="flex items-center">
//                               {[...Array(5)].map((_, i) => (
//                                 <Star
//                                   key={i}
//                                   className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
//                                 />
//                               ))}
//                               <span className="ml-2 text-sm text-muted-foreground">{review.date}</span>
//                             </div>
//                           </div>
//                           <Button variant="ghost" size="sm" onClick={() => handleEditReview(review.id)}>
//                             <Edit className="h-4 w-4" />
//                           </Button>
//                         </div>
//                         {review.isEditing ? (
//                           <div className="space-y-2">
//                             <textarea
//                               className="w-full rounded-md border p-2 text-sm"
//                               defaultValue={review.comment}
//                               id={`review-${review.id}`}
//                               rows={3}
//                             />
//                             <div className="flex justify-end gap-2">
//                               <Button variant="outline" size="sm" onClick={() => handleEditReview(review.id)}>
//                                 Cancel
//                               </Button>
//                               <Button
//                                 size="sm"
//                                 onClick={() =>
//                                   saveReviewEdit(
//                                     review.id,
//                                     (document.getElementById(`review-${review.id}`) as HTMLTextAreaElement).value,
//                                   )
//                                 }
//                               >
//                                 Save
//                               </Button>
//                             </div>
//                           </div>
//                         ) : (
//                           <p className="text-sm">{review.comment}</p>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </TabsContent>
//               </Tabs>
//             </CardContent>
//           </Card>
//         </div>
//       </main>
//     </div>
//   )
// }




"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import axiosInstance from "@/lib/axiosInstance"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, XCircle, Edit, User, Mail, Phone, MapPin, Calendar, Star, Camera, X } from "lucide-react"
import useStore from '../../lib/Zustand'

interface Address {
  id: number
  address: string
  isDefault: boolean
}

interface UserProfile {
  profile_id: string
  name: string
  email: string
  phone: string
  addresses: Address[]
  avatar: string
  joinDate: string
  isEditing?: boolean
}

export default function ProfilePage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [tempAvatar, setTempAvatar] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { userId, logout } = useStore()

  const [user, setUser] = useState<UserProfile>({
    profile_id: "",
    name: "",
    email: "",
    phone: "",
    addresses: [],
    avatar: "/images/placeholder.svg?height=128&width=128",
    joinDate: "",
    isEditing: false,
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

  const [reviews, setReviews] = useState([
    {
      id: 1,
      rating: 4,
      comment: "Great service, very professional and responsive!",
      date: "2023-08-15",
      isEditing: false,
    },
    {
      id: 2,
      rating: 5,
      comment: "Excellent work done on time and within budget.",
      date: "2023-09-22",
      isEditing: false,
    },
    {
      id: 3,
      rating: 3,
      comment: "Good experience overall, but could improve on communication.",
      date: "2023-10-05",
      isEditing: false,
    },
  ])

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) {
        return
      }

      try {
        setIsLoading(true)
        const response = await axiosInstance.get(`/profile?user_id=${userId}`)
        const data = response.data
        setUser({
          profile_id: data.profile_id || "",
          name: data.name || "",
          email: data.email || "",
          phone: data.phone_number || "",
          addresses: Array.isArray(data.addresses) 
            ? data.addresses.map((addr: any, index: number) => ({
                id: index + 1,
                address: addr.address || "",
                isDefault: addr.isDefault || index === 0
              }))
            : [{ id: 1, address: "", isDefault: true }],
          avatar: data.profile_img || "/images/placeholder.svg?height=128&width=128",
          joinDate: data.tstamp ? new Date(data.tstamp).toLocaleDateString() : "",
        })
      } catch (err: any) {
        setError("Failed to load profile")
        if (err.response?.status === 401) {
          logout()
          router.push("/signin")
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [userId, logout, router])

  const handleSignOut = () => {
    logout()
    router.push("/")
  }

  const maskString = (str: string, visibleStart = 0, visibleEnd = 0) => {
    if (!str) return ""
    const start = str.slice(0, visibleStart)
    const middle = str.slice(visibleStart, str.length - visibleEnd).replace(/./g, "*")
    const end = str.slice(str.length - visibleEnd)
    return start + middle + end
  }

  const handleEditReview = (id: number) => {
    setReviews(reviews.map((review) => (review.id === id ? { ...review, isEditing: !review.isEditing } : review)))
  }

  const saveReviewEdit = (id: number, newComment: string) => {
    setReviews(
      reviews.map((review) => (review.id === id ? { ...review, comment: newComment, isEditing: false } : review)),
    )
  }

  const toggleEditProfile = () => {
    setUser({ ...user, isEditing: !user.isEditing })
    setTempAvatar(null)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setTempAvatar(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const removeSelectedImage = () => {
    setTempAvatar(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const addNewAddress = () => {
    const newAddress = {
      id: user.addresses.length + 1,
      address: "",
      isDefault: false,
    }
    setUser({
      ...user,
      addresses: [...user.addresses, newAddress],
    })
  }

  const removeAddress = (id: number) => {
    if (user.addresses.find((addr) => addr.id === id)?.isDefault) {
      return
    }
    setUser({
      ...user,
      addresses: user.addresses.filter((addr) => addr.id !== id),
    })
  }

  const setDefaultAddress = (id: number) => {
    setUser({
      ...user,
      addresses: user.addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      })),
    })
  }

  const updateAddress = (id: number, newAddress: string) => {
    setUser({
      ...user,
      addresses: user.addresses.map((addr) => (addr.id === id ? { ...addr, address: newAddress } : addr)),
    })
  }

  const saveProfileChanges = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    if (!user.profile_id) {
      setError('Profile ID is required')
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      const addresses = user.addresses.map(addr => ({
        address: addr.address,
        isDefault: addr.isDefault
      }))
      
      const updateFormData = new FormData()
      updateFormData.append("profile_id", user.profile_id)
      updateFormData.append("name", formData.get("name") as string)
      updateFormData.append("phone_number", formData.get("phone") as string)
      updateFormData.append("addresses", JSON.stringify(addresses))
      if (fileInputRef.current?.files?.[0]) {
        updateFormData.append("file", fileInputRef.current.files[0])
      }

      const response = await axiosInstance.put("/profile", updateFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      const data = response.data
      setUser({
        ...user,
        name: data.data.name,
        phone: data.data.phone_number,
        addresses: data.data.addresses.map((addr: any, index: number) => ({
          id: index + 1,
          address: addr.address || "",
          isDefault: addr.isDefault || false
        })),
        avatar: data.data.file_path || user.avatar,
        isEditing: false,
      })
      setTempAvatar(null)
    } catch (err: any) {
      setError("Failed to update profile")
      if (err.response?.status === 401) {
        logout()
        router.push("/signin")
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-primary">JobPool</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar} alt={user.name} />
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
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-1">
            <CardHeader className="flex flex-col items-center space-y-2 text-center">
              {user.isEditing ? (
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={tempAvatar || user.avatar} alt={user.name} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-full bg-black/50 p-2 cursor-pointer" onClick={triggerFileInput}>
                      <Camera className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  {tempAvatar && (
                    <button
                      className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1"
                      onClick={removeSelectedImage}
                      type="button"
                    >
                      <X className="h-4 w-4 text-white" />
                    </button>
                  )}
                </div>
              ) : (
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              )}
              <div>
                <CardTitle className="text-xl">{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="mt-2" onClick={toggleEditProfile}>
                <Edit className="mr-2 h-4 w-4" />
                {user.isEditing ? "Cancel" : "Edit Profile"}
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {user.isEditing ? (
                <form onSubmit={saveProfileChanges} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="name">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      className="w-full rounded-md border p-2 text-sm"
                      defaultValue={user.name}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="w-full rounded-md border p-2 text-sm bg-gray-100"
                      defaultValue={user.email}
                      disabled
                      readOnly
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="phone">
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      className="w-full rounded-md border p-2 text-sm"
                      defaultValue={user.phone}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Addresses</label>
                    {user.addresses.map((addr) => (
                      <div key={addr.id} className="flex items-center gap-2 mb-2">
                        <textarea
                          name={`address-${addr.id}`}
                          className="w-full rounded-md border p-2 text-sm"
                          defaultValue={addr.address}
                          rows={2}
                          onChange={(e) => updateAddress(addr.id, e.target.value)}
                        />
                        <div className="flex flex-col gap-1">
                          {!addr.isDefault && (
                            <>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setDefaultAddress(addr.id)}
                              >
                                Set Default
                              </Button>
                              <Button type="button" variant="outline" size="sm" onClick={() => removeAddress(addr.id)}>
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          {addr.isDefault && (
                            <Badge variant="outline" className="ml-auto">
                              Default
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={addNewAddress}>
                      Add Address
                    </Button>
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" size="sm" disabled={isLoading}>
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </form>
              ) : (
                <>
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
                    <div className="space-y-2">
                      <div className="flex items-start space-x-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div className="flex flex-col">
                          <span className="font-medium">Addresses:</span>
                          {user.addresses.map((addr) => (
                            <div key={addr.id} className="flex items-center mt-1">
                              <span>{addr.address}</span>
                              {addr.isDefault && (
                                <Badge variant="outline" className="ml-2 text-xs px-2 py-1">
                                  Default
                                </Badge>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
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
                </>
              )}
            </CardContent>
          </Card>
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Verification Details</CardTitle>
              <CardDescription>View and manage your verification documents and information</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="bank">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="bank">Bank Account</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                <TabsContent value="bank" className="space-y-4 pt-4">
                  <div className="flex flex-col gap-4 md:flex-row">
                    <div className="w-full md:w-1/3">
                      <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                        <img
                          src="/images/placeholder.svg?height=160&width=240"
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
                <TabsContent value="reviews" className="space-y-4 pt-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Your Reviews</h3>
                      <Button variant="outline" size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Add Review
                      </Button>
                    </div>
                    {reviews.map((review) => (
                      <div key={review.id} className="rounded-lg border p-4 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                />
                              ))}
                              <span className="ml-2 text-sm text-muted-foreground">{review.date}</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => handleEditReview(review.id)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                        {review.isEditing ? (
                          <div className="space-y-2">
                            <textarea
                              className="w-full rounded-md border p-2 text-sm"
                              defaultValue={review.comment}
                              id={`review-${review.id}`}
                              rows={3}
                            />
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm" onClick={() => handleEditReview(review.id)}>
                                Cancel
                              </Button>
                              <Button
                                size="sm"
                                onClick={() =>
                                  saveReviewEdit(
                                    review.id,
                                    (document.getElementById(`review-${review.id}`) as HTMLTextAreaElement).value,
                                  )
                                }
                              >
                                Save
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm">{review.comment}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}