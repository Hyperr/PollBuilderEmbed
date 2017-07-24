
## Sticky Embed Options

NOTE: needs updating

The sticky version of the Poll Builder, as embedded via `pollBuilder.embedSticky` allows an object of options. This is a list of usable properties to have on that object:

#### side

A string of `"right"` or `"left"`, indicating whether you want the Poll Builder to stick to the left or right side of the browser. If none is set, defaults to `"right"`.

#### fromTop

A boolean value for whether or not the `verticalPercent` and `verticalOffset` values should be considered from the top (`true`) or the bottom (`false`). If none is set, defaults to `false`.

#### verticalPercent and verticalOffset.

`verticalPercent` is a number value that determines how far from the top/bottom (depending on `fromTop`) the Poll Builder will be in percentage. Similar to setting `top: {verticalPercent}%` or `bottom: {verticalPercent}%` in CSS. If none is set, defaults to `0`.

`verticalOffset` then adds itself to the position calculated from the `verticalPercent`. If none is set, defaults to `10`.

It operates essentially the same as setting the CSS top or bottom to `calc({verticalPercent}% + {verticalOffset}px)`.

#### position

A string that determines the CSS position of the Poll Builder. Defaults to `"fixed"` in order to not be affected by scrolling, but can be changed to `"absolute"`.

#### zIndex

A number allowing you to set the CSS z-index of the Poll Builder. Defaults to `99`, but some sites may need to raise that in order to have it show above their content, or lower it in order to have it show below things like modals.

#### buttonImage, buttonImageHover, and buttonImageActive

Allows you to use up to 3 images for states of the button that open/closes the Poll Builder. Set them to the URLs of the images to use. If not set, will use default button images.

#### buttonImages2x

A boolean value for whether or not the buttonImage, buttonImageHover, and buttonImageActive images should be considered 2x resolution images (such as for retina screens). So if `true`, a 200x200 image in the button would show at 100x100 in order to be double-res. If not set, defaults to `false`.

#### buttonMarkup

If, instead of using the button images options, you wish to manually set HTML markup for a custom button then include it as a string here. Defaults to `null`, which makes the feature not used and instead use the button images.

#### buttonBottom

A boolean value allowing you to fix the button to the bottom edge of the Poll Builder instead of the top. Defaults to `false`, meaning the button will be flush with the top of the Poll Builder.

#### backgroundColor

A string value indicating the color (in any CSS viable format) of background of the Poll Builder. Defaults to `"#fff"`.
