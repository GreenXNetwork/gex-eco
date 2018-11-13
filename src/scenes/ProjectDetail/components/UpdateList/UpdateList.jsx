import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { List, Button } from 'antd';
import { connect } from 'dva';
import UpdatePost from './components/UpdatePost/UpdatePost';

class UpdateList extends PureComponent {
    static propTypes = {
        projectId: PropTypes.number.isRequired,
    };

    getData = () => {
        const { dispatch, projectId } = this.props;
        dispatch({
            type: 'update/fetchMoreUpdates',
            payload: {
                projectId,
            },
        });
    };

    onLoadMore = () => {
        this.getData();
    };

    render() {
        const { initLoading, loading, list, className } = this.props;
        const loadMore = (
            <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
                <Button disabled={initLoading || loading} onClick={this.onLoadMore}>
                    loading more
                </Button>
            </div>
        );

        return (
            <List
                className={className}
                loading={initLoading}
                itemLayout="horizontal"
                loadMore={loadMore}
                dataSource={list}
                renderItem={item => (
                    <List.Item>
                        <UpdatePost data={item} />
                    </List.Item>
                )}
            />
        );
    }
}

const mapStateToProps = ({ loading, update }) => ({
    initLoading: loading.effects['update/fetchUpdates'],
    loading: loading.effects['update/fetchMoreUpdates'],
    list: update.list,
});

export default connect(mapStateToProps)(UpdateList);
