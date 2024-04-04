import React from "react";

import { render } from "@testing-library/react";
import { it, expect } from "vitest";
import Cell from "./Cell";

it('renders without crashing', function () {
    render(<Cell />);
});

it('matches snapshot', function () {
    const { container } = render(<Cell />);
    expect(container).toMatchSnapshot();
});
