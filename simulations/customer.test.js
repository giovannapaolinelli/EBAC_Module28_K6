import { group } from 'k6';
import Login from '../requests/login.request'
import User from '../requests/user.request'
import data from '../data/user.json'
import Product from '../requests/product.request';
import Customer from '../requests/customer.request';
import Address from '../requests/address.request'

export const options = {
    stages: [
        { duration: '10s', target: 10 },
        { duration: '20s', target: 30 },
        { duration: '20s', target: 50 },
        { duration: '10s', target: 0 }
    ],
    thresholds:{
        http_req_duration: ['p(90) < 2000']
    }
}

export default function () {

    let login = new Login()
    let user = new User()
    let product = new Product()
    let customers = new Customer()
    let address = new Address()

    group('login and get token', ()=>{
        login.access(data.usuarioOk.user, data.usuarioOk.pass)
    })

    group('list users', ()=>{
        user.list(login.getToken())
    })

    group('products', ()=>{
        product.post(login.getToken(), data.produto.description, data.produto.itemPrice, data.produto.name)
        product.list(login.getToken())
        product.patch(login.getToken(), data.produto.description, data.produto.itemPrice, data.produto.name)
        product.listById(login.getToken())
        product.delete(login.getToken())
    })

    group('addresses', ()=>{
        address.post(login.getToken(), data.address.address_1, data.address.address_2, data.address.city, data.address.state, data.address.zip)
        address.list(login.getToken())
    })

    group('customers', ()=>{
        customers.post(login.getToken(), address.getAddress(), data.customer.email, data.customer.firstName, data.customer.lastName, data.customer.phone)
        customers.list(login.getToken())
        customers.patch(login.getToken(), address.getAddress(), data.customer.email, data.customer.firstName, data.customer.lastName, data.customer.phone)
        customers.listById(login.getToken())
        customers.delete(login.getToken())
    })
}