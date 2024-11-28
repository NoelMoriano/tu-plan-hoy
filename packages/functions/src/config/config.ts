export const config: Config = {
  common: {
    "node-mailer": {
      port: 465,
      host: "smtp.gmail.com",
      from: "Tu plan hoy",
      user: "tuplanhoy@gmail.com",
      pass: "aghv nygl mzqo gqud",
    },
  },
  development: {
    version: "0.0.1",
    hosting: {
      domain: "https://tu-plan-hoy.com",
      apiUrl: "https://api-tu-plan-hoy.com",
    },
  },
  production: {
    version: "0.0.1",
    hosting: {
      domain: "https://tu-plan-hoy-dev.com",
      apiUrl: "https://api-tu-plan-hoy-dev.com",
    },
  },
};
