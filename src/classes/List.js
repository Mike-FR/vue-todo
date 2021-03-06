import { Model } from "@vuex-orm/core";
import User from "./User";
import Item from "./Item";

export default class List extends Model {
  static entity = "lists";

  static fields() {
    return {
      id: this.attr(null),
      title: this.attr(""),
      color: this.attr("#FFFFFF"),
      checkBoxMode: this.boolean(),
      user_id: this.attr(null),

      //relastionships : belongs to a user
      user: this.belongsTo(User, "user_id"),
      items: this.hasMany(Item, "list_id")
    };
  }
}
