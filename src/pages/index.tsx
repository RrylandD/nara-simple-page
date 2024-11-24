import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>NARA - Nottawa Area Residents Association</title>
        <meta name="description" content="Nottawa Area Residents Association - Community Development Impact" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* White header section */}
      <header className="bg-white w-full py-8">
        <div className="w-full px-4 md:container md:mx-auto">
          <div className="flex flex-col items-start mb-12">
            <img 
              src="/nara-logo.png" 
              alt="NARA Logo" 
              className="h-32 mb-4"
            />
            <h1 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] max-w-4xl">
              What will the impact of this new development be and why the time is right for a Nottawa Area Residents' Association.
            </h1>
          </div>
        </div>
      </header>
      <main className="min-h-screen bg-gradient-to-b from-[#1e3a5f] to-[#0a192f]">
        {/* Main Content Section */}
        <div className="w-full px-4 md:container md:mx-auto py-8">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/5 rounded-xl p-6">
              <img 
                src="/georgian-communities.png" 
                alt="Georgian Communities Sign" 
                className="w-full rounded-lg"
              />
            </div>
            <div className="flex flex-col justify-center space-y-6 text-white">
              <p className="text-xl">
                Water supply, sewage, traffic issues, impact on schools and the impact of a development that will more than double the population of Nottawa over the next decade are among our main concerns.
              </p>
              <p className="text-xl">
                We would like to hear from you about how you feel this will affect your lifestyle in The Village of Nottawa and surrounding area.
              </p>
            </div>
          </div>

          {/* Mission Statement Section */}
          <div className="bg-white/10 rounded-xl p-8 mb-12">
            <blockquote className="text-white/90 text-lg italic">
              "Our mission is to protect the unique character of our village and safeguard our community's natural resources including our groundwater supply. We are dedicated to uniting residents and advocating for transparency in all development processes, ensuring access to reports and assessments that confirm compliance with provincial regulations. Together, we strive to preserve our community's values and maintain a sustainable environment for future generations."
            </blockquote>
          </div>

          {/* Contact Section */}
          <div className="text-center text-white">
            <h2 className="text-2xl mb-4">For more information about joining NARA please email:</h2>
            <a 
              href="mailto:nara@thenottawaarearresidentsassociation.com" 
              className="text-xl text-blue-300 hover:text-blue-400 transition-colors break-all"
            >
              nara@thenottawaarearresidentsassociation.com
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
