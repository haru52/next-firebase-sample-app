export const TodosType = {
  Incomplete: 'incomplete-todos',
  Completed: 'completed-todos',
} as const;

export type TodosType = (typeof TodosType)[keyof typeof TodosType];
