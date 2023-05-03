import { Box } from '@mui/material';
// SVG
import { UberSvg } from 'components/svg';
// Styled
import { UberLogoStyled } from './styled';

export const UberLogo = () => {
  return (
    <UberLogoStyled>
      <Box sx={{ mb: -0.5 }}>
        <UberSvg />
      </Box>
    </UberLogoStyled>
  );
};
