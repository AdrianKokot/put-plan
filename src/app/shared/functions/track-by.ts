export const trackByField = function (fieldName: string) {
  return function (index: any, item: any): any {
    return item ? (item[fieldName] || undefined) : undefined;
  }
}

export const trackByIndex = function (index: any, item: any): any {
  return index;
}
