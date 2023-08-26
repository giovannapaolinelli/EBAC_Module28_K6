import { group } from 'k6';
import Login from '../requests/login.request'
import User from '../requests/user.request'
import data from '../data/user.json'

export const options = {
    stages: [
        { duration: '10s', target: 10 },
        { duration: '5s', target: 50 },
        { duration: '10s', target: 10 },
        { duration: '5s', target: 0 }
    ],
    thresholds:{
        http_req_duration: ['p(90) < 1000']
    }
}

export default function () {

    let login = new Login()
    let user = new User()

    group('login and get token', ()=>{
        login.access(data.usuarioOk.user, data.usuarioOk.pass)
    })

    group('list users', ()=>{
        user.list(login.getToken())
    })

}