import { ButtonBase, ButtonBaseProps, styled } from '@mui/material'
import { ReactComponent as CreditCardIcon } from 'assets/svg/checkout/credit-card.svg'
import { ReactComponent as PaypalIcon } from 'assets/svg/checkout/paypal.svg'
import { PAYMENT_METHODS } from 'configs/payment'

interface IImageButton extends ButtonBaseProps {
  active?: boolean
}

const ImageButton = styled(ButtonBase, {
  shouldForwardProp: (prop) => prop !== 'active',
})<IImageButton>(({ theme, active = false }) => ({
  position: 'relative',
  width: '91px',
  height: '55px',
  backgroundColor: theme.palette.common.lightGray[10],
  borderWidth: '1px',
  borderColor: active ? theme.palette.common.orange.main : theme.palette.common.lightGray[20],
  borderStyle: 'solid',
  borderRadius: '2px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: theme.transitions.create(['all']),
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    borderColor: active ? theme.palette.common.orange.main : theme.palette.common.lightGray.main,
    backgroundColor: theme.palette.common.lightGray[20],
  },
}))

interface IPaymentMethodButton extends ButtonBaseProps {
  method: (typeof PAYMENT_METHODS)[keyof typeof PAYMENT_METHODS]
  active?: boolean
}

export const PaymentMethodButton: React.FC<IPaymentMethodButton> = ({ method, ...props }) => {
  return (
    <ImageButton {...props}>
      {method === PAYMENT_METHODS.PAYPAL && <PaypalIcon />}
      {method === PAYMENT_METHODS.CREDIT_CARD && <CreditCardIcon />}
    </ImageButton>
  )
}
