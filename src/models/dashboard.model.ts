export interface IDashboardModel {
  projects: IDashboardProjectModel[];
}

export interface IDashboardProjectModel {
  name: string;
  categories: IDashboardCategoryModel[];
  overview: IDashboardOverviewModel[];
  selected: boolean;
}

export interface IDashboardCategoryModel {
  name: string;
  proportion: number;
}

export interface IDashboardOverviewModel {
  averageHoursInSprint: number;
  averageTasksInSprint: number;
  totalSprints: number;
  totalBacklogTasks: number;
  totalNonSprintTasks: number;
}
