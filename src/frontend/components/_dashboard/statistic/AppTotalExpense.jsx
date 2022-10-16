// material
import { styled } from '@mui/material';
import { Card, Typography } from '@mui/material';
// utils
import EmojiPeopleRoundedIcon from '@mui/icons-material/EmojiPeopleRounded';
import {alpha} from "@mui/material/styles";

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(3, 0),
  color: '#95712A',
  backgroundColor: '#FFF7CD'
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: '#95712A',
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
    '#95712A',
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

const TOTAL = 714000;

export default function AppTotalExpense(props) {
  const { amount } = props

  return (
    <RootStyle>
      <IconWrapperStyle>
        <EmojiPeopleRoundedIcon/>
      </IconWrapperStyle>
      <Typography variant="h3">${ amount }</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }} data-testid={"new customer"}>
        Total Expense
      </Typography>
    </RootStyle>
  );
}