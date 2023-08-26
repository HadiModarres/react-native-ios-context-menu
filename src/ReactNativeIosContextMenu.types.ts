import { ViewProps } from "react-native";

export type ChangeEventPayload = {
  value: string;
};

export type WillDisplayEventPayload = {
  value: string;
};

export type WillEndEventPayload = {
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
  image?: UIImage;
  children: UIMenuChild[];
};

type UIActionDefinition = {
  title: string;
  subtitle?: string;
  image?: UIImage;
  handler?: () => void;
};

type UIMenuChild = {
  action?: { value: UIActionDefinition };
  menu?: { value: UIMenuDefinition };
};

type UIImage = {
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
