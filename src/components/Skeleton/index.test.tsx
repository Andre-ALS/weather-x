import { screen, render } from "@testing-library/react";
import Skeleton from "./index";

describe("Skeleton", () => {
  it("renders with correct width and height", () => {
    render(<Skeleton width={100} height={50} />);

    const skeleton = screen.getByTestId("skeleton");

    expect(skeleton).toHaveStyle({
      width: "100px",
      height: "50px",
    });
  });

  it("applies default borderRadius of 0", () => {
    render(<Skeleton width={100} height={50} />);

    const skeleton = screen.getByTestId("skeleton");

    expect(skeleton).toHaveStyle({ borderRadius: "0px" });
  });

  it("applies provided borderRadius", () => {
    render(<Skeleton width={100} height={50} borderRadius={10} />);

    const skeleton = screen.getByTestId("skeleton");

    expect(skeleton).toHaveStyle({ borderRadius: "10px" });
  });
});
