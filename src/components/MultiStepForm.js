import React, { useState } from 'react';

const Step1 = ({ formData, setFormData, nextStep }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Step 1: Personal Information</h2>
      <label>
        First Name:
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
      </label>
      <br />
      <label>
        Last Name:
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
      </label>
      <br />
      <button onClick={nextStep}>Next</button>
    </div>
  );
};

const Step2 = ({ formData, setFormData, nextStep, prevStep }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Step 2: Car Information</h2>
      <label>
        Make:
        <input type="text" name="make" value={formData.make} onChange={handleChange} />
      </label>
      <br />
      <label>
        Model:
        <input type="text" name="model" value={formData.model} onChange={handleChange} />
      </label>
      <br />
      <button onClick={prevStep}>Back</button>
      <button onClick={nextStep}>Next</button>
    </div>
  );
};

const Step3 = ({ formData, setFormData, prevStep, submitForm }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const handleCardNumberChange = (e) => {
    const inputCardNumber = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
    setCardNumber(inputCardNumber);
    setFormData({ ...formData, cardNumber: inputCardNumber });
  };

  const handleExpiryDateChange = (e) => {
    const inputExpiryDate = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
    setExpiryDate(inputExpiryDate);
    setFormData({ ...formData, expiryDate: inputExpiryDate });
  };

  const isCardNumberValid = cardNumber.length === 12;
  const isExpiryDateValid = expiryDate.length === 4;

  return (
    <div>
      <h2>Step 3: Payment Information</h2>
      <label>
        Card Number:
        <input type="text" name="cardNumber" value={cardNumber} onChange={handleCardNumberChange} />
        {!isCardNumberValid && <span style={{ color: 'red' }}>Card number must be 12 digits</span>}
      </label>
      <br />
      <label>
        Expiry Date (MM/YY):
        <input type="text" name="expiryDate" value={expiryDate} onChange={handleExpiryDateChange} />
        {!isExpiryDateValid && <span style={{ color: 'red' }}>Expiry date must be in MM/YY format</span>}
      </label>
      <br />
      <button onClick={prevStep}>Back</button>
      <button onClick={submitForm} disabled={!isCardNumberValid || !isExpiryDateValid}>
        Submit
      </button>
    </div>
  );
};

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    make: '',
    model: '',
    cardNumber: '',
    expiryDate: '',
  });

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const submitForm = () => {
    // Validate card number and expiry date
    if (formData.cardNumber.length !== 12 || formData.expiryDate.length !== 4) {
      console.error('Invalid card number or expiry date');
      return;
    }

    // Handle the submission, for example, log the form data to the console
    console.log('Form submitted:', formData);
    // Add additional logic for form submission, such as sending data to a server
  };

  return (
    <div>
      {step === 1 && <Step1 formData={formData} setFormData={setFormData} nextStep={nextStep} />}
      {step === 2 && <Step2 formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />}
      {step === 3 && <Step3 formData={formData} setFormData={setFormData} prevStep={prevStep} submitForm={submitForm} />}
    </div>
  );
};

export default MultiStepForm;
