import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser, FiPhone } from 'react-icons/fi';

import { Link, useNavigate } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import Form from '../../utils/unformCompat';
import api from '../../services/api';

import logoImg from '../../assets/logo.png';
import signUpBackgoundImg from '../../assets/backgroundLogin.jpg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { container, content, animationContainer, background } from './styles';
import { useToast } from '../../hooks/toast';

interface FormData {
  name: string;
  email: string;
  password: string;
  phone: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        formRef.current?.setErrors({});

        await api.post('/users', data);

        navigate('/');

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer seu login em PetFinder!',
        });
      } catch {
        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer cadastro, tente novamente.',
        });
      }
    },
    [addToast, navigate],
  );
  return (
    <div className={container}>
      <div
        className={background}
        style={{ backgroundImage: `url(${signUpBackgoundImg})` }}
      />
      <div className={content}>
        <div className={animationContainer}>
          <img src={logoImg} alt="GoBarber" />
          <Form onSubmit={handleSubmit}>
            <h1> Faça seu cadastro</h1>
            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Input name="phone" icon={FiPhone} placeholder="Telefone" />

            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Voltar pra logon
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
