import { defineStore } from 'pinia';
import { useAuth0 } from '@auth0/auth0-vue';
import { ref, computed, onMounted, watch } from 'vue';
import { jwtDecode } from 'jwt-decode';

export const useAuthStore = defineStore('auth', () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const roles = ref<string[]>([]);
  const accessToken = ref<string | null>(localStorage.getItem('access_token')); // Check localStorage for the token initially

  // Fetch user roles and store the access token
  const fetchUserRoles = async () => {
    try {
      console.log('Attempting to fetch access token...');
      const token = await getAccessTokenSilently();
      if (token) {
        localStorage.setItem('access_token', token); // Set the token in localStorage
        accessToken.value = token;
        console.log('Access Token stored in localStorage:', token); // Debugging here

        interface DecodedToken {
          'https://portafolio/roles'?: string[];
        }
        const decodedToken: DecodedToken = jwtDecode<DecodedToken>(token);
        roles.value = decodedToken['https://portafolio/roles'] || [];
        console.log('Updated roles:', roles.value);
      } else {
        console.error('No token found');
      }
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  // Treat isAuthenticated as a computed value
  const isUserAuthenticated = computed(() => isAuthenticated.value);

  onMounted(() => {
    if (isUserAuthenticated.value) {
      console.log('User is authenticated, fetching roles...');
      fetchUserRoles();
    } else {
      console.log('User is not authenticated.');
    }
  });

  // Watch for changes in authentication status and fetch roles if authenticated
  watch(isUserAuthenticated, (newVal) => {
    if (newVal) {
      console.log('User is authenticated, fetching roles...');
      fetchUserRoles();
    }
  });

  // This function checks if the user has a certain role
  const hasRole = (role: string) => roles.value.includes(role);

  // Helper to get the token directly if needed
  const getToken = () => {
    return localStorage.getItem('access_token');
  };

  const logoutUser = () => {
    roles.value = [];
    accessToken.value = null;
    localStorage.removeItem('access_token');
  };

  return {
    roles,
    accessToken,
    isUserAuthenticated,
    hasRole,
    fetchUserRoles,
    getToken,
    logoutUser
  };
});