<template>
  <div 
    class="dropdown" 
    :class="{ 'is-active': isActive }" 
    @mouseenter="activateDropdown" 
    @mouseleave="deactivateDropdown"
  >
    <div class="dropdown-trigger">
      <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
        <Icon icon="gear" size="lg"></Icon>
      </button>
    </div>
    
    <div class="dropdown-menu" id="dropdown-menu" role="menu">
      <div class="dropdown-content">
        <RouterLink @click="logoutUser" class="navbar-item" :to="{ name: 'Login' }">
          <Icon icon="right-from-bracket" class="pr-3"></Icon>
          <span>Sair</span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useAuthStore } from '../../stores/authStore';
import AuthenticationService from '../../server/api/authentication';

const authStore = useAuthStore()
const service = new AuthenticationService()

function logoutUser() {
  service.logout()
  
  authStore.$reset()
}

const isActive = ref(false);

const activateDropdown = () => {
  isActive.value = true;
};

const deactivateDropdown = () => {
  setTimeout(() => {
    isActive.value = false;
  }, 200); 
};
</script>

<style scoped lang="scss">
.dropdown {
  position: relative;

  .dropdown-trigger {
    margin-right: 12px;

    .button {
      border: none;
      cursor: pointer;
      background: none;

      .icon {
        margin-left: 0.5rem;
      }
    }
  }

  &.is-active {
    .dropdown-menu {
      display: block;
    }
  }

  .dropdown-menu {
    width: 150px;
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 10;
    min-width: 100%;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-top: 0.5rem;
    padding: 0.5rem 1rem;
    transform: translateX(-85%);
  }

  .dropdown-content {
    display: block;

    .navbar-item {
      display: flex;
      align-items: center;
      text-decoration: none;
      line-height: 32px;

      span {
        width: 100%;
      }
    }
  }

  .dropdown-item {
    padding: 0.5rem 1rem;
    color: #363636;
    text-decoration: none;
    display: block;

    &:hover {
      background-color: #f5f5f5;
    }
  }

  .dropdown-menu:hover {
    display: block;
  }

  .dropdown-menu.is-active {
    display: block;
  }
}
</style>
