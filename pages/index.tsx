import Guest from "../components/Guest";
import User from "../components/User";
import {useSession, getSession} from "next-auth/react"
import {GetServerSideProps} from "next";

export default function Home() {
  const { data: session } = useSession()

  return (
    <div className=" h-screen overflow-hidden">
        {session ? <User user={session.user}/> : <Guest />}
    </div>
  )
}


export const getServerSideProps: GetServerSideProps = async ({req} ) => {
  const session = await getSession({req})
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false
      }
    }
  }
  return {
    props: {session}
  }
}