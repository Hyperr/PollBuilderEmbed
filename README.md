
# Hyper Poll Builder

This is a script for usage alongside the [Hyperr](http://gethyperr.com) poll builder. On its own it does nothing. It is for usage alongside the Hyperr Poll Builder service.

## Overview

The Hyperr Poll Builder allows you to embed a poll builder in your site, which users can then use to build and share polls about products from your site. It uses a drag and drop interface to allow those users to drag images, or other content, into the builder and utilize it in the polls.

The full process of utilizing the Poll Builder includes a few steps. In their most simplified form they are:

1. Set up a Poll Builder instance for usage with Hyperr. This will give a token identifying your poll builder. This is done on the [Hyperr website](http://gethyperr.com) or via conversation with the Hyperr staff.
2. Include the embedding file from our CDN into your website.
3. Create the desired containing element in your page (only needed if *not* using the sticky poll builder).
4. Call `pollBuilder.embed` or `pollBuilder.embedSticky` methods to embed.
5. Make desired elements draggable via the HTML5 DnD API.
6. Add some data attributes to those draggable elements.

Once done, you will have a completed Poll Builder operating on your page.

## Setting Up a Poll Builder Instance

At this time the Poll Builder Editor is not running on the Hyperr website. Poll Builder instances can be set up via direct communication with the Hyperr team, which will then give you the token for the Poll Builder that has been created.

## Including The Poll Builder Embedding Script

The embedding script is for handling the embedding of the Poll Builder in your website, and the communication between your website and the embedded Poll Builder itself. It's the file from this repo that you're reading right now.

#### Including:

This repo is *intentionally* not set up for use via npm or bower. It must be loaded from the Hyperr CDN. The embedding script needs to be constantly up to date with the Poll Builder being embedded into your site, so it needs to be loaded remotely so that it can be kept up to date by Hyperr.

```html
<script src="http://cdn.gethyperr.com/files/scripts/pollbuilder/desktop/latest.js"></script>
```

#### Accessing:

Once you have the Poll Builder script in your project, you need to actually use it.

You will find the object you need globally at `pollBuilder`. Such as:

```javascript
pollBuilder.embed(myContainer, myToken);
```

## Embedding

Now that you've got the script, and have access to the `pollBuilder` object you can use it to embed a Poll Builder.

There are two main ways to embed. In the normal embed, you make the element on your site where you want the Poll Builder to be embedded.

In the sticky embed, it's actually even easier, because the embed script doesn't need you to make any element to contain it, it will stick the Poll Builder to the side of the screen to be opened/closed as used.

#### Normal Embed

First: Build an element into your page where you want the Poll Builder to show. The only requirement on this is that it **not** be `position:static;` in the CSS. If you make it `static`, then the script will automatically change it to `relative`. Other than that, you're just building a rectangle where the embedding magic is gonna happen, and putting it where you want it.

Expect that an `iframe` will be inserted into that element, and that it will size and resize itself according to its content.

Second: Call the `pollBuilder.embed` method while supplying 2 parameters (a reference to _or_ query string identifying the container element you intend it to embed into, and a string of the token for the Poll Builder instance. So that will look something like this:

```javascript
pollBuilder.embed('#poll-builder-spot', 'YoUrToKeN');
```

#### Sticky Embed

The sticky version of the poll builder just attaches itself in a fixed manner to the edge of the screen, and can be opened/closed with a button.

It does not require you to add any markup to your site. Simply use the embed script.

```javascript
pollBuilder.embedSticky('YoUrToKeN', options);
```

In addition to supplying it with your Poll Builder token, you can also give it an optional object with initialization options that give you control over the Poll Builder's behavior and aesthetics. You can learn about those options [here](docs/embedSticky-options.md).


## Make Draggable Elements

Now you've embedded the Poll Builder instance. Next you just need to make some items draggable.

The most useful information to give about this process is that you don't need this documentation for this process.

This is **NOT** a process specific to this product. It is the standard process of making HTML elements draggable via the HTML5 Drag and Drop API. You can find info on this anywhere and everywhere.

Most images are already draggable. Other elements can usually easily be made draggable by adding `draggable="true"` attribute to them. Sometimes there are "gotchas" where events are being specifically blocked and therefore making an element draggable becomes difficult. 

However, since this is a native concept to browsers (as opposed to something specific to this repo) general knowledge about the drag and drop API, and help from nearly any corner of the internet can aid you in the process of getting an element draggable.

## Add Data to Draggable Elements

You have full control over what is considered usable by the Poll Builder, via a `data-poll-builder` attribute. Even otherwise draggable elements will not react with the Poll Builder unless that attribute is present on the element.

What it contains is the data that you would like that element to pass to the Poll Builder, in the form of a JSON object.

That JSON object should have at least one property: `image`. This is the image reference that you want it to send to the poll builder. It should be a full absolute URL, and it can be any image, allowing you to do things like serve an image formatted to a certain size (even if that's not the same size image you're using in your website) or include a .gif that animates between different poses for a model showing a pair of shoes, or whatever else you can come up with.

No other properties are required. However, a `link` property optionally allows you to set the URL to the item in the Poll Builder when the item is dropped. This information allows the voting page to display that item as a background, and the voting options to link to it. It's highly recommended that you include a `link`.

That would look something like this on an element:

```html
<img draggable="true" src="./myImage.jpg" data-poll-builder='{"image":"http://mysite.com/myimage.jpg", "link":"https://mysite.com/myproduct"}' />
```

## Progressive Enhancement

Some that are already familiar with the HTML5 Drag and Drop API may realize that it does not work for mobiles. This is true. However, this script also allows for easy progressive enhancement.

You can use a method at `pollBuilder.isSupported()` which will return true/false representing whether the Poll Builder will be supported on that particular user's browser/system. In this way you can do things like modify a CSS class to change the layout accordingly, and/or only embed the Poll Builder when supported.

An example of that would be the following:

```javascript
if (pollBuilder.isSupported()) {
	document.body.className += " using-pollbuilder";
	pollBuilder.embed('#poll-builder-spot', 'YoUrToKeN');
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

## Events

The poll builder has events that you can use for things such as analytics. These events dispatch from the `pollBuilder` object itself.

You may listen/stop listening to events using either `addEventListener` and `removeEventListener`.

So an example would be:

```javascript
pollBuilder.addEventListener('pb:drop', function(evt) {
	console.log(evt.data); // <-- will log out data from item dropped into builder
})
```

A list of events and their descriptions can be found [here](docs/events.md).
