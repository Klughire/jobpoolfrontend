// // "use client";



// // import { useState, useEffect, FormEvent, use } from "react";
// // import { useRouter } from "next/navigation";
// // import Link from "next/link";
// // import Image from "next/image";
// // import { toast } from "sonner";
// // import { Toaster } from "@/components/ui/sonner";
// // import { Button } from "@/components/ui/button";
// // import {
// //   Card,
// //   CardContent,
// //   CardDescription,
// //   CardFooter,
// //   CardHeader,
// //   CardTitle,
// // } from "@/components/ui/card";
// // import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// // import { Badge } from "@/components/ui/badge";
// // import { Textarea } from "@/components/ui/textarea";
// // import { Input } from "@/components/ui/input";
// // import {
// //   Clock,
// //   DollarSign,
// //   MapPin,
// //   Calendar,
// //   MessageSquare,
// //   Star,
// //   CheckCircle,
// //   AlertCircle,
// //   ChevronLeft,
// //   ChevronRight,
// //   X,
// // } from "lucide-react";

// // // Define interfaces for type safety
// // interface Image {
// //   id: string;
// //   url: string;
// //   alt: string;
// // }

// // interface User {
// //   id: string;
// //   name: string;
// //   rating: number;
// //   taskCount: number;
// //   joinedDate: string;
// // }

// // interface Offer {
// //   id: string;
// //   tasker: User;
// //   amount: number;
// //   message: string;
// //   createdAt: string;
// // }

// // interface Task {
// //   id: string;
// //   title: string;
// //   description: string;
// //   budget: number;
// //   location: string;
// //   status: "open" | "assigned" | "completed";
// //   postedAt: string;
// //   dueDate: string;
// //   category: string;
// //   images: Image[];
// //   poster: User;
// //   offers: Offer[];
// //   assignedTasker?: User;
// // }

// // // Mock task data
// // const getMockTask = (id: string): Task => ({
// //   id,
// //   title: "Help with moving furniture",
// //   description:
// //     "I need help moving a couch, a bed, and a few boxes from my current apartment to my new place about 2 miles away. The furniture is already disassembled and ready to go. I have a small SUV that we can use for transportation. Looking for someone who can help for about 2-3 hours this weekend.",
// //   budget: 50,
// //   location: "Brooklyn, NY",
// //   status: "open",
// //   postedAt: "2 days ago",
// //   dueDate: "This weekend",
// //   category: "Moving & Delivery",
// //   images: [
// //     {
// //       id: "img1",
// //       url: "/placeholder.svg?height=400&width=600",
// //       alt: "Couch that needs to be moved",
// //     },
// //     {
// //       id: "img2",
// //       url: "/placeholder.svg?height=400&width=600",
// //       alt: "Boxes packed and ready",
// //     },
// //     {
// //       id: "img3",
// //       url: "/placeholder.svg?height=400&width=600",
// //       alt: "New apartment location",
// //     },
// //   ],
// //   poster: {
// //     id: "user123",
// //     name: "Alex Johnson",
// //     rating: 4.8,
// //     taskCount: 15,
// //     joinedDate: "Jan 2023",
// //   },
// //   offers: [
// //     {
// //       id: "offer1",
// //       tasker: {
// //         id: "tasker1",
// //         name: "Mike Smith",
// //         rating: 4.9,
// //         taskCount: 32,
// //         joinedDate: "Mar 2022",
// //       },
// //       amount: 60,
// //       message:
// //         "I can help you move your furniture. I have experience with moving heavy items and have my own tools if needed. I'm available this Saturday morning.",
// //       createdAt: "1 day ago",
// //     },
// //     {
// //       id: "offer2",
// //       tasker: {
// //         id: "tasker2",
// //         name: "Sarah Williams",
// //         rating: 4.7,
// //         taskCount: 18,
// //         joinedDate: "Jun 2023",
// //       },
// //       amount: 45,
// //       message:
// //         "I can help with your move. I'm available Sunday afternoon. I've done several moving tasks before and can handle heavy furniture.",
// //       createdAt: "2 days ago",
// //     },
// //   ],
// // });

// // interface TaskDetailPageProps {
// //   params: Promise<{ id: string }>;
// // }

// // export default function TaskDetailPage({ params }: TaskDetailPageProps) {
// //   const router = useRouter();
// //   const { id } = use(params);
// //   const [user, setUser] = useState<User | null>(null);
// //   const [loading, setLoading] = useState<boolean>(true);
// //   const [task, setTask] = useState<Task | null>(null);
// //   const [offerAmount, setOfferAmount] = useState<string>("");
// //   const [offerMessage, setOfferMessage] = useState<string>("");
// //   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
// //   const [reviewRating, setReviewRating] = useState<number>(5);
// //   const [reviewComment, setReviewComment] = useState<string>("");
// //   const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
// //   const [showImageGallery, setShowImageGallery] = useState<boolean>(false);
// //   const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

// //   useEffect(() => {
// //     const checkUserAuth = () => {
// //       try {
// //         const storedUser = localStorage.getItem("user");
// //         if (storedUser) {
// //           setUser(JSON.parse(storedUser) as User);
// //         } else {
// //           router.push("/signin");
// //         }
// //       } catch (error) {
// //         console.error("Error checking authentication:", error);
// //         router.push("/signin");
// //       }
// //     };

// //     const loadTaskData = () => {
// //       try {
// //         setTask(getMockTask(id));
// //       } catch (error) {
// //         console.error("Error loading task data:", error);
// //         toast.error("Failed to load task details");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     checkUserAuth();
// //     loadTaskData();
// //   }, [router, id]);

// //   const handleSubmitOffer = (e: FormEvent) => {
// //     e.preventDefault();

// //     if (!offerAmount || !offerMessage) {
// //       toast.error("Please fill in all required fields");
// //       return;
// //     }

// //     setIsSubmitting(true);

// //     setTimeout(() => {
// //       toast.success("Your offer has been submitted!");

// //       if (user) {
// //         const newOffer: Offer = {
// //           id: `offer${Math.random().toString(36).substr(2, 9)}`,
// //           tasker: {
// //             id: user.id,
// //             name: user.name,
// //             rating: 4.5,
// //             taskCount: 5,
// //             joinedDate: "Apr 2023",
// //           },
// //           amount: parseFloat(offerAmount),
// //           message: offerMessage,
// //           createdAt: "Just now",
// //         };

// //         setTask((prevTask) =>
// //           prevTask ? { ...prevTask, offers: [...prevTask.offers, newOffer] } : prevTask
// //         );
// //       }

// //       setOfferAmount("");
// //       setOfferMessage("");
// //       setIsSubmitting(false);
// //     }, 1500);
// //   };

// //   const handleSubmitReview = (e: FormEvent) => {
// //     e.preventDefault();

// //     if (!reviewComment) {
// //       toast.error("Please provide a review comment");
// //       return;
// //     }

// //     setIsSubmitting(true);

// //     setTimeout(() => {
// //       toast.success("Your review has been submitted!");
// //       setIsSubmitting(false);
// //       router.push("/dashboard");
// //     }, 1500);
// //   };

// //   const acceptOffer = (offerId: string) => {
// //     setTimeout(() => {
// //       toast.success("You've accepted the offer!");

// //       setTask((prevTask) => {
// //         if (!prevTask) return prevTask;
// //         const acceptedOffer = prevTask.offers.find((offer) => offer.id === offerId);
// //         return {
// //           ...prevTask,
// //           status: "assigned",
// //           assignedTasker: acceptedOffer?.tasker,
// //         };
// //       });
// //     }, 1000);
// //   };

// //   const markAsComplete = () => {
// //     setTimeout(() => {
// //       toast.success("Task marked as complete!");

// //       setTask((prevTask) =>
// //         prevTask ? { ...prevTask, status: "completed" } : prevTask
// //       );

// //       if (isTaskPoster) {
// //         setShowPaymentModal(true);
// //       }
// //     }, 1000);
// //   };

// //   const handlePayment = () => {
// //     setIsSubmitting(true);

// //     setTimeout(() => {
// //       toast.success("Payment processed successfully");
// //       setShowPaymentModal(false);
// //       setIsSubmitting(false);
// //       router.push("/payments");
// //     }, 1500);
// //   };

// //   const handleMessageUser = () => {
// //     router.push("/messages");
// //   };

// //   const openImageGallery = (index: number) => {
// //     setCurrentImageIndex(index);
// //     setShowImageGallery(true);
// //   };

// //   const closeImageGallery = () => {
// //     setShowImageGallery(false);
// //   };

// //   const nextImage = (e: React.MouseEvent) => {
// //     e.stopPropagation();
// //     setCurrentImageIndex((prev) => (prev + 1) % (task?.images.length || 1));
// //   };

// //   const prevImage = (e: React.MouseEvent) => {
// //     e.stopPropagation();
// //     setCurrentImageIndex(
// //       (prev) => (prev - 1 + (task?.images.length || 1)) % (task?.images.length || 1)
// //     );
// //   };

// //   if (loading) {
// //     return <div className="flex h-screen items-center justify-center">Loading...</div>;
// //   }

// //   if (!user || !task) {
// //     return <div className="flex h-screen items-center justify-center">Unable to load task details</div>;
// //   }

// //   const isTaskPoster = user.id === task.poster.id;
// //   const hasSubmittedOffer = task.offers.some((offer) => offer.tasker.id === user.id);

// //   return (
// //     <div className="flex min-h-screen flex-col">
// //       <Toaster position="top-right" />
// //       <header className="border-b">
// //         <div className="container flex h-16 items-center justify-between px-4 md:px-6">
// //           <Link href="/" className="flex items-center gap-2 font-bold text-xl">
// //             <span className="text-primary">JobPool</span>
// //           </Link>
// //           <nav className="hidden md:flex gap-6">
// //             <Link href="/dashboard" className="text-sm font-medium hover:underline underline-offset-4">
// //               Dashboard
// //             </Link>
// //             <Link href="/browse" className="text-sm font-medium hover:underline underline-offset-4">
// //               Browse Tasks
// //             </Link>
// //             <Link href="/post-task" className="text-sm font-medium hover:underline underline-offset-4">
// //               Post a Task
// //             </Link>
// //           </nav>
// //         </div>
// //       </header>
// //       <main className="flex-1 container py-6 md:py-10 px-4 md:px-6">
// //         <div className="max-w-4xl mx-auto">
// //           <div className="mb-6">
// //             <Link href="/dashboard" className="text-sm text-muted-foreground hover:underline">
// //               ← Back to Dashboard
// //             </Link>
// //           </div>

// //           <div className="grid gap-6 md:grid-cols-3">
// //             <div className="md:col-span-2 space-y-6">
// //               <Card>
// //                 <CardHeader>
// //                   <div className="flex justify-between items-start">
// //                     <div>
// //                       <CardTitle className="text-2xl">{task.title}</CardTitle>
// //                       <CardDescription className="flex items-center gap-2 mt-1">
// //                         <Clock className="h-4 w-4" />
// //                         <span>Posted {task.postedAt}</span>
// //                         <Badge
// //                           variant={
// //                             task.status === "open"
// //                               ? "outline"
// //                               : task.status === "assigned"
// //                               ? "secondary"
// //                               : "default"
// //                           }
// //                         >
// //                           {task.status === "open"
// //                             ? "Open"
// //                             : task.status === "assigned"
// //                             ? "In Progress"
// //                             : "Completed"}
// //                         </Badge>
// //                       </CardDescription>
// //                     </div>
// //                   </div>
// //                 </CardHeader>
// //                 <CardContent className="space-y-4">
// //                   {task.images.length > 0 && (
// //                     <div className="space-y-2">
// //                       <h3 className="font-medium">Images</h3>
// //                       <div className="grid grid-cols-3 gap-2">
// //                         {task.images.map((image, index) => (
// //                           <div
// //                             key={image.id}
// //                             className="aspect-square rounded-md overflow-hidden border cursor-pointer relative"
// //                             onClick={() => openImageGallery(index)}
// //                           >
// //                             <Image
// //                               src={image.url}
// //                               alt={image.alt}
// //                               fill
// //                               sizes="(max-width: 768px) 100vw, 33vw"
// //                               className="object-cover"
// //                             />
// //                           </div>
// //                         ))}
// //                       </div>
// //                     </div>
// //                   )}
// //                   <div className="space-y-2">
// //                     <h3 className="font-medium">Description</h3>
// //                     <p className="text-muted-foreground">{task.description}</p>
// //                   </div>
// //                   <div className="grid grid-cols-2 gap-4">
// //                     <div className="space-y-1">
// //                       <h4 className="text-sm font-medium text-muted-foreground">Budget</h4>
// //                       <p className="flex items-center gap-1">
// //                         <DollarSign className="h-4 w-4" />{task.budget}
// //                       </p>
// //                     </div>
// //                     <div className="space-y-1">
// //                       <h4 className="text-sm font-medium text-muted-foreground">Location</h4>
// //                       <p className="flex items-center gap-1">
// //                         <MapPin className="h-4 w-4" />
// //                         {task.location}
// //                       </p>
// //                     </div>
// //                     <div className="space-y-1">
// //                       <h4 className="text-sm font-medium text-muted-foreground">Due Date</h4>
// //                       <p className="flex items-center gap-1">
// //                         <Calendar className="h-4 w-4" />
// //                         {task.dueDate}
// //                       </p>
// //                     </div>
// //                     <div className="space-y-1">
// //                       <h4 className="text-sm font-medium text-muted-foreground">Category</h4>
// //                       <p>{task.category}</p>
// //                     </div>
// //                   </div>
// //                 </CardContent>
// //                 {task.status === "assigned" && (
// //                   <CardFooter>
// //                     <Button className="w-full" onClick={handleMessageUser}>
// //                       <MessageSquare className="mr-2 h-4 w-4" />
// //                       Message {isTaskPoster ? task.assignedTasker?.name : task.poster.name}
// //                     </Button>
// //                   </CardFooter>
// //                 )}
// //               </Card>

// //               {task.status === "completed" && isTaskPoster && (
// //                 <Card>
// //                   <CardHeader>
// //                     <CardTitle>Leave a Review</CardTitle>
// //                     <CardDescription>Share your experience with the tasker</CardDescription>
// //                   </CardHeader>
// //                   <CardContent>
// //                     <form onSubmit={handleSubmitReview} className="space-y-4">
// //                       <div className="space-y-2">
// //                         <label htmlFor="rating">Rating</label>
// //                         <div className="flex items-center gap-1">
// //                           {[1, 2, 3, 4, 5].map((star) => (
// //                             <button
// //                               key={star}
// //                               type="button"
// //                               onClick={() => setReviewRating(star)}
// //                               className="focus:outline-none"
// //                             >
// //                               <Star
// //                                 className={`h-6 w-6 ${
// //                                   reviewRating >= star
// //                                     ? "fill-yellow-400 text-yellow-400"
// //                                     : "text-muted-foreground"
// //                                 }`}
// //                               />
// //                             </button>
// //                           ))}
// //                         </div>
// //                       </div>
// //                       <div className="space-y-2">
// //                         <label htmlFor="comment">Comment</label>
// //                         <Textarea
// //                           id="comment"
// //                           placeholder="Share your experience..."
// //                           value={reviewComment}
// //                           onChange={(e) => setReviewComment(e.target.value)}
// //                           rows={4}
// //                           required
// //                         />
// //                       </div>
// //                       <Button type="submit" disabled={isSubmitting}>
// //                         {isSubmitting ? "Submitting..." : "Submit Review"}
// //                       </Button>
// //                     </form>
// //                   </CardContent>
// //                 </Card>
// //               )}

// //               {task.status === "assigned" ? (
// //                 <Card>
// //                   <CardHeader>
// //                     <CardTitle>Task Progress</CardTitle>
// //                     <CardDescription>Track the progress of this task</CardDescription>
// //                   </CardHeader>
// //                   <CardContent className="space-y-4">
// //                     <div className="flex items-center justify-between">
// //                       <div className="flex items-center gap-2">
// //                         <CheckCircle className="h-5 w-5 text-green-500" />
// //                         <span>Task assigned</span>
// //                       </div>
// //                       <span className="text-sm text-muted-foreground">Completed</span>
// //                     </div>
// //                     <div className="flex items-center justify-between">
// //                       <div className="flex items-center gap-2">
// //                         <div className="h-5 w-5 rounded-full border-2 border-muted-foreground flex items-center justify-center">
// //                           <div className="h-2 w-2 rounded-full bg-muted-foreground"></div>
// //                         </div>
// //                         <span>In progress</span>
// //                       </div>
// //                       <span className="text-sm text-muted-foreground">Current</span>
// //                     </div>
// //                     <div className="flex items-center justify-between">
// //                       <div className="flex items-center gap-2">
// //                         <div className="h-5 w-5 rounded-full border-2 border-muted-foreground"></div>
// //                         <span>Completed</span>
// //                       </div>
// //                       <span className="text-sm text-muted-foreground">Pending</span>
// //                     </div>
// //                     <div className="flex items-center justify-between">
// //                       <div className="flex items-center gap-2">
// //                         <div className="h-5 w-5 rounded-full border-2 border-muted-foreground"></div>
// //                         <span>Payment</span>
// //                       </div>
// //                       <span className="text-sm text-muted-foreground">Pending</span>
// //                     </div>
// //                     <div className="flex items-center justify-between">
// //                       <div className="flex items-center gap-2">
// //                         <div className="h-5 w-5 rounded-full border-2 border-muted-foreground"></div>
// //                         <span>Reviewed</span>
// //                       </div>
// //                       <span className="text-sm text-muted-foreground">Pending</span>
// //                     </div>
// //                   </CardContent>
// //                   <CardFooter>
// //                     {isTaskPoster ? (
// //                       <Button className="w-full" onClick={markAsComplete}>
// //                         Mark as Complete
// //                       </Button>
// //                     ) : (
// //                       <Button className="w-full" onClick={markAsComplete}>
// //                         Request Completion
// //                       </Button>
// //                     )}
// //                   </CardFooter>
// //                 </Card>
// //               ) : (
// //                 <Card>
// //                   <CardHeader>
// //                     <CardTitle>Offers ({task.offers.length})</CardTitle>
// //                     <CardDescription>
// //                       {isTaskPoster ? "Choose the best offer for your task" : "View offers from other taskers"}
// //                     </CardDescription>
// //                   </CardHeader>
// //                   <CardContent className="space-y-4">
// //                     {task.offers.length === 0 ? (
// //                       <p className="text-center text-muted-foreground py-4">No offers yet</p>
// //                     ) : (
// //                       task.offers.map((offer) => (
// //                         <div key={offer.id} className="border rounded-lg p-4 space-y-3">
// //                           <div className="flex justify-between items-start">
// //                             <div className="flex items-center gap-2">
// //                               <Avatar className="h-8 w-8">
// //                                 <AvatarFallback>{offer.tasker.name.charAt(0)}</AvatarFallback>
// //                               </Avatar>
// //                               <div>
// //                                 <p className="font-medium">{offer.tasker.name}</p>
// //                                 <div className="flex items-center gap-1 text-sm text-muted-foreground">
// //                                   <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
// //                                   <span>
// //                                     {offer.tasker.rating} • {offer.tasker.taskCount} tasks
// //                                   </span>
// //                                 </div>
// //                               </div>
// //                             </div>
// //                             <div className="text-right">
// //                               <p className="font-bold">${offer.amount}</p>
// //                               <p className="text-xs text-muted-foreground">{offer.createdAt}</p>
// //                             </div>
// //                           </div>
// //                           <p className="text-sm">{offer.message}</p>
// //                           {isTaskPoster && task.status === "open" && (
// //                             <div className="flex gap-2">
// //                               <Button className="w-full" size="sm" onClick={() => acceptOffer(offer.id)}>
// //                                 Accept Offer
// //                               </Button>
// //                               <Button variant="outline" size="sm" onClick={handleMessageUser}>
// //                                 Message
// //                               </Button>
// //                             </div>
// //                           )}
// //                         </div>
// //                       ))
// //                     )}
// //                   </CardContent>
// //                   {!isTaskPoster && task.status === "open" && !hasSubmittedOffer && (
// //                     <CardFooter>
// //                       <form onSubmit={handleSubmitOffer} className="w-full space-y-4">
// //                         <div className="space-y-2">
// //                           <label htmlFor="offerAmount">Your Offer ($)</label>
// //                           <Input
// //                             id="offerAmount"
// //                             type="number"
// //                             placeholder="e.g., 50"
// //                             value={offerAmount}
// //                             onChange={(e) => setOfferAmount(e.target.value)}
// //                             required
// //                           />
// //                         </div>
// //                         <div className="space-y-2">
// //                           <label htmlFor="offerMessage">Message</label>
// //                           <Textarea
// //                             id="offerMessage"
// //                             placeholder="Introduce yourself and explain why you're a good fit for this task..."
// //                             value={offerMessage}
// //                             onChange={(e) => setOfferMessage(e.target.value)}
// //                             rows={4}
// //                             required
// //                           />
// //                         </div>
// //                         <Button type="submit" className="w-full" disabled={isSubmitting}>
// //                           {isSubmitting ? "Submitting..." : "Submit Offer"}
// //                         </Button>
// //                       </form>
// //                     </CardFooter>
// //                   )}
// //                 </Card>
// //               )}
// //             </div>

// //             <div className="space-y-6">
// //               <Card>
// //                 <CardHeader>
// //                   <CardTitle>About the Poster</CardTitle>
// //                 </CardHeader>
// //                 <CardContent className="space-y-4">
// //                   <div className="flex items-center gap-3">
// //                     <Avatar className="h-10 w-10">
// //                       <AvatarFallback>{task.poster.name.charAt(0)}</AvatarFallback>
// //                     </Avatar>
// //                     <div>
// //                       <p className="font-medium">{task.poster.name}</p>
// //                       <div className="flex items-center gap-1 text-sm text-muted-foreground">
// //                         <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
// //                         <span>{task.poster.rating}</span>
// //                       </div>
// //                     </div>
// //                   </div>
// //                   <div className="text-sm space-y-2">
// //                     <div className="flex justify-between">
// //                       <span className="text-muted-foreground">Member since</span>
// //                       <span>{task.poster.joinedDate}</span>
// //                     </div>
// //                     <div className="flex justify-between">
// //                       <span className="text-muted-foreground">Tasks posted</span>
// //                       <span>{task.poster.taskCount}</span>
// //                     </div>
// //                   </div>
// //                   {!isTaskPoster && (
// //                     <Button variant="outline" className="w-full" onClick={handleMessageUser}>
// //                       <MessageSquare className="mr-2 h-4 w-4" />
// //                       Contact
// //                     </Button>
// //                   )}
// //                 </CardContent>
// //               </Card>

// //               <Card>
// //                 <CardHeader>
// //                   <CardTitle>Safety Tips</CardTitle>
// //                 </CardHeader>
// //                 <CardContent>
// //                   <ul className="space-y-2 text-sm">
// //                     <li className="flex items-start gap-2">
// //                       <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5" />
// //                       <span>Never pay or communicate outside of JobPool</span>
// //                     </li>
// //                     <li className="flex items-start gap-2">
// //                       <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5" />
// //                       <span>Report suspicious behavior immediately</span>
// //                     </li>
// //                     <li className="flex items-start gap-2">
// //                       <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5" />
// //                       <span>Check reviews and ratings before accepting offers</span>
// //                     </li>
// //                   </ul>
// //                 </CardContent>
// //               </Card>
// //             </div>
// //           </div>
// //         </div>
// //       </main>

// //       {showPaymentModal && (
// //         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
// //           <Card className="w-full max-w-md">
// //             <CardHeader>
// //               <CardTitle>Complete Payment</CardTitle>
// //               <CardDescription>Pay the tasker for completing the task</CardDescription>
// //             </CardHeader>
// //             <CardContent className="space-y-4">
// //               <div className="border rounded-lg p-4 space-y-2">
// //                 <div className="flex justify-between">
// //                   <span className="text-muted-foreground">Task Amount</span>
// //                   <span className="font-medium">${task.budget.toFixed(2)}</span>
// //                 </div>
// //                 <div className="flex justify-between">
// //                   <span className="text-muted-foreground">Service Fee (10%)</span>
// //                   <span className="font-medium">${(task.budget * 0.1).toFixed(2)}</span>
// //                 </div>
// //                 <div className="border-t pt-2 mt-2 flex justify-between">
// //                   <span className="font-medium">Total</span>
// //                   <span className="font-bold">${(task.budget * 1.1).toFixed(2)}</span>
// //                 </div>
// //               </div>
// //               <div className="space-y-2">
// //                 <label className="text-sm font-medium">Payment Method</label>
// //                 <div className="flex items-center space-x-2 border rounded-md p-3">
// //                   <input
// //                     type="radio"
// //                     id="card1"
// //                     name="paymentMethod"
// //                     className="h-4 w-4"
// //                     defaultChecked
// //                   />
// //                   <label htmlFor="card1" className="flex-1">
// //                     <div className="flex items-center justify-between">
// //                       <span>Credit Card ending in 4242</span>
// //                       <span className="text-xs bg-muted px-2 py-1 rounded">Default</span>
// //                     </div>
// //                   </label>
// //                 </div>
// //                 <div className="flex items-center space-x-2 border rounded-md p-3">
// //                   <input type="radio" id="card2" name="paymentMethod" className="h-4 w-4" />
// //                   <label htmlFor="card2" className="flex-1">
// //                     <span>Add New Payment Method</span>
// //                   </label>
// //                 </div>
// //               </div>
// //             </CardContent>
// //             <CardFooter className="flex justify-between">
// //               <Button variant="outline" onClick={() => setShowPaymentModal(false)}>
// //                 Cancel
// //               </Button>
// //               <Button onClick={handlePayment} disabled={isSubmitting}>
// //                 {isSubmitting ? "Processing..." : "Pay Now"}
// //               </Button>
// //             </CardFooter>
// //           </Card>
// //         </div>
// //       )}

// //       {showImageGallery && task.images.length > 0 && (
// //         <div
// //           className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
// //           onClick={closeImageGallery}
// //         >
// //           <div className="relative max-w-4xl w-full">
// //             <button
// //               className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 z-10"
// //               onClick={closeImageGallery}
// //             >
// //               <X className="h-6 w-6" />
// //             </button>
// //             <div className="relative">
// //               <img
// //                 src={task.images[currentImageIndex].url}
// //                 alt={task.images[currentImageIndex].alt}
// //                 className="w-full h-auto max-h-screen object-contain"
// //               />
// //               <button
// //                 className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2"
// //                 onClick={prevImage}
// //               >
// //                 <ChevronLeft className="h-6 w-6" />
// //               </button>
// //               <button
// //                 className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2"
// //                 onClick={nextImage}
// //               >
// //                 <ChevronRight className="h-6 w-6" />
// //               </button>
// //             </div>
// //             <div className="text-center text-white mt-4">
// //               {currentImageIndex + 1} / {task.images.length}
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// "use client";

// import { useState, useEffect, FormEvent, use } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";
// import { toast } from "sonner";
// import { Toaster } from "@/components/ui/sonner";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Textarea } from "@/components/ui/textarea";
// import { Input } from "@/components/ui/input";
// import {
//   Clock,
//   DollarSign,
//   MapPin,
//   Calendar,
//   MessageSquare,
//   Star,
//   CheckCircle,
//   AlertCircle,
//   ChevronLeft,
//   ChevronRight,
//   X,
// } from "lucide-react";

// import axiosInstance from "../../../lib/axiosInstance";
// import useStore from "../../../lib/Zustand";

// // Define interfaces for type safety
// interface Image {
//   id: string;
//   url: string;
//   alt: string;
// }

// interface User {
//   id: string;
//   name: string;
//   rating: number;
//   taskCount: number;
//   joinedDate: string;
// }

// interface Offer {
//   id: string;
//   tasker: User;
//   amount: number;
//   message: string;
//   createdAt: string;
// }

// interface Task {
//   id: string;
//   title: string;
//   description: string;
//   budget: number;
//   location: string;
//   // status: "open" | "assigned" | "completed";
//   status: boolean;
//   postedAt: string;
//   dueDate: string;
//   category: string;
//   images: Image[];
//   poster: User;
//   offers: Offer[];
//   assignedTasker?: User;
// }

// interface Bid {
//   job_id: string;
//   bidder_id: string;
//   bid_description: string;
//   bid_amount: number;

// }

// interface ApiBidResponse {
//   status_code: number;
//   message: string;
//   timestamp: string;
//   data: Bid[];
// }

// // API response interface
// interface ApiJobResponse {
//   status_code: number;
//   message: string;
//   data: {
//     job_id: string;
//     posted_by: string;
//     job_title: string;
//     job_description: string;
//     job_category: string;
//     job_budget: number;
//     job_location: string;
//     job_due_date: string;
//     job_images: { urls: string[] };
//     status: boolean;
//     job_completion_status: number;
//     user_ref_id: string;
//   };
// }

// interface TaskDetailPageProps {
//   params: Promise<{ id: string }>;
// }

// export default function TaskDetailPage({ params }: TaskDetailPageProps) {
//   const router = useRouter();
//   const { id } = use(params);
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [task, setTask] = useState<Task | null>(null);
//   const [bids, setBids] = useState<Bid[]>([]);
//   const [offerAmount, setOfferAmount] = useState<string>("");
//   const [offerMessage, setOfferMessage] = useState<string>("");
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//   const [reviewRating, setReviewRating] = useState<number>(5);
//   const [reviewComment, setReviewComment] = useState<string>("");
//   const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
//   const [showImageGallery, setShowImageGallery] = useState<boolean>(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

//   const { userId } = useStore();

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       const parsedUser = JSON.parse(storedUser);
//       setUser(parsedUser);
//     } else {
//       router.push("/signin");
//     }
//   }, [router]);

//   useEffect(() => {
//     const loadTaskData = async () => {
//       try {
//         // Make the request using axiosInstance
//         const response = await axiosInstance.get(`get-job/${id}`);
//         const data: ApiJobResponse = response.data;

//         if (data.status_code !== 200) {
//           throw new Error(data.message);
//         }

//         const job = data.data;

//         // Map API response to Task interface
//         const mappedTask: Task = {
//           id: job.job_id,
//           title: job.job_title,
//           description: job.job_description,
//           budget: job.job_budget,
//           location: job.job_location,
//           status: job.status,
//           postedAt: "2 days ago", // Mocked since API doesn't provide
//           dueDate: job.job_due_date,
//           category: job.job_category,
//           images: job.job_images.urls.map((url: string, index: number) => ({
//             id: `img${index + 1}`,
//             url,
//             alt: `Job image ${index + 1}`,
//           })),
//           poster: {
//             id: job.user_ref_id, // Mocked since API doesn't provide user_id
//             name: job.posted_by,
//             rating: 4.8, // Mocked
//             taskCount: 15, // Mocked
//             joinedDate: "Jan 2023", // Mocked
//           },
//           offers: [],
//           assignedTasker: undefined, // Mocked
//         };

//         setTask(mappedTask);
//       } catch (error) {
//         console.error("Error loading task data:", error);
//         toast.error("Failed to load task details");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadTaskData();
//   }, [id]);

// // Add new state for offers
// const [offers, setOffers] = useState<Offer[]>([]);

// useEffect(() => {
//   console.log("useEffect running", { task, userId });

//   if (!task || !userId) {
//     console.log("useEffect skipped: task or userId missing", { task, userId });
//     return;
//   }

//   const isTaskPoster = task.poster.id === userId;
//   console.log("isTaskPoster:", isTaskPoster);

//   async function fetchBids() {
//     try {
//       const endpoint = isTaskPoster ? `/get-bids/${id}` : `/get-user-bids/${userId}`;
//       console.log("Fetching bids from:", endpoint);

//       const response = await axiosInstance.get(endpoint);
//       const data: ApiBidResponse = response.data;

//       console.log("API response:", data);

//       if (data.status_code !== 200) {
//         throw new Error(data.message);
//       }

//       const bids = data.data;
//       console.log("Fetched bids:", bids);

//       const taskBids = isTaskPoster ? bids : bids.filter((bid) => bid.job_id === id);

//       const newOffers: Offer[] = taskBids.map((bid, index) => ({
//         id: `bid${index + 1}`,
//         tasker: {
//           id: bid.bidder_id,
//           name: `User ${bid.bidder_id}`,
//           rating: 4.5,
//           taskCount: 5,
//           joinedDate: "Apr 2023",
//         },
//         amount: bid.bid_amount,
//         message: bid.bid_description,
//         createdAt: "Just now",
//       }));

//       setOffers(newOffers);
//       setBids(taskBids);
//     } catch (error: any) {
//       console.error("Error fetching bids:", error);
//       toast.error(`Failed to load bids: ${error.message || "Unknown error"}`);
//     } finally {
//       setLoading(false);
//     }
//   }

//   fetchBids();
// }, [id, task, userId]);

//   // useEffect(() => {
//   //   const fetchAllBids = async () => {
//   //     try {
//   //       const response = await axiosInstance.get(`/get-bids/${id}`);
//   //       const data: ApiBidResponse = response.data;

//   //       if (data.status_code !== 200) {
//   //         throw new Error(data.message);
//   //       }

//   //       const fetchedBids = data.data;
//   //       setBids(fetchedBids);

//   //       // Map bids to offers
//   //       const mappedOffers: Offer[] = fetchedBids.map((bid, index) => ({
//   //         id: `bid${index + 1}`, // Generate a temporary ID since API doesn't provide one
//   //         tasker: {
//   //           id: bid.bidder_id,
//   //           name: `User ${bid.bidder_id}`, // Mocked; replace with actual user data if available
//   //           rating: 4.5, // Mocked
//   //           taskCount: 5, // Mocked
//   //           joinedDate: "Apr 2023", // Mocked
//   //         },
//   //         amount: bid.bid_amount,
//   //         message: bid.bid_description,
//   //         createdAt: "Just now", // Mocked; replace with actual timestamp if available
//   //       }));

//   //       // Update task.offers with mapped offers
//   //       setTask((prevTask) =>
//   //         prevTask ? { ...prevTask, offers: mappedOffers } : prevTask
//   //       );
//   //     } catch (error) {
//   //       console.error("Error loading bids:", error);
//   //       toast.error("Failed to load bids");
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchAllBids();
//   // }, [id]);

//   const handleSubmitOffer = async (e: FormEvent) => {
//     e.preventDefault();
//     if (!offerAmount || !offerMessage) {
//       toast.error("Please fill in all required fields");
//       return;
//     }
//     // Convert offerAmount to a number for comparison
//     const offerAmountNumber = parseFloat(offerAmount);

//     // Validate offer amount against task budget
//     if (task && offerAmountNumber > task.budget) {
//       toast.error("Offer amount cannot be greater than the task budget.");
//       return;
//     }

//     const payload = {
//       job_ref_id: id,
//       bidder_ref_id: userId,
//       bid_amount: offerAmountNumber, // Use parsed number
//       bid_description: offerMessage,
//     };

//     setIsSubmitting(true); // Set submitting state before API call

//     try {
//       const response = await axiosInstance.post("/bid-a-job/", payload);

//       // Check if the API call was successful
//       if (response.data.status_code === 201) {
//         toast.success("Your offer has been submitted!");

//         if (user) {
//           const newOffer: Offer = {
//             id:
//               response.data.data?.offer_id ||
//               `offer${Math.random().toString(36).substr(2, 9)}`, // Use offer_id from response if available
//             tasker: {
//               id: user.id,
//               name: user.name,
//               rating: 4.5,
//               taskCount: 5,
//               joinedDate: "Apr 2023",
//             },
//             amount: parseFloat(offerAmount),
//             message: offerMessage,
//             createdAt: "Just now",
//           };

//           // Update task state with the new offer
//           setTask((prevTask) =>
//             prevTask
//               ? { ...prevTask, offers: [...prevTask.offers, newOffer] }
//               : prevTask
//           );
//         }

//         // Reset form fields
//         setOfferAmount("");
//         setOfferMessage("");
//       } else {
//         throw new Error(response.data.message || "Failed to submit offer");
//       }
//     } catch (error: any) {
//       // Handle errors (assuming handleAxiosError is not available, use custom handling)
//       console.error("Error submitting offer:", error);
//       toast.error(error.response?.data?.message || "Failed to submit offer");
//     } finally {
//       setIsSubmitting(false); // Reset submitting state
//     }
//   };

//   const handleSubmitReview = (e: FormEvent) => {
//     e.preventDefault();
//     if (!reviewComment) {
//       toast.error("Please provide a review comment");
//       return;
//     }
//     setIsSubmitting(true);
//     setTimeout(() => {
//       toast.success("Your review has been submitted!");
//       setIsSubmitting(false);
//       router.push("/dashboard");
//     }, 1500);
//   };

//   const acceptOffer = (offerId: string) => {
//     setTimeout(() => {
//       toast.success("You've accepted the offer!");
//       setTask((prevTask) => {
//         if (!prevTask) return prevTask;
//         const acceptedOffer = prevTask.offers.find(
//           (offer) => offer.id === offerId
//         );
//         return {
//           ...prevTask,
//           status: true,
//           assignedTasker: acceptedOffer?.tasker,
//         };
//       });
//     }, 1000);
//   };

//   const markAsComplete = () => {
//     setTimeout(() => {
//       toast.success("Task marked as complete!");
//       setTask((prevTask) =>
//         prevTask ? { ...prevTask, job_completion_status: 1 } : prevTask
//       );
//       if (isTaskPoster) {
//         setShowPaymentModal(true);
//       }
//     }, 1000);
//   };

//   const handlePayment = () => {
//     setIsSubmitting(true);
//     setTimeout(() => {
//       toast.success("Payment processed successfully");
//       setShowPaymentModal(false);
//       setIsSubmitting(false);
//       router.push("/payments");
//     }, 1500);
//   };

//   const handleMessageUser = () => {
//     router.push("/messages");
//   };

//   const openImageGallery = (index: number) => {
//     setCurrentImageIndex(index);
//     setShowImageGallery(true);
//   };

//   const closeImageGallery = () => {
//     setShowImageGallery(false);
//   };

//   const nextImage = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setCurrentImageIndex((prev) => (prev + 1) % (task?.images.length || 1));
//   };

//   const prevImage = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setCurrentImageIndex(
//       (prev) =>
//         (prev - 1 + (task?.images.length || 1)) % (task?.images.length || 1)
//     );
//   };

//   if (loading) {
//     return (
//       <div className="flex h-screen items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="flex h-screen items-center justify-center">
//         Please log in to view task details
//       </div>
//     );
//   }

//   if (!task) {
//     return (
//       <div className="flex h-screen items-center justify-center">
//         Unable to load task details
//       </div>
//     );
//   }

//   const isTaskPoster: boolean = task?.poster?.id === userId;

//   const hasSubmittedOffer = task.offers.some(
//     (offer) => offer.tasker.id === user.id
//   );

//   console.log("taskerid" , isTaskPoster);
//   return (
//     <div className="flex min-h-screen flex-col">
//       <Toaster position="top-right" />
//       <header className="border-b">
//         <div className="container flex h-16 items-center justify-between px-4 md:px-6">
//           <Link href="/" className="flex items-center gap-2 font-bold text-xl">
//             <span className="text-primary">JobPool</span>
//           </Link>
//           <nav className="hidden md:flex gap-6">
//             <Link
//               href="/dashboard"
//               className="text-sm font-medium hover:underline underline-offset-4"
//             >
//               Dashboard
//             </Link>
//             <Link
//               href="/browse"
//               className="text-sm font-medium hover:underline underline-offset-4"
//             >
//               Browse Tasks
//             </Link>
//             <Link
//               href="/post-task"
//               className="text-sm font-medium hover:underline underline-offset-4"
//             >
//               Post a Task
//             </Link>
//           </nav>
//         </div>
//       </header>
//       <main className="flex-1 container py-6 md:py-10 px-4 md:px-6">
//         <div className="max-w-4xl mx-auto">
//           <div className="mb-6">
//             <Link
//               href="/dashboard"
//               className="text-sm text-muted-foreground hover:underline"
//             >
//               ← Back to Dashboard
//             </Link>
//           </div>

//           <div className="grid gap-6 md:grid-cols-3">
//             <div className="md:col-span-2 space-y-6">
//               <Card>
//                 <CardHeader>
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <CardTitle className="text-2xl">{task.title}</CardTitle>
//                       <CardDescription className="flex items-center gap-2 mt-1">
//                         <Clock className="h-4 w-4" />
//                         <span>Posted {task.postedAt}</span>
//                         <Badge variant={task.status ? "secondary" : "outline"}>
//                           {task.status ? "Assigned" : "Open"}
//                         </Badge>
//                       </CardDescription>
//                     </div>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   {task.images.length > 0 && (
//                     <div className="space-y-2">
//                       <h3 className="font-medium">Images</h3>
//                       <div className="grid grid-cols-3 gap-2">
//                         {task.images.map((image, index) => (
//                           <div
//                             key={image.id}
//                             className="aspect-square rounded-md overflow-hidden border cursor-pointer relative"
//                             onClick={() => openImageGallery(index)}
//                           >
//                             <Image
//                               src={image.url}
//                               alt={image.alt}
//                               fill
//                               sizes="(max-width: 768px) 100vw, 33vw"
//                               className="object-cover"
//                             />
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                   <div className="space-y-2">
//                     <h3 className="font-medium">Description</h3>
//                     <p className="text-muted-foreground">{task.description}</p>
//                   </div>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="space-y-1">
//                       <h4 className="text-sm font-medium text-muted-foreground">
//                         Budget
//                       </h4>
//                       <p className="flex items-center gap-1">
//                         <DollarSign className="h-4 w-4" />
//                         {task.budget}
//                       </p>
//                     </div>
//                     <div className="space-y-1">
//                       <h4 className="text-sm font-medium text-muted-foreground">
//                         Location
//                       </h4>
//                       <p className="flex items-center gap-1">
//                         <MapPin className="h-4 w-4" />
//                         {task.location}
//                       </p>
//                     </div>
//                     <div className="space-y-1">
//                       <h4 className="text-sm font-medium text-muted-foreground">
//                         Due Date
//                       </h4>
//                       <p className="flex items-center gap-1">
//                         <Calendar className="h-4 w-4" />
//                         {task.dueDate}
//                       </p>
//                     </div>
//                     <div className="space-y-1">
//                       <h4 className="text-sm font-medium text-muted-foreground">
//                         Category
//                       </h4>
//                       <p>{task.category}</p>
//                     </div>
//                   </div>
//                 </CardContent>
//                 {task.status === true && (
//                   <CardFooter>
//                     <Button className="w-full" onClick={handleMessageUser}>
//                       <MessageSquare className="mr-2 h-4 w-4" />
//                       Message{" "}
//                       {isTaskPoster
//                         ? task.assignedTasker?.name
//                         : task.poster.name}
//                     </Button>
//                   </CardFooter>
//                 )}
//               </Card>

//               {task.status === true && isTaskPoster && (
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Leave a Review</CardTitle>
//                     <CardDescription>
//                       Share your experience with the tasker
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <form onSubmit={handleSubmitReview} className="space-y-4">
//                       <div className="space-y-2">
//                         <label htmlFor="rating">Rating</label>
//                         <div className="flex items-center gap-1">
//                           {[1, 2, 3, 4, 5].map((star) => (
//                             <button
//                               key={star}
//                               type="button"
//                               onClick={() => setReviewRating(star)}
//                               className="focus:outline-none"
//                             >
//                               <Star
//                                 className={`h-6 w-6 ${
//                                   reviewRating >= star
//                                     ? "fill-yellow-400 text-yellow-400"
//                                     : "text-muted-foreground"
//                                 }`}
//                               />
//                             </button>
//                           ))}
//                         </div>
//                       </div>
//                       <div className="space-y-2">
//                         <label htmlFor="comment">Comment</label>
//                         <Textarea
//                           id="comment"
//                           placeholder="Share your experience..."
//                           value={reviewComment}
//                           onChange={(e) => setReviewComment(e.target.value)}
//                           rows={4}
//                           required
//                         />
//                       </div>
//                       <Button type="submit" disabled={isSubmitting}>
//                         {isSubmitting ? "Submitting..." : "Submit Review"}
//                       </Button>
//                     </form>
//                   </CardContent>
//                 </Card>
//               )}

//               {task.status === true ? (
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Task Progress</CardTitle>
//                     <CardDescription>
//                       Track the progress of this task
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-2">
//                         <CheckCircle className="h-5 w-5 text-green-500" />
//                         <span>Task assigned</span>
//                       </div>
//                       <span className="text-sm text-muted-foreground">
//                         Completed
//                       </span>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-2">
//                         <div className="h-5 w-5 rounded-full border-2 border-muted-foreground flex items-center justify-center">
//                           <div className="h-2 w-2 rounded-full bg-muted-foreground"></div>
//                         </div>
//                         <span>In progress</span>
//                       </div>
//                       <span className="text-sm text-muted-foreground">
//                         Current
//                       </span>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-2">
//                         <div className="h-5 w-5 rounded-full border-2 border-muted-foreground"></div>
//                         <span>Completed</span>
//                       </div>
//                       <span className="text-sm text-muted-foreground">
//                         Pending
//                       </span>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-2">
//                         <div className="h-5 w-5 rounded-full border-2 border-muted-foreground"></div>
//                         <span>Payment</span>
//                       </div>
//                       <span className="text-sm text-muted-foreground">
//                         Pending
//                       </span>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-2">
//                         <div className="h-5 w-5 rounded-full border-2 border-muted-foreground"></div>
//                         <span>Reviewed</span>
//                       </div>
//                       <span className="text-sm text-muted-foreground">
//                         Pending
//                       </span>
//                     </div>
//                   </CardContent>
//                   <CardFooter>
//                     {isTaskPoster ? (
//                       <Button className="w-full" onClick={markAsComplete}>
//                         Mark as Complete
//                       </Button>
//                     ) : (
//                       <Button className="w-full" onClick={markAsComplete}>
//                         Request Completion
//                       </Button>
//                     )}
//                   </CardFooter>
//                 </Card>
//               ) : (
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Offers ({task.offers.length})</CardTitle>
//                     <CardDescription>
//                       {isTaskPoster
//                         ? "Choose the best offer for your task"
//                         : "View offers from other taskers"}
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     {task.offers.length === 0 ? (
//                       <p className="text-center text-muted-foreground py-4">
//                         No offers yet
//                       </p>
//                     ) : (
//                       task.offers.map((offer) => (
//                         <div key={offer.id} className="border rounded-lg p-4 space-y-3">
//                           <div className="flex justify-between items-start">
//                             <div className="flex items-center gap-2">
//                               <Avatar className="h-8 w-8">
//                                 <AvatarFallback>{offer.tasker.name.charAt(0)}</AvatarFallback>
//                               </Avatar>
//                               <div>
//                                 <p className="font-medium">{offer.tasker.name}</p>
//                                 <div className="flex items-center gap-1 text-sm text-muted-foreground">
//                                   <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
//                                   <span>
//                                     {offer.tasker.rating} • {offer.tasker.taskCount} tasks
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>
//                             <div className="text-right">
//                               <p className="font-bold">${offer.amount.toFixed(2)}</p>
//                               <p className="text-xs text-muted-foreground">{offer.createdAt}</p>
//                             </div>
//                           </div>
//                           <p className="text-sm">{offer.message}</p>
//                           {isTaskPoster && !task.status && (
//                             <div className="flex gap-2">
//                               <Button
//                                 className="w-full"
//                                 size="sm"
//                                 onClick={() => acceptOffer(offer.id)}
//                               >
//                                 Accept Offer
//                               </Button>
//                               <Button
//                                 variant="outline"
//                                 size="sm"
//                                 onClick={handleMessageUser}
//                               >
//                                 Message
//                               </Button>
//                             </div>
//                           )}
//                         </div>
//                       ))
//                       // task.offers.map((offer) => (
//                       //   <div
//                       //     key={offer.id}
//                       //     className="border rounded-lg p-4 space-y-3"
//                       //   >
//                       //     <div className="flex justify-between items-start">
//                       //       <div className="flex items-center gap-2">
//                       //         <Avatar className="h-8 w-8">
//                       //           <AvatarFallback>
//                       //             {offer.tasker.name.charAt(0)}
//                       //           </AvatarFallback>
//                       //         </Avatar>
//                       //         <div>
//                       //           <p className="font-medium">
//                       //             {offer.tasker.name}
//                       //           </p>
//                       //           <div className="flex items-center gap-1 text-sm text-muted-foreground">
//                       //             <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
//                       //             <span>
//                       //               {offer.tasker.rating} •{" "}
//                       //               {offer.tasker.taskCount} tasks
//                       //             </span>
//                       //           </div>
//                       //         </div>
//                       //       </div>
//                       //       <div className="text-right">
//                       //       <p className="font-bold">${offer.amount}</p>

//                       //         <p className="text-xs text-muted-foreground">
//                       //           {offer.createdAt}
//                       //         </p>
//                       //       </div>
//                       //     </div>
//                       //     <p className="text-sm">{offer.message}</p>
//                       //     {/* {isTaskPoster && task.status === false && (
//                       //       <div className="flex gap-2">
//                       //         <Button
//                       //           className="w-full"
//                       //           size="sm"
//                       //           onClick={() => acceptOffer(offer.id)}
//                       //         >
//                       //           Accept Offer
//                       //         </Button>
//                       //         <Button
//                       //           variant="outline"
//                       //           size="sm"
//                       //           onClick={handleMessageUser}
//                       //         >
//                       //           Message
//                       //         </Button>
//                       //       </div>
//                       //     )} */}
//                       //     task.offers.map(offer => (
//                       //       <div key={offer.id}>
//                       //         {/* Display offer details: tasker name, amount, message */}
//                       //         {isTaskPoster && !task.status && (
//                       //           <div>
//                       //             <Button onClick={() => acceptOffer(offer.id)}>Accept Offer</Button>
//                       //             <Button onClick={handleMessageUser}>Message</Button>
//                       //           </div>
//                       //         )}
//                       //       </div>
//                       //     ));
//                       //   </div>
//                       // ))
//                     )}
//                   </CardContent>
//                   {!isTaskPoster && !task.status && !hasSubmittedOffer && (
//                   <CardFooter>
//                     <form
//                       onSubmit={handleSubmitOffer}
//                       className="w-full space-y-4"
//                     >
//                       <div className="space-y-2">
//                         <label htmlFor="offerAmount">Your Offer ($)</label>
//                         <Input
//                           id="offerAmount"
//                           type="number"
//                           placeholder="e.g., 50"
//                           value={offerAmount}
//                           onChange={(e) => setOfferAmount(e.target.value)}
//                           required
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <label htmlFor="offerMessage">Message</label>
//                         <Textarea
//                           id="offerMessage"
//                           placeholder="Introduce yourself and explain why you're a good fit for this task..."
//                           value={offerMessage}
//                           onChange={(e) => setOfferMessage(e.target.value)}
//                           rows={4}
//                           required
//                         />
//                       </div>
//                       <Button
//                         type="submit"
//                         className="w-full"
//                         disabled={isSubmitting}
//                       >
//                         {isSubmitting ? "Submitting..." : "Submit Offer"}
//                       </Button>
//                     </form>
//                   </CardFooter>
//                    )}
//                 </Card>
//               )}
//             </div>

//             <div className="space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>About the Poster</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="flex items-center gap-3">
//                     <Avatar className="h-10 w-10">
//                       <AvatarFallback>
//                         {task.poster.name.charAt(0)}
//                       </AvatarFallback>
//                     </Avatar>
//                     <div>
//                       <p className="font-medium">{task.poster.name}</p>
//                       <div className="flex items-center gap-1 text-sm text-muted-foreground">
//                         <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
//                         <span>{task.poster.rating}</span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="text-sm space-y-2">
//                     <div className="flex justify-between">
//                       <span className="text-muted-foreground">
//                         Member since
//                       </span>
//                       <span>{task.poster.joinedDate}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-muted-foreground">
//                         Tasks posted
//                       </span>
//                       <span>{task.poster.taskCount}</span>
//                     </div>
//                   </div>
//                   {!isTaskPoster && (
//                     <Button
//                       variant="outline"
//                       className="w-full"
//                       onClick={handleMessageUser}
//                     >
//                       <MessageSquare className="mr-2 h-4 w-4" />
//                       Contact
//                     </Button>
//                   )}
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle>Safety Tips</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <ul className="space-y-2 text-sm">
//                     <li className="flex items-start gap-2">
//                       <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5" />
//                       <span>Never pay or communicate outside of JobPool</span>
//                     </li>
//                     <li className="flex items-start gap-2">
//                       <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5" />
//                       <span>Report suspicious behavior immediately</span>
//                     </li>
//                     <li className="flex items-start gap-2">
//                       <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5" />
//                       <span>
//                         Check reviews and ratings before accepting offers
//                       </span>
//                     </li>
//                   </ul>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </main>

//       {showPaymentModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-md">
//             <CardHeader>
//               <CardTitle>Complete Payment</CardTitle>
//               <CardDescription>
//                 Pay the tasker for completing the task
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="border rounded-lg p-4 space-y-2">
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Task Amount</span>
//                   <span className="font-medium">${task.budget.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">
//                     Service Fee (10%)
//                   </span>
//                   <span className="font-medium">
//                     ${(task.budget * 0.1).toFixed(2)}
//                   </span>
//                 </div>
//                 <div className="border-t pt-2 mt-2 flex justify-between">
//                   <span className="font-medium">Total</span>
//                   <span className="font-bold">
//                     ${(task.budget * 1.1).toFixed(2)}
//                   </span>
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Payment Method</label>
//                 <div className="flex items-center space-x-2 border rounded-md p-3">
//                   <input
//                     type="radio"
//                     id="card1"
//                     name="paymentMethod"
//                     className="h-4 w-4"
//                     defaultChecked
//                   />
//                   <label htmlFor="card1" className="flex-1">
//                     <div className="flex items-center justify-between">
//                       <span>Credit Card ending in 4242</span>
//                       <span className="text-xs bg-muted px-2 py-1 rounded">
//                         Default
//                       </span>
//                     </div>
//                   </label>
//                 </div>
//                 <div className="flex items-center space-x-2 border rounded-md p-3">
//                   <input
//                     type="radio"
//                     id="card2"
//                     name="paymentMethod"
//                     className="h-4 w-4"
//                   />
//                   <label htmlFor="card2" className="flex-1">
//                     <span>Add New Payment Method</span>
//                   </label>
//                 </div>
//               </div>
//             </CardContent>
//             <CardFooter className="flex justify-between">
//               <Button
//                 variant="outline"
//                 onClick={() => setShowPaymentModal(false)}
//               >
//                 Cancel
//               </Button>
//               <Button onClick={handlePayment} disabled={isSubmitting}>
//                 {isSubmitting ? "Processing..." : "Pay Now"}
//               </Button>
//             </CardFooter>
//           </Card>
//         </div>
//       )}

//       {showImageGallery && task.images.length > 0 && (
//         <div
//           className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
//           onClick={closeImageGallery}
//         >
//           <div className="relative max-w-4xl w-full">
//             <button
//               className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 z-10"
//               onClick={closeImageGallery}
//             >
//               <X className="h-6 w-6" />
//             </button>
//             <div className="relative">
//               <img
//                 src={task.images[currentImageIndex].url}
//                 alt={task.images[currentImageIndex].alt}
//                 className="w-full h-auto max-h-screen object-contain"
//               />
//               <button
//                 className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2"
//                 onClick={prevImage}
//               >
//                 <ChevronLeft className="h-6 w-6" />
//               </button>
//               <button
//                 className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2"
//                 onClick={nextImage}
//               >
//                 <ChevronRight className="h-6 w-6" />
//               </button>
//             </div>
//             <div className="text-center text-white mt-4">
//               {currentImageIndex + 1} / {task.images.length}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// "use client";

// import { useState, useEffect, FormEvent, use } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";
// import { toast } from "sonner";
// import { Toaster } from "@/components/ui/sonner";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Textarea } from "@/components/ui/textarea";
// import { Input } from "@/components/ui/input";
// import {
//   Clock,
//   DollarSign,
//   MapPin,
//   Calendar,
//   MessageSquare,
//   Star,
//   CheckCircle,
//   AlertCircle,
//   ChevronLeft,
//   ChevronRight,
//   X,
// } from "lucide-react";

// import axiosInstance from "../../../lib/axiosInstance";
// import useStore from "../../../lib/Zustand";

// // Define interfaces for type safety
// interface Image {
//   id: string;
//   url: string;
//   alt: string;
// }

// interface User {
//   id: string;
//   name: string;
//   rating: number;
//   taskCount: number;
//   joinedDate: string;
// }

// interface Offer {
//   id: string;
//   tasker: User;
//   amount: number;
//   message: string;
//   createdAt: string;
// }

// interface Task {
//   id: string;
//   title: string;
//   description: string;
//   budget: number;
//   location: string;
//   status: boolean;
//   postedAt: string;
//   dueDate: string;
//   category: string;
//   images: Image[];
//   poster: User;
//   offers: Offer[];
//   assignedTasker?: User;
// }

// interface Bid {
//   job_id: string;
//   bidder_id: string;
//   bid_description: string;
//   bid_amount: number;
// }

// interface ApiBidResponse {
//   status_code: number;
//   message: string;
//   timestamp: string;
//   data: Bid[];
// }

// interface ApiJobResponse {
//   status_code: number;
//   message: string;
//   data: {
//     job_id: string;
//     posted_by: string;
//     job_title: string;
//     job_description: string;
//     job_category: string;
//     job_budget: number;
//     job_location: string;
//     job_due_date: string;
//     job_images: { urls: string[] };
//     status: boolean;
//     job_completion_status: number;
//     user_ref_id: string;
//   };
// }

// // Optional: Interface for user details API response
// interface ApiUserResponse {
//   status_code: number;
//   message: string;
//   data: {
//     user_id: string;
//     name: string;
//     rating?: number;
//     task_count?: number;
//     joined_date?: string;
//   };
// }

// interface TaskDetailPageProps {
//   params: Promise<{ id: string }>;
// }

// export default function TaskDetailPage({ params }: TaskDetailPageProps) {
//   const router = useRouter();
//   const { id } = use(params);
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [task, setTask] = useState<Task | null>(null);
//   const [bids, setBids] = useState<Bid[]>([]);
//   const [offers, setOffers] = useState<Offer[]>([]); // Separate offers state
//   const [offerAmount, setOfferAmount] = useState<string>("");
//   const [offerMessage, setOfferMessage] = useState<string>("");
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//   const [reviewRating, setReviewRating] = useState<number>(5);
//   const [reviewComment, setReviewComment] = useState<string>("");
//   const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
//   const [showImageGallery, setShowImageGallery] = useState<boolean>(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

//   const { userId } = useStore();

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       const parsedUser = JSON.parse(storedUser);
//       setUser(parsedUser);
//     } else {
//       router.push("/signin");
//     }
//   }, [router]);

//   useEffect(() => {
//     const loadTaskData = async () => {
//       try {
//         const response = await axiosInstance.get(`/get-job/${id}/`);
//         const data: ApiJobResponse = response.data;

//         if (data.status_code !== 200) {
//           throw new Error(data.message);
//         }

//         const job = data.data;

//         const mappedTask: Task = {
//           id: job.job_id,
//           title: job.job_title,
//           description: job.job_description,
//           budget: job.job_budget,
//           location: job.job_location,
//           status: job.status,
//           postedAt: "2 days ago",
//           dueDate: job.job_due_date,
//           category: job.job_category,
//           images: job.job_images.urls.map((url: string, index: number) => ({
//             id: `img${index + 1}`,
//             url,
//             alt: `Job image ${index + 1}`,
//           })),
//           poster: {
//             id: job.user_ref_id,
//             name: job.posted_by,
//             rating: 4.8,
//             taskCount: 15,
//             joinedDate: "Jan 2023",
//           },
//           offers: [], // Initialize as empty, will be populated by bids effect
//           assignedTasker: undefined,
//         };

//         setTask(mappedTask);
//       } catch (error) {
//         console.error("Error loading task data:", error);
//         toast.error("Failed to load task details");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadTaskData();
//   }, [id]);

//   useEffect(() => {
//     console.log("useEffect running", { task, userId });

//     if (!task || !userId) {
//       console.log("useEffect skipped: task or userId missing", {
//         task,
//         userId,
//       });
//       return;
//     }

//     const isTaskPoster = task.poster.id === userId;
//     console.log("isTaskPoster:", isTaskPoster);

//     async function fetchBids() {
//       try {
//         const endpoint = isTaskPoster
//           ? `/get-bids/${id}/`
//           : `/get-user-bids/${userId}/`;
//         console.log("Fetching bids from:", endpoint);

//         const response = await axiosInstance.get(endpoint);
//         const data: ApiBidResponse = response.data;

//         console.log("API response:", data);

//         if (data.status_code !== 200) {
//           throw new Error(data.message);
//         }

//         const bids = data.data;
//         console.log("Fetched bids:", bids);

//         const taskBids = isTaskPoster
//           ? bids
//           : bids.filter((bid) => bid.job_id === id);

//         const newOffers: Offer[] = taskBids.map((bid, index) => ({
//           id: `bid${index + 1}`,
//           tasker: {
//             id: bid.bidder_id,
//             name: `User ${bid.bidder_id}`,
//             rating: 4.5,
//             taskCount: 5,
//             joinedDate: "Apr 2023",
//           },
//           amount: bid.bid_amount,
//           message: bid.bid_description,
//           createdAt: "Just now",
//         }));

//         setOffers(newOffers);
//         setBids(taskBids);
//         // Removed setTask call
//       } catch (error: any) {
//         console.error("Error fetching bids:", error);
//         toast.error(`Failed to load bids: ${error.message || "Unknown error"}`);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchBids();
//   }, [id, task, userId]);

//   const handleSubmitOffer = async (e: FormEvent) => {
//     e.preventDefault();
//     if (!offerAmount || !offerMessage) {
//       toast.error("Please fill in all required fields");
//       return;
//     }
//     const offerAmountNumber = parseFloat(offerAmount);

//     if (task && offerAmountNumber > task.budget) {
//       toast.error("Offer amount cannot be greater than the task budget.");
//       return;
//     }

//     const payload = {
//       job_ref_id: id,
//       bidder_ref_id: userId,
//       bid_amount: offerAmountNumber,
//       bid_description: offerMessage,
//     };

//     setIsSubmitting(true);

//     try {
//       const response = await axiosInstance.post("/bid-a-job/", payload);

//       if (response.data.status_code === 201) {
//         toast.success("Your offer has been submitted!");
        

//         if (user) {
//           const newOffer: Offer = {
//             id:
//               response.data.data?.offer_id ||
//               `offer${Math.random().toString(36).substr(2, 9)}`,
//             tasker: {
//               id: user.id,
//               name: user.name,
//               rating: 4.5,
//               taskCount: 5,
//               joinedDate: "Apr 2023",
//             },
//             amount: offerAmountNumber,
//             message: offerMessage,
//             createdAt: "Just now",
//           };

//           // Update both offers and task.offers
//           setOffers((prev) => [...prev, newOffer]);
//           // setTask((prevTask) =>
//           //   prevTask
//           //     ? { ...prevTask, offers: [...prevTask.offers, newOffer] }
//           //     : prevTask
//           // );
//         }

//         setOfferAmount("");
//         setOfferMessage("");
//       } else {
//         throw new Error(response.data.message || "Failed to submit offer");
//       }
//     } catch (error: any) {
//       console.error("Error submitting offer:", error);
//       toast.error(error.response?.data?.message || "Failed to submit offer");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleSubmitReview = (e: FormEvent) => {
//     e.preventDefault();
//     if (!reviewComment) {
//       toast.error("Please provide a review comment");
//       return;
//     }
//     setIsSubmitting(true);
//     setTimeout(() => {
//       toast.success("Your review has been submitted!");
//       setIsSubmitting(false);
//       router.push("/dashboard");
//     }, 1500);
//   };

//   const acceptOffer = (offerId: string) => {
//     setTimeout(() => {
//       toast.success("You've accepted the offer!");
//       setTask((prevTask) => {
//         if (!prevTask) return prevTask;
//         const acceptedOffer = offers.find((offer) => offer.id === offerId);
//         return {
//           ...prevTask,
//           status: true,
//           assignedTasker: acceptedOffer?.tasker,
//         };
//       });
//     }, 1000);
//   };

//   const markAsComplete = () => {
//     setTimeout(() => {
//       toast.success("Task marked as complete!");
//       setTask((prevTask) =>
//         prevTask ? { ...prevTask, job_completion_status: 1 } : prevTask
//       );
//       if (isTaskPoster) {
//         setShowPaymentModal(true);
//       }
//     }, 1000);
//   };

//   const handlePayment = () => {
//     setIsSubmitting(true);
//     setTimeout(() => {
//       toast.success("Payment processed successfully");
//       setShowPaymentModal(false);
//       setIsSubmitting(false);
//       router.push("/payments");
//     }, 1500);
//   };

//   const handleMessageUser = () => {
//     router.push("/messages");
//   };

//   const openImageGallery = (index: number) => {
//     setCurrentImageIndex(index);
//     setShowImageGallery(true);
//   };

//   const closeImageGallery = () => {
//     setShowImageGallery(false);
//   };

//   const nextImage = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setCurrentImageIndex((prev) => (prev + 1) % (task?.images.length || 1));
//   };

//   const prevImage = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setCurrentImageIndex(
//       (prev) =>
//         (prev - 1 + (task?.images.length || 1)) % (task?.images.length || 1)
//     );
//   };

//   if (loading) {
//     return (
//       <div className="flex h-screen items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="flex h-screen items-center justify-center">
//         Please log in to view task details
//       </div>
//     );
//   }

//   if (!task) {
//     return (
//       <div className="flex h-screen items-center justify-center">
//         Unable to load task details
//       </div>
//     );
//   }

//   const isTaskPoster: boolean = task.poster.id === userId;
//   const hasSubmittedOffer = offers.some((offer) => offer.tasker.id === user.id);

//   console.log("isTaskPoster:", isTaskPoster);

//   return (
//     <div className="flex min-h-screen flex-col">
//       <Toaster position="top-right" />
      
//       <main className="flex-1 container py-6 md:py-10 px-4 md:px-6">
//         <div className="max-w-4xl mx-auto">
//           <div className="mb-6">
//             <Link
//               href="/dashboard"
//               className="text-sm text-muted-foreground hover:underline"
//             >
//               ← Back to Dashboard
//             </Link>
//           </div>

//           <div className="grid gap-6 md:grid-cols-3">
//             <div className="md:col-span-2 space-y-6">
//               <Card>
//                 <CardHeader>
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <CardTitle className="text-2xl">{task.title}</CardTitle>
//                       <CardDescription className="flex items-center gap-2 mt-1">
//                         <Clock className="h-4 w-4" />
//                         <span>Posted {task.postedAt}</span>
//                         <Badge variant={task.status ? "secondary" : "outline"}>
//                           {task.status ? "Assigned" : "Open"}
//                         </Badge>
//                       </CardDescription>
//                     </div>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   {task.images.length > 0 && (
//                     <div className="space-y-2">
//                       <h3 className="font-medium">Images</h3>
//                       <div className="grid grid-cols-3 gap-2">
//                         {task.images.map((image, index) => (
//                           <div
//                             key={image.id}
//                             className="aspect-square rounded-md overflow-hidden border cursor-pointer relative"
//                             onClick={() => openImageGallery(index)}
//                           >
//                             <Image
//                               src={image.url}
//                               alt={image.alt}
//                               fill
//                               sizes="(max-width: 768px) 100vw, 33vw"
//                               className="object-cover"
//                             />
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                   <div className="space-y-2">
//                     <h3 className="font-medium">Description</h3>
//                     <p className="text-muted-foreground">{task.description}</p>
//                   </div>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="space-y-1">
//                       <h4 className="text-sm font-medium text-muted-foreground">
//                         Budget
//                       </h4>
//                       <p className="flex items-center gap-1">
//                         <DollarSign className="h-4 w-4" />
//                         {task.budget}
//                       </p>
//                     </div>
//                     <div className="space-y-1">
//                       <h4 className="text-sm font-medium text-muted-foreground">
//                         Location
//                       </h4>
//                       <p className="flex items-center gap-1">
//                         <MapPin className="h-4 w-4" />
//                         {task.location}
//                       </p>
//                     </div>
//                     <div className="space-y-1">
//                       <h4 className="text-sm font-medium text-muted-foreground">
//                         Due Date
//                       </h4>
//                       <p className="flex items-center gap-1">
//                         <Calendar className="h-4 w-4" />
//                         {task.dueDate}
//                       </p>
//                     </div>
//                     <div className="space-y-1">
//                       <h4 className="text-sm font-medium text-muted-foreground">
//                         Category
//                       </h4>
//                       <p>{task.category}</p>
//                     </div>
//                   </div>
//                 </CardContent>
//                 {task.status && (
//                   <CardFooter>
//                     <Button className="w-full" onClick={handleMessageUser}>
//                       <MessageSquare className="mr-2 h-4 w-4" />
//                       Message{" "}
//                       {isTaskPoster
//                         ? task.assignedTasker?.name
//                         : task.poster.name}
//                     </Button>
//                   </CardFooter>
//                 )}
//               </Card>

//               {task.status && isTaskPoster && (
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Leave a Review</CardTitle>
//                     <CardDescription>
//                       Share your experience with the tasker
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <form onSubmit={handleSubmitReview} className="space-y-4">
//                       <div className="space-y-2">
//                         <label htmlFor="rating">Rating</label>
//                         <div className="flex items-center gap-1">
//                           {[1, 2, 3, 4, 5].map((star) => (
//                             <button
//                               key={star}
//                               type="button"
//                               onClick={() => setReviewRating(star)}
//                               className="focus:outline-none"
//                             >
//                               <Star
//                                 className={`h-6 w-6 ${
//                                   reviewRating >= star
//                                     ? "fill-yellow-400 text-yellow-400"
//                                     : "text-muted-foreground"
//                                 }`}
//                               />
//                             </button>
//                           ))}
//                         </div>
//                       </div>
//                       <div className="space-y-2">
//                         <label htmlFor="comment">Comment</label>
//                         <Textarea
//                           id="comment"
//                           placeholder="Share your experience..."
//                           value={reviewComment}
//                           onChange={(e) => setReviewComment(e.target.value)}
//                           rows={4}
//                           required
//                         />
//                       </div>
//                       <Button type="submit" disabled={isSubmitting}>
//                         {isSubmitting ? "Submitting..." : "Submit Review"}
//                       </Button>
//                     </form>
//                   </CardContent>
//                 </Card>
//               )}

//               {task.status ? (
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Task Progress</CardTitle>
//                     <CardDescription>
//                       Track the progress of this task
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-2">
//                         <CheckCircle className="h-5 w-5 text-green-500" />
//                         <span>Task assigned</span>
//                       </div>
//                       <span className="text-sm text-muted-foreground">
//                         Completed
//                       </span>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-2">
//                         <div className="h-5 w-5 rounded-full border-2 border-muted-foreground flex items-center justify-center">
//                           <div className="h-2 w-2 rounded-full bg-muted-foreground"></div>
//                         </div>
//                         <span>In progress</span>
//                       </div>
//                       <span className="text-sm text-muted-foreground">
//                         Current
//                       </span>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-2">
//                         <div className="h-5 w-5 rounded-full border-2 border-muted-foreground"></div>
//                         <span>Completed</span>
//                       </div>
//                       <span className="text-sm text-muted-foreground">
//                         Pending
//                       </span>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-2">
//                         <div className="h-5 w-5 rounded-full border-2 border-muted-foreground"></div>
//                         <span>Payment</span>
//                       </div>
//                       <span className="text-sm text-muted-foreground">
//                         Pending
//                       </span>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-2">
//                         <div className="h-5 w-5 rounded-full border-2 border-muted-foreground"></div>
//                         <span>Reviewed</span>
//                       </div>
//                       <span className="text-sm text-muted-foreground">
//                         Pending
//                       </span>
//                     </div>
//                   </CardContent>
//                   <CardFooter>
//                     {isTaskPoster ? (
//                       <Button className="w-full" onClick={markAsComplete}>
//                         Mark as Complete
//                       </Button>
//                     ) : (
//                       <Button className="w-full" onClick={markAsComplete}>
//                         Request Completion
//                       </Button>
//                     )}
//                   </CardFooter>
//                 </Card>
//               ) : (
//                 // <Card>
//                 //   <CardHeader>
//                 //     <CardTitle>Offers ({offers.length})</CardTitle>
//                 //     <CardDescription>
//                 //       {isTaskPoster ? "Choose the best offer for your task" : "View offers from other taskers"}
//                 //     </CardDescription>
//                 //   </CardHeader>
//                 //   <CardContent className="space-y-4">
//                 //     {offers.length === 0 ? (
//                 //       <p className="text-center text-muted-foreground py-4">No offers yet</p>
//                 //     ) : (
//                 //       offers.map((offer) => (
//                 //         <div key={offer.id} className="border rounded-lg p-4 space-y-3">
//                 //           <div className="flex justify-between items-start">
//                 //             <div className="flex items-center gap-2">
//                 //               <Avatar className="h-8 w-8">
//                 //                 <AvatarFallback>{offer.tasker.name.charAt(0)}</AvatarFallback>
//                 //               </Avatar>
//                 //               <div>
//                 //                 <p className="font-medium">{offer.tasker.name}</p>
//                 //                 <div className="flex items-center gap-1 text-sm text-muted-foreground">
//                 //                   <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
//                 //                   <span>
//                 //                     {offer.tasker.rating} • {offer.tasker.taskCount} tasks
//                 //                   </span>
//                 //                 </div>
//                 //               </div>
//                 //             </div>
//                 //             <div className="text-right">
//                 //               <p className="font-bold">${offer.amount.toFixed(2)}</p>
//                 //               <p className="text-xs text-muted-foreground">{offer.createdAt}</p>
//                 //             </div>
//                 //           </div>
//                 //           <p className="text-sm">{offer.message}</p>
//                 //           {isTaskPoster && !task.status && (
//                 //             <div className="flex gap-2">
//                 //               <Button
//                 //                 className="w-full"
//                 //                 size="sm"
//                 //                 onClick={() => acceptOffer(offer.id)}
//                 //               >
//                 //                 Accept Offer
//                 //               </Button>
//                 //               <Button
//                 //                 variant="outline"
//                 //                 size="sm"
//                 //                 onClick={handleMessageUser}
//                 //               >
//                 //                 Message
//                 //               </Button>
//                 //             </div>
//                 //           )}
//                 //         </div>
//                 //       ))
//                 //     )}
//                 //   </CardContent>
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Offers ({offers.length})</CardTitle>
//                     <CardDescription>
//                       {isTaskPoster
//                         ? "Choose the best offer for your task"
//                         : "View offers from other taskers"}
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     {offers.length === 0 ? (
//                       <p className="text-center text-muted-foreground py-4">
//                         No offers yet
//                       </p>
//                     ) : (
//                       offers.map((offer) => (
//                         <div
//                           key={offer.id}
//                           className="border rounded-lg p-4 space-y-3"
//                         >
//                           <div className="flex justify-between items-start">
//                             <div className="flex items-center gap-2">
//                               <Avatar className="h-8 w-8">
//                                 <AvatarFallback>
//                                   {offer.tasker.name.charAt(0)}
//                                 </AvatarFallback>
//                               </Avatar>
//                               <div>
//                                 <p className="font-medium">
//                                   {offer.tasker.name}
//                                 </p>
//                                 <div className="flex items-center gap-1 text-sm text-muted-foreground">
//                                   <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
//                                   <span>
//                                     {offer.tasker.rating} •{" "}
//                                     {offer.tasker.taskCount} tasks
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>
//                             <div className="text-right">
//                               <p className="font-bold">
//                                 ${offer.amount.toFixed(2)}
//                               </p>
//                               <p className="text-xs text-muted-foreground">
//                                 {offer.createdAt}
//                               </p>
//                             </div>
//                           </div>
//                           <p className="text-sm">{offer.message}</p>
//                           {isTaskPoster && !task.status && (
//                             <div className="flex gap-2">
//                               <Button
//                                 className="w-full"
//                                 size="sm"
//                                 onClick={() => acceptOffer(offer.id)}
//                               >
//                                 Accept Offer
//                               </Button>
//                               <Button
//                                 variant="outline"
//                                 size="sm"
//                                 onClick={handleMessageUser}
//                               >
//                                 Message
//                               </Button>
//                             </div>
//                           )}
//                         </div>
//                       ))
//                     )}
//                   </CardContent>
//                   {!isTaskPoster && !task.status && !hasSubmittedOffer && (
//                     <CardFooter>
//                       <form
//                         onSubmit={handleSubmitOffer}
//                         className="w-full space-y-4"
//                       >
//                         <div className="space-y-2">
//                           <label htmlFor="offerAmount">Your Offer ($)</label>
//                           <Input
//                             id="offerAmount"
//                             type="number"
//                             placeholder="e.g., 50"
//                             value={offerAmount}
//                             onChange={(e) => setOfferAmount(e.target.value)}
//                             required
//                           />
//                         </div>
//                         <div className="space-y-2">
//                           <label htmlFor="offerMessage">Message</label>
//                           <Textarea
//                             id="offerMessage"
//                             placeholder="Introduce yourself and explain why you're a good fit for this task..."
//                             value={offerMessage}
//                             onChange={(e) => setOfferMessage(e.target.value)}
//                             rows={4}
//                             required
//                           />
//                         </div>
//                         <Button
//                           type="submit"
//                           className="w-full"
//                           disabled={isSubmitting}
//                         >
//                           {isSubmitting ? "Submitting..." : "Submit Offer"}
//                         </Button>
//                       </form>
//                     </CardFooter>
//                   )}
//                    {!isTaskPoster && !task.status && hasSubmittedOffer && (
//                     <CardFooter>
//                       <p className="text-muted-foreground">
//                         You have already submitted an offer for this task.
//                       </p>
//                     </CardFooter>
//                   )}
//                 </Card>
//               )}
//             </div>

//             <div className="space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>About the Poster</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="flex items-center gap-3">
//                     <Avatar className="h-10 w-10">
//                       <AvatarFallback>
//                         {task.poster.name.charAt(0)}
//                       </AvatarFallback>
//                     </Avatar>
//                     <div>
//                       <p className="font-medium">{task.poster.name}</p>
//                       <div className="flex items-center gap-1 text-sm text-muted-foreground">
//                         <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
//                         <span>{task.poster.rating}</span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="text-sm space-y-2">
//                     <div className="flex justify-between">
//                       <span className="text-muted-foreground">
//                         Member since
//                       </span>
//                       <span>{task.poster.joinedDate}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-muted-foreground">
//                         Tasks posted
//                       </span>
//                       <span>{task.poster.taskCount}</span>
//                     </div>
//                   </div>
//                   {!isTaskPoster && (
//                     <Button
//                       variant="outline"
//                       className="w-full"
//                       onClick={handleMessageUser}
//                     >
//                       <MessageSquare className="mr-2 h-4 w-4" />
//                       Contact
//                     </Button>
//                   )}
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle>Safety Tips</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <ul className="space-y-2 text-sm">
//                     <li className="flex items-start gap-2">
//                       <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5" />
//                       <span>Never pay or communicate outside of JobPool</span>
//                     </li>
//                     <li className="flex items-start gap-2">
//                       <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5" />
//                       <span>Report suspicious behavior immediately</span>
//                     </li>
//                     <li className="flex items-start gap-2">
//                       <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5" />
//                       <span>
//                         Check reviews and ratings before accepting offers
//                       </span>
//                     </li>
//                   </ul>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </main>

//       {showPaymentModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-md">
//             <CardHeader>
//               <CardTitle>Complete Payment</CardTitle>
//               <CardDescription>
//                 Pay the tasker for completing the task
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="border rounded-lg p-4 space-y-2">
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Task Amount</span>
//                   <span className="font-medium">${task.budget.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">
//                     Service Fee (10%)
//                   </span>
//                   <span className="font-medium">
//                     ${(task.budget * 0.1).toFixed(2)}
//                   </span>
//                 </div>
//                 <div className="border-t pt-2 mt-2 flex justify-between">
//                   <span className="font-medium">Total</span>
//                   <span className="font-bold">
//                     ${(task.budget * 1.1).toFixed(2)}
//                   </span>
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Payment Method</label>
//                 <div className="flex items-center space-x-2 border rounded-md p-3">
//                   <input
//                     type="radio"
//                     id="card1"
//                     name="paymentMethod"
//                     className="h-4 w-4"
//                     defaultChecked
//                   />
//                   <label htmlFor="card1" className="flex-1">
//                     <div className="flex items-center justify-between">
//                       <span>Credit Card ending in 4242</span>
//                       <span className="text-xs bg-muted px-2 py-1 rounded">
//                         Default
//                       </span>
//                     </div>
//                   </label>
//                 </div>
//                 <div className="flex items-center space-x-2 border rounded-md p-3">
//                   <input
//                     type="radio"
//                     id="card2"
//                     name="paymentMethod"
//                     className="h-4 w-4"
//                   />
//                   <label htmlFor="card2" className="flex-1">
//                     <span>Add New Payment Method</span>
//                   </label>
//                 </div>
//               </div>
//             </CardContent>
//             <CardFooter className="flex justify-between">
//               <Button
//                 variant="outline"
//                 onClick={() => setShowPaymentModal(false)}
//               >
//                 Cancel
//               </Button>
//               <Button onClick={handlePayment} disabled={isSubmitting}>
//                 {isSubmitting ? "Processing..." : "Pay Now"}
//               </Button>
//             </CardFooter>
//           </Card>
//         </div>
//       )}

//       {showImageGallery && task.images.length > 0 && (
//         <div
//           className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
//           onClick={closeImageGallery}
//         >
//           <div className="relative max-w-4xl w-full">
//             <button
//               className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 z-10"
//               onClick={closeImageGallery}
//             >
//               <X className="h-6 w-6" />
//             </button>
//             <div className="relative">
//               <img
//                 src={task.images[currentImageIndex].url}
//                 alt={task.images[currentImageIndex].alt}
//                 className="w-full h-auto max-h-screen object-contain"
//               />
//               <button
//                 className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2"
//                 onClick={prevImage}
//               >
//                 <ChevronLeft className="h-6 w-6" />
//               </button>
//               <button
//                 className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2"
//                 onClick={nextImage}
//               >
//                 <ChevronRight className="h-6 w-6" />
//               </button>
//             </div>
//             <div className="text-center text-white mt-4">
//               {currentImageIndex + 1} / {task.images.length}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// // }
// 'use client'
// import { ImageGalleryModal } from "@/components/ImageGalleryModal";
// import { OffersSection } from "@/components/OffersSection";
// import { PaymentModal } from "@/components/PaymentModal";
// import { PosterInfo } from "@/components/PosterInfo";
// import { ReviewSection } from "@/components/ReviewSection";
// import { SafetyTips } from "@/components/SafetyTips";
// import { TaskInfo } from "@/components/TaskInfo";
// import { TaskProgress } from "@/components/TaskProgress";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Toaster } from "@/components/ui/sonner";
// import axiosInstance from "@/lib/axiosInstance";
// import useStore from "@/lib/Zustand";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { FormEvent, use, useEffect, useState } from "react";
// import { toast } from "sonner";


// interface Bid {
//   job_id: string;
//   bidder_id: string;
//   bid_description: string;
//   bid_amount: number;
// }

// interface ApiBidResponse {
//   status_code: number;
//   message: string;
//   timestamp: string;
//   data: Bid[];
// }

// interface ApiJobResponse {
//   status_code: number;
//   message: string;
//   data: {
//     job_id: string;
//     posted_by: string;
//     job_title: string;
//     job_description: string;
//     job_category: string;
//     job_budget: number;
//     job_location: string;
//     job_due_date: string;
//     job_images: { urls: string[] };
//     status: boolean;
//     job_completion_status: number;
//     user_ref_id: string;
//   };
// }
// interface Image {
//   id: string;
//   url: string;
//   alt: string;
// }

// interface User {
//   id: string;
//   name: string;
//   rating: number;
//   taskCount: number;
//   joinedDate: string;
// }

// interface Offer {
//   id: string;
//   tasker: User;
//   amount: number;
//   message: string;
//   createdAt: string;
// }

// interface Task {
//   id: string;
//   title: string;
//   description: string;
//   budget: number;
//   location: string;
//   status: boolean;
//   postedAt: string;
//   dueDate: string;
//   category: string;
//   images: Image[];
//   poster: User;
//   offers: Offer[];
//   assignedTasker?: User;
// }

// interface TaskDetailPageProps {
//   params: Promise<{ id: string }>;
// }

// export default function TaskDetailPage({ params }: TaskDetailPageProps) {
//   const router = useRouter();
//   const { id } = use(params);
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [task, setTask] = useState<Task | null>(null);
//   const [bids, setBids] = useState<Bid[]>([]);
//   const [offers, setOffers] = useState<Offer[]>([]);
//   const [offerAmount, setOfferAmount] = useState<string>("");
//   const [offerMessage, setOfferMessage] = useState<string>("");
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//   const [reviewRating, setReviewRating] = useState<number>(5);
//   const [reviewComment, setReviewComment] = useState<string>("");
//   const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
//   const [showImageGallery, setShowImageGallery] = useState<boolean>(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
//   const { userId } = useStore();

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       const parsedUser = JSON.parse(storedUser);
//       setUser(parsedUser);
//     } else {
//       router.push("/signin");
//     }
//   }, [router]);

//   useEffect(() => {
//     const loadTaskData = async () => {
//       try {
//         const response = await axiosInstance.get(`/get-job/${id}/`);
//         const data: ApiJobResponse = response.data;

//         if (data.status_code !== 200) {
//           throw new Error(data.message);
//         }

//         const job = data.data;

//         const mappedTask: Task = {
//           id: job.job_id,
//           title: job.job_title,
//           description: job.job_description,
//           budget: job.job_budget,
//           location: job.job_location,
//           status: job.status,
//           postedAt: "2 days ago",
//           dueDate: job.job_due_date,
//           category: job.job_category,
//           images: job.job_images.urls.map((url: string, index: number) => ({
//             id: `img${index + 1}`,
//             url,
//             alt: `Job image ${index + 1}`,
//           })),
//           poster: {
//             id: job.user_ref_id,
//             name: job.posted_by,
//             rating: 4.8,
//             taskCount: 15,
//             joinedDate: "Jan 2023",
//           },
//           offers: [],
//           assignedTasker: undefined,
//         };

//         setTask(mappedTask);
//       } catch (error) {
//         console.error("Error loading task data:", error);
//         toast.error("Failed to load task details");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadTaskData();
//   }, [id]);

//   useEffect(() => {
//     if (!task || !userId) return;

//     const isTaskPoster = task.poster.id === userId;

//     async function fetchBids() {
//       try {
//         const endpoint = isTaskPoster ? `/get-bids/${id}/` : `/get-user-bids/${userId}/`;
//         const response = await axiosInstance.get(endpoint);
//         const data: ApiBidResponse = response.data;

//         if (data.status_code !== 200) {
//           throw new Error(data.message);
//         }

//         const bids = data.data;
//         const taskBids = isTaskPoster ? bids : bids.filter((bid) => bid.job_id === id);

//         const newOffers: Offer[] = taskBids.map((bid, index) => ({
//           id: `bid${index + 1}`,
//           tasker: {
//             id: bid.bidder_id,
//             name: `User ${bid.bidder_id}`,
//             rating: 4.5,
//             taskCount: 5,
//             joinedDate: "Apr 2023",
//           },
//           amount: bid.bid_amount,
//           message: bid.bid_description,
//           createdAt: "Just now",
//         }));

//         setOffers(newOffers);
//         setBids(taskBids);
//       } catch (error: any) {
//         console.error("Error fetching bids:", error);
//         toast.error(`Failed to load bids: ${error.message || "Unknown error"}`);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchBids();
//   }, [id, task, userId]);

//   const handleSubmitOffer = async (e: FormEvent) => {
//     e.preventDefault();
//     if (!offerAmount || !offerMessage) {
//       toast.error("Please fill in all required fields");
//       return;
//     }
//     const offerAmountNumber = parseFloat(offerAmount);

//     if (task && offerAmountNumber > task.budget) {
//       toast.error("Offer amount cannot be greater than the task budget.");
//       return;
//     }

//     const payload = {
//       job_ref_id: id,
//       bidder_ref_id: userId,
//       bid_amount: offerAmountNumber,
//       bid_description: offerMessage,
//     };

//     setIsSubmitting(true);

//     try {
//       const response = await axiosInstance.post("/bid-a-job/", payload);

//       if (response.data.status_code === 201) {
//         toast.success("Your offer has been submitted!");

//         if (user) {
//           const newOffer: Offer = {
//             id: response.data.data?.offer_id || `offer${Math.random().toString(36).substr(2, 9)}`,
//             tasker: {
//               id: user.id,
//               name: user.name,
//               rating: 4.5,
//               taskCount: 5,
//               joinedDate: "Apr 2023",
//             },
//             amount: offerAmountNumber,
//             message: offerMessage,
//             createdAt: "Just now",
//           };

//           setOffers((prev) => [...prev, newOffer]);
//         }

//         setOfferAmount("");
//         setOfferMessage("");
//       } else {
//         throw new Error(response.data.message || "Failed to submit offer");
//       }
//     } catch (error: any) {
//       console.error("Error submitting offer:", error);
//       toast.error(error.response?.data?.message || "Failed to submit offer");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleSubmitReview = (e: FormEvent) => {
//     e.preventDefault();
//     if (!reviewComment) {
//       toast.error("Please provide a review comment");
//       return;
//     }
//     setIsSubmitting(true);
//     setTimeout(() => {
//       toast.success("Your review has been submitted!");
//       setIsSubmitting(false);
//       router.push("/dashboard");
//     }, 1500);
//   };

//   const acceptOffer = (offerId: string) => {
//     setTimeout(() => {
//       toast.success("You've accepted the offer!");
//       setTask((prevTask) => {
//         if (!prevTask) return prevTask;
//         const acceptedOffer = offers.find((offer) => offer.id === offerId);
//         return {
//           ...prevTask,
//           status: true,
//           assignedTasker: acceptedOffer?.tasker,
//         };
//       });
//     }, 1000);
//   };

//   const markAsComplete = () => {
//     setTimeout(() => {
//       toast.success("Task marked as complete!");
//       setTask((prevTask) =>
//         prevTask ? { ...prevTask, job_completion_status: 1 } : prevTask
//       );
//       if (isTaskPoster) {
//         setShowPaymentModal(true);
//       }
//     }, 1000);
//   };

//   const handlePayment = () => {
//     setIsSubmitting(true);
//     setTimeout(() => {
//       toast.success("Payment processed successfully");
//       setShowPaymentModal(false);
//       setIsSubmitting(false);
//       router.push("/payments");
//     }, 1500);
//   };

//   const handleMessageUser = () => {
//     router.push("/messages");
//   };

//   const openImageGallery = (index: number) => {
//     setCurrentImageIndex(index);
//     setShowImageGallery(true);
//   };

//   const closeImageGallery = () => {
//     setShowImageGallery(false);
//   };

//   const nextImage = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setCurrentImageIndex((prev) => (prev + 1) % (task?.images.length || 1));
//   };

//   const prevImage = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setCurrentImageIndex(
//       (prev) => (prev - 1 + (task?.images.length || 1)) % (task?.images.length || 1)
//     );
//   };

//   const handleSignOut = () => {
//     localStorage.removeItem("user");
//     router.push("/");
//   };

//   if (loading) {
//     return (
//       <div className="flex h-screen items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="flex h-screen items-center justify-center">
//         Please log in to view task details
//       </div>
//     );
//   }

//   if (!task) {
//     return (
//       <div className="flex h-screen items-center justify-center">
//         Unable to load task details
//       </div>
//     );
//   }

//   const isTaskPoster: boolean = task.poster.id === userId;
//   const hasSubmittedOffer = offers.some((offer) => offer.tasker.id === user.id);

//   return (
//     <div className="flex min-h-screen flex-col">
//       <Toaster position="top-right" />
//       <header className="border-b">
//         <div className="container flex h-16 items-center justify-between px-4 md:px-6">
//           <Link href="/" className="flex items-center gap-2 font-bold text-xl">
//             <span className="text-primary">JobPool</span>
//           </Link>
//           <nav className="hidden md:flex gap-6">
//             <Link
//               href="/browse"
//               className="text-sm font-medium hover:underline underline-offset-4"
//             >
//               Browse Tasks
//             </Link>
//             <Link
//               href="/post-task"
//               className="text-sm font-medium hover:underline underline-offset-4"
//             >
//               Post a Task
//             </Link>
//             <Link
//               href="/messages"
//               className="text-sm font-medium hover:underline underline-offset-4"
//             >
//               Messages
//             </Link>
//           </nav>
//           <div className="flex items-center gap-4">
//             <div className="flex items-center gap-2">
//               <Avatar className="h-8 w-8">
//                 <AvatarImage src="/placeholder.svg" alt={user.name} />
//                 <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
//               </Avatar>
//               <span className="text-sm font-medium hidden md:inline-block">
//                 {user.name}
//               </span>
//             </div>
//             <Button variant="outline" size="sm" onClick={handleSignOut}>
//               Sign Out
//             </Button>
//           </div>
//         </div>
//       </header>
//       <main className="flex-1 container py-6 md:py-10 px-4 md:px-6">
//         <div className="max-w-4xl mx-auto">
//           <div className="mb-6">
//             <Link
//               href="/dashboard"
//               className="text-sm text-muted-foreground hover:underline"
//             >
//               ← Back to Dashboard
//             </Link>
//           </div>

//           <div className="grid gap-6 md:grid-cols-3">
//             <div className="md:col-span-2 space-y-6">
//               <TaskInfo
//                 task={task}
//                 openImageGallery={openImageGallery}
//                 handleMessageUser={handleMessageUser}
//                 isTaskPoster={isTaskPoster}
//               />
//               <ReviewSection
//                 isTaskPoster={isTaskPoster}
//                 taskStatus={task.status}
//                 handleSubmitReview={handleSubmitReview}
//                 reviewRating={reviewRating}
//                 setReviewRating={setReviewRating}
//                 reviewComment={reviewComment}
//                 setReviewComment={setReviewComment}
//                 isSubmitting={isSubmitting}
//               />
//               <TaskProgress
//                 taskStatus={task.status}
//                 isTaskPoster={isTaskPoster}
//                 markAsComplete={markAsComplete}
//               />
//               <OffersSection
//                 task={task}
//                 offers={offers}
//                 isTaskPoster={isTaskPoster}
//                 hasSubmittedOffer={hasSubmittedOffer}
//                 handleSubmitOffer={handleSubmitOffer}
//                 acceptOffer={acceptOffer}
//                 handleMessageUser={handleMessageUser}
//                 offerAmount={offerAmount}
//                 setOfferAmount={setOfferAmount}
//                 offerMessage={offerMessage}
//                 setOfferMessage={setOfferMessage}
//                 isSubmitting={isSubmitting}
//               />
//             </div>
//             <div className="space-y-6">
//               <PosterInfo
//                 poster={task.poster}
//                 isTaskPoster={isTaskPoster}
//                 handleMessageUser={handleMessageUser}
//               />
//               <SafetyTips />
//             </div>
//           </div>
//         </div>
//       </main>

//       <PaymentModal
//         show={showPaymentModal}
//         task={task}
//         handlePayment={handlePayment}
//         closeModal={() => setShowPaymentModal(false)}
//         isSubmitting={isSubmitting}
//       />
//       <ImageGalleryModal
//         show={showImageGallery}
//         images={task.images}
//         currentIndex={currentImageIndex}
//         closeGallery={closeImageGallery}
//         nextImage={nextImage}
//         prevImage={prevImage}
//       />
//     </div>
//   );
// }

'use client'
import { ImageGalleryModal } from "@/components/ImageGalleryModal";
import { OffersSection } from "@/components/OffersSection";
import { PaymentModal } from "@/components/PaymentModal";
import { PosterInfo } from "@/components/PosterInfo";
import { ReviewSection } from "@/components/ReviewSection";
import { SafetyTips } from "@/components/SafetyTips";
import { TaskInfo } from "@/components/TaskInfo";
import { Toaster } from "@/components/ui/sonner";
import axiosInstance from "@/lib/axiosInstance";
import useStore from "@/lib/Zustand";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, use, useEffect, useState } from "react";
import { toast } from "sonner";
import { Task, User, Bid, Offer, ApiBidResponse, ApiJobResponse } from "../../types";
import { TaskProgress } from "@/components/TaskProgress";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TaskDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function TaskDetailPage({ params }: TaskDetailPageProps) {
  const router = useRouter();
  const { id } = use(params);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [task, setTask] = useState<Task | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [offerAmount, setOfferAmount] = useState<string>("");
  const [offerMessage, setOfferMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [reviewComment, setReviewComment] = useState<string>("");
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [showImageGallery, setShowImageGallery] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const { userId } = useStore();

  // Load user and sync bids
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && userId) {
      const parsedUser: User = JSON.parse(storedUser);
      parsedUser.id = parsedUser.id || userId;
      setUser(parsedUser);
      console.log("Loaded user from localStorage:", parsedUser);
      console.log("User ID after setting:", parsedUser.id);
    } else {
      router.push("/signin");
    }

    // Sync bids to localStorage
    if (userId) {
      const syncBids = async () => {
        try {
          const response = await axiosInstance.get(`/get-user-bids/${userId}/`);
          const data: ApiBidResponse = response.data;
          if (data.status_code === 200) {
            localStorage.setItem("bids", JSON.stringify(data.data));
            console.log("Synced bids to localStorage:", data.data);
          }
        } catch (error) {
          console.error("Error syncing bids:", error);
        }
      };
      syncBids();
    }
  }, [router, userId]);

  // Load task data
  useEffect(() => {
    const loadTaskData = async () => {
      try {
        const response = await axiosInstance.get(`/get-job/${id}/`);
        const data: ApiJobResponse = response.data;

        if (data.status_code !== 200) {
          throw new Error(data.message);
        }

        const job = data.data;

        const mappedTask: Task = {
          id: job.job_id,
          title: job.job_title,
          description: job.job_description,
          budget: job.job_budget,
          location: job.job_location,
          status: job.status,
          postedAt: "2 days ago",
          dueDate: job.job_due_date,
          category: job.job_category,
          images: job.job_images.urls.map((url: string, index: number) => ({
            id: `img${index + 1}`,
            url,
            alt: `Job image ${index + 1}`,
          })),
          poster: {
            id: job.user_ref_id,
            name: job.posted_by,
            rating: 4.8,
            taskCount: 15,
            joinedDate: "Jan 2023",
          },
          offers: [],
          assignedTasker: undefined,
        };

        setTask(mappedTask);
      } catch (error: any) {
        console.error("Error loading task data:", error);
        toast.error(
          error.response?.data?.detail || "Failed to load task details"
        );
        setTask(null);
      } finally {
        setLoading(false);
      }
    };

    loadTaskData();
  }, [id]);

  // Load bids/offers
  useEffect(() => {
    if (!userId || !task) return;

    const isTaskPoster = task.poster.id === userId;

    async function loadBids() {
      try {
        let taskBids: Bid[] = [];
        if (isTaskPoster) {
          // Task poster: fetch all bids
          const response = await axiosInstance.get(`/get-bids/${id}/`);
          const data: ApiBidResponse = response.data;
          if (data.status_code !== 200) {
            throw new Error(data.message);
          }
          taskBids = data.data;
        } else {
          // Non-poster: read from localStorage
          const storedBids = localStorage.getItem("bids");
          const allBids: Bid[] = storedBids ? JSON.parse(storedBids) : [];
          taskBids = allBids.filter((bid) => bid.job_id === id);
        }

        // Map bids to offers
        const newOffers: Offer[] = taskBids.map((bid: Bid, index: number) => ({
          id: `bid${index + 1}`,
          tasker: {
            id: bid.bidder_id,
            name: `User ${bid.bidder_id}`, // TODO: Fetch actual user name
            rating: 4.5,
            taskCount: 5,
            joinedDate: "Apr 2023",
          },
          amount: bid.bid_amount,
          message: bid.bid_description,
          createdAt: "Just now",
        }));

        setOffers(newOffers);
        setBids(taskBids);
        console.log("Loaded bids:", taskBids);
        console.log("Mapped offers:", newOffers);
      } catch (error: any) {
        console.error("Error loading bids:", error);
        toast.error(`Failed to load bids: ${error.message || "Unknown error"}`);
      }
    }

    loadBids();
  }, [id, task, userId]);

  const handleSubmitOffer = async (e: FormEvent) => {
    e.preventDefault();
    if (!offerAmount || !offerMessage || !userId) {
      toast.error("Please fill in all required fields");
      return;
    }
    const offerAmountNumber = parseFloat(offerAmount);

    if (task && offerAmountNumber > task.budget) {
      toast.error("Offer amount cannot be greater than the task budget.");
      return;
    }

    const payload = {
      job_ref_id: id,
      bidder_ref_id: userId,
      bid_amount: offerAmountNumber,
      bid_description: offerMessage,
    };

    setIsSubmitting(true);

    try {
      const response = await axiosInstance.post("/bid-a-job/", payload);

      if (response.data.status_code === 201) {
        toast.success("Your offer has been submitted!");

        // Update localStorage bids
        const storedBids = localStorage.getItem("bids");
        const allBids: Bid[] = storedBids ? JSON.parse(storedBids) : [];
        allBids.push({
          job_id: id,
          bidder_id: userId,
          bid_amount: offerAmountNumber,
          bid_description: offerMessage,
        });
        localStorage.setItem("bids", JSON.stringify(allBids));

        // Update state
        const taskBids = allBids.filter((bid) => bid.job_id === id);
        const newOffers: Offer[] = taskBids.map((bid: Bid, index: number) => ({
          id: `bid${index + 1}`,
          tasker: {
            id: bid.bidder_id,
            name: `User ${bid.bidder_id}`,
            rating: 4.5,
            taskCount: 5,
            joinedDate: "Apr 2023",
          },
          amount: bid.bid_amount,
          message: bid.bid_description,
          createdAt: "Just now",
        }));
        setOffers(newOffers);
        setBids(taskBids);
        console.log("Updated bids after submission:", taskBids);
        console.log("Updated offers after submission:", newOffers);

        setOfferAmount("");
        setOfferMessage("");
      } else {
        throw new Error(response.data.message || "Failed to submit offer");
      }
    } catch (error: any) {
      console.error("Error submitting offer:", error);
      const errorMessage = error.response?.data?.message || "Failed to submit offer";
      toast.error(errorMessage);
      if (error.response?.status === 400 && userId) {
        // Sync bids
        const bidsResponse = await axiosInstance.get(`/get-user-bids/${userId}/`);
        const bidsData: ApiBidResponse = bidsResponse.data;
        if (bidsData.status_code === 200) {
          localStorage.setItem("bids", JSON.stringify(bidsData.data));
          const taskBids = bidsData.data.filter((bid) => bid.job_id === id);
          const newOffers: Offer[] = taskBids.map((bid: Bid, index: number) => ({
            id: `bid${index + 1}`,
            tasker: {
              id: bid.bidder_id,
              name: `User ${bid.bidder_id}`,
              rating: 4.5,
              taskCount: 5,
              joinedDate: "Apr 2023",
            },
            amount: bid.bid_amount,
            message: bid.bid_description,
            createdAt: "Just now",
          }));
          setOffers(newOffers);
          setBids(taskBids);
          console.log("Updated bids after 400 error:", taskBids);
          console.log("Updated offers after 400 error:", newOffers);
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitReview = (e: FormEvent) => {
    e.preventDefault();
    if (!reviewComment) {
      toast.error("Please provide a review comment");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success("Your review has been submitted!");
      setIsSubmitting(false);
      router.push("/dashboard");
    }, 1500);
  };

  // const acceptOffer = (offerId: string) => {
  //   setTimeout(() => {
  //     toast.success("You've accepted the offer!");
  //     setTask((prevTask: Task | null) => {
  //       if (!prevTask) return prevTask;
  //       const acceptedOffer = offers.find((offer) => offer.id === offerId);
  //       return {
  //         ...prevTask,
  //         status: true,
  //         assignedTasker: acceptedOffer?.tasker,
  //       };
  //     });
  //   }, 1000);
  // };

  const markAsComplete = () => {
    setTimeout(() => {
      toast.success("Task marked as complete!");
      setTask((prevTask: Task | null) =>
        prevTask ? { ...prevTask, job_completion_status: 1 } : prevTask
      );
      if (task?.poster.id === userId) {
        setShowPaymentModal(true);
      }
    }, 1000);
  };

  const handlePayment = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success("Payment processed successfully");
      setShowPaymentModal(false);
      setIsSubmitting(false);
      router.push("/payments");
    }, 1500);
  };

  const handleMessageUser = () => {
    router.push("/messages");
  };

  const openImageGallery = (index: number) => {
    setCurrentImageIndex(index);
    setShowImageGallery(true);
  };

  const closeImageGallery = () => {
    setShowImageGallery(false);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % (task?.images.length || 1));
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(
      (prev) => (prev - 1 + (task?.images.length || 1)) % (task?.images.length || 1)
    );
  };

  const handleSignOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("bids");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user || !userId) {
    return (
      <div className="flex h-screen items-center justify-center">
        Please log in to view task details
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex h-screen items-center justify-center flex-col gap-4">
        <p>Task not found</p>
        <Link
          href="/dashboard"
          className="text-sm text-blue-600 hover:underline"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const isTaskPoster: boolean = task.poster.id === userId;
  const hasSubmittedOffer = offers.some((offer) => offer.tasker.id === userId);
  console.log("User ID from user:", user.id);
  console.log("User ID from store:", userId);
  console.log("Offers:", offers);
  console.log("Has submitted offer:", hasSubmittedOffer);

  return (
    <div className="flex min-h-screen flex-col">
      <Toaster position="top-right" />
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-primary">JobPool</span>
          </Link>
          <nav className="hidden md:flex gap-6">
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
          </nav>
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
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link
              href="/dashboard"
              className="text-sm text-muted-foreground hover:underline"
            >
              ← Back to Dashboard
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
              <TaskInfo
                task={task}
                openImageGallery={openImageGallery}
                handleMessageUser={handleMessageUser}
                isTaskPoster={isTaskPoster}
              />
              <ReviewSection
                isTaskPoster={isTaskPoster}
                taskStatus={task.status}
                handleSubmitReview={handleSubmitReview}
                reviewRating={reviewRating}
                setReviewRating={setReviewRating}
                reviewComment={reviewComment}
                setReviewComment={setReviewComment}
                isSubmitting={isSubmitting}
              />
              <TaskProgress
                taskStatus={task.status}
                isTaskPoster={isTaskPoster}
                markAsComplete={markAsComplete}
              />
              <OffersSection
                task={task}
                offers={offers}
                isTaskPoster={isTaskPoster}
                hasSubmittedOffer={hasSubmittedOffer}
                handleSubmitOffer={handleSubmitOffer}
                // acceptOffer={acceptOffer}
                handleMessageUser={handleMessageUser}
                offerAmount={offerAmount}
                setOfferAmount={setOfferAmount}
                offerMessage={offerMessage}
                setOfferMessage={setOfferMessage}
                isSubmitting={isSubmitting}
              />
            </div>
            <div className="space-y-6">
              <PosterInfo
                poster={task.poster}
                isTaskPoster={isTaskPoster}
                handleMessageUser={handleMessageUser}
              />
              <SafetyTips />
            </div>
          </div>
        </div>
      </main>

      <PaymentModal
        show={showPaymentModal}
        task={task}
        handlePayment={handlePayment}
        closeModal={() => setShowPaymentModal(false)}
        isSubmitting={isSubmitting}
      />
      <ImageGalleryModal
        show={showImageGallery}
        images={task.images}
        currentIndex={currentImageIndex}
        closeGallery={closeImageGallery}
        nextImage={nextImage}
        prevImage={prevImage}
      />
    </div>
  );
}