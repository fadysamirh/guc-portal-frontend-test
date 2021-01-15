import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Skeleton from '@material-ui/lab/Skeleton'
import Carousel from 'react-bootstrap/Carousel'
import img from '../../../images/guc_logo_og.png'
import img1 from '../../../images/2.png'
import { isMobile } from 'mobile-device-detect'

import img2 from '../../../images/3.png'

import img3 from '../../../images/4.png'

export default function YouTube() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className='d-block w-100'
          src={img3}
          style={{ height: isMobile ? '20vh' : '50vh' }}
          alt='Third slide'
        />
        <Carousel.Caption>
          <h3>GUC CAMPUS</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <img
          className='d-block w-100'
          src={img2}
          style={{ height: isMobile ? '20vh' : '50vh' }}
          alt='First slide'
        />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className='d-block w-100'
          src={img3}
          style={{ height: isMobile ? '20vh' : '50vh' }}
          alt='Third slide'
        />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <img
          className='d-block w-100'
          src={img2}
          style={{ height: isMobile ? '20vh' : '50vh' }}
          alt='First slide'
        />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}
