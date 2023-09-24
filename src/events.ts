import {
  NativeModulesProxy,
  EventEmitter,
  Subscription,
} from "expo-modules-core";

import {
  ChangeEventPayload,
  HandlerTriggerEventPayload,
} from "./ReactNativeIosContextMenu.types";
import ReactNativeIosContextMenuModule from "./ReactNativeIosContextMenuModule";

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
