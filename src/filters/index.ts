
import { ethers } from "ethers"

export function FToken(val) {
    // 0x3f1f2Eff3A7EF3890b1b91cf1b13e72899Bb1A38
    // 0x3f1f2Eff3A...e72899Bb1A38
    return val.substr(0, 12) + '...' + val.substr(30, 12)
}

export function FAddress(val: string) {
    // 0xEC9a4546382533C74FB5f37A6F447C4cFFC35cBf
    // 0xEC9a454638...7C4cFFC35cBf
    return val.substr(0, 12) + '...' + val.substr(30, 12)
}

export function FFormatEther(val: string) {
    if (val == "0") {
        return val
    }
    return ethers.utils.formatEther(val)
}

export const MyCoin = "GAGA"