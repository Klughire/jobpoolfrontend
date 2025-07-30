// "use client"
 
// import { useState } from "react"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
// import { Button } from "../../components/ui/button"
// import PanVerification from "../../components/verification/pan-verification"
// import AadharVerification from "../../components/verification/aadhar-verification"
// import BankVerification from "../../components/verification/bank-verification"
// import VerificationComplete from "../../components/verification/verification-complete"
// import VerificationIntro from "../../components/verification/verification-intro"
// import VerticalStepIndicator from "../../components/verification/vertical-step-indicator"
 
// export default function VerificationFlow() {
//   const [currentStep, setCurrentStep] = useState(0) // Start with intro step (0)
//   const [verificationStatus, setVerificationStatus] = useState({
//     pan: { completed: false, skipped: false },
//     aadhar: { completed: false, skipped: false },
//     bank: { completed: false, skipped: false },
//   })
 
//   const totalSteps = 5 // Intro + 3 verification steps + completion
 
//   const handleNext = () => {
//     if (currentStep < totalSteps - 1) {
//       setCurrentStep(currentStep + 1)
//     }
//   }
 
 
 
//   const handleSkip = () => {
//     if (currentStep === 1) {
//       setVerificationStatus({
//         ...verificationStatus,
//         pan: { completed: false, skipped: true },
//       })
//     } else if (currentStep === 2) {
//       setVerificationStatus({
//         ...verificationStatus,
//         aadhar: { completed: false, skipped: true },
//       })
//     } else if (currentStep === 3) {
//       setVerificationStatus({
//         ...verificationStatus,
//         bank: { completed: false, skipped: true },
//       })
//     }
//     handleNext()
//   }
 
//   const handleComplete = (step: "pan" | "aadhar" | "bank") => {
//     setVerificationStatus({
//       ...verificationStatus,
//       [step]: { completed: true, skipped: false },
//     })
//     handleNext()
//      if (step === "pan" || step === "aadhar") {
//      await new Promise((resolve) => setTimeout(resolve, 30000)) // 30 seconds delay
//   }
//   }
 
//   const steps = [
//     { name: "Introduction", status: { completed: currentStep > 0, skipped: false } },
//     { name: "PAN Card", status: verificationStatus.pan },
//     { name: "Aadhar", status: verificationStatus.aadhar },
//     { name: "Bank Details", status: verificationStatus.bank },
//     { name: "Complete", status: { completed: false, skipped: false } },
//   ]
 
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
//       <Card className={`w-full ${currentStep === 4 ? "max-w-2xl" : "max-w-4xl"}`}>
//         <CardHeader>
//           <CardTitle className="text-2xl font-bold">Account Verification</CardTitle>
//           <CardDescription>Please complete the verification process to access all features</CardDescription>
//         </CardHeader>
//         <CardContent>
//           {currentStep === 4 ? (
//             // Full width for completion screen
//             <VerificationComplete verificationStatus={verificationStatus} />
//           ) : (
//             // Side-by-side layout for verification steps
//             <div className="flex flex-col gap-6 md:flex-row">
//               <div className="w-full md:w-1/3">
//                 <VerticalStepIndicator currentStep={currentStep} steps={steps} />
//               </div>
//               <div className="w-full md:w-2/3">
//                 {currentStep === 0 && <VerificationIntro onStart={handleNext} />}
//                 {currentStep === 1 && <PanVerification onComplete={() => handleComplete("pan")} />}
//                 {currentStep === 2 && <AadharVerification onComplete={() => handleComplete("aadhar")} />}
//                 {currentStep === 3 && <BankVerification onComplete={() => handleComplete("bank")} />}
//               </div>
//             </div>
//           )}
//         </CardContent>
//         {currentStep !== 4 && (
//           <CardFooter className="flex justify-between">
//             {/* <Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>
//               Back
//             </Button> */}
//             <div className="flex gap-2">
//               {currentStep > 0 && currentStep < totalSteps - 1 && (
//                 <Button variant="ghost" onClick={handleSkip}>
//                   Skip for now
//                 </Button>
//               )}
//               {currentStep === 0 && <Button onClick={handleNext}>Get Started</Button>}
//             </div>
//           </CardFooter>
//         )}
//       </Card>
//     </div>
//   )
// }


"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import PanVerification from "../../components/verification/pan-verification"
import AadharVerification from "../../components/verification/aadhar-verification"
import BankVerification from "../../components/verification/bank-verification"
import VerificationComplete from "../../components/verification/verification-complete"
import VerificationIntro from "../../components/verification/verification-intro"
import VerticalStepIndicator from "../../components/verification/vertical-step-indicator"

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export default function VerificationFlow() {
  const [currentStep, setCurrentStep] = useState(0)
  const [verificationStatus, setVerificationStatus] = useState({
    pan: { completed: false, skipped: false },
    aadhar: { completed: false, skipped: false },
    bank: { completed: false, skipped: false },
  })

  const totalSteps = 5

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleSkip = () => {
    if (currentStep === 1) {
      setVerificationStatus((prev) => ({
        ...prev,
        pan: { completed: false, skipped: true },
      }))
    } else if (currentStep === 2) {
      setVerificationStatus((prev) => ({
        ...prev,
        aadhar: { completed: false, skipped: true },
      }))
    } else if (currentStep === 3) {
      setVerificationStatus((prev) => ({
        ...prev,
        bank: { completed: false, skipped: true },
      }))
    }
    handleNext()
  }

  const handleComplete = async (step: "pan" | "aadhar" | "bank") => {
    setVerificationStatus((prev) => ({
      ...prev,
      [step]: { completed: true, skipped: false },
    }))

    if (step === "pan" || step === "aadhar") {
      await wait(30000) // 30-second delay
    }

    handleNext()
  }

  const steps = [
    { name: "Introduction", status: { completed: currentStep > 0, skipped: false } },
    { name: "PAN Card", status: verificationStatus.pan },
    { name: "Aadhar", status: verificationStatus.aadhar },
    { name: "Bank Details", status: verificationStatus.bank },
    { name: "Complete", status: { completed: false, skipped: false } },
  ]

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className={`w-full ${currentStep === 4 ? "max-w-2xl" : "max-w-4xl"}`}>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Account Verification</CardTitle>
          <CardDescription>
            Please complete the verification process to access all features
          </CardDescription>
        </CardHeader>
        <CardContent>
          {currentStep === 4 ? (
            <VerificationComplete verificationStatus={verificationStatus} />
          ) : (
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="w-full md:w-1/3">
                <VerticalStepIndicator currentStep={currentStep} steps={steps} />
              </div>
              <div className="w-full md:w-2/3">
                {currentStep === 0 && <VerificationIntro onStart={handleNext} />}
                {currentStep === 1 && (
                  <PanVerification onComplete={() => handleComplete("pan")} />
                )}
                {currentStep === 2 && (
                  <AadharVerification onComplete={() => handleComplete("aadhar")} />
                )}
                {currentStep === 3 && (
                  <BankVerification onComplete={() => handleComplete("bank")} />
                )}
              </div>
            </div>
          )}
        </CardContent>
        {currentStep !== 4 && (
          <CardFooter className="flex justify-between">
            <div className="flex gap-2">
              {currentStep > 0 && currentStep < totalSteps - 1 && (
                <Button variant="ghost" onClick={handleSkip}>
                  Skip for now
                </Button>
              )}
              {currentStep === 0 && <Button onClick={handleNext}>Get Started</Button>}
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
