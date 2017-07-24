
```html
<!-- import the embedding script -->
<script src="http://cdn.gethyperr.com/files/scripts/pollbuilder/desktop/latest.js"></script>

<!-- Make some items draggable and have the data-poll-builder attribute, and some adding buttons for non DnD usage (note: the buttons can be any HTML element). -->
<img draggable="true" src="assets/img1.jpg" data-poll-builder='{"image":"http://mysite.com/assets/img1.jpg", "link":"http://mysite.com/item_one"}' />
<button class="adding-btn" data-poll-builder='{"image":"http://mysite.com/assets/img1.jpg", "link":"http://mysite.com/item_one"}'>ADD</button>

<img draggable="true" src="assets/img2.jpg" data-poll-builder='{"image":"http://mysite.com/assets/img2.jpg", "link":"http://mysite.com/item_two"}' />
<button class="adding-btn" data-poll-builder='{"image":"http://mysite.com/assets/img2.jpg", "link":"http://mysite.com/item_two"}'>ADD</button>

<img draggable="true" src="assets/img3.jpg" data-poll-builder='{"image":"http://mysite.com/assets/img3.jpg", "link":"http://mysite.com/item_three"}' />
<button class="adding-btn" data-poll-builder='{"image":"http://mysite.com/assets/img3.jpg", "link":"http://mysite.com/item_three"}'>ADD</button>

<!-- embed! -->
<script>
	var init = {
		buttonImage: 'assets/btn.png',
		buttonImageHover: 'assets/btn_hover.png',
		buttonImageActive: 'assets/btn_active.png',
	}
	
	pollBuilder.embedSticky('YoUrToKen', {addButtons:'.adding-btn'});
</script>
```