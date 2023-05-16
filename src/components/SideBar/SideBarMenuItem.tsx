import { styled, Theme } from '@mui/material/styles';
import MuiList, { ListProps } from '@mui/material/List';
import MuiListItem, { ListItemProps } from '@mui/material/ListItem';

interface ISideBarMenuItem extends ListItemProps {
  active: boolean;
  theme?: Theme;
}

export const SideBarMenuItemWrapper = styled((props: ListProps) => <MuiList sx={{ py: 1.5 }} {...props} />)(
  ({ theme }) => ({
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: theme.palette.lightGray[50],

    '&:last-child': {
      borderBottom: 'none',
      paddingBottom: 0,
    },
  }),
);

export const SideBarMenuItem = styled(MuiListItem)(({ active, theme }: ISideBarMenuItem) => ({
  borderRightWidth: active ? 3 : 0,
  borderRightStyle: 'solid',
  borderRightColor: theme?.palette.primary.main,
  paddingLeft: 20,
  paddingRight: 20,
  minHeight: 32,
  cursor: 'pointer',
  fontFamily: active ? theme?.palette.common.medium : theme?.palette.common.regular,

  '&:hover': {
    fontFamily: theme?.palette.common.medium,
  },
}));
