//http://tympanus.net/codrops/2013/12/02/techniques-for-creating-textured-text/

function TextMask(config) {

	var self = this, item,
		options = {
			container: "tm-container",
			text: "TextMask",
			font: "fantasy",
			fontWeight: "normal",
			// width: 500,
			height: 50,
			mode: "repeat",
			image: "",
			bgImage: "",
			bgMode: "repeat"
		};

	if ( config && typeof config === "object" ) {
		for ( item in config ) {
			if ( config.hasOwnProperty(item) && options.hasOwnProperty(item) && typeof config[item] === typeof options[item]) {
				options[item] = config[item];
			}
		}
	}

	var container = document.getElementById(options.container),
		image = new Image(),
		bgimage = new Image();

	if ( container && options.image ) {
		if ( options.bgImage ) {
			bgimage.onload = function () {
				image.onload = init;
				image.src = options.image;
			};
			bgimage.src = options.bgImage;
		}else {
			image.onload = init;
			image.src = options.image;
		}
	}

	function init () {
		var text = options.text,
			height = options.height,
			font = options.font,
			fontWeight = options.fontWeight,
			mode = options.mode,
			bgMode = options.bgMode,
			tcanvas = document.createElement("canvas"),
			bcanvas = document.createElement("canvas"),
			tctx = tcanvas.getContext("2d"),
			bctx = bcanvas.getContext("2d"),
			width;

		tctx.font = fontWeight + " " + height + "px " + font;
		width = tctx.measureText(text).width;
		container.style.width = width + "px";
		container.style.height = height + "px";
		tcanvas.width = width;
		tcanvas.height = height;
		bcanvas.width = width;
		bcanvas.height = height;
		bcanvas.innerHTML = text; //fallback text for accessibility and no-js browsers
		container.appendChild(bcanvas);

		tctx.textAlign = "center";
		tctx.textBaseline = "middle";
		tctx.font = fontWeight + " " + height + "px " + font;
		tctx.fillStyle = "#000";
		tctx.fillText(text, width/2, height/2);

		bctx.drawImage(tcanvas, 0, 0);
		bctx.globalCompositeOperation = "source-in";
		if ( mode === "repeat" ) {
			if ( width > image.width || height > image.height ) {
				bctx.fillStyle = bctx.createPattern(image, "repeat");
				bctx.fillRect(0, 0, width, height);
			}else {
				bctx.drawImage(image, 0, 0);
			}
			// !! adjust !!
		}else if ( mode === "adjust" ) {
			g = setNew(width, height, image);
			bctx.drawImage(image, g.x, g.y, g.width, g.height);
		}//destination-over
		if ( options.bgImage ) {
			bctx.globalCompositeOperation = "destination-over";
			if ( width > bgimage.width || height > bgimage.height ) {
				bctx.fillStyle = bctx.createPattern(bgimage, "repeat");
				bctx.fillRect(0, 0, width, height);
			}else {
				bctx.drawImage(bgimage, 0, 0);
			}

		}

		function setNew(w, h, img) {
			var min = Math.min(img.width, img.height),
				landscape = min === img.height,
				o = {},
				factor;
			// if ( landscape ) {
			// 	console.log("landscape");
			// 	o.height = h;
			// 	factor = h/img.height;
			// 	o.width = factor * w;
			// 	o.x = -(o.width - w)/2;
			// 	o.y = 0;
			// }else {
			// 	o.width = w;
			// 	factor = w/img.width;
			// 	o.height = factor * h;
			// 	o.y = -(o.height - h)/2;
			// 	o.x = 0;
			// }
				if ( w > img.width ) {
					o.width = w;
					factor = w/img.width;
					o.height = factor * h;
				}else {
					o.width = img.width;
					factor = w/img.width;
					o.height = factor * h;
				}
				factor = w/img.width;
				o.height = factor * h;
				o.y = -(o.height - h)/2;
				o.x = 0;
			console.log("factor: " +  factor);
			console.log(o);
			console.log("img.width: " +  img.width);
			console.log("img.height: " +  img.height);
			return o;
		}
	}

}
