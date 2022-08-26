export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export type ContentStore = {
  cities: Todo[];
  countries: Todo[];
  states: Todo[];
  departments: Todo[];
};
