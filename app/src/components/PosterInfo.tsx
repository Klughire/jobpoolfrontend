// import { MessageSquare, Star } from "lucide-react";
// import { Button } from "./ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
// import { Avatar, AvatarFallback } from "./ui/avatar";

// interface User {
//     id: string;
//     name: string;
//     rating: number;
//     taskCount: number;
//     joinedDate: string;
//   }


// interface PosterInfoProps {
//     poster: User;
//     isTaskPoster: boolean;
//     handleMessageUser: () => void;
//   }
  
//   export function PosterInfo({ poster, isTaskPoster, handleMessageUser }: PosterInfoProps) {
//     return (
//       <Card>
//         <CardHeader>
//           <CardTitle>About the Poster</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="flex items-center gap-3">
//             <Avatar className="h-10 w-10">
//               <AvatarFallback>{poster.name.charAt(0)}</AvatarFallback>
//             </Avatar>
//             <div>
//               <p className="font-medium">{poster.name}</p>
//               <div className="flex items-center gap-1 text-sm text-muted-foreground">
//                 <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
//                 <span>{poster.rating}</span>
//               </div>
//             </div>
//           </div>
//           <div className="text-sm space-y-2">
//             <div className="flex justify-between">
//               <span className="text-muted-foreground">Member since</span>
//               <span>{poster.joinedDate}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-muted-foreground">Tasks posted</span>
//               <span>{poster.taskCount}</span>
//             </div>
//           </div>
//           {/* {!isTaskPoster && (
//             <Button variant="outline" className="w-full" onClick={handleMessageUser}>
//               <MessageSquare className="mr-2 h-4 w-4" />
//               Contact
//             </Button>
//           )} */}
//         </CardContent>
//       </Card>
//     );
//   }


// components/PosterInfo.tsx
import { Button } from '@/components/ui/button';

interface User {
    id: string;
    name: string;
    rating: number;
    taskCount: number;
    joinedDate: string;
  }


interface PosterInfoProps {
  poster: User;
  isTaskPoster: boolean;
  handleMessageUser: (receiverId?: string) => void;
}

export function PosterInfo({ poster, isTaskPoster, handleMessageUser }: PosterInfoProps) {
  return (
    <div className="border p-4 rounded-md">
      <h2 className="text-lg font-semibold">Posted By</h2>
      <p className="font-medium">{poster.name}</p>
      <p className="text-sm">Rating: {poster.rating} ★</p>
      <p className="text-sm">Tasks Completed: {poster.taskCount}</p>
      <p className="text-sm">Joined: {poster.joinedDate}</p>
      {!isTaskPoster && (
        <Button
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={() => {
            console.log('Messaging poster:', { posterId: poster.id });
            handleMessageUser(poster.id);
          }}
        >
          Message Poster
        </Button>
      )}
    </div>
  );
}