"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { loginAction } from "../actions/authActions";

export default function Page() {
  const [msgState, setMsgState] = useState<any>({ message: "", error: "" });
  const router = useRouter();

  async function handleLogin(formData: FormData) {
    // Mix server action and client action
    const res = await loginAction(formData);
    setMsgState(res);
    // console.log(res);

    if (res?.message === "success") {
      // const username = formData.get("email")?.toString().split("@")[0] || "";
      router.push("/");
      toast.success(`Welcome ${res.name}!`);
    } else {
      toast.error(res.error || "");
    }
  }

  return (
    <div className="p-4 flex">
      <div className="w-full max-w-xs">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          action={handleLogin}
        >
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
              type="text"
              required
              onInvalid={(e) =>
                (e.target as HTMLInputElement).setCustomValidity(
                  "Please enter your email",
                )
              }
              onInput={(e) =>
                (e.target as HTMLInputElement).setCustomValidity("")
              }
            />
          </div>
          <div className="mb-6">
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
              onInvalid={(e) =>
                (e.target as HTMLInputElement).setCustomValidity(
                  "Please enter your password",
                )
              }
              onInput={(e) =>
                (e.target as HTMLInputElement).setCustomValidity("")
              }
            />
          </div>
          <p aria-live="polite" className="text-red-500 mb-4">
            {msgState?.message !== "success" && msgState?.message}
          </p>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
          Don&rsquo;t have an account?&nbsp;
          <Link
            className="mt-4 inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="signup"
          >
            Sign up
          </Link>
        </form>
      </div>
    </div>
  );
}
