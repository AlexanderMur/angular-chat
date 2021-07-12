import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatComponent } from './components/chat/chat.component';
import { LoginComponent } from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {appEffects, appReducer} from './store';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {OverlayscrollbarsModule} from 'overlayscrollbars-ngx';
import {LikeComponent} from './components/chat/like/like.component';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {AvatarModule} from 'ngx-avatar';
import {HttpClientModule} from '@angular/common/http';
import { ModalContainerComponent } from './components/modal-container/modal-container.component';
import { ClickStopPropagationDirective } from './directives/click-stop-propagation.directive';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginComponent,
    RegisterComponent,
    LikeComponent,
    ModalContainerComponent,
    ClickStopPropagationDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    OverlayscrollbarsModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot(appEffects),
    AvatarModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: true, // Restrict extension to log-only mode
    }),
    NgbModule,
  ],
  providers: [],
  entryComponents:[
    ModalContainerComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
