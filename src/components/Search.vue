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
      @keypress.enter="btnClick"
    />
    <button type="button" class="btn btn-primary" @click="btnClick">
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
    url: {
      type: String,
      default: "https://api.github.com/repos/",
    },
    size: {
      type: Number,
      default: 10,
    },
    page: {
      type: Number,
      default: 1,
    },
    isFake: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      inpVal: "",
    };
  },
  mounted() {
    this.inpVal = this.$route.query.repository as string;
    if (this.inpVal && this.$route.query.page) {
      this.$emit("set-page", Number.parseInt(this.$route.query.page as string));
      this.search();
    }
  },
  methods: {
    btnClick(): void {
      if (
        Number.parseInt(this.$route.query.page as string) == 1 ||
        this.$route.query.page === undefined
      ) {
        this.search();
      } else {
        this.$emit("set-page", 1);
      }
    },
    updateRoute(): void {
      this.$router
        .push({
          name: "Results",
          query: { repository: this.inpVal, page: this.page.toString() },
        })
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        .catch(() => {});
    },
    async search() {
      this.updateRoute();
      if (this.isFake) return;
      const info: ForkTypes[] = [];
      try {
        const forks = (
          await axios.get(
            `${this.url}${this.inpVal}/forks?per_page=${this.size}&page=${this.page}`
          )
        ).data;
        forks.forEach((fork: any): void => {
          info.push({
            owner: fork.owner.login,
            full_name: fork.full_name,
            url: fork.html_url,
            star_count: fork.stargazers_count,
          });
        });
        this.$emit("show-forks", info);
      } catch (e) {
        alert("Неправильно введенные данные");
      }
    },
  },
  watch: {
    page() {
      this.search();
    },
    $route() {
      if (this.$route.query.repository && this.$route.query.page) {
        this.inpVal = this.$route.query.repository as string;
        this.$emit(
          "set-page",
          Number.parseInt(this.$route.query.page as string)
        );
      }
    },
  },
});
</script>
