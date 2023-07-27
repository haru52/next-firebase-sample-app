export const ToShowTodoType = {
  Incomplete: 'incomplete-todos',
  Completed: 'completed-todos',
} as const;

export type ToShowTodoType =
  (typeof ToShowTodoType)[keyof typeof ToShowTodoType];
