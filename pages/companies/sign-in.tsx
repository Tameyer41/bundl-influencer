import { filter } from "lodash";
import { GetServerSidePropsContext } from "next";
import {
  getSession,
  getCsrfToken,
  signIn,
  getProviders,
} from "next-auth/react";
import Head from "next/head";
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
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div className="min-h-screen flex">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h2 className="mt-6 text-3xl font-semibold text-gray-900">
                Let's partner up
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Let's level up your brand, together.
              </p>
            </div>

            <div className="mt-8">
              <div className="mt-6">
                <form className="text-center" onSubmit={handleSubmit(onSubmit)}>
                  <input
                    name="csrfToken"
                    {...register("csrfToken")}
                    type="hidden"
                    defaultValue={csrfToken}
                    hidden
                  />
                  <input
                    name="role"
                    {...register("role")}
                    type="hidden"
                    defaultValue="company"
                    hidden
                  />
                  <div className="space-y-12 mt-12 mb-6">
                    <div>
                      <div className="relative">
                        <input
                          id="company"
                          name="company"
                          type="text"
                          className="peer h-10 w-full border-0 border-b border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:ring-0 focus:border-indigo-600"
                          placeholder="company name"
                          required
                          {...register("email")}
                        />
                        <label
                          htmlFor="company"
                          className="border-none absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                        >
                          Company name
                        </label>
                      </div>
                    </div>
                    <div>
                      <div className="relative">
                        <input
                          id="email"
                          name="email"
                          type="text"
                          className="peer h-10 w-full border-0 border-b border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:ring-0 focus:border-indigo-600"
                          placeholder="john@doe.com"
                          required
                          {...register("email")}
                        />
                        <label
                          htmlFor="email"
                          className="border-none absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                        >
                          Email address
                        </label>
                      </div>
                    </div>
                    <div>
                      <div className="relative">
                        <input
                          id="password"
                          name="password"
                          type="password"
                          className="peer h-10 w-full border-0 border-b border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:ring-0 focus:border-indigo-600"
                          placeholder="password"
                          minLength={12}
                          required
                          {...register("password")}
                        />
                        <label
                          htmlFor="password"
                          className="border-none absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                        >
                          Password
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-xs shadow-sm text-sm font-medium text-white bg-black hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Get Started
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block relative w-0 flex-1">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            alt=""
          />
        </div>
      </div>
    </>
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
