<template>
  <button
    v-bind="$attrs"
    @click="openLink"
    class="w-full bg-blue-500 text-white py-2 px-4 rounded mb-2 hover:bg-blue-600 active:bg-blue-700"
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
