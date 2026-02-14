<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
    <div class="bg-gradient-to-r from-slate-800/80 to-blue-900/80 backdrop-blur-sm text-white shadow-xl border-b border-blue-800/30">
      <div class="px-4 py-4 flex items-center max-w-3xl mx-auto w-full">
        <button 
          @click="goBack" 
          class="mr-4 p-2 hover:bg-blue-800/50 rounded-full transition-all duration-200 w-30"
          aria-label="Back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
          </svg>
        </button>
        <h1 class="text-xl font-semibold flex-1 text-center">Customer Service</h1>
        <div class="w-10"></div>
      </div>
    </div>

    <div class="max-w-2xl mx-auto px-4 py-8">
      <div class="bg-gradient-to-br from-slate-800/50 to-blue-900/30 backdrop-blur-md rounded-2xl shadow-2xl p-6 mb-8 text-center border border-blue-800/20">
        <div class="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
          <svg width="30" xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        <p class="text-slate-200 text-lg font-medium">
          Our support team will respond to you as soon as possible.
        </p>
        <p class="text-slate-400 text-sm mt-2">
          Choose the option that best fits your needs
        </p>
      </div>

      <div v-if="loading" class="flex flex-col items-center justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mb-4"></div>
        <Loading/>
      </div>
      
      <div v-else-if="error" class="bg-red-500/10 border-l-4 border-red-500 p-4 rounded-xl backdrop-blur-sm">
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="text-red-300">{{ error }}</span>
        </div>
      </div>
      
      <div v-else class="flex flex-col space-y-4">
        <ServiceButton
          v-for="(btn, index) in buttons"
          :key="index"
          :title="btn.title"
          :url="btn.url"
          :jumpOut="jumpOut"
          class="transform transition-all duration-200 hover:scale-102 hover:shadow-2xl"
        />
      </div>

      <div v-if="!loading && !error" class="mt-8 text-center">
        <p class="text-sm text-slate-400">
          Need additional help? 
          <button class="text-emerald-400 hover:text-emerald-300 hover:underline font-medium ml-1 transition-colors">
            Contact us directly
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ServiceButton from '~/components/ServiceButton.vue';

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
    error.value = 'Impossible de charger les options de service client.'
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>