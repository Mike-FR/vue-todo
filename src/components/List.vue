<template>
  <v-card
    width="240"
    height="200"
    class="ma-4 d-flex flex-column justify-space-between"
  >
    <v-card-text>
      <p class="display-1 text--primary">
        {{ list.title }}
      </p>
      <p v-if="nbOfItems != 0">
        {{ nbOfItems }} {{ nbOfItems > 0 ? "éléments" : "élément" }}
      </p>
      <p v-else class="font-italic">
        Cette note est vide...
      </p>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="orange accent-4" @click="reveal = true">
        Aperçu
      </v-btn>
      <v-btn text color="orange accent-4" @click="reveal = true">
        Editer
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <v-card
        v-if="reveal"
        class="transition-fast-in-fast-out v-card--reveal d-flex flex-column justify-space-between"
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
                <v-icon v-if="form.body" color="orange" @click="addItem">
                  mdi-plus-circle
                </v-icon>
              </v-fade-transition>
            </template></v-text-field
          >
          <ul>
            <div>
              <template v-for="item in filledList.items">
                <v-hover :key="item.id" v-slot="{ hover }">
                  <li>
                    {{ item.body }}

                    <v-icon
                      small
                      color="red accent-2"
                      class="delete-btn float-right"
                      :class="{ 'on-hover': hover }"
                      @click="deleteItem(item)"
                      >mdi-close-circle</v-icon
                    >
                  </li>
                </v-hover>
              </template>
            </div>
          </ul>
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-btn text color="teal accent-4" @click="reveal = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-expand-transition>
  </v-card>
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
  },
};
</script>

<style lang="scss" scoped>
.v-card {
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

  .delete-btn {
    opacity: 0;
  }
  .delete-btn.on-hover {
    opacity: 1;
  }
}
</style>
