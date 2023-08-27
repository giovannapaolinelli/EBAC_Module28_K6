import http from "k6/http"
import Utils from "../utils/utils"
import { check } from "k6"

export default class product {
    #productId
    #endpoint = "products"

    list(token){
        let response = http.get(`${Utils.getBaseUrl()}/${this.#endpoint}`, {
            headers:{
                Authorization: `Bearer ${token}`,
            }
        })
        check(response, { 'Listagem deve retornar 200': r => r && r.status === 200 })
    }

    post(token, productDescription, productPrice, productName){
        let response = http.post(`${Utils.getBaseUrl()}/${this.#endpoint}`, JSON.stringify(
            {
                "description": productDescription,
                "itemPrice": productPrice,
                "name": productName
            }
        ),
            {
            headers:{
                Authorization: `Bearer ${token}`,
            }
        })
        this.#productId = response.json('id')
        check(response, { 'Post deve retornar 201': r => r && r.status === 201 })
    }

    patch(token, productDescription, productPrice, productName){
        let response = http.patch(`${Utils.getBaseUrl()}/${this.#endpoint}/${this.#productId}`, JSON.stringify(
            {
                "description": productDescription,
                "itemPrice": productPrice,
                "name": productName
            }
        ),
            {
            headers:{
                Authorization: `Bearer ${token}`,
            }
        })
        check(response, { 'Patch deve retornar 200': r => r && r.status === 200 })
    }

    listById(token){
        let response = http.get(`${Utils.getBaseUrl()}/${this.#endpoint}/${this.#productId}`, {
            headers:{
                Authorization: `Bearer ${token}`,
            }
        })
        check(response, { 'Listagem por ID deve retornar 200': r => r && r.status === 200 })
    }

    delete(token){
        let response = http.del(`${Utils.getBaseUrl()}/${this.#endpoint}/${this.#productId}`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        check(response, { 'Delete deve retornar 200': r => r && r.status === 200 })
    }
}