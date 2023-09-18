export const applyThemePreference = (theme: string) => {
    const root = window.document.documentElement
    const isDark = theme === 'dark'
    root.classList.remove(isDark ? 'light' : 'dark')
    root.classList.add(theme)
    
    const metaTheme = window.document.querySelector('meta[name="theme-color"]')
    if(metaTheme) metaTheme.setAttribute('content', isDark ? '#242424' : '#e3e3e1')
}