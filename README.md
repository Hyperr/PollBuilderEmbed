
# Hyper Poll Builder

This is a script for usage alongside the [Hyperr](http://gethyperr.com) poll builder. On its own it does nothing. It is for usage alongside the Hyperr Poll Builder service.

## Overview

The Hyperr Poll Builder allows you to embed a poll builder in your site, which users can then use to build and share polls about products from your site. It uses a drag and drop interface to allow those users to drag images, or other content, into the builder and utilize it in the polls.

The full process of utilizing the Poll Builder includes a few steps. In their most simplified form they are:

1. Set up a Poll Builder instance for usage with Hyperr. This will give the dimensions of your Poll Builder instance, and a token identifying it. This is done on the [Hyperr website](http://gethyperr.com) or via conversation with the Hyperr staff.
2. Include the javascript file from this repo into your website.
3. Call `hyperr.pollBuilder.embed(myContainer, myToken)` to embed.
4. Make desired elements draggable via the HTML5 DnD API.
5. Add some data attributes to those draggable elements.

Once done, you will have a completed Poll Builder operating on your page.

## Setting Up a Poll Builder Instance

At this time the Poll Builder Editor is not running on the Hyperr website. Poll Builder instances can be set up via direct communication with the Hyperr team, which will then give you the token and dimensions for the Poll Builder that has been created.

## Including The Poll Builder Scripts

These files are quite small (only a few kb minimized) and are mostly just for handling the embedding of the Poll Builder in your website, and the communication between your website and the embedded Poll Builder itself.

#### Including:

Currently this repo is not set up for use via npm or bower. Simply download the minimized javascript file from this project's `dist` folder and include it in your project. It is built on [UMD](http://bob.yexley.net/umd-javascript-that-runs-anywhere/) principles, and therefore can be used via traditional script inclusion or CommonJS/RequireJS means.

#### Accessing:

Once you have the Poll Builder script in your project, you need to actually use it.

If you simply included it into your project via a script tag, then you will find the object you need globally at `hyperr.pollBuilder`. Such as:

```javascript
hyperr.pollBuilder.embed(myContainer, myToken);
```

But it also can be used via CommonJS type usage if that is how your project is set up:

```javascript
var pollBuilder = require('hyperr-pollbuilder');
pollBuilder.embed(myContainer, myToken);
```

And last but not least it also works with RequireJS if you are set up that way:

```javascript
require(['hyperr.pollbuilder'], function(pollBuilder) {
	pollBuilder.embed(myContainer, myToken);
});
```

For instructional purposes we'll assume the global usage (`hyperr.pollBuilder`) for examples.

## Embedding

Now that you've got the script, and have access to the `pollBuilder` object (whether it be the namespaced global `hyperr.pollBuilder` or via some dependency system) you can use it to embed a Poll Builder.

When you created your Poll Builder instance, you were given the dimensions at which it will show. So placing in your website is extremely easy:

First: Build an element into your page of the proper size, where you want the Poll Builder to show. The only requirement on this is that it **not** be `position:static;` in the CSS. If you make it `static`, then the script will automatically change it to `relative`. Other than that, you're just building a rectangle where the embedding magic is gonna happen, and putting it where you want it.

Second: Call the `hyperr.pollBuilder.embed` method while supplying 2 parameters (a reference to _or_ query string identifying the container element you intend it to embed into, and a string of the token for the Poll Builder instance. So that will look something like this:

```javascript
hyperr.pollBuilder.embed('#poll-builder-spot', 'YoUrToKeN');
```

Now you've embedded the Poll Builder instance. Next you just need to make some items draggable.

## Make Draggable Elements

The most useful information to give about this process is that you don't need this documentation for this process.

This is **NOT** a process specific to this product. It is the standard process of making HTML elements draggable via the HTML5 Drag and Drop API. You can find info on this anywhere and everywhere.

Most images are already draggable. Other elements can usually easily be made draggable by adding `draggable="true"` attribute to them. Sometimes there are "gotchas" where events are being specifically blocked and therefore making an element draggable becomes difficult. 

However, since this is a native concept to browsers (as opposed to something specific to this repo) general knowledge about the drag and drop API, and help from nearly any corner of the internet can aid you in the process of getting an element draggable.

## Add Data to Draggable Elements

You have full control over what is considered usable by the Poll Builder, via a `data-poll-builder` attribute. Even otherwise draggable elements will not react with the Poll Builder unless that attribute is present on the element.

What it contains is the data that you would like that element to pass to the Poll Builder, in the form of a JSON object string.

That JSON object should have at least one property: `image`. This is the image reference that you want it to send to the poll builder. It should be an absolute URL, and it can be any image, allowing you to do things like serve an image formatted to a certain size (even if that's not the same size image you're using in your website) or include a .gif that animates between different poses for a model showing a pair of shoes, or whatever else you can come up with.

No other properties are required. However, an `autoTitle` property optionally allows you to set the title for the item in the Poll Builder when the item is dropped. For example, a good usage of this would be setting it to the price of an item, so that the title shows the item's price without the user having to type it in manually.

That would look something like this on an element:

```html
<img draggable="true" src="./myImage.jpg" data-poll-builder='{"image":"http://mydomain/images/myImage.jpg", "autoTitle":"$108.00"}' />
```

That image, when dragged into the Poll Builder, would have the Poll Builder showing the image at `http://mydomain/images/myImage.jpg` and would automatically insert `$108.00` as the title upon drop. The title would still be editable to the user, it's just a convenience method for setting automatic titles on drop.

## Progressive Enhancement

Some that are already familiar with the HTML5 Drag and Drop API may realize that it does not work for mobiles. This is true, and is a limitation of this tool. However, this script also allows for easy progressive enhancement.

You can access a read-only property at `hyperr.pollBuilder.supported` which will be a boolean representing whether the Poll Builder will be supported on that particular user's browser/system. In this way you can do things like modify a CSS class to change the layout accordingly.

An example of that would be the following:

```javascript
if (hyperr.pollBuilder.supported) {
	document.body.className += " using-pollbuilder";
	hyperr.pollBuilder.embed('#poll-builder-spot', 'YoUrToKeN');
}
```

Which would then allow very simple CSS to only account for the poll builder if it will truly run:

```css
#poll-builder-spot {
	display: none;
}

.using-pollbuilder #poll-builder-spot {
	display: block;
	width: 180px;
	height 500px;
	/* ...etc. */
}
```

This also means that you're only progressively enhancing for people that have javascript turned on as well (since the Poll Builder cannot run without javascript). Therefore this is the recommended approach.
