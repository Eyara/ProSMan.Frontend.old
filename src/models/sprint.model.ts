import { ILookupViewModel } from "@/models/lookup.model";

export interface ISprintModel extends ILookupViewModel {
  finishedOn: Date;
  fromDate: Date;
  isDeleted: boolean;
  isFinished: boolean;
  projectId: string;
}
