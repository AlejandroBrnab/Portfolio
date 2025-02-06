<template>
  <nav class="navbar">
    <div class="navbar-container">
      <ul class="nav-links" :class="{ 'active': isMenuOpen }">
        <li><router-link to="/" class="nav-link" @click="closeMenu">{{ t("navbar.about") }}</router-link></li>
        <li><router-link to="/projects" class="nav-link" @click="closeMenu">{{ t("navbar.projects") }}</router-link></li>
        <li><router-link to="/testimonials" class="nav-link" @click="closeMenu">{{ t("navbar.testimonials") }}</router-link></li>
        <li><router-link to="/contact" class="nav-link" @click="closeMenu">{{ t("navbar.contact") }}</router-link></li>
        <li><router-link to="/resume" class="nav-link" @click="closeMenu">{{ t("navbar.resume") }}</router-link></li>

        <li v-if="hasAdminRole">
          <router-link to="/admin" class="nav-link" @click="closeMenu">Admin</router-link>
          <router-link to="/admin/add-project" class="nav-link" @click="closeMenu">Add project</router-link>
        </li>
        <div v-if="!hasAdminRole">No Admin Role</div> <!-- Add this to debug -->
      </ul>

      <div class="btn-container">
        <button class="btn" @click="switchLanguage">
          {{ t("navbar.switch_language") }}
        </button>
        <button 
          v-if="!isAuthenticated" 
          @click="() => loginWithRedirect()" 
        >
          {{ t("navbar.login") }}
        </button>
        <button 
          v-if="isAuthenticated" 
          @click="logout({ logoutParams: { returnTo: returnToUrl } })" 
        >
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
const returnToUrl = window.location.origin;

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
  return hasRole('Admin');  // Check if the user has the 'Admin' role
});

// Toggle the menu state
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// Close the menu when clicking a link
const closeMenu = () => {
  isMenuOpen.value = false;
};

// Switch the language between English and French
const switchLanguage = () => {
  locale.value = locale.value === 'en' ? 'fr' : 'en';
};
</script>


<style scoped>
.navbar {
  background-color: #121212;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
  border-bottom: 3px solid #ff0066;
  box-shadow: 0 0 10px #ff0066, 0 0 20px #ff0066;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 20px 20px;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 2rem;
}

.nav-links li {
  font-size: 18px;
}

.nav-link {
  text-decoration: none;
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;
  letter-spacing: 1px;
  transition: color 0.3s ease, transform 0.3s ease, text-shadow 0.3s ease;
  text-shadow: 0 0 5px #ff0066, 0 0 10px #ff0066, 0 0 20px #ff0066;
}

.nav-link:hover {
  color: #00ffcc;
  transform: scale(1.1);
  text-shadow: 0 0 10px #00ffcc, 0 0 20px #00ffcc, 0 0 30px #00ffcc;
}

.btn-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.btn {
  background: transparent;
  border: 1px solid #00ffcc;
  color: #00ffcc;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.btn:hover {
  background: #00ffcc;
  color: #121212;
}

/* Burger Menu Icon */
.burger-menu {
  display: none;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
}

.burger-icon {
  background-color: #fff;
  height: 4px;
  width: 25px;
  border-radius: 2px;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
    position: absolute;
    top: 70px;
    left: 0;
    background-color: #121212;
    padding: 20px 0;
  }

  .nav-links.active {
    display: flex;
  }

  .burger-menu {
    display: flex;
  }

  .nav-link {
    font-size: 1.5rem;
    text-align: center;
    padding: 10px 0;
    width: 100%;
  }

  .nav-link:hover {
    transform: none;
    text-shadow: none;
  }

  .btn-container {
    display: none;
  }
}
</style>