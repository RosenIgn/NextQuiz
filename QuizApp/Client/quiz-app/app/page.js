export default function Home() {
  return (
    <>
      <main className="flex items-center justify-center min-h-screen bg-dark-blue">
        <section className="text-left">
          <div className="w-1/2 text-left">
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
          <img/> {/* pomosht ne moga da dobavq snimkata :( */}
        </section> 
      </main>
    </>
  );
}
