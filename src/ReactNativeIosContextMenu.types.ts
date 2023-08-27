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
  title: string;
  subtitle?: string;
  image?: UIImageDefinition;
  children: UIMenuChild[];
};

export type UIActionDefinition = {
  title: string;
  subtitle?: string;
  image?: UIImageDefinition;
  handler?: () => void;
};

export type UIMenuChild = {
  action?: { value: UIActionDefinition };
  menu?: { value: UIMenuDefinition };
};

export type UIImageDefinition = {
  systemName: string;
};

/**
 * below type is the type we'll be sending to native
 */
export type UIMenuDefinitionNative = Omit<UIMenuDefinition, "children"> & {
  children: UIMenuChildNative[];
};

export type UIMenuChildNative = {
  action?: { value: UIActionDefinitionNative };
  menu?: { value: UIMenuDefinitionNative };
};

type UIActionDefinitionNative = Omit<UIActionDefinition, "handler"> & {
  handler?: string;
};
