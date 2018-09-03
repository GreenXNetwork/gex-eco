import React, { PureComponent, Component } from 'react';
import { List } from 'antd';
import { injectIntl } from '../../../../common/decorator';
import ProjectCard from '../ProjectCard/ProjectCard';
import { connect } from 'dva';

@injectIntl()
@connect(({ project, loading }) => ({
    project,
    loading: loading.effects['project/fetchAll'],
}))
export default class ProjectList extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'project/fetchAll',
        });
    }
    render() {
        const { project, loading } = this.props;
        return (
            <List
                grid={{ gutter: 8, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 4 }}
                dataSource={project.projects}
                loading={loading}
                renderItem={item => (
                    <List.Item style={{'text-align': 'center'}}>
                        <ProjectCard project={item} />
                    </List.Item>
                )}
            />
        );
    }
}
