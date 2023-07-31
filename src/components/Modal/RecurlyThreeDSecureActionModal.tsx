import { useCallback, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { Box } from '@mui/material'
import { useRecurly } from '@recurly/react-recurly'
import { TokenPayload, RecurlyError } from '@recurly/recurly-js'
import { Dialog } from '@ubersuggest/common-ui'
import { useMutationObserver } from 'hooks'
import { useUpdatePaymentMethodMutation } from 'store/api'

export const RecurlyThreeDSecureActionModal: React.FC<{
  threeDSecureActionTokenId: string
  tokenId: string
  onError: (message: string, err: any) => void
  onSuccess: () => void
}> = ({ tokenId, threeDSecureActionTokenId, onError, onSuccess }) => {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement | null>(null)
  const recurly = useRecurly()
  const [updatePaymentMethod] = useUpdatePaymentMethodMutation()

  const onMutation = useCallback(() => {
    if (ref.current) {
      const iframe: HTMLIFrameElement | null = ref.current.querySelector(`div > iframe`)
      if (iframe && iframe.getAttribute('scrolling') === 'no') {
        iframe.setAttribute('scrolling', 'yes')
      }
    }
  }, [ref])

  useMutationObserver(ref.current, onMutation)

  const risk = recurly.Risk()
  const threeDSecure = risk.ThreeDSecure({
    actionTokenId: threeDSecureActionTokenId,
  })

  threeDSecure.on('token', async (threeDToken: TokenPayload) => {
    if (tokenId) {
      try {
        await updatePaymentMethod({ tokenId: tokenId, threeDSecureToken: threeDToken.id }).unwrap()
        onSuccess()
      } catch (err) {
        onError(t('card_error'), err)
      }
    }
  })
  threeDSecure.on('error', (err: RecurlyError) => {
    onError(t('three_d_verification_failed'), err)
  })

  useEffect(() => {
    if (ref.current) {
      threeDSecure.attach(ref.current)
    }
  }, [ref.current])

  return (
    <Dialog open hideTitle hideActions>
      <Box ref={ref} sx={{ height: '600px' }}></Box>
    </Dialog>
  )
}
