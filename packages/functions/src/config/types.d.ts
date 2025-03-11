type EnvironmentConfig = ConfigCommon & ConfigEnvironment;

interface Config {
  common: ConfigCommon;
  development: ConfigEnvironment;
  production: ConfigEnvironment;
}

interface ConfigCommon {
  "node-mailer": NodeMailerConfig;
}

interface ConfigEnvironment {
  version: string;
  hosting: {
    domain: string;
    apiUrl: string;
  };
  clients: {
    algolia: {
      appId: string;
      apiKey: string;
    };
  };
}

interface NodeMailerConfig {
  port: number;
  host: string;
  from: string;
  user: string;
  pass: string;
}
