const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name: "user", // Will use table name `category` as default behaviour.
    columns: {
        id: {
            primary: true,
            type: "uuid",
            generated: "uuid"
        },
        username: {
            type: "varchar",
            unique: true
        },
        password: {
            type: "varchar"
        },
        deposit: {
            type: "varchar"
        },
        role: {
            type: "varchar",
            enum: ["SELLER", "BUYER"]
        }
    },
    relations: {
        products: {
          type: 'one-to-many',
          target: 'product',
          cascade: true,
          inverseSide: 'seller' // Note that this is relation name, not the entity name
        },
      },
});