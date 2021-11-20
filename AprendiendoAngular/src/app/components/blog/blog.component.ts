import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/models/article';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  providers: [ArticleService]
})
export class BlogComponent implements OnInit {

  public articles:Article[];
  public url: string;

  constructor(
    private _articleService: ArticleService
  ) {
    this.url =Global.url;
   }



ngOnInit(): void {
    this._articleService.getArticles().subscribe({  
        next: response => {if(response.articles){
          this.articles = response.articles;
        }else{

        }
      },
        error: error => console.log("error", error),
        });
      }  
    }

/*
ngOnInit(): void {
    console.log(this._articleService.pruebas());
    this._articleService.getArticles().subscribe(
      response =>{
        console.log(response);
      },
      error => {
        console.log(error);
      }
    )
  }
}

-----------------------------------------------------------
ngOnInit(): void {
    this._articleService.getArticles().subscribe({  
        next: response => console.log(response),
        error: error => console.log("error", error),
        });
      }  
    }
*/