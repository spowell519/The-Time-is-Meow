const { green, red } = require("chalk");
const { db, Product } = require("./server/db");

const items = [
  {
    title: "avocado treat",
    category: "treat",
    price: 7.99,
    imageUrl: "default.png",
    description: "it’s a cute lil treat that’s safe for your pet to eat!",
    rating: 4.8,
    inventory: 5,
  },
  {
    title: "super hair band",
    category: "toy",
    price: 27.99,
    imageUrl: "default.png",
    description: "hair elastic to play with, comes full of hair",
    rating: 1.8,
    inventory: 27,
  },
  {
    title: "bunny ears",
    category: "clothing",
    price: 17.99,
    imageUrl: "default.png",
    description: "put these ears on your cat and your cat will be mad",
    rating: 4.2,
    inventory: 1,
  },
]

const seed = async () => {
  try {
    await db.sync({ force: true });
    await Promise.all(items.map(item => {
      return Product.create(item)
    }))
  } catch (err) {
    console.log(red(err));
  }
};

module.exports = seed;
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green("Seeding success!"));
      db.close();
    })
    .catch(err => {
      console.error(red("Oh no! Something went wrong!"));
      console.error(err);
      db.close();
    });
}
