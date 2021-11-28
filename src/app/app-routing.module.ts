import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'student-create',
    pathMatch: 'full'
  },
  {
    path: 'student-list',
    loadChildren: () => import('./student-list/student-list.module').then( m => m.StudentListPageModule)
  },
  {
    path: 'student-create',
    loadChildren: () => import('./student-create/student-create.module').then( m => m.StudentCreatePageModule)
  },
  {
    path: 'student-edit/:id',
    loadChildren: () => import('./student-edit/student-edit.module').then( m => m.StudentEditPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
