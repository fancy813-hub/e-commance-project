import { useEffect, useState } from 'react'
import { isCeoCredentials } from '../config/auth'
import { AuthContext } from './contexts'

function getStoredUsers() {
  try {
    const storedUsers = window.localStorage.getItem('ember-loam-users')
    return storedUsers ? JSON.parse(storedUsers) : []
  } catch {
    return []
  }
}

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(getStoredUsers)
  const [user, setUser] = useState(null)

  useEffect(() => {
    window.localStorage.setItem('ember-loam-users', JSON.stringify(users))
  }, [users])

  const login = (email, password) => {
    if (isCeoCredentials(email, password)) {
      return { user: { name: 'CEO', email: email.trim(), role: 'admin', joinedAt: 'Store owner' } }
    }

    const account = users.find((entry) => entry.email.toLowerCase() === email.trim().toLowerCase() && entry.password === password)
    if (!account) return { error: 'Email or password is incorrect. Create an account before logging in.' }
    if (account.active === false) return { inactive: true }
    return { user: { ...account, password: undefined, active: true } }
  }

  const reactivateAccount = (email, password) => {
    const account = users.find((entry) => entry.email.toLowerCase() === email.trim().toLowerCase() && entry.password === password)
    if (!account || account.active !== false) return { error: 'Email or password is incorrect.' }
    const reactivatedAccount = { ...account, active: true }
    setUsers((current) => current.map((entry) => entry.email.toLowerCase() === account.email.toLowerCase() ? reactivatedAccount : entry))
    return { user: { ...reactivatedAccount, password: undefined } }
  }

  const signup = (profile) => {
    const emailExists = users.some((entry) => entry.email.toLowerCase() === profile.email.trim().toLowerCase())
    if (emailExists || isCeoCredentials(profile.email, profile.password)) {
      return { error: 'An account with this email already exists.' }
    }

    const account = { ...profile, email: profile.email.trim(), role: 'customer', joinedAt: new Date().toLocaleDateString(), active: true }
    setUsers((current) => [...current, account])
    return { user: { ...account, password: undefined } }
  }

  const updateProfile = (profileImage) => {
    setUser((current) => current ? { ...current, profileImage } : current)
    setUsers((current) => current.map((account) => account.email.toLowerCase() === user?.email.toLowerCase() ? { ...account, profileImage } : account))
  }

  const toggleProfileStatus = () => {
    if (!user || user.role === 'admin') return
    const nextActive = user.active === false
    setUser((current) => current ? { ...current, active: nextActive } : current)
    setUsers((current) => current.map((account) => account.email.toLowerCase() === user.email.toLowerCase() ? { ...account, active: nextActive } : account))
  }

  return <AuthContext.Provider value={{ user, setUser, login, reactivateAccount, signup, updateProfile, toggleProfileStatus }}>{children}</AuthContext.Provider>
}
