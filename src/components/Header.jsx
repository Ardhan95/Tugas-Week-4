function Header({ judul, subjudul }) {
  return (
    <header className="header">
      <h1>{judul}</h1>
      <p>{subjudul}</p>
    </header>
  );
}

export default Header;