interface Config {
  common: ConfigCommon;
  development: ConfigEnvironment;
  production: ConfigEnvironment;
}

interface ConfigCommon {
  googleAnalytics: ConfigGoogleAnalytics;
}

interface ConfigGoogleAnalytics {
  measurementId: string;
}

interface ConfigEnvironment {
  version: string;
  buckets: Buckets;
  apiUrl: string;
}

interface Buckets {
  users: string;
}

export const config: Config = {
  common: {
    googleAnalytics: {
      measurementId: "G-1896RM2FM7",
    },
  },
  development: {
    version: "0.0.1",
    buckets: {
      users: "gs://tuplanhoy-dev-users",
    },
    apiUrl: process.env.NEXT_PUBLIC_API_URL_DEV as string,
  },
  production: {
    version: "0.0.1",
    buckets: {
      users: "gs://tuplanhoy-users",
    },
    apiUrl: process.env.NEXT_PUBLIC_API_URL_PROD as string,
  },
};
