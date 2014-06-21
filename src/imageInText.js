//http://tympanus.net/codrops/2013/12/02/techniques-for-creating-textured-text/
function ImageInText(config) {

	var self = this,
		options = {
			container: "iit-container",
			text: "Lorem ipsum",
			font: "fantasy",
			fontWeight: "normal",
			width: 0,
			height: 0,
			image: "",
			bgImage: "",
		},
		container,
		sizes,
		image,
		bgimage,
		bounds,
		item;

	if ( config && typeof config === "object" ) {
		for ( item in config ) {
			if ( config.hasOwnProperty(item) && options.hasOwnProperty(item) && typeof config[item] === typeof options[item]) {
				options[item] = config[item];
			}
		}
	}

	container = document.getElementById(options.container);
	sizes = options.height || options.width;
	image = new Image();
	bgimage = new Image();


	if ( !sizes ) {
		bounds = container.getBoundingClientRect();
		options.height = Math.round(bounds.height);
		options.width = Math.round(bounds.width);
		sizes = options.height && options.width;
	}

	if ( container && sizes ) {
		if ( options.image ) {
			if ( options.bgImage ) {
				bgimage.onload = function () {
					image.onload = launch;
					image.src = options.image;
				};
				bgimage.src = options.bgImage;
			}else {
				image.onload = launch;
				image.src = options.image;
			}
		}else {
			launch();
		}
	}

	function launch() {
		var text = options.text,
			height = options.height,
			fontsize = options.height,
			width = options.width,
			font = options.font,
			fontWeight = options.fontWeight,
			tcanvas = document.createElement("canvas"),
			bcanvas = document.createElement("canvas"),
			tctx = tcanvas.getContext("2d"),
			bctx = bcanvas.getContext("2d");

		if ( height ) {
			if ( width ) {
				fontsize = findFontSize(tctx, width, text, font, fontWeight);
			}else {
				tctx.font = fontWeight + " " + fontsize + "px " + font;
				width = tctx.measureText(text).width;
			}
		}else {
			height = findFontSize(tctx, width, text, font, fontWeight);
			fontsize = height;
		}

		if ( !bounds ) {
			container.style.width = width + "px";
			container.style.height = height + "px";
		}

		tcanvas.width = width;
		tcanvas.height = fontsize;
		bcanvas.width = width;
		bcanvas.height = height;
		// fallback text for the accessibility and SEO reasons as well as for no-js browsers
		bcanvas.innerHTML = "<h1>" + text + "</h1>";
		container.appendChild(bcanvas);

		tctx.textAlign = "center";
		tctx.textBaseline = "middle";
		tctx.font = fontWeight + " " + fontsize + "px " + font;
		tctx.fillStyle = "#000";
		tctx.fillText(text, width/2, fontsize/2);

		bctx.drawImage(tcanvas, 0, 0, width, height);
		bctx.globalCompositeOperation = "source-in";
		if ( options.image ) {
			if ( width > image.width || height > image.height ) {
				bctx.fillStyle = bctx.createPattern(image, "repeat");
				bctx.fillRect(0, 0, width, height);
			}else {
				bctx.drawImage(image, 0, 0);
			}
		}else {
			bctx.fillStyle = "#000";
			bctx.fillRect(0, 0, width, height);
		}
		if ( options.bgImage ) {
			bctx.globalCompositeOperation = "destination-over";
			if ( width > bgimage.width || height > bgimage.height ) {
				bctx.fillStyle = bctx.createPattern(bgimage, "repeat");
				bctx.fillRect(0, 0, width, height);
			}else {
				bctx.drawImage(bgimage, 0, 0);
			}
		}
	}

	function findFontSize (ctx, width, text, font, fw) {
		var fs = 1,
			w = 0.98 * width;
		setFont();
		while ( isSmaller() ) {
			fs++;
			setFont();
		}
		return fs;

		function setFont() {
			ctx.font = fw + " " + fs + "px " + font;
		}

		function isSmaller() {
			return w > ctx.measureText(text).width;
		}
	}

}
