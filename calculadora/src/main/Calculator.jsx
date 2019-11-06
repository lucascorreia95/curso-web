import React, { useState } from 'react'

import Button from '../Components/Button'
import Display from '../Components/Display'

import './Calculator.css'

export default function Calculator() {
    const [ displayValue, setDisplayValue ] = useState('0')
    const [ clearDisplay, setClearDisplay ] = useState(false)
    const [ operationState, setOperationState ] = useState(null)
    const [ values, setValues ] = useState([0, 0])
    const [ current, setCurrent ] = useState(0)

    function doOperation(operation, value1, value2) {
        switch (operation) {
            case '+':
                return value1 + value2
            case '-':
                    return value1 - value2
            case '*':
                    return value1 * value2
            case '/':
                    return value1 / value2
            default:
                return null
        }
    }

    function clearMemory() {
        setDisplayValue('0')
        setClearDisplay(false)
        setOperationState(null)
        setValues([0, 0])
        setCurrent(0)
    }

    function setOperation(operation) {
        if (current === 0) {
            setOperationState(operation)
            setCurrent(1)
            setClearDisplay(true)
        } else {
            const done = operation === '='
            
            const localValues = values
            localValues[0] = doOperation(operationState, localValues[0], localValues[1])
            localValues[1] = 0

            setDisplayValue(localValues[0].toString())
            setOperationState(done ? null : operation)
            setCurrent(done ? 0 : 1)
            setClearDisplay(!done)
            setValues(localValues)
        }
    }

    function addDigit(digit) {
        if (digit === '.' && displayValue.includes('.')) {
            return
        }

        const clearDisplayState = displayValue === '0' || clearDisplay
        const currentValue = clearDisplayState ? '' : displayValue
        const displayValueState = currentValue + digit
        setDisplayValue(displayValueState.toString())
        setClearDisplay(false)

        if(digit !== '.') {
            const i = current
            const newValue = parseFloat(displayValueState)
            const newArrValues = values
            newArrValues[i] = newValue
            setValues(newArrValues)
        }
    }

    return (
        <div className="calculator">
            <Display value={displayValue}/>
            <Button label="AC" click={() => clearMemory()} triple />
            <Button label="/" click={(operation) => setOperation(operation)} operation />
            <Button label="7" click={(digit) => addDigit(digit)} />
            <Button label="8" click={(digit) => addDigit(digit)} />
            <Button label="9" click={(digit) => addDigit(digit)} />
            <Button label="*" click={(operation) => setOperation(operation)} operation />
            <Button label="4" click={(digit) => addDigit(digit)} />
            <Button label="5" click={(digit) => addDigit(digit)} />
            <Button label="6" click={(digit) => addDigit(digit)} />
            <Button label="-" click={(operation) => setOperation(operation)} operation />
            <Button label="1" click={(digit) => addDigit(digit)} />
            <Button label="2" click={(digit) => addDigit(digit)} />
            <Button label="3" click={(digit) => addDigit(digit)} />
            <Button label="+" click={(operation) => setOperation(operation)} operation />
            <Button label="0" click={(digit) => addDigit(digit)} double />
            <Button label="." click={(digit) => addDigit(digit)} />
            <Button label="=" click={(operation) => setOperation(operation)} operation />
        </div>
    )
}