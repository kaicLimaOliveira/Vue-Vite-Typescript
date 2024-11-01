<template>
  <div class="page-loader">
    <div class="anim-11">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>
  
  
<style scoped>
.page-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
}

.anim-11 {
  display: flex;
  justify-content: center;
  align-items: center;
}

.anim-11 div {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin: 0px 5px;
  animation: anim-11 2s infinite cubic-bezier(.48, .06, .44, .82);
}

.anim-11 div:nth-child(1) {
  animation-delay: 0s;
  background-color: rgb(190, 196, 255);
}

.anim-11 div:nth-child(2) {
  animation-delay: .15s;
  background-color: rgb(138, 149, 255);
}

.anim-11 div:nth-child(3) {
  animation-delay: .3s;
  background-color: rgb(92, 108, 255);
}

.anim-11 div:nth-child(4) {
  animation-delay: .45s;
  background-color: rgb(53, 73, 255);
}

@keyframes anim-11 {
  0% {
    transform: translateY(0px);
  }

  45% {
    transform: translateY(-15px);
  }

  100% {
    transform: translateY(0px);
  }
}
</style>