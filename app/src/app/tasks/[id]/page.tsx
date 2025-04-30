
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
          postedAt: job.timestamp
            ? (() => {
                const date = new Date(job.timestamp);
                return isNaN(date.getTime())
                  ? 'Invalid Date'
                  : date.toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      timeZone: 'UTC'
                    });
              })()
            : 'N/A',
          dueDate: job.job_due_date
            ? new Date(job.job_due_date).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                timeZone: 'UTC'
              })
            : 'N/A',
          category: job.job_category_name,
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

  const handleMessageUser = async (receiverId?: string) => {
    if (!userId || !task) {
      toast.error('Please log in to send messages');
      return;
    }
  
    const senderId = userId;
    // Determine recipient: use provided receiverId (for specific bidder) or default to poster/tasker
    const targetReceiverId = receiverId || (isTaskPoster ? offers[0]?.tasker.id : task.poster.id);
  
    if (!targetReceiverId) {
      toast.error('No recipient available to message');
      return;
    }
  
    try {
      // Attempt to get existing chat or create a new one
      const response = await axiosInstance.get(`/get-chat-id/?sender=${senderId}&receiver=${targetReceiverId}`);
      if (response.data.status_code === 200 && response.data.data.chat_id) {
        router.push(`/messages/${response.data.data.chat_id}`);
      } else {
        // Navigate to new chat page with sender and receiver IDs
        router.push(`/messages/new?sender=${senderId}&receiver=${targetReceiverId}`);
      }
    } catch (error: any) {
      console.error('Error initiating chat:', error);
      toast.error(error.response?.data?.message || 'Failed to initiate chat');
    }
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