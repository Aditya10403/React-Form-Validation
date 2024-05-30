import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { Country, City } from "country-state-city";
import { AlertTitle } from "@mui/material";
import { BiShow, BiHide } from "react-icons/bi";

const Form = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    countryCode: "",
    phoneNo: "",
    country: "",
    city: "",
    panNo: "",
    aadharNo: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [showpassword, setShowPassword] = useState(false);
  const [cities, setCities] = useState([]);
  const [phoneCodes, setPhoneCodes] = useState([]);

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (e.target.name === "country") {
      const country = Country.getAllCountries().find(
        (c) => c.isoCode === e.target.value
      );
      setCities(City.getCitiesOfCountry(country.isoCode));
      console.log(cities);
    }
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showpassword);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length === 0) {
      setSuccess(true);
      setTimeout(() => {
        navigate("/success", { state: formData });
      }, 8000);
    } else {
      setErrors(formErrors);
      setTimeout(() => {
        setErrors({});
      }, 5000);
    }
  };

  useEffect(() => {
    const fetchPhoneCodes = async () => {
      const allCountries = await Country.getAllCountries();
      setPhoneCodes(
        allCountries.map((country) => ({
          label: `+${country.phonecode}`,
          value: `${country.name}`,
        }))
      );
    };
    fetchPhoneCodes();
  }, []);

  const getCountryName = (isoCode) => {
    const country = Country.getCountryByCode(isoCode);
    return country ? country.name : "";
  };

  const validateForm = (formData) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!formData.firstName) {
      errors.firstName = "First Name is required";
    }

    if (!formData.lastName) {
      errors.lastName = "Last Name is required";
    }

    if (!formData.username) {
      errors.username = "Username is required";
    }

    if (!formData.email) {
      errors.email = "E-mail is required";
    } else if (!regex.test(formData.email)) {
      errors.email = "Invalid E-mail format";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (!formData.countryCode) {
      errors.phoneNo = "Country Code is required";
    }

    if (!formData.phoneNo) {
      errors.phoneNo = "Phone Number is required";
    }

    if (!formData.country) {
      errors.country = "Country is required";
    }

    if (!formData.city) {
      errors.city = "City is required";
    }

    if (!formData.panNo) {
      errors.panNo = "PAN Number is required";
    }

    if (!formData.aadharNo) {
      errors.aadharNo = "Aadhar Number is required";
    }

    return errors;
  };
  return (
    <>
      {success ? (
        <div className="w-[270px] md:w-[350px] absolute md:left-[2%] md:top-[10%] flex flex-col gap-y-2">
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Form Submitted Successfully!
          </Alert>
        </div>
      ) : (
        ""
      )}
      {Object.values(errors).length > 0 ? (
        <div className="w-[270px] md:w-[350px] absolute md:left-[2%] md:top-[10%] flex flex-col gap-y-2">
          {Object.entries(errors).map(([key, err], index) =>
            key === "password" || key === "confirmPassword" ? (
              <Alert key={index} severity="warning">
                <AlertTitle>Warning</AlertTitle>
                {err}
              </Alert>
            ) : (
              <Alert key={index} severity="info">
                <AlertTitle>Info</AlertTitle>
                {err}
              </Alert>
            )
          )}
        </div>
      ) : (
        ""
      )}
      <div className="min-h-screen mt-20 p-4 md:p-6 bg-slate-300 flex items-center justify-center text-white font-semibold">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <h2 className="font-bold text-blue-600 text-3xl text-center py-1">
              Form
            </h2>
            <div className="bg-slate-700 rounded-xl shadow-lg p-4 px-4 md:p-6 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="">
                  <p className="font-medium text-lg text-gray-300">
                    Personal Details
                  </p>
                  <p className="text-gray-500">
                    Please fill out all the fields.
                  </p>
                </div>

                <div className="lg:col-span-2 p-1">
                  <form
                    onSubmit={handleFormSubmit}
                    className="grid gap-4 gap-y-2 text-sm md:grid-cols-5"
                  >
                    <div className="md:col-span-2">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="h-10 border mt-1 rounded px-4 w-full bg-slate-300 text-black"
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="h-10 border mt-1 rounded px-4 w-full bg-slate-300 text-black"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="username">User Name</label>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className="h-10 border mt-1 rounded px-4 w-full bg-slate-300 text-black"
                      />
                    </div>

                    <div className="md:col-span-4">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="h-10 border mt-1 rounded px-4 w-full bg-slate-300 text-black placeholder:text-gray-400"
                        placeholder="email@domain.com"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="password">Password</label>
                      <div className="flex">
                        <input
                          type={showpassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="h-10 border mt-1 rounded px-4 w-full bg-slate-300 text-black md:col-span-2"
                        />
                        <button
                          className="h-10 border m-1 rounded px-4 w-[25%] bg-slate-300 text-black md:col-span-1"
                          type="button"
                          onClick={handlePasswordToggle}
                        >
                          {showpassword ? (
                            <BiShow size={18} />
                          ) : (
                            <BiHide size={18} />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <div className="flex">
                        <input
                          type={showpassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="h-10 border mt-1 rounded px-4 w-full bg-slate-300 text-black md:col-span-2"
                        />
                        <button
                          className="h-10 border m-1 rounded px-4 w-[25%] bg-slate-300 text-black md:col-span-1"
                          type="button"
                          onClick={handlePasswordToggle}
                        >
                          {showpassword ? (
                            <BiShow size={18} />
                          ) : (
                            <BiHide size={18} />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="country">Country</label>
                      <select
                        className="h-10 bg-slate-300 flex border border-slate-200 rounded items-center mt-1 px-4 w-full text-black"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Country</option>
                        {Country.getAllCountries().map((country) => (
                          <option key={country.isoCode} value={country.isoCode}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="city">City</label>

                      <select
                        className="h-10 bg-slate-300 flex border border-slate-200 w-full px-4 rounded items-center mt-1 text-black"
                        name="city"
                        onChange={handleInputChange}
                        disabled={!formData.country}
                        value={formData.city}
                      >
                        <option value="">
                          {formData.country
                            ? "Select City"
                            : "Select a Country"}
                        </option>
                        {cities.map((city) => (
                          <option key={city.name} value={city.name}>
                            {city.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="phoneNo">Phone No</label>
                      <div className="flex gap-1">
                        <select
                          className="transition-all flex items-center h-10 border mt-1 rounded px-1 w-[35%] bg-slate-300 md:col-span-1 text-black"
                          name="countryCode"
                          value={formData.countryCode}
                          onChange={handleInputChange}
                        >
                          <option value="">ISO</option>
                          {phoneCodes.map((code) => (
                            <option key={code.code} value={code.label}>
                              {code.label} ({code.value})
                            </option>
                          ))}
                        </select>
                        <input
                          type="text"
                          name="phoneNo"
                          className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-slate-300 md:col-span-3 text-black"
                          placeholder=""
                          value={formData.phoneNo}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="panNo">Pan No</label>
                      <input
                        type="text"
                        name="panNo"
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-slate-300 text-black"
                        placeholder=""
                        value={formData.panNo}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="aadharNo">Aadhar No</label>
                      <input
                        type="text"
                        name="aadharNo"
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-slate-300 text-black"
                        placeholder=""
                        value={formData.aadharNo}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="md:col-span-5 md:text-right text-center pt-1">
                      <div className="inline-flex items-end">
                        <button
                          type="submit"
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer active:bg-blue-700/80"
                          disabled={Object.keys(errors).length > 0}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
