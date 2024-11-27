import React from 'react'
import './2023-06-28-python-web-scraping-guide.css'

export default function PythonWebScrapingUltimateGuide() {

  // const isDevelopment = process.env.NODE_ENV === 'development';

  // const pdfPath = isDevelopment
  //   ? '/pdf/code_posts/pythonWSguide/SimpleGuideToWebScrapingPython.pdf'
  //   : `${process.env.PUBLIC_URL}/pdf/code_posts/pythonWSguide/SimpleGuideToWebScrapingPython.pdf`;


  return (
    <div className='container'>
      <p>Here's a guide to web scraping in Python:</p>
      <div className='pdf-div'>
        <a href="https://drive.google.com/file/d/1t-S0Fxl2BlKksjqOJ5nxOY2rQr3i9JkX/view?usp=sharing" target='_blank' title='pdf download'>Download</a>
        <iframe className='pdf-iframe' src="https://drive.google.com/file/d/1t-S0Fxl2BlKksjqOJ5nxOY2rQr3i9JkX/preview" allow="autoplay"></iframe>
      </div>

    </div>
  )
}
