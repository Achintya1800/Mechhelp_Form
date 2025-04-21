"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Plus, Trash2, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

export default function GarageRegistrationForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [fluids, setFluids] = useState([{ id: 1 }])
  const [staffMembers, setStaffMembers] = useState([{ id: 1 }])
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const steps = [
    { title: "Garage Info", component: <GarageInfoStep /> },
    { title: "About Garage", component: <AboutGarageStep /> },
    { title: "Available Brands", component: <AvailableBrandsStep fluids={fluids} setFluids={setFluids} /> },
    {
      title: "Staff Details",
      component: <StaffDetailsStep staffMembers={staffMembers} setStaffMembers={setStaffMembers} />,
    },
    { title: "Pick & Drop", component: <PickAndDropStep /> },
    { title: "Payment & Services", component: <PaymentAndServicesStep /> },
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    setShowSuccessPopup(true)
    // Set a timer to mark the form as completed after the popup is shown
    setTimeout(() => {
      setIsCompleted(true)
      setShowSuccessPopup(false)
    }, 3000)
  }

  return (
    <div className="max-w-3xl mx-auto relative py-8 px-4">
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full relative animate-fade-in-up">
            <button
              onClick={() => setShowSuccessPopup(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 mb-4">
                <Image src="/images/logo.png" alt="MechHelp Logo" width={64} height={64} className="object-contain" />
              </div>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Form Submitted Successfully!</h3>
              <p className="text-gray-600">
                Your garage partner registration has been submitted. We'll review your information shortly.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Completed State with Register Another Option */}
      {isCompleted && (
        <div className="max-w-3xl mx-auto text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6">
            <Image src="/images/logo.png" alt="MechHelp Logo" width={96} height={96} className="object-contain" />
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-green-700 mb-4">Registration Successful!</h2>
            <p className="text-green-600 mb-6">Your garage partner registration has been submitted successfully.</p>
            <p className="mt-6 text-sm text-gray-600">
              Our team will review your application and get back to you shortly.
            </p>
          </div>
          <Button onClick={() => window.location.reload()} className="px-6 brand-gradient text-white brand-shadow">
            Register Another Garage
          </Button>
        </div>
      )}

      {/* Form Content - Only show if not completed */}
      {!isCompleted && (
        <>
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 mr-4">
              <Image src="/images/logo.png" alt="MechHelp Logo" width={80} height={80} className="object-contain" />
            </div>
            <h1 className="text-3xl font-bold text-primary">Garage Partner Registration</h1>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center mb-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className={cn("h-2 w-16 rounded-full", index <= currentStep ? "brand-gradient" : "bg-gray-200")} />
              </div>
            ))}
          </div>

          {/* Step Title */}
          <h2 className="text-center text-primary font-semibold mb-8">{steps[currentStep].title}</h2>

          {/* Step Content */}
          <div className="mb-8 bg-white p-6 rounded-lg shadow-md border border-gray-100">
            {steps[currentStep].component}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center border-primary text-primary"
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>

            {currentStep < steps.length - 1 ? (
              <Button onClick={handleNext} className="flex items-center brand-gradient text-white brand-shadow">
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="brand-gradient text-white brand-shadow flex items-center">
                Submit
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  )
}

function GarageInfoStep() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="garageName">Garage Name</Label>
          <Input id="garageName" placeholder="" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input id="ownerName" placeholder="" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="phoneNumber1">Phone Number 1</Label>
          <Input id="phoneNumber1" placeholder="" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phoneNumber2">Phone Number 2</Label>
          <Input id="phoneNumber2" placeholder="" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select WhatsApp number" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="phone1">Phone Number 1</SelectItem>
              <SelectItem value="phone2">Phone Number 2</SelectItem>
              <SelectItem value="both">Both</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="pincode">Pincode</Label>
          <Input id="pincode" placeholder="" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="operatingHours">Operating Hours</Label>
          <Input id="operatingHours" placeholder="e.g. 9 AM - 8 PM" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="weeklyOff">Weekly Off</Label>
          <Input id="weeklyOff" placeholder="" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="workshopType">Type of Workshop</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select workshop type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="authorized">Two-Wheeler</SelectItem>
              <SelectItem value="independent">Four-Wheeler</SelectItem>
              <SelectItem value="specialized">Both</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="gstNumber">GST Number</Label>
          <Input id="gstNumber" placeholder="" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="panNumber">PAN Number</Label>
          <Input id="panNumber" placeholder="" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateOnboarded">Date Onboarded</Label>
          <div className="relative">
            <Input id="dateOnboarded" placeholder="dd-mm-yyyy" type="date" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="referredBy">Referred By (if any)</Label>
          <Input id="referredBy" placeholder="Service Manager / Referral Code" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="mechHelpContact">MechHelp Point of Contact</Label>
          <Input id="mechHelpContact" placeholder="" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="workshopAddress">Workshop Address</Label>
        <Textarea id="workshopAddress" placeholder="" className="min-h-[100px]" />
      </div>
    </div>
  )
}

function AboutGarageStep() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="yearEstablished">Year Established</Label>
          <Input id="yearEstablished" placeholder="" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="foundedBy">Founded By</Label>
          <Input id="foundedBy" placeholder="" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="inspiration">Inspiration / Reason</Label>
        <Textarea id="inspiration" placeholder="What inspired you to start this garage?" className="min-h-[100px]" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="growthJourney">Growth Journey</Label>
        <Textarea
          id="growthJourney"
          placeholder="Tell us about your garage's growth journey"
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="challengesFaced">Challenges Faced</Label>
        <Textarea
          id="challengesFaced"
          placeholder="What challenges did you face and how did you overcome them?"
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="milestones">Milestones</Label>
        <Textarea
          id="milestones"
          placeholder="Share your major achievements and milestones"
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="visionValues">Vision & Values</Label>
        <Textarea
          id="visionValues"
          placeholder="What are your garage's vision and core values?"
          className="min-h-[100px]"
        />
      </div>
    </div>
  )
}

function AvailableBrandsStep({ fluids, setFluids }) {
  const addFluid = () => {
    const newId = fluids.length > 0 ? Math.max(...fluids.map((f) => f.id)) + 1 : 1
    setFluids([...fluids, { id: newId }])
  }

  const removeFluid = (id) => {
    setFluids(fluids.filter((fluid) => fluid.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-primary">Available Fluids</h3>
        <Button
          type="button"
          onClick={addFluid}
          variant="outline"
          className="flex items-center border-primary text-primary"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Fluid
        </Button>
      </div>

      {fluids.map((fluid, index) => (
        <div key={fluid.id} className="border rounded-lg p-6 relative hover:border-primary transition-colors">
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-4 right-4"
            onClick={() => removeFluid(fluid.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>

          <h4 className="font-semibold text-lg py-2 border-b border-gray-200 mb-4">Fluid {index + 1}</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div className="space-y-2">
              <Label htmlFor={`fluidType-${fluid.id}`}>Fluid Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Fluid Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engine-oil">Engine Oil</SelectItem>
                  <SelectItem value="brake-fluid">Brake Fluid</SelectItem>
                  <SelectItem value="coolant">Coolant</SelectItem>
                  <SelectItem value="transmission-fluid">Transmission Fluid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`brandName-${fluid.id}`}>Brand Name</Label>
              <Input id={`brandName-${fluid.id}`} placeholder="e.g. Castrol, Shell" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div className="space-y-2">
              <Label htmlFor={`grade-${fluid.id}`}>Grade (if applicable)</Label>
              <Input id={`grade-${fluid.id}`} placeholder="e.g. 5W-30, 10W-40" />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`rate-${fluid.id}`}>Rate/L</Label>
              <Input id={`rate-${fluid.id}`} placeholder="Price per liter" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`usedFor-${fluid.id}`}>Used For (Vehicle Types)</Label>
            <Input id={`usedFor-${fluid.id}`} placeholder="e.g. All Petrol Cars, Diesel SUVs" />
          </div>
        </div>
      ))}
    </div>
  )
}

function StaffDetailsStep({ staffMembers, setStaffMembers }) {
  const addStaffMember = () => {
    const newId = staffMembers.length > 0 ? Math.max(...staffMembers.map((s) => s.id)) + 1 : 1
    setStaffMembers([...staffMembers, { id: newId }])
  }

  const removeStaffMember = (id) => {
    setStaffMembers(staffMembers.filter((staff) => staff.id !== id))
  }

  return (
    <div className="space-y-6">
      {staffMembers.map((staff, index) => (
        <div key={staff.id} className="border rounded-lg p-6 relative hover:border-primary transition-colors">
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-4 right-4"
            onClick={() => removeStaffMember(staff.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>

          <h4 className="font-semibold text-lg py-2 border-b border-gray-200 mb-4">Staff Member {index + 1}</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div className="space-y-2">
              <Label htmlFor={`staffName-${staff.id}`}>Name</Label>
              <Input id={`staffName-${staff.id}`} placeholder="" />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`staffPhone-${staff.id}`}>Phone Number</Label>
              <Input id={`staffPhone-${staff.id}`} placeholder="" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div className="space-y-2">
              <Label htmlFor={`specialist-${staff.id}`}>Specialist</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select specialization" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mechanic">Mechanic</SelectItem>
                  <SelectItem value="electrician">Electrician</SelectItem>
                  <SelectItem value="painter">Painter</SelectItem>
                  <SelectItem value="ac-specialist">AC Specialist</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`photoLink-${staff.id}`}>Photo Link</Label>
              <Input id={`photoLink-${staff.id}`} placeholder="" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`notes-${staff.id}`}>Notes</Label>
            <Textarea id={`notes-${staff.id}`} placeholder="" className="min-h-[100px]" />
          </div>
        </div>
      ))}

      <Button
        type="button"
        onClick={addStaffMember}
        className="w-full flex items-center justify-center brand-gradient text-white brand-shadow"
      >
        <Plus className="mr-2 h-4 w-4" /> Add Staff Member
      </Button>
    </div>
  )
}

function PickAndDropStep() {
  const [isPickDropAvailable, setIsPickDropAvailable] = useState("no")

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Is Pick & Drop Available?</Label>
        <RadioGroup value={isPickDropAvailable} onValueChange={setIsPickDropAvailable} className="flex gap-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="pickup-yes" />
            <Label htmlFor="pickup-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="pickup-no" />
            <Label htmlFor="pickup-no">No</Label>
          </div>
        </RadioGroup>
      </div>

      {isPickDropAvailable === "yes" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="freeOrPaid">Free or Paid</Label>
            <Input id="freeOrPaid" placeholder="" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="charges">Charges</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="fixed">Fixed Rate</SelectItem>
                <SelectItem value="distance">Distance Based</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="serviceArea">Service Area</Label>
            <Textarea id="serviceArea" placeholder="" className="min-h-[100px]" />
          </div>
        </>
      )}
    </div>
  )
}

function PaymentAndServicesStep() {
  const [checkedServices, setCheckedServices] = useState({})

  const handleServiceCheck = (id) => {
    setCheckedServices((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // Helper function to create service items with price fields
  const ServiceItem = ({ id, label }) => (
    <div className="border rounded-lg p-4 mb-4 transition-all duration-200 hover:shadow-md hover:border-primary">
      <div className="flex items-center space-x-2">
        <Checkbox
          id={id}
          checked={checkedServices[id] || false}
          onCheckedChange={() => handleServiceCheck(id)}
          className="h-5 w-5"
        />
        <Label htmlFor={id} className="font-medium">
          {label}
        </Label>
      </div>

      {checkedServices[id] && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 pl-6 pt-3 border-t border-gray-100">
          <div className="space-y-2">
            <Label htmlFor={`${id}-hatchback`} className="text-sm text-gray-600">
              Hatchback Price
            </Label>
            <Input
              id={`${id}-hatchback`}
              placeholder="Hatchback Price"
              className="focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${id}-sedan`} className="text-sm text-gray-600">
              Sedan Price
            </Label>
            <Input id={`${id}-sedan`} placeholder="Sedan Price" className="focus:ring-2 focus:ring-primary/20" />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${id}-suv`} className="text-sm text-gray-600">
              SUV Price
            </Label>
            <Input id={`${id}-suv`} placeholder="SUV Price" className="focus:ring-2 focus:ring-primary/20" />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${id}-duration`} className="text-sm text-gray-600">
              Duration (minutes)
            </Label>
            <Input id={`${id}-duration`} placeholder="Duration" className="focus:ring-2 focus:ring-primary/20" />
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="upiId">UPI ID</Label>
          <Input id="upiId" placeholder="" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bankAccountNumber">Bank Account Number</Label>
          <Input id="bankAccountNumber" placeholder="" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="ifscCode">IFSC Code</Label>
          <Input id="ifscCode" placeholder="" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="billingFrequency">Billing Frequency</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="biweekly">Bi-weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="preferredPaymentMode">Preferred Mode of Payment</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select payment mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="upi">UPI</SelectItem>
            <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
            <SelectItem value="cheque">Cheque</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold py-2 border-b-2 border-primary/30 mb-6">Services Offered</h3>

        <div className="space-y-4">
          <h4 className="font-semibold text-lg py-2 border-b border-gray-200 mb-4 text-primary">Periodic Services</h4>
          <div className="space-y-2">
            <ServiceItem id="general-checkup" label="General Checkup" />
            <ServiceItem id="engine-oil-change" label="Engine Oil Change" />
            <ServiceItem id="oil-filter-replacement" label="Oil Filter Replacement" />
            <ServiceItem id="air-filter-replacement" label="Air Filter Replacement" />
            <ServiceItem id="ac-filter-replacement" label="AC Filter Replacement" />
            <ServiceItem id="fuel-filter-replacement" label="Fuel Filter Replacement" />
            <ServiceItem id="all-top-ups" label="All-Top Ups" />
            <ServiceItem id="top-wash" label="Top Wash" />
            <ServiceItem id="washing-interior-vacuum" label="Washing + Interior Vacuum" />
            <ServiceItem id="throttle-body-cleaning" label="Throttle Body Cleaning" />
            <ServiceItem id="spark-plug-cleaning" label="Spark Plug Cleaning" />
            <ServiceItem id="spark-plug-replacement" label="Spark Plug Replacement" />
            <ServiceItem id="timing-belt-adjustment" label="Timing Belt Adjustment" />
            <ServiceItem id="fuel-injector-cleaning" label="Fuel Injector Cleaning" />
            <ServiceItem id="wiper-replacement" label="Wiper Replacement" />
            <ServiceItem id="wiper-motor-replacement" label="Wiper Motor Replacement" />
            <ServiceItem id="water-pump-belt-replacement" label="Water Pump Belt Replacement" />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-lg py-2 border-b border-gray-200 mb-4 text-primary">Brake Maintenance</h4>
          <div className="space-y-2">
            <ServiceItem id="brake-pad" label="Front Brake Pad (Opening and Fitting)" />
            <ServiceItem id="brake-shoes" label="Rear Brake Shoes (Opening and Fitting)" />
            <ServiceItem id="brake-disc" label="Front Brake Disc (Opening and Fitting)" />
            <ServiceItem id="caliper-pin" label="Caliper Pin Replacement" />
            <ServiceItem id="disc-turning" label="Disc Turning" />
            <ServiceItem id="hand-brake" label="Hand Brake Wire Replacement" />
            <ServiceItem id="brake-drums" label="Brake Drums Turning" />
            <ServiceItem id="wheel-cylinder" label="Wheel Cylinder Turning" />
            <ServiceItem id="headlight-adjustment" label="Headlight Adjustment" />
            <ServiceItem id="caliper-greasing" label="Caliper Pin Greasing" />
            <ServiceItem id="front-brake-cleaning" label="Front Brake Pads Cleaning" />
            <ServiceItem id="rear-brake-cleaning" label="Rear Brake Pad/Shoes Cleaning" />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-lg py-2 border-b border-gray-200 mb-4 text-primary">AC Services</h4>
          <div className="space-y-2">
            <ServiceItem id="condenser-cleaning" label="Condenser Cleaning" />
            <ServiceItem id="ac-filter-cleaning" label="AC Filter Cleaning" />
            <ServiceItem id="cooling-coil-cleaning" label="Cooling Coil Cleaning" />
            <ServiceItem id="cooling-coil-replacement" label="Cooling Coil Replacement" />
            <ServiceItem id="condenser-replacement" label="Condenser Replacement" />
            <ServiceItem id="compressor-replacement" label="Compressor Replacement" />
            <ServiceItem id="heating-coil-replacement" label="Heating Coil Replacement" />
            <ServiceItem id="v-belt-replacement" label="V-Belt Replacement" />
            <ServiceItem id="ac-blower-replacement" label="AC Blower Motor Replacement" />
            <ServiceItem id="compressor-belt-replacement" label="Compressor Belt Replacement" />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-lg py-2 border-b border-gray-200 mb-4 text-primary">Batteries</h4>
          <div className="space-y-2">
            <ServiceItem id="battery-replacement" label="Battery Replacement" />
            <ServiceItem id="battery-terminal-coating" label="Battery Terminal Coating" />
            <ServiceItem id="maf-sensor-cleaning" label="MAF/02 Sensor Cleaning" />
            <ServiceItem id="alternator-replacement" label="Alternator Replacement" />
            <ServiceItem id="alternator-repair" label="Alternator Repair" />
            <ServiceItem id="alternator-belt-replacement" label="Alternator Belt Replacement" />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-lg py-2 border-b border-gray-200 mb-4 text-primary">Tyre Services</h4>
          <div className="space-y-2">
            <ServiceItem id="tyre-replacement" label="Tyre Replacement" />
            <ServiceItem id="wheel-alignment" label="Wheel Alignment" />
            <ServiceItem id="wheel-balancing" label="Wheel Balancing" />
            <ServiceItem id="tyre-rotation" label="Tyre Rotation" />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-lg py-2 border-b border-gray-200 mb-4 text-primary">
            Denting and Painting
          </h4>
          <div className="space-y-2">
            <ServiceItem id="front-bumper-paint" label="Front Bumper Paint" />
            <ServiceItem id="bonnet-paint" label="Bonnet Paint" />
            <ServiceItem id="rear-bumper-paint" label="Rear Bumper Paint" />
            <ServiceItem id="boot-paint" label="Boot Paint" />
            <ServiceItem id="full-body-paint" label="Full Body Dent Paint" />
            <ServiceItem id="alloy-paint" label="Alloy Paint (4X)" />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-lg py-2 border-b border-gray-200 mb-4 text-primary">Detailing Services</h4>
          <div className="space-y-2">
            <ServiceItem id="3m-rubbing" label="3M Car Rubbing & Polishing" />
            <ServiceItem id="3m-ceramic" label="3M Ceramic Coating" />
            <ServiceItem id="graphene-coating" label="Graphene Coating – 10H" />
            <ServiceItem id="3m-teflon" label="3M Teflon Coating" />
            <ServiceItem id="meguiars-teflon" label="Meguiar's Teflon Coating" />
            <ServiceItem id="ppf-plus" label="PPF – Garware Plus" />
            <ServiceItem id="ppf-premium" label="PPF – Garware Premium" />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-lg py-2 border-b border-gray-200 mb-4 text-primary">
            Windshields and Lights
          </h4>
          <div className="space-y-2">
            <ServiceItem id="front-windshield" label="Front Windshield Replacement" />
            <ServiceItem id="rear-windshield" label="Rear Windshield Replacement" />
            <ServiceItem id="door-glass" label="Door Glass Replacement" />
            <ServiceItem id="front-headlight" label="Front Headlight Replacement" />
            <ServiceItem id="rear-taillight" label="Rear Tail Light Replacement" />
            <ServiceItem id="fog-light" label="Fog Light Replacement" />
            <ServiceItem id="side-mirror" label="Side Mirror Replacement" />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-lg py-2 border-b border-gray-200 mb-4 text-primary">
            Clutch and Body Parts
          </h4>
          <div className="space-y-2">
            <ServiceItem id="clutch-set" label="Clutch Set Replacement" />
            <ServiceItem id="flywheel-replacement" label="Flywheel Replacement" />
            <ServiceItem id="clutch-bearing" label="Clutch Bearing Replacement" />
            <ServiceItem id="flywheel-turning" label="Flywheel Turning" />
            <ServiceItem id="clutch-overhaul" label="Clutch Overhaul" />
            <ServiceItem id="bumper-replacement" label="Front/Rear Bumper Replacement" />
            <ServiceItem id="door-replacements" label="Door Replacements (All Sides)" />
            <ServiceItem id="fender-replacement" label="Fender, Boot, Bonnet Replacement" />
            <ServiceItem id="door-adjustment" label="Door Adjustment" />
            <ServiceItem id="bumper-bracket" label="Bumper Bracket Adjustment" />
            <ServiceItem id="abs-issue" label="ABS Issue" />
            <ServiceItem id="clutch-transmission" label="Clutch & Transmission Troubles" />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-lg py-2 border-b border-gray-200 mb-4 text-primary">
            Suspension and Fitments
          </h4>
          <div className="space-y-2">
            <ServiceItem id="eps-module" label="EPS Module Repair" />
            <ServiceItem id="steering-rack" label="Steering Rack Repair" />
            <ServiceItem id="shock-absorber" label="Front/Rear Shock Absorber Replacement" />
            <ServiceItem id="lower-arm" label="Suspension Lower Arm Replacement" />
            <ServiceItem id="link-rod" label="Link Rod Replacement" />
            <ServiceItem id="tie-rod" label="Tie Rod End Replacement" />
            <ServiceItem id="suspension-inspection" label="Complete Suspension Inspection" />
            <ServiceItem id="shocker-mount" label="Front Shocker Mount Replacement" />
            <ServiceItem id="front-axle" label="Front Axle Repair" />
          </div>
        </div>
      </div>
    </div>
  )
}
