<template>
  <div class="my-3">
    <h5 class="fw-bold">Результаты</h5>
    <Search
      @show-forks="showForks"
      :page="page"
      @set-page="
        (newPage) => {
          this.page = newPage;
        }
      "
    ></Search>
    <table class="container table mt-4 table-light table-sm">
      <thead>
        <tr>
          <td>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-person-circle"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
              <path
                fill-rule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
              ></path>
            </svg>
            Владелец
          </td>
          <td>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-folder2-open"
              viewBox="0 0 16 16"
            >
              <path
                d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v.64c.57.265.94.876.856 1.546l-.64 5.124A2.5 2.5 0 0 1 12.733 15H3.266a2.5 2.5 0 0 1-2.481-2.19l-.64-5.124A1.5 1.5 0 0 1 1 6.14V3.5zM2 6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5a.5.5 0 0 0-.5.5V6zm-.367 1a.5.5 0 0 0-.496.562l.64 5.124A1.5 1.5 0 0 0 3.266 14h9.468a1.5 1.5 0 0 0 1.489-1.314l.64-5.124A.5.5 0 0 0 14.367 7H1.633z"
              ></path>
            </svg>
            Репрозиторий
          </td>
          <td>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-link"
              viewBox="0 0 16 16"
            >
              <path
                d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z"
              ></path>
              <path
                d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z"
              ></path>
            </svg>
            Ссылка
          </td>
          <td>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-star"
              viewBox="0 0 16 16"
            >
              <path
                d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"
              ></path>
            </svg>
            Количество звезд
          </td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="fork in forks" v-bind:key="fork.full_name">
          <td class="text-start">{{ fork.owner }}</td>
          <td class="text-start">{{ fork.full_name }}</td>
          <td class="text-start">
            <a :href="fork.url" target="_blank" class="link-primary">{{
              fork.url
            }}</a>
          </td>
          <td>{{ fork.star_count }}</td>
        </tr>
      </tbody>
    </table>
    <div class="container d-flex">
      <button
        :disabled="isPrevButtonDisabled"
        class="btn btn-primary"
        @click="prevPage"
      >
        &laquo;Previous
      </button>
      <button class="btn btn-primary" @click="nextPage">Next&raquo;</button>
    </div>
  </div>
</template>

<script lang="ts">
import Search from "@/components/Search.vue";
import Vue from "vue";
import { ForkTypes, ResultTypes } from "ObjTypes/ObjTypes";

export default Vue.extend({
  components: { Search },
  props: {},
  data(): ResultTypes {
    return {
      forks: [],
      page: 1,
    };
  },
  methods: {
    showForks(info: ForkTypes[]): void {
      this.forks = info;
    },
    nextPage(): void {
      this.page++;
    },
    prevPage(): void {
      this.page--;
    },
  },
  computed: {
    isPrevButtonDisabled() {
      if (this.$route.query.page === undefined) return true;
      else if (this.page == 1) return true;
      return false;
    },
  },
});
</script>
