import React, { useCallback, useRef } from 'react';
import {
  FiArrowLeft as FiArrowLeftIcon,
  FiMail as FiMailIcon,
  FiLock as FiLockIcon,
  FiUser as FiUserIcon,
  FiPhone as FiPhoneIcon,
} from 'react-icons/fi';
import Form from '../../utils/unformCompat';

import { Link, useNavigate } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import api from '../../services/api';

import logoImg from '../../assets/logo.png';
import signUpBackgoundImg from '../../assets/backgroundLogin.jpg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import asIcon from '../../utils/icon';
import { container, content, animationContainer, background } from './styles';
import { useToast } from '../../hooks/toast';

const FiArrowLeft = asIcon(FiArrowLeftIcon);
const FiMail = asIcon(FiMailIcon);
const FiLock = asIcon(FiLockIcon);
const FiUser = asIcon(FiUserIcon);
const FiPhone = asIcon(FiPhoneIcon);

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
      } catch (err) {
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
