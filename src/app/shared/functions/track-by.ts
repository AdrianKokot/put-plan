export const trackByIndex = function (index: number): number {
  return index;
}

export const trackById = function (index: number, item: { id: number | string }): number | string | undefined {
  return item ? (item.id || undefined) : undefined;
}
