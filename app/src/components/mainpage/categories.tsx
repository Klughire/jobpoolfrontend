"use client"

import { motion } from "framer-motion"
import { Truck, Home, Briefcase, PaintBucket, Wrench, ShoppingBag, Laptop, Leaf } from "lucide-react"
import Link from "next/link"

export function Categories() {
  const categories = [
    {
      icon: <Truck className="h-8 w-8" />,
      name: "Moving & Delivery",
      tasks: 1245,
    },
    {
      icon: <Home className="h-8 w-8" />,
      name: "Home Cleaning",
      tasks: 987,
    },
    {
      icon: <Briefcase className="h-8 w-8" />,
      name: "Business Services",
      tasks: 654,
    },
    {
      icon: <PaintBucket className="h-8 w-8" />,
      name: "Home Improvement",
      tasks: 876,
    },
    {
      icon: <Wrench className="h-8 w-8" />,
      name: "Handyman",
      tasks: 765,
    },
    {
      icon: <ShoppingBag className="h-8 w-8" />,
      name: "Shopping",
      tasks: 432,
    },
    {
      icon: <Laptop className="h-8 w-8" />,
      name: "Tech Services",
      tasks: 543,
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      name: "Gardening",
      tasks: 321,
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
    <section id="categories" className="py-16 bg-slate-50">
      <div className="container px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Browse by category</h2>
          <p className="mt-4 text-gray-500 md:text-xl">Find the perfect Tasker for your needs</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              className="bg-white rounded-xl p-6 shadow-md transition-all duration-200"
            >
              <Link href={`/categories/${category.name.toLowerCase().replace(/\s+/g, "-")}`}>
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-blue-50 rounded-full mb-4">{category.icon}</div>
                  <h3 className="font-medium text-lg mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.tasks} tasks</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
