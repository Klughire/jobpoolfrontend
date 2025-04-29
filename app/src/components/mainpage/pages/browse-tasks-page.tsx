"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"
import { Card, CardContent } from "../../../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { Badge } from "../../../components/ui/badge"
import { MapPin, Clock, DollarSign, Search, ChevronDown, Calendar, Star, ArrowUpDown } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Slider } from "../../../components/ui/slider"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu"
import { Checkbox } from "../../../components/ui/checkbox"

export function BrowseTasksPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 500])
  const [sortBy, setSortBy] = useState("newest")

  const tasks = [
    {
      id: 1,
      title: "Help moving furniture to new apartment",
      description:
        "Need help moving a couch, bed, and dining table from my current apartment to my new place about 2 miles away.",
      location: "Brooklyn, NY",
      price: 120,
      date: "Tomorrow, 10:00 AM",
      category: "Moving",
      status: "Open",
      postedAt: "2 hours ago",
      user: {
        name: "Jessica K.",
        avatar: "images/placeholder.svg?height=40&width=40",
        rating: 4.8,
        taskCompleted: 12,
      },
    },
    {
      id: 2,
      title: "Weekly house cleaning service needed",
      description:
        "Looking for someone to clean my 2-bedroom apartment weekly. Tasks include vacuuming, mopping, bathroom cleaning, and kitchen cleaning.",
      location: "Manhattan, NY",
      price: 85,
      date: "Every Monday, 9:00 AM",
      category: "Cleaning",
      status: "Open",
      postedAt: "5 hours ago",
      user: {
        name: "Michael T.",
        avatar: "images/placeholder.svg?height=40&width=40",
        rating: 4.9,
        taskCompleted: 28,
      },
    },
    {
      id: 3,
      title: "Fix leaking kitchen sink",
      description: "My kitchen sink has been leaking for a few days. Need a handyman to fix it as soon as possible.",
      location: "Queens, NY",
      price: 75,
      date: "This weekend",
      category: "Handyman",
      status: "Open",
      postedAt: "1 day ago",
      user: {
        name: "Robert L.",
        avatar: "images/placeholder.svg?height=40&width=40",
        rating: 4.7,
        taskCompleted: 8,
      },
    },
    {
      id: 4,
      title: "Pickup and delivery of large package",
      description:
        "Need someone to pick up a large package from a store and deliver it to my home. Package weighs about 30 pounds.",
      location: "Bronx, NY",
      price: 45,
      date: "Today, 5:00 PM",
      category: "Delivery",
      status: "Open",
      postedAt: "3 hours ago",
      user: {
        name: "Sarah M.",
        avatar: "images/placeholder.svg?height=40&width=40",
        rating: 4.6,
        taskCompleted: 15,
      },
    },
    {
      id: 5,
      title: "Website development for small business",
      description:
        "Need a web developer to create a simple website for my bakery business. Should include about 5 pages with a contact form.",
      location: "Remote",
      price: 350,
      date: "Within 2 weeks",
      category: "Tech Services",
      status: "Open",
      postedAt: "2 days ago",
      user: {
        name: "David W.",
        avatar: "images/placeholder.svg?height=40&width=40",
        rating: 4.9,
        taskCompleted: 7,
      },
    },
    {
      id: 6,
      title: "Dog walking service needed",
      description: "Looking for someone to walk my golden retriever for 30 minutes every weekday while I'm at work.",
      location: "Staten Island, NY",
      price: 20,
      date: "Weekdays, 12:00 PM",
      category: "Pet Care",
      status: "Open",
      postedAt: "6 hours ago",
      user: {
        name: "Emily R.",
        avatar: "images/placeholder.svg?height=40&width=40",
        rating: 4.8,
        taskCompleted: 19,
      },
    },
    {
      id: 7,
      title: "Lawn mowing and garden maintenance",
      description:
        "Need someone to mow my lawn and do some basic garden maintenance. The yard is approximately 500 sq ft.",
      location: "Long Island, NY",
      price: 60,
      date: "This Saturday, 10:00 AM",
      category: "Gardening",
      status: "Open",
      postedAt: "1 day ago",
      user: {
        name: "Thomas H.",
        avatar: "images/placeholder.svg?height=40&width=40",
        rating: 4.7,
        taskCompleted: 11,
      },
    },
    {
      id: 8,
      title: "Personal shopping assistant needed",
      description:
        "Looking for someone to help me shop for a new wardrobe. Need fashion advice and assistance for about 3 hours.",
      location: "Manhattan, NY",
      price: 100,
      date: "Next Sunday, 2:00 PM",
      category: "Shopping",
      status: "Open",
      postedAt: "4 hours ago",
      user: {
        name: "Olivia P.",
        avatar: "images/placeholder.svg?height=40&width=40",
        rating: 4.9,
        taskCompleted: 5,
      },
    },
  ]

  const filteredTasks = tasks
    .filter(
      (task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.location.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter((task) => task.price >= priceRange[0] && task.price <= priceRange[1])

  // Sort tasks based on selected option
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "newest") {
      return a.id < b.id ? 1 : -1
    } else if (sortBy === "oldest") {
      return a.id > b.id ? 1 : -1
    } else if (sortBy === "price-high") {
      return a.price < b.price ? 1 : -1
    } else if (sortBy === "price-low") {
      return a.price > b.price ? 1 : -1
    }
    return 0
  })

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
    <>
      <section className="bg-slate-50 py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Browse Tasks</h1>
            <p className="mt-4 text-xl text-gray-500">Find tasks near you and start earning</p>
            <div className="mt-8 flex items-center max-w-md mx-auto">
              <Input
                type="text"
                placeholder="Search tasks..."
                className="flex-1"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button className="ml-2 bg-blue-600 hover:bg-blue-700">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters sidebar */}
            <div className="w-full md:w-1/4">
              <div className="sticky top-20">
                <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Filters</h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowFilters(!showFilters)}
                      className="md:hidden"
                    >
                      {showFilters ? "Hide" : "Show"}
                      <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
                    </Button>
                  </div>

                  <div className={`space-y-6 ${showFilters ? "block" : "hidden md:block"}`}>
                    <div>
                      <h3 className="font-medium mb-3">Categories</h3>
                      <div className="space-y-2">
                        {[
                          "Moving",
                          "Cleaning",
                          "Handyman",
                          "Delivery",
                          "Tech Services",
                          "Pet Care",
                          "Gardening",
                          "Shopping",
                        ].map((category, index) => (
                          <div key={index} className="flex items-center">
                            <Checkbox id={`category-${index}`} />
                            <label htmlFor={`category-${index}`} className="ml-2 text-sm">
                              {category}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3">Price Range</h3>
                      <div className="px-2">
                        <Slider
                          defaultValue={[0, 500]}
                          max={500}
                          step={10}
                          value={priceRange}
                          onValueChange={setPriceRange}
                          className="mb-6"
                        />
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>${priceRange[0]}</span>
                          <span>${priceRange[1]}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3">Location</h3>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All locations</SelectItem>
                          <SelectItem value="manhattan">Manhattan</SelectItem>
                          <SelectItem value="brooklyn">Brooklyn</SelectItem>
                          <SelectItem value="queens">Queens</SelectItem>
                          <SelectItem value="bronx">Bronx</SelectItem>
                          <SelectItem value="staten-island">Staten Island</SelectItem>
                          <SelectItem value="remote">Remote</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3">Date</h3>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select date range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any time</SelectItem>
                          <SelectItem value="today">Today</SelectItem>
                          <SelectItem value="tomorrow">Tomorrow</SelectItem>
                          <SelectItem value="this-week">This week</SelectItem>
                          <SelectItem value="this-weekend">This weekend</SelectItem>
                          <SelectItem value="next-week">Next week</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Apply Filters</Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tasks list */}
            <div className="w-full md:w-3/4">
              <div className="flex justify-between items-center mb-6">
                <div className="text-gray-500">Showing {sortedTasks.length} tasks</div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <ArrowUpDown className="h-4 w-4" />
                      Sort by
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setSortBy("newest")}>Newest first</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("oldest")}>Oldest first</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("price-high")}>Price: High to low</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("price-low")}>Price: Low to high</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <motion.div className="grid gap-6" variants={containerVariants} initial="hidden" animate="visible">
                {sortedTasks.map((task, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                  >
                    <Card className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="grid md:grid-cols-3 gap-6">
                          <div className="md:col-span-2 p-6">
                            <div className="flex justify-between items-start mb-3">
                              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{task.category}</Badge>
                              <Badge variant="outline" className="text-gray-500">
                                {task.status}
                              </Badge>
                            </div>
                            <Link href={`/tasks/${task.id}`}>
                              <h3 className="text-xl font-bold mb-2 hover:text-blue-600 transition-colors">
                                {task.title}
                              </h3>
                            </Link>
                            <p className="text-gray-500 mb-4">{task.description}</p>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div className="flex items-center text-gray-500">
                                <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                                {task.location}
                              </div>
                              <div className="flex items-center text-gray-500">
                                <Clock className="h-4 w-4 mr-2 text-gray-400" />
                                {task.date}
                              </div>
                              <div className="flex items-center text-gray-500">
                                <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                                Posted {task.postedAt}
                              </div>
                              <div className="flex items-center font-medium">
                                <DollarSign className="h-4 w-4 mr-2 text-gray-400" />${task.price}
                              </div>
                            </div>
                          </div>
                          <div className="bg-slate-50 p-6 flex flex-col justify-between">
                            <div className="flex items-center mb-4">
                              <Avatar className="h-10 w-10 mr-3">
                                <AvatarImage src={task.user.avatar || "images/placeholder.svg"} alt={task.user.name} />
                                <AvatarFallback>{task.user.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{task.user.name}</div>
                                <div className="flex items-center text-sm text-gray-500">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                                  {task.user.rating} • {task.user.taskCompleted} tasks
                                </div>
                              </div>
                            </div>
                            <div className="mt-auto">
                              <Link href={`/tasks/${task.id}`}>
                                <Button className="w-full bg-blue-600 hover:bg-blue-700">View Details</Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              {sortedTasks.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-xl font-bold mb-2">No tasks found</h3>
                  <p className="text-gray-500 mb-6">Try adjusting your filters or search query</p>
                  <Button
                    onClick={() => {
                      setSearchQuery("")
                      setPriceRange([0, 500])
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Can't find what you're looking for?
              </h2>
              <p className="text-xl text-gray-500 mb-8">
                Post your own task and let Taskers come to you with their offers.
              </p>
              <Link href="/post-task">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">Post a Task</Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative h-[400px]"
            >
              <Image
                src="images/placeholder.svg?height=400&width=600"
                fill
                alt="Post a task"
                className="object-cover rounded-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
