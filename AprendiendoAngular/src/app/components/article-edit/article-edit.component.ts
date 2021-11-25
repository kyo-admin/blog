import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { Global } from 'src/app/services/global';
import swal from 'sweetalert';


@Component({
  selector: 'app-article-edit',
  templateUrl: '../article-new/article-new.component.html',
  styleUrls: ['./article-edit.component.css'],
  providers: [ArticleService]

})
export class ArticleEditComponent implements OnInit {

  public article: Article;
  public status: string;
  public user: any;
  public is_edit: boolean;
  public page_title: string;
  public url: string;
  /*
  afuConfig = {
    uploadAPI: {
      url: Global.url+'upload-image'    }
};
*/

  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png, .gif, .jpeg",
    uploadAPI: {
      url: Global.url + 'upload-image'// + this.article._id,
    },

    theme: "attachPin",
    replaceTexts: {
      attachPinBtn: 'subir imagen...',
      //attachPinText: 'subir imagen...',
    }
  };


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _articleService: ArticleService,
  ) {
    this.article = new Article('', '', '', null, null);
    this.is_edit = true;
    this.page_title = 'Editar Usuario';
    this.url = Global.url;
  }
  ngOnInit(): void {
    this.getArticle();
    console.log(this.article);

  }
  onSubmit() {
    this._articleService.update(this.article._id,this.article).subscribe(
      response => {
        if (response.status == 'success') {
          this.status = 'success';
            //this.article = response.articleUpdated;
            this.article = response.articleUpdated;
          //this._router.navigate(['/blog/articulo/',this.article._id]);
          this._router.navigate(['/blog']);
          /////////////////////////////////////////////////
          swal("Usuario editado!", "el usuario ha sido editado correctamente!", "success");
          /////////////////////////////////////////////////
          console.log(this.article);
        } else {
          this.status = 'error';
        }
      },
      error => {
        console.log(error);
        this.status = 'error';
      }
    );
  }

  imageUpload(data: any) {
    //let image_data = JSON.parse(data.response);
    this.article.image = data.body.image;

  }
  getArticle() {
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

}



