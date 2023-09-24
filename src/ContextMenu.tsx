import React, { useCallback, useMemo, useRef } from "react";
import { AppRegistry, ViewProps } from "react-native";

import { ContextMenuPreviewRoot } from "./ContextMenuPreviewRoot";
import { ContextMenuRegistry } from "./ContextMenuRegistry";
import {
  OnHandlerTriggerEvent,
  UIMenuDefinition,
} from "./ReactNativeIosContextMenu.types";
import ReactNativeIosContextMenuView from "./ReactNativeIosContextMenuView";
import { messageEmitter } from "./event-emitter";
import { processMenuDefinition } from "./utils";

export interface ContextMenuProps {
  children: React.ReactNode;
  containerProps?: ViewProps;
  /**
   *
   * Specify the content to be rendered in the preview container when context menu shows
   * If not provided context menu preview is disabled
   */
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

  const processedMenu = useMemo(() => {
    return processMenuDefinition(menu);
  }, [menu]);

  const handlerTriggered = useCallback(
    (event: OnHandlerTriggerEvent) => {
      const { value } = event.nativeEvent;
      if (processedMenu && processedMenu.handlerMap[value]) {
        processedMenu.handlerMap[value]();
      }
    },
    [processedMenu],
  );

  const onWillDisplay = useCallback(() => {
    if (renderPreview) {
      ContextMenuRegistry.activePreview = renderPreview;
      messageEmitter.emit("onSetPreview");
    }
    willDisplay?.();
  }, [willDisplay]);

  const onWillEnd = useCallback(() => {
    willEnd?.();
  }, [willEnd]);

  return (
    <ReactNativeIosContextMenuView
      {...containerProps}
      showPreview={Boolean(renderPreview)}
      id={idRef.current}
      menu={JSON.stringify(processedMenu.menuDefinitionNative)}
      onWillDisplay={onWillDisplay}
      onWillEnd={onWillEnd}
      onTriggerHandler={handlerTriggered}
    >
      {children}
    </ReactNativeIosContextMenuView>
  );
};
