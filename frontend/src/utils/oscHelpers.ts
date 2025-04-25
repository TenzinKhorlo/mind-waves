/**
 * Parse an OSC message from a Buffer
 * @param {Buffer} data - The OSC message buffer
 * @returns {Object} - The parsed OSC message with address and args
 */
function parseOSCMessage(data: Buffer): { address: string; args: number[] } {
    // Extract the OSC address pattern
    const addressEnd = data.indexOf(0)
    const address = data.toString("utf8", 0, addressEnd)
  
    // Skip to the type tag section (align to 4-byte boundary)
    const typeTagStart = (addressEnd + 4) & ~0x03
  
    // Extract the type tag string
    const typeTagEnd = data.indexOf(0, typeTagStart)
    const typeTag = data.toString("utf8", typeTagStart, typeTagEnd)
  
    // Skip the comma at the beginning of the type tag
    const types = typeTag.substring(1)
  
    // Skip to the arguments section (align to 4-byte boundary)
    const argsStart = (typeTagEnd + 4) & ~0x03
  
    // Parse the arguments based on their types
    const args: number[] = []
    let offset = argsStart
  
    for (let i = 0; i < types.length; i++) {
      const type = types[i]
  
      if (type === "f") {
        // Float32 (4 bytes)
        args.push(data.readFloatBE(offset))
        offset += 4
      } else if (type === "i") {
        // Int32 (4 bytes)
        args.push(data.readInt32BE(offset))
        offset += 4
      } else if (type === "s") {
        // String (null-terminated, padded to 4-byte boundary)
        const stringEnd = data.indexOf(0, offset)
        args.push(Number.parseFloat(data.toString("utf8", offset, stringEnd)))
        offset = (stringEnd + 4) & ~0x03
      }
    }
  
    return { address, args }
  }
  
  module.exports = parseOSCMessage
  