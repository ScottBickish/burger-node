import { BadRequest } from '../utils/Errors'

const FakeDB = {
    burgers: [
        {
            name: 'double bacon cheeseburger',
            price: '10.00',
            id: '0'
        },
        {
            name: 'bacon cheeseburger',
            price: '9.00',
            id: '1'
        },
        {
            name: 'mushroom swiss burger',
            price: '10.75',
            id: '2'
        }
    ]

}


class BurgersService {
    async getallBurgers() {
        const burgers = await FakeDB.burgers
        return burgers
    }

    async createBurger(burgerData) {
        burgerData.id = FakeDB.burgers.length.toString()
        await FakeDB.burgers.push(burgerData)
        return burgerData
    }
    async editBurger(id, updatedBurger){
        const burgerIndex = await FakeDB.burgers.findIndex(b => b.id === id)
        if (burgerIndex === -1){
            throw new BadRequest('what burger???')
        }
        FakeDB.burgers.splice(burgerIndex, 1, updatedBurger)
        return updatedBurger
    }

    async deleteBurger(id){
        const burgerIndex = await FakeDB.burgers.findIndex(b => b.id === id)
        if (burgerIndex === -1){
            throw new BadRequest("what you doin???")
        }
        FakeDB.burgers.splice(burgerIndex, 1)
        return 'its gone!'
    }
}

export const burgersService = new BurgersService()