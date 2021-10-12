<template>
  <select v-model="selected" @change="$emit('selectedSort', selected)">
    <option v-for="(option, id) in options" :key="id">
      {{ option }}
    </option>
  </select>
</template>

<script>
export default {
  name: "selectedFilter",
  emits: ["selectedSort"],
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selected: "По умалчанию",
    };
  },
};
</script>

<style lang="scss" scoped>
select {
  font-size: 12px;
  color: #b4b4b4;
  text-align: center;
  height: 36px;
  border: none;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  option {
    border: none;
  }
}
</style>
