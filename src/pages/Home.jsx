import { LoadingOverlay } from '@mantine/core';
import { useState } from 'react';
import { useAuthUser, useIsAuthenticated } from 'react-auth-kit';
import Container from 'react-modal-promise';
import { useQuery } from 'react-query';
import { FooterSocial } from '../components/Footer'
import { Header } from '../components/Header'
import { Navtop } from '../components/Navtop'
import { Notactive } from '../components/Notactive';
import { TournoiList } from '../components/TournoiList'
import { getAuth } from '../services/authservice';

function Home() {
  const [isActive,setIsActive] = useState(false);
    const auth = useAuthUser()();
    const isAuth = useIsAuthenticated();
    const qk = ['auth',auth?.id]
    const {isLoading} = useQuery(qk, () => getAuth(auth?.id), {
      enabled: isAuth(),
      onSuccess:(_) => {
       setIsActive(_.isActive);
      }
    })
   
  return (
    <>
    <LoadingOverlay visible={isLoading} overlayBlur={2} />
    {(!isActive && isAuth()) && <Notactive />}
    <Header />
    <TournoiList isActive={isActive} idJoueur={auth?.id}/>
    <FooterSocial />
    <Container />
    </>
  )
}

export default Home