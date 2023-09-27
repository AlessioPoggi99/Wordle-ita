import { Blowfish } from 'egoroof-blowfish'

const BLOWFISH_KEY = import.meta.env.VITE_BLOWFISH_KEY
const BLOWFISH_IV = import.meta.env.VITE_BLOWFISH_IV

const bf = new Blowfish(BLOWFISH_KEY, Blowfish.MODE.ECB, Blowfish.PADDING.NULL)
bf.setIv(BLOWFISH_IV)

export const encrypt = (data: string) => btoa( bf.encode(data).reduce((data, byte) => data + String.fromCharCode(byte), '') )

export const decrypt = (encoded: string) => {
    try {
        return bf.decode(
            Uint8Array.from(atob(encoded), (c) => c.charCodeAt(0)),
            Blowfish.TYPE.STRING
        )
    } catch (error) {
        return null
    }
}