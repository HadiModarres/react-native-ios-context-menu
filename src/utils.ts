import {
  UIMenuChildNative,
  UIMenuDefinition,
  UIMenuDefinitionNative,
} from "./ReactNativeIosContextMenu.types";
import { generateId } from "./generateId";

export const extractHandlers = (menuDefinition: UIMenuDefinition) => {};

type HandlerMap = Record<string, () => void>;

type ProcessedMenuDefinition = {
  menuDefinitionNative: UIMenuDefinitionNative;
  handlerMap: HandlerMap;
};

export const processMenuDefinition = (
  menuDefinition: UIMenuDefinition,
): ProcessedMenuDefinition => {
  let handlerMap: HandlerMap = {};

  const menuNative: UIMenuDefinitionNative = {
    ...menuDefinition,
    children: menuDefinition.children.map((child): UIMenuChildNative => {
      let processedSubMenu: ProcessedMenuDefinition | undefined;
      let handlerId: string | undefined;

      if (child.menu) {
        processedSubMenu = processMenuDefinition(child.menu.value);
        handlerMap = Object.assign(handlerMap, processedSubMenu.handlerMap);
      }

      if (child.action) {
        handlerId = generateId();
        handlerMap = Object.assign(handlerMap, {
          [handlerId]: child.action.value.handler,
        });
      }

      return {
        action: child.action
          ? { value: { ...child.action.value, handler: handlerId } }
          : undefined,
        menu: processedSubMenu
          ? { value: processedSubMenu.menuDefinitionNative }
          : undefined,
      };
    }),
  };

  return {
    handlerMap,
    menuDefinitionNative: menuNative,
  };
};
