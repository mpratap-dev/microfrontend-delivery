import React, { Suspense } from "react";
import PropTypes from "prop-types";

const If = (props) => {
  const { condition, children, defaultCase = null, lazyload } = props;

  const render = (component) =>
    lazyload ? (
      //** Import the children using React.lazy while using lazyload
      <Suspense fallback={<div>Loading...</div>}>{component}</Suspense>
    ) : (
      component
    );

  return <>{!!condition ? render(children) : render(defaultCase)}</>;
};

If.propTypes = {
  condition: PropTypes.any.isRequired,
  children: PropTypes.node.isRequired,
  defaultCase: PropTypes.node,
};

export default If;
