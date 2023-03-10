import { createStyles, Container, Title, Text, Button, Avatar } from '@mantine/core';
import { useIsAuthenticated, useSignOut } from 'react-auth-kit';
import { useQueryClient } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: '#11284b',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage:
      "linear-gradient(250deg, rgba(130, 201, 30, 0) 0%, #062343 70%), url('/img/login_back.jpg')",
    paddingTop: theme.spacing.xl * 3,
    paddingBottom: theme.spacing.xl * 3,
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',

    [theme.fn.smallerThan('md')]: {
      flexDirection: 'column',
    },
  },

  image: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  content: {
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan('md')]: {
      marginRight: 0,
    },
  },

  title: {
    color: theme.white,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    lineHeight: 1.05,
    maxWidth: 500,
    fontSize: 48,

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
      fontSize: 34,
      lineHeight: 1.15,
    },
  },

  description: {
    color: theme.white,
    opacity: 0.75,
    maxWidth: 500,

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
    },
  },

  control: {
    paddingLeft: 50,
    paddingRight: 50,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 22,

    [theme.fn.smallerThan('md')]: {
      width: '100%',
    },
  },
}));

export function Header() {
  const { classes } = useStyles();
  const isAuth = useIsAuthenticated();
  const qc = useQueryClient();
  const navigate = useNavigate();

  const signOut = useSignOut()
  const logout = () => {
    if(signOut()) {
      qc.clear();
      navigate("/home", {replace: true})
    }
  }

  return (
    <div className={classes.root}>
      <Container size="lg">
        <div className={classes.inner}>
          <div className="flex items-center justify-center">
          <Avatar src="/img/logo_sansfond.png" size={200}/>
            <div className={classes.content}>
            <Title className={classes.title}>
              SENEGAL{' '}
              <Text
                component="div"
                inherit
                variant="gradient"
                gradient={{ from: 'pink', to: 'yellow' }}
              >
                 BEACH TOUR
              </Text>{' '}
            </Title>
            {isAuth() ? <div className="mt-10">
              <Link to="/dashboard"><Button className="bg-blue-500 hover:bg-blue-700">Tableau de Board</Button> </Link>
              <Button className="bg-yellow-500 hover:bg-yellow-700 uppercase mb-10 mx-2" onClick={logout}>Se D??connecter</Button>
              </div> : <div className="mt-10"> <Link to="/login">
              <Button className="bg-yellow-500 hover:bg-yellow-700 uppercase mr-10">Se Connecter au senegal beach tour</Button>
              </Link>
               <Link to="/register"> <Button className="bg-green-500 hover:bg-green-700 uppercase">Creer un compte</Button></Link> </div>}
          </div>
          </div>
          
        </div>
      </Container>
    </div>
  );
}