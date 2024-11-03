import React, { useState } from "react";
import axios from "axios";
import { Toaster } from "react-hot-toast";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [mathAnswer, setMathAnswer] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [mathQuestion, setMathQuestion] = useState(generateMathQuestion());

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleSecurityAnswerChange = (e) => setSecurityAnswer(e.target.value);
  const handleMathAnswerChange = (e) => setMathAnswer(e.target.value);

  function generateMathQuestion() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operator = Math.random() > 0.5 ? "+" : "-";
    return { num1, num2, operator };
  }

  const validateMathAnswer = () => {
    const { num1, num2, operator } = mathQuestion;
    const correctAnswer = operator === "+" ? num1 + num2 : num1 - num2;
    return parseInt(mathAnswer) === correctAnswer;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const baseUrl = import.meta.env.VITE_BASE_URL;

    if (currentStep === 1) {
      const apiUrl = `${baseUrl}/api/auth/login`;
      const formData = { email, password };
      try {
        await axios.post(apiUrl, formData);
        setCurrentStep(2);
      } catch (error) {
        console.error("Login failed:", error);
      }
    } else if (currentStep === 2) {
      const securityApiUrl = `${baseUrl}/api/auth/validate-security`;
      try {
        await axios.post(securityApiUrl, { email, answer: securityAnswer });
        setCurrentStep(3);
      } catch (error) {
        console.error("Security question validation failed:", error);
      }
    } else if (currentStep === 3) {
      if (validateMathAnswer()) {
        console.log("All validations passed!");
      } else {
        console.error("Math answer is incorrect");
      }
    }
  };

  return (
    <div className="card-body max-w-md mx-auto p-6 bg-base-200 rounded-lg shadow-md">
      <Toaster />
      <div className="steps w-full mb-6">
        <div
          className={`step ${currentStep > 1 ? "step-primary" : ""} ${currentStep === 1 ? "step-primary" : ""}`}
        >
          <span className="text-sm">Email & Password</span>
        </div>
        <div
          className={`step ${currentStep > 2 ? "step-primary" : ""} ${currentStep === 2 ? "step-primary" : ""}`}
        >
          <span className="text-sm">Security Question</span>
        </div>
        <div
          className={`step ${currentStep > 3 ? "step-primary" : ""} ${currentStep === 3 ? "step-primary" : ""}`}
        >
          <span className="text-sm">Math Question</span>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        {currentStep === 1 && (
          <>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-md font-bold">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text text-md font-bold">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary w-full">
                Next
              </button>
            </div>
          </>
        )}

        {currentStep === 2 && (
          <>
            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text text-md font-bold">
                  Security Question
                </span>
              </label>
              <input
                type="text"
                placeholder="What was the name of your first pet?"
                className="input input-bordered"
                required
                value={securityAnswer}
                onChange={handleSecurityAnswerChange}
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary w-full">
                Next
              </button>
            </div>
          </>
        )}

        {currentStep === 3 && (
          <>
            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text text-md font-bold">
                  Math Question
                </span>
              </label>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-semibold">
                  {mathQuestion.num1} {mathQuestion.operator}{" "}
                  {mathQuestion.num2} =
                </span>
                <input
                  type="number"
                  placeholder="Answer"
                  className="input input-bordered"
                  required
                  value={mathAnswer}
                  onChange={handleMathAnswerChange}
                />
              </div>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary w-full">
                Login
              </button>
            </div>
          </>
        )}
      </form>
      <button
        onClick={() => document.getElementById("RegistrationModal").showModal()}
      >
        Register
      </button>
    </div>
  );
};

export default LoginForm;
