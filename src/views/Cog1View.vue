<template>
  <div class="about">
    <div class="wrapper">
      <Cog1Table />
      <Cog1Box />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Cog1Table from "@/components/cog1/Cog1Table.vue";
import Cog1Box from "@/components/cog1/Cog1Box.vue";
export default {
  name: "Cog1Page",
  components: {
    Cog1Table,
    Cog1Box,
  },
};
</script>
