import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import masterchefABI from 'config/abi/masterchef.json'
import multicall from 'utils/multicall'
import { getAddress, getMasterChefAddress, getKingdomsAddress } from 'utils/addressHelpers'
import { FarmConfig } from 'config/constants/types'

export const fetchFarmUserAllowances = async (account: string, farmsToFetch: FarmConfig[]) => {
  const masterChefAddress = getMasterChefAddress()
  const kingdomAddress = getKingdomsAddress()

  const calls = farmsToFetch.map((farm) => {
    // const lpContractAddress = getAddress(farm.lpAddresses)
    const lpContractAddress = farm.isTokenOnly ? getAddress(farm.token.address) : getAddress(farm.lpAddresses)
    const mainAddress = farm.isKingdom ? kingdomAddress : masterChefAddress
    return { address: lpContractAddress, name: 'allowance', params: [account, mainAddress] }
  })

  const rawLpAllowances = await multicall(erc20ABI, calls)
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance).toJSON()
  })
  return parsedLpAllowances
}

export const fetchFarmUserTokenBalances = async (account: string, farmsToFetch: FarmConfig[]) => {
  const calls = farmsToFetch.map((farm) => {
    // const lpContractAddress = getAddress(farm.lpAddresses)
    const lpContractAddress = farm.isTokenOnly ? getAddress(farm.token.address) : getAddress(farm.lpAddresses)
    return {
      address: lpContractAddress,
      name: 'balanceOf',
      params: [account],
    }
  })

  const rawTokenBalances = await multicall(erc20ABI, calls)
  const parsedTokenBalances = rawTokenBalances.map((tokenBalance) => {
    return new BigNumber(tokenBalance).toJSON()
  })
  return parsedTokenBalances
}

export const fetchFarmUserStakedBalances = async (account: string, farmsToFetch: FarmConfig[]) => {
  const masterChefAddress = getMasterChefAddress()
  const kingdomAddress = getKingdomsAddress()

  const calls = farmsToFetch.map((farm) => {
    return {
      address: farm.isKingdom ? kingdomAddress : masterChefAddress,
      name: 'userInfo',
      params: [farm.pid, account],
    }
  })

  const rawStakedBalances = await multicall(masterchefABI, calls)
  const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
    return new BigNumber(stakedBalance[0]._hex).toJSON()
  })
  return parsedStakedBalances
}

export const fetchFarmUserEarnings = async (account: string, farmsToFetch: FarmConfig[]) => {
  const masterChefAddress = getMasterChefAddress()
  const kingdomAddress = getKingdomsAddress()

  const calls = farmsToFetch.map((farm) => {
    if (farm.isKingdom) {
      console.log('kingdomAddress',kingdomAddress)
      console.log('farm.pid',farm.pid)
      console.log('account',account)
    }
    return {
      // address: farm.isKingdom ? kingdomAddress : masterChefAddress,
      // name: farm.isKingdom ? 'pendingCUB' : 'pendingCub',
      address: masterChefAddress,
      name: 'pendingCub',
      params: [farm.pid, account],
    }
  })

  const rawEarnings = await multicall(masterchefABI, calls)
  const parsedEarnings = rawEarnings.map((earnings) => {
    return new BigNumber(earnings).toJSON()
  })
  return parsedEarnings
}
