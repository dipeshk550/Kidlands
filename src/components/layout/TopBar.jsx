import { FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa'

const NOTICES_TICKER = [
  'Admission Open for Academic Year 2083 B.S.',
  'Annual Sports Day – June 5, 2025',
  'SEE Preparation Special Batch Starts June 1',
  'Scholarship Test – May 25, 2025',
  'Parent-Teacher Meeting – May 30',
]

export default function TopBar() {
  return (
    <div className="hidden md:block bg-navy text-white text-xs py-2 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Left: contact */}
        <div className="flex items-center gap-5">
          <a href="tel:9841404920" className="flex items-center gap-1.5 hover:text-primary-300 transition-colors">
            <FaPhone size={10} /><span>9841404920 / 01-5430237</span>
          </a>
          <a href="mailto:kidlandmontessori@gmail.com" className="flex items-center gap-1.5 hover:text-primary-300 transition-colors">
            <FaEnvelope size={10} /><span>kidlandmontessori@gmail.com</span>
          </a>
        </div>
        {/* Center: scrolling ticker */}
        <div className="flex-1 overflow-hidden mx-6 hidden lg:block">
          <div className="flex items-center gap-2">
            <span className="shrink-0 bg-primary-400 text-white text-[10px] font-bold px-2 py-0.5 rounded">NOTICE</span>
            <div className="overflow-hidden flex-1">
              <span className="ticker text-gray-300 text-[11px]">
                {NOTICES_TICKER.join('   •   ')}
              </span>
            </div>
          </div>
        </div>
        {/* Right: socials */}
        <div className="flex items-center gap-2">
          {[
            ['https://facebook.com/kidlandmontessori', FaFacebook, 'hover:bg-blue-600'],
            ['https://instagram.com/kidlandeducation', FaInstagram, 'hover:bg-pink-600'],
            ['https://api.whatsapp.com/send?phone=9779841404920', FaWhatsapp, 'hover:bg-green-600'],
          ].map(([href, Icon, hov], i) => (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer"
              className={`w-6 h-6 rounded flex items-center justify-center bg-white/10 ${hov} transition-colors`}>
              <Icon size={11} />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
