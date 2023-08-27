import {
  NativeModulesProxy,
  EventEmitter,
  Subscription,
} from "expo-modules-core";

import {
  ChangeEventPayload,
  HandlerTriggerEventPayload,
  WillDisplayEventPayload,
  WillEndEventPayload,
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

export function addWillDisplayListener(
  listener: (event: WillDisplayEventPayload) => void,
): Subscription {
  return emitter.addListener<WillDisplayEventPayload>("willDisplay", listener);
}

export function addWillEndListener(listener: () => void): Subscription {
  return emitter.addListener<WillEndEventPayload>("willEnd", listener);
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
