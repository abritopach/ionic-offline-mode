import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-dog-modal',
  templateUrl: 'add.dog.modal.html',
  styleUrls: ['./add.dog.modal.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddDogModalComponent implements OnInit {

  modal: any = {
    title: '',
    buttonText: ''
  };

  addDogForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private modalCtrl: ModalController, public navParams: NavParams) {
    this.createForm();
  }

  createForm() {
    this.addDogForm = this.formBuilder.group({
      breed: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.modal = { ...this.navParams.data.modalProps};
  }

  dismiss(data?: any) {
    // Using the injected ModalController this page
    // can "dismiss" itself and pass back data.
    // console.log('dismiss', data);
    this.modalCtrl.dismiss(data);
  }

  addDogFormSubmit() {
  }

  clearAddDogForm() {
    console.log('clearAddDogForm');
    this.addDogForm.reset();
  }

}
