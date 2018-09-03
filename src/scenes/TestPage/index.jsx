import React, { PureComponent } from 'react';
import ProjectList from './../ProjectsExplorer/components/ProjectList/ProjectList';

export default class TestPage extends PureComponent {
    render() {
        return (
            <div style={{ padding: '8px' }}>
                <ProjectList />
            </div>
        );
    }
}
