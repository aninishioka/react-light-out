import React from "react";

import { render, fireEvent } from "@testing-library/react";
import { it, expect } from "vitest";
import Cell from "./Cell";
import Board from "./Board";

it('renders without crashing', function () {
    render(<Board />);
});

// test win condition
it('win condition works', function () {
    const { container, debug } = render(<Board nrows={1} ncols={1} chanceLightStartsOn={0} />);
    // Example of how to use debug
    debug(container);
    expect(container.querySelector('#winMsg')).toBeInTheDocument();
});

// test flip cells
it('cells flip correctly', function () {
    const { container, debug } = render(<Board nrows={1} ncols={1} chanceLightStartsOn={1} />);
    // Example of how to use debug

    fireEvent.click(container.querySelector('.Cell-lit'));
    debug(container);


    expect(container.querySelector('.Cell')).not.toBeInTheDocument();
});

// test snapshot
it('match snapshot', function () {
    const { container, debug } = render(<Board nrows={3} ncols={3} chanceLightStartsOn={0} />);

    expect(container).toMatchSnapshot();
});