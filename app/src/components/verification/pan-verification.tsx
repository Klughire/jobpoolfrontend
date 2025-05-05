"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload } from "lucide-react"

interface PanVerificationProps {
  onComplete: () => void
}

export default function PanVerification({ onComplete }: PanVerificationProps) {
  const [panNumber, setPanNumber] = useState("")
  const [panName, setPanName] = useState("")
  const [panFile, setPanFile] = useState<File | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)

  const handleVerify = () => {
    // In a real application, this would call an API to verify the PAN details
    setIsVerifying(true)
    setTimeout(() => {
      setIsVerifying(false)
      onComplete()
    }, 1500)
  }

  const isPanNumberValid = (pan: string) => {
    // Basic PAN validation - 10 characters, alphanumeric
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
    return panRegex.test(pan)
  }

  const isFormValid = panNumber && isPanNumberValid(panNumber) && panName && panFile

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-4 md:flex-row">
        <div className="flex w-full items-center justify-center md:w-1/3">
          <div className="rounded-lg bg-primary/10 p-4">
            <img
              src="/placeholder.svg?height=120&width=120"
              alt="PAN Card Verification"
              className="h-24 w-24 object-contain"
            />
          </div>
        </div>
        <div className="w-full md:w-2/3">
          <h3 className="text-lg font-medium">PAN Card Verification</h3>
          <p className="text-sm text-gray-500">
            Your PAN (Permanent Account Number) is required for tax purposes and financial transactions.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="pan-number">PAN Number</Label>
          <Input
            id="pan-number"
            placeholder="ABCDE1234F"
            value={panNumber}
            onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
            maxLength={10}
          />
          {panNumber && !isPanNumberValid(panNumber) && (
            <p className="text-xs text-red-500">Please enter a valid PAN number (e.g., ABCDE1234F)</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="pan-name">Name as on PAN Card</Label>
          <Input id="pan-name" placeholder="Full Name" value={panName} onChange={(e) => setPanName(e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pan-upload">Upload PAN Card (Front)</Label>
          <div className="flex items-center gap-2">
            <Input
              id="pan-upload"
              type="file"
              accept="image/png, image/jpeg, image/jpg, application/pdf"
              className="hidden"
              onChange={(e) => setPanFile(e.target.files?.[0] || null)}
            />
            <Button variant="outline" className="w-full" onClick={() => document.getElementById("pan-upload")?.click()}>
              <Upload className="mr-2 h-4 w-4" />
              {panFile ? panFile.name : "Choose file"}
            </Button>
          </div>
          {panFile && <p className="text-xs text-green-500">File uploaded: {panFile.name}</p>}
        </div>

        <Button className="w-full" onClick={handleVerify} disabled={!isFormValid || isVerifying}>
          {isVerifying ? "Verifying..." : "Verify PAN"}
        </Button>
      </div>
    </div>
  )
}
