import React, { ReactNode, useEffect, useState } from "react";

import { ContextMenuRegistry } from "./ContextMenuRegistry";
import { messageEmitter, resetEmitter } from "./event-emitter";

export const ContextMenuPreviewRoot = () => {
  const [preview, setPreview] = useState<ReactNode>(
    ContextMenuRegistry.activePreview?.(),
  );

  useEffect(() => {
    messageEmitter.on("onSetPreview", () => {
      setPreview(ContextMenuRegistry.activePreview?.());
    });

    return resetEmitter;
  }, []);

  return <>{preview}</>;
};
