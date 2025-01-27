import { DEFAULT_TOKEN_DECIMAL } from 'config'
import { getPoolApr, getFarmApr } from 'utils/apr'
import { getBalanceNumber } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'

const getKingdomAPRAPY = (
  farm: FarmWithStakedValue,
  realCakePrice: BigNumber,
  bakePrice: BigNumber,
  beltPrice: BigNumber,
  cubDen: any,
) => {
  const { apr: cubAPR, isKingdom, poolWeightPCS, compounding, lpTokenBalancePCS: lpTokenBalanceMC = 0, lpTotalInQuoteTokenPCS = 0, quoteToken: { busdPrice: quoteTokenPriceUsd }, altPid, farmType, beltAPR } = farm

  let apr:number
  let data = null

  if (altPid === 12) {
    const totalLiquidity = new BigNumber(cubDen.lpTotalInQuoteToken).times(cubDen.quoteToken.busdPrice)
    apr = getFarmApr(cubDen.poolWeight, cubDen.tokenPriceVsQuote, totalLiquidity)

    const dailyAPR = new BigNumber(apr).div(new BigNumber(365)).toNumber()

    const farmAPY = ((((apr / 100 / compounding) + 1) ** compounding) - 1) * 100
    const totalAPY = farmAPY
    const totalAPYString = totalAPY && totalAPY.toLocaleString('en-US', { maximumFractionDigits: 2 })

    data = { pcsApr: apr, dailyAPR, farmAPY, totalAPY, totalAPYString, newMultiplier: cubDen.multiplier }

    return data
  }
// if (farm.lpSymbol === 'BNB-BUSD LP') {
//   console.log('farm',farm.lpSymbol)
//   console.log('poolWeightPCS',poolWeightPCS)
//   console.log('cakePrice',realCakePrice.toNumber())
//   console.log('totalLiquidity',new BigNumber(lpTotalInQuoteTokenPCS).times(quoteTokenPriceUsd).toNumber())
// }
  if (farm.lpSymbol === 'CAKE') {
    apr = getPoolApr(
      Number(farm.token.busdPrice),
      Number(farm.token.busdPrice),
      getBalanceNumber(new BigNumber(lpTokenBalanceMC).times(DEFAULT_TOKEN_DECIMAL), 18),
      parseFloat('10') // CAKE is 10
    )
  } else {
    const totalLiquidity = new BigNumber(lpTotalInQuoteTokenPCS).times(quoteTokenPriceUsd)

    let farmTokenPrice = realCakePrice
    if (farmType === 'Bakery') farmTokenPrice = bakePrice
    else if (farmType === 'Belt') farmTokenPrice = beltPrice

    if (farmType === 'Belt') apr = Number(beltAPR)
    else apr = getFarmApr(new BigNumber(poolWeightPCS), farmTokenPrice, totalLiquidity, isKingdom, farmType)
  }

  if (farmType === 'Bakery') apr = 10

  const dailyAPR = apr ? new BigNumber(apr).div(new BigNumber(365)).toNumber() : new BigNumber(0).toNumber()

  const farmAPY = ((((apr / 100 / compounding) + 1) ** compounding) - 1) * 100
  const totalAPY = cubAPR ? cubAPR + farmAPY : farmAPY
  const totalAPYString = totalAPY && totalAPY.toLocaleString('en-US', { maximumFractionDigits: 2 })

  data = { pcsApr: apr, dailyAPR, farmAPY, totalAPY, totalAPYString }

  return data
}

export default getKingdomAPRAPY
