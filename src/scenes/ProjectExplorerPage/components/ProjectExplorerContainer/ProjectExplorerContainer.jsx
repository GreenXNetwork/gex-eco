import React, { Component } from 'react';
import { connect } from 'react-redux';
import TopPanel from '../../../../components/TopPanel/TopPanel';
import FilterPanel from '../FilterPanel/FilterPanel';
import styles from './ProjectExplorerContainer.module.css';

class ProjectExplorerContainer extends Component<{}, {}> {
    render() {
        return (
                <div className={styles.contentPanel}>
                    <FilterPanel className={styles.sideBar} />
                    <div className={styles.mainContent}>
                        abc
                    </div>
                </div>
        );
    }
}

export default connect()(ProjectExplorerContainer);