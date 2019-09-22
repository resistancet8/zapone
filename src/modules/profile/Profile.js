import React from 'react'
import { Avatar } from 'antd';
import { observer, inject } from "mobx-react";

import './Profile.scss'

@inject("globals")
@observer
class Profile extends React.Component {
    render() {
        const { user } = this.props.globals
        return (<div className="profile">
            <div className="profile-image">
                <div className="avtr">
                    <Avatar size={200} icon="user" />
                </div>
                <div className="name">
                    <span>{user.firstName}</span>
                </div>
            </div>
            <div className="about-main">
                <span className="about-title">About</span>
                <div className="about-body">
                    <div className="row"><span className="subtitle">Username :</span><span>{"  " + user.userName}</span></div>
                    <div className="row"><span className="subtitle">E-mail :</span><span>{"  " + user.email}</span></div>
                    <div className="row"><span className="subtitle">Phone Number :</span><span>{"  " + user.phone}</span></div>
                    {/* <div className="row"><span className="subtitle">Organisation :</span></div>
                    <div className="row"><span className="subtitle">Department :</span></div> */}
                </div>
            </div>
        </div>)
    }
}

export default Profile;