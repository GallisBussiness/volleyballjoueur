import { useEffect} from 'react';
import { useAuthUser, useIsAuthenticated, useSignIn } from 'react-auth-kit';
import {  useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from 'react-query'
import {Controller, useForm } from 'react-hook-form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Stack,
  LoadingOverlay,
  BackgroundImage,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { loginjour } from '../services/joueur-service';

const schema = yup.object({
    username: yup.string()
    .required(),
   password: yup.string().required(),
  }).required();
  

const Login = () => {

    const isAuth = useIsAuthenticated();
    const auth = useAuthUser()()
    const signIn = useSignIn();
    const navigate = useNavigate();
  
    useEffect(() => {
      if(isAuth()) {
        const targetDashboard = '/home';
        navigate(targetDashboard, { replace: true });
      }
      return;
    }, [isAuth,navigate,auth])

    const defaultValues = {username:'',password:''};
    const { control, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(schema),
      defaultValues
    });

    const {mutate,isLoading} = useMutation((data) => loginjour(data), {
        onSuccess(data) { 
          if(signIn({
            token: data.token,
            expiresIn: 36000,
            tokenType: "Bearer",
            authState: {id:data.id},
               })){ 
                const targetDashboard = '/home';
                navigate(targetDashboard, { replace: true });
                showNotification({
                  title: 'Connection Réussi',
                  message: 'Bienvenue !!',
                  color:'green',
                })
                }else {
                  showNotification({
                    title: 'Connection Echouée',
                    message: 'Une erreur s\'est produite !!',
                    color:'red',
                  })
             }
        },
        onError:(_) => {
          showNotification({
            title: 'Connection Echouée',
            message: 'Identifiant et/ou mot de passe incorrecte !!',
            color:'red',
          })
        }
      })

    const onConnect = (data) => {
        mutate(data);
       };   

  return (
    <BackgroundImage  src="/img/login_back.jpg"
    radius="sm" className="h-full w-full">
<div className="flex items-center justify-center h-screen w-full md:w-5/12 mx-auto">
<LoadingOverlay visible={isLoading} overlayBlur={2} />
    <Paper radius="md" p="xl" withBorder className="w-full p-10">
      <Text size="lg" weight={500}>
        Se Connecter au VolleyBall Club
      </Text>
      <form onSubmit={handleSubmit(onConnect)} method="POST">
        <Stack>
        <Controller control={control} name="username" render={({field}) => (
                    <>
                     <TextInput
                    required
                    label="Email"
                    placeholder="gallis@child.dev"
                    value={field.value}
                    onChange={(event) => field.onChange(event.currentTarget.value)}
                    error={errors.username && 'Invalid email'}
                        />
                    </>
                     )}/>
         
         <Controller control={control} name="password" render={({field}) => (
                    <>
                        <PasswordInput
                        required
                        label="Mot de Passe"
                        placeholder="Votre mot de passe"
                        value={field.value}
                        onChange={(event) => field.onChange(event.currentTarget.value)}
                        error={errors.password && 'Password invalid !!'}
                    />
                    </>
                     )}/>
        
        </Stack>

        <Group position="apart" mt="xl">
          <Button type="submit" className="bg-yellow-500 hover:bg-yellow-600" >Se Connecter</Button>
        </Group>
      </form>
    </Paper>
    </div>
    </BackgroundImage>
    
    
  );
}


export default Login;