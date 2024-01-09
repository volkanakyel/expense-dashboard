<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar.vue";
import IncomeCard from "@/components/IncomeCard.vue";
import ExpenseItem from "@/components/ExpenseItem.vue";
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
            class="text-grey-700 max-w-sm border-gray-500 bg-white p-6 rounded-md mb-4"
          >
            <div class="flex justify-between mb-4">
              <h2>
                <span class="text-black font-bold text-xl">Transactions</span> |
                Upcoming bills
              </h2>
              <p class="underline">View all</p>
            </div>

            <ExpenseItem />
            <ExpenseItem />
            <ExpenseItem />
            <ExpenseItem />
          </div>
          <!-- end income card  -->
          <!-- start weather widget -->
          <div
            class="text-grey-700 max-w-sm border-gray-500 bg-white p-6 rounded-md mb-10"
          >
            <h2 class="text-black font-bold text-xl mb-2">Weather forecast</h2>
            <div class="bg-pinky rounded-6 text-white max-w-xs p-4 rounded-lg">
              <div class="flex justify-between items-center">
                <div>
                  <p class="text-xl">24</p>
                  <p class="text-lg">California</p>
                </div>
                <img src="./assets/icons/cloudly.svg" alt="" />
              </div>
            </div>
          </div>
          <!-- end weather widget -->
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
