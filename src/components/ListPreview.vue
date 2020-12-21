<template>
  <v-card
    class="v-card--reveal transition-fast-in-fast-out v-card--reveal d-flex flex-column justify-space-between"
    :style="{ background: list.color }"
  >
    <v-card-text class="pb-0">
      <p v-if="nbItems === 0" class="font-italic">Cette note est vide...</p>
      <ul
        v-else
        class="v-card--reveal-content"
        :class="{ 'remove-padding': list.checkBoxMode }"
      >
        <Item
          v-for="item in todoItemsList"
          :key="item.id"
          :list="list"
          :item="item"
        />
        <v-divider
          v-if="completeItemsList.length > 0 && todoItemsList.length > 0"
          class="my-3"
        ></v-divider>
        <p
          v-if="completeItemsList.length > 0"
          :class="{ 'ml-n6': !list.checkBoxMode }"
        >
          {{
            completeItemsList.length > 1
              ? `${completeItemsList.length} éléments terminés`
              : `${completeItemsList.length} élément terminé`
          }}
        </p>
        <Item
          v-for="item in completeItemsList"
          :key="item.id"
          :list="list"
          :item="item"
        />
      </ul>
    </v-card-text>
    <CardFooter :list="list" :menu-translation="menuTranslation">
      <template #second-spacer> <v-spacer></v-spacer> </template>
      <template #close-button>
        <v-btn text @click.stop="$emit('close-preview')">
          {{ backBtnText }}
        </v-btn>
      </template>
    </CardFooter>
  </v-card>
</template>

<script>
import List from "../classes/List";
import ItemComponent from "../components/Item";
import CardFooter from "../components/CardFooter";

export default {
  components: {
    Item: ItemComponent,
    CardFooter,
  },
  props: {
    list: {
      type: List,
      required: true,
    },
    nbItems: {
      type: Number,
      required: true,
    },
    backBtnText: {
      type: String,
      required: true,
    },
    menuTranslation: {
      type: Object,
      required: true,
    },
  },
  computed: {
    completeItemsList() {
      return this.list.items.filter((item) => item.isComplete);
    },
    todoItemsList() {
      return this.list.items.filter((item) => !item.isComplete);
    },
  },
};
</script>

<style lang="scss" scoped>
.v-card--reveal {
  top: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
  height: 100%;
}
.v-card--reveal-content {
  height: 140px;
  overflow-y: auto;
  overflow-x: hidden;

  &.remove-padding {
    padding-left: 0;
  }
}
</style>
