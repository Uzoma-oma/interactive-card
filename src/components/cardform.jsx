import { useState } from "react";

import completeicon from "../assets/iconcomplete.svg";
import backgroundDesktop from "../assets/bg-main-desktop.png";
import backgroundMobile from "../assets/bg-main-mobile.png";
import cardLogo from "../assets/card-logo.svg";

export default function CardForm() {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    expMonth: "",
    expYear: "",
    cvc: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const formatCardNumber = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if (name === "number") {
      updatedValue = formatCardNumber(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!/^\d{4} \d{4} \d{4} \d{4}$/.test(formData.number))
      newErrors.number = "Card number must be 16 digits";
    if (!/^\d{2}$/.test(formData.expMonth))
      newErrors.expMonth = "MM must be 2 digits";
    if (!/^\d{2}$/.test(formData.expYear))
      newErrors.expYear = "YY must be 2 digits";
    if (!/^\d{3}$/.test(formData.cvc)) newErrors.cvc = "CVC must be 3 digits";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
    }
  };

  const handleContinue = () => {
    setFormData({
      name: "",
      number: "",
      expMonth: "",
      expYear: "",
      cvc: "",
    });
    setErrors({});
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen w-full bg-white text-purple-950 font-space flex">
      <div className="w-full min-h-auto lg:h-screen flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 max-h-[380px] lg:max-h-full lg:h-screen relative ">
          <picture>
            <source srcSet={backgroundDesktop} media="(min-width: 1024px)" />
            <img
              src={backgroundMobile}
              alt="gradient"
              className="h-2/3 lg:h-full w-full lg:w-2/3"
            />
          </picture>
          {/* Front Card */}
          <div className="absolute pt-7 flex flex-col gap-8 text-white top-0 lg:top-1/2 left-1/2 lg:-translate-y-1/2 -translate-x-1/2">
            <div className="w-[300px] h-[160px] xxs:w-[400px] xxs:h-[200px] p-6 order-2 lg:order-1 z-5 rounded-[7px] bg-[url(/src/assets/bg-card-front.png)] bg-no-repeat bg-center bg-cover shadow-2xl -translate-y-[100.5px] -translate-x-5 xxs:-translate-y-[116.5px] lg:-translate-y-0 lg:-translate-x-0">
              <div className="h-full flex flex-col">
                <div>
                  <img
                    src={cardLogo}
                    alt="card Logo"
                    className="h-7 xxs:h-auto"
                  />
                </div>

                <div className="mt-auto flex flex-col gap-3 tracking-widest">
                  <div className="text-base xxs:text-2xl tracking-[.2rem]">
                    {formData.number || "0000 0000 0000 0000"}
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span>{formData.name || "JANE APPLESEED"}</span>
                    <span>
                      {formData.expMonth || "00"}/{formData.expYear || "00"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Back Card */}
            <div className="w-[300px] h-[160px] xxs:w-[400px] xxs:h-[200px] order-1 lg:order-2 z-0 rounded-[7px] bg-[url(./assets/bg-card-back.png)] bg-no-repeat bg-center bg-cover translate-x-5 lg:translate-x-20 shadow-2xl">
              <div className="h-full relative">
                <p className="absolute top-[69px] xxs:top-[86px] right-10 xxs:right-12 text-sm xxs:text-base">
                  {formData.cvc || "000"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Form or Success Message */}
        <div className="w-full lg:w-1/2 p-8 md:p-10">
          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center space-y-6">
              <img src={completeicon} alt="completed" className="" />
              <div className="text-3xl font-bold text-purple-950">
                Thank you!
              </div>
              <p className="text-gray-600">We've added your card details</p>
              <button
                onClick={handleContinue}
                className="bg-purple-950 text-white rounded-md py-3 px-6 hover:bg-purple-800 transition"
              >
                Continue
              </button>
            </div>
          ) : (
             <div className="h-auto lg:h-screen xl:ml-6 lg:ml-8 mt-20 xs:mt-10 lg:mt-0 flex items-center justify-center xl:justify-start">
      <div className="max-w-[330px] w-full">
              <form
                onSubmit={handleSubmit}
                className="space-y-6 w-full max-w-md"
              >
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    CARDHOLDER NAME
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Jane Appleseed"
                    className={`w-full border ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    CARD NUMBER
                  </label>
                  <input
                    name="number"
                    value={formData.number}
                    onChange={handleChange}
                    placeholder="e.g. 1234 5678 9123 0000"
                    maxLength={19}
                    className={`w-full border ${
                      errors.number ? "border-red-500" : "border-gray-300"
                    } rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  />
                  {errors.number && (
                    <p className="text-red-500 text-xs mt-1">{errors.number}</p>
                  )}
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      EXP. DATE (MM/YY)
                    </label>
                    <div className="flex gap-2">
                      <input
                        name="expMonth"
                        value={formData.expMonth}
                        onChange={handleChange}
                        placeholder="MM"
                        maxLength={2}
                        className={`w-1/2 border ${
                          errors.expMonth ? "border-red-500" : "border-gray-300"
                        } rounded-md px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500`}
                      />
                      <input
                        name="expYear"
                        value={formData.expYear}
                        onChange={handleChange}
                        placeholder="YY"
                        maxLength={2}
                        className={`w-1/2 border ${
                          errors.expYear ? "border-red-500" : "border-gray-300"
                        } rounded-md px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500`}
                      />
                    </div>
                    {(errors.expMonth || errors.expYear) && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.expMonth || errors.expYear}
                      </p>
                    )}
                  </div>

                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      CVC
                    </label>
                    <input
                      name="cvc"
                      value={formData.cvc}
                      onChange={handleChange}
                      placeholder="e.g. 123"
                      maxLength={3}
                      className={`w-full border ${
                        errors.cvc ? "border-red-500" : "border-gray-300"
                      } rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    />
                    {errors.cvc && (
                      <p className="text-red-500 text-xs mt-1">{errors.cvc}</p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-950 text-white rounded-md py-3 hover:bg-purple-800 cursor-pointer transition-all ease-in"
                >
                  Confirm
                </button>
              </form>
            </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
