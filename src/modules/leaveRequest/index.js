import React from 'react'
import './LeaveRequest.scss'
import { Card, Form, DatePicker, Select, Input, Calendar, List, Avatar } from 'antd'
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;
const data = [
    {
        title: 'Prashant',
    },
    {
        title: 'Prakash',
    },
    {
        title: 'Dipak',
    },
    {
        title: 'Avinash',
    },
];


class LeaveRequest extends React.Component {
    onChangeDate = (date, dateString) => {
        console.log(date, dateString);
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (<div className="leave-req">
            <Card className="leave-req-card">
                <div className="wrapper">
                    <div className="from-to-sec">
                        {/* <div className="title">Team Leave Calender</div> */}
                        <Form>
                            <FormItem>
                                {getFieldDecorator('fromTo', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please select dates!'
                                        }
                                    ]
                                })(<RangePicker />)}
                            </FormItem>
                            <FormItem label="Select available leave types">
                                {getFieldDecorator('leaveType', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please enter a valid orgType to update!'
                                        }
                                    ]
                                })(<Select
                                    placeholder="Select leave type"
                                    showSearch
                                >
                                    <Option value="Casual Leave">Casual Leave</Option>
                                    <Option value="Sick Leave">Sick Leave</Option>
                                    <Option value="Unpaid Leave">Unpaid Leave</Option>

                                </Select>)}
                            </FormItem>
                            <FormItem label="Note">
                                {getFieldDecorator('note', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Note is required!'
                                        }
                                    ]
                                })(
                                    <TextArea placeholder="Please enter reason for applying leave" rows={4} />
                                )}
                            </FormItem>
                            <FormItem label="Notify">
                                {getFieldDecorator('notify', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please select someone to notify about your leave!'
                                        }
                                    ]
                                })(<Select
                                    showSearch
                                    mode="tags"
                                    placeholder="Search Employee"
                                >
                                    <Option value="Prashant">Prashant</Option>
                                    <Option value="Prksh">Prksh</Option>
                                    <Option value="Dipak">Dipak</Option>

                                </Select>)}
                            </FormItem>
                        </Form>
                    </div>
                    <div className="calender-notify">
                        <div className="title">Team Leave Calender</div>
                        <Calendar className="cal" fullscreen={false} />
                        <div className="team-list">
                            <List
                                itemLayout="horizontal"
                                dataSource={data}
                                renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                            title={<a href="https://ant.design">{item.title}</a>}
                                            description=""
                                        />
                                    </List.Item>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </Card>
        </div>)
    }
}
export default Form.create()(LeaveRequest)