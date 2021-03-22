export interface TypingStage {
  type: StageType;
  value: string;
  delay: number;
  duration: number;
}

export enum StageType {
  ADD_LAST,
  REMOVE_LAST,
}
