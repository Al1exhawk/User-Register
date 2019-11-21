import React from 'react'
import { User } from '../store'

type Props = {
    user: User
}

export const UserComponent: React.FC<Props> = ({ user }) => {
    return (
        <div className='user-item'>
            <h4>fullName: {user.fullName}</h4>
            <p>creationDate: {user.creationDate.toDateString()}</p>
        </div>
    )
}
