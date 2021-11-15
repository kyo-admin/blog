import { Component, OnInit } from '@angular/core';
// Estos comandos se importan para poder extraer un valor desde la url
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.css']
})
export class PaginaComponent implements OnInit {
//en el constructor debo imoortar el Router, ActivatedRoute

  public nombre: undefined ;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit(): void {

    this._route.params.subscribe((params: Params)=>{
      //console.log(params);
      this.nombre = params['nombre'];
    });

  }

}
