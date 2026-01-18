import { useEffect, useState } from 'react'
import { randomValuesGenerator } from './source'

export default function Live() {
  const [value, setValue] = useState<number | null>(null)

  useEffect(() => {
    let isMounted = true
    const gen = randomValuesGenerator()

    async function subscribe() {
      for await (const val of gen) {
        if (!isMounted) break
        setValue(val)
      }
    }

    subscribe()

    return () => {
      isMounted = false
      gen.return?.()
    }
  }, [])

  return (
    <div>
      <h2>Live Subscription</h2>
      <p>Current value: {value !== null ? value : 'Waiting for data...'}</p>
    </div>
  )
}
