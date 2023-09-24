import { NativeSyntheticEvent, ViewProps } from "react-native";

export type ChangeEventPayload = {
  value: string;
};

export type HandlerTriggerEventPayload = {
  value: string;
};

export type OnHandlerTriggerEvent =
  NativeSyntheticEvent<HandlerTriggerEventPayload>;

export type ReactNativeIosContextMenuViewProps = ViewProps & {
  menu: string;
  showPreview: boolean;
  id: string;
  onWillDisplay: () => void;
  onWillEnd: () => void;
  onTriggerHandler: (event: OnHandlerTriggerEvent) => void;
};

export type UIMenuDefinition = {
  /**
   *
   * Menu item type
   */
  type: "menu";
  title: string;
  /**
   *
   * Only works with iOS 15+
   */
  subtitle?: string;
  image?: UIImageDefinition;

  /**
   *
   * Specification for menu items
   */
  children: UIMenuChild[];
};

export type UIActionDefinition = {
  /**
   *
   * Menu item type
   */
  type: "action";
  title: string;
  /**
   *
   * Only works with iOS 15+
   */
  subtitle?: string;
  image?: UIImageDefinition;
  handler?: () => void;
};

/**
 *
 * A child can be an action or a another menu to specify nested menus.
 */
export type UIMenuChild = UIActionDefinition | UIMenuDefinition;

export type UIImageDefinition = {
  /**
   *
   * Name of the SF Symbols image: https://developer.apple.com/sf-symbols/
   */
  systemName: string;
};

/**
 * below type is the type that'll be sent to native
 */
export type UIMenuDefinitionNative = Omit<
  UIMenuDefinition,
  "children" | "type"
> & {
  children: UIMenuChildNative[];
};

export type UIMenuChildNative = {
  action?: { value: UIActionDefinitionNative };
  menu?: { value: UIMenuDefinitionNative };
};

export type UIActionDefinitionNative = Omit<
  UIActionDefinition,
  "handler" | "type"
> & {
  handler?: string;
};
