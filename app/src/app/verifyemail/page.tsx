"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Mail, CheckCircle, AlertCircle, ArrowRight } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
// import { Alert, AlertDescription } from "../../components/ui/alert"

export default function VerifyEmailPage() {
  const router = useRouter()
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""))
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Handle OTP input change
  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value.slice(0, 1)
    setOtp(newOtp)

    // Auto-focus next input if current input is filled
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  // Handle key press for backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  // Handle OTP verification
  const verifyOtp = async () => {
    const otpValue = otp.join("")

    // Validate OTP length
    if (otpValue.length !== 6) {
      setError("Please enter all 6 digits of the OTP")
      return
    }

    setIsVerifying(true)
    setError(null)

    try {
      // This is where you would make an API call to verify the OTP
      // For demo purposes, we're simulating a successful verification
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate successful verification
      setSuccess(true)

      // Redirect to dashboard after successful verification
      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    } catch (err) {
      setError("Invalid OTP. Please try again.")
    } finally {
      setIsVerifying(false)
    }
  }

  // Handle resend OTP
  const resendOtp = async () => {
    if (resendCooldown > 0) return

    try {
      // This is where you would make an API call to resend the OTP
      // For demo purposes, we're just setting a cooldown
      setResendCooldown(60)

      // Show success message
      setError(null)
      setSuccess(false)
      setOtp(Array(6).fill(""))
      inputRefs.current[0]?.focus()
    } catch (err) {
      setError("Failed to resend OTP. Please try again.")
    }
  }

  // Cooldown timer for resend button
  useEffect(() => {
    if (resendCooldown <= 0) return

    const timer = setInterval(() => {
      setResendCooldown((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [resendCooldown])

  // Paste OTP from clipboard
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text")
    const pastedOtp = pastedData.slice(0, 6).split("")

    if (!/^\d+$/.test(pastedData)) return

    const newOtp = [...otp]
    pastedOtp.forEach((digit, index) => {
      if (index < 6) newOtp[index] = digit
    })

    setOtp(newOtp)

    // Focus the next empty input or the last input if all are filled
    const nextEmptyIndex = newOtp.findIndex((digit) => !digit)
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus()
    } else {
      inputRefs.current[5]?.focus()
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Verify your email</CardTitle>
          <CardDescription className="text-center">
            We&apos;ve sent a verification code to your email address. Enter the code below to confirm your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          

          <div className="flex justify-center gap-2">
            {otp.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="h-12 w-12 text-center text-lg font-semibold"
                disabled={isVerifying || success}
              />
            ))}
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Didn&apos;t receive the code?{" "}
            <button
              onClick={resendOtp}
              disabled={resendCooldown > 0 || isVerifying || success}
              className="text-primary hover:underline disabled:text-muted-foreground disabled:no-underline"
            >
              {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend code"}
            </button>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={verifyOtp}
            disabled={otp.some((digit) => !digit) || isVerifying || success}
          >
            {isVerifying ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Verifying...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Verify Email <ArrowRight className="h-4 w-4" />
              </span>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
