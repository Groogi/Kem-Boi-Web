import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import BonusEntryForm from '../components/Admin/BonusEntryForm'
import WebsiteLinksForm from '../components/Admin/WebsiteLinksForm'
import LocationEditor from '../components/Admin/LocationEditor'
import RewardsManager from '../components/Admin/RewardsManager'
import { ModernConfirm } from '../components/Common/SharedUI'

import AdminSidebar from '../components/Admin/AdminSidebar'
import AdminHeader from '../components/Admin/AdminHeader'
import CustomerDirectory from '../components/Admin/CustomerDirectory'
import AddUserView from '../components/Admin/AddUserView'
import UserDetailsView from '../components/Admin/UserDetailsView'
import DeleteUserModal from '../components/Admin/DeleteUserModal'
import LocationsView from '../components/Admin/LocationsView'
import RedemptionLogs from '../components/Admin/RedemptionLogs'

function AdminPanel() {
  const { user, token, logout } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [viewMode, setViewMode] = useState('list')
  const [selectedUser, setSelectedUser] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteConfirmText, setDeleteConfirmText] = useState('')

  const [locations, setLocations] = useState([])
  const [locationMode, setLocationMode] = useState('grid')
  const [editingLocation, setEditingLocation] = useState(null)

  const [users, setUsers] = useState([])
  const [redemptions, setRedemptions] = useState([])
  const [rewards, setRewards] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [redemptionSearch, setRedemptionSearch] = useState('')
  const [redemptionToDelete, setRedemptionToDelete] = useState(null)
  const [rewardsKey, setRewardsKey] = useState(0)

  const filteredUsers = users.filter((u) => {
    const fullName = `${u.first_name || ''} ${u.last_name || ''}`.toLowerCase()
    const email = (u.email || '').toLowerCase()
    const accId = (u.account_id || '').toLowerCase()
    const query = searchQuery.toLowerCase()
    return fullName.includes(query) || email.includes(query) || accId.includes(query)
  })

  const [quickEmail, setQuickEmail] = useState('')
  const [quickPoints, setQuickPoints] = useState('')
  const [selectedUserRedemptions, setSelectedUserRedemptions] = useState([])
  const [manualPointsAmount, setManualPointsAmount] = useState('')
  const [addUserForm, setAddUserForm] = useState({ full_name: '', email: '', points: '' })
  const [editUserForm, setEditUserForm] = useState({ first_name: '', last_name: '', email: '' })

  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch('/api/users_list', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setUsers(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Failed to fetch users:', err)
      setUsers([])
    }
  }, [token])

  const fetchRewards = useCallback(async () => {
    try {
      const res = await fetch('/api/rewards', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setRewards(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Failed to fetch rewards:', err)
      setRewards([])
    }
  }, [token])

  const fetchRedemptions = useCallback(async () => {
    try {
      const res = await fetch('/api/redemptions', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setRedemptions(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Failed to fetch redemptions:', err)
      setRedemptions([])
    }
  }, [token])

  const fetchLocations = useCallback(async () => {
    try {
      const res = await fetch('/api/locations', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setLocations(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Failed to fetch locations:', err)
      setLocations([])
    }
  }, [token])

  useEffect(() => {
    if (token && user && user.role && user.role !== 'admin') {
      navigate('/')
    }
  }, [user, token, navigate])

  useEffect(() => {
    if (token) {
      fetchUsers()
      fetchLocations()
      fetchRedemptions()
      fetchRewards()
    }
  }, [token])

  const handleUpdateRedemptionStatus = async (redId, newStatus) => {
    try {
      const res = await fetch(`/api/redemptions/${redId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        showToast(`Redemption marked as ${newStatus}`)
        fetchRedemptions()
      }
    } catch (err) {
      console.error('Failed to update redemption status:', err)
      showToast('Failed to update status', 'error')
    }
  }

  const handleDeleteRedemption = async (redId) => {
    const id = redId || (redemptionToDelete && redemptionToDelete.id)
    if (!id) return

    try {
      const res = await fetch(`/api/redemptions/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        showToast('Redemption record deleted')
        setRedemptionToDelete(null)
        fetchRedemptions()
      }
    } catch (err) {
      console.error('Failed to delete redemption:', err)
      showToast('Failed to delete redemption', 'error')
    }
  }

  const fetchUserRedemptions = useCallback(
    async (userId) => {
      try {
        const res = await fetch(`/api/redemptions?user_id=${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (res.ok) {
          const data = await res.json()
          setSelectedUserRedemptions(data)
        }
      } catch (err) {
        console.error('Failed to fetch user redemptions:', err)
      }
    },
    [token]
  )

  useEffect(() => {
    if (selectedUser) {
      setEditUserForm({
        first_name: selectedUser.first_name || '',
        last_name: selectedUser.last_name || '',
        email: selectedUser.email || '',
      })
      fetchUserRedemptions(selectedUser.id)
    }
  }, [selectedUser, fetchUserRedemptions])

  const handleQuickPoints = async (email, points) => {
    const targetEmail = email || quickEmail
    const targetPoints = points || quickPoints
    if (!targetEmail || !targetPoints) return
    setLoading(true)
    try {
      const res = await fetch('/api/transactions/quick_add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ email: targetEmail, points: targetPoints }),
      })
      if (res.ok) {
        setQuickEmail('')
        setQuickPoints('')
        fetchUsers()
        showToast('Points added successfully!')
      }
    } catch (err) {
      console.error('Failed to add quick points:', err)
      showToast('Failed to add points.', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleManualAddPoints = async () => {
    if (!selectedUser || !manualPointsAmount) return
    setLoading(true)
    try {
      const res = await fetch(`/api/users/${selectedUser.id}/add_points`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ points: manualPointsAmount, notes: 'Admin Manual Addition' }),
      })
      if (res.ok) {
        const data = await res.json()
        setSelectedUser({ ...selectedUser, points_balance: data.new_balance })
        setManualPointsAmount('')
        showToast('Points updated successfully!')
        fetchUsers()
      } else {
        const errData = await res.json()
        showToast(
          `Failed to add points: ${errData.error || errData.errors || 'Access denied'}`,
          'error'
        )
      }
    } catch (err) {
      console.error('Network error adding points to user:', err)
      showToast('Network error occurred while adding points.', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteUser = async () => {
    if (!selectedUser) return
    setLoading(true)
    try {
      const res = await fetch(`/api/users/${selectedUser.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        setShowDeleteModal(false)
        setDeleteConfirmText('')
        setViewMode('list')
        showToast('User deleted successfully.', 'success')
        fetchUsers()
      } else {
        const errData = await res.json()
        showToast(errData.error || errData.errors?.join(', ') || 'Failed to delete user', 'error')
      }
    } catch (err) {
      console.error('Failed to delete user:', err)
      showToast('An error occurred while deleting user.', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateUser = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, // Registration is usually public
        body: JSON.stringify({
          email: addUserForm.email,
          first_name: addUserForm.full_name.trim().split(' ')[0] || addUserForm.full_name.trim(),
          last_name: addUserForm.full_name.trim().split(' ').slice(1).join(' ') || '',
          password: 'Password123!', // Default password for invitations
          role: 'customer',
        }),
      })
      if (res.ok) {
        const userData = await res.json()
        // If points were specified, add them now
        if (addUserForm.points && Number(addUserForm.points) !== 0) {
          const userId = userData.id || userData.user?.id
          if (userId) {
            try {
              await fetch(`/api/users/${userId}/add_points`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                  points: addUserForm.points,
                  notes: 'Initial Sign-up Bonus',
                }),
              })
            } catch (pointErr) {
              console.error('Failed to add initial points:', pointErr)
            }
          }
        }
        showToast(`Invitation sent to ${addUserForm.email}!`, 'success')
        setAddUserForm({ full_name: '', email: '', points: '' })
        setViewMode('list')
        fetchUsers()
      } else {
        const errorData = await res.json()
        showToast(
          errorData.error || errorData.errors?.join(', ') || 'Failed to create user',
          'error'
        )
      }
    } catch (err) {
      console.error(err)
      showToast('Network error occurred while creating user.', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleSaveLocation = async (locationData) => {
    setLoading(true)
    try {
      const url = locationData.id ? `/api/locations/${locationData.id}` : '/api/locations'
      const method = locationData.id ? 'PUT' : 'POST'
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(locationData),
      })
      fetchLocations()
      setLocationMode('grid')
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteLocation = async (id) => {
    setLoading(true)
    try {
      await fetch(`/api/locations/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      fetchLocations()
      setLocationMode('grid')
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (points) => {
    if (points >= 1000) return { label: 'PLATINUM', class: 'bg-[#4A6B10] text-white' }
    if (points >= 500) return { label: 'GOLD', class: 'bg-[#BFE9A2] text-[#1a2a00]' }
    if (points >= 200) return { label: 'SILVER', class: 'bg-[#E2EAD3] text-[#2a3420]' }
    return { label: 'BRONZE', class: 'bg-[#B8BAAF] text-white' }
  }

  const handleUpdateUser = async () => {
    if (!selectedUser) return
    setLoading(true)
    try {
      const res = await fetch(`/api/users/${selectedUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(editUserForm),
      })
      if (res.ok) {
        const data = await res.json()
        const updatedUser = data.user || data
        setSelectedUser(updatedUser)
        fetchUsers()

        // If admin edited their own profile, sync the header
        if (user && updatedUser.id === user.id) {
          // Update localStorage so refresh keeps it, and context if it's mutable
          const stored = JSON.parse(localStorage.getItem('user') || '{}')
          const newUserData = { ...stored, ...updatedUser }
          localStorage.setItem('user', JSON.stringify(newUserData))
          // Note: AuthContext might need a refresh logic, but this is a start
        }

        showToast('User profile updated successfully.', 'success')
      } else {
        const errData = await res.json()
        showToast(errData.error || errData.errors?.join(', ') || 'Failed to update user', 'error')
      }
    } catch (err) {
      console.error(err)
      showToast('A network error occurred while updating user', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FBFBF5] font-body text-on-surface selection:bg-[#c7fc79] selection:text-[#304c00]">
      <AdminSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setViewMode={setViewMode}
        setRewardsKey={setRewardsKey}
        setLocationMode={setLocationMode}
      />

      <div className="lg:hidden bg-[#F2F3EB] border-b border-outline-variant/10 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-primary hover:bg-white/50 p-2 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined text-[32px]">menu</span>
          </button>
          <h1
            onClick={() => {
              setActiveTab('dashboard')
              setViewMode('list')
            }}
            className="text-2xl font-headline font-bold text-primary cursor-pointer hover:opacity-80 transition-opacity"
          >
            Kem Boi
          </h1>
        </div>
        <div className="flex items-center gap-3 bg-white pr-4 pl-1 py-1 rounded-full border border-outline-variant/20 shadow-sm shadow-black/5">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-[1.2rem]">person</span>
          </div>
          <div className="flex flex-col pr-1">
            <span className="text-[12px] font-bold text-primary leading-tight">
              {user?.first_name ? `${user.first_name}` : 'Admin'}
            </span>
            <span className="text-[9px] text-on-surface-variant/60 font-bold uppercase leading-tight tracking-tighter">
              {user?.role}
            </span>
          </div>
        </div>
      </div>

      <main className="lg:ml-64 p-6 md:p-10 min-h-screen">
        <div className="max-w-[1100px] mx-auto">
          <AdminHeader activeTab={activeTab} user={user} />

          {activeTab === 'dashboard' && (
            <>
              {viewMode === 'list' && (
                <CustomerDirectory
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  filteredUsers={filteredUsers}
                  setSelectedUser={setSelectedUser}
                  setViewMode={setViewMode}
                  getStatusBadge={getStatusBadge}
                />
              )}
              {viewMode === 'add-user' && (
                <AddUserView
                  addUserForm={addUserForm}
                  setAddUserForm={setAddUserForm}
                  loading={loading}
                  handleCreateUser={handleCreateUser}
                  setViewMode={setViewMode}
                />
              )}
              {viewMode === 'user-details' && (
                <UserDetailsView
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                  status={getStatusBadge(selectedUser?.points_balance || 0)}
                  manualPointsAmount={manualPointsAmount}
                  setManualPointsAmount={setManualPointsAmount}
                  handleManualAddPoints={handleManualAddPoints}
                  editUserForm={editUserForm}
                  setEditUserForm={setEditUserForm}
                  handleUpdateUser={handleUpdateUser}
                  setShowDeleteModal={setShowDeleteModal}
                  setViewMode={setViewMode}
                  loading={loading}
                  rewards={rewards}
                  token={token}
                  showToast={showToast}
                  fetchUserRedemptions={fetchUserRedemptions}
                  fetchUsers={fetchUsers}
                  fetchRewards={fetchRewards}
                  fetchRedemptions={fetchRedemptions}
                  onUpdate={handleUpdateRedemptionStatus}
                  onDelete={handleDeleteRedemption}
                  selectedUserRedemptions={selectedUserRedemptions}
                  setLoading={setLoading}
                />
              )}
            </>
          )}

          {activeTab === 'locations' &&
            (locationMode === 'grid' ? (
              <LocationsView
                locations={locations}
                setEditingLocation={setEditingLocation}
                setLocationMode={setLocationMode}
              />
            ) : (
              <LocationEditor
                location={editingLocation}
                onSave={handleSaveLocation}
                onCancel={() => setLocationMode('grid')}
                onDelete={handleDeleteLocation}
                loading={loading}
              />
            ))}

          {activeTab === 'bonus-entry' && (
            <BonusEntryForm
              users={users}
              onQuickAdd={handleQuickPoints}
              loading={loading}
              token={token}
            />
          )}

          {activeTab === 'rewards' && (
            <RewardsManager key={rewardsKey} onRewardsChange={fetchRewards} />
          )}
          {activeTab === 'redemptions' && (
            <RedemptionLogs
              redemptionSearch={redemptionSearch}
              setRedemptionSearch={setRedemptionSearch}
              fetchRedemptions={fetchRedemptions}
              redemptions={redemptions}
              handleUpdateRedemptionStatus={handleUpdateRedemptionStatus}
              handleDeleteRedemption={handleDeleteRedemption}
            />
          )}
          {activeTab === 'links' && <WebsiteLinksForm />}
        </div>
      </main>

      {activeTab === 'redemptions' && (
        <ModernConfirm
          isOpen={!!redemptionToDelete}
          onConfirm={() => handleDeleteRedemption()}
          onCancel={() => setRedemptionToDelete(null)}
          title="Delete Redemption?"
          message="This will permanently remove the record from the log. This action is irreversible."
          confirmText="Delete Permanently"
          variant="danger"
        />
      )}

      {showDeleteModal && (
        <DeleteUserModal
          selectedUser={selectedUser}
          deleteConfirmText={deleteConfirmText}
          setDeleteConfirmText={setDeleteConfirmText}
          handleDeleteUser={handleDeleteUser}
          loading={loading}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}
    </div>
  )
}

export default AdminPanel
