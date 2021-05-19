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
    <div
      class="w-full bg-white flex border-b border-gray-300 py-8"
      v-for="(item, index) in $store.state.detailSurah.verses"
      :key="index"
    >
      <div class="w-10 py-2 flex mr-3">
        <div class="w-auto mr-5 py-12 flex flex-col">
          <div class="bg-gray-200 p-1 rounded-md mt-2">
            {{ $store.state.detailSurah.number }}:{{ item.number.inSurah }}
          </div>
          <div class="mt-2" @click="playAudio(item.audio.primary)">
            <icon-pause></icon-pause>
          </div>
          <div class="mt-2"><icon-selection></icon-selection></div>
        </div>
      </div>
      <div class="w-full py-3 flex flex-col">
        <div class="flex justify-end">
          <span class="text-5xl font-arabic">
            {{ item.text.arab }}
          </span>
        </div>
        <div class="w-full flex flex-col">
          <span class="mt-8">
            {{ item.translation.id }}
            <br />
            ({{ $store.state.detailSurah.name.transliteration.id }}:
            {{ item.number.inSurah }})
          </span>
          <span class="mt-2">
            {{ item.translation.en }}
            <br />
            ({{ $store.state.detailSurah.name.transliteration.en }}:
            {{ item.number.inSurah }})
          </span>
        </div>
      </div>
    </div>
  </div>

  <play-audio :apiaudio="audio" :play="play"></play-audio>
</template>

<script>
import URL from "@/api/Url.js";
// import { mapState } from "vuex";
import navbar from "@/components/element/navbar";
import Audio from "@/components/element/audio";
import iconPause from "@/components/icons/pause";
import iconSelection from "@/components/icons/selection";
export default {
  components: {
    "nav-bar": navbar,
    "play-audio": Audio,
    "icon-pause": iconPause,
    "icon-selection": iconSelection,
  },
  mounted() {
    this.$store.dispatch("detailSurah", `${URL}surah/${this.$route.params.id}`);
  },
  data() {
    return {
      audio: "",
      play: false,
    };
  },
  methods: {
    playAudio(apiAudio) {
      this.audio = apiAudio;
      this.play = true;
    },
  },
};
</script>

<style>
</style>