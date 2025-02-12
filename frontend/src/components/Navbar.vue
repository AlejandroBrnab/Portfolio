<template>
  <nav class="navbar">
    <div class="navbar-container">
      <ul class="nav-links" :class="{ 'active': isMenuOpen }">
        <li><router-link to="/" class="nav-link" @click="closeMenu">{{ t("navbar.about") }}</router-link></li>
        <li><router-link to="/projects" class="nav-link" @click="closeMenu">{{ t("navbar.projects") }}</router-link></li>
        <li><router-link to="/testimonials" class="nav-link" @click="closeMenu">{{ t("navbar.testimonials") }}</router-link></li>
        <li><router-link to="/contact" class="nav-link" @click="closeMenu">{{ t("navbar.contact") }}</router-link></li>
        <li><router-link to="/resume" class="nav-link" @click="closeMenu">{{ t("navbar.resume") }}</router-link></li>
      </ul>

      <li v-if="hasAdminRole">
          <router-link to="/admin" class="nav-link" @click="closeMenu">Admin</router-link>
          <router-link to="/admin/add-project" class="nav-link" @click="closeMenu">Add project</router-link>
        </li>

      <div class="btn-container">
        <button class="btn" @click="switchLanguage">
          {{ t("navbar.switch_language") }}
        </button>
        <button 
          v-if="!isAuthenticated" 
          @click="() => loginWithRedirect()" class="auth-button"
        >
          {{ t("navbar.login") }}
        </button>
        <button v-if="isAuthenticated" @click="handleLogout">
  {{ t("navbar.logout") }}
</button>

      </div>

      <div class="burger-menu" @click="toggleMenu">
        <div class="burger-icon"></div>
        <div class="burger-icon"></div>
        <div class="burger-icon"></div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAuth0 } from '@auth0/auth0-vue';
import { useAuthStore } from '@/stores/roles'; // Import the Pinia store

const { t, locale } = useI18n();
const { loginWithRedirect, logout, isAuthenticated, getAccessTokenSilently } = useAuth0();
const isMenuOpen = ref(false);

// Access the store
const { hasRole, fetchUserRoles, roles } = useAuthStore();

// Fetch the user's roles from the token when the user is authenticated
watch(isAuthenticated, async (newVal) => {
  if (newVal) {
    // Fetch roles from Auth0 when the user logs in
    await fetchUserRoles();
  }
});

// Get the 'Admin' role status
const hasAdminRole = computed(() => {
  return hasRole('Admin');  // Check if the user has the 'Admin' role AUXILIO
});

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const returnToUrl = window.location.origin;

const closeMenu = () => {
  isMenuOpen.value = false;
};

const switchLanguage = () => {
  locale.value = locale.value === 'en' ? 'fr' : 'en';
};

const handleLogout = async () => {

  // Clear any stored authentication data
  localStorage.clear();
  sessionStorage.clear();

  await logout({
    logoutParams: {
      returnTo: returnToUrl,
      federated: true, // This ensures full logout from Auth0
    },
  });

  // Optional: Force page reload to fully clear the session
  setTimeout(() => {
    window.location.href = returnToUrl;
  }, 1000);
};

</script>

<style scoped>
.navbar {
  background-color: #8DA1B9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
  padding: 12px 24px;
  border-bottom: 2px solid #EF959C;
  box-shadow: 0 4px 10px rgba(239, 149, 156, 0.4);
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-right: 100px
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 1.5rem;
}

.nav-links li {
  font-size: 16px;
}

.nav-link {
  text-decoration: none;
  color: #DBC7BE;
  font-size: 1rem;
  font-weight: 600;
  transition: color 0.3s ease, text-shadow 0.3s ease;
}

.nav-link:hover {
  color: #EF959C;
  text-shadow: 0 0 8px rgba(239, 149, 156, 0.8);
}

.btn-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.btn {
  background: transparent;
  border: 2px solid #CBB3BF;
  color: #CBB3BF;
  padding: 6px 14px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.btn:hover {
  background: #EF959C;
  color: #121212;
  border-color: #EF959C;
}

.burger-menu {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
}

.burger-icon {
  background-color: #DBC7BE;
  height: 3px;
  width: 24px;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.burger-menu:hover .burger-icon {
  background-color: #EF959C;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
    flex-direction: column;
    width: 100%;
    position: absolute;
    top: 65px;
    left: 0;
    background-color: #8DA1B9;
    padding: 20px 0;
    gap: 1.2rem;
  }

  .nav-links.active {
    display: flex;
  }

  .burger-menu {
    display: flex;
  }

  .btn-container {
    display: none;
  }
}

.auth-button {
  background: transparent;
  border: 2px solid #CBB3BF;
  color: #CBB3BF;
  padding: 6px 14px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.auth-button:hover {
  background: #EF959C;
  color: #121212;
  border-color: #EF959C;
}
</style>
