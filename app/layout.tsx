import './globals.css'
import { Inter } from 'next/font/google'
import dynamic from 'next/dynamic'
import { Metadata } from 'next'

const ChatInterface = dynamic(() => import('./components/ChatInterface'), { ssr: false })

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nicolas - Votre assistant jardinage virtuel',
  description: 'Cultivez votre jardin de rêve avec Nicolas, votre compagnon vert aux pouces verts numériques !',
  openGraph: {
    title: 'Nicolas - L\'ami des plantes à votre service ! 🌱',
    description: 'Besoin d\'un coup de pouce pour votre jardin ? Nicolas est là pour vous aider à faire pousser bonheur et légumes !',
    images: [
      {
        url: 'https://nicolas-gardener.vercel.app/nicolas-cover.jpg',
        width: 1200,
        height: 630,
        alt: 'Nicolas, l\'assistant jardinier virtuel, entouré de plantes luxuriantes',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rencontrez Nicolas, votre coach jardinage personnel ! 🌻',
    description: 'Des conseils verts à la pelle et de l\'humour à revendre. Votre jardin va adorer !',
    images: ['https://nicolas-gardener.vercel.app/nicolas-cover.jpg'],
  },
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="h-full">
      <body className={`${inter.className} bg-gradient-to-br from-indigo-50 to-indigo-100 min-h-screen flex flex-col h-full`}>
        <main className="flex-grow flex flex-col h-full p-4 sm:p-6 md:p-8">
          <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 flex-grow flex flex-col overflow-hidden h-full">
            <ChatInterface />
          </div>
        </main>
        {children}
      </body>
    </html>
  )
}