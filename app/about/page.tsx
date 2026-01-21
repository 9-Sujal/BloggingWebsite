import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Sujal Ghorse",
  description:
    "Fresher Backend-focused Full Stack Developer passionate about APIs, databases, authentication systems, and scalable web applications.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-zinc-900 text-zinc-200 px-4 sm:px-6 py-20">
      <section className="max-w-4xl mx-auto space-y-14">
        {/* Hero */}
        <header className="space-y-5">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            About Me
          </h1>
          <p className="text-zinc-400 leading-relaxed">
            Fresher backend-focused full-stack developer who enjoys learning by
            building real-world applications and strengthening core software
            engineering fundamentals.
          </p>
        </header>

        {/* Introduction */}
        <section className="space-y-5">
          <p className="leading-relaxed">
            Hi, I’m{" "}
            <span className="text-white font-medium">Sujal Ghorse</span>, a
            fresher full-stack developer with a strong interest in backend
            development and system design fundamentals.
          </p>

          <p className="leading-relaxed text-zinc-300">
            I enjoy understanding how things work behind the scenes — from API
            design and database schemas to authentication flows and deployment
            pipelines. I believe writing clean, readable, and maintainable code
            is just as important as making things work.
          </p>

          <p className="leading-relaxed text-zinc-300">
            My learning journey is driven by curiosity and hands-on practice. I
            focus on building complete applications instead of isolated features,
            so I can understand the full lifecycle of a product.
          </p>
        </section>

        {/* What Drives Me */}
        <section className="space-y-5">
          <h2 className="text-2xl font-semibold text-white">
            What Drives Me as a Developer
          </h2>

          <ul className="list-disc list-inside space-y-3 text-zinc-300">
            <li>
              Understanding backend fundamentals instead of relying only on
              frameworks
            </li>
            <li>
              Designing APIs that are simple, predictable, and scalable
            </li>
            <li>
              Learning how real production systems handle data and users
            </li>
            <li>
              Writing code that is easy for others (and future me) to understand
            </li>
            <li>
              Continuously improving through feedback and practice
            </li>
          </ul>
        </section>

        {/* Tech Stack */}
        <section className="space-y-7">
          <h2 className="text-2xl font-semibold text-white">
            Tech Stack & Tools
          </h2>

          <div className="grid sm:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h3 className="font-semibold text-white">Backend Development</h3>
              <p className="text-zinc-300 leading-relaxed">
                Node.js, Express.js, Next.js (App Router & API Routes), RESTful
                APIs, request validation, error handling, and middleware-based
                architecture.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-white">Databases</h3>
              <p className="text-zinc-300 leading-relaxed">
                MongoDB with Mongoose, PostgreSQL with Neon, basic schema design,
                indexing concepts, relationships, and efficient CRUD
                operations.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-white">Authentication & Security</h3>
              <p className="text-zinc-300 leading-relaxed">
                NextAuth.js, JWT-based authentication, OAuth (Google), password
                hashing using bcrypt, session handling, and protected routes.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-white">Frontend Development</h3>
              <p className="text-zinc-300 leading-relaxed">
                React, Next.js, Tailwind CSS, responsive layouts, component-based
                architecture, and smooth UI interactions.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-white">Tools & Deployment</h3>
              <p className="text-zinc-300 leading-relaxed">
                Git & GitHub for version control, Vercel and Render for
                deployment, Cloudinary for media storage, environment variable
                management, and basic CI awareness.
              </p>
            </div>
          </div>
        </section>

        {/* Projects Philosophy */}
        <section className="space-y-5">
          <h2 className="text-2xl font-semibold text-white">
            How I Approach Projects
          </h2>

          <p className="text-zinc-300 leading-relaxed">
            When I start a project, I focus on understanding the problem first.
            I plan basic database schemas, API routes, and data flow before
            writing code. This helps me avoid unnecessary rework and keeps the
            application structured.
          </p>

          <p className="text-zinc-300 leading-relaxed">
            I prefer building features end-to-end — from backend APIs to frontend
            integration — so I gain a deeper understanding of how real-world
            applications are built and maintained.
          </p>
        </section>

        {/* Growth & Learning */}
        <section className="space-y-5">
          <h2 className="text-2xl font-semibold text-white">
            Learning & Growth
          </h2>

          <ul className="list-disc list-inside space-y-3 text-zinc-300">
            <li>Improving problem-solving through DSA practice</li>
            <li>Strengthening backend concepts and system design basics</li>
            <li>Exploring performance, scalability, and clean architecture</li>
            <li>Learning industry best practices through documentation</li>
            <li>Actively building and refining personal projects</li>
          </ul>
        </section>

        {/* Closing */}
        <section className="space-y-5">
          <p className="text-zinc-300 leading-relaxed">
            As a fresher, I’m motivated to learn, adapt quickly, and contribute
            wherever I can. I value consistency, discipline, and curiosity —
            qualities I believe are essential for long-term growth as a
            developer.
          </p>

          <p className="text-zinc-400">
            I’m currently looking for internship or entry-level opportunities
            where I can learn from experienced developers and work on impactful
            products.
          </p>
        </section>
      </section>
    </main>
  );
}
