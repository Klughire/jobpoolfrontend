"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "../../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Badge } from "../../components/ui/badge"
import { MapPin, Clock, DollarSign } from "lucide-react"

export function TaskExamples() {
  const tasks = [
    {
      title: "Help moving furniture to new apartment",
      location: "Brooklyn, NY",
      price: "$120",
      date: "Tomorrow",
      category: "Moving",
      user: {
        name: "Jessica K.",
        avatar: "/images/placeholder.svg?height=40&width=40",
      },
    },
    {
      title: "Weekly house cleaning service needed",
      location: "Manhattan, NY",
      price: "$85",
      date: "Every Monday",
      category: "Cleaning",
      user: {
        name: "Michael T.",
        avatar: "/images/placeholder.svg?height=40&width=40",
      },
    },
    {
      title: "Fix leaking kitchen sink",
      location: "Queens, NY",
      price: "$75",
      date: "This weekend",
      category: "Handyman",
      user: {
        name: "Robert L.",
        avatar: "/images/placeholder.svg?height=40&width=40",
      },
    },
    {
      title: "Pickup and delivery of large package",
      location: "Bronx, NY",
      price: "$45",
      date: "Today",
      category: "Delivery",
      user: {
        name: "Sarah M.",
        avatar: "/images/placeholder.svg?height=40&width=40",
      },
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  }

  return (
    <section id="browse" className="py-16 bg-white">
      <div className="container px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Popular tasks near you</h2>
          <p className="mt-4 text-gray-500 md:text-xl">Browse tasks or post your own</p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {tasks.map((task, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
            >
              <Card className="overflow-hidden h-full flex flex-col">
                <CardContent className="p-6 flex-1">
                  <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">{task.category}</Badge>
                  <h3 className="text-lg font-bold mb-3">{task.title}</h3>
                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      {task.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-400" />
                      {task.date}
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                      {task.price}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0 border-t">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={task.user.avatar || "/images/placeholder.svg"} alt={task.user.name} />
                      <AvatarFallback>{task.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{task.user.name}</span>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
