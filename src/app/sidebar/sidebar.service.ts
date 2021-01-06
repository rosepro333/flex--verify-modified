import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private sidenav: MatSidenav;
  private sidenav1: MatSidenav;

	public setSidenav(sidenav: MatSidenav) {
		this.sidenav = sidenav;
	}
	public setSidenav1(sidenav: MatSidenav) {
		this.sidenav1 = sidenav;
	}
	

	public open() {
		return this.sidenav.open();
		
	}
	public open1() {
		return this.sidenav1.open();
		
	}



	public close() {
		return this.sidenav.close();
	}
	public close1() {
		return this.sidenav1.close();
	}


	public toggle(): void {
		this.sidenav.toggle();
	}
	public toggle1(): void {
		this.sidenav1.toggle();
	}
}
