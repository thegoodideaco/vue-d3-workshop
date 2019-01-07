# D3-Axis as a Component

`D3-Axis` is meant for displaying visual ticks. These represent equidistant
positions along a particular dimension

These are incredibly useful not just for accurately depicting scale, but for the
use of navigating, and zooming into visual data. A holistic view is best when it
is part of a system where the user can navigate within the data. For example,
zooming in on a month worth of data that is part of a 2 year timeline

D3's Axis library is actually quite simple. The core functionality revolves
around `D3-Scale`.

`D3-Scale` provides tick functionality, whereas `D3-Axis` is made to display it,
and manipulate the DOM. In reality this can be converted to a collection of
components that use Vue's template syntax, to allow for more customization. For
example, providing a slot per tick, to allow more abstraction.

## All of the parts

What we ultimately want to do is create a container that can _display_ data
visuals, as well as _interact_ with them. There are a couple ways we will want
to interact.

### Zoom and Pan

The user will need to be able to zoom into the display, while being able to also
pan around. Would need to be available for touchscreen as well.

### Brushing

Brushing is the act of selecting a range within the domain of the scaled item.
This has other useful features, such as being able to get a range of data's
visible domain to be used for taking action on a collection.

### Tick Displays

Ticks are actually the easiest part, as they are generated from scales
themselves. This means that whenever we change the range or domain, the ticks
will reflect the new values

## Primary Goal

### Reusability

We want to be able to use this with as much as we can, so we need to make sure
that it is not dependant on anything else outside of it's own scope. This means
that we need to avoid injections, and focus more on 2 way binding of general
properties.

Assigning colors, text etc.. needs to be avoided completely, however we should
provide a path for these features later on. D3 already integrates a good pattern
for creating objects as methods, which we will setup in this component in a
similar fashion.
