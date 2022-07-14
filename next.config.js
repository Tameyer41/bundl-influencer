if (!process.env.NEXTAUTH_URL) {
  console.warn(
    "\x1b[33mwarn",
    "\x1b[0m",
    "NEXTAUTH_URL environment variable is not set."
  );
  if (process.env.URL) {
    process.env.NEXTAUTH_URL = process.env.URL;
    console.warn(
      "\x1b[33mwarn",
      "\x1b[0m",
      `NEXTAUTH_URL environment variable is not set. Using Netlify URL ${process.env.URL}.`
    );
  }
}

module.exports = {
  target: "experimental-serverless-trace",
  future: {
    webpack5: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      "projectinfluencer.s3.us-east-1.amazonaws.com",
      "projectinfluencer.s3.amazonaws.com",
      "s3.us-east-1.amazonaws.com",
      "amazonaws.com",
    ],
  },
};
