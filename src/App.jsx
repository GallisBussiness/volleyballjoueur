import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useIsAuthenticated } from 'react-auth-kit';
import {QueryClient,QueryClientProvider } from 'react-query'
import { MantineProvider } from '@mantine/core';
import { AbilityContext } from './casl/can';
import ability from './casl/ability';
import { locale, addLocale } from 'primereact/api';
import { NotificationsProvider } from '@mantine/notifications';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import Tournoi from './pages/Tournoi';

addLocale('fr', {
  firstDayOfWeek: 1,
  dayNames: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
  dayNamesShort: ['dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'],
  dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
  monthNames: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'decembre'],
  monthNamesShort: ['jan', 'fev', 'mar', 'avr', 'mai', 'jun', 'jul', 'aoû', 'sep', 'oct', 'nov', 'dec'],
  today: 'Aujourd\'hui',
  clear: 'Vider',
  accept:	'accepter',
  reject:	'Non',
  choose:	'Choisir',
  upload:	'télécharger',
  cancel:	'Annuler',
  passwordPrompt:	'Entrer un mot de passe',
  weak:	'Faible',
  medium:'Moyen',
  strong:	'Fort',
  emptyMessage: 'Aucun résultats trouvés !'
})

locale('fr');


const queryClient = new QueryClient(
  {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  }
);

function App() {
  return (
    <>
    <MantineProvider withGlobalStyles>
      <NotificationsProvider position="top-right">
         <AbilityContext.Provider value={ability}>
      <QueryClientProvider client={queryClient}>
          <AuthProvider authType={'localstorage'}
                        authName={import.meta.env.VITE_TOKENSTORAGENAME}
                        cookieDomain={window.location.hostname}
          cookieSecure={window.location.protocol === "https:"}>
              <BrowserRouter>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/tournois/:id" element={<Tournoi />}/>
            <Route path="/dashboard/*" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            </Routes>
          </BrowserRouter>
          </AuthProvider>
          </QueryClientProvider>
    </AbilityContext.Provider>
      </NotificationsProvider>
   
    </MantineProvider>
   
    </>
  );
}

export default App;


const PrivateRoute = ({children}) => {
  const hasAuth = useIsAuthenticated()()
  return (
    <>
     {hasAuth ? children: <Navigate to="/login" />}
    </>
  )
}
