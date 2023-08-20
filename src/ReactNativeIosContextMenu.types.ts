import { ViewProps } from "react-native";

export type ChangeEventPayload = {
  value: string;
};

export type PreviewWillLoadEventPayload = {
  value: string;
};

export type PreviewWillEndEventPayload = {
  value: string;
};

export type HandlerTriggerEventPayload = {
  value: string;
};

export type ReactNativeIosContextMenuViewProps = ViewProps & {
  menu: string;
};

export type UIMenuDefinition = {
  title: string;
  subtitle?: string;
  children: UIMenuChild[];
};

type UIActionDefinition = {
  title: string;
  subtitle?: string;
  handler?: () => void;
};

type UIMenuChild = {
  action?: { value: UIActionDefinition };
  menu?: { value: UIMenuDefinition };
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
