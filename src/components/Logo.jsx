const Logo = ({ logo }) => {
  return (
    <div className="owner-info-heading">
      <h2>J&J Safety Floor</h2>
      <img
        src={logo}
        alt="J and J Safety Floor Logo"
        className="owner-info-heading-img"
      />
    </div>
  );
};
export default Logo;
