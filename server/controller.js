const houses = require('./db.json')
let globalId = 4
module.exports = {
    getAllHouses: (req, res) => {
        res.status(200).send(houses)
    },
    deleteHouse: (req, res) => {
        let index = houses.findIndex(house => +house.id === +req.params.id)
        houses.splice(index, 1)
        res.status(200).send(houses)
    },
    createHouse: (req, res) => {
        let newHouse = req.body
        newHouse.id = globalId
        houses.push(newHouse)
        res.status(200).send(houses)
        globalId++
    },
    updateHouse: (req, res) => {
        let {id} = req.params
        let {type} = req.body
        let index = houses.findIndex(house => +house.id === +id)
        if(type === 'minus' && houses[index].price <= 0){
        res.status(400).send('price cannot be less than zero')
        }else if(type === 'plus'){
            houses[index].price += 10000
            res.status(200).send(houses)
        }else if (type === 'minus'){
            houses[index].price -= 10000
            res.status(200).send(houses)
        }else{
            res.sendStatus(400)
        }
    }
}