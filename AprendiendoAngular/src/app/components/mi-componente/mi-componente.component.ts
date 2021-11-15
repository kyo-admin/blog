import { Component } from "@angular/core";

@Component({
    selector: "app-mi-componente",
    templateUrl: './mi-componente.component.html'
})
export class MiComponente{

    public nombre: string;
    public apellidos: string;
    public email: string;
    constructor(){
        this.nombre = "Claudio";
        this.apellidos = "Illanes Lobos";
        this.email = "claudioillaneslobos@gmail.com";
        console.log("componente cargado");
    }
}