import React, { useCallback, useEffect, useMemo } from "react";
import { AppRegistry, ViewProps } from "react-native";

import {
  addHandlerListener,
  addWillDisplayListener,
  removeSubscription,
} from ".";
import {
  HandlerTriggerEventPayload,
  UIMenuDefinition,
} from "./ReactNativeIosContextMenu.types";
import ReactNativeIosContextMenuView from "./ReactNativeIosContextMenuView";
import { processMenuDefinition } from "./utils";

type ContextMenuProps = {
  children: React.ReactNode;
  containerProps?: ViewProps;
  Preview?: React.ComponentType<any>;
  menu: UIMenuDefinition;
  willDisplay?: () => void;
  willEnd?: () => void;
};

const PREVIEW_COMPONENT_TAG = "ContextMenuPreview";

export const ContextMenu = ({
  children,
  containerProps,
  Preview,
  menu,
  willDisplay,
  willEnd,
}: ContextMenuProps) => {
  useEffect(() => {
    if (Preview) {
      AppRegistry.registerComponent(PREVIEW_COMPONENT_TAG, () => Preview, true);
    }
  }, [Preview]);

  const processedMenu = useMemo(() => {
    return processMenuDefinition(menu);
  }, [menu]);

  const handlerTriggered = useCallback(
    (event: HandlerTriggerEventPayload) => {
      console.log(event);
      console.log(Object.entries(processedMenu.handlerMap));
      if (processedMenu && processedMenu.handlerMap[event.value]) {
        processedMenu.handlerMap[event.value]();
      }
    },
    [processedMenu],
  );

  useEffect(() => {
    const sub = addHandlerListener(handlerTriggered);
    return () => removeSubscription(sub);
  }, [handlerTriggered]);

  useEffect(() => {
    if (!willDisplay) {
      return;
    }
    const sub = addWillDisplayListener(willDisplay);
    return () => removeSubscription(sub);
  }, [willDisplay]);

  useEffect(() => {
    if (!willEnd) {
      return;
    }
    const sub = addWillDisplayListener(willEnd);
    return () => removeSubscription(sub);
  }, [willEnd]);

  return (
    <ReactNativeIosContextMenuView
      {...containerProps}
      menu={JSON.stringify(processedMenu.menuDefinitionNative)}
    >
      {children}
    </ReactNativeIosContextMenuView>
  );
};
