import React, { useEffect, useRef } from 'react';
import { IMessage, IMessageAction, ButtonTypeEnum } from '@novu/shared';

import { AppContent } from './components';
import { useNotifications, useNovuContext } from '../../hooks';
import { NotificationCenterContext } from '../../store/notification-center.context';
import { ITab, ListItem } from '../../shared/interfaces';
import { ColorScheme } from '../../shared/config/colors';
import { INovuThemeProvider, NovuThemeProvider } from '../../store/novu-theme-provider.context';

export interface INotificationCenterProps {
  onUrlChange?: (url: string) => void;
  onNotificationClick?: (notification: IMessage) => void;
  onUnseenCountChanged?: (unseenCount: number) => void;
  header?: () => JSX.Element;
  footer?: () => JSX.Element;
  emptyState?: () => JSX.Element;
  listItem?: ListItem;
  actionsResultBlock?: (templateIdentifier: string, messageAction: IMessageAction) => JSX.Element;
  colorScheme: ColorScheme;
  theme?: INovuThemeProvider;
  onActionClick?: (templateIdentifier: string, type: ButtonTypeEnum, message: IMessage) => void;
  tabs?: ITab[];
  showUserPreferences?: boolean;
  onTabClick?: (tab: ITab) => void;
}

export function NotificationCenter({
  onUnseenCountChanged,
  onUrlChange,
  onNotificationClick,
  onActionClick,
  header,
  footer,
  emptyState,
  listItem,
  actionsResultBlock,
  tabs,
  showUserPreferences,
  onTabClick,
  colorScheme,
  theme,
}: INotificationCenterProps) {
  const { applicationIdentifier } = useNovuContext();
  const { unseenCount } = useNotifications();
  const onUnseenCountChangedRef = useRef(onUnseenCountChanged);
  onUnseenCountChangedRef.current = onUnseenCountChanged;

  useEffect(() => {
    if (onUnseenCountChangedRef.current) {
      onUnseenCountChangedRef.current(unseenCount);
    }
  }, [unseenCount, (window as any).parentIFrame, onUnseenCountChangedRef]);

  return (
    <NotificationCenterContext.Provider
      value={{
        onUrlChange: onUrlChange,
        onNotificationClick: onNotificationClick,
        onActionClick: onActionClick,
        isLoading: !applicationIdentifier,
        header: header,
        footer: footer,
        emptyState: emptyState,
        listItem: listItem,
        actionsResultBlock: actionsResultBlock,
        tabs: tabs,
        showUserPreferences: showUserPreferences ?? true,
        onTabClick: onTabClick ? onTabClick : () => {},
      }}
    >
      <NovuThemeProvider colorScheme={colorScheme} theme={theme}>
        <AppContent />
      </NovuThemeProvider>
    </NotificationCenterContext.Provider>
  );
}
