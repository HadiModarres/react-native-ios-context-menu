import React, { useEffect, useState } from "react";

import { ContextMenuRegistry } from "./ContextMenuRegistry";
import { WillDisplayEventPayload } from "./ReactNativeIosContextMenu.types";
import { addWillDisplayListener, removeSubscription } from "./events";

export const ContextMenuPreviewRoot = () => {
  const [currentActiveId, setCurrentActiveId] = useState<undefined | string>(
    undefined,
  );

  const getCurrentActivePreview = (): undefined | React.ReactNode => {
    if (
      !currentActiveId ||
      !ContextMenuRegistry.registeredPreviews[currentActiveId]
    ) {
      return undefined;
    }
    return ContextMenuRegistry.registeredPreviews[currentActiveId]();
  };

  useEffect(() => {
    const willDisplayWrapper = (event: WillDisplayEventPayload) => {
      console.log("going to display");
      console.log(`will display view context menu view with id: ${event.id}`);
      setCurrentActiveId(event.id);
    };
    const sub = addWillDisplayListener(willDisplayWrapper);
    return () => removeSubscription(sub);
  }, []);

  return <>{getCurrentActivePreview()}</>;
};
