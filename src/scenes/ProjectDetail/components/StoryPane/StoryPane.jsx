import React, { PureComponent } from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';

class StoryPane extends PureComponent {
    static propTypes = {
        projectId: PropTypes.number.isRequired,
    };

    componentDidMount() {
        const { dispatch, projectId } = this.props;
        dispatch({
            type: 'story/fetchProjectStory',
            payload: { projectId },
        });
    }

    render() {
        const { htmlContent } = this.props;

        return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
    }
}

const mapStateToProps = ({ loading, story }) => ({
    loading: loading.effects['story/fetchProjectStory'],
    htmlContent: story.html,
});

export default connect(mapStateToProps)(StoryPane);
