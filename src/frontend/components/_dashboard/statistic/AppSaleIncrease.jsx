// material
import { alpha } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
import { styled } from '@mui/material';
// utils
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import StarRateRounded from '@mui/icons-material/StarRateRounded';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(3, 0),
  color: '#2E5395',
  backgroundColor: '#D0F2FF'
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
  color: '#2E5395',
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
    '#2E5395',
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

const TOTAL = 714000;

export default function AppSaleIncrease(props) {
  const {saleIncrease} = props
  return (
    <RootStyle>
      <IconWrapperStyle>
        <StarRateRoundedIcon/>
      </IconWrapperStyle>
      <Typography variant="h3">${saleIncrease}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }} data-testid={"sale increase"}>
        Sale Increase
      </Typography>
    </RootStyle>
  );
}

