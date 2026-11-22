// A counter for ids that must be unique within a page, such as the target of aria-describedby.
let n = 0;
export const uid = (prefix = 'id') => `${prefix}-${++n}`;
