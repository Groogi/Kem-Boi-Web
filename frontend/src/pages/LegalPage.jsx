import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function LegalPage({ title, lastUpdated, sections }) {
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [title])

  return (
    <div className="min-h-screen bg-[#f7f7f2] pb-20 pt-32">
      {/* Simple header */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 mb-16">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#426500] font-bold text-sm mb-8 hover:translate-x-[-4px] transition-transform"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          BACK
        </button>

        <h1 className="text-[40px] md:text-[60px] font-bold font-headline text-[#426500] tracking-tight leading-tight mb-4">
          {title}
        </h1>
        <p className="text-[#5B5C59] font-medium text-[14px] opacity-60 uppercase tracking-widest">
          Last Updated: {lastUpdated}
        </p>
      </div>

      {/* Content */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="bg-white rounded-[40px] p-8 md:p-16 shadow-sm border border-black/[0.03] max-w-4xl">
          <div className="space-y-12">
            {sections.map((section, idx) => (
              <div key={idx} className="space-y-4">
                <h2 className="text-2xl font-bold font-headline text-[#426500] tracking-tight">
                  {section.heading}
                </h2>
                <div className="text-[#5B5C59] text-[18px] leading-relaxed font-body whitespace-pre-line">
                  {section.content}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 pt-10 border-t border-black/5 text-center">
            <p className="text-[#5B5C59] opacity-40 text-sm italic">
              If you have any questions regarding these documents, please contact us at
              hello@kemboi.com
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LegalPage
