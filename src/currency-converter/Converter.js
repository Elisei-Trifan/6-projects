/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Block } from './Block'
import './index.scss'

function Converter() {
  const [fromCurrency, setFromCurrency] = React.useState('USD')
  const [toCurrency, setToCurrency] = React.useState('RUB')
  const [fromPrice, setFromPrice] = React.useState(1)
  const [toPrice, setToPrice] = React.useState(0)
  // const [rates, setRates] = React.useState({})
  const ratesRef = React.useRef({})

  React.useEffect(() => {
    fetch('https://www.cbr-xml-daily.ru/latest.js')
      .then((res) => res.json())
      .then((json) => {
        const ratesRub = { ...json.rates, RUB: 1 }
        ratesRef.current = ratesRub
        onChangeFromPrice(1)
      })
      .catch((err) => console.warn(err))
      .finally(() => console.log('Запрос окончен'))
  }, [])

  const onChangeFromPrice = (value) => {
    const price = value / ratesRef.current[fromCurrency]
    const result = price * ratesRef.current[toCurrency]
    setToPrice(result.toFixed(2))
    setFromPrice(value)
  }

  const onChangeToPrice = (value) => {
    const result =
      (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value
    setFromPrice(result.toFixed(2))
    setToPrice(value)
  }

  React.useEffect(() => {
    onChangeFromPrice(fromPrice)
  }, [fromCurrency])

  React.useEffect(() => {
    onChangeToPrice(toPrice)
  }, [toCurrency])

  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  )
}

export default Converter
