import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Tarea } from '../models/tarea';
import { GLOBAL } from './global';

@Injectable()
export class TareaService{
	public url: string;

	constructor(
		public _http: Http
	){
		this.url = GLOBAL.url;
	}

	getTareas(){
		return this._http.get(this.url+'tareas').map(res => res.json());
	}

	getTarea(id){
		return this._http.get(this.url+'tarea/'+id).map(res => res.json());
	}

	addTarea(tarea: Tarea){
		let json = JSON.stringify(tarea);
		let params = 'json='+json;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'tareas', params, {headers: headers})
						 .map(res => res.json());
	}

	editTarea(id, tarea: Tarea){
		let json = JSON.stringify(tarea);
		let params = "json="+json;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'update-tarea/'+id, params, {headers: headers})
						 .map(res => res.json());
	}

	deleteTarea(id){
		return this._http.get(this.url+'delete-tarea/'+id)
						 .map(res => res.json());
	}

	makeFileRequest(url: string, params: Array<string>, files: Array<File>){
		return new Promise((resolve, reject)=>{
			var formData: any = new FormData();
			var xhr = new XMLHttpRequest();

			for(var i = 0; i < files.length; i++){
				formData.append('uploads[]', files[i], files[i].name);
			}

			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4){
					if(xhr.status == 200){
						resolve(JSON.parse(xhr.response));
					}else{
						reject(xhr.response);
					}
				}
			};

			xhr.open("POST", url, true);
			xhr.send(formData);
		});
	}

}