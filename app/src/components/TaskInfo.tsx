import { Calendar, Clock, DollarSign, MapPin, MessageSquare } from "lucide-react";
import Image from "next/image"; // Import Image from next/image
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

// Interfaces
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

interface Image {
  id: string;
  url: string;
  alt: string;
}

interface Offer {
  id: string;
  tasker: User;
  amount: number;
  message: string;
  createdAt: string;
}

interface User {
  id: string;
  name: string;
  rating: number;
  taskCount: number;
  joinedDate: string;
}

interface TaskInfoProps {
  task: Task;
  openImageGallery: (index: number) => void;
  handleMessageUser: () => void;
  isTaskPoster: boolean;
}

export function TaskInfo({ task, openImageGallery, handleMessageUser, isTaskPoster }: TaskInfoProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl">{task.title}</CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1">
              <Clock className="h-4 w-4" />
              <span>Posted {task.postedAt}</span>
              <Badge variant={task.status ? "secondary" : "outline"}>
                {task.status ? "Assigned" : "Open"}
              </Badge>
            </CardDescription>
          </div>
        </div>  
        </CardHeader>
      <CardContent className="space-y-4">
        {task.images.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-medium">Images</h3>
            <div className="grid grid-cols-3 gap-2">
              {task.images.map((image, index) => (
                <div
                  key={image.id}
                  className="aspect-square rounded-md overflow-hidden border cursor-pointer relative"
                  onClick={() => openImageGallery(index)}
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="space-y-2">
          <h3 className="font-medium">Description</h3>
          <p className="text-muted-foreground">{task.description}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-medium text-muted-foreground">Budget</h4>
            <p className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              {task.budget}
            </p>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-medium text-muted-foreground">Location</h4>
            <p className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {task.location}
            </p>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-medium text-muted-foreground">Due Date</h4>
            <p className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {task.dueDate}
            </p>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-medium text-muted-foreground">Category</h4>
            <p>{task.category}</p>
          </div>
        </div>
      </CardContent>
      {task.status && (
        <CardFooter>
          <Button className="w-full" onClick={handleMessageUser}>
            <MessageSquare className="mr-2 h-4 w-4" />
            Message {isTaskPoster ? task.assignedTasker?.name : task.poster.name}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}