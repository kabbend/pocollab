import { BrowserModule } 		from '@angular/platform-browser';
import { NgModule } 			from '@angular/core';
import { FormsModule }   		from '@angular/forms';
import { BrowserAnimationsModule } 	from '@angular/platform-browser/animations';
import { HttpClientModule } 		from '@angular/common/http';
import { HttpModule } 			from '@angular/http';

import { SuiModule } 			from 'ng2-semantic-ui';

import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, 
         MatSortModule, MatTableModule } from "@angular/material";

import { AppComponent } from './app.component';

import { StoreModule }        from '@ngrx/store';
import { poService, reducer } from './store/po.service';
import { nodeService }        from './store/node.service';
import { AuthService }        from './auth.service';
import { P2PCollabService }   from './store/p2pcollab.service';

import { APP_INITIALIZER } from '@angular/core';
import { AppConfig } from './app.config';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';

export function initializeApp(appConfig: AppConfig) {
  return () => appConfig.load();
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    	BrowserModule,
    	BrowserAnimationsModule,
    	FormsModule,
    	HttpModule,
    	HttpClientModule,
    	SuiModule,
	MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
    	StoreModule.forRoot(reducer)
  ],
  providers: [
	poService,
	nodeService,
   	AuthService,
	P2PCollabService,
	{
      	  provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        },
	AppConfig,
        { provide: APP_INITIALIZER,
         useFactory: initializeApp,
         deps: [AppConfig], multi: true },
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
