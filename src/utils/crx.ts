import { createHash } from 'crypto';

/**
 * 计算长度
 * @param a 
 * @param b 
 * @param c 
 * @param d 
 */
function calcLength(a: number, b: number, c: number, d: number) {
  let length = 0;
  length += a << 0;
  length += b << 8;
  length += c << 16;
  length += (d << 24) >>> 0;
  return length;
}

/**
 * 从缓冲中获取二进制字符串
 * @param bytesView 
 * @param startOffset 
 * @param endOffset 
 * @returns 
 */
function getBinaryString(bytesView: Buffer, startOffset: number, endOffset: number) {
  let binaryString = '';
  for (let i = startOffset; i< endOffset; ++i) {
    binaryString += String.fromCharCode(bytesView[i]);
  }
  return binaryString;
}