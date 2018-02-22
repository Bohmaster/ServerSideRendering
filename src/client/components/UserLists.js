import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchUsers } from '../actions'

class UsersList extends Component {
    componentDidMount() {
        console.log('uyes')
    }

    renderUsers() {
        return this.props.users.map(
            user => {
                return <li key={user.id}>{user.name}</li>
            }
        )
    }

    render() {
        return (
            <div>
                Here's a big list of users:
                <ul>
                    {
                        this.renderUsers()
                    }
                </ul>
                <button onClick={() => console.log('CLICKED')}>Click</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        users: state.users
    }
}

function loadData(store) {
    return store.dispatch(fetchUsers())
}

export { loadData }
export default connect(mapStateToProps, { fetchUsers })(UsersList)
