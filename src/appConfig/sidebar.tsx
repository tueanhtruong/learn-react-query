import { ReactNode } from 'react';
import { FiHome, FiUser } from 'react-icons/fi';
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
    href: `${PATHS.dev}`,
    permissions: appConfig.DASHBOARD_PERMISSION,
  },
  {
    title: 'User Management',
    icon: <FiUser />,
    href: `${PATHS.myProfile}`,
    permissions: appConfig.DASHBOARD_PERMISSION,
  },

  {
    title: 'Travelers Management',
    icon: <Icon name="ic_form_builder" className="text-is-18" />,
    href: PATHS.travelers,
    permissions: appConfig.DASHBOARD_PERMISSION,
  },
  {
    title: 'Trips Management',
    icon: <Icon name="ic_search" className="text-is-18" />,
    href: PATHS.trips,
    permissions: appConfig.DASHBOARD_PERMISSION,
  },
];
