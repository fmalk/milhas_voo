import { reqwest } from 'reqwest'
import axios from 'axios'
import { notification } from 'antd'

const login = (model, context) => {

    console.log(model)

    axios.post('/api/login', model)
        .then(resp => {
            if (resp.status == 200) {
                context.setState({
                    data: resp.data
                })
                console.log(resp.data)
            } else {
                notification.error({
                    message: 'Erro',
                    description: 'Usuário ou senha não coincidem.',
                })
            }


        })

}

const locations = (context) => {
    axios.get('/api/locations')
        .then((response) => {
            context.setState({
                data:response.data
            })
        })
}

const search = (context, model) => {
    axios.get('/api/search', { params: { origin: model.origin, destination: model.destination, departure1:model.departure1, passengers:model.passengers  } })
        .then((response) => {

            var voos = response.data.requestedFlightSegmentList[0].flightList
            voos.map((e,i)=>{
                console.log(e)
            })

            context.setState({
                listaVoos: voos
            })
          
        })
}

export { login, locations, search }