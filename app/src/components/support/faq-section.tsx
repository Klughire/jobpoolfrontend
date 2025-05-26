"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
}

const faqData: FAQItem[] = [
  {
    id: "1",
    question: "How do I create an account?",
    answer:
      "To create an account, click on the 'Sign Up' button in the top right corner of our homepage. Fill in your details including name, email, and password. You'll receive a verification email to activate your account.",
    category: "account",
  },
  {
    id: "2",
    question: "How do I reset my password?",
    answer:
      "Click on 'Forgot Password' on the login page. Enter your email address and we'll send you a reset link. Follow the instructions in the email to create a new password.",
    category: "account",
  },
  {
    id: "3",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express), debit cards, UPI, net banking, and digital wallets like Paytm and PhonePe.",
    category: "billing",
  },
  {
    id: "4",
    question: "How do I get a refund?",
    answer:
      "Refunds can be requested within 7 days of payment. Go to your order history, select the transaction, and click 'Request Refund'. Refunds are processed within 5-7 business days.",
    category: "billing",
  },
  {
    id: "5",
    question: "Why is my payment failing?",
    answer:
      "Payment failures can occur due to insufficient funds, incorrect card details, expired cards, or network issues. Please check your payment information and try again. Contact your bank if the issue persists.",
    category: "technical",
  },
  {
    id: "6",
    question: "How do I contact customer support?",
    answer:
      "You can reach us through multiple channels: submit a support ticket through this page, email us at support@example.com, call us at +91-1234567890, or use our live chat feature.",
    category: "general",
  },
  {
    id: "7",
    question: "What are your business hours?",
    answer:
      "Our customer support is available Monday to Friday, 9:00 AM to 6:00 PM IST. For urgent issues, you can submit a ticket anytime and we'll respond within 24 hours.",
    category: "general",
  },
  {
    id: "8",
    question: "How do I update my profile information?",
    answer:
      "Log into your account and go to 'Profile Settings'. You can update your personal information, contact details, and preferences. Don't forget to save your changes.",
    category: "account",
  },
]

export function FAQSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const filteredFAQs = faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const categories = Array.from(new Set(faqData.map((faq) => faq.category)))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
        <CardDescription>Find quick answers to common questions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input placeholder="Search FAQs..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>

        <div className="space-y-3">
          {filteredFAQs.map((faq) => (
            <div key={faq.id} className="border rounded-lg">
              <button
                onClick={() => toggleExpanded(faq.id)}
                className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium">{faq.question}</span>
                {expandedItems.includes(faq.id) ? (
                  <ChevronUp className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                )}
              </button>
              {expandedItems.includes(faq.id) && <div className="px-4 pb-3 text-muted-foreground">{faq.answer}</div>}
            </div>
          ))}
        </div>

        {filteredFAQs.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">No FAQs found matching your search.</div>
        )}
      </CardContent>
    </Card>
  )
}
