export const hideElements = (elements, classToAdd: string = 'hidden', classToRemove: string = 'selected') => elements.forEach(el => {
   el.classList.add(classToAdd);
 });