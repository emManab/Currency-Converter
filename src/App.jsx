import { useState } from "react"
import useCurrencyInfo from "./hooks/useCurrencyInfo"

export default function App() {
  const [amount, setAmount] = useState(1)
  const [from, setFrom] = useState("USD")
  const [to, setTo] = useState("INR")

  const { data, loading, error } = useCurrencyInfo(from)

  const currencies = Object.keys(data)

  const converted =
    data[to] ? (amount * data[to]).toFixed(2) : "—"

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-8 space-y-6">

        <div className="text-center">
          <h1 className="text-2xl font-semibold text-slate-900">
            Currency Converter
          </h1>
          <p className="text-sm text-slate-500">
            Real-time exchange rates
          </p>
        </div>

        {/* Amount */}
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-4 py-2"
        />

        {/* Selects */}
        {loading ? (
          <p className="text-center text-slate-500 text-sm">
            Loading currencies…
          </p>
        ) : error ? (
          <p className="text-center text-red-500 text-sm">
            {error}
          </p>
        ) : (
          <div className="flex gap-3">
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            >
              {currencies.map((cur) => (
                <option key={cur} value={cur}>
                  {cur}
                </option>
              ))}
            </select>

            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            >
              {currencies.map((cur) => (
                <option key={cur} value={cur}>
                  {cur}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Result */}
        {!loading && !error && (
          <p className="text-center text-xl font-semibold text-slate-900">
            {amount} {from} = {converted} {to}
          </p>
        )}
      </div>
    </div>
  )
}
