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

      <li v-if="hasAdminRole" class="admin-links">
          <router-link to="/admin" class="nav-link" @click="closeMenu">{{ t("navbar.comment") }}</router-link>
          <router-link to="/admin/add-project" class="nav-link" @click="closeMenu">{{ t("navbar.proyecto") }}</router-link>
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
  background-color: #000000; /* Black background */
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  padding: 12px 24px;
  border-bottom: 2px solid #1098F7; /* Electric blue underline */
  box-shadow: 0 4px 10px rgba(16, 152, 247, 0.4); /* Soft blue glow */
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-right: 100px;
}

/* Navigation Links */
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
  color: #FFFFFF; /* White text */
  font-size: 1rem;
  font-weight: 600;
  transition: color 0.3s ease, text-shadow 0.3s ease;
  position: relative;
}

/* Hover Effect */
.nav-link:hover {
  color: #1098F7; /* Electric blue text */
  text-shadow: 0 0 8px rgba(16, 152, 247, 0.8); /* Glowing effect */
}

/* Animated Underline */
.nav-link::after {
  content: "";
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -4px;
  left: 50%;
  background: #1098F7;
  transition: all 0.3s ease-in-out;
  transform: translateX(-50%);
}

.nav-link:hover::after {
  width: 100%;
}

/* Buttons */
.btn-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.btn, .auth-button {
  background: transparent;
  border: 2px solid #1098F7;
  color: #1098F7;
  padding: 6px 14px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.btn:hover, .auth-button:hover {
  background: #1098F7;
  color: #000000;
  border-color: #1098F7;
}

/* Burger Menu */
.burger-menu {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
}

.burger-icon {
  background-color: #FFFFFF;
  height: 3px;
  width: 24px;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.burger-menu:hover .burger-icon {
  background-color: #1098F7;
}

/* Responsive Design */
@media (max-width: 768px) {
  .nav-links {
    display: none;
    flex-direction: column;
    width: 100%;
    position: absolute;
    top: 65px;
    left: 0;
    background-color: #000000;
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

.admin-links {
  display: flex;
  gap: 15px; /* Space between links */
}


</style>
