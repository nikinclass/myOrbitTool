import { Router } from "express";
const router = Router();
const knex = require('knex')(require('../knexfile.ts')[process.env.NODE_ENV || 'development']);

router.get('/', async (req, res) => {
    // let stuff = knex('user_table')
    //     .select('*');
    // res.json(stuff);
    // .from('user_table')
    // .then((info) => res.status(200).json(info))


    // try {
    //     const stuff = knex('user_table').select("*");
    //     res.json(stuff);
    // } catch (err) {
    //     console.error('YOU FUCKED UP');

    // }
    res.status(200).json({ hello: "working" });


});

export = router;