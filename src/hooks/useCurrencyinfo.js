import { useEffect, useState } from "react"

function useCurrencyInfo(currency) {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchRates() {
      try {
        setLoading(true)
        const res = await fetch(
          `https://open.er-api.com/v6/latest/${currency}`
        )
        const json = await res.json()

        if (json.result === "success") {
          setData(json.rates)
        } else {
          setError("API error")
        }
      } catch (err) {
        setError("Network error")
      } finally {
        setLoading(false)
      }
    }

    fetchRates()
  }, [currency])

  return { data, loading, error }
}

export default useCurrencyInfo
