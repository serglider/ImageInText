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

ToDo

### Google Web Fonts

ToDo

### Copyright and license

The MIT License (MIT)

Copyright (c) 2014 Sergey Chernykh