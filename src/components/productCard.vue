<template>
  <div class="product__item" v-for="(card, id) in cards" :key="id">
    <img class="product__img" :src="card.image" alt="" />
    <h2>{{ card.name }}</h2>
    <p>{{ card.description }}</p>
    <span class="price">{{ card.price }} руб.</span>
    <button id="del_btn" @click="$emit('remove', card)">
      <img src="../assets/images/delete.png" alt="" />
    </button>
  </div>
</template>

<script>
export default {
  name: "product-card",
  emits: ["remove"],
  props: {
    cards: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.product__item {
  width: 332px;
  height: 423px;
  box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04),
    0px 6px 10px rgba(0, 0, 0, 0.02);
  border-radius: 4px;
  margin: 0px 0px 16px 16px;
  position: relative;
  cursor: pointer;
  h2 {
    margin: 16px 0;
    padding: 0 16px;
  }
  p {
    font-size: 16px;
    line-height: 20px;
    font-weight: 400;
    padding: 0 16px;
  }
  .product__img {
    width: 332px;
    height: 200px;
  }
  .price {
    display: block;
    margin: 32px 0px 24px 0px;
    padding: 0 16px;
  }
  #del_btn {
    display: none;
    align-items: center;
    justify-content: center;
    background-color: #ff8484;
    width: 32px;
    height: 32px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    position: absolute;
    top: -5px;
    right: -5px;
    border: none;
  }
  &:hover #del_btn {
    display: flex;
  }
}
</style>
