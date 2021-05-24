function Header() {
  return(
    <header className="bg-white overflow-hidden lg:flex">
      <div className="text-center self-center py-10 lg:w-1/2 lg:py-0">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900">
          <span className="block">Anders Bo Rasmussen</span>
          <span className="block text-blue-400">.NET Backend Developer</span>
        </h1>
      </div>
      <div className="lg:w-1/2">
        <img className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full" src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80" alt=""></img>
      </div>
    </header>
  );
}

export default Header;
