export enum CustomField {
   START_DATE
}

export const customFieldConverter = (customField: CustomField): string | undefined => {
   
   const customFieldMap = new Map<CustomField, string>();
   customFieldMap.set(CustomField.START_DATE, 'cf[10015]');
   
   return customFieldMap.get(customField);
}

