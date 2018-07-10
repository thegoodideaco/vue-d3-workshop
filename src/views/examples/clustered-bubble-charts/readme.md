# Clustered Bubble Charts

This clustered [force layout](https://bl.ocks.org/mbostock/4062045) is
implemented using two custom forces. The first, `cluster`, pushes nodes towards
the largest node of the same color. A second `collide` force prevents circles
from overlapping by
[detecting collisions](https://bl.ocks.org/mbostock/3231298).

This example uses standard gravity; compare to
[custom gravity](https://bl.ocks.org/mbostock/1748247) applied only to the
largest node of each color. To minimize distracting jitter during
initialization, try an [entry transition](https://bl.ocks.org/mbostock/7881887).
