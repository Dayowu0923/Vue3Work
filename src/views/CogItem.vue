<template>
  <div class="">
    <div class="wrapper">
      <CogItemTable />
      <CogIemBox />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CogItemTable from "@/components/cogitem/CogItemTable.vue";
import CogIemBox from "@/components/cogitem/CogItemBox.vue";
export default {
  name: "Cog1Page",
  components: {
    CogItemTable,
    CogIemBox,
  },
};
</script>
