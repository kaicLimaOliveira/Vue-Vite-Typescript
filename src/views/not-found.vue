<template>
  <div class="not-found">
    <div>
      <img src="../assets/imgs/notfound.svg" alt="Not found image" width="400" />
    </div>
    <span>Página não encontrada</span>

    <RouterLink :to="{ name: 'Home' }">
      Voltar a página Home
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

  span {
    font-size: 20px;
  }

  .router-link {
    color: black;
  }
}
</style>