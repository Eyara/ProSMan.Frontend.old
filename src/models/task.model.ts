import { ILookupViewModel } from "@/models/lookup.model";

export interface ITaskModel extends ILookupViewModel {
  actualSpentTime: number;
  categoryId: string;
  date: Date;
  description: string;
  finishedOn: Date;
  isFinished: boolean;
  // Currently priority is a number but it will enum in the future
  priority: number;
  projectId: string;
  sprintId: string;
  timeEstimate: number;
}
