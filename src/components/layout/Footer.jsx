import { Link } from 'react-router-dom'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaWhatsapp, FaHeart, FaArrowRight } from 'react-icons/fa'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-navy dark:bg-gray-950 text-white">
      {/* Green top stripe */}
      <div className="h-1 bg-gradient-to-r from-primary-400 via-primary-300 to-primary-400" />

      {/* CTA row */}
      <div className="bg-primary-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-xl text-white">Ready to Join Kidland School?</h3>
            <p className="text-white/80 text-sm">Admission open for 2083 B.S. — Limited seats available!</p>
          </div>
          <Link to="/apply" className="btn-secondary whitespace-nowrap shrink-0">Apply Now <FaArrowRight size={12} /></Link>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-primary-400 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">K</span>
              </div>
              <div>
                <div className="font-bold text-lg">Kidland School</div>
                <div className="text-xs text-primary-300 tracking-widest uppercase">Duty · Honor · Country</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5 max-w-xs">
              Established in 2005, Kidland School provides internationally-standard Montessori and academic education in Kusunti, Lalitpur, Nepal.
            </p>
            <div className="space-y-2.5">
              {[
                [FaMapMarkerAlt, 'Kusunti, Lalitpur-13 (Opp. Yatayat Office), Nepal'],
                [FaPhone, '9841404920 / 01-5430237'],
                [FaEnvelope, 'kidlandmontessori@gmail.com'],
              ].map(([Icon, text], i) => (
                <div key={i} className="flex items-start gap-2.5 text-sm text-gray-400">
                  <Icon className="text-primary-400 mt-0.5 shrink-0" size={13} />
                  <span>{text}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-5">
              {[
                ['https://facebook.com/kidlandmontessori', FaFacebook, 'hover:bg-blue-600'],
                ['https://instagram.com/kidlandeducation', FaInstagram, 'hover:bg-pink-600'],
                ['https://api.whatsapp.com/send?phone=9779841404920', FaWhatsapp, 'hover:bg-green-600'],
              ].map(([href, Icon, hov], i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                  className={`w-9 h-9 rounded-lg bg-white/10 ${hov} flex items-center justify-center transition-colors`}>
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-primary-400 inline-block rounded" /> Quick Links
            </h4>
            <ul className="space-y-2">
              {[['/', 'Home'], ['/about', 'About Us'], ['/academics', 'Academics'], ['/admission', 'Admission'], ['/apply', 'Apply Online'], ['/events', 'Events'], ['/news', 'News & Blog'], ['/gallery', 'Gallery'], ['/notices', 'Notice Board'], ['/contact', 'Contact']].map(([to, label]) => (
                <li key={label}>
                  <Link to={to} className="text-gray-400 hover:text-primary-300 text-sm transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary-400 shrink-0" />{label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programmes + hours */}
          <div>
            <h4 className="font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-primary-400 inline-block rounded" /> Programmes
            </h4>
            <ul className="space-y-2 mb-7">
              {['Pre-Primary (Montessori)', 'Primary Level (G1–5)', 'Lower Secondary (G6–8)', 'Secondary Level (G9–10)', 'ECA & CCA Activities'].map(p => (
                <li key={p}>
                  <Link to="/academics" className="text-gray-400 hover:text-primary-300 text-sm transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary-400 shrink-0" />{p}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="rounded-lg p-4 border border-primary-400/20 bg-primary-400/5">
              <div className="text-xs font-bold text-primary-300 uppercase tracking-wide mb-2">Office Hours</div>
              <div className="text-sm text-gray-400">Sunday – Friday</div>
              <div className="text-sm text-white font-semibold">10:00 AM – 4:00 PM</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <span>© {year} Kidland School, Kusunti, Lalitpur. All rights reserved.</span>
          <span className="flex items-center gap-1">Develop by <FaHeart className="text-red-400 mx-0.5" size={10} /> BR Codex Pvt Ltd</span>
          <div className="flex gap-4">
            <Link to="#" className="hover:text-primary-300 transition-colors">Privacy Policy</Link>
            <Link to="/admin/login" className="hover:text-primary-300 transition-colors">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
