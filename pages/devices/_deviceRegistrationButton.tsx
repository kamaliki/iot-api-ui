import React from 'react'

export default function DeviceRegistrationButton({ deviceId, onError, isLoading}:
  { deviceId: string, onError: (error: string) => void,
    isLoading: (loading: boolean) => void }
  ) {

  function handleRegister() {
    isLoading(true)
    const body = JSON.stringify({ deviceId })

    fetch('/api/devices', {
      method: 'POST',
      body,
      headers: { "Content-Type": "application/json" }})
    .then((res) => {
      if(res.ok) {
        isLoading(false)
        return res.json()
      }
      isLoading(false)
      onError(res.statusText)
      return
    })
    .then((data) => {
      if(data?.error) {
        onError(data.error)
      }
      isLoading(false)
    })
  }

  return (
    <input type="button" value="Register" onClick={ handleRegister } />
  )
}
