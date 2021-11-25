import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { Article} from 'src/app/models/article';
import { Global } from 'src/app/services/global';
import swal from 'sweetalert';



@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers: [ArticleService]
})
export class ArticleComponent implements OnInit {

  public article: Article;
  public url: string;


  constructor(
    private _articleService: ArticleService, 
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.url = Global.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params['id'];

      this._articleService.getArticle(id).subscribe({
        next: response => {
          if (response.article) {
            this.article = response.article;
          } else {
            this._router.navigate(['/home']);
          }

        },
        error: error => {
          console.log(error);
          this._router.navigate(['/home']);
        }
      }
      );
    });
  }
  delete(id: string){
    swal({
      title: "¿Está seguro de eliminar este Usuario?",
      text: "Una vez eliminado, ¡no podrá recuperar este archivo!",
      icon: "warning",
      //buttons: true,
      buttons:["conservar !", "Eliminar definitivamente"],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        //
        this._articleService.delete(id).subscribe(
          response =>{
            swal("¡Tu archivo se ha eliminado!", {
              icon: "success",
            });
            this._router.navigate(['/blog']);        
          },
          error =>{
            console.log(error);
            this._router.navigate(['/blog']);
    
          }
        );
        //
        
      } else {
        swal("¡Tu archivo NO se ha eliminado!");
      }
    });

    
  }

}



/*

delete(id: string){
  this._articleService.delete(id).subscribe(
    response =>{
      this._router.navigate(['/blog']);
      //swal("Usuario Eliminado!", "el usuario ha sido Eliminado de la base de datos!", "success");
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    },
    error =>{
      console.log(error);
      this._router.navigate(['/blog']);

    }
  );
}

}

*/





