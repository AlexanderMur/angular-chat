import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalAction, ModalDataModel} from './modal-data.model';
import {Store} from '@ngrx/store';
import {createRoom, deleteRoom, editMessage, renameRoom} from '../../store/chat';

@Component({
  selector: 'app-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.scss']
})
export class ModalContainerComponent implements OnInit {

  @Input() fromParent: ModalDataModel;

  inputValue: FormControl = new FormControl();
  modalAction = ModalAction;

  constructor(private activeModal: NgbActiveModal, private store: Store) {
  }

  ngOnInit(): void {
    this.inputValue.setValue(this.fromParent.value);
  }

  closeModal(sendData): void {
    this.activeModal.close(sendData);
  }

  onSubmit(): void {

    switch (this.fromParent.action) {
      case ModalAction.CREATEROOM: {
        this.createRoom();
        break;
      }
      case ModalAction.DELETEROOM: {
        this.deleteRoom();
        break;
      }
      case ModalAction.UPDATEROOM: {
        this.updateRoom();
        break;
      }
      case ModalAction.UPDATEMSG: {
        this.updateMsg();
        break;
      }
      default: {
        break;
      }
    }
    this.activeModal.close(this.inputValue.value);
  }

  private createRoom(): void {
    this.store.dispatch(createRoom({name: this.inputValue.value}));
  }

  private deleteRoom(): void {
    this.store.dispatch(deleteRoom({id: this.fromParent.id}));
  }

  private updateRoom(): void {
    this.store.dispatch(renameRoom({id: this.fromParent.id, name: this.inputValue.value}));
  }

  private updateMsg(): void {
    this.store.dispatch(editMessage({id: this.fromParent.id, text: this.inputValue.value}));
  }
}
