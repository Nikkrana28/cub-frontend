import React, { useState, useMemo } from 'react'
import { Text, Image, Flex } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js'
import { provider } from 'web3-core'
import styled from 'styled-components'
// import { IconButton } from '@pancakeswap-libs/uikit'
// import { Farm } from 'state/types'
import { tokenEarnedPerThousandDollarsCompounding, getRoi } from 'utils/compoundApyHelpers'
import ExpandableSectionButton from 'components/ExpandableSectionButton'
import { getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
import { useFarmUser } from 'state/hooks'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import useKingdomAPRAPY from 'hooks/useKingdomAPRAPY'
import Balance from 'components/Balance'

import KingdomDetail from './KingdomDetail'
// import ExpandIcon from './ExpandIcon'
import Divider from './Divider'
// import LinkButton from './LinkButton'
// import CardValue from './CardValue'

const ExpandingWrapper = styled.div<{ expanded: boolean }>`
  height: ${(props) => (props.expanded ? '100%' : '0px')};
  overflow: hidden;
`

// export interface FarmWithStakedValue extends Farm {
//   apy?: BigNumber
// }

interface KingdomProps {
  farm: FarmWithStakedValue
  removed?: boolean
  cakePrice?: BigNumber
  bnbPrice?: BigNumber
  ethereum?: provider
  account?: string
}

const Kingdom: React.FC<KingdomProps> = ({ farm, removed, cakePrice, bnbPrice, ethereum, account }) => {
  const [showExpandableSection, setShowExpandableSection] = useState(false)
  const farmImage = farm.lpSymbol.split(' ')[0].toLocaleLowerCase()

  const { apr } = farm

  const totalValueFormated = farm.lpTotalInQuoteToken
    ? `$${Number(farm.lpTotalInQuoteToken).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    : '-'
  const farmAPR = apr && apr.toLocaleString('en-US', { maximumFractionDigits: 2 })
  // const farmApy = farm.apy.times(new BigNumber(100)).toNumber()
  // const oneThousandDollarsWorthOfCake = 1000 / cakePrice.toNumber()
  // const cakeEarnedPerThousand365D = tokenEarnedPerThousandDollarsCompounding({ numberOfDays: 365, farmAPR, cakePrice })
  // const cakeEarnedPerThousand1D = tokenEarnedPerThousandDollarsCompounding({ numberOfDays: 1, farmAPR, cakePrice })

  /* let aprApy = useKingdomAPRAPY(
    farm.isKingdom,
    farm.isKingdomToken,
    Number(farm.tokenPriceVsQuote),
    farm.poolWeightPCS,
    farm.pcsCompounding,
    farm.apr,
    farm.lpTokenBalancePCSv2 ? farm.lpTokenBalancePCSv2 : 0,
    farm.lpTotalInQuoteTokenPCS ? farm.lpTotalInQuoteTokenPCS : 0,
  )

  aprApy = { ...aprApy, pcsCompounding: farm.pcsCompounding, farmAPR, apr: farm.apr, cakePrice }

  const { farmAPR, apr, pcsCompounding, pcsApr, dailyAPR, farmAPY, totalAPYString, cakePrice } = aprApy */

  const aprApy = useKingdomAPRAPY(
    farm.isKingdom,
    farm.isKingdomToken,
    Number(farm.tokenPriceVsQuote),
    farm.poolWeightPCS,
    farm.pcsCompounding,
    farm.apr,
    farm.lpTokenBalancePCSv2 ? farm.lpTokenBalancePCSv2 : 0,
    farm.lpTotalInQuoteTokenPCS ? farm.lpTotalInQuoteTokenPCS : 0,
  )
  const { dailyAPR, totalAPYString } = aprApy
  const { tokenBalance, stakedBalance, earnings } = useFarmUser(farm.pid)
  const rawTokenBalance = getBalanceNumber(tokenBalance)
  const rawStakedBalance = getBalanceNumber(stakedBalance)
  const rawEarningsBalance = getBalanceNumber(earnings)

  return (
    <>
      <Divider />
      <div className="k-content">
        <div className="flex-grid k-grid">
          <div className="col">
            <Flex justifyContent="flex-start" alignItems="center">
              <Text className="token">{farm.lpSymbol}</Text>
              <Image src={`/images/farms/${farmImage}.png`} alt={farm.lpSymbol} width={24} height={24} />
            </Flex>
            <Text>{(farm.pcsPid || farm.pcsPid === 0) && 'Pancake v2'}</Text>
            <Text> TVL {totalValueFormated}</Text>
          </div>
          <div className="col">
              <Balance
                fontSize="16px"
                value={totalAPYString}
                decimals={2}
                unit="%"
              />
              <Balance
                fontSize="16px"
                value={dailyAPR}
                decimals={2}
                unit="%"
              />
              <Text>{farm.multiplier}</Text>
          </div>
          <div className="col">
            <Balance
              fontSize="16px"
              value={rawTokenBalance}
              decimals={rawTokenBalance ? 2 : 1}
              unit=""
            />
            <Balance
              fontSize="16px"
              value={rawStakedBalance}
              decimals={rawStakedBalance ? 2 : 1}
              unit=""
            />
            <Balance
              fontSize="16px"
              value={rawEarningsBalance}
              decimals={rawEarningsBalance ? 2 : 1}
              unit=""
            />
          </div>
          <div className="col">
            <ExpandableSectionButton
              onClick={() => setShowExpandableSection(!showExpandableSection)}
              expanded={showExpandableSection}
              onlyArrow
            />
          </div>
        </div>
        <ExpandingWrapper expanded={showExpandableSection}>
          <KingdomDetail
            farm={farm}
            walletBalance={rawTokenBalance}
            depositBalance={rawStakedBalance}
            rewardBalance={rawEarningsBalance}
          />
        </ExpandingWrapper>
      </div>
    </>
  )
}

export default Kingdom