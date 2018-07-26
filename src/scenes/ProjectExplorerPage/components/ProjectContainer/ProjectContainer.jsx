import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./ProjectContainer.module.css";
import { injectIntl } from "react-intl";
import { projectsFetchData } from "./services/projects/actions";
import LinearProgress from "@material-ui/core/LinearProgress";

class ProjectContainer extends Component<{}, {}> {
    componentDidMount() {
        this.props.fetchProjects();
    }

    render() {
        if (this.props.hasError) {
            return <p>Sorry! There was an error loading the items</p>;
        }

        if (this.props.isLoading) {
            return <LinearProgress />;
        }

        let projectsAsString = JSON.stringify(this.props.projects);
        return (
            <div>{projectsAsString}</div>
        );
    }
}

const mapStateToProps = state => {
    return {
        projects: state.ProjectExplorerPage.ProjectContainer.projects,
        hasError: state.ProjectExplorerPage.ProjectContainer.projectsHaveError,
        isLoading: state.ProjectExplorerPage.ProjectContainer.projectsAreLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProjects: () => dispatch(projectsFetchData())
    };
};

export default injectIntl(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(ProjectContainer)
);
