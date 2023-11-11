const router = require('express').Router();

const User = require("../models/User")


router.post("/usuarios/cadastro", async (req, res) => {
    const {name, email, age, approved } = req.body;

    if (!name) {
        res.status(422).json({error: 'Todos os campos devem ser preenchidos'})
        return;
    }
    if (!email) {
        res.status(422).json({error: 'Todos os campos devem ser preenchidos'})
        return;
    }
    if (!age) {
        res.status(422).json({error: 'Todos os campos devem ser preenchidos'})
        return;
    }
    if (!approved) {
        res.status(422).json({error: 'Todos os campos devem ser preenchidos'})
        return;
    }
    const user = {
        name,
        email,
        age,
        approved
    }

    try {
        await User.create(user);

        res.status(201).json({message: 'Usuário cadastrado com sucesso'})
    }
    catch(error) {
        res.status(500).json({error: error})
    }
})


router.get('/usuarios', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);

    }
    catch(error) {
        res.status(500).json({error: error})
    }
})


router.get('/usuarios/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findOne({_id: id});

        if(!user) {
            res.status(424).json({message: "Usuário não encontrado."})
            return;
        }

        res.status(200).json(user);
    }
    catch(error) {
        res.status(500).json({error: error})
    }

})


router.patch('/usuarios/:id', async (req, res) => {
    const id = req.params.id;

    const {name, email, age, approved } = req.body;

    const user = {
        name,
        email,
        age,
        approved
    }

    try {
        const updatedUser = await User.updateOne({ _id: id }, user);
        
        if (updatedUser.matchedCount === 0) {
            res.status(422).json({msg: 'Usuário não encontrado.'})
        }

        res.status(200).json(user);

    }
    catch(error) {
        res.status(500).json({error: error})
    }
})

router.delete('/usuarios/:id', async (req, res) => {
    const id = req.params.id;

    const user = await User.findOne({_id: id});

    if (!user) {
        res.status(422).json({msg: 'Usuário não encontrado.'});
        return;
    }

    try {

        await User.deleteOne({_id: id});

        res.status(200).json({message: "Usuário removido com sucesso."})
    }
    catch(error) {
        res.status(500).json({error: "Usuário não encontrado."})

    }
})



module.exports = router;