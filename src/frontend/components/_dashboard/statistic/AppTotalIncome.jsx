// material
import { styled } from '@mui/material';
import { Card, Typography } from '@mui/material';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import {alpha} from "@mui/material/styles";

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(3, 0),
  color: '#7A0C2E',
  backgroundColor: '#FFE7D9'
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
  color: '#7A0C2E',
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
    '#7A0C2E',
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

const TOTAL = 714000;

export default function AppTotalIncome(props) {
  const {amount} = props
  return (
    <RootStyle>
      <IconWrapperStyle>
        <ShoppingCartRoundedIcon/>
      </IconWrapperStyle>
      <Typography variant="h3">${amount}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }} data-testid={"product sold"}>
        Total Income
      </Typography>
    </RootStyle>
  );
}
