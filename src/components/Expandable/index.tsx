import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';

import './styles.scss';
import { Collapsible, Text, View } from '../common';
import { IRootState } from 'src/redux/rootReducer';

const Expandable: React.FC<Props> = ({
  label,
  children,
  isExpanded = false,
  className,
  variant,
  accordionPosition,
  onToggle = () => {},
}) => {
  const [expanded, setExpanded] = useState(isExpanded);

  //================= Effects =================
  useEffect(() => {
    setExpanded(isExpanded);
  }, [isExpanded]);

  //================= Handlers =================
  const handleToggle = () => {
    setExpanded(!expanded);
    onToggle(!expanded);
  };

  //================= Variables =================

  //================= Render =================
  return (
    <View
      className={cn(
        'cmp-expandable',
        {
          [`cmp-expandable--${variant}`]: variant,
        },
        className,
      )}>
      <View
        className={cn('cmp-expandable__header')}
        onClick={handleToggle}
        isRow
        justify="space-between"
        align="center">
        <Text className={cn('cmp-expandable__label')}>{label}</Text>

        <View className={cn('cmp-expandable__arrow', { 'cmp-expandable__arrow--up': expanded })} />
      </View>
      <Collapsible open={expanded} trigger="" accordionPosition={accordionPosition}>
        <View className={cn('cmp-expandable__body')}>{children}</View>
      </Collapsible>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    label: string | React.ReactNode;
    children: React.ReactNode;
    isExpanded?: boolean;
    className?: string;
    variant?: 'primary' | 'danger' | 'warning' | 'secondary' | '';
    onToggle?: (value: boolean) => void;
    accordionPosition?: string;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Expandable);
