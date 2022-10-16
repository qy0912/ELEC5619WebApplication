// material
import { alpha } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
import { styled } from '@mui/material';

// utils
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
    textAlign: 'center',
  padding: theme.spacing(3, 0),
  color: '#005249',
  backgroundColor: '#C8FACD'
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
  color: '#005249',
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
    '#005249',
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

const TOTAL = 714000;

export default function AppWeeklyExpense(props) {
  const {expenseNumber} = props
  return (
    <RootStyle>
      <IconWrapperStyle>
        <AttachMoneyRoundedIcon/>
      </IconWrapperStyle>
      <Typography variant="h3">${expenseNumber}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }} data-testid={"weekly sales"}>
        Weekly Expense
      </Typography>
    </RootStyle>
  );
}
