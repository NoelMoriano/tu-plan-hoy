import React from "react";
import { Router } from "./router";
import {
  AuthenticationProvider,
  ConfigsInitializer,
  GlobalDataProvider,
  VersionProvider,
} from "./providers";

export const App = () => (
  <VersionProvider>
    <ConfigsInitializer>
      <AuthenticationProvider>
        <GlobalDataProvider>
          <Router />
        </GlobalDataProvider>
      </AuthenticationProvider>
    </ConfigsInitializer>
  </VersionProvider>
);
