# Parallel Coords

**Parallel coordinates** are a common way of visualizing Multivariate data.

## Use Case

Parallel Coords allow for `filtering` of all dimensions, and matching them all
against each other. This gives the viewer a flexible way to navigate the data.

## Interaction

The user can interact in two ways

_Brushing Dimensions_

Each dimension column has a brush, where the user can drag a rectangle on the
y‑axis to filter only items in the data that the brush covers.

_Dimension Ordering_

The dimension columns can also be re‑ordered. The user can drag the title of
each dimension column, swapping placements with other columns accordingly.

## Data Structure

Considering that the data needs to be a collection of things with the same dimension properties, by default the structure it looks for is a json-type format.