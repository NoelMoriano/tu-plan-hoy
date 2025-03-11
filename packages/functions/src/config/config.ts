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
    clients: {
      algolia: {
        appId: "FUII3VQDX6",
        apiKey: "b4235aad997483ac6a37a362b52b56ac",
      },
    },
  },
  production: {
    version: "0.0.1",
    hosting: {
      domain: "https://tu-plan-hoy-dev.com",
      apiUrl: "https://api-tu-plan-hoy-dev.com",
    },
    clients: {
      algolia: {
        appId: "I2LR9S9P0C",
        apiKey: "872bb21623b1a846be94977983d3af5c",
      },
    },
  },
};
