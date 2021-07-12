export interface ModalDataModel {
  action: ModalAction;
  id?: string;
  value?: string;
}

export enum ModalAction {
  CREATEROOM = 'Create Room',
  UPDATEROOM = 'Update Room',
  DELETEROOM = 'Delete Room',
  UPDATEMSG = 'Update Message',
}
