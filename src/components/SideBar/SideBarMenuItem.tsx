import MuiList, { ListProps } from '@mui/material/List'
import MuiListItem, { ListItemProps } from '@mui/material/ListItem'
import { styled } from '@mui/material/styles'
import { fonts } from '@ubersuggest/common-ui'

interface ISideBarMenuItem extends ListItemProps {
  active?: boolean
}

export const SideBarMenuItemWrapper = styled((props: ListProps) => <MuiList sx={{ py: 1.5 }} {...props} />)(
  ({ theme }) => ({
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: theme.palette.common.lightGray[50],

    '&:last-child': {
      borderBottom: 'none',
      paddingBottom: 0,
    },
  }),
)

export const SideBarMenuItem = styled(MuiListItem)<ISideBarMenuItem>(({ active, theme }) => ({
  borderRightWidth: active ? 3 : 0,
  borderRightStyle: 'solid',
  borderRightColor: theme.palette.primary.main,
  paddingLeft: 20,
  paddingRight: 20,
  minHeight: 32,
  cursor: 'pointer',
  fontFamily: active ? fonts.primary.medium : fonts.primary.regular,

  '&:hover': {
    fontFamily: fonts.primary.medium,
  },
}))
