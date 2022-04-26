const { green, red } = require("chalk");
const { db, Product, User } = require("./server/db");

const items = [
  {
    title: "avocado treat",
    category: ["treat"],
    price: 799,
    imageUrl: "default.png",
    description: "it’s a cute lil treat that’s safe for your pet to eat!",
    rating: 4.8,
    inventory: 5,
  },
  {
    title: "super hair band",
    category: ["toy"],
    price: 2799,
    imageUrl: "default.png",
    description: "hair elastic to play with, comes full of hair",
    rating: 1.9,
    inventory: 27,
  },
  {
    title: "bunny ears",
    category: ["clothing"],
    price: 1799,
    imageUrl: "default.png",
    description: "put these ears on your cat and your cat will be mad",
    rating: 4.2,
    inventory: 1,
  },
  {
    title: "vampire mouse",
    category: ["toy"],
    price: 1299,
    imageUrl: "default.png",
    description: "don't let it bite you!",
    rating: 3.8,
    inventory: 4,
  },
  {
    title: "gay worm friend",
    category: ["toy"],
    price: 1150,
    imageUrl: "default.png",
    description: "worm says gay rights!",
    rating: 4.5,
    inventory: 18
  },
  {
    title: "kirby hat",
    category: ["clothing"],
    price: 2299,
    imageUrl: "default.png",
    description: "cute, powerful, and round",
    rating: 3.2,
    inventory: 6
  },
  {
    title: "flower crown",
    category: ["clothing"],
    price: 3099,
    imageUrl: "default.png",
    description: "springtime is here!",
    rating: 3.3,
    inventory: 24
  },
  {
    title: "martini cookie",
    category: ["treat"],
    price: 1399,
    imageUrl: "default.png",
    description: "for ladies who lunch",
    rating: 4.5,
    inventory: 8
  },
  {
    title: "dental chew",
    category: ["treat"],
    price: 2499,
    imageUrl: "default.png",
    description: "it's this or brushing their teeth",
    rating: 4.8,
    inventory: 42
  },
  {
    title: "edible mouse",
    category: ["treat", "toy"],
    price: 195,
    imageUrl: "default.png",
    description: "is it for eating or playing? your cat will decide",
    rating: 4.8,
    inventory: 32
  },
  {
    title: "Cat-ctus",
    category: ["tree", "toy"],
    price: 10195,
    imageUrl: "default.png",
    description: "A cactus cat tree with cute flowers to play with",
    rating: 4.8,
    inventory: 32
  }
]

const users = [
  {
    firstName: "Claire",
    lastName: "Coulter",
    email: "claire@test.com",
    password: "easy123",
    isAdmin: true
  },
  {
    firstName: "Archy",
    lastName: "Coulter",
    email: "archy@test.com",
    password: "easy123",
    isAdmin: false
  },
  {
    firstName: "Stephanie",
    lastName: "Powell",
    email: "stephanie@test.com",
    password: "easy123",
    isAdmin: true
  },
  {
    firstName: "Kyzer",
    lastName: "Powell",
    email: "kyzer@test.com",
    password: "easy123",
    isAdmin: false
  },
  {
    firstName: "Mab",
    lastName: "Benedetto",
    email: "mab@test.com",
    password: "easy123",
    isAdmin: true
  },
  {
    firstName: "Chair",
    lastName: "Benedetto",
    email: "chair@test.com",
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
    const [claire, archy, stephanie,kyzer, mab, chair] = await Promise.all(users.map(user => {
      return User.create(user)
    }))

    //creating a pending order for archy
    await archy.addToCart(prod1)
    await archy.addToCart(prod2)
    await archy.addToCart(prod3)
    await archy.removeFromCart(prod2)
    await archy.addToCart(prod3)
    await archy.createOrder()

    //creating a cart for archy
    await archy.addToCart(prod4)
    await archy.addToCart(prod5)

    //creating a pending order for claire
    await claire.addToCart(prod6)
    await claire.addToCart(prod6)
    await claire.addToCart(prod6)
    await claire.createOrder()

    //creating a cart for claire
    await claire.addToCart(prod7)
    await claire.addToCart(prod7)
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
