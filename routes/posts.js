const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Rates = require('../models/Rates');


//retrievs all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);

    } catch (err) {
        res.json({ message: err });
    }
});

//saves users registration to the MongoDB
router.post('/', async (req, res) => {
    const post = new Post({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    try {
        const savedPost = await post.save()
        res.send({ message: "Registered Successfully", user: savedPost })
        //  res.json(savedPost);
    } catch (err) {
        res.json({ message: err });
    }

});

//saves Metal Rates to the MongoDB datewise
router.post('/rates', async (req, res) => {
    const post = new Rates({
        goldrt: req.body.goldrt,
        silverrt: req.body.silverrt,
        date: new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear()
    });
    try {
        const savedRates = await post.save()
        res.send({ message: "Rates Updated for" + new Date, rates: savedRates })
        //  res.json(savedRates);
    } catch (err) {
        res.json({ message: err });
    }

});


//retrievs last Metal rates
router.get('/rates', async (req, res) => {
    try {
        const rates = await Rates.find().sort({ _id: -1 }).limit(1);
        res.json(rates);
    } catch (err) {
        res.json({ message: err });
    }
});
//retrievs metal rates for last 30 days
router.get('/ratesdatewise', async (req, res) => {
    try {
        const rates = await Rates.find().sort({ _id: -1 }).limit(3);
        res.json(rates);
    } catch (err) {
        res.json({ message: err });
    }
});

//login to website
router.post("/login", (req, res) => {
    const { email, password } = req.body
    Post.findOne({ email: email }, (err, user) => {
        if (user) {
            if (password === user.password) {
                res.send({ message: "Login Successfully", user: user })
            } else {
                res.send({ message: "Wrong Password" })
            }
        } else {
            res.send({ message: "User Not Registered, please Register first" })
        }
    })
})

module.exports = router;