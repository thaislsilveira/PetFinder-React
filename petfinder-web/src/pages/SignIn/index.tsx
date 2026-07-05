import React, { useCallback, useRef } from 'react';
import {
  FiLogIn as FiLogInIcon,
  FiMail as FiMailIcon,
  FiLock as FiLockIcon,
} from 'react-icons/fi';

import Form from '../../utils/unformCompat';
import { FormHandles } from '@unform/core';

import { Link, useNavigate } from 'react-router-dom';

import asIcon from '../../utils/icon';
import logoImg from '../../assets/logo.png';
import signInBackgoundImg from '../../assets/backgroundLogin.jpg';

const FiLogIn = asIcon(FiLogInIcon);
const FiMail = asIcon(FiMailIcon);
const FiLock = asIcon(FiLockIcon);

import Input from '../../components/Input';
import Button from '../../components/Button';

import { container, content, animationContainer, background } from './styles';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        await signIn({
          email: data.email,
          password: data.password,
        });

        navigate('/dashboard');
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais',
        });
      }
    },
    [signIn, addToast, navigate],
  );

  return (
    <div className={container}>
      <div className={content}>
        <div className={animationContainer}>
          <img src={logoImg} alt="PetFinder" />
          <Form onSubmit={handleSubmit}>
            <h1> Faça seu logon</h1>
            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Button type="submit">Entrar</Button>
          </Form>

          <Link to="/signup">
            <FiLogIn />
            Criar conta
          </Link>
        </div>
      </div>
      <div
        className={background}
        style={{ backgroundImage: `url(${signInBackgoundImg})` }}
      />
    </div>
  );
};

export default SignIn;
