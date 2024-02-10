export const CustomNavbar = () => {
  return (
    <div className="navbar bg-gray-500">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <ul
        tabIndex={0}
        className="absolute flex flex-row ml-36 justify-start justify-center menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-80"
      >
        <li>
          <a className="text-lg" href="/item1">
            Join Quiz
          </a>
        </li>

        <li>
          <a className="text-lg">Create new Quiz</a>
        </li>
      </ul>
      <ul
        tabIndex={1}
        className="flex flex-row justify-center menu menu-sm dropdown-content mt-3 z-[1] p-2 mr-10 shadow rounded-box w-52"
      >
        <li>
          <a className="text-lg" href="/item1">
            Login
          </a>
        </li>

        <li>
          <a className="text-lg">Register</a>
        </li>
      </ul>

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
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
