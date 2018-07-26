import React, { Component } from "react";
import ProjectContainer from "./components/ProjectContainer/ProjectContainer";
import TopPanel from "./../../components/TopPanel/TopPanel";
import FilterPanel from "./components/FilterPanel/FilterPanel";
import styles from "./ProjectExplorerPage.module.css";

class ProjectExplorerPage extends Component<{}, {}> {
    render() {
        return (
            <div>
                <TopPanel />
                <div className={styles.contentPanel}>
                    <FilterPanel className={styles.sideBar} />
                    <div className={styles.mainContent}>
                        <ProjectContainer />
                    </div>
                </div>
            </div>
        );
    }
}

export default ProjectExplorerPage;
