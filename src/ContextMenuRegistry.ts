export class ContextMenuRegistry {
  private static nextGeneratedId = 1;

  static activePreview: (() => React.ReactNode) | undefined;

  public static generateUniqueId = (): string => {
    return String(ContextMenuRegistry.nextGeneratedId++);
  };
}
