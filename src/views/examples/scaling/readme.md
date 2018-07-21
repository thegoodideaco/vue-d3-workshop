# Using D3-Scale

**Copied from [https://github.com/d3/d3-scale](https://github.com/d3/d3-scale)**

Scales are a convenient abstraction for a fundamental task in visualization:
mapping a dimension of abstract data to a visual representation. Although most
often used for position-encoding quantitative data, such as mapping a
measurement in meters to a position in pixels for dots in a scatterplot, scales
can represent virtually any visual encoding, such as diverging colors, stroke
widths, or symbol size. Scales can also be used with virtually any type of data,
such as named categorical data or discrete data that requires sensible breaks.

For [continuous](#continuous-scales) quantitative data, you typically want a
[linear scale](#linear-scales). (For time series data, a
[time scale](#time-scales).) If the distribution calls for it, consider
transforming data using a [power](#power-scales) or [log](#log-scales) scale. A
[quantize scale](#quantize-scales) may aid differentiation by rounding
continuous data to a fixed set of discrete values; similarly, a
[quantile scale](#quantile-scales) computes quantiles from a sample population,
and a [threshold scale](#threshold-scales) allows you to specify arbitrary
breaks in continuous data.

For discrete ordinal (ordered) or categorical (unordered) data, an
[ordinal scale](#ordinal-scales) specifies an explicit mapping from a set of
data values to a corresponding set of visual attributes (such as colors). The
related [band](#band-scales) and [point](#point-scales) scales are useful for
position-encoding ordinal data, such as bars in a bar chart or dots in an
categorical scatterplot.

This repository does not provide color schemes; see
[d3-scale-chromatic](https://github.com/d3/d3-scale-chromatic) for color schemes
designed to work with d3-scale.

Scales have no intrinsic visual representation. However, most scales can
[generate](#continuous_ticks) and [format](#continuous_tickFormat) ticks for
reference marks to aid in the construction of axes.

For a longer introduction, see these recommended tutorials:

- [Introducing d3-scale](https://medium.com/@mbostock/introducing-d3-scale-61980c51545f)
  by Mike Bostock

- Chapter 7. Scales of
  [_Interactive Data Visualization for the Web_](http://alignedleft.com/work/d3-book)
  by Scott Murray

- [d3: scales, and color.](http://www.jeromecukier.net/2011/08/11/d3-scales-and-color/)
  by Jérôme Cukier

## [](#installing)Installing

If you use NPM, `npm install d3-scale`. Otherwise, download the
[latest release](https://github.com/d3/d3-scale/releases/latest). You can also
load directly from [d3js.org](https://d3js.org), either as a
[standalone library](https://d3js.org/d3-scale.v2.min.js) or as part of
[D3](https://github.com/d3/d3). AMD, CommonJS, and vanilla environments are
supported. In vanilla, a `d3` global is exported:

<script src="https://d3js.org/d3-array.v1.min.js"></script>
<script src="https://d3js.org/d3-collection.v1.min.js"></script>
<script src="https://d3js.org/d3-color.v1.min.js"></script>
<script src="https://d3js.org/d3-format.v1.min.js"></script>
<script src="https://d3js.org/d3-interpolate.v1.min.js"></script>
<script src="https://d3js.org/d3-time.v1.min.js"></script>
<script src="https://d3js.org/d3-time-format.v2.min.js"></script>
<script src="https://d3js.org/d3-scale.v2.min.js"></script>
<script>
var x = d3.scaleLinear();
</script>

(You can omit d3-time and d3-time-format if you’re not using
[d3.scaleTime](#scaleTime) or [d3.scaleUtc](#scaleUtc).)

## [](#api-reference)API Reference

- [Continuous](#continuous-scales) ([Linear](#linear-scales),
  [Power](#power-scales), [Log](#log-scales), [Identity](#identity-scales),
  [Time](#time-scales))
- [Sequential](#sequential-scales)
- [Diverging](#diverging-scales)
- [Quantize](#quantize-scales)
- [Quantile](#quantile-scales)
- [Threshold](#threshold-scales)
- [Ordinal](#ordinal-scales) ([Band](#band-scales), [Point](#point-scales))

### [](#continuous-scales)Continuous Scales

Continuous scales map a continuous, quantitative input
[domain](#continuous_domain) to a continuous output [range](#continuous_range).
If the range is also numeric, the mapping may be [inverted](#continuous_invert).
A continuous scale is not constructed directly; instead, try a
[linear](#linear-scales), [power](#power-scales), [log](#log-scales),
[identity](#identity-scales), [time](#time-scales) or
[sequential color](#sequential-scales) scale.

[#](#_continuous) _continuous_(_value_)
[<>](https://github.com/d3/d3-scale/blob/master/src/continuous.js 'Source')

Given a _value_ from the [domain](#continuous_domain), returns the corresponding
value from the [range](#continuous_range). If the given _value_ is outside the
domain, and [clamping](#continuous_clamp) is not enabled, the mapping may be
extrapolated such that the returned value is outside the range. For example, to
apply a position encoding:

var x = d3.scaleLinear() .domain(\[10, 130\]) .range(\[0, 960\]);

x(20); // 80 x(50); // 320

Or to apply a color encoding:

var color = d3.scaleLinear() .domain(\[10, 100\]) .range(\["brown",
"steelblue"\]);

color(20); // "#9a3439" color(50); // "#7b5167"

[#](#continuous_invert) _continuous_.**invert**(_value_)
[<>](https://github.com/d3/d3-scale/blob/master/src/continuous.js 'Source')

Given a _value_ from the [range](#continuous_range), returns the corresponding
value from the [domain](#continuous_domain). Inversion is useful for
interaction, say to determine the data value corresponding to the position of
the mouse. For example, to invert a position encoding:

var x = d3.scaleLinear() .domain(\[10, 130\]) .range(\[0, 960\]);

x.invert(80); // 20 x.invert(320); // 50

If the given _value_ is outside the range, and [clamping](#continuous_clamp) is
not enabled, the mapping may be extrapolated such that the returned value is
outside the domain. This method is only supported if the range is numeric. If
the range is not numeric, returns NaN.

For a valid value _y_ in the range, _continuous_(_continuous_.invert(_y_))
approximately equals _y_; similarly, for a valid value _x_ in the domain,
_continuous_.invert(_continuous_(_x_)) approximately equals _x_. The scale and
its inverse may not be exact due to the limitations of floating point precision.

[#](#continuous_domain) _continuous_.**domain**(\[_domain_\])
[<>](https://github.com/d3/d3-scale/blob/master/src/continuous.js 'Source')

If _domain_ is specified, sets the scale’s domain to the specified array of
numbers. The array must contain two or more elements. If the elements in the
given array are not numbers, they will be coerced to numbers. If _domain_ is not
specified, returns a copy of the scale’s current domain.

Although continuous scales typically have two values each in their domain and
range, specifying more than two values produces a piecewise scale. For example,
to create a [diverging color scale](#diverging-scales) that interpolates between
white and red for negative values, and white and green for positive values, say:

var color = d3.scaleLinear() .domain(\[-1, 0, 1\]) .range(\["red", "white",
"green"\]);

color(-0.5); // "rgb(255, 128, 128)" color(+0.5); // "rgb(128, 192, 128)"

Internally, a piecewise scale performs a
[binary search](https://github.com/d3/d3-array#bisect) for the range
interpolator corresponding to the given domain value. Thus, the domain must be
in ascending or descending order. If the domain and range have different lengths
_N_ and _M_, only the first _min(N,M)_ elements in each are observed.

[#](#continuous_range) _continuous_.**range**(\[_range_\])
[<>](https://github.com/d3/d3-scale/blob/master/src/continuous.js 'Source')

If _range_ is specified, sets the scale’s range to the specified array of
values. The array must contain two or more elements. Unlike the
[domain](#continuous_domain), elements in the given array need not be numbers;
any value that is supported by the underlying
[interpolator](#continuous_interpolate) will work, though note that numeric
ranges are required for [invert](#continuous_invert). If _range_ is not
specified, returns a copy of the scale’s current range. See
[_continuous_.interpolate](#continuous_interpolate) for more examples.

[#](#continuous_rangeRound) _continuous_.**rangeRound**(\[_range_\])
[<>](https://github.com/d3/d3-scale/blob/master/src/continuous.js 'Source')

Sets the scale’s [_range_](#continuous_range) to the specified array of values
while also setting the scale’s [interpolator](#continuous_interpolate) to
[interpolateRound](https://github.com/d3/d3-interpolate#interpolateRound). This
is a convenience method equivalent to:

continuous .range(range) .interpolate(d3.interpolateRound);

The rounding interpolator is sometimes useful for avoiding antialiasing
artifacts, though also consider the
[shape-rendering](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering)
“crispEdges” styles. Note that this interpolator can only be used with numeric
ranges.

[#](#continuous_clamp) _continuous_.**clamp**(_clamp_)
[<>](https://github.com/d3/d3-scale/blob/master/src/continuous.js 'Source')

If _clamp_ is specified, enables or disables clamping accordingly. If clamping
is disabled and the scale is passed a value outside the
[domain](#continuous_domain), the scale may return a value outside the
[range](#continuous_range) through extrapolation. If clamping is enabled, the
return value of the scale is always within the scale’s range. Clamping similarly
applies to [_continuous_.invert](#continuous_invert). For example:

var x = d3.scaleLinear() .domain(\[10, 130\]) .range(\[0, 960\]);

x(-10); // -160, outside range x.invert(-160); // -10, outside domain

x.clamp(true); x(-10); // 0, clamped to range x.invert(-160); // 10, clamped to
domain

If _clamp_ is not specified, returns whether or not the scale currently clamps
values to within the range.

[#](#continuous_interpolate) _continuous_.**interpolate**(_interpolate_)
[<>](https://github.com/d3/d3-scale/blob/master/src/continuous.js 'Source')

If _interpolate_ is specified, sets the scale’s [range](#continuous_range)
interpolator factory. This interpolator factory is used to create interpolators
for each adjacent pair of values from the range; these interpolators then map a
normalized domain parameter _t_ in \[0, 1\] to the corresponding value in the
range. If _factory_ is not specified, returns the scale’s current interpolator
factory, which defaults to
[interpolate](https://github.com/d3/d3-interpolate#interpolate). See
[d3-interpolate](https://github.com/d3/d3-interpolate) for more interpolators.

For example, consider a diverging color scale with three colors in the range:

var color = d3.scaleLinear() .domain(\[-100, 0, +100\]) .range(\["red", "white",
"green"\]);

Two interpolators are created internally by the scale, equivalent to:

var i0 = d3.interpolate("red", "white"), i1 = d3.interpolate("white", "green");

A common reason to specify a custom interpolator is to change the color space of
interpolation. For example, to use
[HCL](https://github.com/d3/d3-interpolate#interpolateHcl):

var color = d3.scaleLinear() .domain(\[10, 100\]) .range(\["brown",
"steelblue"\]) .interpolate(d3.interpolateHcl);

Or for [Cubehelix](https://github.com/d3/d3-interpolate#interpolateCubehelix)
with a custom gamma:

var color = d3.scaleLinear() .domain(\[10, 100\]) .range(\["brown",
"steelblue"\]) .interpolate(d3.interpolateCubehelix.gamma(3));

Note: the
[default interpolator](https://github.com/d3/d3-interpolate#interpolate) **may
reuse return values**. For example, if the range values are objects, then the
value interpolator always returns the same object, modifying it in-place. If the
scale is used to set an attribute or style, this is typically acceptable (and
desirable for performance); however, if you need to store the scale’s return
value, you must specify your own interpolator or make a copy as appropriate.

[#](#continuous_ticks) _continuous_.**ticks**(\[_count_\])

Returns approximately _count_ representative values from the scale’s
[domain](#continuous_domain). If _count_ is not specified, it defaults to 10.
The returned tick values are uniformly spaced, have human-readable values (such
as multiples of powers of 10), and are guaranteed to be within the extent of the
domain. Ticks are often used to display reference lines, or tick marks, in
conjunction with the visualized data. The specified _count_ is only a hint; the
scale may return more or fewer values depending on the domain. See also
d3-array’s [ticks](https://github.com/d3/d3-array#ticks).

[#](#continuous_tickFormat) _continuous_.**tickFormat**(\[_count_\[,
_specifier_\]\])
[<>](https://github.com/d3/d3-scale/blob/master/src/tickFormat.js 'Source')

Returns a [number format](https://github.com/d3/d3-format) function suitable for
displaying a tick value, automatically computing the appropriate precision based
on the fixed interval between tick values. The specified _count_ should have the
same value as the count that is used to generate the
[tick values](#continuous_ticks).

An optional _specifier_ allows a
[custom format](https://github.com/d3/d3-format#locale_format) where the
precision of the format is automatically set by the scale as appropriate for the
tick interval. For example, to format percentage change, you might say:

var x = d3.scaleLinear() .domain(\[-1, 1\]) .range(\[0, 960\]);

var ticks = x.ticks(5), tickFormat = x.tickFormat(5, "+%");

ticks.map(tickFormat); // \["-100%", "-50%", "+0%", "+50%", "+100%"\]

If _specifier_ uses the format type `s`, the scale will return a
[SI-prefix format](https://github.com/d3/d3-format#locale_formatPrefix) based on
the largest value in the domain. If the _specifier_ already specifies a
precision, this method is equivalent to
[_locale_.format](https://github.com/d3/d3-format#locale_format).

[#](#continuous_nice) _continuous_.**nice**(\[_count_\])
[<>](https://github.com/d3/d3-scale/blob/master/src/nice.js 'Source')

Extends the [domain](#continuous_domain) so that it starts and ends on nice
round values. This method typically modifies the scale’s domain, and may only
extend the bounds to the nearest round value. An optional tick _count_ argument
allows greater control over the step size used to extend the bounds,
guaranteeing that the returned [ticks](#continuous_ticks) will exactly cover the
domain. Nicing is useful if the domain is computed from data, say using
[extent](https://github.com/d3/d3-array#extent), and may be irregular. For
example, for a domain of \[0.201479…, 0.996679…\], a nice domain might be \[0.2,
1.0\]. If the domain has more than two values, nicing the domain only affects
the first and last value. See also d3-array’s
[tickStep](https://github.com/d3/d3-array#tickStep).

Nicing a scale only modifies the current domain; it does not automatically nice
domains that are subsequently set using
[_continuous_.domain](#continuous_domain). You must re-nice the scale after
setting the new domain, if desired.

[#](#continuous_copy) _continuous_.**copy**()
[<>](https://github.com/d3/d3-scale/blob/master/src/continuous.js 'Source')

Returns an exact copy of this scale. Changes to this scale will not affect the
returned scale, and vice versa.

#### [](#linear-scales)Linear Scales

[#](#scaleLinear) d3.**scaleLinear**()
[<>](https://github.com/d3/d3-scale/blob/master/src/linear.js 'Source')

Constructs a new [continuous scale](#continuous-scales) with the unit
[domain](#continuous_domain) \[0, 1\], the unit [range](#continuous_range) \[0,
1\], the [default](https://github.com/d3/d3-interpolate#interpolate)
[interpolator](#continuous_interpolate) and [clamping](#continuous_clamp)
disabled. Linear scales are a good default choice for continuous quantitative
data because they preserve proportional differences. Each range value _y_ can be
expressed as a function of the domain value _x_: _y_ = _mx_ \+ _b_.

#### [](#power-scales)Power Scales

Power scales are similar to [linear scales](#linear-scales), except an
exponential transform is applied to the input domain value before the output
range value is computed. Each range value _y_ can be expressed as a function of
the domain value _x_: _y_ = _mx^k_ \+ _b_, where _k_ is the
[exponent](#pow_exponent) value. Power scales also support negative domain
values, in which case the input value and the resulting output value are
multiplied by -1.

[#](#scalePow) d3.**scalePow**()
[<>](https://github.com/d3/d3-scale/blob/master/src/pow.js 'Source')

Constructs a new [continuous scale](#continuous-scales) with the unit
[domain](#continuous_domain) \[0, 1\], the unit [range](#continuous_range) \[0,
1\], the [exponent](#pow_exponent) 1, the
[default](https://github.com/d3/d3-interpolate#interpolate)
[interpolator](#continuous_interpolate) and [clamping](#continuous_clamp)
disabled. (Note that this is effectively a [linear](#linear-scales) scale until
you set a different exponent.)

[#](#_pow) _pow_(_value_)
[<>](https://github.com/d3/d3-scale/blob/master/src/pow.js 'Source')

See [_continuous_](#_continuous).

[#](#pow_invert) _pow_.**invert**(_value_)
[<>](https://github.com/d3/d3-scale/blob/master/src/pow.js 'Source')

See [_continuous_.invert](#continuous_invert).

[#](#pow_exponent) _pow_.**exponent**(\[_exponent_\])
[<>](https://github.com/d3/d3-scale/blob/master/src/pow.js 'Source')

If _exponent_ is specified, sets the current exponent to the given numeric
value. If _exponent_ is not specified, returns the current exponent, which
defaults to 1. (Note that this is effectively a [linear](#linear-scales) scale
until you set a different exponent.)

[#](#pow_domain) _pow_.**domain**(\[_domain_\])
[<>](https://github.com/d3/d3-scale/blob/master/src/pow.js 'Source')

See [_continuous_.domain](#continuous_domain).

[#](#pow_range) _pow_.**range**(\[_range_\])
[<>](https://github.com/d3/d3-scale/blob/master/src/pow.js 'Source')

See [_continuous_.range](#continuous_range).

[#](#pow_rangeRound) _pow_.**rangeRound**(\[_range_\])
[<>](https://github.com/d3/d3-scale/blob/master/src/pow.js 'Source')

See [_continuous_.rangeRound](#continuous_rangeRound).

[#](#pow_clamp) _pow_.**clamp**(_clamp_)
[<>](https://github.com/d3/d3-scale/blob/master/src/pow.js 'Source')

See [_continuous_.clamp](#continuous_clamp).

[#](#pow_interpolate) _pow_.**interpolate**(_interpolate_)
[<>](https://github.com/d3/d3-scale/blob/master/src/pow.js 'Source')

See [_continuous_.interpolate](#continuous_interpolate).

[#](#pow_ticks) _pow_.**ticks**(\[_count_\])
[<>](https://github.com/d3/d3-scale/blob/master/src/pow.js 'Source')

See [_continuous_.ticks](#continuous_ticks).

[#](#pow_tickFormat) _pow_.**tickFormat**(\[_count_\[, _specifier_\]\])
[<>](https://github.com/d3/d3-scale/blob/master/src/pow.js 'Source')

See [_continuous_.tickFormat](#continuous_tickFormat).

[#](#pow_nice) _pow_.**nice**(\[_count_\])
[<>](https://github.com/d3/d3-scale/blob/master/src/pow.js 'Source')

See [_continuous_.nice](#continuous_nice).

[#](#pow_copy) _pow_.**copy**()
[<>](https://github.com/d3/d3-scale/blob/master/src/pow.js 'Source')

See [_continuous_.copy](#continuous_copy).

[#](#scaleSqrt) d3.**scaleSqrt**()
[<>](https://github.com/d3/d3-scale/blob/master/src/pow.js 'Source')

Constructs a new [continuous](#continuous-scales) [power scale](#power-scales)
with the unit [domain](#continuous_domain) \[0, 1\], the unit
[range](#continuous_range) \[0, 1\], the [exponent](#pow_exponent) 0.5, the
[default](https://github.com/d3/d3-interpolate#interpolate)
[interpolator](#continuous_interpolate) and [clamping](#continuous_clamp)
disabled. This is a convenience method equivalent to
`d3.scalePow().exponent(0.5)`.

#### [](#log-scales)Log Scales

Log scales are similar to [linear scales](#linear-scales), except a logarithmic
transform is applied to the input domain value before the output range value is
computed. The mapping to the range value _y_ can be expressed as a function of
the domain value _x_: _y_ = _m_ log(_x_) \+ _b_.

As log(0) = -∞, a log scale domain must be **strictly-positive or
strictly-negative**; the domain must not include or cross zero. A log scale with
a positive domain has a well-defined behavior for positive values, and a log
scale with a negative domain has a well-defined behavior for negative values.
(For a negative domain, input and output values are implicitly multiplied by
-1.) The behavior of the scale is undefined if you pass a negative value to a
log scale with a positive domain or vice versa.

[#](#scaleLog) d3.**scaleLog**()
[<>](https://github.com/d3/d3-scale/blob/master/src/log.js 'Source')

Constructs a new [continuous scale](#continuous-scales) with the
[domain](#log_domain) \[1, 10\], the unit [range](#log_range) \[0, 1\], the
[base](#log_base) 10, the
[default](https://github.com/d3/d3-interpolate#interpolate)
[interpolator](#log_interpolate) and [clamping](#log_clamp) disabled.

[#](#_log) _log_(_value_)
[<>](https://github.com/d3/d3-scale/blob/master/src/log.js 'Source')

See [_continuous_](#_continuous).

[#](#log_invert) _log_.**invert**(_value_)
[<>](https://github.com/d3/d3-scale/blob/master/src/log.js 'Source')

See [_continuous_.invert](#continuous_invert).

[#](#log_base) _log_.**base**(\[_base_\])
[<>](https://github.com/d3/d3-scale/blob/master/src/log.js 'Source')

If _base_ is specified, sets the base for this logarithmic scale to the
specified value. If _base_ is not specified, returns the current base, which
defaults to 10.

[#](#log_domain) _log_.**domain**(\[_domain_\])
[<>](https://github.com/d3/d3-scale/blob/master/src/log.js 'Source')

See [_continuous_.domain](#continuous_domain).

[#](#log_range) _log_.**range**(\[_range_\])
[<>](https://github.com/d3/d3-scale/blob/master/src/continuous.js 'Source')

See [_continuous_.range](#continuous_range).

[#](#log_rangeRound) _log_.**rangeRound**(\[_range_\])
[<>](https://github.com/d3/d3-scale/blob/master/src/log.js 'Source')

See [_continuous_.rangeRound](#continuous_rangeRound).

[#](#log_clamp) _log_.**clamp**(_clamp_)
[<>](https://github.com/d3/d3-scale/blob/master/src/log.js 'Source')

See [_continuous_.clamp](#continuous_clamp).

[#](#log_interpolate) _log_.**interpolate**(_interpolate_)
[<>](https://github.com/d3/d3-scale/blob/master/src/log.js 'Source')

See [_continuous_.interpolate](#continuous_interpolate).

[#](#log_ticks) _log_.**ticks**(\[_count_\])
[<>](https://github.com/d3/d3-scale/blob/master/src/log.js 'Source')

Like [_continuous_.ticks](#continuous_ticks), but customized for a log scale. If
the [base](#log_base) is an integer, the returned ticks are uniformly spaced
within each integer power of base; otherwise, one tick per power of base is
returned. The returned ticks are guaranteed to be within the extent of the
domain. If the orders of magnitude in the [domain](#log_domain) is greater than
_count_, then at most one tick per power is returned. Otherwise, the tick values
are unfiltered, but note that you can use [_log_.tickFormat](#log_tickFormat) to
filter the display of tick labels. If _count_ is not specified, it defaults
to 10.

[#](#log_tickFormat) _log_.**tickFormat**(\[_count_\[, _specifier_\]\])
[<>](https://github.com/d3/d3-scale/blob/master/src/log.js 'Source')

Like [_continuous_.tickFormat](#continuous_tickFormat), but customized for a log
scale. The specified _count_ typically has the same value as the count that is
used to generate the [tick values](#continuous_ticks). If there are too many
ticks, the formatter may return the empty string for some of the tick labels;
however, note that the ticks are still shown. To disable filtering, specify a
_count_ of Infinity. When specifying a count, you may also provide a format
_specifier_ or format function. For example, to get a tick formatter that will
display 20 ticks of a currency, say `log.tickFormat(20, "$,f")`. If the
specifier does not have a defined precision, the precision will be set
automatically by the scale, returning the appropriate format. This provides a
convenient way of specifying a format whose precision will be automatically set
by the scale.

[#](#log_nice) _log_.**nice**()
[<>](https://github.com/d3/d3-scale/blob/master/src/log.js 'Source')

Like [_continuous_.nice](#continuous_nice), except extends the domain to integer
powers of [base](#log_base). For example, for a domain of \[0.201479…,
0.996679…\], and base 10, the nice domain is \[0.1, 1\]. If the domain has more
than two values, nicing the domain only affects the first and last value.

[#](#log_copy) _log_.**copy**()
[<>](https://github.com/d3/d3-scale/blob/master/src/log.js 'Source')

See [_continuous_.copy](#continuous_copy).

#### [](#identity-scales)Identity Scales

Identity scales are a special case of [linear scales](#linear-scales) where the
domain and range are identical; the scale and its invert method are thus the
identity function. These scales are occasionally useful when working with pixel
coordinates, say in conjunction with an axis or brush. Identity scales do not
support [rangeRound](#continuous_rangeRound), [clamp](#continuous_clamp) or
[interpolate](#continuous_interpolate).

[#](#scaleIdentity) d3.**scaleIdentity**()
[<>](https://github.com/d3/d3-scale/blob/master/src/identity.js 'Source')

Constructs a new identity scale with the unit [domain](#continuous_domain) \[0,
1\] and the unit [range](#continuous_range) \[0, 1\].

#### [](#time-scales)Time Scales

Time scales are a variant of [linear scales](#linear-scales) that have a
temporal domain: domain values are coerced to
[dates](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date)
rather than numbers, and [invert](#continuous_invert) likewise returns a date.
Time scales implement [ticks](#time_ticks) based on
[calendar intervals](https://github.com/d3/d3-time), taking the pain out of
generating axes for temporal domains.

For example, to create a position encoding:

var x = d3.scaleTime() .domain(\[new Date(2000, 0, 1), new Date(2000, 0, 2)\])
.range(\[0, 960\]);

x(new Date(2000, 0, 1, 5)); // 200 x(new Date(2000, 0, 1, 16)); // 640
x.invert(200); // Sat Jan 01 2000 05:00:00 GMT-0800 (PST) x.invert(640); // Sat
Jan 01 2000 16:00:00 GMT-0800 (PST)

For a valid value _y_ in the range, _time_(_time_.invert(_y_)) equals _y_;
similarly, for a valid value _x_ in the domain, _time_.invert(_time_(_x_))
equals _x_. The invert method is useful for interaction, say to determine the
value in the domain that corresponds to the pixel location under the mouse.

[#](#scaleTime) d3.**scaleTime**()
[<>](https://github.com/d3/d3-scale/blob/master/src/time.js 'Source')

Constructs a new time scale with the [domain](#time_domain) \[2000-01-01,
2000-01-02\], the unit [range](#time_range) \[0, 1\], the
[default](https://github.com/d3/d3-interpolate#interpolate)
[interpolator](#time_interpolate) and [clamping](#time_clamp) disabled.

[#](#_time) _time_(_value_)
[<>](https://github.com/d3/d3-scale/blob/master/src/time.js 'Source')

See [_continuous_](#_continuous).

[#](#time_invert) _time_.**invert**(_value_)
[<>](https://github.com/d3/d3-scale/blob/master/src/time.js 'Source')

See [_continuous_.invert](#continuous_invert).

[#](#time_domain) _time_.**domain**(\[_domain_\])
[<>](https://github.com/d3/d3-scale/blob/master/src/time.js 'Source')

See [_continuous_.domain](#continuous_domain).

[#](#time_range) _time_.**range**(\[_range_\])
[<>](https://github.com/d3/d3-scale/blob/master/src/time.js 'Source')

See [_continuous_.range](#continuous_range).

[#](#time_rangeRound) _time_.**rangeRound**(\[_range_\])
[<>](https://github.com/d3/d3-scale/blob/master/src/time.js 'Source')

See [_continuous_.rangeRound](#continuous_rangeRound).

[#](#time_clamp) _time_.**clamp**(_clamp_)
[<>](https://github.com/d3/d3-scale/blob/master/src/time.js 'Source')

See [_continuous_.clamp](#continuous_clamp).

[#](#time_interpolate) _time_.**interpolate**(_interpolate_)
[<>](https://github.com/d3/d3-scale/blob/master/src/time.js 'Source')

See [_continuous_.interpolate](#continuous_interpolate).

[#](#time_ticks) _time_.**ticks**(\[_count_\])
[<>](https://github.com/d3/d3-scale/blob/master/src/time.js 'Source')  
[#](#time_ticks) _time_.**ticks**(\[_interval_\])

Returns representative dates from the scale’s [domain](#time_domain). The
returned tick values are uniformly-spaced (mostly), have sensible values (such
as every day at midnight), and are guaranteed to be within the extent of the
domain. Ticks are often used to display reference lines, or tick marks, in
conjunction with the visualized data.

An optional _count_ may be specified to affect how many ticks are generated. If
_count_ is not specified, it defaults to 10. The specified _count_ is only a
hint; the scale may return more or fewer values depending on the domain. For
example, to create ten default ticks, say:

var x = d3.scaleTime();

x.ticks(10); // \[Sat Jan 01 2000 00:00:00 GMT-0800 (PST), // Sat Jan 01 2000
03:00:00 GMT-0800 (PST), // Sat Jan 01 2000 06:00:00 GMT-0800 (PST), // Sat Jan
01 2000 09:00:00 GMT-0800 (PST), // Sat Jan 01 2000 12:00:00 GMT-0800 (PST), //
Sat Jan 01 2000 15:00:00 GMT-0800 (PST), // Sat Jan 01 2000 18:00:00 GMT-0800
(PST), // Sat Jan 01 2000 21:00:00 GMT-0800 (PST), // Sun Jan 02 2000 00:00:00
GMT-0800 (PST)\]

The following time intervals are considered for automatic ticks:

- 1-, 5-, 15- and 30-second.
- 1-, 5-, 15- and 30-minute.
- 1-, 3-, 6- and 12-hour.
- 1- and 2-day.
- 1-week.
- 1- and 3-month.
- 1-year.

In lieu of a _count_, a
[time _interval_](https://github.com/d3/d3-time#intervals) may be explicitly
specified. To prune the generated ticks for a given time _interval_, use
[_interval_.every](https://github.com/d3/d3-time#interval_every). For example,
to generate ticks at 15-[minute](https://github.com/d3/d3-time#minute)
intervals:

var x = d3.scaleTime() .domain(\[new Date(2000, 0, 1, 0), new Date(2000, 0, 1,
2)\]);

x.ticks(d3.timeMinute.every(15)); // \[Sat Jan 01 2000 00:00:00 GMT-0800 (PST),
// Sat Jan 01 2000 00:15:00 GMT-0800 (PST), // Sat Jan 01 2000 00:30:00 GMT-0800
(PST), // Sat Jan 01 2000 00:45:00 GMT-0800 (PST), // Sat Jan 01 2000 01:00:00
GMT-0800 (PST), // Sat Jan 01 2000 01:15:00 GMT-0800 (PST), // Sat Jan 01 2000
01:30:00 GMT-0800 (PST), // Sat Jan 01 2000 01:45:00 GMT-0800 (PST), // Sat Jan
01 2000 02:00:00 GMT-0800 (PST)\]

Alternatively, pass a test function to
[_interval_.filter](https://github.com/d3/d3-time#interval_filter):

x.ticks(d3.timeMinute.filter(function(d) { return d.getMinutes() % 15 === 0;
}));

Note: in some cases, such as with day ticks, specifying a _step_ can result in
irregular spacing of ticks because time intervals have varying length.

[#](#time_tickFormat) _time_.**tickFormat**(\[_count_\[, _specifier_\]\])
[<>](https://github.com/d3/d3-scale/blob/master/src/time.js 'Source')  
[#](#time_tickFormat) _time_.**tickFormat**(\[_interval_\[, _specifier_\]\])

Returns a time format function suitable for displaying [tick](#time_ticks)
values. The specified _count_ or _interval_ is currently ignored, but is
accepted for consistency with other scales such as
[_continuous_.tickFormat](#continuous_tickFormat). If a format _specifier_ is
specified, this method is equivalent to
[format](https://github.com/d3/d3-time-format#format). If _specifier_ is not
specified, the default time format is returned. The default multi-scale time
format chooses a human-readable representation based on the specified date as
follows:

- `%Y` \- for year boundaries, such as `2011`.
- `%B` \- for month boundaries, such as `February`.
- `%b %d` \- for week boundaries, such as `Feb 06`.
- `%a %d` \- for day boundaries, such as `Mon 07`.
- `%I %p` \- for hour boundaries, such as `01 AM`.
- `%I:%M` \- for minute boundaries, such as `01:23`.
- `:%S` \- for second boundaries, such as `:45`.
- `.%L` \- milliseconds for all other times, such as `.012`.

Although somewhat unusual, this default behavior has the benefit of providing
both local and global context: for example, formatting a sequence of ticks as
\[11 PM, Mon 07, 01 AM\] reveals information about hours, dates, and day
simultaneously, rather than just the hours \[11 PM, 12 AM, 01 AM\]. See
[d3-time-format](https://github.com/d3/d3-time-format) if you’d like to roll
your own conditional time format.

[#](#time_nice) _time_.**nice**(\[_count_\])
[<>](https://github.com/d3/d3-scale/blob/master/src/time.js 'Source')  
[#](#time_nice) _time_.**nice**(\[_interval_\[, _step_\]\])

Extends the [domain](#time_domain) so that it starts and ends on nice round
values. This method typically modifies the scale’s domain, and may only extend
the bounds to the nearest round value. See [_continuous_.nice](#continuous_nice)
for more.

An optional tick _count_ argument allows greater control over the step size used
to extend the bounds, guaranteeing that the returned [ticks](#time_ticks) will
exactly cover the domain. Alternatively, a
[time _interval_](https://github.com/d3/d3-time#intervals) may be specified to
explicitly set the ticks. If an _interval_ is specified, an optional _step_ may
also be specified to skip some ticks. For example,
`time.nice(d3.timeSecond, 10)` will extend the domain to an even ten seconds (0,
10, 20, _etc._). See [_time_.ticks](#time_ticks) and
[_interval_.every](https://github.com/d3/d3-time#interval_every) for further
detail.

Nicing is useful if the domain is computed from data, say using
[extent](https://github.com/d3/d3-array#extent), and may be irregular. For
example, for a domain of \[2009-07-13T00:02, 2009-07-13T23:48\], the nice domain
is \[2009-07-13, 2009-07-14\]. If the domain has more than two values, nicing
the domain only affects the first and last value.

[#](#scaleUtc) d3.**scaleUtc**()
[<>](https://github.com/d3/d3-scale/blob/master/src/utcTime.js 'Source')

Equivalent to [time](#time), but the returned time scale operates in
[Coordinated Universal Time](https://en.wikipedia.org/wiki/Coordinated_Universal_Time)
rather than local time.

### [](#sequential-scales)Sequential Scales

Sequential scales, like [diverging scales](#diverging-scales), are similar to
[continuous scales](#continuous-scales) in that they map a continuous, numeric
input domain to a continuous output range. However, unlike continuous scales,
the output range of a sequential scale is fixed by its interpolator and not
configurable. These scales do not expose [invert](#continuous_invert),
[range](#continuous_range), [rangeRound](#continuous_rangeRound) and
[interpolate](#continuous_interpolate) methods.

[#](#scaleSequential) d3.**scaleSequential**(_interpolator_)
[<>](https://github.com/d3/d3-scale/blob/master/src/sequential.js 'Source')

Constructs a new sequential scale with the given
[_interpolator_](#sequential_interpolator) function. When the scale is
[applied](#_sequential), the interpolator will be invoked with a value typically
in the range \[0, 1\], where 0 represents the minimum value and 1 represents the
maximum value. For example, to implement the ill-advised
[HSL](https://github.com/d3/d3-color#hsl) rainbow scale:

var rainbow = d3.scaleSequential(function(t) { return d3.hsl(t \* 360, 1, 0.5) +
""; });

A more aesthetically-pleasing and perceptually-effective cyclical hue encoding
is to use
[d3.interpolateRainbow](https://github.com/d3/d3-scale-chromatic/blob/master/README.md#interpolateRainbow):

var rainbow = d3.scaleSequential(d3.interpolateRainbow);

[#](#_sequential) _sequential_(_value_)
[<>](https://github.com/d3/d3-scale/blob/master/src/sequential.js 'Source')

See [_continuous_](#_continuous).

[#](#sequential_domain) _sequential_.**domain**(\[_domain_\])
[<>](https://github.com/d3/d3-scale/blob/master/src/sequential.js 'Source')

See [_continuous_.domain](#continuous_domain). Note that a sequential scale’s
domain must be numeric and must contain exactly two values.

[#](#sequential_clamp) _sequential_.**clamp**(\[_clamp_\])
[<>](https://github.com/d3/d3-scale/blob/master/src/sequential.js 'Source')

See [_continuous_.clamp](#continuous_clamp).

[#](#sequential_interpolator) _sequential_.**interpolator**(\[_interpolator_\])
[<>](https://github.com/d3/d3-scale/blob/master/src/sequential.js 'Source')

If _interpolator_ is specified, sets the scale’s interpolator to the specified
function. If _interpolator_ is not specified, returns the scale’s current
interpolator.

[#](#sequential_copy) _sequential_.**copy**()
[<>](https://github.com/d3/d3-scale/blob/master/src/sequential.js 'Source')

See [_continuous_.copy](#continuous_copy).

### [](#diverging-scales)Diverging Scales

Diverging scales, like [sequential scales](#sequential-scales), are similar to
[continuous scales](#continuous-scales) in that they map a continuous, numeric
input domain to a continuous output range. However, unlike continuous scales,
the output range of a diverging scale is fixed by its interpolator and not
configurable. These scales do not expose [invert](#continuous_invert),
[range](#continuous_range), [rangeRound](#continuous_rangeRound) and
[interpolate](#continuous_interpolate) methods.

[#](#scaleDiverging) d3.**scaleDiverging**(_interpolator_)
[<>](https://github.com/d3/d3-scale/blob/master/src/diverging.js 'Source')

Constructs a new diverging scale with the given
[_interpolator_](#diverging_interpolator) function. When the scale is
[applied](#_diverging), the interpolator will be invoked with a value typically
in the range \[0, 1\], where 0 represents the extreme negative value, 0.5
represents the neutral value, and 1 represents the extreme positive value. For
example, using
[d3.interpolateSpectral](https://github.com/d3/d3-scale-chromatic/blob/master/README.md#interpolateSpectral):

var spectral = d3.scaleDiverging(d3.interpolateSpectral);

[#](#_diverging) _diverging_(_value_)
[<>](https://github.com/d3/d3-scale/blob/master/src/diverging.js 'Source')

See [_continuous_](#_continuous).

[#](#diverging_domain) _diverging_.**domain**(\[_domain_\])
[<>](https://github.com/d3/d3-scale/blob/master/src/diverging.js 'Source')

See [_continuous_.domain](#continuous_domain). Note that a diverging scale’s
domain must be numeric and must contain exactly three values. The default domain
is \[0, 0.5, 1\].

[#](#diverging_clamp) _diverging_.**clamp**(\[_clamp_\])
[<>](https://github.com/d3/d3-scale/blob/master/src/diverging.js 'Source')

See [_continuous_.clamp](#continuous_clamp).

[#](#diverging_interpolator) _diverging_.**interpolator**(\[_interpolator_\])
[<>](https://github.com/d3/d3-scale/blob/master/src/diverging.js 'Source')

If _interpolator_ is specified, sets the scale’s interpolator to the specified
function. If _interpolator_ is not specified, returns the scale’s current
interpolator.

[#](#diverging_copy) _diverging_.**copy**()
[<>](https://github.com/d3/d3-scale/blob/master/src/diverging.js 'Source')

See [_continuous_.copy](#continuous_copy).

### [](#quantize-scales)Quantize Scales

Quantize scales are similar to [linear scales](#linear-scales), except they use
a discrete rather than continuous range. The continuous input domain is divided
into uniform segments based on the number of values in (_i.e._, the cardinality
of) the output range. Each range value _y_ can be expressed as a quantized
linear function of the domain value _x_: _y_ = _m round(x)_ \+ _b_. See
[bl.ocks.org/4060606](http://bl.ocks.org/mbostock/4060606) for an example.

[#](#scaleQuantize) d3.**scaleQuantize**()
[<>](https://github.com/d3/d3-scale/blob/master/src/quantize.js 'Source')

Constructs a new quantize scale with the unit [domain](#quantize_domain) \[0,
1\] and the unit [range](#quantize_range) \[0, 1\]. Thus, the default quantize
scale is equivalent to the
[Math.round](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Math/round)
function.

[#](#_quantize) _quantize_(_value_)
[<>](https://github.com/d3/d3-scale/blob/master/src/quantize.js 'Source')

Given a _value_ in the input [domain](#quantize_domain), returns the
corresponding value in the output [range](#quantize_range). For example, to
apply a color encoding:

var color = d3.scaleQuantize() .domain(\[0, 1\]) .range(\["brown",
"steelblue"\]);

color(0.49); // "brown" color(0.51); // "steelblue"

Or dividing the domain into three equally-sized parts with different range
values to compute an appropriate stroke width:

var width = d3.scaleQuantize() .domain(\[10, 100\]) .range(\[1, 2, 4\]);

width(20); // 1 width(50); // 2 width(80); // 4

[#](#quantize_invertExtent) _quantize_.**invertExtent**(_value_)
[<>](https://github.com/d3/d3-scale/blob/master/src/quantize.js 'Source')

Returns the extent of values in the [domain](#quantize_domain) \[_x0_, _x1_\]
for the corresponding _value_ in the [range](#quantize_range): the inverse of
[_quantize_](#_quantize). This method is useful for interaction, say to
determine the value in the domain that corresponds to the pixel location under
the mouse.

var width = d3.scaleQuantize() .domain(\[10, 100\]) .range(\[1, 2, 4\]);

width.invertExtent(2); // \[40, 70\]

[#](#quantize_domain) _quantize_.**domain**(\[_domain_\])
[<>](https://github.com/d3/d3-scale/blob/master/src/quantize.js 'Source')

If _domain_ is specified, sets the scale’s domain to the specified two-element
array of numbers. If the elements in the given array are not numbers, they will
be coerced to numbers. If _domain_ is not specified, returns the scale’s current
domain.

[#](#quantize_range) _quantize_.**range**(\[_range_\])
[<>](https://github.com/d3/d3-scale/blob/master/src/quantize.js 'Source')

If _range_ is specified, sets the scale’s range to the specified array of
values. The array may contain any number of discrete values. The elements in the
given array need not be numbers; any value or type will work. If _range_ is not
specified, returns the scale’s current range.

[#](#quantize_ticks) _quantize_.**ticks**(\[_count_\])
[<>](https://github.com/d3/d3-scale/blob/master/src/quantize.js 'Source')

Equivalent to [_continuous_.ticks](#continuous_ticks).

[#](#quantize_tickFormat) _quantize_.**tickFormat**(\[_count_\[,
_specifier_\]\])
[<>](https://github.com/d3/d3-scale/blob/master/src/linear.js 'Source')

Equivalent to [_continuous_.tickFormat](#continuous_tickFormat).

[#](#quantize_nice) _quantize_.**nice**()
[<>](https://github.com/d3/d3-scale/blob/master/src/quantize.js 'Source')

Equivalent to [_continuous_.nice](#continuous_nice).

[#](#quantize_copy) _quantize_.**copy**()
[<>](https://github.com/d3/d3-scale/blob/master/src/quantize.js 'Source')

Returns an exact copy of this scale. Changes to this scale will not affect the
returned scale, and vice versa.

### [](#quantile-scales)Quantile Scales

Quantile scales map a sampled input domain to a discrete range. The domain is
considered continuous and thus the scale will accept any reasonable input value;
however, the domain is specified as a discrete set of sample values. The number
of values in (the cardinality of) the output range determines the number of
quantiles that will be computed from the domain. To compute the quantiles, the
domain is sorted, and treated as a
[population of discrete values](https://en.wikipedia.org/wiki/Quantile#Quantiles_of_a_population);
see d3-array’s [quantile](https://github.com/d3/d3-array#quantile). See
[bl.ocks.org/8ca036b3505121279daf](http://bl.ocks.org/mbostock/8ca036b3505121279daf)
for an example.

[#](#scaleQuantile) d3.**scaleQuantile**()
[<>](https://github.com/d3/d3-scale/blob/master/src/quantile.js 'Source')

Constructs a new quantile scale with an empty [domain](#quantile_domain) and an
empty [range](#quantile_range). The quantile scale is invalid until both a
domain and range are specified.

[#](#_quantile) _quantile_(_value_)
[<>](https://github.com/d3/d3-scale/blob/master/src/quantile.js 'Source')

Given a _value_ in the input [domain](#quantile_domain), returns the
corresponding value in the output [range](#quantile_range).

[#](#quantile_invertExtent) _quantile_.**invertExtent**(_value_)
[<>](https://github.com/d3/d3-scale/blob/master/src/quantile.js 'Source')

Returns the extent of values in the [domain](#quantile_domain) \[_x0_, _x1_\]
for the corresponding _value_ in the [range](#quantile_range): the inverse of
[_quantile_](#_quantile). This method is useful for interaction, say to
determine the value in the domain that corresponds to the pixel location under
the mouse.

[#](#quantile_domain) _quantile_.**domain**(\[_domain_\])
[<>](https://github.com/d3/d3-scale/blob/master/src/quantile.js 'Source')

If _domain_ is specified, sets the domain of the quantile scale to the specified
set of discrete numeric values. The array must not be empty, and must contain at
least one numeric value; NaN, null and undefined values are ignored and not
considered part of the sample population. If the elements in the given array are
not numbers, they will be coerced to numbers. A copy of the input array is
sorted and stored internally. If _domain_ is not specified, returns the scale’s
current domain.

[#](#quantile_range) _quantile_.**range**(\[_range_\])
[<>](https://github.com/d3/d3-scale/blob/master/src/quantile.js 'Source')

If _range_ is specified, sets the discrete values in the range. The array must
not be empty, and may contain any type of value. The number of values in (the
cardinality, or length, of) the _range_ array determines the number of quantiles
that are computed. For example, to compute quartiles, _range_ must be an array
of four elements such as \[0, 1, 2, 3\]. If _range_ is not specified, returns
the current range.

[#](#quantile_quantiles) _quantile_.**quantiles**()
[<>](https://github.com/d3/d3-scale/blob/master/src/quantile.js 'Source')

Returns the quantile thresholds. If the [range](#quantile_range) contains _n_
discrete values, the returned array will contain _n_ \- 1 thresholds. Values
less than the first threshold are considered in the first quantile; values
greater than or equal to the first threshold but less than the second threshold
are in the second quantile, and so on. Internally, the thresholds array is used
with [bisect](https://github.com/d3/d3-array#bisect) to find the output quantile
associated with the given input value.

[#](#quantile_copy) _quantile_.**copy**()
[<>](https://github.com/d3/d3-scale/blob/master/src/quantile.js 'Source')

Returns an exact copy of this scale. Changes to this scale will not affect the
returned scale, and vice versa.

### [](#threshold-scales)Threshold Scales

Threshold scales are similar to [quantize scales](#quantize-scales), except they
allow you to map arbitrary subsets of the domain to discrete values in the
range. The input domain is still continuous, and divided into slices based on a
set of threshold values. See
[bl.ocks.org/3306362](http://bl.ocks.org/mbostock/3306362) for an example.

[#](#scaleThreshold) d3.**scaleThreshold**()
[<>](https://github.com/d3/d3-scale/blob/master/src/threshold.js 'Source')

Constructs a new threshold scale with the default [domain](#threshold_domain)
\[0.5\] and the default [range](#threshold_range) \[0, 1\]. Thus, the default
threshold scale is equivalent to the
[Math.round](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Math/round)
function for numbers; for example threshold(0.49) returns 0, and threshold(0.51)
returns 1.

[#](#_threshold) _threshold_(_value_)
[<>](https://github.com/d3/d3-scale/blob/master/src/threshold.js 'Source')

Given a _value_ in the input [domain](#threshold_domain), returns the
corresponding value in the output [range](#threshold_range). For example:

var color = d3.scaleThreshold() .domain(\[0, 1\]) .range(\["red", "white",
"green"\]);

color(-1); // "red" color(0); // "white" color(0.5); // "white" color(1); //
"green" color(1000); // "green"

[#](#threshold_invertExtent) _threshold_.**invertExtent**(_value_)
[<>](https://github.com/d3/d3-scale/blob/master/src/threshold.js 'Source')

Returns the extent of values in the [domain](#threshold_domain) \[_x0_, _x1_\]
for the corresponding _value_ in the [range](#threshold_range), representing the
inverse mapping from range to domain. This method is useful for interaction, say
to determine the value in the domain that corresponds to the pixel location
under the mouse. For example:

var color = d3.scaleThreshold() .domain(\[0, 1\]) .range(\["red", "white",
"green"\]);

color.invertExtent("red"); // \[undefined, 0\] color.invertExtent("white"); //
\[0, 1\] color.invertExtent("green"); // \[1, undefined\]

[#](#threshold_domain) _threshold_.**domain**(\[_domain_\])
[<>](https://github.com/d3/d3-scale/blob/master/src/threshold.js 'Source')

If _domain_ is specified, sets the scale’s domain to the specified array of
values. The values must be in sorted ascending order, or the behavior of the
scale is undefined. The values are typically numbers, but any naturally ordered
values (such as strings) will work; a threshold scale can be used to encode any
type that is ordered. If the number of values in the scale’s range is N+1, the
number of values in the scale’s domain must be N. If there are fewer than N
elements in the domain, the additional values in the range are ignored. If there
are more than N elements in the domain, the scale may return undefined for some
inputs. If _domain_ is not specified, returns the scale’s current domain.

[#](#threshold_range) _threshold_.**range**(\[_range_\])
[<>](https://github.com/d3/d3-scale/blob/master/src/threshold.js 'Source')

If _range_ is specified, sets the scale’s range to the specified array of
values. If the number of values in the scale’s domain is N, the number of values
in the scale’s range must be N+1. If there are fewer than N+1 elements in the
range, the scale may return undefined for some inputs. If there are more than
N+1 elements in the range, the additional values are ignored. The elements in
the given array need not be numbers; any value or type will work. If _range_ is
not specified, returns the scale’s current range.

[#](#threshold_copy) _threshold_.**copy**()
[<>](https://github.com/d3/d3-scale/blob/master/src/threshold.js 'Source')

Returns an exact copy of this scale. Changes to this scale will not affect the
returned scale, and vice versa.

### [](#ordinal-scales)Ordinal Scales

Unlike [continuous scales](#continuous-scales), ordinal scales have a discrete
domain and range. For example, an ordinal scale might map a set of named
categories to a set of colors, or determine the horizontal positions of columns
in a column chart.

[#](#scaleOrdinal) d3.**scaleOrdinal**(\[_range_\])
[<>](https://github.com/d3/d3-scale/blob/master/src/ordinal.js 'Source')

Constructs a new ordinal scale with an empty [domain](#ordinal_domain) and the
specified [_range_](#ordinal_range). If a _range_ is not specified, it defaults
to the empty array; an ordinal scale always returns undefined until a non-empty
range is defined.

[#](#_ordinal) _ordinal_(_value_)
[<>](https://github.com/d3/d3-scale/blob/master/src/ordinal.js 'Source')

Given a _value_ in the input [domain](#ordinal_domain), returns the
corresponding value in the output [range](#ordinal_range). If the given _value_
is not in the scale’s [domain](#ordinal_domain), returns the
[unknown](#ordinal_value); or, if the unknown value is
[implicit](#scaleImplicit) (the default), then the _value_ is implicitly added
to the domain and the next-available value in the range is assigned to _value_,
such that this and subsequent invocations of the scale given the same input
_value_ return the same output value.

[#](#ordinal_domain) _ordinal_.**domain**(\[_domain_\])
[<>](https://github.com/d3/d3-scale/blob/master/src/ordinal.js 'Source')

If _domain_ is specified, sets the domain to the specified array of values. The
first element in _domain_ will be mapped to the first element in the range, the
second domain value to the second range value, and so on. Domain values are
stored internally in a map from stringified value to index; the resulting index
is then used to retrieve a value from the range. Thus, an ordinal scale’s values
must be coercible to a string, and the stringified version of the domain value
uniquely identifies the corresponding range value. If _domain_ is not specified,
this method returns the current domain.

Setting the domain on an ordinal scale is optional if the
[unknown value](#ordinal_unknown) is [implicit](#scaleImplicit) (the default).
In this case, the domain will be inferred implicitly from usage by assigning
each unique value passed to the scale a new value from the range. Note that an
explicit domain is recommended to ensure deterministic behavior, as inferring
the domain from usage will be dependent on ordering.

[#](#ordinal_range) _ordinal_.**range**(\[_range_\])
[<>](https://github.com/d3/d3-scale/blob/master/src/ordinal.js 'Source')

If _range_ is specified, sets the range of the ordinal scale to the specified
array of values. The first element in the domain will be mapped to the first
element in _range_, the second domain value to the second range value, and so
on. If there are fewer elements in the range than in the domain, the scale will
reuse values from the start of the range. If _range_ is not specified, this
method returns the current range.

[#](#ordinal_unknown) _ordinal_.**unknown**(\[_value_\])
[<>](https://github.com/d3/d3-scale/blob/master/src/ordinal.js 'Source')

If _value_ is specified, sets the output value of the scale for unknown input
values and returns this scale. If _value_ is not specified, returns the current
unknown value, which defaults to [implicit](#implicit). The implicit value
enables implicit domain construction; see [_ordinal_.domain](#ordinal_domain).

[#](#ordinal_copy) _ordinal_.**copy**()
[<>](https://github.com/d3/d3-scale/blob/master/src/ordinal.js 'Source')

Returns an exact copy of this ordinal scale. Changes to this scale will not
affect the returned scale, and vice versa.

[#](#scaleImplicit) d3.**scaleImplicit**
[<>](https://github.com/d3/d3-scale/blob/master/src/ordinal.js 'Source')

A special value for [_ordinal_.unknown](#ordinal_unknown) that enables implicit
domain construction: unknown values are implicitly added to the domain.

#### [](#band-scales)Band Scales

Band scales are like [ordinal scales](#ordinal-scales) except the output range
is continuous and numeric. Discrete output values are automatically computed by
the scale by dividing the continuous range into uniform bands. Band scales are
typically used for bar charts with an ordinal or categorical dimension. The
[unknown value](#ordinal_unknown) of a band scale is effectively undefined: they
do not allow implicit domain construction.

[![band](https://raw.githubusercontent.com/d3/d3-scale/master/img/band.png)](https://raw.githubusercontent.com/d3/d3-scale/master/img/band.png)

[#](#scaleBand) d3.**scaleBand**()
[<>](https://github.com/d3/d3-scale/blob/master/src/band.js 'Source')

Constructs a new band scale with the empty [domain](#band_domain), the unit
[range](#band_range) \[0, 1\], no [padding](#band_padding), no
[rounding](#band_round) and center [alignment](#band_align).

[#](#_band) _band_(_value_)
[<>](https://github.com/d3/d3-scale/blob/master/src/band.js 'Source')

Given a _value_ in the input [domain](#band_domain), returns the start of the
corresponding band derived from the output [range](#band_range). If the given
_value_ is not in the scale’s domain, returns undefined.

[#](#band_domain) _band_.**domain**(\[_domain_\])
[<>](https://github.com/d3/d3-scale/blob/master/src/band.js 'Source')

If _domain_ is specified, sets the domain to the specified array of values. The
first element in _domain_ will be mapped to the first band, the second domain
value to the second band, and so on. Domain values are stored internally in a
map from stringified value to index; the resulting index is then used to
determine the band. Thus, a band scale’s values must be coercible to a string,
and the stringified version of the domain value uniquely identifies the
corresponding band. If _domain_ is not specified, this method returns the
current domain.

[#](#band_range) _band_.**range**(\[_range_\])
[<>](https://github.com/d3/d3-scale/blob/master/src/band.js 'Source')

If _range_ is specified, sets the scale’s range to the specified two-element
array of numbers. If the elements in the given array are not numbers, they will
be coerced to numbers. If _range_ is not specified, returns the scale’s current
range, which defaults to \[0, 1\].

[#](#band_rangeRound) _band_.**rangeRound**(\[_range_\])
[<>](https://github.com/d3/d3-scale/blob/master/src/band.js 'Source')

Sets the scale’s [_range_](#band_range) to the specified two-element array of
numbers while also enabling [rounding](#band_round). This is a convenience
method equivalent to:

band .range(range) .round(true);

Rounding is sometimes useful for avoiding antialiasing artifacts, though also
consider the
[shape-rendering](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering)
“crispEdges” styles.

[#](#band_round) _band_.**round**(\[_round_\])
[<>](https://github.com/d3/d3-scale/blob/master/src/band.js 'Source')

If _round_ is specified, enables or disables rounding accordingly. If rounding
is enabled, the start and stop of each band will be integers. Rounding is
sometimes useful for avoiding antialiasing artifacts, though also consider the
[shape-rendering](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering)
“crispEdges” styles. Note that if the width of the domain is not a multiple of
the cardinality of the range, there may be leftover unused space, even without
padding! Use [_band_.align](#band_align) to specify how the leftover space is
distributed.

[#](#band_paddingInner) _band_.**paddingInner**(\[_padding_\])
[<>](https://github.com/d3/d3-scale/blob/master/src/band.js 'Source')

If _padding_ is specified, sets the inner padding to the specified value which
must be in the range \[0, 1\]. If _padding_ is not specified, returns the
current inner padding which defaults to 0. The inner padding determines the
ratio of the range that is reserved for blank space between bands.

[#](#band_paddingOuter) _band_.**paddingOuter**(\[_padding_\])
[<>](https://github.com/d3/d3-scale/blob/master/src/band.js 'Source')

If _padding_ is specified, sets the outer padding to the specified value which
must be in the range \[0, 1\]. If _padding_ is not specified, returns the
current outer padding which defaults to 0. The outer padding determines the
ratio of the range that is reserved for blank space before the first band and
after the last band.

[#](#band_padding) _band_.**padding**(\[_padding_\])
[<>](https://github.com/d3/d3-scale/blob/master/src/band.js 'Source')

A convenience method for setting the [inner](#band_paddingInner) and
[outer](#band_paddingOuter) padding to the same _padding_ value. If _padding_ is
not specified, returns the inner padding.

[#](#band_align) _band_.**align**(\[_align_\])
[<>](https://github.com/d3/d3-scale/blob/master/src/band.js 'Source')

If _align_ is specified, sets the alignment to the specified value which must be
in the range \[0, 1\]. If _align_ is not specified, returns the current
alignment which defaults to 0.5. The alignment determines how any leftover
unused space in the range is distributed. A value of 0.5 indicates that the
leftover space should be equally distributed before the first band and after the
last band; _i.e._, the bands should be centered within the range. A value of 0
or 1 may be used to shift the bands to one side, say to position them adjacent
to an axis.

[#](#band_bandwidth) _band_.**bandwidth**()
[<>](https://github.com/d3/d3-scale/blob/master/src/band.js 'Source')

Returns the width of each band.

[#](#band_step) _band_.**step**()
[<>](https://github.com/d3/d3-scale/blob/master/src/band.js 'Source')

Returns the distance between the starts of adjacent bands.

[#](#band_copy) _band_.**copy**()
[<>](https://github.com/d3/d3-scale/blob/master/src/band.js 'Source')

Returns an exact copy of this scale. Changes to this scale will not affect the
returned scale, and vice versa.

#### [](#point-scales)Point Scales

Point scales are a variant of [band scales](#band-scales) with the bandwidth
fixed to zero. Point scales are typically used for scatterplots with an ordinal
or categorical dimension. The [unknown value](#ordinal_unknown) of a point scale
is always undefined: they do not allow implicit domain construction.

[![point](https://raw.githubusercontent.com/d3/d3-scale/master/img/point.png)](https://raw.githubusercontent.com/d3/d3-scale/master/img/point.png)

[#](#scalePoint) d3.**scalePoint**()
[<>](https://github.com/d3/d3-scale/blob/master/src/band.js 'Source')

Constructs a new point scale with the empty [domain](#point_domain), the unit
[range](#point_range) \[0, 1\], no [padding](#point_padding), no
[rounding](#point_round) and center [alignment](#point_align).

[#](#_point) _point_(_value_)
[<>](https://github.com/d3/d3-scale/blob/master/src/band.js 'Source')

Given a _value_ in the input [domain](#point_domain), returns the corresponding
point derived from the output [range](#point_range). If the given _value_ is not
in the scale’s domain, returns undefined.

[#](#point_domain) _point_.**domain**(\[_domain_\])
[<>](https://github.com/d3/d3-scale/blob/master/src/band.js 'Source')

If _domain_ is specified, sets the domain to the specified array of values. The
first element in _domain_ will be mapped to the first point, the second domain
value to the second point, and so on. Domain values are stored internally in a
map from stringified value to index; the resulting index is then used to
determine the point. Thus, a point scale’s values must be coercible to a string,
and the stringified version of the domain value uniquely identifies the
corresponding point. If _domain_ is not specified, this method returns the
current domain.

[#](#point_range) _point_.**range**(\[_range_\])
[<>](https://github.com/d3/d3-scale/blob/master/src/band.js 'Source')

If _range_ is specified, sets the scale’s range to the specified two-element
array of numbers. If the elements in the given array are not numbers, they will
be coerced to numbers. If _range_ is not specified, returns the scale’s current
range, which defaults to \[0, 1\].

[#](#point_rangeRound) _point_.**rangeRound**(\[_range_\])
[<>](https://github.com/d3/d3-scale/blob/master/src/band.js 'Source')

Sets the scale’s [_range_](#point_range) to the specified two-element array of
numbers while also enabling [rounding](#point_round). This is a convenience
method equivalent to:

point .range(range) .round(true);

Rounding is sometimes useful for avoiding antialiasing artifacts, though also
consider the
[shape-rendering](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering)
“crispEdges” styles.

[#](#point_round) _point_.**round**(\[_round_\])
[<>](https://github.com/d3/d3-scale/blob/master/src/band.js 'Source')

If _round_ is specified, enables or disables rounding accordingly. If rounding
is enabled, the position of each point will be integers. Rounding is sometimes
useful for avoiding antialiasing artifacts, though also consider the
[shape-rendering](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering)
“crispEdges” styles. Note that if the width of the domain is not a multiple of
the cardinality of the range, there may be leftover unused space, even without
padding! Use [_point_.align](#point_align) to specify how the leftover space is
distributed.

[#](#point_padding) _point_.**padding**(\[_padding_\])
[<>](https://github.com/d3/d3-scale/blob/master/src/band.js 'Source')

If _padding_ is specified, sets the outer padding to the specified value which
must be in the range \[0, 1\]. If _padding_ is not specified, returns the
current outer padding which defaults to 0. The outer padding determines the
ratio of the range that is reserved for blank space before the first point and
after the last point. Equivalent to [_band_.paddingOuter](#band_paddingOuter).

[#](#point_align) _point_.**align**(\[_align_\])
[<>](https://github.com/d3/d3-scale/blob/master/src/band.js 'Source')

If _align_ is specified, sets the alignment to the specified value which must be
in the range \[0, 1\]. If _align_ is not specified, returns the current
alignment which defaults to 0.5. The alignment determines how any leftover
unused space in the range is distributed. A value of 0.5 indicates that the
leftover space should be equally distributed before the first point and after
the last point; _i.e._, the points should be centered within the range. A value
of 0 or 1 may be used to shift the points to one side, say to position them
adjacent to an axis.

[#](#point_bandwidth) _point_.**bandwidth**()
[<>](https://github.com/d3/d3-scale/blob/master/src/band.js 'Source')

Returns zero.

[#](#point_step) _point_.**step**()
[<>](https://github.com/d3/d3-scale/blob/master/src/band.js 'Source')

Returns the distance between the starts of adjacent points.

[#](#point_copy) _point_.**copy**()
[<>](https://github.com/d3/d3-scale/blob/master/src/band.js 'Source')

Returns an exact copy of this scale. Changes to this scale will not affect the
returned scale, and vice versa.
