export interface ICallback {
  onSuccess: VoidFunction;
  onError: VoidFunction;
}

export interface INewTag {
  name: string;
  description: string;
  type: string;
}

export interface ITagItem {
  id: number;
  name: string;
  description: string;
}

export interface IParamUpdate {
  id: number;
  data: INewTag;
}
