import { ref, onMounted, onUnmounted } from "vue";

const width = ref(window.innerWidth);
const height = ref(window.innerHeight);

export function useWindowSize() {
  const updateSize = () => {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  };

  onMounted(() => {
    window.addEventListener("resize", updateSize);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", updateSize);
  });

  return { width, height };
}