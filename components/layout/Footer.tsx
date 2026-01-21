import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t mt-2 border-zinc-800 bg-zinc-950 text-zinc-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid gap-8 sm:grid-cols-3">
          
          {/* Brand */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">
              Sujal Ghorse
            </h3>
            <p className="text-sm leading-relaxed">
            Fresher backend-focused full-stack developer who enjoys learning by
            building real-world applications and strengthening core software
            engineering fundamentals.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h4 className="font-medium text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About
                </Link>
              </li>
             
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-3">
            <h4 className="font-medium text-white">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="https://github.com/9-Sujal"
                  target="_blank"
                  className="hover:text-white transition"
                >
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.linkedin.com/in/sujal-ghorse-1255b0260/"
                  target="_blank"
                  className="hover:text-white transition"
                >
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:your-Sujalghorse9@gmail.com"
                  className="hover:text-white transition"
                >
                  Email
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p>
            © {new Date().getFullYear()} Sujal Ghorse. All rights reserved.
          </p>
          <p className="text-zinc-500">
            Built with Next.js, Tailwind CSS & TypeScript.
          </p>
        </div>
      </div>
    </footer>
  );
}
