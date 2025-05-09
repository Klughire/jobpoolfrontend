// "use client"

// import { useState } from "react"
// import { Button } from "../../components/ui/button"
// import { Input } from "../../components/ui/input"
// import { Label } from "../../components/ui/label"
// import { CheckCircle } from "lucide-react"
// import axiosInstance from "../../lib/axiosInstance" 
// import useStore from "../../lib/Zustand";

// interface BankVerificationProps {
//   onComplete: () => void
// }

// export default function BankVerification({ onComplete }: BankVerificationProps) {
//   const [accountNumber, setAccountNumber] = useState("")
//   const [confirmAccountNumber, setConfirmAccountNumber] = useState("")
//   const [ifscCode, setIfscCode] = useState("")
//   const [isVerifying, setIsVerifying] = useState(false)
//   const [isVerified, setIsVerified] = useState(false)
//   const [error, setError] = useState("")
//   const { userId } = useStore();

//   // Bank details fetched from API
//   const [bankDetails, setBankDetails] = useState<{
//     accountHolderName: string
//     bankName: string
//     branchName: string
   
//   } | null>(null)

  

//   const handleVerify = async () => {
//     setError("")
//     setIsVerifying(true)

//     try {
//       const response = await axiosInstance.post(`/verify-bank/?bank_account_number=${accountNumber}&ifsc_code=${ifscCode}&user_id=${userId}`)

//       const data = response.data

//       setIsVerifying(false)

//       if (data.status_code == 200 ) {
//         setBankDetails({
//           accountHolderName: data.data.name_at_bank,
//           bankName: data.data.bank_name,
//           branchName: data.ifsc_details.branch,
         
//         })
//         setIsVerified(true)
//       } else {
//         setError(data.message || "Unable to verify bank details. Please check the account number and IFSC code.")
//       }
//     } catch (err: any) {
//       setIsVerifying(false)
//       setError(err.response?.data?.message || "Failed to connect to the server. Please try again later.")
//     }
//   }

//   const handleSubmit = () => {
//     setIsVerifying(true)
//     setTimeout(() => {
//       setIsVerifying(false)
//       onComplete()
//     }, 1000)
//   }

//   const isIfscValid = (ifsc: string) => {
//     const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/
//     return ifscRegex.test(ifsc)
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col items-center gap-4 md:flex-row">
//         <div className="flex w-full items-center justify-center md:w-1/3">
//           <div className="rounded-lg bg-primary/10 p-4">
//             <img
//               src="/images/placeholder.svg?height=120&width=120"
//               alt="Bank Verification"
//               className="h-24 w-24 object-contain"
//             />
//           </div>
//         </div>
//         <div className="w-full md:w-2/3">
//           <h3 className="text-lg font-medium">Bank Account Details</h3>
//           <p className="text-sm text-gray-500">
//             Enter your account number and IFSC code to verify your bank account details.
//           </p>
//         </div>
//       </div>

//       <div className="space-y-4">
//         {!isVerified ? (
//           <>
//             <div className="space-y-2">
//               <Label htmlFor="account-number">Account Number</Label>
//               <Input
//                 id="account-number"
//                 placeholder="Enter Account Number"
//                 value={accountNumber}
//                 onChange={(e) => {
//                   setAccountNumber(e.target.value.replace(/\D/g, ""))
//                   setError("")
//                 }}
//                 type="password"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="confirm-account-number">Confirm Account Number</Label>
//               <Input
//                 id="confirm-account-number"
//                 placeholder="Re-enter Account Number"
//                 value={confirmAccountNumber}
//                 onChange={(e) => {
//                   setConfirmAccountNumber(e.target.value.replace(/\D/g, ""))
//                   setError("")
//                 }}
//               />
//               {confirmAccountNumber && accountNumber !== confirmAccountNumber && (
//                 <p className="text-xs text-red-500">Account numbers do not match</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="ifsc-code">IFSC Code</Label>
//               <Input
//                 id="ifsc-code"
//                 placeholder="XXXX0XXXXXX"
//                 value={ifscCode}
//                 onChange={(e) => {
//                   setIfscCode(e.target.value.toUpperCase())
//                   setError("")
//                 }}
//                 maxLength={11}
//               />
//               {ifscCode && !isIfscValid(ifscCode) && (
//                 <p className="text-xs text-red-500">Please enter a valid IFSC code</p>
//               )}
//             </div>

//             {error && (
//               <div className="rounded-md bg-red-50 p-3 text-red-700">
//                 <p className="text-sm">{error}</p>
//               </div>
//             )}

//             <Button
//               className="w-full"
//               onClick={handleVerify}
//               disabled={
//                 !accountNumber ||
//                 !confirmAccountNumber ||
//                 accountNumber !== confirmAccountNumber ||
//                 !ifscCode ||
//                 !isIfscValid(ifscCode) ||
//                 isVerifying
//               }
//             >
//               {isVerifying ? "Verifying..." : "Verify Bank Account"}
//             </Button>
//           </>
//         ) : (
//           <>
//             <div className="rounded-md bg-green-50 p-4">
//               <div className="flex">
//                 <div className="flex-shrink-0">
//                   <CheckCircle className="h-5 w-5 text-green-500" />
//                 </div>
//                 <div className="ml-3">
//                   <h3 className="text-sm font-medium text-green-800">Bank Account Verified</h3>
//                   <div className="mt-2 text-sm text-green-700">
//                     <p>Your bank account details have been verified successfully.</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="rounded-md border p-4">
//               <div className="grid gap-4 md:grid-cols-2">
//                 <div>
//                   <p className="text-sm font-medium text-gray-500">Account Number</p>
//                   <p className="font-medium">
//                     {accountNumber.slice(0, 2)}
//                     {"*".repeat(accountNumber.length - 6)}
//                     {accountNumber.slice(-4)}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-500">IFSC Code</p>
//                   <p className="font-medium">{ifscCode}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-500">Account Holder Name</p>
//                   <p className="font-medium">{bankDetails?.accountHolderName}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-500">Bank Name</p>
//                   <p className="font-medium">{bankDetails?.bankName}</p>
//                 </div>
//               </div>
// {/* 
//               <div className="mt-4">
//                 <p className="text-sm font-medium text-gray-500">Branch Details</p>
//                 <p className="text-sm">
//                   {bankDetails?.branchName}, {bankDetails?.branchAddress}
//                 </p>
//               </div> */}
//             </div>

//             <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
//               <Button
//                 variant="outline"
//                 className="flex-1"
//                 onClick={() => {
//                   setIsVerified(false)
//                   setBankDetails(null)
//                 }}
//               >
//                 Edit Details
//               </Button>
//               <Button className="flex-1" onClick={handleSubmit}>
//                 Confirm & Continue
//               </Button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   )
// }


"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle } from "lucide-react"
import axiosInstance from "../../lib/axiosInstance"
import useStore from "../../lib/Zustand"

interface BankVerificationProps {
  onComplete: () => void
}

interface BankDetails {
  accountHolderName: string
  bankName: string
  branchName: string
}

export default function BankVerification({ onComplete }: BankVerificationProps) {
  const [accountNumber, setAccountNumber] = useState("")
  const [ifscCode, setIfscCode] = useState("")
  const [bankDetails, setBankDetails] = useState<BankDetails | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState("")
  const { userId } = useStore()

  const handleVerify = async () => {
    setError("")
    setIsVerifying(true)

    if (!userId) {
      setIsVerifying(false)
      setError("User ID not found. Please log in and try again.")
      return
    }

    try {
      const response = await axiosInstance.post(`/verify-bank/?bank_account_number=${accountNumber}&ifsc_code=${ifscCode}&user_id=${userId}`)
      const data = response.data

      console.log("Bank verification response:", data) // Debug log

      setIsVerifying(false)

      // Handle both string and number status codes
      if (data.status_code == 200) { // Using == to handle both "200" and 200
        setBankDetails({
          accountHolderName: data.data.name_at_bank,
          bankName: data.data.bank_name,
          branchName: data.data.ifsc_details?.branch || "N/A",
        })
        setIsVerified(true)
      } else {
        setError(data.message || "Unable to verify bank details. Please check the account number and IFSC code.")
      }
    } catch (err: any) {
      console.error("Bank verification error:", err) // Debug log
      setIsVerifying(false)
      setError(err.response?.data?.message || "Failed to connect to the server. Please try again later.")
    }
  }

  const handleNext = () => {
    onComplete()
  }

  const isAccountNumberValid = (account: string) => {
    // Basic account number validation (8-16 digits)
    const accountRegex = /^\d{8,16}$/
    return accountRegex.test(account)
  }

  const isIfscCodeValid = (ifsc: string) => {
    // IFSC code validation (4 letters + 0 + 6 alphanumeric)
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/
    return ifscRegex.test(ifsc)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-4 md:flex-row">
        <div className="flex w-full items-center justify-center md:w-1/3">
          <div className="rounded-lg bg-primary/10 p-4">
            <img
              src="/images/placeholder.svg?height=120&width=120"
              alt="Bank Verification"
              className="h-24 w-24 object-contain"
            />
          </div>
        </div>
        <div className="w-full md:w-2/3">
          <h3 className="text-lg font-medium">Bank Account Verification</h3>
          <p className="text-sm text-gray-500">
            Verify your bank account details to proceed.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {!isVerified ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="account-number">Account Number</Label>
              <Input
                id="account-number"
                placeholder="Enter bank account number"
                value={accountNumber}
                onChange={(e) => {
                  setAccountNumber(e.target.value.replace(/\D/g, ""))
                  setError("")
                }}
                maxLength={16}
              />
              {accountNumber && !isAccountNumberValid(accountNumber) && (
                <p className="text-xs text-red-500">Please enter a valid account number (8-16 digits)</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="ifsc-code">IFSC Code</Label>
              <Input
                id="ifsc-code"
                placeholder="Enter IFSC code"
                value={ifscCode}
                onChange={(e) => {
                  setIfscCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""))
                  setError("")
                }}
                maxLength={11}
              />
              {ifscCode && !isIfscCodeValid(ifscCode) && (
                <p className="text-xs text-red-500">Please enter a valid IFSC code (e.g., SBIN0001234)</p>
              )}
            </div>

            <Button
              className="w-full"
              onClick={handleVerify}
              disabled={
                !accountNumber ||
                !ifscCode ||
                !isAccountNumberValid(accountNumber) ||
                !isIfscCodeValid(ifscCode) ||
                isVerifying
              }
            >
              {isVerifying ? "Verifying..." : "Verify Bank Details"}
            </Button>
            {error && <p className="text-xs text-red-500">{error}</p>}
          </>
        ) : (
          <>
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">Bank Verified Successfully</h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>Your bank account has been verified successfully.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-md border p-4 space-y-2">
              <div>
                <p className="text-sm font-medium text-gray-500">Account Holder Name</p>
                <p className="font-medium">{bankDetails?.accountHolderName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Bank Name</p>
                <p className="font-medium">{bankDetails?.bankName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Branch Name</p>
                <p className="font-medium">{bankDetails?.branchName}</p>
              </div>
            </div>

            <Button className="w-full" onClick={handleNext}>
              Completed Go to Next Step
            </Button>
          </>
        )}
      </div>
    </div>
  )
}