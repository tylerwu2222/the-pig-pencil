import React from 'react'


export default function CodeOutputModule({
    srcDoc = ``
}) {
  return (
    <iframe
        srcDoc={srcDoc}
        title='output'
        sandbox='allow-scripts'
        width={'100%'}
    >
    </iframe>
  )
}
