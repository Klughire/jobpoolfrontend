"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AadharVerificationProps {
  onComplete: () => void
}

export default function AadharVerification({ onComplete }: AadharVerificationProps) {
  const [aadharNumber, setAadharNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [aadharFile, setAadharFile] = useState<File | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [verificationMethod, setVerificationMethod] = useState("otp")

  const handleSendOtp = () => {
    // In a real application, this would call an API to send OTP
    setOtpSent(true)
  }

  const handleVerify = () => {
    // In a real application, this would call an API to verify the Aadhar details
    setIsVerifying(true)
    setTimeout(() => {
      setIsVerifying(false)
      onComplete()
    }, 1500)
  }

  const isAadharNumberValid = (aadhar: string) => {
    // Basic Aadhar validation - 12 digits
    const aadharRegex = /^\d{12}$/
    return aadharRegex.test(aadhar)
  }

  const formatAadharNumber = (value: string) => {
    const digits = value.replace(/\D/g, "")
    if (digits.length <= 4) return digits
    if (digits.length <= 8) return `${digits.slice(0, 4)}-${digits.slice(4)}`
    return `${digits.slice(0, 4)}-${digits.slice(4, 8)}-${digits.slice(8, 12)}`
  }

  const handleAadharChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatAadharNumber(e.target.value)
    setAadharNumber(formattedValue)
  }

  const isOtpFormValid = aadharNumber && isAadharNumberValid(aadharNumber.replace(/-/g, "")) && otp.length === 6
  const isDocumentFormValid = aadharNumber && isAadharNumberValid(aadharNumber.replace(/-/g, "")) && aadharFile

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-4 md:flex-row">
        <div className="flex w-full items-center justify-center md:w-1/3">
          <div className="rounded-lg bg-primary/10 p-4">
            <img
              src="/placeholder.svg?height=120&width=120"
              alt="Aadhar Verification"
              className="h-24 w-24 object-contain"
            />
          </div>
        </div>
        <div className="w-full md:w-2/3">
          <h3 className="text-lg font-medium">Aadhar Verification</h3>
          <p className="text-sm text-gray-500">
            Aadhar verification helps confirm your identity and address details securely.
          </p>
        </div>
      </div>

      <Tabs defaultValue="otp" onValueChange={setVerificationMethod}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="otp">Verify with OTP</TabsTrigger>
          <TabsTrigger value="document">Upload Document</TabsTrigger>
        </TabsList>

        <TabsContent value="otp" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="aadhar-number">Aadhar Number</Label>
            <Input
              id="aadhar-number"
              placeholder="XXXX-XXXX-XXXX"
              value={aadharNumber}
              onChange={handleAadharChange}
              maxLength={14}
            />
            {aadharNumber && !isAadharNumberValid(aadharNumber.replace(/-/g, "")) && (
              <p className="text-xs text-red-500">Please enter a valid 12-digit Aadhar number</p>
            )}
          </div>

          {!otpSent ? (
            <Button
              className="w-full"
              onClick={handleSendOtp}
              disabled={!aadharNumber || !isAadharNumberValid(aadharNumber.replace(/-/g, ""))}
            >
              Send OTP
            </Button>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                  id="otp"
                  placeholder="6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  maxLength={6}
                />
                <p className="text-xs text-gray-500">OTP sent to registered mobile number</p>
              </div>

              <Button className="w-full" onClick={handleVerify} disabled={!isOtpFormValid || isVerifying}>
                {isVerifying ? "Verifying..." : "Verify Aadhar"}
              </Button>
            </>
          )}
        </TabsContent>

        <TabsContent value="document" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="aadhar-number-doc">Aadhar Number</Label>
            <Input
              id="aadhar-number-doc"
              placeholder="XXXX-XXXX-XXXX"
              value={aadharNumber}
              onChange={handleAadharChange}
              maxLength={14}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="aadhar-upload">Upload Aadhar Card (Front & Back)</Label>
            <div className="flex items-center gap-2">
              <Input
                id="aadhar-upload"
                type="file"
                accept="image/png, image/jpeg, image/jpg, application/pdf"
                className="hidden"
                onChange={(e) => setAadharFile(e.target.files?.[0] || null)}
              />
              <Button
                variant="outline"
                className="w-full"
                onClick={() => document.getElementById("aadhar-upload")?.click()}
              >
                <Upload className="mr-2 h-4 w-4" />
                {aadharFile ? aadharFile.name : "Choose file"}
              </Button>
            </div>
            {aadharFile && <p className="text-xs text-green-500">File uploaded: {aadharFile.name}</p>}
          </div>

          <Button className="w-full" onClick={handleVerify} disabled={!isDocumentFormValid || isVerifying}>
            {isVerifying ? "Verifying..." : "Verify Aadhar"}
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  )
}
