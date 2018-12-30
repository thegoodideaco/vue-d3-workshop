# Parallel Coords

**Parallel coordinates** are a common way of visualizing Multivariate data.

## Use Case

Parallel Coords allow for `filtering` of all dimensions, and matching them all
against each other. This gives the viewer a flexible way to navigate the data.

## How to use

The `Parallel Coord Component` needs two main things.

- The dataset
- List of dimension keys to generate columns

Other additional options are available

_It is important to note that there are some
[gotchas](https://github.com/crossfilter/crossfilter/wiki/Crossfilter-Gotchas)
when dealing with datasets while doing multidimensional filtering with
Crossfilter._

## Data Structure

The data structure it looks for is a simple array of objects.
