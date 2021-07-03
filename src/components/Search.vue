<template>
  <div class="input-group w-50 m-auto">
    <input
      type="text"
      required
      class="form-control"
      placeholder="owner/repositoryName"
      aria-label="Input group example"
      aria-describedby="basic-addon1"
      v-model="inpVal"
      @keypress.enter="search"
    />
    <button type="button" class="btn btn-primary" @click="search">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-search"
        viewBox="0 0 16 16"
      >
        <path
          d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
        ></path>
      </svg>
      Поиск
    </button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import { ForkTypes } from "ObjTypes/ObjTypes";

export default Vue.extend({
  props: {
    inpVal: String,
    url: {
      type: String,
      default: "https://api.github.com/repos/",
    },
  },
  methods: {
    async search() {
      const info: ForkTypes[] = [];
      try {
        const forks = (await axios.get(`${this.url}${this.inpVal}/forks`)).data;

        forks.forEach((fork: any): void => {
          info.push({
            full_name: fork.full_name,
            owner: fork.owner.login,
            star_count: fork.stargazers_count,
            url: fork.html_url,
          });
        });
        console.log(info);
      } catch (e) {
        alert(e);
      }
      this.$emit("show-forks", info);
    },
  },
});
</script>

<!--<script>-->
<!--import Vue from "vue";-->

<!--const Search = Vue.extend({-->
<!--  data() {-->
<!--    return {-->
<!--      inpVal,-->
<!--    };-->
<!--  },-->
<!--  methods: {-->
<!--    // необходима аннотация из-за `this` в возвращаемом типе-->
<!--    greet(): string {-->
<!--      return this.msg + ", мир";-->
<!--    },-->
<!--  },-->
<!--  computed: {-->
<!--    // необходима аннотация-->
<!--    greeting(): string {-->
<!--      return this.greet() + "!";-->
<!--    },-->
<!--  },-->
<!--});-->
<!--</script>-->

<!--<script>-->
<!--export default {-->
<!--  name: "Search",-->
<!--  data(){-->

<!--  },-->
<!--  methods: {-->
<!--    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types-->
<!--    search(inpVal) {-->
<!--      console.log(inpVal);-->
<!--    },-->
<!--  },-->
<!--};-->
<!--</script>-->
<!--<script>-->
<!--import { Component, Prop, Vue } from "vue-property-decorator";-->
<!--@Component-->
<!--export default class Search extends Vue {-->
<!--  // @Prop()  inpVal!: string;-->
<!--  str = "jggh";-->
<!--}-->
<!--</script>-->
