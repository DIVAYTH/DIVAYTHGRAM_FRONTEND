import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MatDialogModule} from '@angular/material/dialog';

import {AppComponent} from './components/app/app.component';
import {ModalRegistrationComponent} from './components/modal-registration/modal-registration.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {AccountComponent} from './components/account/account.component';
import {RouterModule, Routes} from "@angular/router";
import {MainComponent} from './components/main/main.component';
import {ModalAuthorizationComponent} from './components/modal-autorization/modal-authorization.component';
import {MatRadioModule} from "@angular/material/radio";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {LoginGuard} from "./guards/login.guard";

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'account', component: AccountComponent, canActivate: [LoginGuard]},
];

@NgModule({
  declarations: [
    AppComponent,
    ModalRegistrationComponent,
    AccountComponent,
    MainComponent,
    ModalAuthorizationComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    MatDialogModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatRadioModule,
    DragDropModule,

  ],
  providers: [LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
