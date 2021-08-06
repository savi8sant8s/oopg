const { createSecureHeaders } = require("next-secure-headers");

module.exports = {
  reactStrictMode: true,
  env: {
    GOOGLE_CLIENT_ID: "316289153056-qgt199ekbl79njet63nbeisnd1ae0ap0.apps.googleusercontent.com"
  },
  async headers() {
    return [{ source: "/(.*)", headers: createSecureHeaders() }];
  },
};
