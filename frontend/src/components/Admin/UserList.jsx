function UserList() {
  return (
    <section className="xl:col-span-8 bg-surface-container-low rounded-lg p-1 overflow-hidden">
      <div className="bg-surface-container-lowest rounded-[1.8rem] overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-high/50">
              <th className="px-8 py-5 text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                User Name
              </th>
              <th className="px-8 py-5 text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                Email Address
              </th>
              <th className="px-8 py-5 text-xs font-bold text-on-surface-variant uppercase tracking-widest text-right">
                Bonus Points
              </th>
              <th className="px-8 py-5 text-xs font-bold text-on-surface-variant uppercase tracking-widest text-center">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container">
            <tr className="hover:bg-surface-container-low/30 transition-colors">
              <td className="px-8 py-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-tertiary-container overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      data-alt="portrait of a young smiling man with a warm friendly expression and soft natural lighting"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9fCtTvLKWs4sDXxkgQ1d381A8nG0maf8cSBj5FNcjgxudC98zZuS5u01Ub-6u8S9ibTu8m4xpK3IQOv_Yu_PjUqcnyvckKJnUwI89ZHUOxWt3dWkes_RTQr1QIylxZb0WHUS3aLUiMLC9Jwthf0CdCcPjqAT0etYS92sYMJ5OrazDACa7Nt0TAW5GUZMWIQhiQpFPQGSS9apUfnX0VYM6tNIQZCRKuZkePy0L0AmXBmLS3_Cc2e1B5cCNGd_cY_XcfZuBW2poUPax"
                    />
                  </div>
                  <span className="font-bold text-on-surface">Minh Nguyen</span>
                </div>
              </td>
              <td className="px-8 py-6 text-on-surface-variant font-medium text-sm">
                minh.nguyen@example.com
              </td>
              <td className="px-8 py-6 text-right font-bold text-primary">1,250 pts</td>
              <td className="px-8 py-6 text-center">
                <span className="px-3 py-1 bg-primary-container text-on-primary-container text-[10px] font-bold rounded-full uppercase tracking-tighter">
                  Gold
                </span>
              </td>
            </tr>
            <tr className="hover:bg-surface-container-low/30 transition-colors">
              <td className="px-8 py-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-tertiary-container overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      data-alt="close-up portrait of a woman with natural hair and professional lighting with neutral background"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIA6rnvDDmV1k85ajlmB4eIaZxelNGOX5_SWHKsmqDbASiu5lSVhHRoBz0d1xKyashyYxVo-GDpYuo4LgvsGx2jLPpRFLfNOalbpMzbD4E1y1xO0eydB1jAL31Bnlp89c091T1NuqMv9Pw_Ej4k9JI8rJj9EwYRwtQ8SPL5UF2_b3J08KtKRiPDf9siK6aYaiinMoxyV8OGpSvBRojcg98JpnWr5_tUCB7GQvxI5XYxKTuWk9TvWKhDLyf8ZOkOdkRDkx679pVSVkp"
                    />
                  </div>
                  <span className="font-bold text-on-surface">Linh Pham</span>
                </div>
              </td>
              <td className="px-8 py-6 text-on-surface-variant font-medium text-sm">
                linh.p@lifestyle.vn
              </td>
              <td className="px-8 py-6 text-right font-bold text-primary">840 pts</td>
              <td className="px-8 py-6 text-center">
                <span className="px-3 py-1 bg-secondary-container text-on-secondary-container text-[10px] font-bold rounded-full uppercase tracking-tighter">
                  Silver
                </span>
              </td>
            </tr>
            <tr className="hover:bg-surface-container-low/30 transition-colors">
              <td className="px-8 py-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-tertiary-container overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      data-alt="headshot of a man wearing glasses with a modern clean aesthetic and soft depth of field"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHhxRR5cZquRHIP9RSqCaipX8kDD3PKyJLixVQ4PNRwdANUvM8Jp2ZVNzcdjvGQRNliv0wrIq0X_HDFNV0LcTQ8NUpGxuRw4y5pvKHS-_Glv_kDst43-bMUxTKHklSk4dTTSySG-MDcu77o4M2bvsCVtsV1l59QC5coFppF4EZNDi208iOer6nJNP9eqNDzeMPZs5-KEC7e2-6yN4gnzXFe3UR_4N6256skUxXTJ0Fi0Ekac1v1uK1XtQXs0Y6Uo4vNgpEg4GkbJqI"
                    />
                  </div>
                  <span className="font-bold text-on-surface">Anh Tran</span>
                </div>
              </td>
              <td className="px-8 py-6 text-on-surface-variant font-medium text-sm">
                anh.tran@tech.io
              </td>
              <td className="px-8 py-6 text-right font-bold text-primary">2,100 pts</td>
              <td className="px-8 py-6 text-center">
                <span className="px-3 py-1 bg-primary-container text-on-primary-container text-[10px] font-bold rounded-full uppercase tracking-tighter">
                  Platinum
                </span>
              </td>
            </tr>
            <tr className="hover:bg-surface-container-low/30 transition-colors">
              <td className="px-8 py-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-tertiary-container overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      data-alt="professional headshot of a person with a clean minimal aesthetic and warm lighting"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzCTFc405EJCkIUETyCRQ6nYsq1CHBC9U0NETinaSU2wd1RhIJhYwFY09PAsI5lijgZArFIqkRzo6wmxM3m9C-H2-5K9iG63aDJGZhtNp7E4l7x9ooUVlJ7ats0dsDiJ2NgBpE3LQVUdFzW3BkW1YdLn7QLfW-H0VJ78uO4w3tTerTyaHMc9h-MzxbAyWR06m7BBu0JJLhVqnLWLJ87Jr4HZ50vJIq5QY5lEmqTCbNUPFZVscI4f9mavyxQjqOrDXyvoVhyxeK4A0j"
                    />
                  </div>
                  <span className="font-bold text-on-surface">Thao Le</span>
                </div>
              </td>
              <td className="px-8 py-6 text-on-surface-variant font-medium text-sm">
                thao.le@creative.com
              </td>
              <td className="px-8 py-6 text-right font-bold text-primary">320 pts</td>
              <td className="px-8 py-6 text-center">
                <span className="px-3 py-1 bg-surface-container-highest text-on-surface-variant text-[10px] font-bold rounded-full uppercase tracking-tighter">
                  Bronze
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default UserList
