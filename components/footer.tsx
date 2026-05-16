export function Footer() {
  return (
    <footer className="border-t border-white/10 py-16">
      <div className="section-shell grid gap-12 md:grid-cols-4">
        <div>
          <p className="text-lg font-semibold">edTech</p>
          <p className="mt-4 max-w-xs text-sm leading-6 text-white/60">
            A premium visual learning platform built for students who learn faster with motion, clarity, and momentum.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Product</p>
          <ul className="mt-4 space-y-3 text-sm text-white/60">
            <li>Courses</li>
            <li>AI Transform</li>
            <li>Gamification</li>
            <li>Leaderboard</li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Company</p>
          <ul className="mt-4 space-y-3 text-sm text-white/60">
            <li>About</li>
            <li>Careers</li>
            <li>Contact</li>
            <li>Press</li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Resources</p>
          <ul className="mt-4 space-y-3 text-sm text-white/60">
            <li>Blog</li>
            <li>Guides</li>
            <li>Help Center</li>
            <li>Privacy</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
