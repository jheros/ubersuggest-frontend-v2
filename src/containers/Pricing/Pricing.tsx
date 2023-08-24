import { useState } from 'react'

import { Carousel } from 'components/Carousel'
import { IPlanInterval, PLAN_INTERVALS } from 'configs'
import { AllInOneSolutionSection } from 'containers/Pricing/_AllInOneSolutionSection'
import { DesktopPricingSection } from 'containers/Pricing/_DesktopPricingSection'
import { FaqsSection } from 'containers/Pricing/_FaqsSection'
import { GetStartedSection } from 'containers/Pricing/_GetStartedSection'
import { MobilePricingSection } from 'containers/Pricing/_MobilePricingSection'
import { PlanDetailsSection } from 'containers/Pricing/_PlanDetailsSection'
import { TrainingSection } from 'containers/Pricing/_TraniningSection'
import { useMediaHelper } from 'hooks'

export const Pricing = () => {
  const { isDesktop } = useMediaHelper()
  const [planInterval, setPlanInterval] = useState<IPlanInterval>(PLAN_INTERVALS.MONTHLY)

  return (
    <>
      {isDesktop ? (
        <DesktopPricingSection planInterval={planInterval} setPlanInterval={(interval) => setPlanInterval(interval)} />
      ) : (
        <MobilePricingSection />
      )}

      {isDesktop && (
        <>
          <Carousel />

          <PlanDetailsSection planInterval={planInterval} />
        </>
      )}

      <AllInOneSolutionSection />

      <TrainingSection />

      <FaqsSection />

      {isDesktop && <GetStartedSection />}
    </>
  )
}
