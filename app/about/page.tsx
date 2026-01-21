import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Sujal Ghorse",
  description:
    "Backend-focused Full Stack Developer specializing in scalable systems, APIs, authentication, and cloud deployments.",
};

export default function About() {
  return (
    <main className="min-h-screen bg-zinc-900 text-zinc-200 px-4 sm:px-6 py-16">
      <section className="max-w-4xl mx-auto space-y-10">
        {/* Heading */}
        <header className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            About Me
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Backend-focused Full Stack Developer building scalable, secure, and
            production-ready applications.
          </p>
        </header>

        {/* Intro */}
        <section className="space-y-4">
          <p className="leading-relaxed">
            Hi, I’m <span className="text-white font-medium">Sujal Ghorse</span>,
            a backend-first full-stack developer who enjoys designing clean
            system architectures, writing efficient APIs, and building
            applications that scale reliably.
          </p>

          <p className="leading-relaxed text-zinc-300">
            I focus on writing maintainable code, optimizing performance, and
            implementing secure authentication and authorization systems. I
            enjoy working across the stack, but my strength lies in backend
            engineering and system design.
          </p>
        </section>

        {/* What I Do */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">What I Do</h2>
          <ul className="list-disc list-inside space-y-2 text-zinc-300">
            <li>Design and build scalable backend systems</li>
            <li>Develop secure authentication & authorization flows</li>
            <li>Create RESTful APIs with proper validation</li>
            <li>Design optimized database schemas</li>
            <li>Build full-stack applications with modern UI</li>
            <li>Deploy and maintain apps on cloud platforms</li>
          </ul>
        </section>

        {/* Tech Stack */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">
            Backend & Full Stack Tech
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="font-semibold text-white">Backend</h3>
              <p className="text-zinc-300">
                Node.js, Express.js, Next.js (App Router, API Routes),
                REST APIs, Server Actions
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-white">Databases</h3>
              <p className="text-zinc-300">
                MongoDB (Mongoose), PostgreSQL, Neon Postgres,
                Schema Design, Indexing
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-white">Auth & Security</h3>
              <p className="text-zinc-300">
                NextAuth.js, JWT, OAuth (Google),
                Role-based Access Control, bcrypt
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-white">Frontend</h3>
              <p className="text-zinc-300">
                React, Next.js, Tailwind CSS,
                Responsive UI, State Management
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-white">DevOps & Cloud</h3>
              <p className="text-zinc-300">
                Vercel, Render, Cloudinary,
                Environment Management, CI/CD basics
              </p>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">
            Development Philosophy
          </h2>
          <ul className="list-disc list-inside space-y-2 text-zinc-300">
            <li>Clean code over clever hacks</li>
            <li>Scalability and security first</li>
            <li>Backend reliability matters</li>
            <li>Good DX leads to better products</li>
            <li>Continuous learning and improvement</li>
          </ul>
        </section>

        {/* Closing */}
        <section className="space-y-4">
          <p className="text-zinc-300 leading-relaxed">
            I enjoy working on meaningful projects, experimenting with modern
            web technologies, and continuously improving my engineering skills.
          </p>

          <p className="text-zinc-400">
            Let’s build something solid, scalable, and impactful.
          </p>
        </section>
      </section>
    </main>
  );
}
