import http from "k6/http"
import Utils from "../utils/utils"
import { check } from "k6"

export default class customer {
    #customerId
    #endpoint = "customers"

    list(token){
        let response = http.get(`${Utils.getBaseUrl()}/${this.#endpoint}`, {
            headers:{
                Authorization: `Bearer ${token}`,
            }
        })
        check(response, { 'Listagem deve retornar 200': r => r && r.status === 200 })
    }

    post(token, address, email, firstName, lastName, phone){
        let response = http.post(`${Utils.getBaseUrl()}/${this.#endpoint}`, JSON.stringify(
            {
                "address": {"id": address},
                "email": email,
                "firstName": firstName,
                "lastName": lastName,
                "phone": phone         
            }
        ),
            {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        this.#customerId = response.json('id')
        check(response, { 'Post deve retornar 201': r => r && r.status === 201 })
    }

    patch(token, address, email, firstName, lastName, phone){
        let response = http.patch(`${Utils.getBaseUrl()}/${this.#endpoint}/${this.#customerId}`, JSON.stringify(
            {
                "address": {"id": address},
                "email": email,
                "firstName": firstName,
                "lastName": lastName,
                "phone": phone         
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
        let response = http.get(`${Utils.getBaseUrl()}/${this.#endpoint}/${this.#customerId}`, {
            headers:{
                Authorization: `Bearer ${token}`,
            }
        })
        check(response, { 'Listagem por ID deve retornar 200': r => r && r.status === 200 })
    }

    delete(token){
        let response = http.del(`${Utils.getBaseUrl()}/${this.#endpoint}/${this.#customerId}`, {
            headers:{
                Authorization: `Bearer ${token}`,
            }
        })
        check(response, { 'Delete deve retornar 200': r => r && r.status === 200 })
    }

}