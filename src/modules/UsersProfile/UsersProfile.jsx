import React from 'react';
import { Avatar, Card, Row, Col, Icon, Divider } from 'antd';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { getUser } from './../../services/OrganizationServices';

import './UsersProfile.css';

function daysUntil(date) {
  var birthday = moment(date);
  var today = moment().format("YYYY-MM-DD");
  var age = moment(today).diff(birthday, 'years');
  moment(age).format("YYYY-MM-DD");
  var nextBirthday = moment(birthday).add(age, 'years');
  moment(nextBirthday).format("YYYY-MM-DD");
  if (nextBirthday.isSame(today)) {
    return { status: true, message: 'Happy Birthday!'};
  } else {
    nextBirthday = moment(birthday).add(age + 1, 'years');
    return { status: false, message: nextBirthday.diff(today, 'days') }; 
  }
}

// https://img.pngio.com/profilepng-512512-profile-png-512_512.png
class UsersProfile extends React.Component {

	state = {
		userInfo: {}
	};

	componentDidMount() {
		getUser(this.props.match.params.id)
		.then(res => {
			this.setState({
				userInfo: res
			})
		})
		.catch(err => {
			console.log("+++", err);
		})
	}

	render() {

		let { firstName, lastName, email, phone, birthDate, joiningDate, designation } = this.state.userInfo;
		let getDobMessage = daysUntil(moment(birthDate, 'DD-MM-YYYY').format("YYYY-MM-DD"));

		return (
			<div className="user-profile">
				<Row>
					<Col span={24}>
						<Card bordered={false} className="rounded-border">
							<Row type="flex" className="align-center">
								<Col span={3}>
									<img
										src="https://img.pngio.com/profilepng-512512-profile-png-512_512.png"
										alt=""
										style={{ width: 150 }}
									/>
								</Col>
								<Col span={3}>
									<div className="username text-dark font-bold">{firstName} {lastName}</div>
									<div className="text-dark text-muted">{designation ? designation.name: ''}</div>
								</Col>
								<Col span={1}>
									<Divider type="vertical" />
								</Col>
								<Col span={3}>
									<div className="text-dark">{email}</div>
									<div className="text-dark">{phone}</div>
								</Col>
								<Col span={1}>
									<Divider type="vertical" />
								</Col>
								<Col span={3}>
									<div className="text-dimmed font-small">Birth Date</div>
									<div className="text-dark">{moment(birthDate, 'DD-MM-YYYY').format("Do MMM YY")}</div>
									<div className="text-dark font-bold">{!getDobMessage.status ? <span><span >{getDobMessage.message}</span> days to go.</span> : getDobMessage.message}</div>
								</Col>
								<Col span={1}>
									<Divider type="vertical" />
								</Col>
								<Col span={3}>
									<div className="text-dimmed font-small">Join Date</div>
									<div className="text-dark">{moment(joiningDate, 'DD-MM-YYYY').format("Do MMM YY")}</div>
									<div className="text-dark font-bold">{moment(joiningDate, 'DD-MM-YYYY').fromNow()}</div>
								</Col>
								<Col span={1}>
									<Divider type="vertical" />
								</Col>
							</Row>
						</Card>
					</Col>
				</Row>
			</div>
		);
	}
}

export default withRouter(UsersProfile);
