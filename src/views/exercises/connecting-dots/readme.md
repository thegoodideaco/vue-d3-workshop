# Connecting the Dots

## So, what is a SVG

SVG's are basically HTML DOM Elements, that behave like HTML DOM elements, but
have some extra functionality. They are mainly used to draw vector images, which
is a fancy way of saying shapes created with math functions.

Let's setup our component to have a `SVG` as it's template. We will then use the
`circle` element tag to visualize some data

```html
<!-- Empty component with SVG template -->
```

### Let's draw some dots

For this exercise, we will use a simple dataset, containing a collection of x
and y coordinates. These have been created already, so let's go ahead and import
them

```html
<!-- show import of dataset -->
<!-- Include v-for to show how to render the data visual -->
```

## Data Visualization

Data is _the_ basic building block of analytical exploration. It tells a story,
in an infinite amount of ways. But how do we read the story? How do we choose
what chapters to focus on, and where to look for clues?

In a neverending cycle of trying to interpret data, we need a way in which to
_try_ and see the data from different perspectives.

> "_The greatest value of a picture is when it forces us to notice what we never
> expected to see._"
>
> -[John Tukey](https://en.wikipedia.org/wiki/John_Tukey)

_We have this amazing thing called vision. and out of all our senses, it's the
most abundant in collecting data, giving us a better view of the world around
us. However it opens doors for entirely new ways of understanding, which in
return can open even more doors when combining parts of this spectrum._

Having an interface that leverages these particular dimensions not only gives us
insight from a viewing perspective, but also allows for navigation into the data
that is being shown.

### Successful Data Visuals are hard

There are alot of factors that go into data visualizations. However, the
ultimate goal is to be able to _gain insight_.

Data can come in many forms. Most of the time we work with data that is
quantitive, ordinal, or categorical. And alot of the time, datasets can include
more than one type in some way shape or form.

So what do we want data visual to be able to do?

- Reveal Insights
- Cause Change
- Reveal More Charts

In order to have this, we need to determine how the user can interact with it,
in order to _navigate the data_

Maps, Scatterplots, Bar charts, etc... Ultimately gives us a holistic view at
first glance. We can see EVERYTHING. But the ability to dive in deeper, to
select groups of data items, and relational dimensions, allows us to focus on
particular sections of the data at any given moment.
