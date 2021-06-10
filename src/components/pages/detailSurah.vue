<template>
  <nav-bar></nav-bar>
  <div class="w-full bg-gray-100 p-3 flex justify-between lg:px-36">
    <div>
      <input
        type="text"
        class="rounded-3xl focus:outline-none p-2 w-72"
        placeholder="cari surah"
        v-model="search"
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
  <div :class="[listSurah.length > 0 ? 'visible' : ' invisible']">
    <div
      class="
        bg-white
        text-green-500
        w-72
        shadow-lg
        absolute
        left-36
        rounded-lg
        p-2
        overflow-y-auto
        h-56
      "
    >

        <div class="h-16 flex cursor-pointer" 
          v-for="(item, index) in listSurah"
        :key="index" 
      @click="swicthPage(item.number)"
        >
          <div class="w-1/2 flex items-center">
            <div class="">
              <span>{{ item.number }}</span>
            </div>
            <div class="ml-3">
              <div class="font-bold">  
       
      {{ item.name.transliteration.id }}</div>
              <div>{{ item.name.short }}</div>
            </div>
          </div>
          <div class="w-1/2 text-right text-gray-700 px-3 items-center">
            {{ item.name.translation.id }}
          </div>
        </div>
    </div>
  </div>

  <div class="px-10 sm:px-16 md:px-10 lg:px-36" id="content">
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

          <div v-if="play">
            <div v-if="audio[1] === index">
              <div class="mt-2">
                <icon-play></icon-play>
              </div>
            </div>
            <div
              v-else
              class="mt-2 audio"
              id="audio"
              ref="iconAudio"
              @click="Play(item.audio.primary, index)"
            >
              <icon-pause></icon-pause>
            </div>
          </div>
          <div
            v-else
            class="mt-2 audio"
            id="audio"
            ref="iconAudio"
            :class="[play === false ? 'show' : 'hidden']"
            @click="Play(item.audio.primary, index)"
          >
            <icon-pause></icon-pause>
          </div>
          <div class="mt-2"><icon-selection></icon-selection></div>
        </div>
      </div>
      <div class="w-full py-3 flex flex-col">
        <div class="flex justify-end">
          <span class="text-5xl font-arabic text-right">
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

  <div
    class="
      w-full
      bg-gray-100
      p-3
      flex
      justify-between
      lg:px-36
      fixed
      bottom-0
      z-0
      py-4
    "
  >
    <div class="flex items-center">
      <div v-if="play"><icon-play></icon-play></div>

      <icon-pause :class="[play === false ? 'show' : 'hidden']"></icon-pause>
      <div class="relative w-96">
        <div class="h-3 rounded-2xl bg-gray-300 w-full"></div>
        <div
          class="h-3 rounded-2xl bg-green-500 progress absolute top-0"
          ref="progress"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import URL from "@/api/Url.js";
// import { mapState } from "vuex";
import navbar from "@/components/element/navbar";
import iconPause from "@/components/icons/pause";
import iconPlay from "@/components/icons/play";
import iconSelection from "@/components/icons/selection";

export default {
  components: {
    "nav-bar": navbar,
    "icon-pause": iconPause,
    "icon-play": iconPlay,
    "icon-selection": iconSelection,
  },
  mounted() {
    this.$store.dispatch("detailSurah", `${URL}surah/${this.$route.params.id}`);
    this.$store.dispatch("fetchGet", `${URL}surah`);
  },
  data() {
    return {
      audio: [],
      play: false,
      search: "",
      listSurah: [],
    };
  },
  watch: {
    search() {
      this.result();
    },
  },
  methods: {
    result() {
      const dataSurah = this.$store.state.listSurah;
      if (this.search === "") {
        return (this.listSurah = []);
      }
      let data = [];
      for (let i = 0; i < dataSurah.length; i++) {
        const namaSurah = dataSurah[i].name.transliteration.id.toLowerCase();
        if (namaSurah.includes(this.search.toLowerCase())) {
          data.push(dataSurah[i]);
        }
      }
      if (data.length !== 0) {
        return (this.listSurah = data);
      }
      return (this.listSurah = []);
    },
    progress(e) {
      const { duration, currentTime } = e.srcElement;
      const progress = (currentTime / duration) * 100;
      const styleProgress = this.$refs.progress;
      styleProgress.style.width = `${progress}%`;
      if (progress === 100) {
        this.play = false;
        styleProgress.style.width = "0%";
      }
    },
    Play(audioApi, index) {
      this.audio = [audioApi, index];
      let audio = this.audio[0];
      this.play = true;
      if (audio) {
        const playAudio = new Audio(audio);
        playAudio.play();
        playAudio.addEventListener("timeupdate", this.progress);
      }
      this.$refs.iconAudio.classList.add("hidden");
    },
    swicthPage(id){
      this.$router.push({name:'detailSurah',params:{id:id}})
    this.$store.dispatch("detailSurah", `${URL}surah/${id}`);
    return   this.$store.state.listSurah=[]

     
    }
  },
};
</script>

<style scope>
.progress {
  width: 0%;
}
.hidden {
  display: none;
}
.show {
  display: inline;
}
</style>