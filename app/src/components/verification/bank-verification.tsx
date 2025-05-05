"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload } from "lucide-react"

interface BankVerificationProps {
  onComplete: () => void
}

export default function BankVerification({ onComplete }: BankVerificationProps) {
  const [accountNumber, setAccountNumber] = useState("")
  const [confirmAccountNumber, setConfirmAccountNumber] = useState("")
  const [ifscCode, setIfscCode] = useState("")
  const [accountHolderName, setAccountHolderName] = useState("")
  const [bankName, setBankName] = useState("")
  const [chequeFile, setChequeFile] = useState<File | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [bankDetails, setBankDetails] = useState<any>(null)

  const handleVerifyIfsc = () => {
    // In a real application, this would call an API to verify the IFSC code
    if (ifscCode.length === 11) {
      // Simulate fetching bank details
      setTimeout(() => {
        setBankDetails({
          bank: "EXAMPLE BANK",
          branch: "EXAMPLE BRANCH",
          address: "123 Example Street, City, State, PIN",
        })
        setBankName("EXAMPLE BANK")
      }, 500)
    }
  }

  const handleVerify = () => {
    // In a real application, this would call an API to verify the bank details
    setIsVerifying(true)
    setTimeout(() => {
      setIsVerifying(false)
      onComplete()
    }, 1500)
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
    accountHolderName &&
    bankName

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
          <h3 className="text-lg font-medium">Bank Account Verification</h3>
          <p className="text-sm text-gray-500">
            Linking your bank account enables secure transactions and withdrawals.
          </p>
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
          <div className="flex gap-2">
            <Input
              id="ifsc-code"
              placeholder="XXXX0XXXXXX"
              value={ifscCode}
              onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
              maxLength={11}
              className="flex-1"
            />
            <Button variant="outline" onClick={handleVerifyIfsc} disabled={!ifscCode || !isIfscValid(ifscCode)}>
              Verify
            </Button>
          </div>
          {ifscCode && !isIfscValid(ifscCode) && <p className="text-xs text-red-500">Please enter a valid IFSC code</p>}
          {bankDetails && (
            <div className="mt-2 rounded-md bg-gray-50 p-2 text-xs">
              <p>
                <strong>Bank:</strong> {bankDetails.bank}
              </p>
              <p>
                <strong>Branch:</strong> {bankDetails.branch}
              </p>
              <p>
                <strong>Address:</strong> {bankDetails.address}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="bank-name">Bank Name</Label>
          <Input
            id="bank-name"
            placeholder="Bank Name"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            readOnly={!!bankDetails}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cheque-upload">Upload Cancelled Cheque (Optional)</Label>
          <div className="flex items-center gap-2">
            <Input
              id="cheque-upload"
              type="file"
              accept="image/png, image/jpeg, image/jpg, application/pdf"
              className="hidden"
              onChange={(e) => setChequeFile(e.target.files?.[0] || null)}
            />
            <Button
              variant="outline"
              className="w-full"
              onClick={() => document.getElementById("cheque-upload")?.click()}
            >
              <Upload className="mr-2 h-4 w-4" />
              {chequeFile ? chequeFile.name : "Choose file"}
            </Button>
          </div>
          {chequeFile && <p className="text-xs text-green-500">File uploaded: {chequeFile.name}</p>}
        </div>

        <Button className="w-full" onClick={handleVerify} disabled={!isFormValid || isVerifying}>
          {isVerifying ? "Verifying..." : "Verify Bank Account"}
        </Button>
      </div>
    </div>
  )
}
