import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import { AppRegistry, ViewProps } from "react-native";

import { ContextMenuPreviewRoot } from "./ContextMenuPreviewRoot";
import { ContextMenuRegistry } from "./ContextMenuRegistry";
import {
  HandlerTriggerEventPayload,
  UIMenuDefinition,
  WillDisplayEventPayload,
} from "./ReactNativeIosContextMenu.types";
import ReactNativeIosContextMenuView from "./ReactNativeIosContextMenuView";
import {
  addHandlerListener,
  addWillDisplayListener,
  removeSubscription,
} from "./events";
import { processMenuDefinition } from "./utils";

export interface ContextMenuProps {
  children: React.ReactNode;
  containerProps?: ViewProps;
  renderPreview?: () => React.ReactNode;
  menu: UIMenuDefinition;
  /**
   *
   * Provide code to be executed when context menu is about to launch
   */
  willDisplay?: () => void;
  /**
   *
   * Provide code to be executed when context menu is about to be closed
   */
  willEnd?: () => void;
}

const PREVIEW_COMPONENT_TAG = "ContextMenuPreview";
AppRegistry.registerComponent(
  PREVIEW_COMPONENT_TAG,
  () => ContextMenuPreviewRoot,
  true,
);

/**
 *
 * @param props
 * @returns JSX.Eelement
 */
export const ContextMenu = (props: ContextMenuProps) => {
  const idRef = useRef(ContextMenuRegistry.generateUniqueId());

  const {
    children,
    containerProps,
    renderPreview,
    menu,
    willDisplay,
    willEnd,
  } = props;

  useLayoutEffect(() => {
    if (renderPreview) {
      ContextMenuRegistry.registeredPreviews[idRef.current] = renderPreview;
    }
  }, [renderPreview]);

  const processedMenu = useMemo(() => {
    return processMenuDefinition(menu);
  }, [menu]);

  const handlerTriggered = useCallback(
    (event: HandlerTriggerEventPayload) => {
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
    const willDisplayWrapper = (event: WillDisplayEventPayload) => {
      console.log("going to display");
      console.log(`will display view context menu view with id: ${event.id}`);
      // ContextMenuRegistry.currentActiveId = event.id;

      willDisplay?.();
    };
    const sub = addWillDisplayListener(willDisplayWrapper);
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
      showPreview={Boolean(renderPreview)}
      id={idRef.current}
      menu={JSON.stringify(processedMenu.menuDefinitionNative)}
    >
      {children}
    </ReactNativeIosContextMenuView>
  );
};
