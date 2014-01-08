/**
Author : tharindra galahena (inf0_warri0r)
Project: artificial life simulation - greenies and blueies (javascript virson)
Blog : http://www.inf0warri0r.blogspot.com
Date : 08/01/2014
License:

Copyright 2013 Tharindra Galahena

This is free software: you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software
Foundation, either version 3 of the License, or (at your option) any later
version. This is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
details.

* You should have received a copy of the GNU General Public License along with
this. If not, see http://www.gnu.org/licenses/.
*/
function greeny(){
	this.env = new Array();
	this.env_tmp = new Array();
	for(var i = 0; i < 100; i++){
		var tmp = new Array();
		var tmp2 = new Array();
		for(var j = 0; j < 100; j++){
			tmp[j] = 0;
			tmp2[j] = 0;
		}
		this.env[i] = tmp;
		this.env_tmp[i] = tmp2;
	}
}
	
greeny.prototype.reproduct = function(p, q, bluey_env){

	var lst = new Array();
	var i = 0;
	for(var y = q - 1; y < q + 2; y++){
		for(var x = p - 1; x < p + 2; x++){
			if(x >= 0 && y >= 0 && x < 100 && y < 100){
				if(this.env[y][x] == 0 && bluey_env[y][x] == 0){
					lst[i] = [x, y];
					i++;
				}
			}
		}
	}
	if(lst.length > 0){
		var n = Math.floor(Math.random() * (lst.length - 1));
		this.env_tmp[lst[n][1]][lst[n][0]] = 1;
	}
}

greeny.prototype.grow = function(x, y){
	if(this.env[y][x] > 0 && this.env[y][x] < 6)
		this.env_tmp[y][x] = this.env[y][x] + 1;
	else if(this.env[y][x] == 6)
		this.env_tmp[y][x] = this.env[y][x];
}

greeny.prototype.swap = function(){
	for(var y = 0; y < 100; y++){
		for(var x = 0; x < 100; x++){
			this.env[y][x] = this.env_tmp[y][x];
			this.env_tmp[y][x] = 0;
		}
	}
}
	
greeny.prototype.next_gen = function(bluey_env){
	for(var y = 0; y < 100; y++){
		for(var x = 0; x < 100; x++){
			this.grow(x, y);
		}
	}
	for(var y = 0; y < 100; y++){
		for(var x = 0; x < 100; x++){
			if(this.env[y][x] > 0){
				this.reproduct(x, y, bluey_env);
			}
		}
	}

	this.swap()
}
	
greeny.prototype.reset = function(){
	for(var y = 0; y < 100; y++){
		for(var x = 0; x < 100; x++){
			this.env[y][x] = 0;
			this.env_tmp[y][x] = 0;
		}
	}
}
	
function bluey(){
	this.env = new Array();
	this.env_tmp = new Array();
	for(var i = 0; i < 100; i++){
		var tmp = new Array();
		var tmp2 = new Array();
		for(var j = 0; j < 100; j++){
			tmp[j] = 0;
			tmp2[j] = 0;
		}
		this.env[i] = tmp;
		this.env_tmp[i] = tmp2;
	}
}
	
bluey.prototype.reproduct = function(p, q, greeny_env){

	var lst = new Array()
	var i = 0;
	for(var y = q - 1; y < q + 2; y++){
		for(var x = p - 1; x < p + 2; x++){
			if(x >= 0 && y >= 0 && x < 100 && y < 100){
				if(this.env[y][x] == 0 && greeny_env[y][x] > 0){
					lst[i] = [x, y];
					i++;
				}
			}
		}
	}
	if(lst.length > 0){
		var n = Math.floor(Math.random() * (lst.length - 1));
		this.env_tmp[lst[n][1]][lst[n][0]] = 1;
		greeny_env[lst[n][1]][lst[n][0]] = 0;
	}
	this.env_tmp[q][p] = this.env[q][p];
}
	
bluey.prototype.feed = function(p, q, greeny_env){
	var lst = new Array()
	var i = 0;
	for(var y = q - 1; y < q + 2; y++){
		for(var x = p - 1; x < p + 2; x++){
			if(x >= 0 && y >= 0 && x < 100 && y < 100){
				if(greeny_env[y][x] > 2){
					lst[i] = [x, y];
					i++;
				}
			}
		}
	}
	if(lst.length > 0){
		var n = Math.floor(Math.random() * (lst.length - 1));
		this.env_tmp[lst[n][1]][lst[n][0]] = this.env[q][p];
		if(this.env_tmp[lst[n][1]][lst[n][0]] < 6){
			this.env_tmp[lst[n][1]][lst[n][0]] = this.env[q][p] + 1;
		}
		this.env[q][p] = 0;
		greeny_env[lst[n][1]][lst[n][0]] = 0;
	}else{
		if(this.env[q][p] > 0){
			this.env_tmp[q][p] = this.env[q][p] - 1;
		}
	}
}
	
bluey.prototype.swap = function(){
	for(var y = 0; y < 100; y++){
		for(var x = 0; x < 100; x++){
			this.env[y][x] = this.env_tmp[y][x];
			this.env_tmp[y][x] = 0;
		}
	}
}
	
bluey.prototype.next_gen = function(greeny_env){
	for(var y = 0; y < 100; y++){
		for(var x = 0; x < 100; x++){
			if(this.env[y][x] > 0){
				this.feed(x, y, greeny_env);
			}
		}
	}

	this.swap();

	for(var y = 0; y < 100; y++){
		for(var x = 0; x < 100; x++){
			if(this.env[y][x] > 0){
				this.reproduct(x, y, greeny_env);
			}
		}
	}

	this.swap();
}
	
bluey.prototype.reset = function(){
	for(var y = 0; y < 100; y++){
		for(var x = 0; x < 100; x++){
			this.env[y][x] = 0;
			this.env_tmp[y][x] = 0;
		}
	}
}

