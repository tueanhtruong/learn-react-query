import React, { useEffect, useState } from 'react';
import { View } from 'src/components/common';
import cn from 'classnames';
import { Callback } from 'src/redux/types';
import './styles.scss';
import { getRandomId } from 'src/utils';

type Option = {
  id: string;
  label: string;
};

const DEFAULT_TABS = [
  { id: 'INBOUND', label: 'Inbound' },
  { id: 'OUTBOUND', label: 'Outbound' },
];

export const TabsBar: React.FC<Props> = ({
  tabs,
  onSelect,
  selected,
  label,
  isShowTabs = true,
  sideButton,
  className,
}) => {
  const elementId = getRandomId();
  const testingTabs: Option[] = tabs || DEFAULT_TABS;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pos, setPos] = useState(0);
  const [width, setWidth] = useState(0);
  const [hasTransition, setHasTransition] = useState(false);

  const handleSelect = (id) => {
    onSelect && onSelect(id);
    setHasTransition(true);
  };

  useEffect(() => {
    setTimeout(async () => {
      const $rootElement = document
        .querySelector(`#cmp-tab-tabs-${elementId}`)
        ?.getBoundingClientRect();
      const $element = document
        .querySelector(`#cmp-tab-tab__selected-${elementId}`)
        ?.getBoundingClientRect();

      if ($element) {
        const isOverTabsBarRight =
          $rootElement.x + $rootElement.width < $element.x + $element.width + 100;
        const isOverTabsBarLeft = $element.x - $rootElement.x < 100;
        if (isOverTabsBarRight) {
          const $selectedElement = document.querySelector(`.cmp-tab-tab__bar-${elementId}`);
          $selectedElement.scrollLeft += 200;
        }
        if (isOverTabsBarLeft) {
          const $selectedElement = document.querySelector(`.cmp-tab-tab__bar-${elementId}`);
          $selectedElement.scrollLeft -= 200;
        }

        setPos($element.x - $rootElement.x);
        setWidth($element.width);
      }
    }, 180);
  }, [selected, elementId]);

  return (
    <View id={`cmp-tab-tabs-${elementId}`} className={cn('cmp-tab-tabs')}>
      <View isRow align="center" justify="space-between" className="mb-16">
        {typeof label === 'string' ? <h3>{label}</h3> : label}
      </View>

      <View
        className={cn('cmp-tab-tab__wrapper')}
        isRow
        justify="space-between"
        renderIf={isShowTabs}
      >
        <View isRow className={cn('cmp-tab-tab__bar', `cmp-tab-tab__bar-${elementId}`)}>
          {testingTabs.map((item) => (
            <View
              id={item.id === selected ? `cmp-tab-tab__selected-${elementId}` : ''}
              className={cn(
                'cmp-tab-tab',
                `cmp-tab-tab-${elementId}`,
                {
                  'cmp-tab-tab__selected': item.id === selected,
                },
                className
              )}
              onClick={() => handleSelect(item.id)}
              key={`trip-tab-${item.id}`}
            >
              {item.label}
            </View>
          ))}
        </View>
        <View className={cn('cmp-tab-tab__side-button')} renderIf={!!sideButton}>
          {sideButton}
        </View>

        <View
          className={cn(
            'cmp-tab-tab__highlight',
            !hasTransition && 'cmp-tab-tab__highlight--no-transition',
            selected === 'ALL' && 'cmp-tab-tab__highlight--hidden'
          )}
          style={{ left: `${pos}px`, width }}
        />
      </View>
    </View>
  );
};

type Props = {
  tabs?: Option[];
  onSelect?: Callback;
  selected?: string;
  label?: string | React.ReactNode;
  isShowTabs?: boolean;
  sideButton?: React.ReactNode;
  className?: string;
};
