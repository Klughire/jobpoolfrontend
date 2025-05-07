"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface BankVerificationProps {
  onComplete: () => void
}

export default function BankVerification({ onComplete }: BankVerificationProps) {
  const [accountNumber, setAccountNumber] = useState("")
  const [confirmAccountNumber, setConfirmAccountNumber] = useState("")
  const [ifscCode, setIfscCode] = useState("")
  const [accountHolderName, setAccountHolderName] = useState("")
  const [bankName, setBankName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = () => {
    // In a real application, this would call an API to save the bank details
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      onComplete()
    }, 1000)
  }

  const isIfscValid = (ifsc: string) => {
    // Basic IFSC validation - 11 characters, first 4 alphabets, 5th is 0, last 6 alphanumeric
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/
    return ifscRegex.test(ifsc)
  }

  const isFormValid =
    accountNumber &&
    confirmAccountNumber &&
    accountNumber === confirmAccountNumber &&
    ifscCode &&
    isIfscValid(ifscCode) &&
    accountHolderName

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-4 md:flex-row">
        <div className="flex w-full items-center justify-center md:w-1/3">
          <div className="rounded-lg bg-primary/10 p-4">
            <img
              src="/placeholder.svg?height=120&width=120"
              alt="Bank Verification"
              className="h-24 w-24 object-contain"
            />
          </div>
        </div>
        <div className="w-full md:w-2/3">
          <h3 className="text-lg font-medium">Bank Account Details</h3>
          <p className="text-sm text-gray-500">Please provide your bank account details for future transactions.</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="account-holder-name">Account Holder Name</Label>
          <Input
            id="account-holder-name"
            placeholder="Full Name as per Bank Records"
            value={accountHolderName}
            onChange={(e) => setAccountHolderName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="account-number">Account Number</Label>
          <Input
            id="account-number"
            placeholder="Enter Account Number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ""))}
            type="password"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm-account-number">Confirm Account Number</Label>
          <Input
            id="confirm-account-number"
            placeholder="Re-enter Account Number"
            value={confirmAccountNumber}
            onChange={(e) => setConfirmAccountNumber(e.target.value.replace(/\D/g, ""))}
          />
          {confirmAccountNumber && accountNumber !== confirmAccountNumber && (
            <p className="text-xs text-red-500">Account numbers do not match</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="ifsc-code">IFSC Code</Label>
          <Input
            id="ifsc-code"
            placeholder="XXXX0XXXXXX"
            value={ifscCode}
            onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
            maxLength={11}
          />
          {ifscCode && !isIfscValid(ifscCode) && <p className="text-xs text-red-500">Please enter a valid IFSC code</p>}
        </div>

        <Button className="w-full" onClick={handleSubmit} disabled={!isFormValid || isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Bank Details"}
        </Button>
      </div>
    </div>
  )
}
