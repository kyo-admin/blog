import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

//Importar componentes a los cuales les quiero hacer una pagina exclusiva 

import { HomeComponent } from './components/home/home.component';
import { BlogComponent } from './components/blog/blog.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { PeliculasComponent } from './components/peliculas/peliculas.component';
import { PaginaComponent } from './components/pagina/pagina.component';
import { ErrorComponent } from './components/error/error.component';
import { ArticleComponent } from './components/article/article.component';
import { SearchComponent } from './components/search/search.component';
import { ArticleNewComponent } from './components/article-new/article-new.component';
import { ArticleEditComponent } from './components/article-edit/article-edit.component';
//Array de rutas

const appRoutes: Routes = [
    {path: '', component:HomeComponent},
    {path: 'home', component:HomeComponent},
    {path: 'blog', component: BlogComponent},
    {path: 'blog/articulo/:id',component: ArticleComponent},
    {path: 'blog/crear',component: ArticleNewComponent},
    {path: 'blog/editar/:id',component: ArticleEditComponent},
    {path: 'buscar/:search',component: SearchComponent},
    {path:'formulario', component:FormularioComponent},
    {path: 'peliculas', component: PeliculasComponent},
    //para hacer el parametro opcional creamos las dos rutas identicas
    {path: 'pagina-de-pruebas', component:PaginaComponent},
    // y nos aseguramos que solamente una de ellas lleve el parametro por la url
    {path: 'pagina-de-pruebas/:nombre', component:PaginaComponent},
    //la ruta de error debe ser la última en ser añadida
    {path: '**', component:ErrorComponent}

];

//Exportar el modul de rutas 

export const appRoutingProviders: any[] = [];
//export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
                    