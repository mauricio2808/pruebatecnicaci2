import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TareaService } from '../services/tarea.service';
import { Tarea } from '../models/tarea';
import { GLOBAL } from '../services/global';

@Component({
	selector: 'tarea-edit',
	templateUrl: '../views/tarea-add.html',
	providers: [TareaService]
})
export class TareaEditComponent{
	public titulo: string;
	public tarea: Tarea;
	public filesToUpload;
	public resultUpload;
	public is_edit;

	constructor(
		private _tareaService: TareaService,
		private _route: ActivatedRoute,
		private _router: Router
	){
		this.titulo = 'Editar tarea';
		this.tarea = new Tarea(1,'','','','');
		this.is_edit = true;
	}

	ngOnInit(){
		console.log(this.titulo);
		this.getTarea();
	}

	onSubmit(){
		console.log(this.tarea);

		if(this.filesToUpload && this.filesToUpload.length >= 1){
			this._tareaService.makeFileRequest(GLOBAL.url+'upload-file', [], this.filesToUpload).then((result) => {
				console.log(result);

				this.resultUpload = result;
				this.tarea.imagen = this.resultUpload.filename;
				this.updateTarea();

			}, (error) =>{
				console.log(error);
			});
		}else{
			this.updateTarea();	
		}

	}

	updateTarea(){
		this._route.params.forEach((params: Params) => {
			let id = params['id'];

			this._tareaService.editTarea(id, this.tarea).subscribe(
				response => {
					if(response.code == 200){
						this._router.navigate(['/tarea', id]);
					}else{
						console.log(response);
					}
				},
				error => {
					console.log(<any>error);
				}
			);
		});
	}

	fileChangeEvent(fileInput: any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
		console.log(this.filesToUpload);
	}

	getTarea(){
		this._route.params.forEach((params: Params) => {
			let id = params['id'];

			this._tareaService.getTarea(id).subscribe(
				response => {
					if(response.code == 200){
						this.tarea = response.data;
					}else{
						this._router.navigate(['/tareas']);
					}
				},
				error => {
					console.log(<any>error);
				}
			);
		});
	}
}