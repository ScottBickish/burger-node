import BaseController from '../utils/BaseController'
import { logger } from '../utils/Logger'
import { burgersService } from '../services/BurgersService'

export class BurgersController extends BaseController{
    constructor(){
        super('api/burgers')
        this.router
        .get('', this.getallBurgers)
        .post('', this.createBurger)
        .put('/:burgerId', this.editBurger)
        .delete('/:burgerId', this.deleteBurger)
    }
    async getallBurgers(req, res, next){
        try {
            const burgers = await burgersService.getallBurgers()
            return res.send(burgers)
        } catch (error) {
            next(error)
        }
    }
    async createBurger(req, res, next){
        try {
          const burgerData = req.body
          const burger = await burgersService.createBurger(burgerData)
          return res.send({message: 'yummmmmmmm', result: burger})  
        } catch (error) {
            next(error)
        }
    }
    async editBurger(req, res, next){
        try {
            const id = req.params.burgerId
            const updatedBurger = req.body
            updatedBurger.id = id
            const burger = await burgersService.editBurger(id, updatedBurger)
            return res.send({message: 'burger changed', results: burger})
        } catch (error) {
            next(error)
        }
    }

    async deleteBurger(req, res, next){
        try {
            const id = req.params.burgerId
            const message = await burgersService.deleteBurger(id)
            return res.send(message)
        } catch (error) {
            next(error)
        }
    }

}