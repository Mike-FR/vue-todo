import { Model } from "@vuex-orm/core";
import List from "./List";
import Item from "./Item";

export default class User extends Model {
  static entity = "users";

  static fields() {
    return {
      id: this.uid(),
      name: this.attr(""),
      email: this.attr(""),

      //relationships
      lists: this.hasMany(List, "user_id"),
      items: this.hasManyThrough(Item, List, "user_id", "list_id")
    };
  }
}
