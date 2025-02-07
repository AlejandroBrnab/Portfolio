import { createAuth0 } from '@auth0/auth0-vue';
import { watch } from 'vue';
import Cookies from 'js-cookie';

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
      Cookies.set('access_token', token, { expires: 1 }); // Set the token in cookies with a 1-day expiration
    } else {
      Cookies.remove('access_token');
    }
  }
);

export default auth0;