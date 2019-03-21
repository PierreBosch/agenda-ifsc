import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Contact } from '../../models/contact.model';
import { ContactEditPage } from '../contact-edit/contact-edit';

@Component({
  selector: 'page-contact-details',
  templateUrl: 'contact-details.html',
})
export class ContactDetailsPage {

  contact:Contact;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.contact = this.navParams.data.contact || {};
  }


  irParaEdicaoDeContato(){
    const contact = this.contact;
    this.navCtrl.push(ContactEditPage, {contact})
  }
  

}
