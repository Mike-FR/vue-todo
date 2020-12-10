<template>
  <v-card
    width="252"
    height="200"
    :ripple="false"
    class="v-card--list ma-4 d-flex flex-column justify-space-between"
    :style="{ background: filledList.color }"
    @click.stop="openNote"
  >
    <v-card-text>
      <p class="display-1 text--primary text-capitalize">
        {{ list.title }}
      </p>
      <v-chip v-if="nbOfItems != 0" small
        >{{ nbOfItems }} {{ nbOfItems > 0 ? "éléments" : "élément" }}</v-chip
      >
      <p v-else class="font-italic">
        Cette note est vide...
      </p>
    </v-card-text>

    <CardFooter :list="filledList">
      <template #preview-button>
        <v-btn icon @click.stop="listPreview = true">
          <v-icon>mdi-eye-outline</v-icon>
        </v-btn>
      </template>
      <template #first-spacer>
        <v-spacer></v-spacer>
      </template>
    </CardFooter>

    <v-expand-transition>
      <ListPreview
        v-if="listPreview"
        :list="filledList"
        :nb-items="nbOfItems"
        @close-preview="listPreview = false"
      />
    </v-expand-transition>

    <v-dialog v-model="listModal" scrollable max-width="600">
      <v-card :style="{ background: filledList.color }">
        <v-card-title class="headline">
          {{ list.title }}
        </v-card-title>
        <v-card-text style="height: 400px;">
          <v-text-field
            v-model="form.body"
            type="text"
            label="Ajouter un élément..."
            @keydown.enter="addItem"
          >
            <template #append>
              <v-fade-transition>
                <v-icon v-if="form.body" @click="addItem">
                  mdi-plus-circle
                </v-icon>
              </v-fade-transition>
            </template></v-text-field
          >
          <ul
            class="v-card--dialog-content"
            :class="{ 'remove-padding': list.checkBoxMode }"
          >
            <Item
              v-for="item in todoItemsList"
              :key="item.id"
              :list="filledList"
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
              :list="filledList"
              :item="item"
            /></ul
        ></v-card-text>
        <CardFooter :list="filledList">
          <template #second-spacer> <v-spacer></v-spacer> </template>
          <template #close-button>
            <v-btn text @click="listModal = false">
              Fermer
            </v-btn>
          </template>
        </CardFooter>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import List from "../classes/List";
import Item from "../classes/Item";
import ItemComponent from "../components/Item";
import ListPreview from "../components/ListPreview";
import CardFooter from "../components/CardFooter";

export default {
  components: {
    Item: ItemComponent,
    ListPreview,
    CardFooter,
  },
  props: {
    list: {
      required: true,
      type: List,
    },
  },
  data() {
    return {
      form: {
        body: "",
        list_id: this.list.id,
      },
      listPreview: false,
      listModal: false,
    };
  },
  computed: {
    filledList() {
      return List.query()
        .with("items")
        .find(this.list.id);
    },
    completeItemsList() {
      return this.filledList.items.filter((item) => item.isComplete);
    },
    todoItemsList() {
      return this.filledList.items.filter((item) => !item.isComplete);
    },
    nbOfItems() {
      return this.filledList.items.length;
    },
  },
  methods: {
    openNote() {
      if (!this.listPreview) this.listModal = true;
    },
    addItem() {
      Item.insert({ data: this.form });
      this.form.body = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.v-card {
  &--list {
    border-radius: 6px !important;
  }

  &--dialog-content {
    &.remove-padding {
      padding-left: 0;
    }
  }
}
</style>
