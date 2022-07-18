const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name: "purchase", // Will use table name `category` as default behaviour.
    columns: {
        id: {
            primary: true,
            type: "uuid",
            generated: "uuid"
        },
        totalCost: {
            type: "varchar",
        },
        numberOfProducts: {
            type: "int"
        },
    },
    relations: {
        buyer: {
            type: 'many-to-one',
            target: 'user',
            joinColumn: {
              name: 'buyer_id',
            },
            inverseSide: 'purchases' // Note that this is the relation name in project entity, no the entity name Order
        },
        product: {
            type: 'many-to-one',
            target: 'product',
            joinColumn: {
              name: 'product_id',
            },
            inverseSide: 'purchases' // Note that this is the relation name in project entity, no the entity name Order
        }
      }
});