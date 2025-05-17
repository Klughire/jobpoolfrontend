// // import { FormEvent, useState } from "react";
// // import { Star } from "lucide-react";
// // import { Button } from "./ui/button";
// // import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
// // import { Input } from "./ui/input";
// // import { Textarea } from "./ui/textarea";
// // import { Avatar, AvatarFallback } from "./ui/avatar";
// // import axiosInstance from '../lib/axiosInstance'
// // import { toast } from "sonner";
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
// //   status: boolean;
// //   postedAt: string;
// //   dueDate: string;
// //   category: string;
// //   images: Image[];
// //   poster: User;
// //   offers: Offer[];
// //   assignedTasker?: User;
// // }

// // interface OffersSectionProps {
// //   task: Task;
// //   offers: Offer[];
// //   isTaskPoster: boolean;
// //   hasSubmittedOffer: boolean;
// //   handleSubmitOffer: (e: FormEvent) => void;
// //   // acceptOffer: (offerId: string) => void;
// //   handleMessageUser: (receiverId?: string) => void;
// //   offerAmount: string;
// //   setOfferAmount: (value: string) => void;
// //   offerMessage: string;
// //   setOfferMessage: (value: string) => void;
// //   isSubmitting: boolean;
// // }

// // export function OffersSection({
// //   task,
// //   offers,
// //   isTaskPoster,
// //   hasSubmittedOffer,
// //   handleSubmitOffer,
// //   // acceptOffer,
// //   handleMessageUser,
// //   offerAmount,
// //   setOfferAmount,
// //   offerMessage,
// //   setOfferMessage,
// //   isSubmitting,
// // }: OffersSectionProps) {

// //   const [isAccepting, setIsAccepting] = useState<string | null>(null);

// //   const handleAcceptOffer = async (offer: Offer) => {
// //     setIsAccepting(offer.id);
// //     console.log("Attempting API call to:", `/accept-bid/${task.id}/${offer.tasker.id}/`);
// //     try {
// //       const response = await axiosInstance.put(`/accept-bid/${task.id}/${offer.tasker.id}/`);

// //       if (response.data.status_code === 200) {
// //         toast.success(response.data.message || "Bid accepted successfully");

// //       } else {
// //         toast.error(response.data.message || "Failed to accept bid");
// //       }
// //     } catch (error: any) {
// //       console.error("Error accepting bid:", error);
// //       toast.error(
// //         error.response?.data?.message || "An error occurred while accepting the bid"
// //       );
// //     } finally {
// //       setIsAccepting(null);
// //     }
// //   };

// //   return (
// //     <Card>
// //       <CardHeader>
// //         <CardTitle>Offers ({offers.length})</CardTitle>
// //         <CardDescription>
// //           {isTaskPoster ? "Choose the best offer for your task" : "View offers from other taskers"}
// //         </CardDescription>
// //       </CardHeader>
// //       <CardContent className="space-y-4">
// //         {offers.length === 0 ? (
// //           <p className="text-center text-muted-foreground py-4">No offers yet</p>
// //         ) : (
// //           offers.map((offer) => (
// //             <div key={offer.id} className="border rounded-lg p-4 space-y-3">
// //               <div className="flex justify-between items-start">
// //                 <div className="flex items-center gap-2">
// //                   <Avatar className="h-8 w-8">
// //                     <AvatarFallback>{offer.tasker.name.charAt(0)}</AvatarFallback>
// //                   </Avatar>
// //                   <div>
// //                     <p className="font-medium">{offer.tasker.name}</p>
// //                     <div className="flex items-center gap-1 text-sm text-muted-foreground">
// //                       <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
// //                       <span>
// //                         {offer.tasker.rating} • {offer.tasker.taskCount} tasks
// //                       </span>
// //                     </div>
// //                   </div>
// //                 </div>
// //                 <div className="text-right">
// //                   <p className="font-bold">${offer.amount.toFixed(2)}</p>
// //                   <p className="text-xs text-muted-foreground">{offer.createdAt}</p>
// //                 </div>
// //               </div>
// //               <p className="text-sm">{offer.message}</p>
// //               {isTaskPoster && (
// //   <div className="flex gap-2">
// //     {!task.status && (
// //       <Button
// //         className="w-full"
// //         size="sm"
// //         onClick={() => handleAcceptOffer(offer)}
// //         disabled={isAccepting === offer.id}
// //       >
// //         {isAccepting === offer.id ? "Accepting..." : "Accept Offer"}
// //       </Button>
// //     )}
// //     {(task.status && task.assignedTasker?.id === offer.tasker.id) || !task.status ? (
// //       <Button
// //         variant="outline"
// //         size="sm"
// //         onClick={() => handleMessageUser(offer.tasker.id)}
// //       >
// //         Message
// //       </Button>
// //     ) : null}
// //   </div>
// // )}
// //             </div>
// //           ))
// //         )}
// //       </CardContent>
// //       {/* Show form only if user is not the poster, task is not assigned, and user hasn't submitted an offer */}
// //       {!isTaskPoster && !task.status && !hasSubmittedOffer && (
// //         <CardFooter>
// //           <form onSubmit={handleSubmitOffer} className="w-full space-y-4">
// //             <div className="space-y-2">
// //               <label htmlFor="offerAmount">Your Offer ($)</label>
// //               <Input
// //                 id="offerAmount"
// //                 type="number"
// //                 placeholder="e.g., 50"
// //                 value={offerAmount}
// //                 onChange={(e) => setOfferAmount(e.target.value)}
// //                 required
// //                 min="1"
// //               />
// //             </div>
// //             <div className="space-y-2">
// //               <label htmlFor="offerMessage">Message</label>
// //               <Textarea
// //                 id="offerMessage"
// //                 placeholder="Introduce yourself and explain why you're a good fit for this task..."
// //                 value={offerMessage}
// //                 onChange={(e) => setOfferMessage(e.target.value)}
// //                 rows={4}
// //                 required
// //               />
// //             </div>
// //             <Button type="submit" className="w-full" disabled={isSubmitting}>
// //               {isSubmitting ? "Submitting..." : "Submit Offer"}
// //             </Button>
// //           </form>
// //         </CardFooter>
// //       )}
// //       {/* Show message if user has already submitted an offer */}
// //       {!isTaskPoster && !task.status && hasSubmittedOffer && (
// //         <CardFooter>
// //           <p className="text-muted-foreground">
// //             You have already submitted an offer for this task.
// //           </p>
// //         </CardFooter>
// //       )}
// //     </Card>
// //   );
// // }

// import { FormEvent, useState } from "react";
// import { IndianRupee, Star } from "lucide-react";
// import { Button } from "./ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "./ui/card";
// import { Input } from "./ui/input";
// import { Textarea } from "./ui/textarea";
// import { Avatar, AvatarFallback } from "./ui/avatar";
// import axiosInstance from "../lib/axiosInstance";
// import { toast } from "sonner";
// import Link from "next/link";

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

// interface OffersSectionProps {
//   task: Task;
//   offers: Offer[];
//   isTaskPoster: boolean;
//   hasSubmittedOffer: boolean;
//   handleSubmitOffer: (e: FormEvent) => void;
//   handleMessageUser: (receiverId?: string) => void;
//   offerAmount: string;
//   setOfferAmount: (value: string) => void;
//   offerMessage: string;
//   setOfferMessage: (value: string) => void;
//   isSubmitting: boolean;
// }

// export function OffersSection({
//   task,
//   offers,
//   isTaskPoster,
//   hasSubmittedOffer,
//   handleSubmitOffer,
//   handleMessageUser,
//   offerAmount,
//   setOfferAmount,
//   offerMessage,
//   setOfferMessage,
//   isSubmitting,
// }: OffersSectionProps) {
//   const [isAccepting, setIsAccepting] = useState<string | null>(null);
//   console.log("task status", task.status);

//   console.log(task.assignedTasker?.id);

//   const handleAcceptOffer = async (offer: Offer) => {
//     setIsAccepting(offer.id);
//     console.log(
//       "Attempting API call to:",
//       `/accept-bid/${task.id}/${offer.tasker.id}/`
//     );
//     try {
//       const response = await axiosInstance.put(
//         `/accept-bid/${task.id}/${offer.tasker.id}/`
//       );

//       if (response.data.status_code === 200) {
//         toast.success(response.data.message || "Bid accepted successfully");
//       } else {
//         toast.error(response.data.message || "Failed to accept bid");
//       }
//     } catch (error: any) {
//       console.error("Error accepting bid:", error);
//       toast.error(
//         error.response?.data?.message ||
//           "An error occurred while accepting the bid"
//       );
//     } finally {
//       setIsAccepting(null);
//     }
//   };

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Offers ({offers.length})</CardTitle>
//         <CardDescription>
//           {isTaskPoster
//             ? "Choose the best offer for your task"
//             : "View offers from other taskers"}
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         {offers.length === 0 ? (
//           <p className="text-center text-muted-foreground py-4">
//             No offers yet
//           </p>
//         ) : (
//           offers.map((offer) => (
//             <div key={offer.id} className="border rounded-lg p-4 space-y-3">
//               <div className="flex justify-between items-start">
//                 <div className="flex items-center gap-2">
//                   <Link
//                     href={`/profilepage/${offer.tasker.id}`}
//                     className="flex items-center gap-2 hover:underline"
//                   >
//                     <Avatar className="h-8 w-8">
//                       <AvatarFallback>
//                         {offer.tasker.name.charAt(0)}
//                       </AvatarFallback>
//                     </Avatar>
//                     <div>
//                       <p className="font-medium">{offer.tasker.name}</p>
//                       <div className="flex items-center gap-1 text-sm text-muted-foreground">
//                         <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
//                         <span>
//                           {offer.tasker.rating} • {offer.tasker.taskCount} tasks
//                         </span>
//                       </div>
//                     </div>
//                   </Link>
//                 </div>
//                 <div className="text-right">
//                   <p className="font-bold">
//                     <IndianRupee className="w-4 h-4 inline" />{" "}
//                     {offer.amount.toFixed(2)}
//                   </p>

//                   <p className="text-xs text-muted-foreground">
//                     {offer.createdAt}
//                   </p>
//                 </div>
//               </div>
//               <p className="text-sm">{offer.message}</p>

//               {isTaskPoster && (
//                 <div className="flex gap-2">
//                   {!task.status && (
//                     <Button
//                       className="w-full"
//                       size="sm"
//                       onClick={() => handleAcceptOffer(offer)}
//                       disabled={isAccepting === offer.id}
//                     >
//                       {isAccepting === offer.id
//                         ? "Accepting..."
//                         : "Accept Offer"}
//                     </Button>
//                   )}
//                   {task.status || !task.status ? (
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       onClick={() => handleMessageUser(offer.tasker.id)}
//                     >
//                       Message
//                     </Button>
//                   ) : null}
//                 </div>
//               )}
//             </div>
//           ))
//         )}
//       </CardContent>
//       {!isTaskPoster && !task.status && !hasSubmittedOffer && (
//         <CardFooter>
//           <form onSubmit={handleSubmitOffer} className="w-full space-y-4">
//             <div className="space-y-2">
//               <label
//                 htmlFor="offerAmount"
//                 className="flex items-center space-x-1"
//               >
//                 <span>Your Offer</span>
//                 <IndianRupee className="w-3 h-3" />
//               </label>

//               <Input
//                 id="offerAmount"
//                 type="number"
//                 placeholder="e.g., 50"
//                 value={offerAmount}
//                 onChange={(e) => setOfferAmount(e.target.value)}
//                 required
//                 min="1"
//               />
//             </div>
//             <div className="space-y-2">
//               <label htmlFor="offerMessage">Message</label>
//               <Textarea
//                 id="offerMessage"
//                 placeholder="Introduce yourself and explain why you're a good fit for this task..."
//                 value={offerMessage}
//                 onChange={(e) => setOfferMessage(e.target.value)}
//                 rows={4}
//                 required
//               />
//             </div>
//             <Button type="submit" className="w-full" disabled={isSubmitting}>
//               {isSubmitting ? "Submitting..." : "Submit Offer"}
//             </Button>
//           </form>
//         </CardFooter>
//       )}
//       {!isTaskPoster && !task.status && hasSubmittedOffer && (
//         <CardFooter>
//           <p className="text-muted-foreground">
//             You have already submitted an offer for this task.
//           </p>
//         </CardFooter>
//       )}
//     </Card>
//   );
// }



import { FormEvent, useState } from "react";
import { IndianRupee, Star } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback } from "./ui/avatar";
import axiosInstance from "../lib/axiosInstance";
import { toast } from "sonner";
import Link from "next/link";

interface Image {
  id: string;
  url: string;
  alt: string;
}

interface User {
  id: string;
  name: string;
  rating: number;
  taskCount: number;
  joinedDate: string;
}

interface Offer {
  id: string;
  tasker: User;
  amount: number;
  message: string;
  createdAt: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  budget: number;
  location: string;
  status: boolean;
  postedAt: string;
  dueDate: string;
  category: string;
  images: Image[];
  poster: User;
  offers: Offer[];
  assignedTasker?: User;
}

interface OffersSectionProps {
  task: Task;
  offers: Offer[];
  isTaskPoster: boolean;
  hasSubmittedOffer: boolean;
  handleSubmitOffer: (e: FormEvent) => void;
  handleMessageUser: (receiverId?: string) => void;
  offerAmount: string;
  setOfferAmount: (value: string) => void;
  offerMessage: string;
  setOfferMessage: (value: string) => void;
  isSubmitting: boolean;
  currentUserId?: string;
}

export function OffersSection({
  task,
  offers,
  isTaskPoster,
  hasSubmittedOffer,
  handleSubmitOffer,
  handleMessageUser,
  offerAmount,
  setOfferAmount,
  offerMessage,
  setOfferMessage,
  isSubmitting,
  currentUserId,
}: OffersSectionProps) {
  const [isAccepting, setIsAccepting] = useState<string | null>(null);

  // Filter offers: task posters see all, taskers see only their own if they have submitted
  const visibleOffers = isTaskPoster
    ? offers
    : hasSubmittedOffer
    ? currentUserId
      ? offers.filter((offer) => offer.tasker.id === currentUserId)
      : offers // Fallback: assume offers contains only the tasker's offer if hasSubmittedOffer is true
    : [];

  const handleAcceptOffer = async (offer: Offer) => {
    setIsAccepting(offer.id);
    try {
      const response = await axiosInstance.put(
        `/accept-bid/${task.id}/${offer.tasker.id}/`
      );

      if (response.data.status_code === 200) {
        toast.success(response.data.message || "Bid accepted successfully");
      } else {
        toast.error(response.data.message || "Failed to accept bid");
      }
    } catch (error: any) {
      console.error("Error accepting bid:", error);
      toast.error(
        error.response?.data?.message ||
          "An error occurred while accepting the bid"
      );
    } finally {
      setIsAccepting(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Offers ({visibleOffers.length})</CardTitle>
        <CardDescription>
          {isTaskPoster
            ? "Choose the best offer for your task"
            : hasSubmittedOffer
            ? "Your submitted offer"
            : "Submit an offer for this task"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {visibleOffers.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">
            {isTaskPoster
              ? "No offers yet"
              : hasSubmittedOffer
              ? "Your offer is being processed"
              : "No offers submitted yet"}
          </p>
        ) : (
          visibleOffers.map((offer) => (
            <div key={offer.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/profilepage/${offer.tasker.id}`}
                    className="flex items-center gap-2 hover:underline"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {offer.tasker.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{offer.tasker.name}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>
                          {offer.tasker.rating} • {offer.tasker.taskCount} tasks
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="text-right">
                  <p className="font-bold">
                    <IndianRupee className="w-4 h-4 inline" />{" "}
                    {offer.amount.toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {offer.createdAt}
                  </p>
                </div>
              </div>
              <p className="text-sm">{offer.message}</p>
              {isTaskPoster && (
                <div className="flex gap-2">
                  {!task.status && (
                    <Button
                      className="w-full"
                      size="sm"
                      onClick={() => handleAcceptOffer(offer)}
                      disabled={isAccepting === offer.id}
                    >
                      {isAccepting === offer.id
                        ? "Accepting..."
                        : "Accept Offer"}
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleMessageUser(offer.tasker.id)}
                  >
                    Message
                  </Button>
                </div>
              )}
            </div>
          ))
        )}
      </CardContent>
      {!isTaskPoster && task.status && (
        <CardFooter>
          <p className="text-muted-foreground">
            This task is no longer accepting offers.
          </p>
        </CardFooter>
      )}
      {!isTaskPoster && !task.status && !hasSubmittedOffer && (
        <CardFooter>
          <form onSubmit={handleSubmitOffer} className="w-full space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="offerAmount"
                className="flex items-center space-x-1"
              >
                <span>Your Offer</span>
                <IndianRupee className="w-3 h-3" />
              </label>
              <Input
                id="offerAmount"
                type="number"
                placeholder="e.g., 50"
                value={offerAmount}
                onChange={(e) => setOfferAmount(e.target.value)}
                required
                min="1"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="offerMessage">Message</label>
              <Textarea
                id="offerMessage"
                placeholder="Introduce yourself and explain why you're a good fit for this task..."
                value={offerMessage}
                onChange={(e) => setOfferMessage(e.target.value)}
                rows={4}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Offer"}
            </Button>
          </form>
        </CardFooter>
      )}
      {!isTaskPoster && !task.status && hasSubmittedOffer && (
        <CardFooter>
          <p className="text-muted-foreground">
            You have already submitted an offer for this task.
          </p>
        </CardFooter>
      )}
    </Card>
  );
}