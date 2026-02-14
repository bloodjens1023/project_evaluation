<template>
  <button
    v-bind="$attrs"
    @click="openLink"
    class="w-full bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 hover:from-emerald-500 hover:via-green-500 hover:to-teal-500 active:from-emerald-700 active:via-green-700 active:to-teal-700 text-white font-semibold py-4 px-6 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-emerald-500/40 transition-all duration-300 border border-emerald-400/30 hover:border-emerald-300/50 transform hover:scale-[1.02] hover:-translate-y-0.5"
  >
    {{ title }}
  </button>
</template>

<script setup lang="ts">
const { title, url, jumpOut } = defineProps<{
  title: string
  url: string
  jumpOut: number
}>()

function openLink() {
  if (jumpOut === 1) {
    window.open(url, '_blank')
  } else {
    window.location.href = url
  }
}
</script>
