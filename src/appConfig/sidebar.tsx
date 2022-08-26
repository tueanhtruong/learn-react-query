import { ReactNode } from 'react';
import { FiHome, FiList, FiPieChart, FiSettings, FiUser } from 'react-icons/fi';
import { Icon } from 'src/components/common';
import { Permission } from 'src/redux/auth/types';
// import { Permission } from 'src/redux/authRedux/types';
// import { getNavigateUrl } from 'src/utils';
import appConfig from '.';
import { PATHS } from './paths';

export const isActive = (href: string) => {
  return window.location.pathname === href;
};
type MenuType = {
  title: string;
  icon: ReactNode;
  subMenu?: { title: string; href: string }[];
  href?: string;
  permissions: Permission[];
};

export const SidebarMenu: MenuType[] = [
  {
    title: 'Dashboard',
    icon: <FiHome />,
    href: `${PATHS.dashboard}`,
    permissions: appConfig.DASHBOARD_PERMISSION,
  },
  {
    title: 'User Management',
    icon: <FiUser />,
    href: `${PATHS.userManagement}`,
    permissions: [...appConfig.USER_MANAGEMENT, ...appConfig.ROLE_MANAGEMENT],
  },
  {
    title: 'Property Management',
    icon: <FiPieChart />,
    href: `${PATHS.propertyManagement}`,
    permissions: appConfig.DASHBOARD_PERMISSION,
  },
  {
    title: 'Work Queue Management',
    icon: <FiList />,
    href: PATHS.workQueueManagement,
    permissions: [...appConfig.PROPERTY_TYPE_MANAGEMENT],
  },
  {
    title: 'Workflow Configuration',
    icon: <Icon name="ic_workflow" className="text-is-16" />,
    href: PATHS.workflowConfiguration,
    permissions: appConfig.DASHBOARD_PERMISSION,
  },
  {
    title: 'Configuration Management',
    icon: <FiSettings />,
    href: `${PATHS.configurationManagement}`,
    permissions: appConfig.ROLE_MANAGEMENT,
  },
  {
    title: 'Form Management',
    icon: <Icon name="ic_form_builder" className="text-is-18" />,
    href: PATHS.formManagement,
    permissions: appConfig.FORM,
  },
];
