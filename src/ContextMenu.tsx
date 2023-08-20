import * as React from "react";
import { View, Text, AppRegistry } from "react-native";

import { addHandlerListener, removeSubscription } from ".";
import {
  HandlerTriggerEventPayload,
  UIMenuDefinition,
} from "./ReactNativeIosContextMenu.types";
import ReactNativeIosContextMenuView from "./ReactNativeIosContextMenuView";
import { processMenuDefinition } from "./utils";

const ContextMenuPreview = () => {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "red",
        alignItems: "center",
        justifyContent: "center",
        borderColor: "white",
        borderWidth: 12,
      }}
    >
      <Text>context menu preview</Text>
    </View>
  );
};

AppRegistry.registerComponent("ContextMenuPreview", () => ContextMenuPreview);

type ContextMenuProps = {
  children: React.ReactNode;
  preview: React.ReactNode;
  menu: UIMenuDefinition;
};

export const ContextMenu = ({ children, preview, menu }: ContextMenuProps) => {
  const processedMenu = React.useMemo(() => {
    return processMenuDefinition(menu);
  }, [menu]);

  const handlerTriggered = React.useCallback(
    (event: HandlerTriggerEventPayload) => {
      console.log(event);
      console.log(Object.entries(processedMenu.handlerMap));
      if (processedMenu && processedMenu.handlerMap[event.value]) {
        processedMenu.handlerMap[event.value]();
      }
    },
    [processedMenu],
  );

  React.useEffect(() => {
    const sub = addHandlerListener(handlerTriggered);
    return () => removeSubscription(sub);
  }, [handlerTriggered]);

  return (
    <ReactNativeIosContextMenuView
      style={{ width: 300, height: 300, borderColor: "red", borderWidth: 1 }}
      menu={JSON.stringify(processedMenu.menuDefinitionNative)}
    >
      <View collapsable={false}>{children}</View>
    </ReactNativeIosContextMenuView>
  );
};
