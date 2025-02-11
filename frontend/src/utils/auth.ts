import { createAuth0 } from '@auth0/auth0-vue';
import { watch } from 'vue';

const auth0 = createAuth0({
  domain: 'dev-cqv3m8q2efiz3xqi.us.auth0.com',
  clientId: 'XncL2kFmjMpxhnRzEGMwV02KwslpTWFD',
  authorizationParams: {
    redirect_uri: window.location.origin,
    audience: 'https://portfolio-xd.com',
  },
});

watch(
  () => auth0.isAuthenticated,
  async (isAuthenticated) => {
    if (isAuthenticated) {
      const token = await auth0.getAccessTokenSilently();
      localStorage.setItem('access_token', token); // Set the token in localStorage
    } else {
      localStorage.removeItem('access_token');
    }
  }
);

export default auth0;