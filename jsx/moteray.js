let labeldiv, show_con, input_con, button_con, labelarr = [], labelids = [], labelx, labely, meshname = [];
var halfwidth = window.innerWidth / 2;
var halfheight = window.innerHeight / 2;
var new_mtl;
var new_name;
var new_position;

var xzobj;

function meshlabel() {

	// scene.updateMatrixWorld(true);
	worldpos = xzobj.getWorldPosition().clone();
	let box31 = new THREE.Box3();
	box31.expandByObject(xzobj);
	let v31 = new THREE.Vector3();
	centerxz1 = box31.getCenter(v31);
	let labelv31 = new THREE.Vector3(centerxz1);
	labelpos = centerxz1.project(camera);
	
	let labelx, labely;
	if( labelpos.x < 0 ) {
		if( labelpos.x < -0.15 ) {
			labelx = labelpos.x * halfwidth * 2 + halfwidth;
		} else {
			if( labelpos.x > -0.15 && labelpos.x < -0.1 ) {
				labelx = labelpos.x * halfwidth * 4 + halfwidth;
			} else {
				if( labelpos.x > -0.1 && labelpos.x < -0.02 ) {
					labelx = labelpos.x * halfwidth * 10 + halfwidth;
				} else {
					if( labelpos.x > -0.02 && labelpos.x < -0.001 ) {
						labelx = labelpos.x * halfwidth * 60 + halfwidth;
					} else {
						labelx = labelpos.x * halfwidth + halfwidth * 0.5;
					};
				};
			};
		};
	} else {
		if( labelpos.x > 0.15 ) {
			labelx = labelpos.x * halfwidth * 1.15 + halfwidth;
		} else {
			if( labelpos.x > 0.1 && labelpos.x < 0.15 ) {
				labelx = labelpos.x * halfwidth * 1.25 + halfwidth;
			} else {
				if( labelpos.x > 0.02 && labelpos.x < 0.1 ) {
					labelx = labelpos.x * halfwidth * 2.2 + halfwidth;
				} else {
					if( labelpos.x > 0.001 && labelpos.x < 0.02 ) {
						labelx = labelpos.x * halfwidth * 8 + halfwidth;
					} else {
						labelx = labelpos.x * halfwidth + halfwidth * 1.15;
					};
				};
			};
		};
	};
	
	
	labeldiv = document.createElement( 'div' );
	labeldiv.setAttribute( 'id', new_name );
	labeldiv.classList.add( 'labeld' );
	// console.log(labelpos, labelx, labely);
	
	labeldiv.innerHTML = "请输入你的建议:";
	labeldiv.style.left = Math.round(labelx) + 'px';
	labeldiv.style.top = Math.round(-labely * halfheight * 1.2 + halfheight) + 'px';
	labeldiv.style.position = 'absolute';
	labeldiv.style.width = '18vw';
	labeldiv.style.padding = '1vw';
	labeldiv.style.backgroundColor = '#EC3D08';
	//labeldiv.style.opacity = 0.8;
	labeldiv.style.display = 'none';
	labelids.push(labeldiv.id);
	// console.log(halfwidth, halfheight, labeldiv.style.left, labeldiv.style.top);
	
	show_con = document.createElement( 'div' );
	show_con.setAttribute( 'onblur', 'showinput()' );
	
	input_con = document.createElement( 'input' );
	input_con.setAttribute( 'type', 'text' );
	input_con.setAttribute( 'id', 'input' + new_name );
	
	button_con = document.createElement( 'input' );
	button_con.setAttribute( 'type', 'button' );
	button_con.setAttribute( 'onclick', 'showinput()' );
	button_con.setAttribute( 'value', '添加' );
	
	
	labeldiv.append( show_con );
	labeldiv.append( input_con );
	labeldiv.append( button_con );
	document.body.appendChild(labeldiv);
	labelarr = document.getElementsByClassName( 'labeld' );
	console.log(labeldiv);
};

function showinput() {
	for( let ii = 0; ii < labelarr.length; ii++ ) {
		if( labelarr[ii].id == new_name ) {
			labelarr[ii].children[0].innerText += labelarr[ii].children[1].value;
		};
	};
};

var onsinclick = function() {
	
	var sinintersects = choose(event);
	
	if (sinintersects[0]) {
		new_name = sinintersects[0].object.name;
		new_style = sinintersects[0].object.style;
		//new_position = sinintersects[0].object.position;
		new_position = sinintersects[0].point;
		//console.log(intersects[0].object.style);
		new_map = sinintersects[0].object.material.map;
		new_nickname = sinintersects[0].object.nickname;
		parentname = sinintersects[0].object.parent.name;
	
		// console.log('顶点数据', sinintersects[0].point);
		sinintersects[0].object.material = sinintersects[0].object.material.clone();
		// console.log(sinintersects[0].point);
		if (xzobj != sinintersects[0].object) {
			if (xzobj) xzobj.material.color.setHex(xzobj.currentHex);
			xzobj = sinintersects[0].object;
			// xzobj.material.transparent = true;
			// xzobj.material.opacity = 0.7;
			
			xzobj.currentHex = xzobj.material.color.getHex();
			xzobj.material.color.set(0xff6300);
			//xzobj.material.needsUpdate= true;
			
			// let showtabel = document.getElementsByClassName( 'labeld' );
			// for( let stb = 0; stb < showtabel.length; stb++ ) {
			// 	if( showtabel[stb].id == xzobj.nickname ) {
			// 		showtabel[stb].style.display = 'block';
			// 		showtabel[stb].classList.add( 'active' );
			// 	} else {
			// 		showtabel[stb].style.display = 'none';
			// 		showtabel[stb].className = 'labeld';
			// 	}
			// }
			
		}
		
	} else {
		if (xzobj) xzobj.material.color.set(xzobj.currentHex);
		
		
	}
	console.log(new_name, sinintersects);
};

var ondblclicks = function() {
	
	var dblintersects = choose(event);
	if (xzobj) xzobj.material.color.set(xzobj.currentHex);
	
	if (dblintersects[0]) {
		if (xzobj != dblintersects[0].object) {
			if (xzobj) xzobj.material.color.setHex(xzobj.currentHex);
			xzobj = dblintersects[0].object;
	    };
		// console.log(dblintersects[0].point);
		
		if( labelarr.length == 0 ) {
			meshlabel();
			labeldiv.style.display = 'block';
			labeldiv.classList.add('active');
			labelin(dblintersects[0].point, dblintersects[0].object.name);
		} else {
		let labelid = [], tt = 0;
		
		for( let j = 0; j < labelarr.length; j++ ) {
			labelid.push(labelarr[j].id);
		};
			for( let i = 0; i < labelarr.length; i++ ) {
				if( labelarr[i].id == new_name ) {
					labelarr[i].style.display = 'block';
					labelarr[i].classList.add('active');
					
				} else {
					labelarr[i].style.display = 'none';
					labelarr[i].classList.remove( 'active' );
					if( labelid.includes( new_name )) {
						console.log(labelarr[i].className);
					} else {
						if( tt == 0 ) {
							meshlabel();
							labelp = document.createElement('div');
							labelin(dblintersects[0].point, dblintersects[0].object.name);
							tt++;
						};
						
					};		
				};	
			};
		};
	} else {
		let hid = document.getElementsByClassName( 'labeld' );
		for( let h = 0; h < hid.length; h++ ) {
			hid[h].style.display = 'none';
		};
	};
};

function labelin(pos, niname) {
	
	let pointpos = new THREE.Vector3()
	
	// pointpos = pos;
	if( pos.z > 0 ) {
		pointpos.z = pos.z + 0.06;
	} else {
		pointpos.z = pos.z - 0.06;
	}
	pointpos.x = pos.x;
	pointpos.y = pos.y;
	
	var yuanxing = new THREE.CircleGeometry( 0.1, 36 );
	var yxmaterial = new THREE.MeshBasicMaterial({ color: 'red' });
	let yxmesh = new THREE.Mesh( yuanxing, yxmaterial );
	// yxmesh.position.set( labelx, labelpos.y + 0.65, labelz );
	yxmesh.position.set( pointpos.x, pointpos.y, pointpos.z );
	yxmesh.material.side = THREE.DoubleSide;
	yxmesh.geometry.needsUpdate = true;
	yxmesh.nickname = niname;
	modelg.add(yxmesh);
	console.log(yxmesh, niname);
	
};


function choose(event) {
	var mouse = new THREE.Vector2();
	// event.preventDefault();
	if (event.touches) {
		mouse.x = 2 * (event.touches[0].clientX / window.innerWidth) - 1;
		mouse.y = 1 - 2 * (event.touches[0].clientY / window.innerHeight);
	} else {
		mouse.x = 2 * (event.clientX / window.innerWidth) - 1;
		mouse.y = 1 - 2 * (event.clientY / window.innerHeight);
	};
	var raycaster = new THREE.Raycaster();
	raycaster.setFromCamera(mouse, camera);

	var intersects = raycaster.intersectObjects(modelg.children, true);
	
	// console.log(raycaster, mouse);
	return intersects;
};

// makeclick( onsinclick, ondblclicks );

function makeclick() {
	var clicks = 1;
	console.log('sfe')
	function timesout(n) {
		i = n;
		console.log('wfwefw')
		var val = setTimeout( "call();", 250 );
		if ( i == 2 ) {
			clearTimeout( val );
			console.log('intersects');
		};
	};
	function call() {
		if ( i == 1 ) {
			onsinclick;
			console.log('intersects');
		} else {
			if ( i == 2 ) {
				ondblclicks;
			};
		};
	};
};

window.addEventListener( 'click', event => onsinclick( event ));
window.addEventListener( 'dblclick', event => ondblclicks( event ));
window.addEventListener( 'touchstart', event => onsinclick( event, true ));
// window.addEventListener( 'doubleTap', event => ondblclicks( event, true ));
// Sition( 'clicked', ondblclicks( event, true ) );
// window.addEventListener( 'click', onsinclick );
// window.addEventListener( 'dblclick', ondblclicks );