<template>
  <div class="container">
    <div class="head__content">
      <h1>Добавление товара</h1>
      <select-filter :options="options" @selectedSort="selectedSort" />
    </div>
    <div class="main__content">
      <form>
        <label for="">Наименование товара<span></span></label>
        <input
          type="text"
          placeholder="Введите наименование товара"
          v-model="products.name"
          :class="{ activeInput: errorMsg.name }"
        />
        <span class="errorMsg" v-if="errorMsg.name"
          >Поле является обязательным</span
        >
        <label for="">Описание товара</label>
        <textarea
          placeholder="Введите описание товара"
          v-model="products.description"
        ></textarea>
        <label for="">Ссылка на изображение товара<span /></label>
        <input
          type="text"
          placeholder="Введите ссылку"
          v-model="products.image"
          :class="{ activeInput: errorMsg.image }"
        />
        <span class="errorMsg" v-if="errorMsg.image"
          >Поле является обязательным</span
        >

        <label for="">Цена товара<span /></label>
        <input
          type="text"
          placeholder="Введите цену"
          v-model="products.price"
          :class="{ activeInput: errorMsg.price }"
        />
        <span class="errorMsg" v-if="errorMsg.price"
          >Поле является обязательным</span
        >

        <button
          type="button"
          :disabled="!activedButton"
          :class="{ activeBtn: activedButton }"
          @click="addProduct()"
        >
          Добавить товар
        </button>
      </form>
      <div class="product__list">
        <product-card :cards="sortedProducts" @remove="removeCard">
        </product-card>
      </div>
    </div>
  </div>
</template>

<script>
import productCard from "@/components/productCard";
import selectFilter from "@/components/UI/selectFilter";

import { sortCards } from "@/service/sortProducts";

export default {
  name: "App",
  components: {
    productCard,
    selectFilter,
  },
  data() {
    return {
      options: ["По умалчанию", "По цене max", "По цене min", "По наименованию"],
      products: { name: "", description: "", image: "", price: "" },
      cards: [],
      errorMsg: { name: false, image: false, price: false },
      selectSort: "",
      isValid: false,
    };
  },
  created() {
    const data = localStorage.getItem("cardItem");
    if (data) {
      this.cards = JSON.parse(data);
    }
  },

  computed: {
    activedButton() {
      if (this.products.name && this.products.image && this.products.price) {
        return true;
      } else return false;
    },
    sortedProducts() {
      return sortCards(this.cards, this.selectSort);
    },
  },
  methods: {
    addProduct() {
      const cardItem = {
        name: this.products.name,
        description: this.products.description,
        image: this.products.image,
        price: this.products.price,
      };
      this.cards.unshift(cardItem);
      this.products.name = "";
      this.products.description = "";
      this.products.image = "";
      this.products.price = "";
      this.isValid = true;
      localStorage.setItem("cardItem", JSON.stringify(this.cards));
    },
    removeCard(key) {
      this.cards = this.cards.filter((item) => item !== key);
    },
    selectedSort(selected) {
      this.selectSort = selected;
    },
  },
  watch: {
    cards() {
      localStorage.setItem("cardItem", JSON.stringify(this.cards));
    },
    "products.name"(newValue, oldValue) {
      if (!newValue && oldValue && !this.isValid) this.errorMsg.name = true;
      else this.errorMsg.name = false;
    },
    "products.image"(newValue, oldValue) {
      if (!newValue && oldValue && !this.isValid) this.errorMsg.image = true;
      else this.errorMsg.image = false;
    },
    "products.price"(newValue, oldValue) {
      if (!newValue && oldValue && !this.isValid) this.errorMsg.price = true;
      else this.errorMsg.price = false;
      this.isValid = false;
      let count = 0;
      let mask = "";
      for (let i = this.products.price.length - 1; i >= 0; i--) {
        if (this.products.price[i] != " ") {
          if (count == 3) {
            count = 0;
            mask += "  ";
          }
          count++;
          mask += this.products.price[i];
        }
      }
      this.products.price = mask
        .split("")
        .reverse()
        .join("");
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600&display=swap");
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Source Sans Pro", sans-serif;
}
.container {
  max-width: 1376px;
  margin: 0 auto;
  width: 100%;
}

.head__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0px;

  h1 {
    font-size: 28px;
    font-weight: 600;
    line-height: 35px;
    color: #3f3f3f;
  }
}
.main__content {
  display: flex;
  form {
    display: flex;
    flex-direction: column;
    padding: 24px;
    max-width: 332px;
    width: 100%;
    box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04),
      0px 6px 10px rgba(0, 0, 0, 0.02);
    border-radius: 4px;
    max-height: 440px;
    input,
    textarea {
      height: 36px;
      border: none;
      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
      margin-bottom: 16px;
      font-size: 12px;
      padding: 16px;
      color: #b4b4b4;
      border-radius: 4px;
      outline-color: #000;
    }
    textarea {
      height: 108px;
      resize: none;
    }
    .errorMsg {
      font-size: 8px;
      color: #ff8484;
      position: relative;
      top: -12px;
    }
    label {
      margin-bottom: 4px;
      font-size: 10px;
      color: #49485e;
      position: relative;
      span {
        position: absolute;
        top: 0;
        width: 4px;
        height: 4px;
        border-radius: 4px;
        background: #ff8484;
      }
    }
    button {
      height: 36px;
      border-radius: 10px;
      border: none;
      font-weight: 600;
      font-size: 12px;
      line-height: 15px;
    }
    .activeBtn {
      background-color: #7bae73;
      color: #fff;
    }
    .activeInput {
      border: 1px solid #ff8484;
      outline-color: #ff8484;
    }
  }
  .product__list {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
