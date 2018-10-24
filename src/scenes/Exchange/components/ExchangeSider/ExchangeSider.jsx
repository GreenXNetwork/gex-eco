import 'rc-drawer/assets/index.css';
import React from 'react';
import DrawerMenu from 'rc-drawer';
import ExchangeMenu from './components/ExchangeMenu/ExchangeMenu';

const ExchangeSider = props => {
    const { isMobile, collapsed } = props;
    return isMobile ? (
        <DrawerMenu
            getContainer={null}
            level={null}
            handleChild={<i className="drawer-handle-icon" />}
            onHandleClick={() => {
                props.onCollapse(!collapsed);
            }}
            open={!collapsed}
            onMaskClick={() => {
                props.onCollapse(true);
            }}
        >
            <ExchangeMenu {...props} collapsed={isMobile ? false : collapsed} />
        </DrawerMenu>
    ) : (
        <ExchangeMenu {...props} />
    );
};

export default ExchangeSider;
