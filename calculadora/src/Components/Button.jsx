import React from 'react'

import './Button.css'

export default function Button(props) {
    const { label, operation, double, triple, click } = props;
    let classComponent = 'button'
    classComponent +=  operation ? ' operation' : ''
    classComponent +=  double ? ' double' : ''
    classComponent +=  triple ? ' triple' : ''

    return(
        <button
            onClick={() => click && click(label)}
            className={classComponent}
        >
            {label}
        </button>
    )
}