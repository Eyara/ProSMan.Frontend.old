export interface IDashboardModel {
  averageDayHours: number;
  projects: IDashboradProjectModel[];
}

export interface IDashboradProjectModel {
  name: string;
  categories: IDashboardCategoryModel[];
  sprints: IDashboardSprintModel[];
}

export interface IDashboardCategoryModel {
  name: string;
  proportion: number;
}

export interface IDashboardSprintModel {
  name: string;
  taskCount: number;
  tasks: IDashboardTaskModel[];
}

export interface IDashboardTaskModel {
  date: Date;
  count: number;
}
