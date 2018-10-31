import React, { PureComponent } from 'react';
import { List } from 'antd';
import { connect } from 'dva';
import { injectIntl } from '../../../../common/decorator';
import ProjectCard from '../ProjectCard/ProjectCard';

@injectIntl()
@connect(({ project, loading }) => ({
    project,
    loading,
}))
export default class ProjectList extends PureComponent {
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
        const { match, dispatch } = this.props;
        if (match !== nextProps.match) {
            const nextMatch = nextProps.match;
            const params = {};
            params[nextMatch.params.filterkey] = nextMatch.params.filtervalue;
            dispatch({
                type: 'project/fetchProjects',
                params,
            });
        }
    }

    goToProjectDetailPage = project => () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'project/showDetail',
            id: project.id,
        });
    };

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
}
