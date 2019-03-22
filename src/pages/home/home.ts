import { ContactEditPage } from "./../contact-edit/contact-edit";
import { Component } from "@angular/core";
import { NavController, ActionSheetController, AlertController, LoadingController } from "ionic-angular";
import { ContactProvider } from "../../providers/contact/contact";

import { Observable } from "rxjs";
import { ContactDetailsPage } from "../contact-details/contact-details";
import { Contact } from "../../models/contact.model";
import { FormControl } from "@angular/forms";
import 'rxjs/add/operator/debounceTime';


@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  contacts:Observable<any>;
  haveContacts:boolean;
  searchTerm: string = '';
  searchControl: FormControl;
  searching: any = false;

  constructor(
    public navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController,
    private provider: ContactProvider,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
  ) {
    this.searchControl = new FormControl();
  }
  ionViewDidEnter(){

    this.setarResultadosDoFiltro();

    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
        this.searching = false;
        this.setarResultadosDoFiltro();
    });
  }



   setarResultadosDoFiltro() {
    const loading = this.loadingCtrl.create({spinner: 'crescent',content: 'Carregando contatos..'});
 
     loading.present()
      this.contacts =  this.provider.buscarPorContatoPesquisado(this.searchTerm);
     loading.dismiss()
  }

  aoDigitarAlgoNoCampo(){
    this.searching = true;
  }


  irParaPaginaAdicionarNovoContato() {
    this.navCtrl.push(ContactEditPage);
  }

  abrirOpcoesDeContato(contact){
    
      const actionSheet = this.actionSheetCtrl.create({
        title: 'O que você deseja fazer com ' + contact.name + ' ?',
        buttons: [
          {
            text: 'Ver mais informações',
            handler: () => {
              this.navCtrl.push(ContactDetailsPage, {contact})
            }
          },
          {
            text: 'Atualizar informações',
            handler: () => {
              this.navCtrl.push(ContactEditPage, {contact})
            }
          },{
            text: 'Remover contato',
            handler: () => {
              this.mostrarAlertaParaExclusaoDeContato(contact);
            }
          },{
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      actionSheet.present();
  
    
  }

  mostrarAlertaParaExclusaoDeContato(contact: Contact) {
    const alert = this.alertCtrl.create({
      title: 'Excluir contato?',
      subTitle: 'Você tem certeza que deseja excluir ' + contact.name + ' ?',
      buttons: [
        {
          text:"Cancelar"
        },
        {
          text:"Sim",
          handler: () => {
            this.provider.removerUmContatoEspecifico(contact.id)
              .subscribe(() => {
                this.ionViewDidEnter();
              })
          }
        }
      ]
    });
    alert.present();
  }
}
