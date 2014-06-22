# ImageInText

### Description

The name of this small tool  - ImageInText - is quite descriptive. Yep, it allows you to easily place an image inside of text and can be used for headers, punchlines, quotes, etc. There are a plenty of creative ways to apply this feature for. Please take a look at the demo page (ToDo) with examples of its usage.

### Setup

To get started, load *imageInText .js* on your page and create an instance (or instances) of the ImageInText constructor.

```javascript
var cooltext = new ImageInText  ({
	text: "Keep calm and carry on",
	font: "fantasy",
	height: 100,
	image: "http://example.com/images/picture.png"
});
```
You can pass a configuration object to the constructor function. The object has to contain options by which you want to override the default ones.

### Options
The table below describes options that you can override.

Name | Type | Default | Description
--- | --- | --- | ---
*container* | *string*  | *iit-container* | *Id* of the container element.
*text* | *string*  | *Lorem ipsum* | Your text.
*font* | *string*  | *fantasy* | сss font-family. See section below on usage of Google Web Fonts.
*fontWeight* | *string*  | *normal* | сss font-weight.
*width* | *number*  | *0* | The width of the element containing text in pixels. See section below on explanation.
*height* | *number*  | *0* | The height of the element containing text in pixels. See section below on explanation
*image* | *string*  | *""* | URL of the image. If no valid URL provided, the text will be pure black.
*bgImage* | *string*  | *""* | URL of the background image. If no valid URL provided, the background will be fully transparent.

### Sizes

The algorithm of finding sizes of the element containing text is:

- if the height provided - it calculates the width needed to hold the text which font size equals height.

-  if the width provided - it calculates the font size needed to hold the text within that width.

- if the both sizes provided - it calculates the font size needed to hold the text within that width. Draw the text and then stretch or squeeze it to meet the height. The high degree of that distortion gives not that great results. Please avoid this.

- if no size provided (default) - it reads sizes of the element via `getBoundingClientRect` method and then sets appropriate font size.

### Google Web Fonts

The Google Web Fonts is an excellent tool to make your page more expressive. But if you want use it with ImageInText, you have to take care of loading it before the script will run. You can find one of possible ways to handle this in the Examples folder.

### Copyright and license

The MIT License (MIT)

Copyright (c) 2014 Sergey Chernykh