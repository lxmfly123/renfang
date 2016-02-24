- (void)setNeedsLayout

// Invalidates the current layout of the receiver and triggers a layout update during the next update cycle.

// Discussion: call this method on your application's main thread when you want to adjust the layout of view's subviews. This method makes a not of the request and returns immediately. Because this method does not force an immediate updatem but instead waits for the next update cycle, you can use it to invalidate the layout of multiple views before any of those views are updated. This behavior allows you to consolidate all of your layout updates to one update cycle, which is better for performance.

- (void)layoutIfNeeded

// Lays out the subviews immediately.

// Discussion: Use this method to force the layout of subvies before drawing. Using the view that receives the message as the root view, this method lays out the view subtree at the root.