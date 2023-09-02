import {
  UIActionDefinitionNative,
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

export function processMenuDefinition(
  menuDefinition: UIMenuDefinition,
): ProcessedMenuDefinition {
  let handlerMap: HandlerMap = {};

  const children: UIMenuChildNative[] = menuDefinition.children.map((child) => {
    if (child.type === "menu") {
      const submenu = processMenuDefinition(child);

      handlerMap = Object.assign(handlerMap, submenu.handlerMap);

      return { menu: { value: submenu.menuDefinitionNative } };
    } else {
      const id = generateId();
      if (child.handler) {
        handlerMap = Object.assign(handlerMap, {
          [id]: child.handler,
        });
      }

      const action: { value: UIActionDefinitionNative } = {
        value: {
          title: child.title,
          subtitle: child.subtitle,
          image: child.image,
          handler: id,
        },
      };

      return { action };
    }
  });

  const nativeMenu: UIMenuDefinitionNative = {
    title: menuDefinition.title,
    subtitle: menuDefinition.subtitle,
    image: menuDefinition.image,
    children,
  };

  return { menuDefinitionNative: nativeMenu, handlerMap };
}
