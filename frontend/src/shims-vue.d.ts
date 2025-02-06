import { Auth0Client } from '@auth0/auth0-spa-js';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $auth: Auth0Client;
  }
}
