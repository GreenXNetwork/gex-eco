import React, { PureComponent, Component } from 'react';
import { List } from 'antd';
import { injectIntl } from '../../../../common/decorator';
import ProjectCard from '../ProjectCard/ProjectCard';
import { connect } from 'dva';

@injectIntl()
@connect(({ project, loading }) => ({
    project,
    loading,
}))
export default class ProjectList extends Component {
    componentDidMount() {
        const { dispatch, match } = this.props;
        const params = {};
        params[match.params.filterkey] = match.params.filtervalue;
        dispatch({
            type: 'project/fetchProjects',
            params,
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match !== nextProps.match) {
            const { dispatch, match } = nextProps;
            const params = {};
            params[match.params.filterkey] = match.params.filtervalue;
            dispatch({
                type: 'project/fetchProjects',
                params,
            });
        }
    }

    render() {
        const { project, loading, dispatch } = this.props;
        const isLoading = loading.effects['project/fetchProjects'] || false;
        return (
            <List
                grid={{ gutter: 8, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 4 }}
                dataSource={project.projects}
                loading={isLoading}
                renderItem={item => (
                    <List.Item style={{ textAlign: 'center' }}>
                        <ProjectCard
                            project={item}
                            dispatch={dispatch}
                            onClick={this.goToProjectDetailPage(item)}
                        />
                    </List.Item>
                )}
            />
        );
    }

    goToProjectDetailPage = project => () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'project/showDetail',
            id: project.id,
        });
    };
}
