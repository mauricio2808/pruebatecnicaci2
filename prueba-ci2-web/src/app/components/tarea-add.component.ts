import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { TareaService } from '../services/tarea.service';
import { Tarea } from '../models/tarea';
import { GLOBAL } from '../services/global';

@Component({
	selector: 'tarea-add',
	templateUrl: '../views/tarea-add.html',
	providers: [TareaService]
})
export class TareaAddComponent{
	public titulo: string;
	public tarea: Tarea;
	public filesToUpload;
	public resultUpload;

	constructor(
		private _tareaService: TareaService,
		private _route: ActivatedRoute,
		private _router: Router
	){
		this.titulo = 'Crear una nueva tarea';
		this.tarea = new Tarea(0,'','','','');
	}

	ngOnInit(){
		console.log('tarea-add.component.ts cargado...');
	}

	onSubmit(){
		console.log(this.tarea);

		if(this.filesToUpload && this.filesToUpload.length >= 1){
			this._tareaService.makeFileRequest(GLOBAL.url+'upload-file', [], this.filesToUpload).then((result) => {
				console.log(result);

				this.resultUpload = result;
				this.tarea.imagen = this.resultUpload.filename;
				this.saveTarea();

			}, (error) =>{
				console.log(error);
			});
		}else{
			this.saveTarea();	
		}

	}

	saveTarea(){
			this._tareaService.addTarea(this.tarea).subscribe(
				response => {
					if(response.code == 200){
						this._router.navigate(['/tareas']);
					}else{
						console.log(response);
					}
				},
				error => {
					console.log(<any>error);
				}
			);
	}

	fileChangeEvent(fileInput: any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
		console.log(this.filesToUpload);
	}
}