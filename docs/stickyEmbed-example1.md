
```html
<!-- import the embedding script -->
<script src="http://cdn.gethyperr.com/files/scripts/pollbuilder/desktop/latest.js"></script>

<!-- make some items draggable and have the data-poll-builder attribute -->
<img draggable="true" src="assets/img1.jpg" data-poll-builder='{"image":"http://mysite.com/assets/img1.jpg", "link":"http://mysite.com/item_one"}' />
<img draggable="true" src="assets/img2.jpg" data-poll-builder='{"image":"http://mysite.com/assets/img2.jpg", "link":"http://mysite.com/item_two"}' />
<img draggable="true" src="assets/img3.jpg" data-poll-builder='{"image":"http://mysite.com/assets/img3.jpg", "link":"http://mysite.com/item_three"}' />

<!-- embed! -->
<script>
	var init = {
		buttonImage: 'assets/btn.png',
		buttonImageHover: 'assets/btn_hover.png',
		buttonImageActive: 'assets/btn_active.png',
	}
	
	if (pollBuilder.isSupported())
		pollBuilder.embedSticky('YoUrToKen', init);
</script>
```