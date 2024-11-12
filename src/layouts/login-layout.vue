<template>
  <div class="login">
    <div class="login-column-image">
      <figure>
        <img src="../assets/imgs/organizer.svg" width="500" alt="GPA image" />
      </figure>
    </div>

    <div class="login-column-form">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.login {
  display: flex;
  align-items: center;
  margin: 0 auto;
  min-height: 100vh;
  background-color: hsl(0, 0%, 96%);

  &-column-image {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 50%;
  }

  &-column-form {
    height: 100%;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>