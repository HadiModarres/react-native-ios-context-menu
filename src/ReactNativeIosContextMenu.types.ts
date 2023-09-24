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
  type: "menu";
  title: string;
  subtitle?: string;
  image?: UIImageDefinition;
  children: UIMenuChild[];
};

export type UIActionDefinition = {
  type: "action";
  title: string;
  subtitle?: string;
  image?: UIImageDefinition;
  handler?: () => void;
};

export type UIMenuChild = UIActionDefinition | UIMenuDefinition;

export type UIImageDefinition = {
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
