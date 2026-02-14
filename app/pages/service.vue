<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900"
  >
    <div
      class="bg-gradient-to-b from-[#162d77] to-[#1f4789] backdrop-blur-sm text-white shadow-xl border-b border-blue-800/30 bg-cover test"
      style="
        background-image: url(&quot;https://downpg117.uqianbao.com/source/public/static/webp/OMR6_kmW.webp&quot;);
      "
    >
      <div
        class="bg-contain h-[68px] w-[95px] absolute z-[0] bottom-[-30px] right-[0px]"
        style="
          background-image: url(&quot;https://downpg117.uqianbao.com/source/public/static/webp/DnbsAF0P.webp&quot;);
        "
      ></div>
      <div class="px-4 py-4 flex items-center max-w-3xl mx-auto w-full">
        <button
          @click="goBack"
          class="mr-4 p-2 bg-blue-800/50 rounded-xl transition-all duration-200 w-30"
          aria-label="Back"
        >
          <img
            src="https://downpg117.uqianbao.com/source/public/static/svg/Cz-n34NG.svg"
            alt=""
            srcset=""
          />
        </button>

        <div class="flex-1 flex items-center justify-center gap-2">
          <img
            src="https://downpg117.uqianbao.com/source/public/static/svg/DrVQ8Lpq.svg"
            alt="Customer Service Icon"
            loading="eager"
            fetchpriority="high"
            decoding="async"
            class="w-8 h-8"
          />
          <h1 class="text-xl font-bold">Customer Service</h1>
        </div>

        <div class="w-10"></div>
      </div>
    </div>

    <div class="max-w-2xl mx-auto px-4 py-8">
      <div v-if="!loading"
        class="bg-gradient-to-br from-slate-800/50 to-blue-900/30 backdrop-blur-md rounded-2xl shadow-2xl p-6 mb-8 text-center border border-blue-800/20"
      >
        <p class="text-white text-sm mt-2">
          After receiving your comments, our customer support team will respond as quickly as possible during business hours. Please be patient, thank you!
        </p>
      </div>

      <div
        v-if="loading"
        class="flex flex-col items-center justify-center py-12"
      >
        <Loading />
      </div>

      <div
        v-else-if="error"
        class="bg-red-500/10 border-l-4 border-red-500 p-4 rounded-xl backdrop-blur-sm"
      >
        <div class="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-red-400 mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
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
          <button
            class="text-emerald-400 hover:text-emerald-300 hover:underline font-medium ml-1 transition-colors"
          >
            Contact us directly
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import ServiceButton from "~/components/ServiceButton.vue";

const buttons = ref<{ title: string; url: string }[]>([]);
const jumpOut = ref(0);
const loading = ref(true);
const error = ref("");

function goBack() {
  window.history.back();
}

interface ServiceConfig {
  jumpOut: number;
  customerButtons: { title: string; url: string }[];
}

onMounted(async () => {
  try {
    const result = await $fetch<ServiceConfig>("/api/service");
    buttons.value = result.customerButtons;
    jumpOut.value = result.jumpOut;
  } catch (e) {
    error.value = "Impossible de charger les options de service client.";
    console.error(e);
  } finally {
    loading.value = false;
  }
});
</script>
