import React from 'react'
import '../styles/style.css'
import '../styles/style.less'
import '../styles/style.scss'
import dataJson from '../assets/data.json'
import dataXml from '../assets/data.xml'
import dataCSV from '../assets/data.csv'
import webpackLogo from '../assets/photo.png'

const xml = JSON.stringify(dataXml, null, 2)
const json = JSON.stringify(dataJson, null, 2)

const App = () => {
  return (
    <>
      <div className='container'>
        Webpack Configuration
      </div>
      <div className='logo'>
        <img src={webpackLogo} alt="logo" />
      </div>
      <div className="box">
        <h1>LESS</h1>
      </div>
      <div className="box2">
        <h1>SCSS</h1>
      </div>
      <pre>
        <div className="xml">
          <h1>XML</h1>
          {xml}
        </div>
        <div className="json">
          <h1>JSON</h1>
          {json}
        </div>
        <div>
          <div className='csv'>
            <h1>CSV</h1>
            {dataCSV}
          </div>

        </div>
      </pre>
    </>
  )
}

export default App