import React from 'react'
import Home1 from '../Helpers/General/Home1'
import Home2 from '../Helpers/General/Home2'
import Card from '@material-ui/core/Card'
import { isMobile } from 'mobile-device-detect'

import Home3 from '../Helpers/General/Home3'

export default function HomePage() {
  return (
    <div>
      <div
        style={{
          width: '93vw',
          height: isMobile ? '30vh' : '50vh',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div style={{ width: '90%', height: isMobile ? '20vh' : '40vw' }}>
          <Card
            style={{
              padding: '1vw',
            }}
          >
            {' '}
            <Home3 />
          </Card>{' '}
        </div>
      </div>
      <div style={{ display: isMobile ? '' : 'flex' }}>
        <div style={{ margin: '5vw', marginRight: '4vw' }}>
          <span style={{ fontWeight: 'bold' }}>Professor's Posts</span>

          <Card
            style={{
              overflowY: 'scroll',
              width: 'max-content',
              height: '70vh',
            }}
          >
            {' '}
            <Home1 />
          </Card>
        </div>
        <div
          style={{
            margin: '5vw',
            marginLeft: '1vw',
            width: isMobile ? '' : '40vw',
            overflowY: isMobile ? 'scroll' : '',
          }}
        >
          <span style={{ fontWeight: 'bold' }}>GUC NEWS</span>

          <Card
            style={{
              overflowY: 'scroll',
              width: 'max-content',
              height: '70vh',
            }}
          >
            {' '}
            <Home2 />
          </Card>
        </div>
      </div>
    </div>
  )
}
