<!-- pages/index.vue -->
<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  router.replace('/service') // remplace la route actuelle pour ne pas garder "/" dans l'historique
})
</script>

<template>
  <!-- Optionnel : tu peux mettre un message pendant la redirection -->
  <div class="flex items-center justify-center h-screen">
    Redirecting to Service page...
  </div>
</template>
