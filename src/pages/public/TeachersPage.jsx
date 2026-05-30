import { motion } from 'framer-motion'
import { FaEnvelope, FaLinkedin } from 'react-icons/fa'
import { PageHero, SectionHeader, ScrollTop } from '../../components/ui/index'

const TEACHERS = [
  { name:'Ms. Shanti Khadka', role:'Founder and Director', subj:'Leadership and Education', init:'SK', color:'from-primary-500 to-green-500' },
  { name:'Mr. Ram P. Adhikari', role:'Principal', subj:'Administration', init:'RA', color:'from-navy to-blue-700' },
  { name:'Ms. Sunita Gurung', role:'Montessori Coordinator', subj:'Pre-Primary', init:'SG', color:'from-rose-500 to-pink-500' },
  { name:'Mr. Bikash Shrestha', role:'Head of Science', subj:'Physics and Chemistry', init:'BS', color:'from-emerald-500 to-teal-500' },
  { name:'Ms. Puja Maharjan', role:'English HOD', subj:'English Literature', init:'PM', color:'from-violet-500 to-purple-500' },
  { name:'Mr. Deepak Tamang', role:'Mathematics Teacher', subj:'Mathematics', init:'DT', color:'from-amber-500 to-orange-500' },
  { name:'Ms. Anita Rai', role:'ECA Coordinator', subj:'Arts and Culture', init:'AR', color:'from-pink-500 to-rose-500' },
  { name:'Mr. Sagar Karki', role:'Computer Teacher', subj:'IT and Computing', init:'SK2', color:'from-cyan-500 to-blue-500' },
]

export default function TeachersPage() {
  return (
    <>
      <PageHero tag="Our Team" title="Faculty and Staff" sub="Qualified, experienced and dedicated educators committed to every student's success." breadcrumbs={[{label:'Teachers'}]}/>
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader tag="Faculty" title="Meet Our Teachers" sub="Kidland is managed by a visionary team with qualified and creative teaching staff."/>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEACHERS.map((t,i)=>(
              <motion.div key={t.name} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.08}} className="card overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className={`bg-gradient-to-br ${t.color} p-6 text-center relative`}>
                  <div className="w-20 h-20 mx-auto rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-white font-bold text-2xl shadow-lg">{t.init}</div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-gray-900 dark:text-white">{t.name}</h3>
                  <p className="text-primary-500 text-xs font-semibold mt-0.5">{t.role}</p>
                  <p className="text-gray-400 text-xs mt-0.5 mb-3">{t.subj}</p>
                  <div className="flex justify-center gap-2">
                    <button className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400 hover:bg-primary-400 hover:text-white transition-all"><FaEnvelope size={13}/></button>
                    <button className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all"><FaLinkedin size={13}/></button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <ScrollTop/>
    </>
  )
}
