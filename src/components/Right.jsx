import React, { Component } from 'react'
import { Select, DatePicker, Button, InputNumber, Table, Modal } from 'antd';
import { locations, search } from '../request'
import {style} from '../css/right.jsx'

const { Option } = Select;
const { RangePicker } = DatePicker;

const columns = [
  { title: 'Air line', dataIndex: 'airline', key: 'airline' },
  { title: 'Available Seats', dataIndex: 'availableSeats', key: 'availableSeats' },
  { title: 'Cabin', dataIndex: 'cabin', key: 'cabin' },
  { title: 'Duration', dataIndex: 'duration', key: 'duration' },
  { title: 'Stops', dataIndex: 'stops', key: 'stops' },
];

export default class Right extends Component {

  constructor(props) {
    super(props)

    this.state = {
      data: [
        {
          "code": "",
          "name": "",
          "city": "",
          "country": "",
          "timezone": ""
        }
      ],
      listaVoos: [],
      openModal: false,
      modal: {}
    }
    this.changeDestino = this.changeDestino.bind(this)
    this.changePartida = this.changePartida.bind(this)
    this.onChangeDatePicker = this.onChangeDatePicker.bind(this)
    this.onChangePassenger = this.onChangePassenger.bind(this)
    this.onClickBuscar = this.onClickBuscar.bind(this)
    this.onClickRowTable = this.onClickRowTable.bind(this)
  }

  changeDestino(val) {
    this.setState({
      destino: val
    })
  }

  changePartida(val) {
    this.setState({
      partida: val
    })
  }

  onChangeDatePicker(arr) {

    this.setState({
      date: arr
    })
  }

  onChangePassenger(val) {
    this.setState({
      passengers: val
    })

  }

  onClickRowTable(val){
    this.setState({
      openModal: true,
      modal: val
    })
  }

  onClickBuscar() {
    var model = {
      origin: this.state.partida,
      destination: this.state.destino,
      departure1: this.state.date[0],
      departure2: this.state.date[1],
      passengers: this.state.passengers
    }

    search(this, model)
  }

  componentDidMount() {
    locations(this)
  }



  render() {

    
    const dateFormat = 'YYYY-MM-DD';
    var aeroportos = []

    this.state.data.map((e, i) => {
      aeroportos.push(<Option key={i} value={e.code}>{e.name}</Option>)
    })


    const expandedRowRender = (ind) => {
      const columns = [
        { title: 'Money', dataIndex: 'money', key: 'date' },
        { title: 'Miles', dataIndex: 'miles', key: 'name' }]

      return (
        <Table
          columns={columns}
          dataSource={this.state.listaVoos[ind].fareList}
          pagination={false}
          onRowClick={(re) => this.onClickRowTable(re)}

        />
      );
    };


    return (
      <div style={style.content}>

        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          flexWrap: 'wrap'
        }}>
          <Select placeholder="Origem" value={this.state.partida} onChange={(val) => this.changePartida(val)} style={style.origem}>
            {aeroportos}
          </Select>

          <Select placeholder="Destino" value={this.state.destino} onChange={(val) => this.changeDestino(val)} style={style.destino}>
            {aeroportos}
          </Select>

          <RangePicker placeholder={['Data Partida', 'Data Retorno']}
            style={style.rangePicker}
            onChange={(a, b) => this.onChangeDatePicker(b)}
            format={dateFormat}

          />

          <InputNumber style={style.inputNumber} placeholder='Pessoas' min={1} max={100} onChange={(e) => this.onChangePassenger(e)} />

          <Button ghost icon="search" onClick={this.onClickBuscar}>Buscar</Button>

        </div>

        <div style={style.table}>
          <Table columns={columns} dataSource={this.state.listaVoos} pagination={{ pageSize: 5 }} expandedRowRender={(a, ind) => expandedRowRender(ind)} />
        </div>

        <Modal
          title="Compra"
          visible={this.state.openModal}
          onOk={() => {alert("Compra realizada com sucesso")
          this.setState({
            openModal:false,
            modal:{}
          })}}
          onCancel={() => this.setState({
            openModal: false
          })}
          okText="Sim"
          cancelText="Não"
        >
          <p>Você gostaria de finalizar a compra ?</p>
          <p><b>Miles: </b>{this.state.modal.miles}</p>
          <p>Money {this.state.modal.money}</p>
  
        </Modal>

      </div>
    )
  }
}
