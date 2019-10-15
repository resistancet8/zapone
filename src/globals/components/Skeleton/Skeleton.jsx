import React from 'react';
import { Skeleton } from 'antd';

class SkeletonView extends React.Component {
	render() {
		return (
			<div>
        {Array.from({length: this.props.count}, (v, i) => <Skeleton paragraph={true} title={false} avatar active />)}
			</div>
		);
	}
}

export default SkeletonView;
