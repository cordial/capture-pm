import { useState } from "react"
import axios from "axios"

const Newsletter = () => {
  const [email, setEmail] = useState("")
  const [state, setState] = useState("IDLE")
  const [errorMessage, setErrorMessage] = useState(null)

  const subscribe = async () => {
    setState("LOADING")
    setErrorMessage(null)
    try {
      const response = await axios.post("/api/newsletter", { email })
      setState("SUCCESS")
    } catch (e) {
      setErrorMessage(e.response.data.error)
      setState("ERROR")
    }
  }

  return (
    <div>
        <div>
        <input
          type="text"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="button"
          disabled={state === "LOADING"}
          onClick={subscribe}
        >
          {state === "LOADING" ? "Loading" : "Subscribe"}
        </button>
      </div>
      {state === "ERROR" && <p >{errorMessage}</p>}
      {state === "SUCCESS" && <p>Success!</p>}
    </div>
  )
}; export default Newsletter
