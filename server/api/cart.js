const router = require('express').Router()
// const { user } = require('pg/lib/defaults')1
const User = require('../db/User')
<<<<<<< HEAD
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
=======
//mab secret key
const stripe = require('stripe')('sk_test_51Kt0wgA47uR00zvl1fnDXeVIEl4dU2OWTmAZs89MANErydzRdLtVltenuah6ISQiw6nydxTHiZsKBEGj7b3uT4Jl00z1ruG3i2');
// const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
>>>>>>> 5b987ae3f48dbbfd16906e363998723c6ca2f5ec

router.get('/', async (req, res, next) => {
  try {
    const user = await User.byToken(req.headers.authorization)
    res.send(await user.getCart())
  } catch (err) {
    next(err)
  }
})

router.post('/addToCart', async (req, res, next) => {
  try {
    console.log('** hit ADD route')
    const user = await User.byToken(req.headers.authorization);
    if (user) res.send(await user.addToCart(req.body))
  } catch (err) {
    next(err)
  }
})

router.post('/removeFromCart', async (req, res, next) => {
  try {
    const user = await User.byToken(req.headers.authorization);
    res.send(await user.removeFromCart(req.body))
  } catch (err) {
    next(err)
  }
})

<<<<<<< HEAD
//not being used right now, might be for stripe
router.post('/create-checkout-session', async (req, res, next) => {
  try{
    console.log(req.body, 'req.body')
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          //need to figure out how total is passed through
          price: headers.authorization.total,
          currency: "usd"
        }
      ]
    })

    res.send({
      clientSecret: paymentIntent.client_secret
    })
  } catch(err) {
    next(err)
=======
router.post('/create-checkout-session', async (req, res) => {
  const user = await User.byToken(req.headers.authorization);
  /* need all items in cart in this format:
  [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: '{{PRICE_ID}}',
        quantity: 1,
      },
    ]
  */
 //get line items from order
  const { data } = await axios.get('/api/cart', {
    headers: {
      authorization: token
    }
  })
  const lineItems = data.lineItems;
  let cartForCheckout = [];
  for (let i = 0; i < lineItems.length; i++) {
    cartForCheckout.push({
      price: lineItems[i].product.price,
      quantity: lineItems[i].quantity
    })
>>>>>>> 5b987ae3f48dbbfd16906e363998723c6ca2f5ec
  }

  const session = await stripe.checkout.sessions.create({
    customer_email: user.email,
    submit_type: 'donate',
    billing_address_collection: 'auto',
    shipping_address_collection: {
      allowed_countries: ['US', 'CA'],
    },
    line_items: cartForCheckout,
    mode: 'payment',
    success_url: `/checkout/?success=true`,
    cancel_url: `/checkout/?canceled=true`,
  });

  res.redirect(303, session.url);
});


router.put('/createOrder', async (req, res, next) => {
  try {
    const user = await User.byToken(req.headers.authorization);
    res.send(await user.createOrder(req.body))
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const user = await User.byToken(req.headers.authorization);
    res.send(user)

  } catch (err) {
    next(err)
  }
})

module.exports = router;
