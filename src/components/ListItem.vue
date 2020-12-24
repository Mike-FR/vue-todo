<template>
  <v-hover v-slot="{ hover }">
    <div>
      <li
        v-if="!list.checkBoxMode"
        contenteditable="true"
        @blur="editItem($event)"
        :class="{ 'on-hover': hover, 'is-complete': item.isComplete }"
      >
        {{ item.body }}

        <v-icon
          small
          class="delete-btn float-right"
          :class="{ 'on-hover': hover }"
          @click.stop="deleteItem"
          >mdi-close</v-icon
        >
      </li>
      <v-checkbox
        v-else
        v-model="item.isComplete"
        :label="item.body"
        :value="item.isComplete"
        :class="{
          'on-hover': hover,
        }"
        hide-details
        @click="checkItem"
      >
        <template #append>
          <v-icon
            small
            class="delete-btn float-right"
            :class="{ 'on-hover': hover }"
            @click.stop="deleteItem"
            >mdi-close</v-icon
          >
        </template>
      </v-checkbox>
    </div>
  </v-hover>
</template>

<script>
import Item from "../classes/Item";
import List from "../classes/List";

export default {
  props: {
    list: {
      type: List,
      required: true,
    },
    item: {
      type: Item,
      required: true,
    },
  },
  methods: {
    editItem(event) {
      Item.update({
        where: this.item.id,
        data: { body: event.target.innerText },
      });
    },
    checkItem() {
      Item.update({
        where: this.item.id,
        data: { isComplete: this.item.isComplete },
      });
    },
    deleteItem() {
      Item.delete(this.item.id);
    },
  },
};
</script>

<style lang="scss" scoped>
li.on-hover,
.v-input.on-hover {
  -moz-box-shadow: inset 0 0 100px 100px rgba(0, 0, 0, 0.05);
  -webkit-box-shadow: inset 0 0 100px 100px rgba(0, 0, 0, 0.05);
  box-shadow: inset 0 0 100px 100px rgba(0, 0, 0, 0.05);
}

li.is-complete {
  text-decoration: line-through;
}

li[contentEditable="true"]:focus {
  outline: none;
}

.delete-btn {
  opacity: 0;
}
.delete-btn.on-hover {
  opacity: 1;
  line-height: 1.4;
}
</style>
