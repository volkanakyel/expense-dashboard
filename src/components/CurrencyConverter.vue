<template>
  <div class="w-full max-w-xs mx-auto text-grey-700">
    <div class="flex items-center justify-between my-4 bg-white rounded-md">
      <div class="relative">
        <button
          @click="toggleFromDropdown"
          class="flex items-center focus:outline-none"
        >
          <span class="mr-2" v-if="selectedCurrency">
            {{ findCurrency(selectedCurrency).flag }}
          </span>
          <span>{{ selectedCurrency }}</span>
          <span class="ml-2">▼</span>
        </button>
        <ul
          v-show="dropdownFromOpen"
          class="absolute z-10 w-32 py-1 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-auto"
          @click="dropdownFromOpen = false"
        >
          <li
            v-for="currency in currenciesList"
            :key="currency.code"
            @click="selectFromCurrency(currency.code)"
            class="block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
          >
            {{ currency.flag }} {{ currency.code }}
          </li>
        </ul>
      </div>
      <input
        type="text"
        class="flex-1 px-2 py-1 ml-6 text-right border rounded-md focus:outline-none focus:border-blue-500"
        placeholder="00.00"
      />
    </div>
    <!-- Repeat the structure above for the 'Converted Amount' section -->
    <div
      class="flex items-center justify-between p-4 bg-white border border-gray-300 rounded-md mt-4"
    >
      <div class="relative">
        <button
          @click="toggleTargetDropdown"
          class="flex items-center focus:outline-none"
        >
          <span class="mr-2" v-if="targetCurrency">{{
            findCurrency(targetCurrency).flag
          }}</span>
          <span>{{ targetCurrency }}</span>
          <span class="ml-2">▼</span>
        </button>
        <ul
          v-show="dropdownTargetOpen"
          class="absolute z-10 w-32 py-1 mt-1 bg-white border border-gray-300 rounded-md shadow-lg"
          @click.away="dropdownOpen = false"
        >
          <li
            v-for="currency in currenciesList"
            :key="currency.code"
            @click="selectTargetCurrency(currency.code)"
            class="block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
          >
            {{ currency.flag }} {{ currency.code }}
          </li>
        </ul>
      </div>
      <input
        type="text"
        class="flex-1 px-2 py-1 ml-2 text-right border rounded-md focus:outline-none focus:border-blue-500"
        placeholder="1000.00"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
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
const selectedCurrency = ref("USD"); // Default currency
const targetCurrency = ref("EUR"); // Default currency
const dropdownTargetOpen = ref(false);
const dropdownFromOpen = ref(false);

const toggleFromDropdown = () => {
  dropdownFromOpen.value = !dropdownFromOpen.value;
};

const toggleTargetDropdown = () => {
  dropdownTargetOpen.value = !dropdownTargetOpen.value;
};

const selectFromCurrency = (code) => {
  selectedCurrency.value = code;
  dropdownFromOpen.value = false;
};

const selectTargetCurrency = (code) => {
  selectedCurrency.value = code;
  dropdownFromOpen.value = false;
};

const findCurrency = (code) => {
  return currenciesList.value.find((currency) => currency.code === code) || {};
};
</script>

<style scoped></style>
