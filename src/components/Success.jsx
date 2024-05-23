import React from "react";
import { useLocation } from "react-router-dom";
import { Country} from "country-state-city";

const Success = () => {
  const location = useLocation();
  const { state } = location;

  return (
    <>
      {!state ? (
        <p className="text-2xl text-red-600 leading-6 font-semibold m-[25%] mx-[40%]">
          Form not Submitted!
        </p>
      ) : (
        <div className="md:mx-20 md:my-10">
          <div className="md:px-4 sm:px-0">
            <h3 className="mt-2 font-semibold leading-4 text-green-500 md:text-3xl text-xl text-center">
              Form Successfully Submitted!
            </h3>
            <p className="mt-3 max-w-2xl text-gray-600 text-lg leading-6 font-semibold md:mx-44 mx-2 text-center">
              Personal details
            </p>
          </div>
          <div className="mt-6 border-t border-gray-100 divide-y divide-gray-100 mx-1 md:mx-48">
            {Object.entries(state).map(([key, value]) => {
              if (key !== "confirmPassword" && key !== "country") {
                return (
                  <dl key={key} className="">
                    <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 flex justify-between">
                      <dt className="text-sm font-medium md:leading-6 text-gray-900 capitalize">
                        {key}
                      </dt>
                      <dd className="mt-1 md:ml-16 text-sm leading-6 text-blue-600 sm:col-span-2 sm:mt-0">
                        {value}
                      </dd>
                    </div>
                  </dl>
                );
              }
              if (key === "country") {
                return (
                  <dl key={key} className="">
                    <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 flex justify-between">
                      <dt className="text-sm font-medium md:leading-6 text-gray-900 capitalize ">
                        {key}
                      </dt>
                      <dd className="mt-1 md:ml-16 text-sm leading-6 text-blue-600 sm:col-span-2 sm:mt-0">
                        {Country.getCountryByCode(value).name}
                      </dd>
                    </div>
                  </dl>
                );
              }
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Success;
