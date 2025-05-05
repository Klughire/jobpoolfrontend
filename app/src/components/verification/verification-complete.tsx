"use client"

import { CheckCircle2, AlertCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface VerificationCompleteProps {
  verificationStatus: {
    pan: { completed: boolean; skipped: boolean }
    aadhar: { completed: boolean; skipped: boolean }
    bank: { completed: boolean; skipped: boolean }
  }
}

export default function VerificationComplete({ verificationStatus }: VerificationCompleteProps) {
  const allCompleted =
    verificationStatus.pan.completed && verificationStatus.aadhar.completed && verificationStatus.bank.completed

  const allSkipped =
    verificationStatus.pan.skipped && verificationStatus.aadhar.skipped && verificationStatus.bank.skipped

  const someCompleted =
    (verificationStatus.pan.completed || verificationStatus.aadhar.completed || verificationStatus.bank.completed) &&
    !allCompleted

  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-6">
      {allCompleted && (
        <>
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-medium text-green-600">Verification Complete!</h3>
            <p className="mt-2 text-gray-600">
              All your documents have been successfully verified. You now have full access to all features.
            </p>
          </div>
        </>
      )}

      {someCompleted && (
        <>
          <div className="rounded-full bg-amber-100 p-3">
            <AlertCircle className="h-12 w-12 text-amber-600" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-medium text-amber-600">Partial Verification Complete</h3>
            <p className="mt-2 text-gray-600">
              Some of your documents have been verified. You can complete the remaining verifications later.
            </p>
          </div>
          <div className="w-full max-w-md space-y-2 rounded-md border p-4">
            <h4 className="font-medium">Verification Status:</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                {verificationStatus.pan.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : verificationStatus.pan.skipped ? (
                  <XCircle className="h-5 w-5 text-amber-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-gray-400" />
                )}
                <span>
                  PAN Card:{" "}
                  {verificationStatus.pan.completed
                    ? "Verified"
                    : verificationStatus.pan.skipped
                      ? "Skipped"
                      : "Pending"}
                </span>
              </li>
              <li className="flex items-center gap-2">
                {verificationStatus.aadhar.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : verificationStatus.aadhar.skipped ? (
                  <XCircle className="h-5 w-5 text-amber-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-gray-400" />
                )}
                <span>
                  Aadhar:{" "}
                  {verificationStatus.aadhar.completed
                    ? "Verified"
                    : verificationStatus.aadhar.skipped
                      ? "Skipped"
                      : "Pending"}
                </span>
              </li>
              <li className="flex items-center gap-2">
                {verificationStatus.bank.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : verificationStatus.bank.skipped ? (
                  <XCircle className="h-5 w-5 text-amber-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-gray-400" />
                )}
                <span>
                  Bank Account:{" "}
                  {verificationStatus.bank.completed
                    ? "Verified"
                    : verificationStatus.bank.skipped
                      ? "Skipped"
                      : "Pending"}
                </span>
              </li>
            </ul>
          </div>
        </>
      )}

      {allSkipped && (
        <>
          <div className="rounded-full bg-amber-100 p-3">
            <XCircle className="h-12 w-12 text-amber-600" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-medium text-amber-600">Verification Skipped</h3>
            <p className="mt-2 text-gray-600">
              You've skipped all verification steps. Some features may be limited until verification is complete.
            </p>
          </div>
        </>
      )}

      <div className="flex gap-4">
        <Button variant="outline" asChild>
          <Link href="/verification">Complete Verification Later</Link>
        </Button>
        <Button asChild>
          <Link href="/profile">Go to Profile</Link>
        </Button>
      </div>
    </div>
  )
}
