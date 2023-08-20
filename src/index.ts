import {
  NativeModulesProxy,
  EventEmitter,
  Subscription,
} from "expo-modules-core";

import {
  ChangeEventPayload,
  HandlerTriggerEventPayload,
  ReactNativeIosContextMenuViewProps,
} from "./ReactNativeIosContextMenu.types";
import ReactNativeIosContextMenuModule from "./ReactNativeIosContextMenuModule";

// Import the native module. On web, it will be resolved to ReactNativeIosContextMenu.web.ts
// and on native platforms to ReactNativeIosContextMenu.ts
export { ContextMenu } from "./ContextMenu";

// Get the native constant value.
export const PI = ReactNativeIosContextMenuModule.PI;

export function hello(): string {
  return ReactNativeIosContextMenuModule.hello();
}

export async function setValueAsync(value: string) {
  return await ReactNativeIosContextMenuModule.setValueAsync(value);
}

const emitter = new EventEmitter(
  ReactNativeIosContextMenuModule ??
    NativeModulesProxy.ReactNativeIosContextMenu,
);

export function addChangeListener(
  listener: (event: ChangeEventPayload) => void,
): Subscription {
  return emitter.addListener<ChangeEventPayload>("onChange", listener);
}

export function addHandlerListener(
  listener: (event: HandlerTriggerEventPayload) => void,
): Subscription {
  return emitter.addListener<HandlerTriggerEventPayload>(
    "handlerTrigger",
    listener,
  );
}

export const removeSubscription = (subscription: Subscription) => {
  emitter.removeSubscription(subscription);
};
