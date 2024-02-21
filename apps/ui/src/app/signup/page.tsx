"use client";
import Link from "next/link";
import { useState } from "react";
import { useFormState } from "react-dom";
import { signupAction } from "../actions/authActions";

export default function page() {
  const initialState = {
    message: "",
  };
  const [state, formAction] = useFormState(signupAction, initialState);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassErr, setShowPassErr] = useState(false);

  function verifyPassword() {
    if (password !== confirmPassword) {
      return false;
    }
    return true;
  }

  function handleSubmit(formData: FormData) {
    setShowPassErr(false);

    if (!verifyPassword()) {
      setShowPassErr(true);
      return;
    }
    return formAction(formData);
  }

  return (
    <div className="p-4 flex">
      <div className="w-full max-w-xs">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          action={(formData) => {
            handleSubmit(formData);
          }}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              name="name"
              type="text"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="email"
              required
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirmpassword"
            >
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmpassword"
              type="password"
              name="confirmpassword"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
          </div>
          {showPassErr && (
            <p aria-live="polite" className="text-red-500 mb-4">
              Password and confirm password are not the same.
            </p>
          )}
          <p aria-live="polite" className="text-red-500 mb-4">
            {state?.message}
          </p>
          <div className="mt-6 flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign up
            </button>
          </div>
          Already have an account?&nbsp;
          <Link
            className="mt-4 inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="login"
          >
            Login
          </Link>
        </form>
      </div>
    </div>
  );
}
