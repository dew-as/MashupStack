import React, { useEffect, useState } from 'react'
import Learn from './Learn'

const MainContent = (props) => {
    const [lastName, setLastName] = useState('')

    useEffect(() => {
        alert('Hello ' + props.name)
    }, [])

    useEffect(() => {
        console.log('For each render i will log')
    })

    useEffect(() => {
        console.log(lastName)
    }, [lastName])

    const handleChange = (e) => {
        e.preventDefault()
        props.assignLastName(lastName)
    }

    const handleParentChange = () => {
        props.changeLastName(setLastName)
    }

    const handleSetName = () => {
        props.setName('Aswindev !')
    }
    return (
        <div className='text-center'>
            {props.children}
            Your name is {props.name}
            <form onSubmit={handleChange}>
                <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
                <button type='submit'>Submit</button>
            </form>
            <Learn />
            <button onClick={handleSetName}>Click</button> - setting parent state in child
            <br />
            <button onClick={handleParentChange}>Click</button>  - setting child state in parent
        </div>
    )
}

export default MainContent;
