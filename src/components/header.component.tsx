import React from 'react'
import { Link } from 'react-router-dom'

export const Header: React.FC = () => {
    return (
        <div className='header'>
            <ul>
                <li>
                    <Link to='/'>
                        Add
                    </Link>
                </li>
                <li>
                    <Link to='/users'>
                        Users
                    </Link>
                </li>
                <li>
                    <Link to='/about'>
                        About
                    </Link>
                </li>

            </ul>
        </div >
    )
}
