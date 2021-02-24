import React from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
const faces = [
  'https://i.pravatar.cc/300?img=1',
  'https://i.pravatar.cc/300?img=7',
  'https://i.pravatar.cc/300?img=3',
  'https://i.pravatar.cc/300?img=12',
];

const useStyles = makeStyles((muiBaseTheme) => ({
  card: {
    maxWidth: 541,
    margin: 'auto',
    transition: '0.3s',
    boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
    '&:hover': {
      boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)',
    },
  },
  media: {
    paddingTop: '56.25%',
  },
  content: {
    textAlign: 'left',
    padding: muiBaseTheme.spacing.unit * 3,
  },
  divider: {
    margin: `${muiBaseTheme.spacing.unit * 3}px 0`,
  },
  heading: {
    fontWeight: 'bold',
  },
  subheading: {
    lineHeight: 1.8,
  },
  avatar: {
    display: 'inline-block',
    border: '2px solid white',
    '&:not(:first-of-type)': {
      marginLeft: -muiBaseTheme.spacing.unit,
    },
  },
}));

function OnboardingCard() {
  const classes = useStyles();
  return (
    <div className="App">
      <StyledCard className={classes.card}>
        <CardMedia className={classes.media} image={'/static/img/queue.png'} />
        <CardContent className={classes.content}>
          <Typography
            className={'MuiTypography--heading'}
            variant={'h6'}
            style={{ fontSize: '24px' }}
            gutterBottom
          >
            Save time and money
          </Typography>
          <Typography
            style={{ fontSize: '14px' }}
            className={'MuiTypography--subheading'}
            variant={'caption'}
          >
            Instead of staying in queue to visit your favourite café you can
            nice and easy book your table and enjoy your coffee served when you
            arrive at the café. With discount code ILOVECOFFEE get a 50%
            discount at your first reservation.
          </Typography>
          <Divider className={classes.divider} light />
          <div>
            {faces.map((face) => (
              <Avatar className={classes.avatar} key={face} src={face} />
            ))}
          </div>
        </CardContent>
      </StyledCard>
    </div>
  );
}
const StyledCard = styled(Card)`
  filter: drop-shadow(0px 12px 20px rgba(0, 0, 0, 0.6));
`;
export default OnboardingCard;
