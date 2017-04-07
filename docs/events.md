
##### pb:drop

The `pb:drop` event indicates that a valid item was dropped into the poll builder and added. Its event carries a `data` property which will contain the data that was included in that item and given to the poll builder (i.e. the image, autoTitle, etc.)

##### pb:begindrag

The `pb:dragstart` event is dispatched whenever a valid item begins to be dragged anywhere on the page. The event includes no extra data.

##### pb:dragstart

The `pb:dragstart` event is dispatched whenever a valid item begins to be dragged anywhere on the page AND the poll builder is receptive. The event includes no extra data.

##### pb:dragend

The `pb:dragend` event is dispatched whenever a valid item ends for any reason. The event includes no extra data.

Note: this event includes drags that are dropped successfully in the poll builder or not.

##### pb:dragover

The `pb:dragover` event is dispatched whenever a valid item is dragged over the poll builder and the poll builder is receptive for it to be dropped. The event includes no extra data.

##### pb:dragleave

The `pb:dragleave` event is dispatched whenever a valid item that was dragged over the poll builder is dragged out again. The event includes no extra data.

##### pb:init

The `pb:init` event is dispatched whenever a poll builder instance initializes. The event includes no extra data.
