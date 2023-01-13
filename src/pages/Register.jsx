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
  Input,
  Button,
  Stack,
  LoadingOverlay,
  BackgroundImage,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { FiAtSign } from 'react-icons/fi';
import { MaskField } from 'react-mask-field';
import { createJoueur } from '../services/joueur-service';


const schema = yup.object({
    prenom: yup.string()
    .required(),
    nom: yup.string()
    .required(),
    licence: yup.string()
    .required(),
   tel: yup.string().required(),
   email: yup.string().email().required(),
   password: yup.string().required(),
  }).required();
  

const Register = () => {

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

    const defaultValues = {nom: '', prenom: '',tel: '',email: '', password: '', licence: ''};
    const { control, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(schema),
      defaultValues
    });

    const {mutate,isLoading} = useMutation((data) => createJoueur(data), {
        onSuccess(data) { 
          showNotification({
            title: 'Connection Réussi',
            message: 'Bienvenue !!',
            color:'green',
          })
          if(signIn({token: data?.token,
            expiresIn: 3600,
            tokenType: "Bearer",
            authState: {id:data?.id},
               })){ 
                const targetDashboard = '/home';
                navigate(targetDashboard, { replace: true });
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
        S'inscrire au VolleyBall Club
      </Text>
      <form onSubmit={handleSubmit(onConnect)} method="POST">
        <Stack>
        <div className="mb-3">
            <Controller control={control} name="prenom" render={({field}) => (
              <TextInput
              placeholder="Prénom"
              label="Prénom"
              withAsterisk
              value={field.value}
              onChange={field.onChange}
              error={errors.prenom && errors.prenom.message}
            />
        
             )}/>
            </div>
            <div className="mb-3">
            <Controller control={control} name="nom" render={({field}) => (
              <TextInput
              placeholder="Nom"
              label="Nom"
              withAsterisk
              value={field.value}
              onChange={field.onChange}
              error={errors.nom && errors.nom.message}
            />
             )}/>
            </div>
            <div className="mb-3">
            <Controller control={control} name="email" render={({field}) => (
              <TextInput
              placeholder="Email"
              label="Email"
              withAsterisk
              value={field.value}
              onChange={field.onChange}
              error={errors.email && errors.email.message}
              icon={<FiAtSign/>}
            />
             )}/>
            </div>
            <div className="mb-3 flex flex-col space-y-2">
            <Controller control={control} name="tel" render={({field}) => (
              <Input.Wrapper id="tel" label="Téléphone" error={errors.tel && errors.tel.message} required>
              <Input component={MaskField} mask="+221 (__) ___-__-__" replacement={{ _: /\d/ }} id="tel" placeholder="Numéro de téléphone" value={field.value} onChange={field.onChange}/>
            </Input.Wrapper>
             )}/>
            </div>
            <div className="mb-3">
            <Controller control={control} name="licence" render={({field}) => (
              <TextInput
              placeholder="Numéro de licence"
              label="Numéro de Licence"
              withAsterisk
              value={field.value}
              onChange={field.onChange}
              error={errors.licence && errors.licence.message}
            />
        
             )}/>
            </div>
            <div className="mb-3 w-full">           
                  <Controller control={control} name="password" render={({field}) => (
                    <div className="flex items-center space-x-4 w-full">
                                        <PasswordInput
                        placeholder="Mot de Passe"
                        label="Mot de Passe"
                        withAsterisk
                        value={field.value} onChange={field.onChange}
                        error={errors.password && errors.password.message}
                        className="w-full"
                      />
                    </div>
                    
                    )} />
                  </div>
        
        </Stack>

        <Group position="apart" mt="xl">
          <Button type="submit" className="bg-yellow-500 hover:bg-yellow-600" >S'incrire au club</Button>
        </Group>
      </form>
    </Paper>
    </div>
    </BackgroundImage>
    
    
  );
}


export default Register;