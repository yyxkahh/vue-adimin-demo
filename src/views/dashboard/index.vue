<template>
  <div>
    <Header></Header>
    <Sale></Sale>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  components: {
    Header: () => import("./Header"),
    Sale: () => import("./Sale"),
  },
};
</script>

<style scoped>
</style>
