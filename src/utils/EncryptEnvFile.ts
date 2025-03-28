let CryptoJSUtil = require("crypto-js")
let fs = require("fs")
let path = require("path")

const SALT = process.env.SALT || "defaultSalt";
const currentDir = __dirname;
const srcDir = path.resolve(currentDir, "..")

const configDir = path.resolve(srcDir, "config")
let envFilePath = `${configDir}\\.env`;
if (process.env.NODE_ENV) {
    const envFilePath = `${configDir}\\.env.${process.env.NODE_ENV}`
}

console.log(envFilePath)

export function encryptEnvFile() {
    const envFileContent = fs.readFileSync(envFilePath, "utf8")
    const envLines = envFileContent.split("\n");

    const encryptedLines = envLines.map((line) => {
        const [key, value] = line.split("=");

        if (value) {
            const encryptedValue = CryptoJSUtil.AES.encrypt(value, SALT).toString()
            return `${key}=${encryptedValue}`;
        }
        return line;
    })

    const updatedEnvContent = encryptedLines.join("\n")
    fs.writeFileSync(envFilePath, updatedEnvContent, "utf8");
    console.log("Encryption complete. Updated .env file")
}

export function decryptEnvFile() {
    const envFileContent = fs.readFileSync(envFilePath, "utf8")
    const envLines = envFileContent.split("\n")

    const decryptedLines = envLines.map((line) => {
        const [key, value] = line.split("=");
        if (value) {
            const decryptedValue = CryptoJSUtil.AES.decrypt(value,SALT).toString(
                CryptoJSUtil.enc.Utf8
            )
            return `${key}=${decryptedValue}`
        }
        return line
    })

    const updatedEnvContent = decryptedLines.join("\n")
    fs.writeFileSync(envFilePath, updatedEnvContent, "utf8");
    console.log("Decryption complete. Updated .env file")
}