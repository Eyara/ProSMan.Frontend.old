import { ILookupViewModel } from "@/models/lookup.model";

export interface INonSprintTaskModel extends ILookupViewModel {
  date: Date;
  description: string;
  finishedOn: Date;
  isBacklog: boolean;
  isFinished: boolean;
  // Same for this. In the future it will be enum
  priority: 3;
  projectId: string;
  timeEstimate: number;
}
