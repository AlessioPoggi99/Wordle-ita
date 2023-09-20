export async function copyToClipboard(emigrationText: string) {
    if(typeof ClipboardItem && navigator.clipboard.write) {
        const text = new ClipboardItem({ 
            "text/plain": emigrationCode(emigrationText)
                .then(text => new Blob([text], { type: "text/plain" }))
        })
        navigator.clipboard.write([text])
    } else {
        emigrationCode(emigrationText)
            .then(text => navigator.clipboard.writeText(text))
    }
}

export async function pasteFromClipboard() {
    const text = await navigator.clipboard.readText()
    return text
}

export async function emigrationCode(emigrationText: string): Promise<string> {
    return emigrationText
}