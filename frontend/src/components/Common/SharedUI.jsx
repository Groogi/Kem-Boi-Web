import React, { useState, useRef, useEffect } from 'react'

/**
 * ConfirmationModal - A premium overlay for destructive or critical actions.
 */
export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Delete',
  cancelText = 'Cancel',
  variant = 'danger',
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 sm:p-0 bg-white/40">
      <div className="absolute inset-0 bg-white/40 transition-opacity" onClick={onClose}></div>
      <div className="bg-[#FCFDF9] rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl relative z-10 animate-fade-in border border-white/40">
        <div className="p-8 md:p-10 text-center">
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${variant === 'danger' ? 'bg-red-50 text-red-600' : 'bg-primary/10 text-primary'}`}
          >
            <span className="material-symbols-outlined text-[2.5rem]">
              {variant === 'danger' ? 'delete_forever' : 'help'}
            </span>
          </div>
          <h3 className="text-2xl font-headline font-bold text-on-surface mb-3">{title}</h3>
          <p className="text-on-surface-variant font-medium opacity-80 leading-relaxed mb-8">
            {message}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onConfirm}
              className={`flex-1 py-4 px-8 rounded-full font-bold tracking-widest text-sm transition-all shadow-md active:scale-95 ${variant === 'danger' ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-primary text-white hover:bg-primary-dark'}`}
            >
              {confirmText}
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-4 px-8 rounded-full font-bold tracking-widest text-sm bg-white border-2 border-[#D1D3C8] text-on-surface-variant/80 hover:bg-[#F2F3EB] transition-all active:scale-95"
            >
              {cancelText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * ModernAlert - A high-end notification popup with glassmorphism.
 */
export const ModernAlert = ({
  isOpen,
  onClose,
  title,
  message,
  type = 'info', // info, success, error, warning
}) => {
  if (!isOpen) return null

  const icons = {
    info: 'info',
    success: 'check_circle',
    error: 'error',
    warning: 'warning',
  }

  const colors = {
    info: 'text-blue-500 bg-blue-50',
    success: 'text-primary bg-primary/10',
    error: 'text-red-500 bg-red-50',
    warning: 'text-amber-500 bg-amber-50',
  }

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-white/40 animate-fade-in">
      <div className="absolute inset-0 bg-white/10 cursor-default" onClick={onClose}></div>
      <div className="bg-white rounded-[2.5rem] w-full max-w-sm overflow-hidden shadow-[0_32px_64px_-15px_rgba(0,0,0,0.2)] relative z-10 border border-white/60 animate-scale-in">
        <div className="p-10 text-center flex flex-col items-center">
          <div
            className={`w-24 h-24 rounded-full flex items-center justify-center mb-8 ${colors[type]} shadow-inner`}
          >
            <span className="material-symbols-outlined text-[3.5rem]">{icons[type]}</span>
          </div>
          <h3 className="text-3xl font-headline font-bold text-on-surface mb-3 tracking-tight">
            {title}
          </h3>
          <p className="text-on-surface-variant font-medium opacity-70 leading-relaxed mb-10 text-lg">
            {message}
          </p>
          <button
            onClick={onClose}
            className="w-full py-4.5 px-8 rounded-2xl font-bold tracking-[0.2em] text-xs uppercase bg-primary text-white hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-95"
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  )
}

/**
 * ModernConfirm - A high-end confirmation popup with editorial styling.
 */
export const ModernConfirm = ({
  isOpen,
  onConfirm,
  onCancel,
  title = 'Are you sure?',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'primary', // 'primary' or 'danger'
}) => {
  const [confirmTextVal, setConfirmTextVal] = useState('')
  if (!isOpen) return null

  const isDeleteValid = variant !== 'danger' || confirmTextVal.toUpperCase() === 'DELETE'

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-white/40 animate-fade-in">
      <div className="absolute inset-0 cursor-default" onClick={onCancel}></div>
      <div className="bg-white rounded-[2.5rem] w-full max-w-sm overflow-hidden shadow-[0_12px_32px_rgba(45,47,44,0.06)] relative z-10 border border-white/60 animate-scale-in">
        <div className="p-10 text-center flex flex-col items-center">
          <div
            className={`w-24 h-24 rounded-full flex items-center justify-center mb-8 shadow-inner ${
              variant === 'danger' ? 'text-red-500 bg-red-50' : 'text-primary bg-primary/10'
            }`}
          >
            <span className="material-symbols-outlined text-[3.5rem]">
              {variant === 'danger' ? 'warning' : 'help'}
            </span>
          </div>
          <h3 className="text-3xl font-headline font-bold text-on-surface mb-3 tracking-tight">
            {title}
          </h3>
          <p className="text-on-surface-variant font-medium opacity-70 leading-relaxed mb-6 text-lg">
            {message}
          </p>

          {variant === 'danger' && (
            <div className="w-full mb-8 space-y-2">
              <p className="text-[10px] font-black text-red-500/40 uppercase tracking-[0.2em]">
                Type 'DELETE' to confirm
              </p>
              <input
                type="text"
                value={confirmTextVal}
                onChange={(e) => setConfirmTextVal(e.target.value)}
                placeholder="D E L E T E"
                className="w-full bg-[#FBFBF5] border-none rounded-2xl px-5 py-4 shadow-inner text-center font-black tracking-[0.3em] text-red-600 focus:ring-2 focus:ring-red-500/20 transition-all outline-none uppercase"
              />
            </div>
          )}

          <div className="flex flex-col gap-3 w-full">
            <button
              onClick={() => {
                if (isDeleteValid) {
                  onConfirm()
                  setConfirmTextVal('')
                }
              }}
              disabled={!isDeleteValid}
              className={`w-full py-4 px-8 rounded-2xl font-bold tracking-[0.2em] text-[11px] uppercase transition-all shadow-lg active:scale-95 disabled:opacity-30 disabled:grayscale ${
                variant === 'danger'
                  ? 'bg-red-600 text-white shadow-red-600/20 hover:bg-red-700'
                  : 'bg-primary text-white shadow-primary/20 hover:bg-primary-dark'
              }`}
            >
              {confirmText}
            </button>
            <button
              onClick={() => {
                setConfirmTextVal('')
                onCancel()
              }}
              className="w-full py-4 px-8 rounded-2xl font-bold tracking-[0.2em] text-[11px] uppercase bg-transparent text-primary border border-primary/20 hover:bg-primary/5 transition-all active:scale-95"
            >
              {cancelText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * CustomDatePicker - An editorial-style date picker with month/year drill-down.
 */
export const CustomDatePicker = ({
  label,
  value,
  onChange,
  placeholder = 'Select date',
  inputClassName = '',
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [viewMode, setViewMode] = useState('days')
  const containerRef = useRef(null)

  const parseDate = (val) => {
    if (!val) return null
    const d = new Date(val)
    return isNaN(d.getTime()) ? null : d
  }

  const selectedDate = parseDate(value)
  const [viewDate, setViewDate] = useState(selectedDate || new Date())

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay()

  const generateDays = () => {
    const year = viewDate.getFullYear()
    const month = viewDate.getMonth()
    const days = []
    const startPadding = firstDayOfMonth(year, month)
    for (let i = 0; i < startPadding; i++) days.push({ day: '', current: false })
    const count = daysInMonth(year, month)
    for (let i = 1; i <= count; i++) days.push({ day: i, current: true })
    return days
  }

  const changeMonth = (offset) =>
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1))

  const handleSelect = (day) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day)
    const formatted = newDate.toISOString().split('T')[0]
    onChange(formatted)
    setIsOpen(false)
  }

  const selectToday = () => {
    const today = new Date()
    const formatted = today.toISOString().split('T')[0]
    onChange(formatted)
    setViewDate(today)
    setIsOpen(false)
  }

  const clearDate = () => {
    onChange('')
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
        setViewMode('days')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const shortMonths = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const years = []
  const currentYear = new Date().getFullYear()
  for (let y = currentYear - 100; y <= currentYear + 20; y++) years.push(y)

  return (
    <div className="relative w-full" ref={containerRef}>
      {label && (
        <label className="block text-[14px] font-bold text-[#63665e] mb-2 px-1">{label}</label>
      )}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full bg-[#FBFBF5] border-none rounded-full px-5 py-[13px] shadow-inner cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all group ${inputClassName}`}
      >
        <span className={`font-semibold text-sm ${value ? 'text-[#555]' : 'text-[#555]/50'}`}>
          {value
            ? new Date(value).toLocaleDateString('en-AU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })
            : placeholder}
        </span>
        <span className="material-symbols-outlined text-[20px] text-on-surface-variant/60">
          calendar_month
        </span>
      </div>

      {isOpen && (
        <div className="absolute top-[105%] left-0 z-[1000] w-full min-w-[280px] max-w-[calc(100vw-2rem)] md:min-w-[320px] bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-[0_30px_80px_-15px_rgba(66,101,0,0.25)] p-5 md:p-6 border border-white animate-dropdown-in overflow-hidden pointer-events-auto">
          {/* Subtle background glow */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10">
            {viewMode === 'days' && (
              <>
                <div className="flex justify-between items-center mb-6 bg-primary/5 p-2 rounded-full border border-primary/5 shadow-inner">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      changeMonth(-1)
                    }}
                    className="w-10 h-10 rounded-full hover:bg-white hover:shadow-sm flex items-center justify-center text-primary transition-all active:scale-95"
                  >
                    <span className="material-symbols-outlined text-xl">chevron_left</span>
                  </button>
                  <div
                    onClick={() => setViewMode('months')}
                    className="px-6 py-1.5 rounded-full hover:bg-white hover:shadow-sm cursor-pointer font-headline font-bold text-primary text-base transition-all flex items-center gap-1 group"
                  >
                    {monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}
                    <span className="material-symbols-outlined text-sm group-hover:translate-y-0.5 transition-transform">
                      expand_more
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      changeMonth(1)
                    }}
                    className="w-10 h-10 rounded-full hover:bg-white hover:shadow-sm flex items-center justify-center text-primary transition-all active:scale-95"
                  >
                    <span className="material-symbols-outlined text-xl">chevron_right</span>
                  </button>
                </div>

                <div className="grid grid-cols-7 mb-2">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                    <div
                      key={d}
                      className="text-center text-[9px] font-black text-primary/30 uppercase tracking-[0.2em] py-2"
                    >
                      {d}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {generateDays().map((d, i) => {
                    const today = new Date()
                    const isToday =
                      d.current &&
                      d.day === today.getDate() &&
                      viewDate.getMonth() === today.getMonth() &&
                      viewDate.getFullYear() === today.getFullYear()
                    const isSelected =
                      value &&
                      new Date(value).getDate() === d.day &&
                      new Date(value).getMonth() === viewDate.getMonth() &&
                      new Date(value).getFullYear() === viewDate.getFullYear()

                    return (
                      <div
                        key={i}
                        onClick={() => d.current && handleSelect(d.day)}
                        className={`
                          aspect-square flex items-center justify-center rounded-2xl text-[13px] font-bold transition-all relative
                          ${!d.current ? 'text-transparent pointer-events-none' : 'cursor-pointer'}
                          ${
                            isSelected
                              ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-110 active:scale-100 z-10'
                              : d.current
                                ? 'hover:bg-primary/10 hover:text-primary text-on-surface'
                                : ''
                          }
                          ${isToday && !isSelected ? 'text-primary ring-2 ring-primary/20 ring-inset' : ''}
                        `}
                      >
                        {d.day}
                        {isToday && !isSelected && (
                          <div className="absolute bottom-1.5 w-1 h-1 bg-primary rounded-full"></div>
                        )}
                      </div>
                    )
                  })}
                </div>

                <div className="flex justify-between mt-6 pt-5 border-t border-primary/5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      clearDate()
                    }}
                    className="text-[10px] font-black text-red-500/40 hover:text-red-500 transition-colors uppercase tracking-widest px-4 py-2 hover:bg-red-50 rounded-full"
                  >
                    Clear
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      selectToday()
                    }}
                    className="text-[10px] font-black text-primary/60 hover:text-primary transition-colors uppercase tracking-widest px-4 py-2 hover:bg-primary/5 rounded-full"
                  >
                    Jump To Today
                  </button>
                </div>
              </>
            )}

            {viewMode === 'months' && (
              <div className="animate-fade-in px-2">
                <div className="flex items-center gap-2 mb-6">
                  <button
                    onClick={() => setViewMode('days')}
                    className="w-8 h-8 rounded-full hover:bg-primary/5 flex items-center justify-center text-primary"
                  >
                    <span className="material-symbols-outlined text-lg">west</span>
                  </button>
                  <h4 className="font-headline font-bold text-primary text-lg">Select Month</h4>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {shortMonths.map((m, i) => (
                    <div
                      key={m}
                      onClick={() => {
                        setViewDate(new Date(viewDate.getFullYear(), i, 1))
                        setViewMode('years')
                      }}
                      className={`py-5 rounded-[1.25rem] text-center text-sm font-bold cursor-pointer transition-all border ${viewDate.getMonth() === i ? 'bg-primary text-white border-primary shadow-md' : 'hover:bg-primary/5 text-on-surface border-transparent font-medium opacity-70'}`}
                    >
                      {m}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {viewMode === 'years' && (
              <div className="animate-fade-in px-2">
                <div className="flex items-center gap-2 mb-6">
                  <button
                    onClick={() => setViewMode('months')}
                    className="w-8 h-8 rounded-full hover:bg-primary/5 flex items-center justify-center text-primary"
                  >
                    <span className="material-symbols-outlined text-lg">west</span>
                  </button>
                  <h4 className="font-headline font-bold text-primary text-lg">Select Year</h4>
                </div>
                <div className="grid grid-cols-4 gap-2 max-h-[280px] overflow-y-auto pr-3 custom-scrollbar">
                  {years.reverse().map((y) => (
                    <div
                      key={y}
                      onClick={() => {
                        setViewDate(new Date(y, viewDate.getMonth(), 1))
                        setViewMode('days')
                      }}
                      className={`py-3.5 rounded-xl text-center text-[13px] font-bold cursor-pointer transition-all border ${viewDate.getFullYear() === y ? 'bg-primary text-white border-primary shadow-md' : 'hover:bg-primary/5 text-on-surface border-transparent font-medium opacity-70'}`}
                    >
                      {y}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
