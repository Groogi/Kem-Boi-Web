import { useState, useEffect } from 'react'
import { useToast } from '../../context/ToastContext'
import { useAuth } from '../../context/AuthContext'
import { API_BASE } from '../../api/config'

function WebsiteLinksForm() {
  const [socialLinks, setSocialLinks] = useState({ instagram: '', facebook: '', website: '' })
  const [loading, setLoading] = useState(false)
  const { showToast } = useToast()
  const { token } = useAuth()

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await fetch(`${API_BASE}/social_links`)
        if (res.ok) {
          const data = await res.json()
          setSocialLinks(data)
        }
      } catch (err) {
        console.error('Failed to fetch links', err)
      }
    }
    fetchLinks()
  }, [])

  const handleUpdate = async (field) => {
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/social_links`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ [field]: socialLinks[field] }),
      })

      if (res.ok) {
        showToast(`${field.charAt(0).toUpperCase() + field.slice(1)} link updated!`, 'success')
      } else {
        showToast('Failed to update link', 'error')
      }
    } catch {
      showToast('An error occurred', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e, field) => {
    if (e.key === 'Enter') {
      handleUpdate(field)
    }
  }

  return (
    <div className="animate-fade-in space-y-8">
      <div className="bg-[#EEF4E4] rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-10 shadow-sm border border-white/40 max-w-3xl">
        <h3 className="text-2xl md:text-3xl font-bold font-headline text-[#4A6B10] mb-8">
          Website Links
        </h3>

        <div className="space-y-10 md:space-y-8 mb-8 md:mb-12">
          <div>
            <label className="block text-sm font-bold text-[#4A6B10] mb-3 md:mb-2 px-2">
              Instagram Link:
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow group">
                <input
                  type="text"
                  value={socialLinks.instagram}
                  placeholder="www.instagram.com/kemboi"
                  onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
                  onKeyDown={(e) => handleKeyDown(e, 'instagram')}
                  className="w-full bg-[#FBFBF5] border-none rounded-full px-5 py-3.5 shadow-inner font-medium text-on-surface-variant focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                />
              </div>
              <button
                onClick={() => handleUpdate('instagram')}
                disabled={loading}
                className="w-full sm:w-auto bg-primary text-white font-bold py-3.5 sm:py-0 px-8 rounded-full shadow-lg shadow-primary/10 hover:bg-primary-dark transition-all active:scale-95 flex items-center justify-center gap-2 group whitespace-nowrap"
              >
                <span className="text-xs tracking-widest uppercase">Update</span>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 transition-transform">
                  east
                </span>
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-[#4A6B10] mb-3 md:mb-2 px-2">
              Facebook Link:
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow group">
                <input
                  type="text"
                  value={socialLinks.facebook}
                  placeholder="www.facebook.com/kemboi"
                  onChange={(e) => setSocialLinks({ ...socialLinks, facebook: e.target.value })}
                  onKeyDown={(e) => handleKeyDown(e, 'facebook')}
                  className="w-full bg-[#FBFBF5] border-none rounded-full px-5 py-3.5 shadow-inner font-medium text-on-surface-variant focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                />
              </div>
              <button
                onClick={() => handleUpdate('facebook')}
                disabled={loading}
                className="w-full sm:w-auto bg-primary text-white font-bold py-3.5 sm:py-0 px-8 rounded-full shadow-lg shadow-primary/10 hover:bg-primary-dark transition-all active:scale-95 flex items-center justify-center gap-2 group whitespace-nowrap"
              >
                <span className="text-xs tracking-widest uppercase">Update</span>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 transition-transform">
                  east
                </span>
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-[#4A6B10] mb-3 md:mb-2 px-2">
              Website Link
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow group">
                <input
                  type="text"
                  value={socialLinks.website}
                  placeholder="www.kemboi.com"
                  onChange={(e) => setSocialLinks({ ...socialLinks, website: e.target.value })}
                  onKeyDown={(e) => handleKeyDown(e, 'website')}
                  className="w-full bg-[#FBFBF5] border-none rounded-full px-5 py-3.5 shadow-inner font-medium text-on-surface-variant focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                />
              </div>
              <button
                onClick={() => handleUpdate('website')}
                disabled={loading}
                className="w-full sm:w-auto bg-primary text-white font-bold py-3.5 sm:py-0 px-8 rounded-full shadow-lg shadow-primary/10 hover:bg-primary-dark transition-all active:scale-95 flex items-center justify-center gap-2 group whitespace-nowrap"
              >
                <span className="text-xs tracking-widest uppercase">Update</span>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 transition-transform">
                  east
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WebsiteLinksForm
