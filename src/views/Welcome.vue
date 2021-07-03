<template>
  <div class="home my-3">
    <h4 class="fw-bold mb-4">
      Это приложение, которое в табличном виде отображает forks введенного в
      поисковую строку репозитория
    </h4>
    <Search></Search>
  </div>
</template>

<script lang="ts">
import Search from "@/components/Search.vue";

export default {
  components: { Search },
};
</script>
