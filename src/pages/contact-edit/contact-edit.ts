import { Component } from "@angular/core";
import { NavController, NavParams, ActionSheetController } from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ContactProvider } from "../../providers/contact/contact";
import { Camera, CameraOptions } from '@ionic-native/camera';



@Component({
  selector: "page-contact-edit",
  templateUrl: "contact-edit.html"
})
export class ContactEditPage {
  actionDescription: string;
  form: FormGroup;
  base64Image:string;
  contact: any;

  constructor(
    private formBuilder: FormBuilder,
    private provider: ContactProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    private actionSheetCtrl: ActionSheetController,
    private camera: Camera
  ) {
    this.contact = this.navParams.data.contact || {};
    this.criarFormularioNovoContato();
    this.configuraDescricaoPagina();

    this.base64Image = this.contact.avatar || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
  }

  public configuraDescricaoPagina() {
    this.actionDescription = this.navParams.data.contact
      ? "Alterar Contato"
      : "Novo Contato";
  }

  public criarFormularioNovoContato() {
    this.form = this.formBuilder.group({
      id: [this.contact.id],
      name: [this.contact.name, Validators.required],
      surname: [this.contact.surname, Validators.required],
      phone: [this.contact.phone, Validators.required],
      email: [this.contact.email, Validators.required]
    });
  }

  public onSubmit() {
    if (this.form.valid) {
      const formValue = {...this.form.value, avatar: this.base64Image}
      this.provider.salvarContatoFirebase(formValue)
      .subscribe(() => {
        this.navCtrl.pop()
      }, (e) => {
        console.log("Deu ruim")
      })
    }
  }

  public escolherFotoAvatar(){

    const actionSheet = this.actionSheetCtrl.create({
      title: 'O que você deseja fazer?',
      buttons: [
        {
          text: 'Escolher foto da galeria',
          handler: () => {
            this.escolherFotoDaGaleria();
          }
        },
        {
          text: 'Tirar foto com a câmera',
          handler: () => {
           this.tirarFotoComCamera();
          }
        },
        {
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
  

  public escolherFotoDaGaleria(){
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,      
      encodingType: this.camera.EncodingType.JPEG, 
      mediaType: this.camera.MediaType.PICTURE,     
    }

    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
     }, (err) => {
       console.log("Deu erro");
     });
  }

  public tirarFotoComCamera(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
    }
    
    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
     }, (err) => {
       console.log("Deu erro");
     });
  }
}
