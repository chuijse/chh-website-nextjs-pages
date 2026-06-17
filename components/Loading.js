const LoadingSpinner = ({ routes }) => (
  <div className="root-container">
    <div className="root_route_text">
      <p>{routes}</p>
    </div>
    <div className="item"></div>
  </div>
);

export default LoadingSpinner;
