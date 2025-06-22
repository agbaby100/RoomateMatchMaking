import React, { useState } from 'react';

export default function RoommateForm({ onSubmit }) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    name: '', age: '', gender: '', occupation: '', phone: '', email: '', studentId: '', faculty: '', religion: '', department: '', level: '',
    budget: '', moveInDate: '', leaseDuration: '', preferredLocation: '', roomType: '',
    sleepSchedule: '', cleanliness: '', socialLevel: '', smokingPolicy: '', drinkingPolicy: '', petPolicy: '', guestPolicy: '',
    hobbies: '', dealBreakers: '', additionalNotes: '', profileImage: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (imageUrl) => {
    setFormData((prev) => ({ ...prev, profileImage: imageUrl }));
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
      case 1: return <PersonalInfoStep formData={formData} handleChange={handleChange} handleImageUpload={handleImageUpload} />;
      case 2: return <AccommodationStep formData={formData} handleChange={handleChange} />;
      case 3: return <LifestyleStep formData={formData} handleChange={handleChange} />;
      case 4: return <AdditionalInfoStep formData={formData} handleChange={handleChange} />;
      default: return <PersonalInfoStep formData={formData} handleChange={handleChange} handleImageUpload={handleImageUpload} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="text-left">
              <h1 className="text-3xl font-bold mb-1 text-center" style={{ color: '#025f46' }}>Roommate Match Making</h1>
              <p className="text-gray-600 text-center text-sm">Connect with fellow students</p>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <div className="relative flex justify-between items-center w-full gap-2 sm:gap-4 lg:gap-6">
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
                <div key={index} className="relative z-20 flex-1 flex flex-col items-center text-center">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mb-1 sm:mb-2 font-bold text-white text-sm sm:text-base transition-all duration-300 ${
                      isActive || isCompleted ? '' : 'bg-gray-200 text-gray-500'
                    }`}
                    style={{
                      backgroundColor: isActive || isCompleted ? '#025f46' : undefined
                    }}
                  >
                    {isCompleted ? '✓' : step.icon}
                  </div>
                  <span
                    className={`text-[11px] pt-2 sm:text-sm font-semibold ${
                      isActive ? 'text-[#025f46]' : 'text-gray-700'
                    }`}
                  >
                    {step.label}
                  </span>
                  <span className="text-[10px] text-gray-500 leading-tight">
                    {step.sub}
                  </span>
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
function PersonalInfoStep({ formData, handleChange, handleImageUpload }) {
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

      {/* Profile Image Upload Section */}
      <div className="mb-8">
        <ImageUpload 
          currentImage={formData.profileImage}
          onImageUpload={handleImageUpload}
        />
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

// Enhanced Image Upload Component with File Upload and URL Input
function ImageUpload({ currentImage, onImageUpload }) {
  const [imageUrl, setImageUrl] = useState(currentImage || '');
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState('');
  const [uploadMethod, setUploadMethod] = useState('file'); // 'file' or 'url'
  const [isDragging, setIsDragging] = useState(false);

  // File upload handler
  const handleFileUpload = (file) => {
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a valid image file (JPG, PNG, GIF, or WebP)');
      return;
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      setError('File size must be less than 5MB');
      return;
    }

    // Convert file to base64 data URL
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      setError('');
      onImageUpload(dataUrl);
    };
    reader.onerror = () => {
      setError('Failed to read the file. Please try again.');
    };
    reader.readAsDataURL(file);
  };

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  // File input change handler
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  // URL validation
  const validateImageUrl = async (url) => {
    if (!url) return false;
    
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'];
    const hasValidExtension = imageExtensions.some(ext => 
      url.toLowerCase().includes(ext)
    );
    
    if (!hasValidExtension) {
      setError('Please provide a URL that ends with .jpg, .png, .gif, .webp, or .bmp');
      return false;
    }

    try {
      setIsValidating(true);
      const response = await fetch(url, { method: 'HEAD' });
      const contentType = response.headers.get('content-type');
      
      if (response.ok && contentType && contentType.startsWith('image/')) {
        setError('');
        return true;
      } else {
        setError('Unable to load image from this URL. Please check the URL and try again.');
        return false;
      }
    } catch (err) {
      setError('Unable to access this image URL. Please check the URL and try again.');
      return false;
    } finally {
      setIsValidating(false);
    }
  };

  // URL input handler
  const handleUrlChange = async (e) => {
    const url = e.target.value;
    setImageUrl(url);
    
    if (url) {
      const isValid = await validateImageUrl(url);
      if (isValid) {
        onImageUpload(url);
      }
    } else {
      setError('');
      onImageUpload('');
    }
  };

  // Remove image handler
  const handleRemoveImage = () => {
    setImageUrl('');
    onImageUpload('');
    setError('');
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <label className="block text-sm font-semibold text-gray-700 mb-4">
          Profile Picture
        </label>

        {/* Upload Method Toggle */}
        <div className="flex justify-center mb-4">
          <div className="bg-gray-100 rounded-lg p-1 flex">
            <button
              type="button"
              onClick={() => setUploadMethod('file')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                uploadMethod === 'file'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📁 Upload File
            </button>
            <button
              type="button"
              onClick={() => setUploadMethod('url')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                uploadMethod === 'url'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🔗 Image URL
            </button>
          </div>
        </div>
        
        {/* Image Preview */}
        <div className="mb-4">
          {currentImage ? (
            <div className="relative inline-block">
              <img
                src={currentImage}
                alt="Profile preview"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-lg"
                onError={() => {
                  setError('Failed to load image. Please check the URL or try a different image.');
                  onImageUpload('');
                }}
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
              >
                ×
              </button>
            </div>
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mx-auto border-4 border-gray-200">
              <span className="text-4xl text-gray-400">📷</span>
            </div>
          )}
        </div>

        {/* Upload Interface */}
        <div className="max-w-md mx-auto">
          {uploadMethod === 'file' ? (
            // File Upload Interface
            <div>
              {/* Drag and Drop Area */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-all ${
                  isDragging
                    ? 'border-blue-400 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="space-y-2">
                  <div className="text-3xl">📤</div>
                  <div className="text-sm text-gray-600">
                    <p>Drag and drop your image here, or</p>
                    <label className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium">
                      click to browse
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileInputChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">
                    Supports: JPG, PNG, GIF, WebP (Max 5MB)
                  </p>
                </div>
              </div>
            </div>
          ) : (
            // URL Input Interface
            <div>
              <input
                type="url"
                value={imageUrl}
                onChange={handleUrlChange}
                placeholder="Enter image URL (e.g., https://example.com/photo.jpg)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg transition-all duration-200 bg-white hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
              />
              
              <div className="mt-2 text-xs text-gray-500">
                <p>💡 Tips for URL uploads:</p>
                <ul className="text-left mt-1 space-y-1">
                  <li>• Use a public image URL (not from Google Drive, Facebook, etc.)</li>
                  <li>• URL should end with .jpg, .png, .gif, .webp, or .bmp</li>
                  <li>• Try uploading to imgur.com or similar image hosting service</li>
                  <li>• Make sure the image is publicly accessible</li>
                </ul>
              </div>
            </div>
          )}
          
          {/* Loading State */}
          {isValidating && (
            <div className="mt-2 text-sm text-blue-600 flex items-center justify-center">
              <span className="animate-spin mr-2">⏳</span>
              Validating image...
            </div>
          )}
          
          {/* Error Message */}
          {error && (
            <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded border border-red-200">
              {error}
            </div>
          )}
        </div>
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
