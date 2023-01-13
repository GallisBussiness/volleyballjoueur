import {
    Header,
    Group,
    Button,
    Box,
  } from '@mantine/core';
// import { useAuthUser, useSignOut } from 'react-auth-kit';
// import { useIsAuthenticated } from 'react-auth-kit';
// import { useQueryClient } from 'react-query';
// import { Link, useNavigate } from 'react-router-dom';
  
  
  
  export function Navtop() {
  
    // const isAuth = useIsAuthenticated();
    // const auth = useAuthUser()();
    // const qc = useQueryClient();
    // const navigate = useNavigate();

    // const signOut = useSignOut()
    // const qk = ['auth',auth?.id]
    // const logout = () => {
    //   if(signOut()) {
    //     qc.removeQueries(qk)
    //     qc.clear();
    //     navigate("/home", {replace: true})
    //   }
    // }


    return (
      <Box>
        <Header height={60} px="md">
          <Group position="right" sx={{ height: '100%' }}>
            {/* logo */}
             <div className="flex items-end justify-end space-x-1">
              {/* {isAuth() && <>
              <Button className="bg-yellow-500 hover:bg-yellow-700" onClick={logout}>Se Déconnecter</Button>
              </>} */}
             </div>
          </Group>
        </Header>
      </Box>
    );
  }