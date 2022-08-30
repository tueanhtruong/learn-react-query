import { ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import cn from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import { IMAGES } from 'src/appConfig/images';
import { IRootState } from 'src/redux/rootReducer';
import { Callback } from 'src/redux/types';
import { Image, Text, View } from '../common';
import './styles.scss';

const clsPrefix = 'cmp-logo';

export const LogoName = {
  title: 'Unemployment Insurance',
  subTitle: 'State of Hawaii, Department of Labor and Industrial Relations',
};

const Logo: React.FC<Props> = ({
  className = '',
  logoSize = 80,
  title = LogoName.title,
  titleSize = 20,
  subTitle = LogoName.subTitle,
  subTitleSize = 14,
  spacing = 16,
  onClick,
  hideTitle,
  hideSubTitle,
  titleColor,
  subTitleColor,
  isColumn = false,
}) => {
  return (
    <View className={cn(clsPrefix, className, { 'cursor-pointer': !!onClick })} onClick={onClick}>
      {isColumn ? (
        <View className={`${clsPrefix} text-align-center`}>
          <View align="center">
            <Image
              src={IMAGES.dlirLogo}
              className={`${clsPrefix}__img`}
              width={logoSize}
              height={logoSize}
            />
          </View>
          <Text
            size={titleSize}
            className={`fw-bold text-color-black-600 mt-16`}
            color={titleColor ? titleColor : undefined}
          >
            {title}
          </Text>
          <Text
            size={subTitleSize}
            className={`fw-normal text-color-black-400  mt-8`}
            color={subTitleColor ? subTitleColor : undefined}
          >
            {subTitle}
          </Text>
        </View>
      ) : (
        <ListItem
          alignItems="center"
          classes={{ root: className ? className : undefined }}
          disableGutters
        >
          <ListItemAvatar
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Image
              src={IMAGES.dlirLogo}
              className={`${clsPrefix}__img`}
              width={logoSize}
              height={logoSize}
            />
          </ListItemAvatar>
          <ListItemText
            primary={
              !hideTitle ? (
                <span
                  className={`fw-bold text-color-primary-800 ml-${spacing}`}
                  style={{
                    color: titleColor,
                    fontSize: titleSize,
                  }}
                >
                  {title}
                </span>
              ) : null
            }
            secondary={
              !hideSubTitle ? (
                <span
                  className={`fw-normal text-color-gray-400 ml-${spacing}`}
                  style={{
                    color: subTitleColor,
                    fontSize: subTitleSize,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {subTitle}
                </span>
              ) : null
            }
          />
        </ListItem>
      )}
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    className?: string;
    logoSize?: number;
    title?: string;
    titleSize?: number;
    subTitle?: string;
    subTitleSize?: number;
    spacing?: number;
    onClick?: Callback;
    hideTitle?: boolean;
    hideSubTitle?: boolean;
    titleColor?: string;
    subTitleColor?: string;
    isColumn?: boolean;
  };
const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Logo);
