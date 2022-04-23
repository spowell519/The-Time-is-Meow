const { green, red } = require("chalk");
const { db, Product, User } = require("./server/db");

const items = [
  {
    title: "avocado treat",
    category: "treat",
    price: 799,
    imageUrl: "default.png",
    description: "it’s a cute lil treat that’s safe for your pet to eat!",
    rating: 4.8,
    inventory: 5,
  },
  {
    title: "super hair band",
    category: "toy",
    price: 2799,
    imageUrl: "default.png",
    description: "hair elastic to play with, comes full of hair",
    rating: 1.9,
    inventory: 27,
  },
  {
    title: "bunny ears",
    category: "clothing",
    price: 1799,
    imageUrl: "default.png",
    description: "put these ears on your cat and your cat will be mad",
    rating: 4.2,
    inventory: 1,
  },
  {
    title: "vampire mouse",
    category: "toy",
    price: 1299,
    imageUrl: "default.png",
    description: "don't let it bite you!",
    rating: 3.8,
    inventory: 4,
  },
  {
    title: "gay worm friend",
    category: "toy",
    price: 1150,
    imageUrl: "default.png",
    description: "worm says gay rights!",
    rating: 4.5,
    inventory: 18
  },
  {
    title: "kirby hat",
    category: "clothing",
    price: 2299,
    imageUrl: "default.png",
    description: "cute, powerful, and round",
    rating: 3.2,
    inventory: 6
  },
  {
    title: "flower crown",
    category: "clothing",
    price: 3099,
    imageUrl: "default.png",
    description: "springtime is here!",
    rating: 3.3,
    inventory: 24
  },
  {
    title: "martini cookie",
    category: "treat",
    price: 1399,
    imageUrl: "default.png",
    description: "for ladies who lunch",
    rating: 4.5,
    inventory: 8
  },
  {
    title: "dental chew",
    category: "treat",
    price: 2499,
    imageUrl: "default.png",
    description: "it's this or brushing their teeth",
    rating: 4.8,
    inventory: 42
  }
]

const users = [
  {
    firstName: "Claire",
    lastName: "Coulter",
    email: "admin@test.com",
    password: "easy123",
    isAdmin: true
  },
  {
    firstName: "Archy",
    lastName: "Coulter",
    email: "test@test.com",
    password: "easy123",
    isAdmin: false
  }
]

const seed = async () => {
  try {
    await db.sync({ force: true });
    const [prod1,prod2,prod3,prod4,prod5,prod6,prod7,prod8,prod9] = await Promise.all(items.map(item => {
      return Product.create(item)
    }))
    const [claire, archy] = await Promise.all(users.map(user => {
      return User.create(user)
    }))

    await archy.addToCart(prod1)
    await archy.addToCart(prod2)
    await archy.addToCart(prod3)
    await archy.removeFromCart(prod2)
    // let barLineItem = (await archy.getCart()).lineItems

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
