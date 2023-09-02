import { ViewProps } from "react-native";

export type ChangeEventPayload = {
  value: string;
};

export type WillDisplayEventPayload = {
  id: string;
};

export type WillEndEventPayload = {
  value: string;
};

export type HandlerTriggerEventPayload = {
  value: string;
};

export type ReactNativeIosContextMenuViewProps = ViewProps & {
  menu: string;
  showPreview: boolean;
  id: string;
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
 * below type is the type we'll be sending to native
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
