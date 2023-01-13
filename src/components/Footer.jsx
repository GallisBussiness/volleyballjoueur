import { createStyles, Container, Group, ActionIcon } from '@mantine/core';
import { FaVolleyballBall,FaTwitter, FaYoutube, FaInstagram, FaFacebook } from 'react-icons/fa';

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 120,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      marginTop: theme.spacing.md,
    },
  },
}));

export function FooterSocial() {
  const { classes } = useStyles();

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <FaVolleyballBall size={28} className="text-yellow-600"/>
        <Group spacing={0} className={classes.links} position="right" noWrap>
        <ActionIcon size="lg">
            <FaFacebook size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg">
            <FaTwitter size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg">
            <FaYoutube size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg">
            <FaInstagram size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}