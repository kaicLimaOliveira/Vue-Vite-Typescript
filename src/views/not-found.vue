<template>
  <div class="not-found">
    <div class="not-found-image">
      <img src="../assets/imgs/notfound.svg" alt="Not found image" width="400" />
    </div>
    <span>Página não encontrada</span>

    <RouterLink :to="{ name: 'Home' }" class="router-link">
      Voltar a página principal
    </RouterLink>
  </div>
</template>

<style scoped lang="scss">
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  flex-direction: column;

  &-image {
    margin-bottom: 16px;
  }

  span {
    font-size: 20px;
  }

  .router-link {
    color: #6c63ff;
    margin-top: 4px;
  }
}
</style>