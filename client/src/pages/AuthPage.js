import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const { loading, error, request, clearError } = useHttp();
    const [form, setForm] = useState({
        email: '', password: ''
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form });
            message(data.message)
        } catch (e) {}
    };
    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...form });
            auth.login(data.token, data.userId);
        } catch (e) {}
    };

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Сокращение ссылок</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авториризация</span>
                        <div>
                            <label htmlFor="email">Email</label>
                            <div className="input-field">
                                <input placeholder="Введите email" 
                                id="email" 
                                type="text"
                                name="email" 
                                className="yellow-input"
                                value={form.email}
                                onChange={changeHandler}
                                />
                                
                            </div>
                            <label htmlFor="email">Пароль</label>
                            <div className="input-field">
                                <input placeholder="Введите пароль" 
                                id="password" 
                                type="password"
                                name="password"
                                className="yellow-input" 
                                value={form.password}
                                onChange={changeHandler}
                                />
                                
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button 
                        className="btn yellow darken-4" 
                        style={{ marginRight: 10 }}
                        onClick={loginHandler}
                        disabled={loading}
                        >
                            Войти</button>
                        <button 
                        className="btn grey lighten-1 black-text"
                        onClick={registerHandler}
                        disabled={loading}
                        >
                        Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}