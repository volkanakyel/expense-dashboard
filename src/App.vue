<script setup>
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar.vue";
import IncomeCard from "@/components/IncomeCard.vue";
import ExpenseItem from "@/components/ExpenseItem.vue";
import CurrencyConverter from "@/components/CurrencyConverter.vue";
import { useGeolocation } from "./composables/useGeolocation";
import { ref, onMounted } from "vue";
const restaurants = ref([]);
const geoError = ref(null);
const currenciesList = ref([
  { code: "AUD", flag: "🇦🇺" }, // Australian Dollar
  { code: "BGN", flag: "🇧🇬" }, // Bulgarian Lev
  { code: "BRL", flag: "🇧🇷" }, // Brazilian Real
  { code: "CAD", flag: "🇨🇦" }, // Canadian Dollar
  { code: "CHF", flag: "🇨🇭" }, // Swiss Franc
  { code: "CNY", flag: "🇨🇳" }, // Chinese Yuan
  { code: "CZK", flag: "🇨🇿" }, // Czech Koruna
  { code: "DKK", flag: "🇩🇰" }, // Danish Krone
  { code: "EUR", flag: "🇪🇺" }, // Euro
  { code: "GBP", flag: "🇬🇧" }, // British Pound Sterling
  { code: "HKD", flag: "🇭🇰" }, // Hong Kong Dollar
  { code: "HRK", flag: "🇭🇷" }, // Croatian Kuna
  { code: "HUF", flag: "🇭🇺" }, // Hungarian Forint
  { code: "IDR", flag: "🇮🇩" }, // Indonesian Rupiah
  { code: "ILS", flag: "🇮🇱" }, // Israeli New Sheqel
  { code: "INR", flag: "🇮🇳" }, // Indian Rupee
  { code: "ISK", flag: "🇮🇸" }, // Icelandic Króna
  { code: "JPY", flag: "🇯🇵" }, // Japanese Yen
  { code: "KRW", flag: "🇰🇷" }, // South Korean Won
  { code: "MXN", flag: "🇲🇽" }, // Mexican Peso
  { code: "MYR", flag: "🇲🇾" }, // Malaysian Ringgit
  { code: "NOK", flag: "🇳🇴" }, // Norwegian Krone
  { code: "NZD", flag: "🇳🇿" }, // New Zealand Dollar
  { code: "PHP", flag: "🇵🇭" }, // Philippine Peso
  { code: "PLN", flag: "🇵🇱" }, // Polish Zloty
  { code: "RON", flag: "🇷🇴" }, // Romanian Leu
  { code: "RUB", flag: "🇷🇺" }, // Russian Ruble
  { code: "SEK", flag: "🇸🇪" }, // Swedish Krona
  { code: "SGD", flag: "🇸🇬" }, // Singapore Dollar
  { code: "THB", flag: "🇹🇭" }, // Thai Baht
  { code: "TRY", flag: "🇹🇷" }, // Turkish Lira
  { code: "USD", flag: "🇺🇸" }, // US Dollar
  { code: "ZAR", flag: "🇿🇦" }, // South African Rand
]);
const selectedCurrency = ref("AUD");
const findCurrency = (code) => {
  return currenciesList.value.find((currency) => currency.code === code) || {};
};
const showPaymentModal = ref(true);
const getCurrencyList = async () => {
  const apiKey = import.meta.env.VITE_CURRENCY_API;
  const url = `https://api.freecurrencyapi.com/v1/currencies?apikey=${apiKey}&currencies=`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error fetching currency List");
    }
    const data = await response.json();
    console.log(data.data);
    currenciesList.value = Object.keys(data.data).map(
      (currency) => currency.code
    );
    //Object.keys(data);
    // console.log(currenciesList.value);
  } catch (error) {
    console.error("Fetch error", error.message);
  }
};

onMounted(async () => {
  // const { coords, error } = await useGeolocation();
  // geoError.value = error;
  // if (coords.latitude !== null && coords.longitude !== null) {
  //   await fetchRestaurants(coords.latitude, coords.longitude);
  // }
  // await getCurrencyList();
});

async function fetchRestaurants(latitude, longitude) {
  const googleApiKey = import.meta.env.VITE_GOOGLE_PLACE_API;
  const url = `/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=restaurant&rankby=prominence&key=${googleApiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error fetching restaurants");
    }
    const data = await response.json();
    restaurants.value = data.results;
    restaurants.value = data.results.slice(0, 5);
    console.log(restaurants.value);
  } catch (error) {
    console.error("Fetch error:", error.message);
  }
}
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
                @click="showPaymentModal = true"
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
          <!-- start currency converter -->
          <div class="max-w-sm bg-white p-6 rounded-md mb-10">
            <h2 class="text-black font-bold text-xl mb-2">
              Currency converter
            </h2>
            <!-- <div class="w-full max-w-xs mx-auto">
              <div class="flex items-center">
                <span v-if="selectedCurrency">{{
                  findCurrency(selectedCurrency).flag
                }}</span>
                <select
                  v-model="selectedCurrency"
                  class="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option disabled value="">Select a currency</option>
                  <option
                    v-for="currency in currenciesList"
                    :key="currency.code"
                    :value="currency.code"
                  >
                    {{ currency.code }}
                  </option>
                </select>
              </div>
            </div> -->
            <CurrencyConverter />
          </div>
          <!-- end currency converter -->
          <div class="max-w-sm bg-white p-6 rounded-md mb-10">
            <h2 class="text-black font-bold text-xl mb-2">Restaurant Nearby</h2>
            <div
              class="flex justify-between items-center gap-6 mb-3 border-b-2 py-3"
              v-for="(restaurant, index) in restaurants"
              :key="index"
            >
              <div class="flex gap-6">
                <img
                  class="border border-gray-400 p-3 rounded-md"
                  src="./assets/icons/icon-restaurant.png"
                  alt=""
                />
                <div>
                  <p class="text-black">{{ restaurant.name }}</p>
                  <p v-if="restaurant.opening_hours" class="text-green">Open</p>
                  <p v-else class="text-red">Closed</p>
                </div>
              </div>
              <p class="text-green">Rating : {{ restaurant.rating }}</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
