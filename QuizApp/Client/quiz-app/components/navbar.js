export const CustomNavbar = () => {
  return (
    <div className="absolute navbar h-10 bg-gray-800">
      <div className="flex-1">
        <a role="button" className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-transparent text-xl text-blue-500 border-none" href="http://localhost:3000">NextQuiz</a>
      </div>
      <ul
        tabIndex={0}
        className="absolute flex flex-row self-center ml-36 justify-start justify-center menu menu-sm dropdown-content z-[1] shadow rounded-box w-80"
      >
        <li>
          <a className="text-lg text-white" href="/joinQuiz">Join Quiz</a>
        </li>

        <li>
          <a className="text-lg text-white" href="/createQuiz">Create new Quiz</a>
        </li>
      </ul>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-3">
          <a role="button" className="btn text-lg text-white border-none bg-transparent" href="/login">Вход</a>
          <a role="button" className="btn text-lg d-none d-md-flex ms-2 text-white border-none bg-transparent" href="/register">Регистрация</a>
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
              <a href="/profile">Профил</a>
            </li>
            <li>
              <a href="/accountSettings">Настройки</a>
            </li>
            <li>
              <a href="/logout">Излез от акаунта</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};