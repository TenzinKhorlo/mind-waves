function extractString(buffer, offset) {
  let end = offset;
  while (end < buffer.length && buffer[end] !== 0x00) end++;
  const str = buffer.toString('utf8', offset, end);
  const nextOffset = (end + 4) & ~0x03;
  return [str, nextOffset];
}

function parseOSCMessage(buffer) {
  let offset = 0;
  const [address, offset1] = extractString(buffer, offset);
  const [typeTagsRaw, offset2] = extractString(buffer, offset1);

  if (!typeTagsRaw.startsWith(',')) throw new Error('Invalid type tag string');
  const typeTags = typeTagsRaw.slice(1);

  let args = [];
  let currOffset = offset2;

  for (const tag of typeTags) {
    if (tag === 'f') {
      args.push(buffer.readFloatBE(currOffset));
      currOffset += 4;
    } else if (tag === 'i') {
      args.push(buffer.readInt32BE(currOffset));
      currOffset += 4;
    } else {
      throw new Error(`Unsupported type tag: ${tag}`);
    }
  }

  return { address, args };
}

module.exports= parseOSCMessage;