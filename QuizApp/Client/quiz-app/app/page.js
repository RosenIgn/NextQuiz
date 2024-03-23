
export default function Home() {
  return (
    <main id="main">
      <main className="flex back items-center justify-center min-h-screen bg-dark-blue ">
        <section className="text-left flex flex-col justify-center self-center">
          <div className="w-1/2 flex flex-col justify-center self-center text-left">
            <h2 className="text-5xl text-main-white font-extrabold mb-6">
              Simple. Enjoyable. Fun.
            </h2>
            <p className="text-xl text-main-white mb-6">
              Ready to create quizzes that will entertain, educate, and engage
              your audience? Sign up for our platform today and unleash your
              creativity!
            </p>
            <a
              role="button"
              className="btn hover:text-dark-blue bg-main-blue text-main-white w-1/3 text-lg border-none"
              href="/register"
            >
              Get started!
            </a>
          </div>
        </section>
        <section>
          <img src="https://cdn.discordapp.com/attachments/1154751121106157701/1219698157009768488/EdbknXlZmx15KlOxJ5YoNBMp-image-maker.jpg?ex=660c3f6d&is=65f9ca6d&hm=3950c936a259cfeee2b4ca083c5d4815fdd03cf902c1e1fecd7df2c9082d2d21&"
          className="w-4/5 h-full rounded-lg"/>
        </section> 
      </main>
    </main>
  );
}
