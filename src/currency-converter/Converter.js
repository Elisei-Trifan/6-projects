import React from 'react'
import { Block } from './Block'
import './index.scss'

function Converter() {
  return (
    <div className="App">
      <Block
        value={0}
        currency="RUB"
        onChangeCurrency={(cur) => console.log(cur)}
      />
      <Block value={0} currency="USD" />
    </div>
  )
}

export default Converter
