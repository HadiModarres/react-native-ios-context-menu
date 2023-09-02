export class ContextMenuRegistry {
  private static nextGeneratedId = 1;

  // static currentActiveId: undefined | string = undefined;
  static registeredPreviews: Record<string, () => React.ReactNode> = {};

  public static generateUniqueId = (): string => {
    return String(ContextMenuRegistry.nextGeneratedId++);
  };

  // static getCurrentActivePreview = (): undefined | React.ReactNode => {
  //   if (!ContextMenuRegistry.currentActiveId) {
  //     return undefined;
  //   }
  //   return ContextMenuRegistry.registeredPreviews[
  //     ContextMenuRegistry.currentActiveId
  //   ];
  // };
}
