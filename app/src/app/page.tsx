import Link from "next/link"
import { Button } from '../components/ui/button';
import { ArrowRight, CheckCircle, Clock, Search, Star } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-primary">JobPool</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/browse" className="text-sm font-medium hover:underline underline-offset-4">
              Browse Tasks
            </Link>
            <Link href="/how-it-works" className="text-sm font-medium hover:underline underline-offset-4">
              How It Works
            </Link>
            <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/signin">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Get Tasks Done or Earn Money Doing Tasks
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    JobPool connects people who need tasks done with skilled taskers ready to help. Post a task or
                    become a tasker today.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/post-task">
                    <Button className="w-full">
                      Post a Task
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/browse">
                    <Button variant="outline" className="w-full">
                      Browse Tasks
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-md overflow-hidden rounded-xl border bg-background p-6 shadow-lg">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Posted 2 hours ago</span>
                      </div>
                      <h3 className="text-xl font-bold">Help Moving Furniture</h3>
                      <p className="text-sm text-muted-foreground">
                        Need help moving a couch and a few boxes from my apartment to my new place. Should take about 2
                        hours.
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold">$50</span>
                        <span className="text-sm text-muted-foreground">/ task</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="text-sm font-medium">4.8</span>
                      </div>
                    </div>
                    <Button className="w-full">View Details</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How JobPool Works</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform makes it easy to get help with tasks or earn money by completing tasks.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Post a Task</h3>
                <p className="text-muted-foreground">
                  Describe what you need done, when you need it, and how much you're willing to pay.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Choose a Tasker</h3>
                <p className="text-muted-foreground">
                  Review offers from skilled Taskers and choose the best person for your task.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Get It Done</h3>
                <p className="text-muted-foreground">
                  Your Tasker completes the job and you release payment only when you're satisfied.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Popular Task Categories</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Browse our most popular categories or post a custom task.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
              <Link href="/browse?category=home">
                <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold">Home</h3>
                </div>
              </Link>
              <Link href="/browse?category=delivery">
                <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" x2="22" y1="12" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold">Delivery</h3>
                </div>
              </Link>
              <Link href="/browse?category=handyman">
                <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold">Handyman</h3>
                </div>
              </Link>
              <Link href="/browse?category=tech">
                <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                      <path d="M12 18h.01" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold">Tech</h3>
                </div>
              </Link>
            </div>
          </div>
        </section>
        <footer className="border-t bg-white">
  <div className="container mx-auto px-4 flex flex-col gap-10 py-12 md:flex-row md:gap-16">
    <div className="flex-1 space-y-4">
      <div className="flex items-center gap-2 font-bold text-2xl">
        <span className="text-primary">JobPool</span>
      </div>
      <p className="text-sm text-muted-foreground max-w-md">
        JobPool connects people who need tasks done with skilled taskers ready to help.
      </p>
    </div>

    <div className="grid flex-1 grid-cols-2 gap-10 sm:grid-cols-3">
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-900">Platform</h3>
        <ul className="space-y-2">
          <li><Link href="/browse" className="text-sm text-muted-foreground hover:underline">Browse Tasks</Link></li>
          <li><Link href="/post-task" className="text-sm text-muted-foreground hover:underline">Post a Task</Link></li>
          <li><Link href="/how-it-works" className="text-sm text-muted-foreground hover:underline">How It Works</Link></li>
        </ul>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-900">Company</h3>
        <ul className="space-y-2">
          <li><Link href="/about" className="text-sm text-muted-foreground hover:underline">About</Link></li>
          <li><Link href="/careers" className="text-sm text-muted-foreground hover:underline">Careers</Link></li>
          <li><Link href="/contact" className="text-sm text-muted-foreground hover:underline">Contact</Link></li>
        </ul>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-900">Legal</h3>
        <ul className="space-y-2">
          <li><Link href="/privacy" className="text-sm text-muted-foreground hover:underline">Privacy</Link></li>
          <li><Link href="/terms" className="text-sm text-muted-foreground hover:underline">Terms</Link></li>
        </ul>
      </div>
    </div>
  </div>

  <div className="border-t">
    <div className="container mx-auto px-4 flex flex-col items-center justify-between gap-4 py-6 md:h-16 md:flex-row">
      <p className="text-xs text-muted-foreground">© 2023 JobPool. All rights reserved.</p>
      <div className="flex items-center gap-4">
        <Link href="#" className="text-sm text-muted-foreground hover:underline">Privacy Policy</Link>
        <Link href="#" className="text-sm text-muted-foreground hover:underline">Terms of Service</Link>
      </div>
    </div>
  </div>
</footer>

      </main>
      
    </div>
  )
}
