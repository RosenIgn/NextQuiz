"use client";
const Jwt = localStorage.getItem()

const handleLogout = () => {
  fetch('https://localhost:5074/api/Auth/Logout', {
    method: 'POST',
  })
    .then(response => response.text())
    .then(data => {
      if (data == "success") {
        localStorage.clear();
        window.location.href = '/login';
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  console.log('Logging out...');
};

export const CustomNavbar = () => {
  const handleLogoutClick = (e) => {
    e.preventDefault();
    handleLogout();
  };
  
  return (
    <div className="absolute navbar border-bottom h-10 bg-bone-white">
      <div className="flex-1">
        <a role="button" className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-transparent text-xl text-main-blue border-none" href="http://localhost:3000">NextQuiz</a>
      </div>
      <ul
        tabIndex={0}
        className="absolute flex flex-row self-center pt-5 ml-36 justify-start justify-center menu menu-sm dropdown-content z-[1] rounded-box w-80"
      >
        <li>
          <a className="btn text-lg text-white bg-transparent border-none" href="/joinQuiz">Join Quiz</a>
        </li>

        <li>
          <a className="btn text-lg text-white bg-transparent border-none" href="/createQuiz">Create new Quiz</a>
        </li>
      </ul>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-3">
          <a role="button" className="btn text-lg text-white border-none bg-base-200" href="/login">Login</a>
          <a role="button" className="btn text-lg d-none d-md-flex ms-2 text-base-200 hover:text-base-content border-none bg-main-blue" href="/register">Register</a>
        </ul>
      </div>

      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
          ></div>
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-gray-800 rounded-box w-52"
          >
            <li>
              <a href="/profile">Profile</a>
            </li>
            <li>
              <a href="/" onClick={handleLogoutClick}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};