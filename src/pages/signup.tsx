import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Signup() {
  return (
    <>
      <Head>
        <title>Sign Up - NARA</title>
        <meta name="description" content="Sign up for Nottawa Area Residents Association" />
      </Head>

      <header className="bg-white w-full py-8">
        <div className="w-full px-4 md:container md:mx-auto">
          <Link 
            href="/"
            className="inline-block"
          >
            <Image 
              src="/nara-logo.png" 
              alt="NARA Logo" 
              width={0}
              height={0}
              sizes="100vw"
              className="h-32 mb-4 w-auto"
            />
          </Link>
        </div>
      </header>

      <main className="min-h-screen bg-gradient-to-b from-[#1e3a5f] to-[#0a192f]">
        <div className="w-full px-4 md:container md:mx-auto py-8">
          <div className="max-w-2xl mx-auto">
            <iframe 
              src="https://docs.google.com/forms/d/e/1FAIpQLSfudXR88cv-_q7TCamNxzCQsVsNdCyKGZQs3BH-aBc9ELOaVg/viewform?embedded=true" 
              width="100%" 
              height="1300"
              className="rounded-xl"
              style={{ border: 'none' }}
              title="NARA Signup Form"
            >
              Loading…
            </iframe>
          </div>
        </div>
      </main>
    </>
  );
} 