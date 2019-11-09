import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Main from '../template/Main'

const baseUrl = 'http://localhost:3001/user'

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de usuários: Incluir, Alterar, Consultar e Excluir'
}

export default function UserCrud() {
    const [ user, setUser ] = useState({ name: '', email: '' })
    const [ list, setList ] = useState([])

    function clear() {
        setUser({ name: '', email: '' })
    }

    function getUpdatedList(user, add = true) {
        const updatedList = list.filter(item => item.id !== user.id)
        
        if (add) {
            updatedList.unshift(user)
        }

        return updatedList
    }

    function save() {
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl

        axios[method](url, user)
            .then(resp => {
                const updatedList = getUpdatedList(resp.data)
                setUser({ name: '', email: '' })
                setList(updatedList)
            })
    }

    function updateField(event) {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }

    function renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label htmlFor="name">Nome</label>
                            <input
                                className="form-control"
                                type="text"
                                name="name"
                                value={user.name}
                                onChange={event => updateField(event)}
                                placeholder="Digite o nome..."
                            />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label htmlFor="name">E-mail</label>
                            <input
                                className="form-control"
                                type="text"
                                name="email"
                                value={user.email}
                                onChange={event => updateField(event)}
                                placeholder="Digite o e-mail..."
                            />
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button
                            className="btn btn-primary"
                            onClick={() => save()}
                        >
                            Salvar
                        </button>
                        <button
                            className="btn btn-secondary ml-2"
                            onClick={() => clear()}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    useEffect(() => {
        axios(baseUrl).then(resp => {
            setList(resp.data)
        })
    },[])

    function load(user) {
        setUser(user)
    }

    function remove(user) {
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
            const list = getUpdatedList(user, false)
            setList(list)
        })
    }

    function renderRows() {
        return list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn-warning" onClick={() => load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2" onClick={() => remove(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    function renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {renderRows()}
                </tbody>
            </table>
        )
    }

    return (
        <Main {...headerProps}>
            {renderForm()}
            {renderTable()}
        </Main>
    )
}