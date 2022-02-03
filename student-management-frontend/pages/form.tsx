import type { NextPage } from "next";
import { ChangeEvent, useState } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Form: NextPage = () => {
  const [tutors, setTutors] = useState<string[]>([]);
  const [textValue, setValue] = useState("");
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  const renderTutors = () => {
    return tutors.map((tutor) => (
      <li className="px-6 py-2 border-b border-gray-200 w-full">{tutor}</li>
    ));
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {

   setValue(e.target.value);
  };

  const onClick = () => {
    if (textValue.length > 1 && re.test(textValue) ) {
        setTutors([...tutors, textValue]);
        setValue("");
    } else {
        toast.error("Please enter valid email");
    }
  };

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://as1.ftcdn.net/v2/jpg/01/05/29/62/1000_F_105296263_MX030meFkK57Jj7z4TaSZXw1T0KPQXmd.jpg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Input Tutor
            </h2>
          </div>
          <form className="mt-8 space-y-6" >
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label className="sr-only">Email address</label>
                <input
                  name="name"
                  value={textValue}
                  onChange={onChange}
                  type="email"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Tutor"
                />
              </div>
            </div>
            <ToastContainer position="top-center" />
            <div className="flex items-center justify-center">
              <div className="flex items-center">
                <button
                type="button"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                  onClick={onClick}
                >
                  Add
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      <h3 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Find common tutors
      </h3>
      <br></br>
      <div className="flex justify-center">
        <ul className="bg-white rounded-lg border border-gray-200 w-96 text-gray-900">
          {renderTutors()}
        </ul>
      </div>
    </>
  );
};

export default Form;
