<template>
  <nav-bar></nav-bar>
  <div class="w-full bg-gray-100 p-3 flex justify-between lg:px-36">
    <div>
      <input
        type="text"
        class="rounded-3xl focus:outline-none p-2"
        placeholder="cari ayat"
      />
    </div>
    <div class="flex ml-3">
      <div class="bg-green-100 px-2 rounded-lg mx-1 flex">
        <span class="text-base text-green-600 mt-2">Terjemahan</span>
      </div>
      <div class="bg-green-100 px-2 rounded-lg mx-1 flex">
        <span class="text-base text-green-600 mt-2">Info Surah</span>
      </div>
    </div>
  </div>
  <div class="lg:px-36">
    <div class="w-full bg-white flex border-b border-gray-300 py-8">
      <div class="w-10 py-2 flex mr-3">
        <div class="w-auto mr-5 py-3 flex flex-col justify-end">
          <div class="bg-gray-200 p-1 rounded-md">1:1</div>
          <div class="">play</div>
          <div class="">:</div>
        </div>
      </div>
      <div class="w-full py-3 flex flex-col">
        <div class="flex justify-end">
          <span class="text-3xl">
            بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
          </span>
        </div>
        <div class="w-full flex flex-col">
          <span class="mt-2">
            dengan menyebut nama allah yang maha pengasih lagi maha penyayang
            <br />(al fatihah:1)
          </span>
          <span class="mt-2">
            dengan menyebut nama allah yang maha pengasih lagi maha penyayang
            <br />
            (al fatihah:1)
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import URL from "@/api/Url.js";
// import { mapState } from "vuex";
import navbar from "@/components/element/navbar";
export default {
  components: {
    "nav-bar": navbar,
  },
  mounted() {
    this.$store.dispatch("detailSurah", `${URL}surah/${this.$route.params.id}`);
    console.log(this.$store.state);
  },
  computed: {
    // you have access to `problems` in the template. Use `v-if` before you `v-for` over the array of problems.
    count() {
      return this.$store.state.nama;
    },
  },
};
</script>

<style>
</style>