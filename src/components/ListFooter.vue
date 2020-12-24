<template>
  <v-card-actions>
    <slot name="preview-button"></slot>

    <v-menu>
      <template #activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-palette-outline</v-icon>
        </v-btn>
      </template>
      <v-color-picker
        disabled
        hide-canvas
        hide-inputs
        hide-mode-switch
        mode="hexa"
        show-swatches
        swatches-max-height="120"
        :value="list.color"
        @input="pickColor"
      ></v-color-picker>
    </v-menu>

    <slot name="first-spacer"> </slot>

    <v-menu>
      <template #activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on.stop="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-if="list.checkBoxMode"
          @click="switchCheckboxMode(false)"
        >
          {{ menuTranslation.bulletMode }}
        </v-list-item>
        <v-list-item v-else @click="switchCheckboxMode(true)">
          {{ menuTranslation.checkboxMode }}
        </v-list-item>
        <v-list-item @click="deleteAllItems(list)">
          {{ menuTranslation.deleteAllItems }}
        </v-list-item>
        <v-list-item @click="deleteList(list)">{{
          menuTranslation.deleteList
        }}</v-list-item>
      </v-list>
    </v-menu>
    <slot name="second-spacer"> </slot>
    <slot name="close-button"> </slot>
  </v-card-actions>
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
    menuTranslation: {
      type: Object,
      required: true,
    },
  },
  computed: {
    itemsId() {
      return Item.query()
        .with("list")
        .where("list_id", this.list.id)
        .get()
        .map((item) => item.id);
    },
  },
  methods: {
    switchCheckboxMode(value) {
      List.update({ where: this.list.id, data: { checkBoxMode: value } });
    },
    pickColor(color) {
      List.update({
        where: this.list.id,
        data: { color },
      });
    },
    deleteList(list) {
      List.delete(list.id);
    },
    deleteAllItems() {
      this.itemsId.forEach((id) => Item.delete(id));
    },
  },
};
</script>

<style lang="scss" scoped></style>
