
item/items (object/array of objects = null): To manually supply objects for the items. They need to be in the same format as would be used in the poll builder attribute on the object (except as real objects, not JSON). As a side-effect for predictable behavior if either is used it will kill any localStorage saved data pertaining to items.

noDelete (boolean = false): Use true to disallow item deletion from builder (useful when manually setting items via `item`/`items`).

noSave (boolean = false): Use true to not save the items via localStorage between page loads.

useMobile (boolean = false): To use the mobile version or not. This is mostly for internal usage or from being passed from the Sticky Builder (which will determine it automatically if none given). Not intended for usage in normal non-sticky embedding.
