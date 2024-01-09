<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar.vue";
import IncomeCard from "@/components/IncomeCard.vue";
</script>

<template>
  <div>
    <div class="bg-gray-100 font-sans leading-normal tracking-normal">
      <Sidebar />
      <div class="pl-64 flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main class="px-6 mt-8">
          <div class="flex justify-between items-center">
            <div class="text-grey-700">
              <h2 class="text-black text-2xl font-bold">Hello, Hanna!</h2>
              <p class="mt-1">Send and receive funds with pleasure.</p>
            </div>
            <div class="flex justify-center items-center gap-3">
              <button
                class="bg-black text-white flex items-center gap-2 px-3 py-2 rounded-md"
              >
                Add Payment
                <img src="./assets/icons/plus-icon.svg" alt="" />
              </button>
              <img src="./assets/icons/more-icon.svg" alt="" />
            </div>
          </div>
          <!-- start income card  -->
          <div class="my-7 flex gap-4 items-center">
            <IncomeCard v-for="index in 3" :key="index" />
          </div>
          <div
            class="text-grey-700 max-w-sm border-gray-500 bg-white p-6 rounded-md"
          >
            <div class="flex justify-between mb-4">
              <h2>
                <span class="text-black font-bold text-xl">Transactions</span> |
                Upcoming bills
              </h2>
              <p class="underline">View all</p>
            </div>

            <div class="flex justify-between items-center gap-6">
              <div class="flex gap-6">
                <img
                  class="border border-gray-400 p-3 rounded-md"
                  src="./assets/icons/netflix.png"
                  alt=""
                />
                <div>
                  <p>Netflix</p>
                  <p>Apr 05 2023 at 21:46</p>
                </div>
              </div>
              <p class="text-red">-$15.49</p>
            </div>
          </div>
          <!-- end income card  -->
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
