import cn from 'classnames';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiLogOut, FiUser } from 'react-icons/fi';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { HIDE_NAV_PATHS, PATHS } from 'src/appConfig/paths';
import { setCollapseSidebar } from 'src/redux/content/contentSlice';
import { IRootState } from 'src/redux/rootReducer';
import { Callback } from 'src/redux/types';
import { Navigator } from 'src/services';
import { AvatarImage, Button, CustomDropdown, NavLink, Text, View } from '../common';
import { ButtonVariant } from '../common/Button';
import './styles.scss';

const NAV_TYPES = {
  isNavlink: 'NAV_LINK',
  isButton: 'BUTTON',
  isText: 'TEXT',
  isDropDown: 'DROP_DOWN',
};

type NavItemType = {
  id: string;
  href?: string;
  label: string | React.ReactNode;
  type: string;
  onClick?: Callback;
  buttonVar?: string;
  icon?: any;
  subItems?: Array<{
    label: string | React.ReactNode;
    onClick?: Callback;
    icon?: React.ReactNode;
  }>;
};

const Navbar: React.FC<Props> = ({
  user,
  showNavbar,
  showSidebar,
  // showSecondBurger,
  collapseSidebar,
  isAuthenticated,
  showMiniSidebar,
  onSetCollapseSidebar,
  // onSignOut,
}) => {
  const [toggleNavbar, setToggleNavbar] = useState(false);
  const navbarRef = useRef<HTMLElement>(null);
  const { i18n } = useTranslation();

  const location = useLocation();

  const getUserName = () => {
    return 'Anonymous';
  };
  const getUserNameKey = () => {
    return '--';
  };

  // menu
  if (HIDE_NAV_PATHS.includes(location.pathname)) return null;

  const navbarAuthItems: NavItemType[] = [
    {
      id: 'Event',
      label: 'Event',
      href: PATHS.event,
      type: NAV_TYPES.isNavlink,
    },
    {
      id: 'UserName',
      label: (
        <View isRowWrap align="center">
          {/* <FileRenderer
              isUpdateOnChange
              url={profile?.avatarUrl}
              imageClassName="cmp-navbar__avatar cmp-navbar__end--avatar cmp-file-upload__avatar"
            /> */}

          <AvatarImage title={getUserNameKey()} className="cmp-navbar__end--avatar" />

          <View className="text-left" renderIf={!showMiniSidebar}>
            <Text>{getUserName()}</Text>
            {/* <Text size={12} className="fw-normal">
              {profile?.department || 'Unknown'}
            </Text> */}
          </View>
        </View>
      ),
      type: NAV_TYPES.isDropDown,
      subItems: [
        showMiniSidebar && {
          label: (
            <View className="text-left">
              <Text>{getUserName()}</Text>
              {/* <Text size={12} className="fw-normal">
                {profile?.department || 'Unknown'}
              </Text> */}
            </View>
          ),
          onClick: () => null,
        },
        {
          icon: <FiUser className="mr-8" />,
          label: 'My Profile',
          onClick: () => Navigator.navigate(PATHS.myProfile),
        },
        {
          icon: <FiLogOut className="mr-8" />,
          label: 'Sign Out',
          onClick: () => console.log('onSignOut(): '),
        },
      ],
    },
  ];

  const navbarUnAuthItems: NavItemType[] = [
    {
      id: 'SignUp',
      label: 'Sign Up',
      href: PATHS.signUp,
      type: NAV_TYPES.isNavlink,
    },
    {
      id: 'LogIn',
      label: 'LOG IN',
      type: NAV_TYPES.isButton,
      onClick: () => {
        Navigator.navigate(PATHS.signIn);
      },
    },
  ];

  const renderNavItems = (item: NavItemType) => {
    switch (item.type) {
      case NAV_TYPES.isNavlink:
        return (
          <NavLink
            key={item.id}
            onClick={() => setToggleNavbar(!toggleNavbar)}
            className="cmp-navbar__end--item cmp-navbar__end--item--link"
            to={item.href}
            label={i18n.t(item.label as string)}
            activeClassName="cmp-navbar__end--item--active"
          />
        );
      case NAV_TYPES.isButton:
        return (
          <Button
            key={item.id}
            variant={item.buttonVar as ButtonVariant}
            label={item.label as string}
            className={cn('cmp-navbar__end--button')}
            onClick={item?.onClick}
            iconPosition="left"
            icon={item?.icon}
          />
        );
      case NAV_TYPES.isText:
        return (
          <Text
            size={14}
            key={item.id}
            onClick={item.onClick}
            className={cn('cmp-navbar__end--item', {
              'cmp-navbar__end--item--link': !!item.onClick,
            })}
          >
            {item.label}
          </Text>
        );
      case NAV_TYPES.isDropDown:
        return (
          <CustomDropdown
            key={item.id}
            containerClassName="cmp-navbar__end--item "
            labelClassName={cn('cmp-navbar__end--dropdown-item')}
            yPosition="bottom"
            xPosition={'left'}
            label={item.label}
            items={item?.subItems
              ?.filter((x) => x)
              ?.map((subItem) => ({
                onClick: subItem?.onClick,
                label: subItem?.label,
                icon: subItem?.icon,
              }))}
          />
        );
      default:
        return item.label;
    }
  };

  const renderNavListItems = (items: Array<any>) => items.map((item) => renderNavItems(item));

  const listItems = isAuthenticated ? navbarAuthItems : navbarUnAuthItems;
  if (!showNavbar) return null;
  return (
    <nav
      className={cn(
        'cmp-navbar navbar jump-down',
        { 'is-show-sidebar': showSidebar },
        { 'is-collapse-sidebar': collapseSidebar },
        { 'is-mini-sidebar': showMiniSidebar }
      )}
      ref={navbarRef}
      role="navigation"
      aria-label="main navigation"
    >
      <View className="cmp-navbar__container c-container">
        <View isRow flexGrow={1} className={cn('cmp-navbar__branch', 'navbar-brand')}>
          <Link className={cn('justify-center')} to={PATHS.root}>
            {/* <Image className={'cmp-navbar__logo'} src={IMAGES.logoLumisightFull} /> */}
            {/* <View className="fw-bold has-text-black cmp-navbar__title"> */}
            {/* {PATH_HEADERS[location.pathname] || _.startCase(location.pathname)} */}
            {/* <Image
              className="cmp-landing-nav__logo hide-on-mobile"
              src={IMAGES.datahouseLogo}
              alt="Unset"
            />
            <Image
              className="cmp-landing-nav__logo hide-on-desktop"
              src={IMAGES.datahouseMiniLogo}
              alt="Unset"
            /> */}
            {/* </View> */}
          </Link>
        </View>

        <View
          id="navigation-menu"
          className={cn('navbar-menu', {
            'is-active': true,
          })}
          flexGrow={1}
        >
          <View isRow className={cn('navbar-end cmp-navbar__end')}>
            {renderNavListItems(listItems)}
            {/* <LanguageSwitch
              containerClassName="cmp-navbar__end--item is-no-margin"
              labelClassName={cn('cmp-navbar__end--dropdown-item')}
            /> */}
          </View>
        </View>
      </View>
    </nav>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
const mapStateToProps = (state: IRootState) => ({
  user: state.auth.cognitoUser,
  isAuthenticated: state.auth.isAuthenticated,
  collapseSidebar: state.content.collapseSidebar,
  showSidebar: state.content.showSidebar,
  showNavbar: state.content.showNavbar,
  showMiniSidebar: state.content.showMiniSidebar,
});

const mapDispatchToProps = {
  onSetCollapseSidebar: setCollapseSidebar,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
