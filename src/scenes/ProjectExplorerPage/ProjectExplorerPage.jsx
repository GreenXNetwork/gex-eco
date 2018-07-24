import React, { Component } from "react";
import ProjectExplorerContainer from "./components/ProjectExplorerContainer/ProjectExplorerContainer";
import TopPanel from "./../../components/TopPanel/TopPanel";

class ProjectExplorerPage extends Component<{}, {}> {
    render() {
        return (
            <div>
                <TopPanel />
                <ProjectExplorerContainer />
            </div>
        );
    }
}

export default ProjectExplorerPage;
