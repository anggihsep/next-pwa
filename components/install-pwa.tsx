'use client'

import { useEffect, useState } from 'react'

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<unknown>(null)
  const [isInstallable, setIsInstallable] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      // Prevent the default install prompt
      e.preventDefault()
      // Store the event for later use
      setDeferredPrompt(e)
      setIsInstallable(true)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    // Show the install prompt
    // @ts-expect-error ignore it for now
    deferredPrompt.prompt()

    // Wait for the user's response
    // @ts-expect-error ignore it for now
    const { outcome } = await deferredPrompt.userChoice
    
    console.log(`User response: ${outcome}`)
    
    // Clear the prompt
    setDeferredPrompt(null)
    setIsInstallable(false)
  }

  if (!isInstallable) return null

  return (
    <button 
      onClick={handleInstall}
      className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
    >
      Install App
    </button>
  )
}