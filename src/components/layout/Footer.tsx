import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray py-10 mt-12 border-t border-gray-700">
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4 text-primary">Axiom AI</h3>
          <p className="text-light opacity-80 text-sm">
            Your daily dose of AI news and innovation.
          </p>
          <div className="flex space-x-4 mt-4">
            {/* Social media icons */}
            <a href="#" className="text-light hover:text-primary transition-colors">
              {/* Replace with actual SVG icons */}F
            </a>
            <a href="#" className="text-light hover:text-primary transition-colors">
              T
            </a>
            <a href="#" className="text-light hover:text-primary transition-colors">
              L
            </a>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 text-primary">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/articles" className="text-light opacity-80 hover:text-primary transition-colors">
                Articles
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-light opacity-80 hover:text-primary transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-light opacity-80 hover:text-primary transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-light opacity-80 hover:text-primary transition-colors">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 text-primary">Newsletter</h3>
          <p className="text-light opacity-80 text-sm mb-4">
            Stay updated with the latest AI news.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="p-2 rounded-l-md border border-gray-700 bg-dark text-light flex-grow"
            />
            <button
              type="submit"
              className="bg-primary text-light px-4 py-2 rounded-r-md hover:bg-opacity-90 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="text-center text-sm text-light opacity-60 mt-8 pt-8 border-t border-gray-700 mx-auto container">
        © {new Date().getFullYear()} Axiom AI. All rights reserved.
      </div>
    </footer>
  );
}
