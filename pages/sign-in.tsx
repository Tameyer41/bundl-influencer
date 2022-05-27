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
    <div className="min-h-screen  flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Head>
        <title>Sign In</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" flex flex-col justify-center sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <h1 className="text-4xl font-semibold text-gray-900 sm:truncate">
            Sign In
          </h1>
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="py-8 px-4 mx-2 rounded-sm sm:px-10">
            <div className="grid grid-cols-1 gap-6">
              {providers.map((provider) => {
                return (
                  <button
                    key={provider}
                    type="button"
                    onClick={() => handleProviderSignIn(provider)}
                    className="inline-flex space-x-2 w-full border border-gray-200 focus:border-[#c3a478] hover:bg-gray-50 text-sm font-medium items-center h-[44px] justify-center px-4 py-2 rounded"
                  >
                    <img
                      className="w-6 h-6"
                      src={`/assets/${provider.id}.svg`}
                    />
                    <p>Sign in with {provider.name}</p>
                  </button>
                );
              })}
            </div>
            <hr className="h-0 border-t my-4" />
            <form className="text-center" onSubmit={handleSubmit(onSubmit)}>
              <input
                name="csrfToken"
                {...register("csrfToken")}
                type="hidden"
                defaultValue={csrfToken}
                hidden
              />
              <div className="">
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Enter your email address"
                    required
                    {...register("email")}
                    className="w-full text-base border border-[#e0e0e0] rounded px-[10px] h-[44px] outline-none focus:border-[#635bff] transition duration-150 ease-in-out placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div className="mt-4">
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    minLength={12}
                    required
                    {...register("password")}
                    className="w-full text-base border border-[#e0e0e0] rounded px-[10px] h-[44px] outline-none focus:border-[#635bff] transition duration-150 ease-in-out placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div className="mt-6 space-y-2 flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#635bff] disabled:bg-opacity-80 text-white m-[3px] text-base font-medium shadow-sm h-[44px] px-[16px] rounded-[4px]"
                >
                  {isSubmitting ? (
                    <div
                      className="spinner-border animate-spin inline-block w-6 h-6 border-2 rounded-full text-white"
                      role="status"
                    ></div>
                  ) : (
                    <p>Continue</p>
                  )}
                </button>
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium text-gray-700">
                  Don't have an account? Don't worry
                </p>
                <p className="text-sm font-normal text-gray-500">
                  If you are part of EKHO MGMT, you can sign up with the form
                  above. An account will be created if it is your first time
                  signing up.
                </p>
              </div>
            </form>
          </div>
        </div>
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
