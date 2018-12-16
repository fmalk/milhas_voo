import React, { Component } from 'react'
import { Form, Icon, Input, Button, notification } from 'antd';
import {style} from '../css/left.jsx';
import { login } from '../request';

const FormItem = Form.Item;

export default class Left extends Component {

    constructor(props) {
        super(props)

        this.state = {
            logado: false,
            username: "",
            password: "",
            data: {
                token: "",
                user: {
                    firstName: ""
                }
            }
        }

        this.login = this.login.bind(this)
    }

    onChangePassword(pass) {
        this.setState({
            password: pass
        })
    }

    onChangeUser(username) {
        this.setState({
            username: username
        })
    }

    login() {

        if (this.state.username == "" || this.state.password == "") {
            notification.info({
                message: 'Alerta',
                description: 'Verifique os campos para continuar',
            })
        } else {
            var r = {
                username: this.state.username,
                password: this.state.password
            }
            login(r, this)

            this.setState({
                logado: true
            })

            notification.success({
                message: 'Sucesso',
                description: 'Usuário logado com sucesso.',
            })
        }

    }

    render() {
        return (
            <div style={style.content}>
                {this.state.logado ? (
                    <div style={style.logado}>
                        <img style={style.imagem_logado} src={this.state.data.user.avatar} />
                        <span>{this.state.data.user.firstName}</span>
                        <span>{this.state.data.user.lastName}</span>
                        <div>
                            <Button ghost style={style.btnMeusVoos}>Meus Voos</Button>
                            <Button ghost>Sair</Button>
                        </div>
                    </div>
                ) : (
                        <Form className="login-form">
                            <FormItem>
                                <Input prefix={<Icon type="user" style={style.colorIcon} />} placeholder="Usuário" onChange={(e) => this.onChangeUser(e.target.value)} />
                            </FormItem>
                            <FormItem>
                                <Input prefix={<Icon type="lock" style={style.colorIcon} />} type="password" placeholder="Senha" onChange={(e) => this.onChangePassword(e.target.value)} />
                            </FormItem>
                            <FormItem>
                                <Button ghost onClick={this.login} className="login-form-button">
                                    Entrar
                                </Button>
                            </FormItem>
                        </Form>
                    )
                }
            </div>
        )
    }
}
