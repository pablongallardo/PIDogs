const { Router } = require('express');
const { Dog, Temperamento} = require('../db');
const router = Router();
const { Sequelize, UUID } = require("sequelize");
const { v4: uuidv4 } = require('uuid');
var cors = require('cors')
//npm i cors, y agregar a cada ruta del back cors(),

const imageValidate = (URL) => {
    const regex = new RegExp(/(https?:\/\/.*\.(?:png|jpg|gif))/);
    if (regex.test(URL)) return URL;
    if (!regex.test(URL)) return "https://i.pinimg.com/564x/9b/92/b4/9b92b4f32a1c318c406796016bc9bd1c.jpg";
  };


router.post('/', cors(), async(req, res)=>{ // hecha!!
    let {name, height, weight, life_span, image, temperamentos} = req.body
    if(!name || !height || !weight) return res.status(404).send({mensaje: 'Required data missing'})
    try {        
        let id = uuidv4()
        const [nuevoPerro, created] = await Dog.findOrCreate( {
            where: {name: name.toLowerCase()},
            defaults: {
                name: name.toLowerCase(),
                height: height,
                weight: weight,
                life_span: life_span,
                image: imageValidate(image),
                id
            }
        })
        if(created) {            
            const temps = await Temperamento.findAll({
                where: {
                    id: temperamentos
                }
            })            
            await nuevoPerro.addTemperamentos(temps)
            return res.send({mensaje: 'Breed happily created!!'})
        }             
        res.send({mensaje: `The breed already exists ... and it's angry. Find it through the search bar`})        
    } catch (error) {
        console.log(error)
        res.status(404).send(error)        
    }
})

module.exports = router;