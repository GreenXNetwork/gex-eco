import React, { Component } from 'react';
import { connect } from 'dva';
import { Spin, Icon, Avatar } from 'antd';
import classNames from 'classnames';
import styles from './Developer.less';

class Developer extends Component {
    componentDidMount() {
        const { dispatch, ownerId } = this.props;
        // See models/projectdetail.js for more effects and actions.
        dispatch({
            type: 'owner/fetchOwner',
            ownerId,
        });
    }

    render() {
        const { owner, loading } = this.props;
        let isLoading = loading.effects['owner/fetchOwner'];
        isLoading = isLoading === undefined ? true : isLoading;

        const avatarClassName = styles.campaignOwnerProfile_avatar;

        if (isLoading) {
            return <Spin size="large" />;
        }

        return (
            <div>
                <div className={styles.campaignOwnerDetails}>
                    <div className={styles.campaignOwnerProfile}>
                        <Avatar
                            className={avatarClassName}
                            src={owner.owner_logo_url}
                            shape="circle"
                        />
                        <div className={styles.campaignOwnerProfile_campaignerDetails}>
                            <div>
                                <span
                                    className={styles.campaignOwnerProfile_name}
                                    ng-bind="owner.name"
                                >
                                    {owner.owner_name}
                                </span>
                            </div>
                            <div className={styles.campaignOwnerProfile_whereabouts}>
                                <span ng-bind="owner.role" className={styles.ng_binding}>
                                    {owner.owner_type}
                                </span>
                                <span ng-bind="owner.location" className={styles.ng_binding} />
                            </div>
                            <div className={styles.campaignOwnerProfile_socialLinks}>
                                <a
                                    ng-if="owner.website_url"
                                    href={owner.owner_website}
                                    ng-bind="owner.website_url"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {owner.owner_website}
                                </a>

                                <div className={styles.campaignOwnerProfile_socialLinks_icons}>
                                    <a
                                        ng-if="owner.facebook_profile_url"
                                        href={owner.owner_facebook}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={classNames(styles.socialIcon, 'facebook')}
                                    >
                                        <svg
                                            className=""
                                            aria-label="Facebook Icon"
                                            role="img"
                                            aria-disabled="false"
                                        >
                                            <use xlinkHref="#icon-facebook" />
                                        </svg>
                                    </a>
                                    <a
                                        ng-if="owner.twitter_profile_url"
                                        href={owner.owner_twitter}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={classNames(styles.socialIcon, 'twitter')}
                                    >
                                        <svg
                                            className=""
                                            aria-label="Twitter Icon"
                                            role="img"
                                            aria-disabled="false"
                                        >
                                            <use xlinkHref="#icon-twitter" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.campaignOwnerDetails_verification}>
                        <div className={styles.campaignOwnerDetails_verification_headingBlock}>
                            <div className={styles.campaignOwnerDetails_verification_heading}>
                                <div
                                    className={styles.campaignOwnerDetails_verification_title}
                                    ng-bind="::i18n.t('campaign_page_next.trust.verified_information')"
                                >
                                    Verified Information
                                </div>
                                <span
                                    className="campaignOwnerDetails_verification_learnMoreTooltip infoBubble"
                                    ng-className="{ 'entreTooltip' : entre }"
                                    igg-popover=""
                                    placement="top"
                                    close-delay=""
                                >
                                    <Icon type="icon-tooltip-question" />
                                </span>
                            </div>
                            <a
                                className={styles.campaignOwnerDetails_verification_learnMoreLink}
                                ng-bind="::i18n.t('learn_more')"
                                href="https://support.indiegogo.com/hc/en-us/articles/202179638-About-Verifications"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Learn more
                            </a>
                        </div>
                        <div className={styles.campaignOwnerDetails_verification_list}>
                            <div className={styles.listItem}>
                                <div
                                    ng-className="owner.email_verified ? 'verified' : 'unverified'"
                                    className={styles.verified}
                                >
                                    {/* If non verified, it should be changed to icon-verified-off */}

                                    <svg
                                        className=""
                                        aria-label="Verified"
                                        role="img"
                                        aria-disabled="false"
                                    >
                                        <use xlinkHref="#icon-verified-on" />
                                    </svg>
                                </div>
                                <div
                                    className={styles.listItemName}
                                    ng-bind="::i18n.t('campaign_page_next.trust.verification_items.owner_email')"
                                >
                                    Owner Email
                                </div>
                            </div>
                            <div className={styles.listItem}>
                                <div
                                    ng-className="owner.linkedin_verified ? 'verified' : 'unverified'"
                                    className={styles.unverified}
                                >
                                    {/* If non verified, it should be changed to icon-verified-off */}

                                    <svg
                                        className=""
                                        aria-label="Unverified"
                                        role="img"
                                        aria-disabled="false"
                                    >
                                        <use xlinkHref="#icon-verified-off" />
                                    </svg>
                                </div>
                                <div
                                    className={styles.listItemName}
                                    ng-bind="::i18n.t('campaign_page_next.trust.verification_items.linkedin')"
                                >
                                    LinkedIn
                                </div>
                            </div>
                            <div className={styles.listItem}>
                                <div
                                    ng-className="owner.facebook_verified ? 'verified' : 'unverified'"
                                    className={styles.unverified}
                                >
                                    {/* If non verified, it should be changed to icon-verified-off */}

                                    <svg
                                        className=""
                                        aria-label="Unverified"
                                        role="img"
                                        aria-disabled="false"
                                    >
                                        <use xlinkHref="#icon-verified-off" />
                                    </svg>
                                </div>
                                <div
                                    className={styles.listItemName}
                                    ng-bind="::i18n.t('campaign_page_next.trust.verification_items.facebook')"
                                >
                                    Facebook
                                </div>
                            </div>
                        </div>
                    </div>

                    <div ng-if="hasAnyImpacts">
                        <div
                            className={styles.campaignOwnerDetails_impact_title}
                            ng-bind="::i18n.t('campaign_page_next.trust.impact')"
                        >
                            Impact on GreenX Network
                        </div>
                        <div className={styles.campaignOwnerDetails_impact_list}>
                            {/* ngIf: owner.campaigns_count > 0 */}
                            <div className={styles.listItem} ng-if="owner.campaigns_count > 0">
                                <div
                                    gogo-test="campaigns_count"
                                    className={styles.itemValue}
                                    ng-bind="owner.campaigns_count"
                                >
                                    {owner.owner_no_campaigns}
                                </div>
                                <div
                                    gogo-test="campaigns_count_heading"
                                    className={styles.itemHeading}
                                    ng-bind="::i18n.t('campaign_page_next.trust.campaigns')"
                                >
                                    campaigns
                                </div>
                            </div>
                            {/* end ngIf: owner.campaigns_count > 0 */}
                            {/* ngIf: owner.total_funds_raised > 0  */}
                            <div className={styles.listItem} ng-if="owner.total_funds_raised > 0">
                                <div
                                    gogo-test="total_funds_raised"
                                    className={styles.itemValue}
                                    ng-bind="totalFundsRaised"
                                >
                                    {new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0,
                                    }).format(owner.owner_raised_fund)}
                                </div>
                                <div
                                    className={styles.itemHeading}
                                    gogo-test="total_funds_raised_heading"
                                    ng-bind="::i18n.t('campaign_page_next.trust.funds_raised')"
                                >
                                    raised
                                </div>
                            </div>
                            {/* end ngIf: owner.total_funds_raised > 0 */}
                            {/* ngIf: owner.contributions_count > 0 */}
                        </div>
                    </div>
                    {/* end ngIf: hasAnyImpacts  */}

                    <div className={styles.campaignOwnerDetails_pastCampaigns}>
                        <a
                            ng-bind="::i18n.t('campaign_page_next.trust.view_past_campaigns')"
                            href="/individuals/14327391/campaigns"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.ng_binding}
                        >
                            View Past Campaigns
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ loading, owner }) => ({
    loading,
    owner,
});

export default connect(mapStateToProps)(Developer);
