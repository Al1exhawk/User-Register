import React from 'react'
import { connect } from 'react-redux'
import { GenericState } from '../store'
import { RouteComponentProps } from 'react-router'
import { UserComponent } from '../components'

type Props = RouteComponentProps & ReturnType<typeof mapStateToProps>

const UserList: React.FC<Props> = (props) => {
    return (
        <div className='items-container'>
            {props.users.map((user, index) => {
                return <UserComponent key={index} user={user} />
            })}
        </div>
    )
}

const mapStateToProps = (state: GenericState) => ({
    users: state.usersState.users

})

export default connect(mapStateToProps)(UserList)

