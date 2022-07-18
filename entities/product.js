const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name: "product", // Will use table name `category` as default behaviour.
    columns: {
        id: {
            primary: true,
            type: "uuid",
            generated: "uuid"
        },
        amountAvailable: {
            type: "int",
        },
        cost: {
            type: "varchar"
        },
        productName: {
            type: "varchar"
        },
    },
    relations: {
        seller: {
          type: 'many-to-one',
          target: 'user',
          joinColumn: {
            name: 'seller_id',
          },
          inverseSide: 'products' // Note that this is the relation name in project entity, no the entity name Order
        },
        purchases: {
            type: 'one-to-many',
            target: 'purchase',
            cascade: true,
            inverseSide: 'product' // Note that this is relation name, not the entity name
        },
    }
});