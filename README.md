## Nasa Rover Monitor

### Input

The first line of input is the upper-right coordinates of the
plateau, the lower-left coordinates are assumed to be 0,0.

The rest of the input is information pertaining to the rovers that
have been deployed. Each rover has two lines of input. The first line
gives the rover's position, and the second line is a series of
instructions telling the rover how to explore the plateau.
The position is made up of two integers and a letter separated by
spaces, corresponding to the x and y co-ordinates and the rover's
orientation.

Each rover will be finished sequentially, which means that the second
rover won't start to move until the first one has finished moving.

### Output

The output for each rover should be its final co-ordinates and
heading.

### Example

1. Input the upper-right coordinates x and y.
2. Input first rover coordinates and orientation.
3. Input commands to the first rover.
4. Input second rover coordinates and orientation.
5. Input commands to the second rover.

#### Test Input

```
5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM
```

#### Expected Output
```
1 3 N
5 1 E
```

### Configuration

### Dependencies

- [jest](https://jestjs.io/docs/getting-started): JavaScript Testing Framework with a focus on simplicity.