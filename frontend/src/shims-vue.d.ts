import { Auth0Client } from '@auth0/auth0-spa-js'; // Import the correct type for Auth0Client

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $auth: Auth0Client; // Declare $auth as the type of Auth0Client
  }
}
