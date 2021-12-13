import Head from "next/head"
import type { NextPage } from "next"
import App from "../components/App"

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>SEO Wordcounter | Julien Piron</title>
      </Head>
      <App />
    </>
  )
}

export default Home
