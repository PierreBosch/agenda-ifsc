import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ContactProvider {
  private caminho = "https://agenda-ifsc.herokuapp.com/contacts";

  constructor(private http: HttpClient) {}

  buscarTodosContatos() {
    return this.http.get(this.caminho);
  }

  buscarUmContatoEspecifico(id: string) {
    return this.http.get(this.caminho + '/' + id);
  }

  buscarPorContatoPesquisado(searchTerm: string){
    return this.http.get(this.caminho + '?name_like=' + searchTerm);
  }

  salvarContato(contact: any) {
    if(contact.id) {
      return this.http.put(this.caminho + '/' + contact.id, {...contact});
    }else{
      return this.http.post(this.caminho, {...contact});
    }
  }

  removerUmContatoEspecifico(id: string) {
    return this.http.delete(this.caminho + '/' + id)
  }
}
