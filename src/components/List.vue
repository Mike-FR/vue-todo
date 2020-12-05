<template>
  <v-hover v-slot="{ hover }">
    <v-card
      width="252"
      height="200"
      class="v-card--list ma-4 d-flex flex-column justify-space-between"
      :style="{ background: filledList.color }"
    >
      <v-card-text>
        <p class="display-1 text--primary">
          {{ list.title }}
        </p>
        <v-chip v-if="nbOfItems != 0" small
          >{{ nbOfItems }} {{ nbOfItems > 0 ? "éléments" : "élément" }}</v-chip
        >
        <p v-else class="font-italic">
          Cette note est vide...
        </p>
      </v-card-text>
      <v-card-actions>
        <v-btn icon @click="reveal = true">
          <v-icon>mdi-eye-outline</v-icon>
        </v-btn>
        <v-dialog v-model="dialog" scrollable max-width="600">
          <template #activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on">
              <v-icon>mdi-square-edit-outline</v-icon>
            </v-btn>
          </template>
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
              <ul>
                <template v-for="item in filledList.items">
                  <v-hover :key="item.id" v-slot="{ hover }">
                    <li :class="{ 'on-hover': hover }">
                      {{ item.body }}

                      <v-icon
                        small
                        class="delete-btn float-right"
                        :class="{ 'on-hover': hover }"
                        @click="deleteItem(item)"
                        >mdi-close-circle</v-icon
                      >
                    </li>
                  </v-hover>
                </template>
              </ul></v-card-text
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="dialog = false">
                Fermer
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
            :value="filledList.color"
            @input="pickColor"
          ></v-color-picker>
        </v-menu>

        <v-btn
          icon
          style="margin-left:auto;"
          class="delete-btn"
          :class="{ 'on-hover': hover }"
          @click="deleteList(list)"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <v-card
          v-if="reveal"
          class="transition-fast-in-fast-out v-card--reveal d-flex flex-column justify-space-between"
          :style="{ background: filledList.color }"
        >
          <v-card-text class="v-card--content pb-0">
            <v-text-field
              v-model="form.body"
              type="text"
              label="Ajout rapide..."
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
            <ul>
              <template v-for="item in filledList.items">
                <v-hover :key="item.id" v-slot="{ hover }">
                  <li :class="{ 'on-hover': hover }">
                    {{ item.body }}

                    <v-icon
                      small
                      class="delete-btn float-right"
                      :class="{ 'on-hover': hover }"
                      @click="deleteItem(item)"
                      >mdi-close-circle</v-icon
                    >
                  </li>
                </v-hover>
              </template>
            </ul>
          </v-card-text>
          <v-card-actions class="pt-0">
            <v-btn text @click="reveal = false">
              Retour
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-expand-transition>
    </v-card>
  </v-hover>
</template>

<script>
import List from "../classes/List";
import Item from "../classes/Item";

export default {
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
      reveal: false,
      dialog: false,
    };
  },
  computed: {
    filledList() {
      return List.query()
        .with("items")
        .find(this.list.id);
    },
    nbOfItems() {
      return this.filledList.items.length;
    },
  },
  methods: {
    addItem() {
      Item.insert({ data: this.form });
      this.form.body = "";
    },
    deleteItem(item) {
      Item.delete(item.id);
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
  },
};
</script>

<style lang="scss" scoped>
.v-card {
  &--list {
    border-radius: 6px !important;
  }
  &--reveal {
    top: 0;
    opacity: 1 !important;
    position: absolute;
    width: 100%;
    height: 100%;
  }

  &--content {
    overflow: auto;
  }

  li.on-hover {
    -moz-box-shadow: inset 0 0 100px 100px rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: inset 0 0 100px 100px rgba(0, 0, 0, 0.1);
    box-shadow: inset 0 0 100px 100px rgba(0, 0, 0, 0.1);
  }

  .delete-btn {
    opacity: 0;
  }
  .delete-btn.on-hover {
    opacity: 1;
    line-height: 1.4;
  }
}
</style>
