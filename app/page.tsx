import Header from '../components/Header'
import Features from '../components/Features'
import About from '../components/About'
import Contact from '../components/Contact'
import Head from 'next/head'
import TrendingCourses from '../components/TrendingCourses'


export default function Home() {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Features />
      <TrendingCourses />
      <About />
      <Contact />
    </div>
  )
}
