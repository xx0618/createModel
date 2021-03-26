const LOADER = document.getElementById('js-loader');

var namegui, defvalue = {};
var congui = ["nianling", "Height", "neckheight", "neckwei", "jiankuan", "xiongwei", "lufang", "yaowei", "tunwei", "qianbichangdu", "shangbichangdu", 
"qianbiwei", "shangbiwei", "datuichangdu", "xiaotuichangdu", "datuiwei", "xiaotuiwei"];
var namev = ["年龄", "身高", "颈长", "颈宽", "肩宽", "胸围", "乳房", "腰围", "臀围", "前臂长度", "上臂长度", "前臂围", "上臂围",
"大腿长度", "小腿长度", "大腿围", "小腿围"];
var defv = [28, 155, 8, 36, 35, 80, 75, 70, 100, 23, 29, 22, 29, 44, 37, 54, 35];
var minv = [14, 130, 4, 32, 25, 60, 60, 60, 80, 18, 22, 14, 22, 32, 28, 40, 24];
var maxv = [90, 180, 12, 40, 45, 100, 90, 80, 120, 28, 36, 30, 36, 56, 46, 68, 46];

var zvalue = {}, guidat;

  function getFileUrl(sourceId) {
    var url;
    if (navigator.userAgent.indexOf("MSIE") >= 1) { // IE
      url = document.getElementById(sourceId).value;
    } else if (navigator.userAgent.indexOf("Firefox") > 0) { // Firefox
      url = window.URL.createObjectURL(document.getElementById(sourceId).files.item(0));
    } else if (navigator.userAgent.indexOf("Chrome") > 0) { // Chrome
      url = window.URL.createObjectURL(document.getElementById(sourceId).files.item(0));
    }
    return url;
  };
  


var datgui = new dat.GUI();
datgui.width = 200;

for( let n = 0; n < congui.length; n++ ) {
	namegui = congui[n];
	defvalue[ namegui ] = defv[n];
}
for( let i = 0; i < congui.length; i++ ) {
	guidat = datgui.add( defvalue, congui[i] ).min( minv[i] ).max( maxv[i] ).name( namev[i] ).onChange(function( value ) {
		morphfun( congui[i], defv[i], value, maxv[i], minv[i] );
		// console.log(value)
	}).listen();
};


			
function morphfun(name, defv, value, max, min) {
	
	theModel.traverse( o => {
		if( o.isMesh ) {
			
			// for( let i = 0; i < congui.length; i++ ) {
				let morphv1 = value / defv;
				let morphv2 = (value - defv)/(max - min);
				let morphv3 = (value / defv)*2;
				
				
				if( name == "Height" ) {
					
					o.skeleton.bones[0].scale.set( morphv1, morphv1, morphv1 );
				} else if( name == "neckheight" ) {
					o.skeleton.bones[6].position.x = pos[6][0] + morphv2 * 5;
					
				} else if( name == "neckwei" ) {
					o.skeleton.bones[7].scale.set( sca[7][0] + morphv2, sca[7][1], sca[7][2] + morphv2 );
					
					// o.skeleton.bones[8].scale.set( sca[8][0] - morphv2/2, sca[8][1], sca[8][2] - morphv2/2 );
					
				} else if( name == "jiankuan" ) {
					o.skeleton.bones[19].position.z = pos[19][2] - morphv2 * 4;
					o.skeleton.bones[47].position.z = pos[47][2] + morphv2 * 4;
					
				} else if( name == "xiongwei" ) {
					// o.skeleton.bones[3].scale.set( sca[3][0], sca[3][1] + morphv2/4, sca[3][2] + morphv2/4);
					// o.skeleton.bones[4].scale.set( sca[4][0], sca[4][1] + morphv2/4, sca[4][2] + morphv2/4 );
					
					o.skeleton.bones[5].scale.set( sca[5][0], sca[5][1] + morphv2/4, sca[5][2] + morphv2/4 );
					
					o.skeleton.bones[6].scale.set( sca[6][0], sca[6][1] - morphv2/4, sca[6][2] - morphv2/4 );
					o.skeleton.bones[19].scale.set( sca[19][0], sca[19][1] - morphv2/4, sca[19][2] - morphv2/4 );
					o.skeleton.bones[47].scale.set( sca[47][0], sca[47][1] - morphv2/4, sca[47][0] - morphv2/4 );
						
				} else if( name == "lufang" ) {
					o.skeleton.bones[43].scale.set( sca[43][0], sca[43][1] + morphv2 * 2, sca[43][2] + morphv2 * 2);
					o.skeleton.bones[45].scale.set( sca[45][0], sca[45][1] + morphv2 * 2, sca[45][2] + morphv2 * 2);
				} else if( name == "yaowei" ) {
					// o.skeleton.bones[33].scale.set( sca[33][0] + morphv2, sca[33][1], sca[33][2] + morphv2);
					// o.skeleton.bones[3].scale.set( sca[3][0], sca[3][1] + morphv2, sca[3][2] + morphv2);
					o.skeleton.bones[4].scale.set( sca[4][0], sca[4][1] + morphv2/1.5, sca[4][2] + morphv2/1.5);
					o.skeleton.bones[5].scale.set( sca[5][0], sca[5][1] - morphv2/1.5, sca[5][2] - morphv2/1.5);
					
				} else if( name == "tunwei" ) {
					o.skeleton.bones[2].scale.set( sca[2][0] + morphv2/2, sca[2][1], sca[2][2] + morphv2/2);
				} else if( name == "qianbichangdu" ) {
					
					o.skeleton.bones[21].scale.x = sca[21][0] + morphv2/2;
					o.skeleton.bones[49].scale.x = sca[49][0] + morphv2/2;
					o.skeleton.bones[24].scale.x = sca[24][0] - morphv2/2;
					o.skeleton.bones[52].scale.x = sca[52][0] - morphv2/2;
				} else if( name == "shangbichangdu" ) {
					o.skeleton.bones[20].scale.x = sca[20][0] + morphv2/2;
					o.skeleton.bones[48].scale.x = sca[48][0] + morphv2/2;
					o.skeleton.bones[21].scale.x = sca[21][0] - morphv2/2;
					o.skeleton.bones[49].scale.x = sca[59][0] - morphv2/2;
				} else if( name == "qianbiwei" ) {
					o.skeleton.bones[22].scale.set( sca[22][0] + morphv2/2, sca[22][1], sca[22][2] + morphv2/2);
					o.skeleton.bones[51].scale.set( sca[51][0] + morphv2/2, sca[51][1], sca[51][2] + morphv2/2);
					
				} else if( name == "shangbiwei" ) {
					o.skeleton.bones[41].scale.set( sca[41][0], sca[41][1] + morphv2/2, sca[41][2] + morphv2/2);
					o.skeleton.bones[69].scale.set( sca[69][0], sca[69][1] + morphv2/2, sca[69][2] + morphv2/2);
					
				} else if( name == "datuichangdu" ) {
					o.skeleton.bones[71].scale.set( sca[71][0] + morphv2/2, sca[71][1], sca[71][2]);
					o.skeleton.bones[86].scale.set( sca[86][0] + morphv2/2, sca[86][1], sca[86][2]);
					o.skeleton.bones[72].scale.set( sca[72][0] - morphv2/2, sca[72][1], sca[72][2]);
					o.skeleton.bones[87].scale.set( sca[87][0] - morphv2/2, sca[87][1], sca[87][2]);
				} else if( name == "xiaotuichangdu" ) {
					o.skeleton.bones[72].scale.x = sca[72][0] + morphv2/2;
					o.skeleton.bones[87].scale.x = sca[87][0] + morphv2/2;
					
					o.skeleton.bones[73].scale.x = sca[73][0] - morphv2/2;
					o.skeleton.bones[89].scale.x = sca[89][0] - morphv2/2;
					
				} else if( name == "datuiwei" ) {
					o.skeleton.bones[85].scale.set( sca[85][0], sca[85][1] + morphv2, sca[85][2] + morphv2);
					o.skeleton.bones[100].scale.set( sca[100][0], sca[100][1] + morphv2, sca[100][2] + morphv2);
					
				} else if( name == "xiaotuiwei" ) {
					o.skeleton.bones[83].scale.set( sca[83][0], sca[83][1] + morphv2, sca[83][2] + morphv2);
					o.skeleton.bones[98].scale.set( sca[98][0], sca[98][1] + morphv2, sca[98][2] + morphv2);
				}
			
			
		};
	});
};
console.log(datgui)