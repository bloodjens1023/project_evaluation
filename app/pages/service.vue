<template>
  <div class="min-h-screen bg-gray-100">
    <div class="bg-blue-600 text-white p-4 flex items-center">
      <button @click="goBack" class="mr-4">&larr; Voltar</button>
      <h1 class="text-lg font-semibold flex-1 text-center">Serviço</h1>
    </div>

    <div class="p-4">
      <p class="mb-4">
        Nosso suporte responderá o mais rápido possível.
      </p>

      <div v-if="loading">Loading...</div>
      <div v-else-if="error" class="text-red-500">{{ error }}</div>
      
      <div v-else>
        <ServiceButton
          v-for="(btn, index) in buttons"
          :key="index"
          :title="btn.title"
          :url="btn.url"
          :jumpOut="jumpOut"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ServiceButton from '~/components/ServiceButton.vue';
import { useFetch } from 'nuxt/app';

const buttons = ref<{ title: string; url: string }[]>([])
const jumpOut = ref(0)
const loading = ref(true)
const error = ref('')

function goBack() {
  window.history.back()
}
interface ServiceConfig {
  jumpOut: number
  customerButtons: { title: string; url: string }[]
}

onMounted(async () => {
  try {
    const result = await $fetch<ServiceConfig>('/api/service')
    buttons.value = result.customerButtons
    jumpOut.value = result.jumpOut
  } catch (e) {
    error.value = 'Failed to load customer service options.'
    console.error(e)
  } finally {
    loading.value = false
  }
})

</script>
