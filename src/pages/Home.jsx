import { LoadingOverlay } from '@mantine/core';
import { useState } from 'react';
import { useAuthUser, useIsAuthenticated } from 'react-auth-kit';
import Container from 'react-modal-promise';
import { useQuery } from 'react-query';
import CarouselSlide from '../components/CarouselSlide';
import { FooterSocial } from '../components/Footer'
import { Header } from '../components/Header'
import { Notactive } from '../components/Notactive';
import { TournoiList } from '../components/TournoiList'
import { getAuth } from '../services/authservice';
const tabImages = ['/img/c7.JPG','/img/c1.JPG','/img/c2.JPG','/img/c4.JPG','/img/c8.JPG','/img/c3.JPG','/img/c5.JPG','/img/c9.JPG','/img/c10.JPG'];
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
    <CarouselSlide images={tabImages} />
    <TournoiList isActive={isActive} idJoueur={auth?.id}/>
    <FooterSocial />
    <Container />
    </>
  )
}

export default Home