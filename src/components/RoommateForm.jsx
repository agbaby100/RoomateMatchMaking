import React, { useState } from 'react';

export default function RoommateForm({ onSubmit }) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    name: '', age: '', gender: '', occupation: '', phone: '', email: '', studentId: '', faculty: '', religion: '', department: '', level: '',
    budget: '', moveInDate: '', leaseDuration: '', preferredLocation: '', roomType: '',
    sleepSchedule: '', cleanliness: '', socialLevel: '', smokingPolicy: '', drinkingPolicy: '', petPolicy: '', guestPolicy: '',
    hobbies: '', dealBreakers: '', additionalNotes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateStep1 = () => formData.name && formData.age && formData.department && formData.level && formData.religion && formData.gender && formData.phone && formData.email;
  const validateStep2 = () => formData.budget && formData.moveInDate && formData.leaseDuration && formData.preferredLocation && formData.roomType;
  const validateStep3 = () => formData.sleepSchedule && formData.cleanliness && formData.socialLevel && formData.smokingPolicy && formData.drinkingPolicy && formData.guestPolicy;
  const validateStep4 = () => true;

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return validateStep1();
      case 2: return validateStep2();
      case 3: return validateStep3();
      case 4: return validateStep4();
      default: return false;
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps && isStepValid()) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
    else console.log('Form Submitted:', formData);
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Personal & Academic Information";
      case 2: return "Accommodation Preferences";
      case 3: return "Lifestyle & Study Preferences";
      case 4: return "Additional Information";
      default: return "Personal Information";
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <PersonalInfoStep formData={formData} handleChange={handleChange} />;
      case 2: return <AccommodationStep formData={formData} handleChange={handleChange} />;
      case 3: return <LifestyleStep formData={formData} handleChange={handleChange} />;
      case 4: return <AdditionalInfoStep formData={formData} handleChange={handleChange} />;
      default: return <PersonalInfoStep formData={formData} handleChange={handleChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="text-left">
              <h1 className="text-3xl font-bold mb-1" style={{ color: '#025f46' }}>Roommate Match Making</h1>
              <p className="text-gray-600 text-center text-sm">Connect with fellow students</p>
            </div>
          </div>
        </div>
        <div className="mb-8">
  <div className="relative flex justify-between items-center w-full">
    {/* Progress line background */}
    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-300 z-0 transform -translate-y-1/2 rounded-full"></div>

    {/* Progress line fill */}
    <div
      className="absolute top-1/2 left-0 h-1 bg-[#f9c841] z-10 transform -translate-y-1/2 rounded-full transition-all duration-500 ease-in-out"
      style={{
        width: `${(currentStep - 1) / (totalSteps - 1) * 100}%`
      }}
    ></div>

    {/* Steps */}
    {[
      { icon: '👤', label: 'Personal Info', sub: 'Tell us who you are' },
      { icon: '🏠', label: 'Preferences', sub: 'Your housing needs' },
      { icon: '📚', label: 'Lifestyle', sub: 'Roommate habits' },
      { icon: '📝', label: 'Extras', sub: 'Additional notes' },
    ].map((step, index) => {
      const stepNumber = index + 1;
      const isActive = currentStep === stepNumber;
      const isCompleted = currentStep > stepNumber;

      return (
        <div key={index} className="relative z-20 flex flex-col items-center text-center w-1/4">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 font-bold text-white transition-all duration-300 ${
              isActive || isCompleted ? '' : 'bg-gray-200 text-gray-500'
            }`}
            style={{
              backgroundColor: isActive || isCompleted ? '#025f46' : undefined
            }}
          >
            {isCompleted ? '✓' : step.icon}
          </div>
          <span className={`text-sm font-semibold ${isActive ? 'text-[#025f46]' : 'text-gray-700'}`}>
            {step.label}
          </span>
          <span className="text-xs text-gray-500">{step.sub}</span>
        </div>
      );
    })}
  </div>
</div>


        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <form onSubmit={handleSubmit}>
            {renderStep()}

            {!isStepValid() && currentStep < 4 && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm font-medium">
                  ⚠️ Please fill in all required fields before proceeding to the next step.
                </p>
              </div>
            )}

            <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${currentStep === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                Previous
              </button>

              {currentStep === totalSteps ? (
                <button
                  type="submit"
                  className="px-8 py-3 rounded-lg font-medium text-white transition-all duration-200 hover:scale-105"
                  style={{ backgroundColor: '#025f46' }}
                >
                  Find My Roommate 🎯
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className={`px-8 py-3 rounded-lg font-medium text-white transition-all duration-200 ${isStepValid() ? 'hover:scale-105 cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
                  style={{ backgroundColor: isStepValid() ? '#025f46' : '#9ca3af' }}
                >
                  Continue
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
// Step Components
function PersonalInfoStep({ formData, handleChange }) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: '#f9c841' }}
        >
          <span className="text-2xl">🎓</span>
        </div>
        <p className="text-gray-600">Tell us about yourself and your academic background</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextInput
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <TextInput
          label="Age"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <TextInput
          label="Department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
        />
        <SelectInput
          label="Level"
          name="level"
          value={formData.level}
          onChange={handleChange}
          required
          options={['', '100 Level', '200 Level', '300 Level', '400 Level', '500 Level']}
        />
        <SelectInput
          label="Religion"
          name="religion"
          value={formData.religion}
          onChange={handleChange}
          required
          options={['', 'Christianity', 'Islam', 'Traditional African Religion']}
        />
        <SelectInput
          label="Gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
          options={['', 'Male', 'Female', 'Prefer not to say']}
        />
        <TextInput
          label="Phone Number"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <TextInput
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
    </div>
  );
}

function AccommodationStep({ formData, handleChange }) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: '#f9c841' }}
        >
          <span className="text-2xl">🏠</span>
        </div>
        <p className="text-gray-600">Let us know your housing preferences and budget</p>
      </div>

      <div className="space-y-6">
        <TextArea
          label="Budget"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          required={true}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextInput
            label="Preferred Move-in Date"
            name="moveInDate"
            type="date"
            value={formData.moveInDate}
            onChange={handleChange}
            required
          />
          <SelectInput
            label="Accommodation Duration"
            name="leaseDuration"
            value={formData.leaseDuration}
            onChange={handleChange}
            required
            options={['', 'One Semester', 'One Academic Session', 'Full Academic Year', 'Flexible']}
          />
        </div>
        <TextArea
          label="Preferred Location"
          name="preferredLocation"
          value={formData.preferredLocation}
          onChange={handleChange}
          required={true}
        />
        <SelectInput
          label="Room Type Preference"
          name="roomType"
          value={formData.roomType}
          onChange={handleChange}
          required
          options={['', 'Single Room', 'Shared Room (2 people)', 'Shared Room (3-4 people)', 'Self-Contained', 'Apartment Share']}
        />
      </div>
    </div>
  );
}

function LifestyleStep({ formData, handleChange }) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: '#f9c841' }}
        >
          <span className="text-2xl">📚</span>
        </div>
        <p className="text-gray-600">Help us match you with compatible roommates</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectInput
          label="Study Schedule"
          name="sleepSchedule"
          value={formData.sleepSchedule}
          onChange={handleChange}
          required
          options={['', 'Early Morning Person', 'Regular Schedule', 'Night Owl/Late Studier', 'Irregular Schedule']}
        />
        <SelectInput
          label="Cleanliness Level"
          name="cleanliness"
          value={formData.cleanliness}
          onChange={handleChange}
          required
          options={['', 'Very Neat & Organized', 'Moderately Clean', 'Relaxed About Cleanliness']}
        />
        <SelectInput
          label="Social Level"
          name="socialLevel"
          value={formData.socialLevel}
          onChange={handleChange}
          required
          options={['', 'Very Social & Outgoing', 'Moderately Social', 'Prefer Quiet Environment', 'Keep to Myself']}
        />
        <SelectInput
          label="Smoking Policy"
          name="smokingPolicy"
          value={formData.smokingPolicy}
          onChange={handleChange}
          required
          options={['', 'No Smoking', 'Smoking Outside Only', 'Smoking Allowed']}
        />
        <SelectInput
          label="Drinking Policy"
          name="drinkingPolicy"
          value={formData.drinkingPolicy}
          onChange={handleChange}
          required
          options={['', 'No Drinking', 'Occasional Social Drinking', 'Drinking Allowed']}
        />
        <SelectInput
          label="Visitor Policy"
          name="guestPolicy"
          value={formData.guestPolicy}
          onChange={handleChange}
          required
          options={['', 'No Visitors', 'Occasional Visitors OK', 'Frequent Visitors OK', 'Overnight Visitors OK']}
        />
      </div>
    </div>
  );
}

function AdditionalInfoStep({ formData, handleChange }) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: '#f9c841' }}
        >
          <span className="text-2xl">📝</span>
        </div>
        <p className="text-gray-600">Tell us more about yourself and your preferences</p>
      </div>

      <div className="space-y-6">
        <TextArea
          label="Hobbies & Interests"
          name="hobbies"
          value={formData.hobbies}
          onChange={handleChange}
          placeholder="Tell us about your hobbies, interests, and what you like to do in your free time..."
        />
        <TextArea
          label="Deal Breakers"
          name="dealBreakers"
          value={formData.dealBreakers}
          onChange={handleChange}
          placeholder="What are your absolute deal breakers when it comes to roommates or living situations?"
        />
        <TextArea
          label="Additional Notes"
          name="additionalNotes"
          value={formData.additionalNotes}
          onChange={handleChange}
          placeholder="Any additional information about yourself or specific requirements you'd like potential roommates to know..."
        />
      </div>
    </div>
  );
}

// Helper Components
function TextInput({ label, name, value, onChange, type = 'text', required = false, placeholder = '' }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        required={required}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg transition-all duration-200 bg-white hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
      />
    </div>
  );
}

function SelectInput({ label, name, value, onChange, options, required = false }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        name={name}
        value={value}
        required={required}
        onChange={onChange}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg transition-all duration-200 bg-white hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
      >
        {options.map((opt, idx) => (
          <option key={idx} value={opt === '' ? '' : opt.toLowerCase().replace(/\s+/g, '-')}>
            {opt || 'Select an option...'}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextArea({ label, name, value, onChange, placeholder = '', required = false }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows="4"
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg transition-all duration-200 bg-white hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none resize-none"
      />
    </div>
  );
}
