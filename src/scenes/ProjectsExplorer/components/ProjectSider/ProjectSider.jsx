import 'rc-drawer/assets/index.css';
import React from 'react';
import DrawerMenu from 'rc-drawer';
import ProjectMenu from '../ProjectMenu/ProjectMenu';

const ProjectSider = props => {
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
            <ProjectMenu {...props} collapsed={isMobile ? false : collapsed} />
        </DrawerMenu>
    ) : (
        <ProjectMenu {...props} />
    );
};

export default ProjectSider;
