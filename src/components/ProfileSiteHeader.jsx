import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SiteHeader from '@edx/frontend-component-site-header';
import { sendTrackEvent } from '@edx/frontend-analytics';
import { intlShape, injectIntl } from '@edx/frontend-i18n';

import App from '../../frontend-core/App';
import AuthenticationContext from '../../frontend-core/AuthenticationContext';

import messages from './ProfileSiteHeader.messages';
import HeaderLogo from '../assets/logo.svg';

function ProfileSiteHeader({ avatar, intl }) {
  const authentication = useContext(AuthenticationContext);

  const mainMenu = [
    {
      type: 'item',
      href: `${App.config.LMS_BASE_URL}/dashboard`,
      content: intl.formatMessage(messages['siteheader.links.courses']),
    },
    {
      type: 'item',
      href: `${App.config.LMS_BASE_URL}/dashboard/programs`,
      content: intl.formatMessage(messages['siteheader.links.programs']),
    },
    {
      type: 'item',
      href: `${App.config.MARKETING_SITE_BASE_URL}/course`,
      content: intl.formatMessage(messages['siteheader.links.content.search']),
      onClick: () => {
        sendTrackEvent('edx.bi.dashboard.find_courses_button.clicked', {
          category: 'profile',
          label: 'header',
        });
      },
    },
  ];

  const userMenu = [
    {
      type: 'item',
      href: `${process.env.LMS_BASE_URL}`,
      content: intl.formatMessage(messages['siteheader.user.menu.dashboard']),
    },
    {
      type: 'item',
      href: `${process.env.LMS_BASE_URL}/u/${authentication.username}`,
      content: intl.formatMessage(messages['siteheader.user.menu.profile']),
    },
    {
      type: 'item',
      href: `${process.env.LMS_BASE_URL}/account/settings`,
      content: intl.formatMessage(messages['siteheader.user.menu.account.settings']),
    },
    {
      type: 'item',
      href: process.env.ORDER_HISTORY_URL,
      content: intl.formatMessage(messages['siteheader.user.menu.order.history']),
    },
    {
      type: 'item',
      href: process.env.LOGOUT_URL,
      content: intl.formatMessage(messages['siteheader.user.menu.logout']),
    },
  ];
  const loggedOutItems = [
    {
      type: 'item',
      href: `${process.env.LMS_BASE_URL}/login`,
      content: intl.formatMessage(messages['siteheader.user.menu.login']),
    },
    {
      type: 'item',
      href: `${process.env.LMS_BASE_URL}/register`,
      content: intl.formatMessage(messages['siteheader.user.menu.register']),
    },
  ];

  return (
    <SiteHeader
      logo={HeaderLogo}
      loggedIn
      username={authentication.username}
      avatar={avatar}
      logoAltText={App.config.SITE_NAME}
      logoDestination={`${App.config.LMS_BASE_URL}/dashboard`}
      mainMenu={mainMenu}
      userMenu={userMenu}
      loggedOutItems={loggedOutItems}
    />
  );
}

ProfileSiteHeader.propTypes = {
  avatar: PropTypes.string,
  intl: intlShape.isRequired,
};

ProfileSiteHeader.defaultProps = {
  avatar: null,
};

const mapStateToProps = state => ({
  avatar: state.userAccount.profileImage.hasImage
    ? state.userAccount.profileImage.imageUrlMedium
    : null,
});

export default connect(
  mapStateToProps,
  {},
)(injectIntl(ProfileSiteHeader));