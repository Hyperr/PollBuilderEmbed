
##### pb:openbuilder

The `pb:openbuilder` event indicates that the builder has been opened on the user's screen.

##### pb:closebuilder

The `pb:closebuilder` event indicates that the builder has been closed on the user's screen.

##### pb:drop

The `pb:drop` event indicates that a valid item was dropped into the poll builder and added via the drag and drop method. Its event carries a `data` property which will contain the data that was included in that item and given to the poll builder (i.e. the image, etc.)

##### pb:add

The `pb:add` event indicates that a valid item was add into the poll builder via the button adding method. Its event carries a `data` property which will contain the data that was included in that item and given to the poll builder (i.e. the image, etc.)

##### pb:init

The `pb:init` event is dispatched whenever a poll builder instance initializes. The event includes no extra data.
