import { createAuth0 } from '@auth0/auth0-vue';

export default createAuth0({
  domain: 'dev-cqv3m8q2efiz3xqi.us.auth0.com',
  clientId: 'XncL2kFmjMpxhnRzEGMwV02KwslpTWFD',
  authorizationParams: {
    redirect_uri: window.location.origin,
    audience: 'https://portfolio-xd.com'
  }
});