import React from "react";
import "./styles.css";

interface SkeletonProps {
  width: number;
  height: number;
  borderRadius?: number;
}

const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  borderRadius = 0,
}) => (
  <div
    data-testid="skeleton"
    className="skeleton"
    style={{
      width: `${width}px`,
      height: `${height}px`,
      borderRadius: `${borderRadius}px`,
    }}
  ></div>
);

export default Skeleton;
