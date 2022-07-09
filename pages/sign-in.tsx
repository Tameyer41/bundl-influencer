import { filter } from "lodash";
import { GetServerSidePropsContext } from "next";
import {
  getSession,
  getCsrfToken,
  signIn,
  getProviders,
} from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

const MINIMUM_ACTIVITY_TIMEOUT = 850;
type LoginFormValues = {
  csrfToken: string;
  email: string;
  password: string;
};

export default function Page({ csrfToken, providers }) {
  const [isSubmitting, setSubmitting] = React.useState(false);

  const { register, handleSubmit } = useForm();

  const handleProviderSignIn = (provider) => {
    signIn(provider.id);
  };
  const onSubmit = async (data: LoginFormValues) => {
    setSubmitting(true);
    try {
      signIn("app-login", {
        callbackUrl: "/",
        email: data.email,
        password: data.password,
      });

      setTimeout(() => {
        setSubmitting(false);
      }, MINIMUM_ACTIVITY_TIMEOUT);
    } catch (error) {
      console.error(error);
      //   setError(error)
      setSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen justify-center md:px-12 lg:px-0">
      <div className="relative z-10 flex flex-1 flex-col bg-white py-10 px-4 shadow-2xl sm:justify-center md:flex-none md:px-28">
        <div className="mx-auto w-full max-w-md sm:px-4 md:w-96 md:max-w-sm md:px-0">
          <div className="flex flex-col">
            <Link href="/" aria-label="Home">
              <svg
                className="h-16 w-16"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 595.5 595.3"
              >
                <path
                  d="M224.6,12.5H67.3c-30.2,0-54.6,24.5-54.6,54.6v157.3c0,27.2,22.1,49.3,49.3,49.3h212l0,0v-212
	C274,34.6,251.9,12.5,224.6,12.5z"
                />
                <path d="M12.7,528.1c0,30.2,24.5,54.6,54.6,54.6h61V467.1H12.7V528.1z" />
                <path
                  d="M274,321.4H62c-27.2,0-49.3,22.1-49.3,49.3v46.9h165v165h46.9c27.2,0,49.3-22.1,49.3-49.3L274,321.4
	C274,321.4,274,321.4,274,321.4z"
                />
                <path
                  d="M527.7,321.4h-212v212c0,27.2,22.1,49.3,49.3,49.3h157.3c30.2,0,54.6-24.5,54.6-54.6V370.7
	C577.1,343.5,555,321.4,527.7,321.4z"
                />
                <path
                  d="M522.4,12.5H365.1c-27.2,0-49.3,22.1-49.3,49.3v212h54.1h53.2h75.9h28.7c27.2,0,49.3-22.1,49.3-49.3V67.2
	C577.1,37,552.6,12.5,522.4,12.5z M514.3,185.5c0,14.2-11.5,25.6-25.6,25.6h-14.9h-39.5h-27.7h-28.1V100.9
	c0-14.2,11.5-25.6,25.6-25.6h81.8c15.7,0,28.4,12.7,28.4,28.4V185.5z"
                />
              </svg>
            </Link>
            <div className="mt-20">
              <h2 className="text-lg font-semibold text-gray-900">
                Sign in to your account
              </h2>
              <p className="mt-2 text-sm text-gray-700">
                Don’t have an account?{" "}
                <Link href="/register">
                  <a className="font-medium text-blue-600 hover:underline">
                    Sign up
                  </a>
                </Link>{" "}
                for a free trial.
              </p>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-10 grid grid-cols-1 gap-y-8"
          >
            <input
              name="csrfToken"
              {...register("csrfToken")}
              type="hidden"
              defaultValue={csrfToken}
              hidden
            />
            <div>
              <label
                htmlFor="email"
                className="mb-3 block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                required
                id="email"
                type="email"
                autoComplete="email"
                {...register("email")}
                className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-3 block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                required
                id="password"
                type="password"
                {...register("password")}
                minLength={8}
                autoComplete="current-password"
                className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600 w-full group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <span>
                  {isSubmitting ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth={3}
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    "Sign in"
                  )}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden sm:contents lg:relative lg:block lg:flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://ik.imagekit.io/9km72asqu/background-auth_UiWHWLDVg.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1657374317964"
        />
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (session) {
    return { redirect: { permanent: false, destination: "/" } };
  }

  const csrfToken = await getCsrfToken({ req: context.req });
  const providers = filter(await getProviders(), (provider) => {
    return provider.type !== "credentials";
  });

  return {
    props: { csrfToken, providers },
  };
}
