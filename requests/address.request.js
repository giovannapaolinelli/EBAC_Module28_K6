import http from "k6/http"
import Utils from "../utils/utils"
import { check } from "k6"

export default class address {
    #addressId
    #endpoint = "addresses"

    list(token){
        let response = http.get(`${Utils.getBaseUrl()}/${this.#endpoint}`, {
            headers:{
                Authorization: `Bearer ${token}`,
            }
        })
        check(response, { 'Listagem deve retornar 200': r => r && r.status === 200 })
    }

    post(token, address1, address2, city, state, zip){
        let response = http.post(`${Utils.getBaseUrl()}/${this.#endpoint}`, JSON.stringify(
            {
                "address_1": address1,
                "address_2": address2,
                "city": city,
                "state": state,
                "zip": zip
            }
        ),
            {
            headers:{
                Authorization: `Bearer ${token}`,
            }
        })
        this.#addressId = response.json('id')
        check(response, { 'Post deve retornar 201': r => r && r.status === 201 })
    }

    getAddress(){
        return this.#addressId
    }
}