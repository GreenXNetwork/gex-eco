import React, { PureComponent } from 'react';
import { Button, List } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import ProjectInvestor from '../ProjectInvestor/ProjectInvestor';

class ProjectInvestorList extends PureComponent {
    state = {
        initLoading: true,
    };

    componentDidMount() {
        this.getData();
        this.setState({ initLoading: false });
    }

    getData = () => {
        const { dispatch, projectId } = this.props;
        dispatch({
            type: 'investor/fetchMoreInvestors',
            payload: {
                projectId,
            },
        });
    };

    onLoadMore = () => {
        this.getData();
    };

    render() {
        const { initLoading } = this.state;
        const { loading, list, className } = this.props;
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
                        <ProjectInvestor
                            avatarUrl={item.investor_image_url || '/default-avatar.png'}
                            investorName={item.investor_name}
                            investTime={item.time_ago}
                            investAmount={`${item.display_amount} ${item.display_amount_currency}`}
                        />
                    </List.Item>
                )}
            />
        );
    }
}

const propTypes = {
    projectId: PropTypes.number.isRequired,
};
ProjectInvestorList.propTypes = propTypes;

const mapStateToProps = ({ loading, investor }) => ({
    loading: loading.effects['investor/fetchMoreInvestors'],
    list: investor.list,
});

export default connect(mapStateToProps)(ProjectInvestorList);
