"use client"

import { useState } from "react"
import { X } from "lucide-react"

interface PlaygroundNotificationProps {
  playgroundInfo: {
    expiresAt: string | null
    editUrl: string
    claimUrl: string | null
  }
}

export function PlaygroundNotification({ playgroundInfo }: PlaygroundNotificationProps) {
  const [isDismissed, setIsDismissed] = useState(false)

  if (isDismissed) return null

  const formatTimeRemaining = (expiresAt: string) => {
    const now = new Date()
    const expiry = new Date(expiresAt)
    const diff = expiry.getTime() - now.getTime()

    if (diff <= 0) return "expired"

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

    if (days > 0) {
      return `${days} day${days !== 1 ? "s" : ""}, ${hours} hour${hours !== 1 ? "s" : ""}`
    }
    return `${hours} hour${hours !== 1 ? "s" : ""}`
  }

  return (
    <div className="bg-orange-100 dark:bg-orange-900/20 border-b border-orange-200 dark:border-orange-800">
      <div className="container mx-auto px-5 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm">
            {!playgroundInfo.expiresAt ? (
              <p className="text-orange-800 dark:text-orange-200">
                <a
                  href={playgroundInfo.editUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline hover:no-underline"
                >
                  Edit the content in BaseHub
                </a>{" "}
                (login not required)
              </p>
            ) : (
              <p className="text-orange-800 dark:text-orange-200">
                This playground expires in {formatTimeRemaining(playgroundInfo.expiresAt)}.
                {playgroundInfo.claimUrl && (
                  <>
                    {" "}
                    Want to keep it?{" "}
                    <a
                      href={playgroundInfo.claimUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium underline hover:no-underline"
                    >
                      Claim it here
                    </a>
                    .
                  </>
                )}
              </p>
            )}
          </div>
          <button
            onClick={() => setIsDismissed(true)}
            className="text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-200 transition-colors"
            aria-label="Dismiss notification"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
