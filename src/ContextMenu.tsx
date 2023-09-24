import React, { useCallback, useEffect, useMemo, useRef } from "react";
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

  /**
   *
   * Specification for the opened menu, this type closely follows the definitions at https://developer.apple.com/documentation/uikit/uimenu
   */
  menu: UIMenuDefinition;
  /**
   *
   * Provide code to be executed when context menu is about to launch
   */
  onWillDisplay?: () => void;
  /**
   *
   * Provide code to be executed when context menu is about to be closed
   */
  onWillEnd?: () => void;
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
  const isActive = useRef(false);

  const {
    children,
    containerProps,
    renderPreview,
    menu,
    onWillDisplay,
    onWillEnd,
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

  useEffect(() => {
    if (isActive.current) {
      ContextMenuRegistry.activePreview = renderPreview;
      messageEmitter.emit("onSetPreview");
    }
  }, [renderPreview]);

  const willDisplay = useCallback(() => {
    console.log("on will display called");
    isActive.current = true;
    if (renderPreview) {
      ContextMenuRegistry.activePreview = renderPreview;
      messageEmitter.emit("onSetPreview");
    }
    onWillDisplay?.();
  }, [onWillDisplay, renderPreview]);

  const willEnd = useCallback(() => {
    if (isActive.current) {
      ContextMenuRegistry.activePreview = () => null;
    }
    isActive.current = false;
    onWillEnd?.();
  }, [onWillEnd]);

  return (
    <ReactNativeIosContextMenuView
      {...containerProps}
      showPreview={Boolean(renderPreview)}
      id={idRef.current}
      menu={JSON.stringify(processedMenu.menuDefinitionNative)}
      onWillDisplay={willDisplay}
      onWillEnd={willEnd}
      onTriggerHandler={handlerTriggered}
    >
      {children}
    </ReactNativeIosContextMenuView>
  );
};
