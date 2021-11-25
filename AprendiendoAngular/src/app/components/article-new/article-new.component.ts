import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { Global } from 'src/app/services/global';
/*url: Global.url+'upload-image/:id'*/
/*url: Global.url+'upload-image/'+this.article._id*/


@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.css'],
  providers: [ArticleService]
})
export class ArticleNewComponent implements OnInit {
  public article: Article;
  public status: string;
  public user: any;
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
  replaceTexts:{ 
    attachPinBtn: 'subir imagen...',
    //attachPinText: 'subir imagen...',
  }
};


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _articleService: ArticleService
  ) {
    this.article = new Article('', '', '', null, null);


  }

  ngOnInit() {
  }

  onSubmit() {
    this._articleService.create(this.article).subscribe(
      response => {
        if (response.status == 'success') {
          this.status = 'success';
          this.article = response.article;
          this._router.navigate(['/blog']);
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

  imageUpload(data:any){
    //let image_data = JSON.parse(data.response);
    this.article.image = data.body.image;
    console.log(data);
    console.log(data.body);
    console.log(data.body.image);

  }
}

