import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  //crearemos este "user" el cual tendrá un constructor para el formulario
  public user: any;
  //
  constructor() {
    this.user={
      nombre:'',
      apellidos:'',
      biografia:'',
      genero:'',
    };
   }

  ngOnInit(): void {
  }
  onSubmit(){
    alert("Formulario enviado");
    console.log(this.user)

  }
}
