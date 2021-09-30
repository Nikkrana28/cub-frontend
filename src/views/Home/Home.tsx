import React from 'react'
import './Home.css'
import styled from 'styled-components'
import { Heading, Text, BaseLayout } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import FarmStakingCard from 'views/Home/components/FarmStakingCard'
// import LotteryCard from 'views/Home/components/LotteryCard'
import CakeStats from 'views/Home/components/CakeStats'
import TotalValueLockedCard from 'views/Home/components/TotalValueLockedCard'
import TwitterCard from 'views/Home/components/TwitterCard'
import EarnAPRCard from 'views/Home/components/EarnAPRCard'
import BridgeCard from 'views/Home/components/BridgeCard'
import KingdomCard from 'views/Home/components/KingdomCard'
import {
  FaFacebook,
  FaTelegram,
  FaTwitter,
  FaReddit,
} from "react-icons/fa";
import Baby from './images/Baby-holding-money-3.png'


const Hero = styled.div`
  align-items: center;
  background-image: url('/images/cub/wide.svg');
  background-repeat: no-repeat;
  background-position: top center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 32px;
  padding-top: 116px;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    background-image: url('/images/cub/2logos.png') ,url('/images/cub/wide.svg');
    background-position: left center, right center;
    height: 165px;
    padding-top: 0;
  }
`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 32px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`

const CTACards = styled(BaseLayout)`
  align-items: start;
  margin-bottom: 32px;

  & > div {
    grid-column: span 6;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 4;
    }
  }
`

const Home: React.FC = () => {
  const TranslateString = useI18n()

  return (
    <div className='home'>
      <div className="grid-container-1">
        <div className='grid-item-1'>
          <h1>Welcome To YooShi</h1>
          <p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s when an unknown printer took a galley of type and scrambled it to make
            a type specimen book It has survived not only five centuries but also the leap into electronic
            typesetting remaining essentially unchanged It was popularised in the 1960s with the release
            of Letraset sheets containing Lorem Ipsum passages and more recently with desktop publishing
            software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          <br />
          <div className='child-grid-container'>

            <div className='child-grid-item-1'>
              <button type='button' className='fomobaby-button'>$Buy FomoBaby</button>
            </div>

            <div className='child-grid-item-1'>
              <button type='button' className='fomobaby-button'>$Buy NFT</button>
            </div>

            <div className='social-child-grid-item-1'>
            <a
                href="www.facebook.com"
                target="_thapa">
                <FaFacebook size={40} className="facebook" />
              </a>
            </div>

            <div className='social-child-grid-item-1'>
            <a
                href="www.facebook.com"
                target="_thapa">
                <FaTelegram size={40} className="telegram" />
              </a>
            </div>

            <div className='social-child-grid-item-1'>
            <a
                href="www.facebook.com"
                target="_thapa">
                <FaTwitter size={40} className="twitter" />
              </a>
            </div>

            <div className='social-child-grid-item-1'>
            <a
                href="www.facebook.com"
                target="_thapa">
                <FaReddit size={40} className="reddit" />
              </a>
            </div>
          </div>
        </div>
        <div className='grid-item-2'>
          <img className='fomobaby' src={Baby} style={{ height: '300px' }} alt="" />
        </div>
      </div>

      <div className='flex-container'>
        <div className='flex-item-1'>
        <h2>58.93%</h2>
        </div>
        <div className='flex-item-1'>
          <h2>251,000+</h2>
        </div>
        <div className='flex-item-1'>
          <h2>251,000+</h2>
        </div>
        <div className='flex-item-1'>
          <h2>251,000+</h2>
        </div>
      </div>
    </div>

    // <Page>
    //   {/* <Hero>
    //     <Heading as="h1" size="xl" mb="24px" color="secondary">
    //       {TranslateString(576, 'Cub Finance')}
    //     </Heading>
    //     <Text>{TranslateString(578, 'Cub Finance on Binance Smart Chain.')}</Text>
    //   </Hero> */}
    //   {/* <div> */}
    //     {/* <Cards> */}
    //       {/* <FarmStakingCard />
    //       <TwitterCard/> */}
    //       {/* <LotteryCard /> */}
    //     {/* </Cards> */}
    //     {/* <CTACards> */}
    //       {/* <EarnAPRCard />
    //       <BridgeCard />
    //       <KingdomCard /> */}
    //       {/* <WinCard /> */}
    //     {/* </CTACards> */}
    //     {/* <Cards>
    //       <CakeStats />
    //       <TotalValueLockedCard />
    //     </Cards> */}
    //   {/* </div> */}

    // {/* </Page> */}

  )
}

export default Home
