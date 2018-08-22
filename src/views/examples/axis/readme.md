# D3-Axis as a Component

`D3-Axis` is meant for displaying visual ticks. These represent equidistant
positions along a particular dimension

These are incredibly useful not just for accurately depicting scale, but for the
use of navigating, and zooming into visual data. A holistic view is best when it
is part of a system where the user can navigate within the data. For example,
zooming in on a month worth of data that is part of a 2 year timeline

D3's Axis library is actually quite simple. The core functionality revolves
around `D3-Scale`.

`D3-Scale` provides tick functionality, whereas `D3-Axis` is made to display it, and
manipulate the DOM. In reality this can be converted to a collection of
components that use Vue's template syntax, to allow for more customization. For
example, providing a slot per tick, to allow more abstraction
