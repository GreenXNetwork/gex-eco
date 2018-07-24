import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBell } from '@fortawesome/free-regular-svg-icons';

class NotificationButton extends Component<{}, {}> {
    render() {
        return (
            <FontAwesomeIcon {...this.props} icon={["far", "bell"]} mask={['far', 'circle']} />
        );
    }
}

library.add(faBell);

export default NotificationButton;