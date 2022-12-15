import { MoviesComponent } from './components/movies/movies.component';
import { WatchableComponent } from './components/watchable/watchable.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthorizationGuard } from './guards/authorization.guard';
import { TokenInterceptor } from './security/token.interceptor';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate:[AuthorizationGuard]
  },
  {
    path: "movies",
    component: MoviesComponent,
    canActivate:[AuthorizationGuard],
  },
  {
    path: "movies/:id",
    component: WatchableComponent,
    canActivate:[AuthorizationGuard]
  },
  {
    path: "tv-series",
    component: MoviesComponent,
    canActivate:[AuthorizationGuard]
  },
  {
    path: "tv-series/:id",
    component: WatchableComponent,
    canActivate:[AuthorizationGuard]
  },
  {
    path: "trending",
    component: MoviesComponent,
    canActivate:[AuthorizationGuard]
  },
  {
    path: "trending/:id",
    component: WatchableComponent,
    canActivate:[AuthorizationGuard]
  },
  {
    path: "favourites",
    component: MoviesComponent,
    canActivate:[AuthorizationGuard]
  },
  {
    path: "favourites/:id",
    component: WatchableComponent,
    canActivate:[AuthorizationGuard]
  }
];

@NgModule({
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptor,
      multi:true
    }
  ],
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
